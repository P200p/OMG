(function(){
  // Determine base origin from current script so assets load cross-site
  const currentScript = document.currentScript || (function(){ const s=document.getElementsByTagName('script'); return s[s.length-1]; })();
  // Base directory URL (works for https:// and file://). Example: https://site/app/ -> used to resolve assets.
  const BASE_URL = (function(){
    try{
      const base = currentScript && currentScript.src ? new URL(currentScript.src, location.href) : new URL(location.href);
      // Return directory of the script
      return new URL('./', base).href.replace(/\/$/, '/')
    }catch(e){
      return '';
    }
  })();

  // Expose for other modules (e.g., main.js) to load sibling assets correctly
  try { window.__HC_BASE_URL = BASE_URL; } catch(_) {}
  // Flags derived from current script URL
  const SCRIPT_URL = (function(){ try{ return new URL(currentScript && currentScript.src ? currentScript.src : location.href, location.href); }catch(_){ return null; } })();
  const NOSW = !!(SCRIPT_URL && /(?:[?&])(nosw|no_sw|sw=0|noserviceworker)=1/i.test(SCRIPT_URL.search));
  const BASE_ORIGIN = (function(){ try{ return new URL(BASE_URL, location.href).origin; }catch(_){ return ''; } })();
  const SAME_ORIGIN = BASE_ORIGIN === location.origin;

  function ensureStyle(){
    const d=document;
    if (!d.querySelector('link[data-hc-style]')){
      const link=d.createElement('link');
      link.rel='stylesheet';
      link.href= BASE_URL + 'style.css?t=' + Date.now();
      link.setAttribute('data-hc-style','1');
      link.onload = function(){ /* stylesheet loaded */ };
      link.onerror = function(){
        // Fallback minimal styles if stylesheet cannot be loaded (e.g., CSP/file://)
        try { injectFallbackCSS(); } catch(_){ /* ignore */ }
        console.warn('[HC] style.css failed to load, applied minimal inline styles as fallback');
      };
      d.head.appendChild(link);
    }
  }
  
  function injectHTML(){
      if (!d.getElementById('matrixCanvas')){
        const canvas=d.createElement('canvas');
        canvas.className='matrix-bg';
        canvas.id='matrixCanvas';
        d.body.appendChild(canvas);
      }

      if (d.getElementById('consolePanel')) return;

      const panel = d.createElement('div');
      panel.className = 'console-panel';
      panel.id = 'consolePanel';
      panel.style.minWidth = '320px';
      panel.style.minHeight = '180px';
      panel.style.width = '560px';
      panel.style.height = '360px';
      panel.style.display = 'block';
      panel.innerHTML = `
        <div class="console-header" id="consoleHeader" style="display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;gap:10px;align-items:center;cursor:move;">
            <span style="font-size:16px;">🔧</span>
            <strong style="color:#00ff41">Goonee Panel</strong>
          </div>
          <div style="display:flex;gap:6px;align-items:center;">
            <button class="control-btn" onclick="toggleConsole()">▢</button>
            <button class="control-btn" onclick="closeConsole()">×</button>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;height:calc(100% - 40px);">
          <div style="display:flex;gap:6px;padding:8px;border-bottom:1px solid rgba(0,255,65,0.08);">
            <button id="tabConsole" class="quick-btn" style="flex:1;" onclick="switchTab('console')">Console</button>
            <button id="tabSnippets" class="quick-btn" style="flex:1;" onclick="switchTab('snippets')">Snippets</button>
          </div>
          <div id="panelContent" style="flex:1;display:flex;gap:8px;padding:8px;box-sizing:border-box;overflow:auto;">
            <div id="consoleTab" style="flex:1;display:flex;flex-direction:column;gap:8px;">
              <textarea id="hc-console-input" placeholder="Type JS to execute" style="flex:0 0 120px;background:#000;color:#0f0;border:1px solid #0f0;padding:8px;border-radius:4px;font-family:monospace;"></textarea>
              <div style="display:flex;gap:6px;">
                <button class="action-btn" onclick="(function(){try{eval(document.getElementById('hc-console-input').value);}catch(e){console.error(e);}})()">Run</button>
                <button class="action-btn" onclick="document.getElementById('hc-console-input').value=''">Clear</button>
                <button class="action-btn" onclick="openLiveEditor()">Live Edit UI</button>
              </div>
              <div id="hc-console-output" style="flex:1;overflow:auto;background:#000;border:1px solid #0f0;padding:8px;border-radius:4px;color:#0f0;font-family:monospace;font-size:12px;">Console output</div>
            </div>
            <div id="snippetsTab" style="width:320px;display:flex;flex-direction:column;gap:8px;">
              <div style="font-weight:600;color:#00ff41">Snippets / Tools</div>
              <div style="display:flex;flex-direction:column;gap:6px;">
                <button class="quick-btn" onclick="loadSnippet('https://goonee.netlify.app/sharktool/burpshark.js')">🦈 BurpShark</button>
                <button class="quick-btn" onclick="loadSnippet('https://goonee.netlify.app/sharktool/sharkscan.js')">🔍 SharkScan</button>
                <button class="quick-btn" onclick="loadSnippet('https://goonee.netlify.app/sharktool/snipers.js')">🎯 Snipers</button>
                <button class="quick-btn" onclick="loadSnippet('https://goonee.netlify.app/sharktool/monitor.js')">📊 Monitor</button>
                <button class="quick-btn" onclick="loadSnippet('https://goonee.netlify.app/sharktool/postshark.js')">📮 PostShark</button>
              </div>
              <div style="margin-top:auto;display:flex;gap:6px;">
                <input id="snippetUrlInput" placeholder="Custom script URL" style="flex:1;background:#000;color:#0f0;border:1px solid #0f0;padding:6px;border-radius:4px;"/>
                <button class="action-btn" onclick="(function(){var u=document.getElementById('snippetUrlInput').value.trim(); if(u) loadSnippet(u);})()">Load</button>
              </div>
            </div>
          </div>
          <div style="padding:6px;border-top:1px solid rgba(0,255,65,0.05);font-size:12px;color:#00ff41" id="statusText">Ready • Drag to move • Resize from corner</div>
        </div>
        <div class="resize-handle" id="resizeHandle"></div>
      `;

      d.body.appendChild(panel);

      // initialize interactions (drag/resize/tab)
      try{ initPanelInteractions(); }catch(_){ /* ignore */ }

      // create a compact decoyPanel programmatically if missing (used by dev helpers)
      if (!d.getElementById('decoyPanel')){
        const decoy = d.createElement('div');
        decoy.id = 'decoyPanel';
        decoy.style.cssText = 'display:none; position:fixed; right:10px; top:46px; width:280px; background:rgba(0,0,0,.92); border:1px solid #00ff41; border-radius:8px; box-shadow:0 6px 24px rgba(0,255,65,.25); z-index:100001;';
        decoy.innerHTML = '<div style="background:rgba(0,255,65,.15); border-bottom:1px solid #00ff41; padding:6px 8px; display:flex; justify-content:space-between; align-items:center;"><div style="font-weight:600; color:#00ff41;">Developer Options</div><button class="delete-btn" style="background:#333; color:#0f0; border:1px solid #0f0;" onclick="closeDecoy()">×</button></div>'+
                          '<div style="padding:8px; display:flex; flex-direction:column; gap:6px; color:#9cffb0;">'+
                          '<div style="font-size:12px; opacity:.9">Status: <b id="decoyStatus">locked</b></div>'+
                          '<div style="font-size:11px; word-break:break-all">Key Hash: <span id="decoyHash">sha256:…</span></div>'+
                          '<input id="decoyKey" placeholder="Enter secret key" style="background:#000; color:#00ff41; border:1px solid #00ff41; padding:6px; border-radius:4px; font-size:12px;"/>'+
                          '<div class="button-group">'+
                            '<button class="action-btn" onclick="decoyUnlock()">Unlock</button>'+
                            '<button class="action-btn" style="background:linear-gradient(45deg,#333,#222); color:#0f0" onclick="closeDecoy()">Close</button>'+
                          '</div>'+
                          '<div id="decoyHint" style="font-size:11px; opacity:.75">hint: salt rotating…</div>'+
                          '<div id="decoyNext" style="display:none; margin-top:6px; font-size:12px;"><a id="decoyNextLink" href="https://sharkkadaw.netlify.app/" target="_blank" rel="noopener" style="color:#00ff41; text-decoration:underline;">▶ Stage 2</a></div></div>';
        d.body.appendChild(decoy);
      }
    }

  function ensureMain(){
    const d=document;
    if (!d.querySelector('script[data-hc-main]')){
      const s=d.createElement('script');
      s.src= BASE_URL + 'main.js?t='+Date.now();
      s.setAttribute('data-hc-main','1');
      d.body.appendChild(s);
    }
  }

  // Ensure service worker is registered from same-origin via hidden iframe
  function ensureServiceWorker(){
    if (window.__hcSwBootstrapped) return;
    // Only allow when explicitly safe:
    // 1) Same origin as page
    // 2) Over HTTPS, or localhost/127.0.0.1
    // 3) Not disabled by ?nosw=1
    const isLocalhost = /^(localhost|127\.0\.0\.1|::1)$/.test(location.hostname);
    const isSecure = location.protocol === 'https:' || isLocalhost;
    if (NOSW || !SAME_ORIGIN || !isSecure) return;
    window.__hcSwBootstrapped = true;
    try{
      const iframe = document.createElement('iframe');
      iframe.src = BASE_URL + 'sw-bootstrap.html';
      iframe.style.position='fixed';
      iframe.style.width='1px';
      iframe.style.height='1px';
      iframe.style.opacity='0';
      iframe.style.pointerEvents='none';
      iframe.style.border='0';
      iframe.setAttribute('aria-hidden','true');
      document.body.appendChild(iframe);
      // Cleanup after a while
      setTimeout(()=>{ if(iframe.parentNode) iframe.parentNode.removeChild(iframe); }, 5000);
    }catch(_){ /* ignore */ }
  }

  function getPanel(){ return document.getElementById('consolePanel'); }

  function showConsole(){
    const panel=getPanel();
    if (panel){
      panel.style.display='block';
      // Force mobile-friendly sizing on small screens
      try{
        if (window.innerWidth <= 768){
          panel.style.width = '96vw';
          panel.style.height = '72vh';
          panel.style.left = '2vw';
          panel.style.top = '2vh';
        }
      }catch(_){ /* ignore */ }
      panel.focus();
      return;
    }
    ensureStyle();
    injectHTML();
    ensureMain();
    // Try SW only when allowed; guard inside will skip when cross-origin
    ensureServiceWorker();
    // After creation, also apply mobile size if needed
    try{
      const p = getPanel();
      if (p && window.innerWidth <= 768){
        p.style.width = '96vw';
        p.style.height = '72vh';
        p.style.left = '2vw';
        p.style.top = '2vh';
      }
    }catch(_){ /* ignore */ }
  }

  function hideConsole(){
    const panel=getPanel();
    if (panel){ panel.style.display='none'; }
  }

  function toggleConsole(){
    const panel=getPanel();
    if (!panel){ showConsole(); return; }
    panel.style.display = (panel.style.display==='none' || getComputedStyle(panel).display==='none') ? 'block' : 'none';
    if (panel.style.display==='block') panel.focus();
  }

  // Public API
  window.launchConsole = showConsole;
  window.showConsole = showConsole;
  window.hideConsole = hideConsole;
  window.toggleConsole = toggleConsole;

  // Keyboard shortcut: Ctrl+`
  if (!window.__hcShortcutBound){
    window.__hcShortcutBound = true;
    window.addEventListener('keydown', function(e){
      if ((e.ctrlKey || e.metaKey) && e.key === '`'){
        e.preventDefault();
        toggleConsole();
      }
    });
  }
  
  // --- Dev helpers: decoy panel / live editor ---
  function openSecret(){
    const panel = document.getElementById('decoyPanel');
    if (panel) panel.style.display = 'block';
    const hash = document.getElementById('decoyHash');
    if (hash) hash.textContent = 'sha256:' + (Math.random().toString(36).slice(2,10));
  }

  function closeDecoy(){
    const panel = document.getElementById('decoyPanel');
    if (panel) panel.style.display = 'none';
  }

  function decoyUnlock(){
    const keyInput = document.getElementById('decoyKey');
    const status = document.getElementById('decoyStatus');
    const next = document.getElementById('decoyNext');
    const link = document.getElementById('decoyNextLink');
    if (!keyInput || !status || !next || !link) return;
    const val = (keyInput.value || '').trim();
    if (val.length > 3){
      status.textContent = 'unlocked';
      status.style.color = '#0f0';
      next.style.display = 'block';
      link.textContent = '▶ Open Live Editor';
      link.removeAttribute('href');
      link.onclick = function(e){ e.preventDefault(); openLiveEditor(); };
    } else {
      status.textContent = 'locked';
      status.style.color = '';
      next.style.display = 'none';
      link.onclick = null;
    }
  }

  function openLiveEditor(){
    if (document.getElementById('hc-live-editor')) return;
    // Create editor UI
    const editor = document.createElement('div');
    editor.id = 'hc-live-editor';
    editor.style.position = 'fixed';
    editor.style.zIndex = '100002';
    editor.style.left = '5%';
    editor.style.top = '5%';
    editor.style.width = '90%';
    editor.style.height = '90%';
    editor.style.background = 'rgba(0,0,0,0.95)';
    editor.style.border = '2px solid #00ff41';
    editor.style.borderRadius = '8px';
    editor.style.display = 'flex';
    editor.style.gap = '8px';
    editor.style.padding = '8px';
    editor.style.boxSizing = 'border-box';

    editor.innerHTML = `
      <div style="flex:1; display:flex; flex-direction:column; gap:6px;">
        <div style="color:#00ff41; font-weight:600;">Live HTML (console panel)</div>
        <textarea id="hc-live-html" style="flex:1; width:100%; background:#000; color:#0f0; border:1px solid #0f0; padding:8px; font-family:monospace; font-size:12px;"></textarea>
      </div>
      <div style="width:360px; display:flex; flex-direction:column; gap:6px;">
        <div style="color:#00ff41; font-weight:600;">Live CSS (applies to panel)</div>
        <textarea id="hc-live-css" style="flex:1; width:100%; height:60%; background:#000; color:#0f0; border:1px solid #0f0; padding:8px; font-family:monospace; font-size:12px;"></textarea>
        <div style="display:flex; gap:6px;">
          <button id="hc-live-apply" class="action-btn">Apply</button>
          <button id="hc-live-close" class="action-btn">Close</button>
          <button id="hc-live-reset" class="action-btn">Reset</button>
        </div>
      </div>
    `;

    document.body.appendChild(editor);

    const panel = document.getElementById('consolePanel');
    const htmlTA = document.getElementById('hc-live-html');
    const cssTA = document.getElementById('hc-live-css');
    const applyBtn = document.getElementById('hc-live-apply');
    const closeBtn = document.getElementById('hc-live-close');
    const resetBtn = document.getElementById('hc-live-reset');

    if (panel && htmlTA){ htmlTA.value = panel.innerHTML; }

    // attach or create live style tag
    let liveStyle = document.getElementById('__hc_live_style');
    if (!liveStyle){ liveStyle = document.createElement('style'); liveStyle.id = '__hc_live_style'; document.head.appendChild(liveStyle); }
    cssTA.value = liveStyle.textContent || '';

    const apply = function(){
      try{
        if (panel && htmlTA.value) panel.innerHTML = htmlTA.value;
        liveStyle.textContent = cssTA.value || '';
      }catch(e){ console.error('[HC live editor] apply error', e); }
    };

    // debounce live updates
    let debounce;
    htmlTA.addEventListener('input', ()=>{ clearTimeout(debounce); debounce=setTimeout(apply,300); });
    cssTA.addEventListener('input', ()=>{ clearTimeout(debounce); debounce=setTimeout(apply,300); });
    applyBtn.addEventListener('click', apply);
    closeBtn.addEventListener('click', ()=>{ if (editor.parentNode) editor.parentNode.removeChild(editor); });
    resetBtn.addEventListener('click', ()=>{
      if (editor.parentNode) editor.parentNode.removeChild(editor);
      // restore panel by re-injecting original via hide/show
      try{ hideConsole(); showConsole(); }catch(_){ /* ignore */ }
    });
  }

  // Expose dev functions globally so HTML onclicks work
  window.openSecret = openSecret;
  window.closeDecoy = closeDecoy;
  window.decoyUnlock = decoyUnlock;
  window.openLiveEditor = openLiveEditor;
function purgeCurse() {
  // Select wide range of potentially disabled elements
  const targets = document.querySelectorAll('[disabled], [readonly], [aria-disabled="true"], [inert], input, textarea, select, button, fieldset');

  targets.forEach(el => {
    try {
      // Remove disabling attributes
      if (el.hasAttribute('disabled')) el.removeAttribute('disabled');
      if (el.hasAttribute('readonly')) el.removeAttribute('readonly');
      if (el.getAttribute && el.getAttribute('aria-disabled') === 'true') el.removeAttribute('aria-disabled');
      if (el.hasAttribute('inert')) el.removeAttribute('inert');

      // Reset DOM properties on form controls
      if ('disabled' in el) el.disabled = false;
      if ('readOnly' in el) el.readOnly = false;
      if ('contentEditable' in el && el.contentEditable === 'false') el.contentEditable = 'true';

      // Remove common disabling classes (best-effort, non-destructive)
      if (el.classList) {
        ['disabled', 'is-disabled', 'readonly', 'is-readonly', 'inactive'].forEach(c => {
          if (el.classList.contains(c)) el.classList.remove(c);
        });
      }

      // Re-enable interactions
      el.style.pointerEvents = '';
      el.style.opacity = '';
      el.style.filter = '';

      // Visual feedback
      el.style.boxShadow = '0 0 12px #ff0';
      el.style.border = '1px solid #ff0';
    } catch(_) { /* ignore */ }
  });

  // Clear inputs and textareas to ensure fresh state
  document.querySelectorAll('input, textarea').forEach(el => {
    try {
      if (el.type === 'checkbox' || el.type === 'radio') {
        el.checked = false;
      } else if (el.type !== 'file') {
        el.value = '';
      }
      el.style.boxShadow = '0 0 12px #00ff41';
      el.style.border = '1px solid #00ff41';
    } catch(_) { /* ignore */ }
  });

  const status = document.getElementById('statusText');
  if (status) {
    status.textContent = '🧼 คำสาปถูกล้างแล้ว เปิดใช้งานทุกช่องสำเร็จ';
    status.style.color = '#ff0';
  }
}

  // Auto open if requested via data-auto or ?auto=1
  const auto = (currentScript && currentScript.getAttribute && currentScript.getAttribute('data-auto')==='1') ||
               (currentScript && currentScript.src && /[?&]auto=1/.test(currentScript.src)) ||
               (typeof window.HC_AUTO!== 'undefined' && !!window.HC_AUTO);
  if (auto){ showConsole(); }
  else {
    // Still try to bootstrap SW early (guarded inside)
    ensureServiceWorker();
  }

  // Simple bookmarklet helpers
  function generateSimpleBookmarklet(url){
    // If the user provided a full JS snippet (starts with javascript:), keep it
    if (!url) return '';
    url = url.trim();
    if (/^javascript:/i.test(url)) return url;
    // If looks like inline code (contains spaces or parentheses), wrap as IIFE
    if (/\s|\(|\)/.test(url) && !/^https?:\/\//i.test(url)){
      return 'javascript:(function(){' + encodeURIComponent(url) + '})();';
    }
    // Otherwise treat as remote script URL and create loader
    // Use minimal safe loader that appends script to body
    const tpl = "javascript:(function(){try{var s=document.createElement('script');s.src='" + url.replace(/'/g, "\\'") + "';document.body.appendChild(s);}catch(e){console.error('bookmarklet load error',e);}})();";
    return tpl;
  }

  function copyToClipboard(text){
    try{
      if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    }catch(_){ }
    // fallback
    try{
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.parentNode.removeChild(ta);
    }catch(e){ console.warn('copy failed', e); }
  }

  function generateSimpleBookmarkletPrompt(){
    const url = prompt('Enter remote script URL (or paste JS code). Example: https://goonee.netlify.app/sharktool/burpshark.js');
    if (!url) return;
    const bm = generateSimpleBookmarklet(url.trim());
    copyToClipboard(bm);
    alert('Bookmarklet copied to clipboard. Paste into a bookmark location URL field.\n\n' + bm.slice(0, 200) + (bm.length>200? '...':'') );
  }

  // Allow immediate injection from URL prompt as convenience
  function injectRemoteScript(url){
    try{
      const s = document.createElement('script');
      s.src = url;
      s.onerror = function(e){ console.error('injectRemoteScript failed', e); };
      document.body.appendChild(s);
      return s;
    }catch(e){ console.error(e); return null; }
  }

  window.generateSimpleBookmarkletPrompt = generateSimpleBookmarkletPrompt;
  window.generateSimpleBookmarklet = generateSimpleBookmarklet;
  window.copyToClipboard = copyToClipboard;
  window.injectRemoteScript = injectRemoteScript;

  // Panel behaviors: drag, resize, tabs, snippet loader, console output
  function appendConsoleOutput(msg, level){
    try{
      const out = document.getElementById('hc-console-output');
      if (!out) return;
      const e = document.createElement('div');
      e.style.whiteSpace = 'pre-wrap';
      e.style.marginBottom = '6px';
      if (level === 'err') e.style.color = '#ff6b6b';
      else e.style.color = '#9cffb0';
      e.textContent = (new Date()).toLocaleTimeString() + ' › ' + String(msg);
      out.appendChild(e);
      out.scrollTop = out.scrollHeight;
    }catch(_){ }
  }

  function wrapConsole(){
    if (window.__hc_console_wrapped) return;
    window.__hc_console_wrapped = true;
    ['log','warn','error','info'].forEach(k=>{
      const orig = console[k];
      console[k] = function(){
        try{ appendConsoleOutput(Array.from(arguments).map(a=> typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '), k==='error'?'err':k); }catch(_){ }
        try{ orig.apply(console, arguments); }catch(_){ }
      };
    });
  }

  function switchTab(name){
    try{
      const c = document.getElementById('consoleTab');
      const s = document.getElementById('snippetsTab');
      const bC = document.getElementById('tabConsole');
      const bS = document.getElementById('tabSnippets');
      if (!c || !s) return;
      if (name==='snippets'){
        c.style.display='none'; s.style.display='flex';
        if (bC) bC.style.opacity='0.6'; if (bS) bS.style.opacity='1';
      } else {
        c.style.display='flex'; s.style.display='none';
        if (bC) bC.style.opacity='1'; if (bS) bS.style.opacity='0.6';
      }
    }catch(_){ }
  }

  function loadSnippet(url){
    try{
      appendConsoleOutput('Loading snippet: ' + url);
      const s = injectRemoteScript(url);
      if (s){
        s.onload = function(){ appendConsoleOutput('Loaded: ' + url); };
        s.onerror = function(e){ appendConsoleOutput('Failed to load: ' + url, 'err'); };
      }
    }catch(e){ appendConsoleOutput('loadSnippet error: '+e, 'err'); }
  }

  function initPanelInteractions(){
    const panel = document.getElementById('consolePanel');
    if (!panel) return;
    panel.style.position = panel.style.position || 'fixed';
    panel.style.left = panel.style.left || '50px';
    panel.style.top = panel.style.top || '50px';

    // dragging
    const header = panel.querySelector('#consoleHeader') || panel.querySelector('.console-header');
    let dragging=false, dragOffsetX=0, dragOffsetY=0;
    const onMove = (e)=>{
      if (!dragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY);
      panel.style.left = (clientX - dragOffsetX) + 'px';
      panel.style.top = (clientY - dragOffsetY) + 'px';
    };
    const startDrag = (e)=>{
      dragging = true;
      const rect = panel.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY);
      dragOffsetX = clientX - rect.left;
      dragOffsetY = clientY - rect.top;
      document.addEventListener('mousemove', onMove);
      document.addEventListener('touchmove', onMove);
      document.addEventListener('mouseup', endDrag);
      document.addEventListener('touchend', endDrag);
    };
    const endDrag = ()=>{ dragging=false; document.removeEventListener('mousemove', onMove); document.removeEventListener('touchmove', onMove); };
    if (header){ header.style.cursor='move'; header.addEventListener('mousedown', startDrag); header.addEventListener('touchstart', startDrag); }

    // resize handle
    const rh = panel.querySelector('#resizeHandle') || panel.querySelector('.resize-handle');
    let resizing=false, startW=0, startH=0, startX=0, startY=0;
    const onResizeMove = (e)=>{
      if (!resizing) return;
      const clientX = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY);
      const nw = Math.max(200, startW + (clientX - startX));
      const nh = Math.max(120, startH + (clientY - startY));
      panel.style.width = nw + 'px';
      panel.style.height = nh + 'px';
    };
    const endResize = ()=>{ resizing=false; document.removeEventListener('mousemove', onResizeMove); document.removeEventListener('touchmove', onResizeMove); };
    if (rh){
      rh.style.cursor='se-resize';
      const startResize = (e)=>{
        resizing=true;
        const rect = panel.getBoundingClientRect();
        startW = rect.width; startH = rect.height;
        startX = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX);
        startY = e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY);
        document.addEventListener('mousemove', onResizeMove);
        document.addEventListener('touchmove', onResizeMove);
        document.addEventListener('mouseup', endResize);
        document.addEventListener('touchend', endResize);
      };
      rh.addEventListener('mousedown', startResize);
      rh.addEventListener('touchstart', startResize);
    }

    // default tab
    switchTab('console');
    // hook console to output area
    try{ wrapConsole(); }catch(_){ }
  }

  // expose
  window.initPanelInteractions = initPanelInteractions;
  window.switchTab = switchTab;
  window.loadSnippet = loadSnippet;
})();
