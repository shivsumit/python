        // ===== CONTENT PROTECTION FUNCTIONS =====
        
        // Disable text selection (additional to CSS for better browser support)
        document.addEventListener('selectstart', function(e) {
            e.preventDefault();
            showWarning('Text selection is disabled to protect content.');
            return false;
        });
        
        // Disable right-click menu
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showWarning('Right-click is disabled to protect content.');
            return false;
        });
        
        // Disable drag and drop
        document.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Keydown event handler for all restricted keys
        document.addEventListener('keydown', function(e) {
            // Detect F3 key (browser find)
            if (e.key === 'F3' || e.keyCode === 114) {
                e.preventDefault();
                showWarning('Find functionality is disabled to protect content.');
                return false;
            }
            
            // Detect Ctrl+F / Cmd+F (browser find)
            if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'F')) {
                e.preventDefault();
                showWarning('Find functionality is disabled to protect content.');
                return false;
            }
            
            // Detect Print Screen key (Windows)
            if (e.key === 'PrintScreen' || e.keyCode === 44) {
                e.preventDefault();
                // Try to clear clipboard
                navigator.clipboard.writeText('').catch(err => {});
                showWarning('Screenshots are not permitted for this content.');
                return false;
            }
            
            // Detect Mac screenshot shortcuts
            if (e.metaKey && e.shiftKey) {
                // Cmd+Shift+3 (Full screenshot)
                if (e.key === '3' || e.keyCode === 51) {
                    e.preventDefault();
                    showWarning('Screenshots are not permitted for this content.');
                    return false;
                }
                
                // Cmd+Shift+4 (Selection screenshot)
                if (e.key === '4' || e.keyCode === 52) {
                    e.preventDefault();
                    showWarning('Screenshots are not permitted for this content.');
                    return false;
                }
                
                // Cmd+Shift+5 (Screenshot options on newer macOS)
                if (e.key === '5' || e.keyCode === 53) {
                    e.preventDefault();
                    showWarning('Screenshots are not permitted for this content.');
                    return false;
                }
            }
            
            // Detect Ctrl+P / Cmd+P (print)
            if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
                e.preventDefault();
                showWarning('Printing is disabled to protect content.');
                return false;
            }
            
            // Detect Ctrl+S / Cmd+S (save)
            if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
                e.preventDefault();
                showWarning('Saving is disabled to protect content.');
                return false;
            }
            
            // Detect Ctrl+U / Cmd+Option+U (view source)
            if ((e.ctrlKey && (e.key === 'u' || e.key === 'U')) || 
                (e.metaKey && e.altKey && (e.key === 'u' || e.key === 'U'))) {
                e.preventDefault();
                showWarning('Viewing source is disabled to protect content.');
                return false;
            }
            
            // Detect F12 (developer tools)
            if (e.key === 'F12' || e.keyCode === 123) {
                e.preventDefault();
                showWarning('Developer tools are disabled on this page.');
                return false;
            }
            
            // Detect Ctrl+Shift+I / Cmd+Option+I (developer tools)
            if ((e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) || 
                (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i'))) {
                e.preventDefault();
                showWarning('Developer tools are disabled on this page.');
                return false;
            }
            
            // Detect Ctrl+Shift+C / Cmd+Shift+C (developer tools - element picker)
            if ((e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) || 
                (e.metaKey && e.shiftKey && (e.key === 'C' || e.key === 'c'))) {
                e.preventDefault();
                showWarning('Developer tools are disabled on this page.');
                return false;
            }
            
            // Detect Ctrl+Shift+J / Cmd+Option+J (developer tools - console)
            if ((e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) || 
                (e.metaKey && e.altKey && (e.key === 'J' || e.key === 'j'))) {
                e.preventDefault();
                showWarning('Developer tools are disabled on this page.');
                return false;
            }
        });
        
        // Attempt to detect developer tools opening
        let devToolsOpen = false;
        const devToolsCheck = setInterval(function() {
            const widthThreshold = window.outerWidth - window.innerWidth > 160;
            const heightThreshold = window.outerHeight - window.innerHeight > 160;
            
            if (!(heightThreshold && widthThreshold) && 
                ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || 
                 widthThreshold || heightThreshold)) {
                if (!devToolsOpen) {
                    devToolsOpen = true;
                    showWarning('Developer tools detected. Please close them to continue.');
                }
            } else {
                devToolsOpen = false;
            }
        }, 1000);
        
        // Additional protection against iframe embedding
        if (window.location !== window.parent.location) {
            window.top.location = window.location;
        }
        
        // Show warning message
        function showWarning(message) {
            const warningOverlay = document.getElementById('warningOverlay');
            const warningMessage = document.getElementById('warningMessage');
            
            warningMessage.textContent = message;
            warningOverlay.style.display = 'flex';
            
            // Auto-hide after 5 seconds
            setTimeout(hideWarning, 5000);
        }
        
        // Hide warning message
        function hideWarning() {
            const warningOverlay = document.getElementById('warningOverlay');
            warningOverlay.style.display = 'none';
        }
        
        // Platform tab switching
        function switchPlatform(platform) {
            document.querySelectorAll('.platform-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            document.querySelectorAll('.platform-content').forEach(content => {
                content.classList.remove('active');
            });
            
            document.querySelector(`.platform-tab:nth-child(${platform === 'windows' ? 1 : 2})`).classList.add('active');
            document.getElementById(`${platform}-content`).classList.add('active');
        }
        
        // ===== INITIALIZATION =====
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Content protection system activated');
            console.log('Platform: ' + (navigator.platform.includes('Mac') ? 'Mac' : 'Windows'));
            console.log('Find functionality restriction: Enabled');
            console.log('Text selection protection: Enabled');
            console.log('Right-click protection: Enabled');
            console.log('Print protection: Enabled');
            console.log('Screenshot protection: Enabled');
            console.log('Developer tools protection: Enabled');
        });