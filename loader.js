<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Favicon for browser tab -->
<link rel="icon" href="https://goonee.netlify.app/image.png" type="image/image.png">

<!-- Open Graph meta tags for social sharing -->
<meta property="og:title" content="Goonee Terminal - Hacker Browser">
<meta property="og:description" content="browserhacker aesthetic พร้อมฟีเจอร์สแกน เข้ารหัส และจัดการระบบ">
<meta property="og:image" content="https://goonee.netlify.app/image.png">
<meta property="og:url" content="https://goonee.netlify.app">
<meta property="og:type" content="website">

<!-- Twitter Card (optional but recommended) -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Goonee Terminal - Hacker Browser">
<meta name="twitter:description" content="browser hacker aesthetic พร้อมฟีเจอร์สแกน เข้ารหัส และจัดการระบบ">
<meta name="twitter:image" content="https://goonee.netlify.app/image.png">

    <title>Goonee' Terminal - Hacker Browser</title>
    <!-- PWA Manifest -->
    <link rel="manifest" href="manifest.json">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Fira Code', monospace;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            color: #00ff41;
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        .matrix-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.1;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            position: relative;
            z-index: 1;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            animation: glitch 2s infinite;
        }
        
        .logo {
            font-size: clamp(2rem, 5vw, 4rem);
            font-weight: 700;
            text-shadow: 0 0 20px #00ff41, 0 0 40px #00ff41;
            margin-bottom: 10px;
        }
        
        .subtitle {
            font-size: clamp(0.8rem, 2vw, 1.2rem);
            opacity: 0.8;
            animation: typing 3s steps(30) infinite;
        }
        
        .terminal-container {
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid #00ff41;
            border-radius: 10px;
            margin: 20px 0;
            box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
            overflow: hidden;
        }
        
        .terminal-header {
            background: linear-gradient(90deg, #00ff41, #00cc33);
            color: #000;
            padding: 10px 15px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .terminal-body {
            padding: 20px;
            min-height: 200px;
            font-size: clamp(0.8rem, 1.5vw, 1rem);
        }
        
        .kiwi-section {
            margin-bottom: 20px;
        }
        
        .spell-code {
            width: 100%;
            height: 80px;
            background: #000;
            color: #00ff41;
            border: 1px solid #00ff41;
            padding: 10px;
            border-radius: 5px;
            font-family: 'Fira Code', monospace;
            font-size: clamp(0.7rem, 1.2vw, 0.9rem);
            resize: none;
            outline: none;
        }
        
        .copy-btn {
            margin-top: 10px;
            background: linear-gradient(45deg, #00ff41, #00cc33);
            color: #000;
            border: none;
            padding: 12px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Fira Code', monospace;
            font-weight: 500;
            transition: all 0.3s ease;
            width: 100%;
        }
        
        .copy-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 255, 65, 0.4);
        }
        
        .guide-link {
            color: #00ff41;
            text-decoration: underline;
            transition: all 0.3s ease;
        }
        
        .guide-link:hover {
            text-shadow: 0 0 10px #00ff41;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .feature-card {
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid #00ff41;
            border-radius: 10px;
            padding: 20px;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 255, 65, 0.2);
            border-color: #00cc33;
        }
        
        .feature-icon {
            font-size: 2rem;
            margin-bottom: 10px;
            display: block;
        }
        
        .feature-title {
            font-size: 1.2rem;
            font-weight: 500;
            margin-bottom: 10px;
        }
        
        .feature-desc {
            opacity: 0.8;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .quick-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin: 20px 0;
        }
        
        .action-btn {
            background: rgba(0, 255, 65, 0.1);
            border: 1px solid #00ff41;
            color: #00ff41;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Fira Code', monospace;
            transition: all 0.3s ease;
            flex: 1;
            min-width: 120px;
        }
        
        .action-btn:hover {
            background: rgba(0, 255, 65, 0.2);
            transform: scale(1.05);
        }
        
        .status-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.9);
            border-top: 1px solid #00ff41;
            padding: 10px 20px;
            font-size: 0.8rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 255, 65, 0.9);
            color: #000;
            padding: 15px 20px;
            border-radius: 5px;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .search-container {
            margin: 20px 0 30px 0;
        }
        
        .search-bar {
            display: flex;
            gap: 10px;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .search-input {
            flex: 1;
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid #00ff41;
            color: #00ff41;
            padding: 15px 20px;
            border-radius: 25px;
            font-family: 'Fira Code', monospace;
            font-size: clamp(0.9rem, 2vw, 1.1rem);
            outline: none;
            transition: all 0.3s ease;
        }
        
        .search-input:focus {
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
            border-color: #00cc33;
        }
        
        .search-input::placeholder {
            color: rgba(0, 255, 65, 0.6);
        }
        
        .search-btn {
            background: linear-gradient(45deg, #00ff41, #00cc33);
            color: #000;
            border: none;
            padding: 15px 25px;
            border-radius: 25px;
            font-family: 'Fira Code', monospace;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            min-width: 80px;
        }
        
        .search-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(0, 255, 65, 0.4);
        }
        
        .shortcuts-section {
            margin: 30px 0;
        }
        
        .shortcuts-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 0 10px;
        }
        
        .shortcuts-header h3 {
            font-size: clamp(1.2rem, 3vw, 1.5rem);
            color: #00ff41;
        }
        
        .edit-btn {
            background: rgba(0, 255, 65, 0.1);
            border: 1px solid #00ff41;
            color: #00ff41;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Fira Code', monospace;
            transition: all 0.3s ease;
        }
        
        .edit-btn:hover {
            background: rgba(0, 255, 65, 0.2);
        }
        
        .shortcuts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .shortcut-item {
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid #00ff41;
            border-radius: 10px;
            padding: 15px 10px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            text-decoration: none;
            color: #00ff41;
        }
        
        .shortcut-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 255, 65, 0.2);
            border-color: #00cc33;
        }
        
        .shortcut-icon {
            font-size: 2rem;
            margin-bottom: 8px;
            display: block;
        }
        
        .shortcut-name {
            font-size: 0.8rem;
            font-weight: 500;
            word-break: break-word;
        }
        
        .shortcut-delete {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ff4444;
            color: white;
            border: none;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            font-size: 0.7rem;
            cursor: pointer;
            display: none;
        }
        
        .edit-mode .shortcut-delete {
            display: block;
        }
        
        .add-shortcut {
            background: rgba(0, 0, 0, 0.8);
            border: 2px dashed #00ff41;
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .add-shortcut input {
            flex: 1;
            min-width: 150px;
            background: rgba(0, 0, 0, 0.9);
            border: 1px solid #00ff41;
            color: #00ff41;
            padding: 10px;
            border-radius: 5px;
            font-family: 'Fira Code', monospace;
            outline: none;
        }
        
        .add-shortcut button {
            background: linear-gradient(45deg, #00ff41, #00cc33);
            color: #000;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Fira Code', monospace;
            font-weight: 500;
        }
        
        @keyframes glitch {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-2px); }
            40% { transform: translateX(2px); }
            60% { transform: translateX(-1px); }
            80% { transform: translateX(1px); }
        }
        
        @keyframes typing {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.5; }
        }
        
        @keyframes matrix {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
        }
        
        .matrix-char {
            position: absolute;
            color: #00ff41;
            font-family: 'Fira Code', monospace;
            animation: matrix 3s linear infinite;
            opacity: 0.3;
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
            }
            
            .quick-actions {
                flex-direction: column;
            }
            
            .action-btn {
                min-width: auto;
            }
            
            .status-bar {
                flex-direction: column;
                text-align: center;
            }
        }
        .clickable-icon {
  width: 40px;
  height: auto;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.clickable-icon:hover {
  transform: scale(1.1);
}

    </style>
</head>
<body>
        <canvas class="matrix-bg" id="matrixCanvas"></canvas>
        <!-- PWA Install Popup -->
        <div id="pwaInstallPrompt" style="display:none;position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.95);border:2px solid #00ff41;color:#00ff41;padding:24px 20px 16px 20px;border-radius:12px;z-index:2000;box-shadow:0 8px 32px #00ff4133;max-width:90vw;">
            <div style="font-size:1.1rem;font-weight:500;margin-bottom:10px;">ติดตั้ง Goonee Terminal เป็นแอพ?</div>
            <div style="font-size:0.95rem;opacity:0.8;margin-bottom:18px;">จะได้เปิดใช้งานรวดเร็วขึ้นบนมือถือ/PC<br>กด “ติดตั้ง” หรือ “ปิด” ได้เลย</div>
            <button id="installBtn" style="background:linear-gradient(90deg,#00ff41,#00cc33);color:#000;border:none;padding:10px 28px;border-radius:6px;font-family:'Fira Code',monospace;font-weight:600;font-size:1rem;cursor:pointer;margin-right:10px;">ติดตั้ง</button>
            <button id="closeInstallPrompt" style="background:none;border:1px solid #00ff41;color:#00ff41;padding:10px 18px;border-radius:6px;font-family:'Fira Code',monospace;font-size:1rem;cursor:pointer;">ปิด</button>
        </div>
    
    <div class="container">
        <header class="header">
            <img src="image.png" alt="Goonee Terminal" class="clickable-icon" onclick="window.location.href='https://sharkkadaw.netlify.app/'"/>
            <div class="subtitle">>>> terminal เทอมินอน แต่ฉันจะนอน v3.1.0 <<<</div>
        </header>
        
        <div class="search-container">
            <div class="search-bar">
                <input type="text" id="searchInput" placeholder="🔍ถาม Goonee'หรือใส่ URL..." class="search-input">
                <img src="ogg.webp" alt="GO" class="clickable-icon" onclick="performSearch()">
            </div>
        </div>
        
        <div class="shortcuts-section">
            <div class="shortcuts-header">
                <h3>🚀 ทางลัด</h3>
                <button onclick="toggleEditMode()" class="edit-btn" id="editBtn">✏️ แก้ไข</button>
            </div>
            <div class="shortcuts-grid" id="shortcutsGrid">
                <!-- Shortcuts will be populated by JavaScript -->
            </div>
            <div class="add-shortcut" id="addShortcut" style="display: none;">
                <input type="text" id="shortcutName" placeholder="ชื่อทางลัด">
                <input type="url" id="shortcutUrl" placeholder="https://example.com">
                <button onclick="addShortcut()">➕ เพิ่ม</button>
            </div>
        </div>
        
        <div class="terminal-container">
            <div class="terminal-header">
                <span>🖥️</span>
                <span>Goonee'@terminal:~$</span>
            </div>
            <div class="terminal-body">
                <div class="kiwi-section">
                    <div style="margin-bottom:0.5em;">🧪โหลด kiwi แล้ว</div>
                    <div style="margin-bottom:0.5em;">คัดลอกโค้ดนี้เพื่อนำไปใช้:</div>
                    <textarea id="spellCode" class="spell-code" readonly>javascript:(function(){var s=document.createElement('script');s.src='https://goonee.netlify.app/loader.js?t='+Date.now();s.onload=function(){toggleConsole();};document.body.appendChild(s);})();</textarea>
                    <button onclick="copySpell()" class="copy-btn">
                        🔮 คัดลอกเวท
                    </button>
                    <div style="margin-top:1em;">
                        <a href="https://goonee.netlify.app/guide" target="_blank" class="guide-link">คู่มืออยู่นี่</a>
                    </div>
                    <div style="margin-top:1em;">
                        <a href="https://goonee.netlify.app/welcome" target="_blank" class="guide-link">คี่มืออยู่นี่</a>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="features-grid">
            <div class="feature-card" onclick="executeCommand('scan')">
                <span class="feature-icon">🔍</span>
                <div class="feature-title">Network Scanner</div>
                <div class="feature-desc">สแกนเครือข่ายและตรวจสอบช่องโหว่</div>
            </div>
            
            <div class="feature-card" onclick="executeCommand('encrypt')">
                <span class="feature-icon">🔐</span>
                <div class="feature-title">Encryption Tools</div>
                <div class="feature-desc">เข้ารหัสและถอดรหัสข้อมูล</div>
            </div>
            
            <div class="feature-card" onclick="executeCommand('monitor')">
                <span class="feature-icon">📊</span>
                <div class="feature-title">System Monitor</div>
                <div class="feature-desc">ตรวจสอบสถานะระบบแบบเรียลไทม์</div>
            </div>
            
            <div class="feature-card" onclick="executeCommand('proxy')">
                <span class="feature-icon">🌐</span>
                <div class="feature-title">Proxy Manager</div>
                <div class="feature-desc">จัดการ proxy และ VPN</div>
            </div>
        </div>
        
        <div class="quick-actions">
            <button class="action-btn" onclick="executeCommand('clear')">🧹 Clear Terminal</button>
            <button class="action-btn" onclick="executeCommand('help')">❓ Help</button>
            <button class="action-btn" onclick="executeCommand('status')">📈 Status</button>
            <button class="action-btn" onclick="executeCommand('config')">⚙️ Config</button>
        </div>
    </div>
    
    <div class="status-bar">
        <div>🟢 System Online | CPU: <span id="cpu">45%</span> | RAM: <span id="ram">2.1GB</span></div>
        <div>🌍 IP: <span id="ip">192.168.1.100</span> | 🔒 Secure Connection</div>
        <div id="currentTime"></div>
    </div>
    
    <div class="notification" id="notification"></div>
    
    <script>
        // Register Service Worker for PWA
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('sw.js');
            });
        }

        // PWA Install Prompt
        let deferredPrompt = null;
        const pwaPrompt = document.getElementById('pwaInstallPrompt');
        const installBtn = document.getElementById('installBtn');
        const closeBtn = document.getElementById('closeInstallPrompt');

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            // เฉพาะถ้าไม่ใช่ PWA mode
            if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) return;
            pwaPrompt.style.display = 'block';
        });

        installBtn && installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    pwaPrompt.style.display = 'none';
                }
                deferredPrompt = null;
            }
        });
        closeBtn && closeBtn.addEventListener('click', () => {
            pwaPrompt.style.display = 'none';
        });

        // ถ้าเปิดผ่าน PWA แล้ว ไม่แสดงป้อปอัพ
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
            pwaPrompt && (pwaPrompt.style.display = 'none');
        }
        // Matrix background animation
        const canvas = document.getElementById('matrixCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "マアマラワソカユイワルミヤABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        
        const drops = [];
        for(let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff41';
            ctx.font = fontSize + 'px Fira Code';
            
            for(let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(drawMatrix, 35);
        
        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        // Copy spell function
        function copySpell() {
            const spellCode = document.getElementById('spellCode');
            spellCode.select();
            spellCode.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(spellCode.value).then(() => {
                showNotification('🔮 เวทมนตร์ถูกคัดลอกแล้ว!');
            });
        }
        
        // Execute commands
        function executeCommand(cmd) {
            const commands = {
                'scan': '🔍 กำลังสแกนเครือข่าย...\n> พบ 12 อุปกรณ์\n> ตรวจพบช่องโหว่ 3 จุด',
                'encrypt': '🔐 เครื่องมือเข้ารหัสพร้อมใช้งาน\n> AES-256 Encryption Active\n> RSA Key Generated',
                'monitor': '📊 System Status:\n> CPU: 45% | RAM: 2.1GB\n> Network: 150 Mbps\n> Uptime: 2d 14h 32m',
                'proxy': '🌐 Proxy Manager\n> Active Proxies: 3\n> VPN Status: Connected\n> Location: Singapore',
                'clear': '',
                'help': '❓ Available Commands:\n> scan - Network scanner\n> encrypt - Encryption tools\n> monitor - System monitor\n> proxy - Proxy manager',
                'status': '📈 All systems operational\n> Security Level: Maximum\n> Firewall: Active\n> Intrusion Detection: Online',
                'config': '⚙️ Configuration Panel\n> Theme: Hacker Green\n> Language: Thai/English\n> Auto-update: Enabled'
            };
            
            const terminalBody = document.querySelector('.terminal-body .kiwi-section');
            if (cmd === 'clear') {
                terminalBody.innerHTML = `
                    <div style="margin-bottom:0.5em;">🧪โหลด Goonee แล้ว</div>
                    <div style="margin-bottom:0.5em;">คัดลอกโค้ดนี้เพื่อนำไปใช้:</div>
                    <textarea id="spellCode" class="spell-code" readonly>javascript:(function(){var s=document.createElement('script');s.src='https://goonee.netlify.app/loader.js?t='+Date.now();s.onload=function(){toggleConsole();};document.body.appendChild(s);})();</textarea>
                    <button onclick="copySpell()" class="copy-btn">🔮 คัดลอกเวท</button>
                    <div style="margin-top:1em;">
                        <a href="https://goonee.netlify.app/guide" target="_blank" class="guide-link">คู่มืออยู่นี่</a>
                    </div>
                `;
            } else {
                const output = commands[cmd] || 'Command not found';
                terminalBody.innerHTML += `<div style="margin-top:1em; color: #00cc33; white-space: pre-line;">> ${cmd}\n${output}</div>`;
            }
            
            showNotification(`Command "${cmd}" executed`);
        }
        
        // Show notification
        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 5000);
        }
        
        // Update time and system stats
        function updateStats() {
            const now = new Date();
            document.getElementById('currentTime').textContent = now.toLocaleTimeString('th-TH');
            
            // Simulate changing stats
            document.getElementById('cpu').textContent = (40 + Math.random() * 20).toFixed(1) + '%';
            document.getElementById('ram').textContent = (2.0 + Math.random() * 0.5).toFixed(1) + 'GB';
        }
        
        setInterval(updateStats, 1000);
        updateStats();
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'c') {
                copySpell();
                e.preventDefault();
            }
            if (e.key === 'F1') {
                executeCommand('help');
                e.preventDefault();
            }
        });
        
        // Search functionality
        function performSearch() {
            const query = document.getElementById('searchInput').value.trim();
            if (!query) return;
            
            // Check if it's a URL
            if (query.includes('.') && !query.includes(' ')) {
                const url = query.startsWith('http') ? query : 'https://' + query;
                window.open(url, '_blank');
            } else {
                // Google search
                const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                window.open(searchUrl, '_blank');
            }
            
            showNotification(`🔍 ค้นหา: ${query}`);
        }
        
        // Enter key for search
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Shortcuts management
        let editMode = false;
        let shortcuts = JSON.parse(localStorage.getItem('kiwiShortcuts')) || [
            { name: 'YouTube', url: 'https://youtube.com', icon: '📺' },
            { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
            { name: 'Gmail', url: 'https://gmail.com', icon: '📧' },
            { name: 'Facebook', url: 'https://facebook.com', icon: '📘' },
            { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
            { name: 'Instagram', url: 'https://instagram.com', icon: '📷' },
            { name: 'Netflix', url: 'https://netflix.com', icon: '🎬' },
            { name: 'Spotify', url: 'https://spotify.com', icon: '🎵' },
            { name: 'AI_AUTO_SCAN', url: 'https://goonee.netlify.app/ai/scan.html', icon: '☠︎' }
        ];
        
        function renderShortcuts() {
            const grid = document.getElementById('shortcutsGrid');
            grid.innerHTML = '';
            
            shortcuts.forEach((shortcut, index) => {
                const item = document.createElement('a');
                item.className = 'shortcut-item';
                item.href = shortcut.url;
                item.target = '_blank';
                item.innerHTML = `
                    <span class="shortcut-icon">${shortcut.icon}</span>
                    <div class="shortcut-name">${shortcut.name}</div>
                    <button class="shortcut-delete" onclick="deleteShortcut(${index}); event.preventDefault();">×</button>
                `;
                grid.appendChild(item);
            });
        }
        
        function toggleEditMode() {
            editMode = !editMode;
            const grid = document.getElementById('shortcutsGrid');
            const addSection = document.getElementById('addShortcut');
            const editBtn = document.getElementById('editBtn');
            
            if (editMode) {
                grid.classList.add('edit-mode');
                addSection.style.display = 'flex';
                editBtn.textContent = '✅ เสร็จ';
                editBtn.style.background = 'rgba(255, 68, 68, 0.2)';
                editBtn.style.borderColor = '#ff4444';
                editBtn.style.color = '#ff4444';
            } else {
                grid.classList.remove('edit-mode');
                addSection.style.display = 'none';
                editBtn.textContent = '✏️ แก้ไข';
                editBtn.style.background = 'rgba(0, 255, 65, 0.1)';
                editBtn.style.borderColor = '#00ff41';
                editBtn.style.color = '#00ff41';
            }
        }
        
        function addShortcut() {
            const name = document.getElementById('shortcutName').value.trim();
            const url = document.getElementById('shortcutUrl').value.trim();
            
            if (!name || !url) {
                showNotification('❌ กรุณากรอกข้อมูลให้ครบ');
                return;
            }
            
            // Generate random emoji for icon
            const emojis = ['🌐', '⭐', '🚀', '💎', '🔥', '⚡', '🎯', '🎨', '🎪', '🎭', '🎪', '🎨'];
            const randomIcon = emojis[Math.floor(Math.random() * emojis.length)];
            
            shortcuts.push({
                name: name,
                url: url.startsWith('http') ? url : 'https://' + url,
                icon: randomIcon
            });
            
            localStorage.setItem('kiwiShortcuts', JSON.stringify(shortcuts));
            renderShortcuts();
            
            // Clear inputs
            document.getElementById('shortcutName').value = '';
            document.getElementById('shortcutUrl').value = '';
            
            showNotification(`✅ เพิ่มทางลัด "${name}" แล้ว`);
        }
        
        function deleteShortcut(index) {
            const shortcut = shortcuts[index];
            shortcuts.splice(index, 1);
            localStorage.setItem('kiwiShortcuts', JSON.stringify(shortcuts));
            renderShortcuts();
            showNotification(`🗑️ ลบ "${shortcut.name}" แล้ว`);
        }
        
        // Initialize shortcuts
        renderShortcuts();
        
        // Welcome message
        setTimeout(() => {
            showNotification('🥝 ยินดีต้อนรับสู่ Goonee Terminal!');
        }, 1000);
    </script>
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'97343009974c45ca',t:'MTc1NTg4NDc2Ni4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
