        // i18n setup
        const languageSelect = document.getElementById('language-select');
        const prevLangBtn = document.querySelector('.prev-lang');
        const nextLangBtn = document.querySelector('.next-lang');
        const languageDisplay = document.querySelector('.language-display');

        function applyTranslations(lang) {
            const t = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : (typeof translations !== 'undefined' && translations['en']) || {};
            document.querySelectorAll('[data-i18n-key]').forEach(el => {
                const key = el.getAttribute('data-i18n-key');
                if (t[key]) el.innerHTML = t[key];
            });
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if (t[key]) el.setAttribute('placeholder', t[key]);
            });
        }

        function setLanguage(lang) {
            try { localStorage.setItem('language', lang); } catch (e) {}
            applyTranslations(lang);
        }

        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => setLanguage(e.target.value));
        }

        document.addEventListener('DOMContentLoaded', () => {
            const saved = (typeof localStorage !== 'undefined' && localStorage.getItem('language')) || (navigator.language && navigator.language.startsWith('ru') ? 'ru' : 'en');
            if (languageSelect) languageSelect.value = saved;
            applyTranslations(saved);
            updateLanguageDisplay();
        });

        function updateLanguageDisplay() {
            if (!languageDisplay) return;
            const lang = (typeof localStorage !== 'undefined' && localStorage.getItem('language')) || (languageSelect && languageSelect.value) || 'en';
            languageDisplay.textContent = lang === 'ru' ? 'Русский' : 'English';
        }

        function navigateLanguage(direction) {
            const options = ['en', 'ru'];
            const current = (typeof localStorage !== 'undefined' && localStorage.getItem('language')) || (languageSelect && languageSelect.value) || 'en';
            const idx = options.indexOf(current);
            const nextIdx = direction === 'prev' ? (idx - 1 + options.length) % options.length : (idx + 1) % options.length;
            const nextLang = options[nextIdx];
            if (languageSelect) {
                languageSelect.value = nextLang;
                languageSelect.dispatchEvent(new Event('change'));
            } else {
                setLanguage(nextLang);
            }
            updateLanguageDisplay();
        }

        if (prevLangBtn && nextLangBtn) {
            prevLangBtn.addEventListener('click', () => navigateLanguage('prev'));
            nextLangBtn.addEventListener('click', () => navigateLanguage('next'));
        }

        // Create clock markers
        const clock = document.querySelector('.clock');
        for (let i = 0; i < 12; i++) {
            const marker = document.createElement('div');
            marker.classList.add('marker');
            if (i % 3 === 0) marker.classList.add('hour-marker');
            marker.style.setProperty('--rotation', `${i * 30}deg`);
            clock.appendChild(marker);
        }

        // Clock hands elements
        const hourHand = document.querySelector('.hour-hand');
        const minuteHand = document.querySelector('.minute-hand');
        const secondHand = document.querySelector('.second-hand');
        const digitalTime = document.querySelector('.digital-time');

        // Populate timezones dropdown
        const timezoneSelect = document.getElementById('timezone-select');

        // Locale options array for the carousel navigation
        const localeOptions = [
            'en-US',    // American English
            'en-GB',    // British English
            'fr',       // French
            'de',       // German
            'es',       // Spanish
            'ja',       // Japanese
            'zh',       // Chinese
            'ko',       // Korean
            'ru',       // Russian
            'ar',       // Arabic (RTL support)
            'iso-8601'  // ISO 8601 format
        ];

        // User-friendly display names for locales in the UI
        const localeNames = {
            'en-US': 'American (Wednesday, May 21, 2025)',
            'en-GB': 'British (Wednesday, 21 May 2025)',
            'fr': 'French (mercredi 21 mai 2025)',
            'de': 'German (Mittwoch, 21. Mai 2025)',
            'es': 'Spanish (miércoles, 21 de mayo de 2025)',
            'ja': 'Japanese (2025年5月21日水曜日)',
            'zh': 'Chinese (2025年5月21日星期三)',
            'ko': 'Korean (2025년 5월 21일 수요일)',
            'ru': 'Russian (среда, 21 мая 2025 г.)',
            'ar': 'Arabic (الأربعاء، 21 مايو 2025)',
            'iso-8601': 'ISO 8601 (2025-05-21)'
        };

        // Locale navigation elements
        const localeSelect = document.getElementById('locale-select');
        const prevLocaleBtn = document.querySelector('.prev-locale');
        const nextLocaleBtn = document.querySelector('.next-locale');
        const localeDisplay = document.querySelector('.locale-display');
        
        // Timezone navigation elements (scoped to timezone control to avoid conflicts with language nav)
        const timezoneControlEl = document.getElementById('timezone-control');
        const prevTzBtn = timezoneControlEl ? timezoneControlEl.querySelector('.prev-tz') : null;
        const nextTzBtn = timezoneControlEl ? timezoneControlEl.querySelector('.next-tz') : null;
        const tzDisplay = timezoneControlEl ? timezoneControlEl.querySelector('.tz-display') : null;

        // Populate localeSelect dropdown
        if (localeSelect && typeof localeOptions !== 'undefined' && typeof localeNames !== 'undefined') {
            localeOptions.forEach(localeCode => {
                const option = document.createElement('option');
                option.value = localeCode;
                option.textContent = localeNames[localeCode] || localeCode;
                localeSelect.appendChild(option);
            });
        } else {
            // console.error("Locale elements or options (localeOptions, localeNames) not found for dropdown population. HTML IDs: locale-select, .prev-locale, .next-locale, .locale-display");
        }
        
        // Locale navigation state
        let currentLocaleIndex = 0;
        
        // Initialize locale display
        function updateLocaleDisplay() {
            if (localeDisplay && localeNames[localeOptions[currentLocaleIndex]]) {
                localeDisplay.textContent = localeNames[localeOptions[currentLocaleIndex]].split('(')[0].trim();
            }
        }
        
        // Locale navigation event listeners
        if (prevLocaleBtn && nextLocaleBtn) {
            prevLocaleBtn.addEventListener('click', function() {
                currentLocaleIndex = (currentLocaleIndex - 1 + localeOptions.length) % localeOptions.length;
                updateLocaleDisplay();
                
                // Update the actual locale select
                if (localeSelect) {
                    localeSelect.value = localeOptions[currentLocaleIndex];
                    localeSelect.dispatchEvent(new Event('change'));
                }
            });
            
            nextLocaleBtn.addEventListener('click', function() {
                currentLocaleIndex = (currentLocaleIndex + 1) % localeOptions.length;
                updateLocaleDisplay();
                
                // Update the actual locale select
                if (localeSelect) {
                    localeSelect.value = localeOptions[currentLocaleIndex];
                    localeSelect.dispatchEvent(new Event('change'));
                }
            });
        }
        
        // Sync locale navigation with dropdown changes
        if (localeSelect) {
            localeSelect.addEventListener('change', function() {
                currentLocaleIndex = localeOptions.indexOf(this.value);
                updateLocaleDisplay();
                
                // Update timezone display when locale changes for internationalization
                updateTimezoneDisplay();
            });
        }
        
        // Initialize locale display
        updateLocaleDisplay();
        
        // Initialize timezone display (after formatTimezoneName function is defined)
        setTimeout(updateTimezoneDisplay, 0);

        const timezones = [
            { value: 'UTC', label: 'UTC' },
            { value: 'America/New_York', label: 'Eastern Time (ET)' },
            { value: 'America/Chicago', label: 'Central Time (CT)' },
            { value: 'America/Denver', label: 'Mountain Time (MT)' },
            { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
            { value: 'America/Anchorage', label: 'Alaska Time' },
            { value: 'Pacific/Honolulu', label: 'Hawaii Time' },
            { value: 'Europe/London', label: 'London (GMT)' },
            { value: 'Europe/Paris', label: 'Paris (CET)' },
            { value: 'Europe/Berlin', label: 'Berlin (CET)' },
            { value: 'Europe/Moscow', label: 'Moscow (MSK)' },
            { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
            { value: 'Asia/Shanghai', label: 'China (CST)' },
            { value: 'Asia/Seoul', label: 'Seoul (KST)' },
            { value: 'Australia/Sydney', label: 'Sydney (AEST)' },
            { value: 'Pacific/Auckland', label: 'Auckland (NZST)' }
        ];
        
        // Add timezone options to select dropdown
        timezones.forEach(tz => {
            const option = document.createElement('option');
            option.value = tz.value;
            option.textContent = tz.label;
            timezoneSelect.appendChild(option);
        });
        
        // Timezone navigation state
        let currentTimezoneIndex = 0;
        

        
        // Initialize timezone display
        function updateTimezoneDisplay() {
            if (tzDisplay && timezones[currentTimezoneIndex]) {
                const currentLocale = localeSelect ? localeSelect.value : 'en-US';
                const timezoneId = timezones[currentTimezoneIndex].value;
                
                // Use the internationalized timezone formatting
                tzDisplay.textContent = formatTimezoneName(timezoneId, currentLocale);
            }
        }
        
        // Timezone navigation event listeners
        if (prevTzBtn && nextTzBtn) {
            prevTzBtn.addEventListener('click', function() {
                currentTimezoneIndex = (currentTimezoneIndex - 1 + timezones.length) % timezones.length;
                updateTimezoneDisplay();
                
                // Update the actual timezone select
                if (timezoneSelect) {
                    timezoneSelect.value = timezones[currentTimezoneIndex].value;
                    timezoneSelect.dispatchEvent(new Event('change'));
                }
            });
            
            nextTzBtn.addEventListener('click', function() {
                currentTimezoneIndex = (currentTimezoneIndex + 1) % timezones.length;
                updateTimezoneDisplay();
                
                // Update the actual timezone select
                if (timezoneSelect) {
                    timezoneSelect.value = timezones[currentTimezoneIndex].value;
                    timezoneSelect.dispatchEvent(new Event('change'));
                }
            });
        }
        
        // Sync timezone navigation with dropdown changes
        if (timezoneSelect) {
            timezoneSelect.addEventListener('change', function() {
                const tzIndex = timezones.findIndex(tz => tz.value === this.value);
                if (tzIndex !== -1) {
                    currentTimezoneIndex = tzIndex;
                    updateTimezoneDisplay();
                }
            });
        }
        
        // Control elements
        const opacitySlider = document.getElementById('opacity-slider');
        const secondHandToggle = document.getElementById('second-hand-toggle');
        const displayModeSelect = document.getElementById('display-mode-select');
        const ampmToggle = document.getElementById('ampm-toggle');
        const secondsToggle = document.getElementById('seconds-toggle');
        const showTimezoneToggle = document.getElementById('show-timezone-toggle');
        const timezoneStyleSelect = document.getElementById('timezone-style-select');
        const showDateToggle = document.getElementById('show-date-toggle');
        const dateStyleSelect = document.getElementById('date-style-select');
        const numbersToggle = document.getElementById('numbers-toggle');
        const numberStyleSelect = document.getElementById('number-style-select');
        const digitalStyleSelect = document.getElementById('digital-style-select');
        const themeSelect = document.getElementById('theme-select');
        const scaleSlider = document.getElementById('scale-slider');
        const handThicknessSelect = document.getElementById('hand-thickness-select');
        const accentColorPicker = document.getElementById('accent-color-picker');
        const accentSizeSlider = document.getElementById('accent-size-slider');
        const secondHandColorPicker = document.getElementById('second-hand-color-picker');
        const clockFaceColorPicker = document.getElementById('clock-face-color-picker');
        const presetSelect = document.getElementById('preset-select');
        const closeSettingsBtn = document.getElementById('close-settings');
        const controlsToggle = document.querySelector('.controls-toggle');
        const digitalControlsToggle = document.querySelector('.digital-controls-toggle');
        const controls = document.querySelector('.controls');
        const obsModeToggle = document.getElementById('obs-mode-toggle');

        // Initialize controls
        secondHandToggle.addEventListener('change', function() {
            secondHand.style.display = this.checked ? 'block' : 'none';
        });

        displayModeSelect.addEventListener('change', function() {
            const mode = this.value;
            const clockElement = document.querySelector('.clock');
            const digitalContainer = document.querySelector('.digital-container');
            const digitalControlsToggle = document.querySelector('.digital-controls-toggle');
            
            if (mode === 'both') {
                clockElement.style.display = 'flex';
                digitalContainer.style.display = 'inline-block';
                digitalControlsToggle.style.display = 'none'; // Hide digital gear in both mode
            } else if (mode === 'analog') {
                clockElement.style.display = 'flex';
                digitalContainer.style.display = 'none';
                digitalControlsToggle.style.display = 'none'; // Hide digital gear in analog mode
            } else if (mode === 'digital') {
                clockElement.style.display = 'none';
                digitalContainer.style.display = 'inline-block';
                digitalControlsToggle.style.display = 'flex'; // Show digital gear in digital-only mode
            }
        });
        
        showTimezoneToggle.addEventListener('change', function() {
            document.querySelector('.timezone-display').style.display = this.checked ? 'block' : 'none';
        });
        
        timezoneStyleSelect.addEventListener('change', function() {
            const timezoneDisplay = document.querySelector('.timezone-display');
            timezoneDisplay.className = 'timezone-display ' + this.value;
        });
        
        showDateToggle.addEventListener('change', function() {
            document.querySelector('.date-display').style.display = this.checked ? 'block' : 'none';
            updateControlVisibility();
        });
        
        dateStyleSelect.addEventListener('change', function() {
            const dateDisplay = document.querySelector('.date-display');
            dateDisplay.className = 'date-display ' + this.value;
        });
        
        digitalStyleSelect.addEventListener('change', function() {
            digitalTime.className = 'digital-time ' + this.value;
        });
        
        function updateClockNumbers() {
            // Clear existing number markers
            document.querySelectorAll('.number-marker').forEach(el => el.remove());
            
            if (!numbersToggle.checked) return;
            
            const clockRadius = clock.offsetWidth / 2;
            const style = numberStyleSelect.value;
            
            for (let i = 1; i <= 12; i++) {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const x = clockRadius + (clockRadius - 30) * Math.cos(angle);
                const y = clockRadius + (clockRadius - 30) * Math.sin(angle);
                
                const marker = document.createElement('div');
                marker.className = 'number-marker';
                marker.style.left = `${x}px`;
                marker.style.top = `${y}px`;
                marker.style.transform = 'translate(-50%, -50%)';
                
                if (style === 'simple') {
                    marker.textContent = i;
                } else if (style === 'roman') {
                    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
                    marker.textContent = romanNumerals[i - 1];
                    marker.classList.add('roman');
                } else if (style === 'dots') {
                    marker.textContent = '•';
                    marker.style.fontSize = '20px';
                } else if (style === 'serif') {
                    marker.textContent = i;
                    marker.style.fontFamily = 'Georgia, Times New Roman, serif';
                }
                
                clock.appendChild(marker);
            }
        }
        
        numbersToggle.addEventListener('change', updateClockNumbers);
        numberStyleSelect.addEventListener('change', updateClockNumbers);

        themeSelect.addEventListener('change', function() {
            // Remove all theme classes first
            document.body.classList.remove(
                'theme-light', 
                'theme-dark', 
                'theme-natural', 
                'theme-transparent',
                'theme-neon',
                'theme-pastel',
                'theme-forest',
                'theme-sunset',
                'theme-ocean'
            );
            
            // Add the selected theme class
            document.body.classList.add('theme-' + this.value);
            
            // Update accent and second hand colors based on theme
            const theme = this.value;
            
            // Define theme accent colors, second hand colors, and clock face colors
            const themeColors = {
                light: { accent: '#85A67B', secondHand: '#787878', clockFace: '#FCFCFA' },
                dark: { accent: '#A9CB9F', secondHand: '#DCDCDC', clockFace: '#282828' },
                natural: { accent: '#96785A', secondHand: '#786458', clockFace: '#F5F0E6' },
                transparent: { accent: '#85A67B', secondHand: '#B4B4B4', clockFace: '#FFFFFF' },
                neon: { accent: '#FF00FF', secondHand: '#00FF00', clockFace: '#14141E' },
                pastel: { accent: '#B4DCF0', secondHand: '#F096AA', clockFace: '#FAF0F5' },
                forest: { accent: '#C88232', secondHand: '#96AA5A', clockFace: '#EBF0E6' },
                sunset: { accent: '#F05A5A', secondHand: '#F08C46', clockFace: '#28283C' },
                ocean: { accent: '#50BEDC', secondHand: '#28B4C8', clockFace: '#E6F0FA' }
            };
            
            if (themeColors[theme]) {
                // Set accent color
                accentColorPicker.value = themeColors[theme].accent;
                const accentEvent = new Event('input');
                accentColorPicker.dispatchEvent(accentEvent);
                
                // Set second hand color
                secondHandColorPicker.value = themeColors[theme].secondHand;
                const secondHandEvent = new Event('input');
                secondHandColorPicker.dispatchEvent(secondHandEvent);
                
                // Set clock face color
                clockFaceColorPicker.value = themeColors[theme].clockFace;
                const clockFaceEvent = new Event('input');
                clockFaceColorPicker.dispatchEvent(clockFaceEvent);
                
                // Re-apply opacity settings after theme change
                setTimeout(() => {
                    opacitySlider.dispatchEvent(new Event('input'));
                }, 10);
            }
        });

        scaleSlider.addEventListener('input', function() {
            document.documentElement.style.setProperty('--scale', this.value / 100);
        });
        
        handThicknessSelect.addEventListener('change', function() {
            const thickness = this.value;
            
            if (thickness === 'thin') {
                hourHand.style.width = '4px';
                minuteHand.style.width = '2px';
                secondHand.style.width = '1px';
                hourHand.style.left = 'calc(50% - 2px)';
                minuteHand.style.left = 'calc(50% - 1px)';
                secondHand.style.left = 'calc(50% - 0.5px)';
            } else if (thickness === 'thick') {
                hourHand.style.width = '8px';
                minuteHand.style.width = '6px';
                secondHand.style.width = '3px';
                hourHand.style.left = 'calc(50% - 4px)';
                minuteHand.style.left = 'calc(50% - 3px)';
                secondHand.style.left = 'calc(50% - 1.5px)';
            } else {
                // Normal
                hourHand.style.width = '6px';
                minuteHand.style.width = '4px';
                secondHand.style.width = '2px';
                hourHand.style.left = 'calc(50% - 3px)';
                minuteHand.style.left = 'calc(50% - 2px)';
                secondHand.style.left = 'calc(50% - 1px)';
            }
        });
        
        accentColorPicker.addEventListener('input', function() {
            // Set the accent color with alpha channel
            const accentColor = this.value + 'CC'; // Add 80% opacity
            document.documentElement.style.setProperty('--accent-color', accentColor);
            
            // Apply to center dot
            document.querySelector('.center-dot').style.backgroundColor = accentColor;
            
            // Apply to second hand dot
            const secondHandDotStyle = document.createElement('style');
            secondHandDotStyle.innerHTML = `.second-hand::after { background-color: ${accentColor}; }`;
            
            // Replace existing style or add new one
            const existingDotStyle = document.getElementById('second-hand-dot-accent-style');
            if (existingDotStyle) {
                existingDotStyle.innerHTML = secondHandDotStyle.innerHTML;
            } else {
                secondHandDotStyle.id = 'second-hand-dot-accent-style';
                document.head.appendChild(secondHandDotStyle);
            }
            
            // Apply to digital time underline
            document.querySelector('.digital-time').style.setProperty('--accent-color', accentColor);
            
            // Also update slider styles to match accent color
            document.querySelectorAll('input[type="range"]::-webkit-slider-thumb').forEach(thumb => {
                thumb.style.backgroundColor = accentColor;
            });
            
            // Apply to selected buttons
            document.querySelectorAll('.select-btn.active').forEach(btn => {
                btn.style.backgroundColor = accentColor;
            });
            
            updateAccentSize();
        });
        
        accentSizeSlider.addEventListener('input', function() {
            updateAccentSize();
        });
        
        function updateAccentSize() {
            const size = accentSizeSlider.value;
            
            // Update center dot size
            const centerDot = document.querySelector('.center-dot');
            centerDot.style.width = size + 'px';
            centerDot.style.height = size + 'px';
            
            // Update second hand dot size
            // Get current second hand width
            const handWidthString = secondHand.style.width || '2px'; // Default to 2px if not set via style
            const W_h = parseFloat(handWidthString); // Actual width of the second hand
            
            const W_d = parseFloat(size) * 0.6; // Calculated width of the dot
            
            const dotLeft = (W_h / 2) - (W_d / 2); // Calculate left offset for centering
            const dotTranslateY = -W_d / 2; // Vertical translation to sit on the tip
            
            const secondHandStyle = document.createElement('style');
            secondHandStyle.innerHTML = `.second-hand::after { width: ${W_d}px; height: ${W_d}px; left: ${dotLeft}px; transform: translateY(${dotTranslateY}px); }`;
            
            // Replace existing style or add new one
            const existingStyle = document.getElementById('second-hand-dot-style');
            if (existingStyle) {
                existingStyle.innerHTML = secondHandStyle.innerHTML;
            } else {
                secondHandStyle.id = 'second-hand-dot-style';
                document.head.appendChild(secondHandStyle);
            }
            
            // If size is 0, completely hide accent elements
            const visibility = size === '0' ? 'hidden' : 'visible';
            centerDot.style.visibility = visibility;
            
            // Also update bottom line of digital time
            document.querySelector('.digital-time').style.setProperty('--accent-line-height', size === '0' ? '0px' : '1px');
        }
        
        secondHandColorPicker.addEventListener('input', function() {
            // Set the second hand color variable with alpha channel
            const secondHandColor = this.value + 'CC'; // Add 80% opacity
            document.documentElement.style.setProperty('--clock-hand-second', secondHandColor);
            
            // Directly apply color to the second hand element
            document.querySelector('.second-hand').style.backgroundColor = secondHandColor;
        });
        
        clockFaceColorPicker.addEventListener('input', function() {
            // Set the clock face color
            const clockFaceColor = this.value;
            document.querySelector('.clock').style.backgroundColor = clockFaceColor;
        });
        
        opacitySlider.addEventListener('input', function() {
            const opacity = this.value / 100;
            document.documentElement.style.setProperty('--clock-face-opacity', opacity);
            
            // Update clock face with new opacity
            const clockElement = document.querySelector('.clock');
            if (clockElement) {
                const currentColor = clockFaceColorPicker.value;
                const colorValues = currentColor.match(/\w\w/g);
                if (colorValues && colorValues.length === 3) {
                    const r = parseInt(colorValues[0], 16);
                    const g = parseInt(colorValues[1], 16);
                    const b = parseInt(colorValues[2], 16);
                    clockElement.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                }
            }
        });
        
        // Removed the transparent toggle handler since we now use the theme selector
        
        // Define style presets
        const presets = {
            default: {
                displayMode: 'both',
                theme: 'light',
                secondHand: true,
                numbers: false,
                numberStyle: 'simple',
                handThickness: 'normal',
                accentColor: '#85A67B',
                accentSize: 10,
                secondHandColor: '#787878',
                clockFaceColor: '#FCFCFA',
                digitalStyle: 'rounded',
                showSeconds: false,
                showTimezone: false,
                timezoneStyle: 'rounded',
                showDate: false,
                dateStyle: 'rounded',
                ampm: true,
                scale: 100,
                backgroundOpacity: 85,
                locale: 'en-US'
            },
            modern: {
                displayMode: 'both',
                theme: 'light',
                secondHand: true,
                numbers: false,
                handThickness: 'thin',
                accentColor: '#dadada', // More subtle, less accent
                secondHandColor: '#999999',
                clockFaceColor: '#FCFCFA',
                digitalStyle: 'simple',
                showSeconds: false,
                showTimezone: false,
                timezoneStyle: 'simple',
                showDate: false,
                dateStyle: 'simple',
                accentSize: 0, // No accent elements for true minimalism
                backgroundOpacity: 50, // More transparent for modern look
                locale: 'en-US'
            },
            coastal: {
                displayMode: 'both',
                theme: 'light',
                secondHand: true,
                numbers: true,
                numberStyle: 'simple',
                handThickness: 'normal',
                accentColor: '#5cbbf6',
                secondHandColor: '#4ca484',
                clockFaceColor: '#FCFCFA',
                digitalStyle: 'rounded',
                showDate: true,
                dateStyle: 'rounded',
                showTimezone: true,
                timezoneStyle: 'rounded',
                showSeconds: false,
                locale: 'en-GB'
            },
            artdeco: {
                displayMode: 'both',
                theme: 'dark',
                secondHand: true,
                numbers: true,
                numberStyle: 'serif',
                handThickness: 'thin',
                accentColor: '#f1c40f',
                secondHandColor: '#f39c12',
                clockFaceColor: '#282828',
                digitalStyle: 'serif',
                showDate: true,
                dateStyle: 'serif',
                showTimezone: true,
                timezoneStyle: 'serif',
                showSeconds: false,
                locale: 'en-US'
            },
            digital: {
                displayMode: 'digital',
                theme: 'dark',
                secondHand: false,
                numbers: false,
                digitalStyle: 'lcd',
                handThickness: 'normal',
                accentColor: '#2ecc71',
                secondHandColor: '#27ae60',
                clockFaceColor: '#282828',
                showDate: true,
                dateStyle: 'lcd',
                showTimezone: true,
                timezoneStyle: 'lcd',
                showSeconds: true,
                locale: 'en-US'
            },
            traditional: {
                displayMode: 'analog',
                theme: 'natural',
                secondHand: true,
                numbers: true,
                numberStyle: 'roman',
                handThickness: 'normal',
                accentColor: '#8b4513',
                secondHandColor: '#a52a2a',
                clockFaceColor: '#F5F0E6',
                digitalStyle: 'serif',
                showDate: false,
                dateStyle: 'serif',
                showTimezone: false,
                timezoneStyle: 'serif',
                showSeconds: false,
                backgroundOpacity: 95, // More solid for traditional look
                locale: 'en-US'
            },
            gaming: {
                displayMode: 'both',
                theme: 'transparent',
                secondHand: true,
                numbers: false,
                handThickness: 'thick',
                accentColor: '#00ff00',
                secondHandColor: '#ff0000',
                clockFaceColor: '#FFFFFF',
                digitalStyle: 'monospace',
                showDate: true,
                dateStyle: 'monospace',
                showTimezone: true,
                timezoneStyle: 'monospace',
                showSeconds: true,
                backgroundOpacity: 50,
                locale: 'en-US'
            },
            retro: {
                displayMode: 'both',
                theme: 'natural',
                secondHand: false,
                numbers: true,
                numberStyle: 'simple',
                handThickness: 'thick',
                accentColor: '#e67e22',
                secondHandColor: '#d35400',
                clockFaceColor: '#F5F0E6',
                digitalStyle: 'monospace',
                showDate: true,
                dateStyle: 'monospace',
                showTimezone: true,
                timezoneStyle: 'monospace',
                showSeconds: false,
                ampm: true,
                backgroundOpacity: 90,
                locale: 'en-US'
            },
            'dark-tech': {
                displayMode: 'both',
                theme: 'dark',
                secondHand: true,
                numbers: true,
                numberStyle: 'dots',
                handThickness: 'thin',
                accentColor: '#9b59b6',
                secondHandColor: '#8e44ad',
                clockFaceColor: '#282828',
                digitalStyle: 'monospace',
                showDate: true,
                dateStyle: 'monospace',
                showTimezone: true,
                timezoneStyle: 'monospace',
                showSeconds: true,
                backgroundOpacity: 80,
                locale: 'en-US'
            },
            elegant: {
                displayMode: 'both',
                theme: 'light',
                secondHand: true,
                numbers: true,
                numberStyle: 'roman',
                handThickness: 'thin',
                accentColor: '#34495e',
                secondHandColor: '#2c3e50',
                clockFaceColor: '#FCFCFA',
                digitalStyle: 'serif',
                showDate: true,
                dateStyle: 'serif',
                showTimezone: true,
                timezoneStyle: 'serif',
                showSeconds: false,
                backgroundOpacity: 90,
                locale: 'en-US'
            },
            cyberpunk: {
                displayMode: 'both',
                theme: 'neon',
                secondHand: true,
                numbers: true,
                numberStyle: 'dots',
                handThickness: 'thin',
                accentColor: '#ff00ff',
                secondHandColor: '#00ff00',
                clockFaceColor: '#14141E',
                digitalStyle: 'lcd',
                showDate: true,
                dateStyle: 'lcd',
                showTimezone: true,
                timezoneStyle: 'lcd',
                showSeconds: true,
                ampm: false,
                backgroundOpacity: 70, // Semi-transparent for futuristic look
                locale: 'en-US'
            },
            lofi: {
                displayMode: 'both',
                theme: 'pastel',
                secondHand: true,
                numbers: false,
                handThickness: 'normal',
                accentColor: '#9882b4', // Soft purple
                secondHandColor: '#82a9b4', // Muted teal 
                clockFaceColor: '#F0E8EF', // Soft lavender white
                digitalStyle: 'monospace', // Changed to monospace for lo-fi aesthetic
                showDate: true,
                dateStyle: 'monospace',
                showTimezone: true,
                timezoneStyle: 'monospace',
                showSeconds: false,
                ampm: true,
                backgroundOpacity: 75,
                locale: 'en-US'
            },
            nature: {
                displayMode: 'both',
                theme: 'forest',
                secondHand: true,
                numbers: true,
                numberStyle: 'serif',
                handThickness: 'normal',
                accentColor: '#c88232',
                secondHandColor: '#96aa5a',
                clockFaceColor: '#EBF0E6',
                digitalStyle: 'serif',
                showDate: true,
                dateStyle: 'serif',
                showTimezone: true,
                timezoneStyle: 'serif',
                showSeconds: false,
                backgroundOpacity: 90,
                locale: 'en-US'
            },
            twilight: {
                displayMode: 'both',
                theme: 'sunset',
                secondHand: true,
                numbers: true,
                numberStyle: 'simple',
                handThickness: 'normal',
                accentColor: '#f05a5a',
                secondHandColor: '#f08c46',
                clockFaceColor: '#28283C',
                digitalStyle: 'simple',
                showDate: true,
                dateStyle: 'simple',
                showTimezone: true,
                timezoneStyle: 'simple',
                showSeconds: true,
                backgroundOpacity: 85,
                locale: 'en-US'
            },
            candy: {
                displayMode: 'both',
                theme: 'pastel',
                secondHand: true,
                numbers: true,
                numberStyle: 'simple',
                handThickness: 'thick',
                accentColor: '#ff55cc', // Bright pink
                secondHandColor: '#55aaff', // Bright blue
                clockFaceColor: '#FFECF5', // Soft pink background
                digitalStyle: 'rounded',
                showDate: true,
                dateStyle: 'rounded',
                showTimezone: true,
                timezoneStyle: 'rounded',
                showSeconds: true,
                accentSize: 12,
                backgroundOpacity: 90,
                locale: 'en-US'
            }
        };
        
        // Handle preset selection
        presetSelect.addEventListener('change', function() {
            const selectedPreset = this.value;
            
            if (selectedPreset === 'none') return;
            
            const preset = presets[selectedPreset];
            
            // Apply preset settings
            if (preset.displayMode) {
                displayModeSelect.value = preset.displayMode;
                const clockElement = document.querySelector('.clock');
                const digitalContainer = document.querySelector('.digital-container');
                const digitalControlsToggle = document.querySelector('.digital-controls-toggle');
                
                if (preset.displayMode === 'both') {
                    clockElement.style.display = 'flex';
                    digitalContainer.style.display = 'inline-block';
                    digitalControlsToggle.style.display = 'none'; // Hide digital gear in both mode
                } else if (preset.displayMode === 'analog') {
                    clockElement.style.display = 'flex';
                    digitalContainer.style.display = 'none';
                    digitalControlsToggle.style.display = 'none'; // Hide digital gear in analog mode
                } else if (preset.displayMode === 'digital') {
                    clockElement.style.display = 'none';
                    digitalContainer.style.display = 'inline-block';
                    digitalControlsToggle.style.display = 'flex'; // Show digital gear in digital-only mode
                }
            }
            
            // Apply theme first
            if (preset.theme) {
                themeSelect.value = preset.theme;
                document.body.classList.remove(
                    'theme-light', 
                    'theme-dark', 
                    'theme-natural', 
                    'theme-transparent',
                    'theme-neon',
                    'theme-pastel',
                    'theme-forest',
                    'theme-sunset',
                    'theme-ocean'
                );
                document.body.classList.add('theme-' + preset.theme);
                
                // If theme colors are defined for this theme, apply them
                const theme = preset.theme;
                const themeColors = {
                    light: { accent: '#85A67B', secondHand: '#787878' },
                    dark: { accent: '#A9CB9F', secondHand: '#DCDCDC' },
                    natural: { accent: '#96785A', secondHand: '#786458' },
                    transparent: { accent: '#85A67B', secondHand: '#B4B4B4' },
                    neon: { accent: '#FF00FF', secondHand: '#00FF00' },
                    pastel: { accent: '#B4DCF0', secondHand: '#F096AA' },
                    forest: { accent: '#C88232', secondHand: '#96AA5A' },
                    sunset: { accent: '#F05A5A', secondHand: '#F08C46' },
                    ocean: { accent: '#50BEDC', secondHand: '#28B4C8' }
                };
            }
            
            if (preset.secondHand !== undefined) {
                secondHandToggle.checked = preset.secondHand;
                secondHand.style.display = preset.secondHand ? 'block' : 'none';
            }
            
            if (preset.numbers !== undefined) {
                numbersToggle.checked = preset.numbers;
            }
            
            if (preset.numberStyle) {
                numberStyleSelect.value = preset.numberStyle;
            }
            
            if (preset.digitalStyle) {
                digitalStyleSelect.value = preset.digitalStyle;
                digitalTime.className = 'digital-time ' + preset.digitalStyle;
            }
            
            if (preset.handThickness) {
                handThicknessSelect.value = preset.handThickness;
                // Trigger thickness change
                const event = new Event('change');
                handThicknessSelect.dispatchEvent(event);
            }
            
            if (preset.accentColor) {
                accentColorPicker.value = preset.accentColor;
                // Trigger the input event to apply all color settings
                const accentEvent = new Event('input');
                accentColorPicker.dispatchEvent(accentEvent);
            }
            
            if (preset.secondHandColor) {
                secondHandColorPicker.value = preset.secondHandColor;
                // Trigger the input event to apply all color settings
                const secondHandEvent = new Event('input');
                secondHandColorPicker.dispatchEvent(secondHandEvent);
            }
            
            if (preset.clockFaceColor) {
                clockFaceColorPicker.value = preset.clockFaceColor;
                // Trigger the input event to apply the color
                const clockFaceEvent = new Event('input');
                clockFaceColorPicker.dispatchEvent(clockFaceEvent);
            }
            
            if (preset.showSeconds !== undefined) {
                secondsToggle.checked = preset.showSeconds;
            }
            
            if (preset.ampm !== undefined) {
                ampmToggle.checked = preset.ampm;
            }
            
            if (preset.accentSize !== undefined) {
                accentSizeSlider.value = preset.accentSize;
                updateAccentSize(); // Call the function to apply the change immediately
            }
            
            if (preset.scale !== undefined) {
                scaleSlider.value = preset.scale;
                document.documentElement.style.setProperty('--scale', preset.scale / 100);
            }
            
            // Set background opacity immediately if specified
            if (preset.backgroundOpacity !== undefined) {
                opacitySlider.value = preset.backgroundOpacity;
            }
            
            if (preset.showTimezone !== undefined) {
                showTimezoneToggle.checked = preset.showTimezone;
                document.querySelector('.timezone-display').style.display = 
                    preset.showTimezone ? 'block' : 'none';
            }
            
            if (preset.timezoneStyle) {
                timezoneStyleSelect.value = preset.timezoneStyle;
                document.querySelector('.timezone-display').className = 
                    'timezone-display ' + preset.timezoneStyle;
            }
            
            if (preset.showDate !== undefined) {
                showDateToggle.checked = preset.showDate;
                document.querySelector('.date-display').style.display = 
                    preset.showDate ? 'block' : 'none';
            }
            
            if (preset.dateStyle) {
                dateStyleSelect.value = preset.dateStyle;
                document.querySelector('.date-display').className = 
                    'date-display ' + preset.dateStyle;
            }

            if (preset.locale && localeSelect) { // localeSelect null check
                localeSelect.value = preset.locale;
                const localeChangeEvent = new Event('change'); // Create a new event
                localeSelect.dispatchEvent(localeChangeEvent); // Dispatch it to trigger listeners
            }
            
            // Update UI
            updateClockNumbers();
            
            // Update control visibility based on new settings
            updateControlVisibility();
            
            // Apply theme and background color at the end
            // Directly set the background color based on theme and opacity
            const theme = preset.theme || themeSelect.value;
            const opacity = opacitySlider.value / 100;
            
            // Get the base color from the current theme
            let baseColorR, baseColorG, baseColorB;
            
            switch(theme) {
                case 'light':
                    baseColorR = 252; baseColorG = 252; baseColorB = 250;
                    break;
                case 'dark':
                    baseColorR = 40; baseColorG = 40; baseColorB = 40;
                    break;
                case 'natural':
                    baseColorR = 245; baseColorG = 240; baseColorB = 230;
                    break;
                case 'transparent':
                    baseColorR = 255; baseColorG = 255; baseColorB = 255;
                    break;
                case 'neon':
                    baseColorR = 20; baseColorG = 20; baseColorB = 30;
                    break;
                case 'pastel':
                    baseColorR = 250; baseColorG = 240; baseColorB = 245;
                    break;
                case 'forest':
                    baseColorR = 235; baseColorG = 240; baseColorB = 230;
                    break;
                case 'sunset':
                    baseColorR = 40; baseColorG = 40; baseColorB = 60;
                    break;
                case 'ocean':
                    baseColorR = 230; baseColorG = 240; baseColorB = 250;
                    break;
                default:
                    baseColorR = 252; baseColorG = 252; baseColorB = 250;
            }
            
            // Update the opacity value in the CSS variable
            document.documentElement.style.setProperty('--clock-face-opacity', opacity);
            
            // Update the clock face color with the new opacity
            const newColor = `rgba(${baseColorR}, ${baseColorG}, ${baseColorB}, ${opacity})`;
            
            // Apply directly to the clock element to ensure it overrides theme styles
            document.querySelector('.clock').style.backgroundColor = newColor;
            
            // Save settings
            saveSettings();
            
            // Reset dropdown to "Choose a preset..." after applying
            setTimeout(() => {
                this.value = 'none';
            }, 500);
        });
        
        closeSettingsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            // Hide settings
            controls.style.opacity = '0';
            setTimeout(() => {
                controls.style.display = 'none';
            }, 300);
        });
        
        // Position controls better
        function updateControlsPosition() {
            controlsToggle.style.top = '50%';
            controlsToggle.style.right = '-40px';
        }

        // Function to toggle settings panel
        function toggleSettingsPanel(e) {
            if (e) {
                e.stopPropagation(); // Prevent event from bubbling
                e.preventDefault();
            }
            
            // Toggle settings panel visibility
            const isVisible = window.getComputedStyle(controls).display !== 'none';
            
            if (isVisible) {
                // Hide settings
                controls.style.opacity = '0';
                setTimeout(() => {
                    controls.style.display = 'none';
                }, 300);
            } else {
                // Show settings
                controls.style.display = 'flex';
                requestAnimationFrame(() => {
                    controls.style.opacity = '1';
                });
            }
        }
        
        // Handle settings toggle clicks
        controlsToggle.addEventListener('click', toggleSettingsPanel);
        digitalControlsToggle.addEventListener('click', toggleSettingsPanel);
        
        // OBS mode toggle functionality
        if (obsModeToggle) {
            obsModeToggle.addEventListener('change', function() {
                if (this.checked) {
                    document.body.classList.add('obs-mode');
                } else {
                    document.body.classList.remove('obs-mode');
                }
                
                // Update timezone and locale displays when switching modes
                updateTimezoneDisplay();
                updateLocaleDisplay();
            });
        }
        
        // Function to update control visibility based on settings
        // Note: updateControlVisibility function is defined later with full functionality

        // Function to format timezone names with internationalization
        function formatTimezoneName(timezoneId, locale) {
            if (timezoneId === 'local') {
                // Handle local timezone
                try {
                    const resolvedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                    return formatTimezoneName(resolvedTimezone, locale);
                } catch (e) {
                    return 'Local Time';
                }
            }
            
            try {
                // Try to get localized city name using Intl.DateTimeFormat
                const date = new Date();
                const formatter = new Intl.DateTimeFormat(locale, {
                    timeZone: timezoneId,
                    timeZoneName: 'long'
                });
                
                const parts = formatter.formatToParts(date);
                const timeZonePart = parts.find(part => part.type === 'timeZoneName');
                
                if (timeZonePart && timeZonePart.value) {
                    // Extract city name from timezone ID if timeZoneName is generic
                    const cityName = timezoneId.split('/').pop().replace(/_/g, ' ');
                    
                    // If we get a generic time zone name, prefer the city name
                    if (timeZonePart.value.includes('GMT') || timeZonePart.value.includes('UTC') || 
                        timeZonePart.value.length < 5) {
                        // Fall back to GMT offset
                        return getGMTOffset(timezoneId, locale);
                    }
                    
                    // Return the localized timezone name
                    return timeZonePart.value;
                }
            } catch (e) {
                console.error('Error getting localized timezone name:', e);
            }
            
            // Fallback to GMT offset
            return getGMTOffset(timezoneId, locale);
        }
        
        // Helper function to get GMT offset
        function getGMTOffset(timezoneId, locale) {
            try {
                const date = new Date();
                const formatter = new Intl.DateTimeFormat(locale, {
                    timeZone: timezoneId,
                    timeZoneName: 'short'
                });
                
                const parts = formatter.formatToParts(date);
                const timeZonePart = parts.find(part => part.type === 'timeZoneName');
                
                if (timeZonePart && timeZonePart.value) {
                    return timeZonePart.value;
                }
                
                // Manual calculation as final fallback
                const utc = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
                const targetDate = new Date(utc.toLocaleString('en-US', { timeZone: timezoneId }));
                const offset = (targetDate.getTime() - utc.getTime()) / (1000 * 60 * 60);
                
                const sign = offset >= 0 ? '+' : '-';
                const hours = Math.floor(Math.abs(offset));
                const minutes = Math.floor((Math.abs(offset) % 1) * 60);
                
                return `GMT${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            } catch (e) {
                console.error('Error calculating GMT offset:', e);
                return timezoneId.replace(/_/g, ' ');
            }
        }

        // Function to format date with locale support
        function formatDate(date, locale) {
            // Handle ISO 8601 format
            if (locale === 'iso-8601') {
                try {
                    // Get date in the selected timezone for ISO format
                    const selectedTimezone = timezoneSelect.value;
                    let targetDate = date;
                    
                    if (selectedTimezone !== 'local') {
                        // Create a date in the target timezone
                        const formatter = new Intl.DateTimeFormat('en-CA', {
                            timeZone: selectedTimezone,
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        });
                        
                        const parts = formatter.formatToParts(date);
                        const year = parts.find(part => part.type === 'year').value;
                        const month = parts.find(part => part.type === 'month').value;
                        const day = parts.find(part => part.type === 'day').value;
                        
                        return `${year}-${month}-${day}`;
                    } else {
                        // Local timezone - use simple ISO format
                        return date.toISOString().split('T')[0];
                    }
                } catch (e) {
                    console.error('Error formatting ISO 8601 date:', e);
                    // Fallback to basic ISO format
                    return date.toISOString().split('T')[0];
                }
            }
            
            // Handle regular locale-based formatting
            const options = { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric'
            };
            
            try {
                // Handle timezone and locale together
                const selectedTimezone = timezoneSelect.value; // Ensure timezoneSelect is defined and accessible
                if (selectedTimezone !== 'local') {
                    return new Intl.DateTimeFormat(locale, {
                        ...options,
                        timeZone: selectedTimezone
                    }).format(date);
                } else {
                    return new Intl.DateTimeFormat(locale, options).format(date);
                }
            } catch (e) {
                console.error('Error formatting date:', e);
                // Fallback to basic locale formatting without timezone
                return new Intl.DateTimeFormat(locale, options).format(date);
            }
        }

        // Update the clock hands and digital time
        function updateClock() {
            // Get time based on selected timezone
            let now;
            const selectedTimezone = timezoneSelect.value;
            
            if (selectedTimezone === 'local') {
                now = new Date();
            } else {
                // Get time in the specified timezone
                try {
                    // Create date in local time
                    const localDate = new Date();
                    
                    // Format using the specified timezone
                    const options = { timeZone: selectedTimezone };
                    const formatter = new Intl.DateTimeFormat('en-US', {
                        timeZone: selectedTimezone,
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: false
                    });
                    
                    // Get parts
                    const parts = formatter.formatToParts(localDate);
                    const dateParts = {};
                    
                    parts.forEach(part => {
                        if (part.type !== 'literal') {
                            dateParts[part.type] = parseInt(part.value);
                        }
                    });
                    
                    // Create new date object
                    now = new Date(
                        dateParts.year,
                        dateParts.month - 1, // months are 0-indexed
                        dateParts.day,
                        dateParts.hour,
                        dateParts.minute,
                        dateParts.second
                    );
                    
                    // Add milliseconds from the local date for smoother animation
                    // (since formatToParts doesn't give milliseconds)
                    now.setMilliseconds(localDate.getMilliseconds());
                } catch (e) {
                    console.error('Error formatting time for timezone', selectedTimezone, e);
                    now = new Date(); // Fall back to local time
                }
            }
            
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            const milliseconds = now.getMilliseconds();
            
            // Calculate angles for hands
            // Include milliseconds for smooth movement
            const secondRatio = (seconds + milliseconds / 1000) / 60;
            const minuteRatio = (minutes + secondRatio) / 60;
            const hourRatio = ((hours % 12) + minuteRatio) / 12;
            
            // Set rotation for hands
            setRotation(hourHand, hourRatio * 360);
            setRotation(minuteHand, minuteRatio * 360);
            setRotation(secondHand, secondRatio * 360);
            
            // Update digital time
            const formattedHours = hours.toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = ampmToggle.checked ? (hours % 12 || 12) : hours;
            const displayHoursFormatted = displayHours.toString().padStart(2, '0');
            
            // Build time string based on settings
            let timeString = '';
            
            if (ampmToggle.checked) {
                timeString = secondsToggle.checked
                    ? `${displayHoursFormatted}:${formattedMinutes}:${formattedSeconds} ${ampm}`
                    : `${displayHoursFormatted}:${formattedMinutes} ${ampm}`;
            } else {
                timeString = secondsToggle.checked
                    ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
                    : `${formattedHours}:${formattedMinutes}`;
            }
            
            digitalTime.textContent = timeString;
            
            // Update timezone display with internationalization
            const timezoneDisplay = document.querySelector('.timezone-display');
            const currentLocale = localeSelect ? localeSelect.value : 'en-US';
            
            // Use the new internationalized timezone formatting function
            timezoneDisplay.textContent = formatTimezoneName(selectedTimezone, currentLocale);
            
            // Update date display
            const dateDisplay = document.querySelector('.date-display');
            if (dateDisplay && localeSelect) { // Ensure elements exist
                try {
                    dateDisplay.textContent = formatDate(now, localeSelect.value);
                    dateDisplay.setAttribute('lang', localeSelect.value); 
                } catch (e) {
                    console.error("Error updating date display with locale: ", e);
                    // Fallback to a simple, non-localized date if formatDate fails catastrophically
                    const fallbackOptions = { year: 'numeric', month: 'short', day: 'numeric' };
                    dateDisplay.textContent = now.toLocaleDateString(undefined, fallbackOptions);
                    // Also set lang attribute in fallback if possible, or to a default
                    dateDisplay.setAttribute('lang', localeSelect.value || 'en-US');
                }
            }
            
            // Call requestAnimationFrame for smooth animation
            requestAnimationFrame(updateClock);
        }

        function setRotation(element, rotation) {
            element.style.transform = `rotate(${rotation}deg)`;
        }

        // Get scene ID from URL parameters (if any)
        function getSceneId() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('scene') || 'default';
        }
        
        // Save settings to localStorage with scene support
        function saveSettings() {
            const sceneId = getSceneId();
            const settings = {
                secondHand: secondHandToggle.checked,
                displayMode: displayModeSelect.value,
                ampm: ampmToggle.checked,
                showSeconds: secondsToggle.checked,
                showTimezone: showTimezoneToggle.checked,
                timezoneStyle: timezoneStyleSelect.value,
                showDate: showDateToggle.checked,
                dateStyle: dateStyleSelect.value,
                numbers: numbersToggle.checked,
                numberStyle: numberStyleSelect.value,
                digitalStyle: digitalStyleSelect.value,
                theme: themeSelect.value,
                scale: scaleSlider.value,
                handThickness: handThicknessSelect.value,
                accentColor: accentColorPicker.value,
                accentSize: accentSizeSlider.value,
                secondHandColor: secondHandColorPicker.value,
                clockFaceColor: clockFaceColorPicker.value,
                timezone: timezoneSelect.value,
                backgroundOpacity: opacitySlider.value,
                locale: localeSelect.value, // Added locale saving
                obsMode: obsModeToggle ? obsModeToggle.checked : false, // Added OBS mode saving
            };
            
            // Use scene-specific storage key
            localStorage.setItem(`clockSettings-${sceneId}`, JSON.stringify(settings));
        }
        
        // Load settings from localStorage with scene support
        function loadSettings() {
            const sceneId = getSceneId();
            const savedSettings = localStorage.getItem(`clockSettings-${sceneId}`);
            
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                
                // Apply saved settings
                secondHandToggle.checked = settings.secondHand;
                secondHand.style.display = settings.secondHand ? 'block' : 'none';
                
                // Handle display mode
                if (settings.displayMode) {
                    displayModeSelect.value = settings.displayMode;
                    const clockElement = document.querySelector('.clock');
                    const digitalContainer = document.querySelector('.digital-container');
                    const digitalControlsToggle = document.querySelector('.digital-controls-toggle');
                    
                    if (settings.displayMode === 'both') {
                        clockElement.style.display = 'flex';
                        digitalContainer.style.display = 'inline-block';
                        digitalControlsToggle.style.display = 'none'; // Hide digital gear in both mode
                    } else if (settings.displayMode === 'analog') {
                        clockElement.style.display = 'flex';
                        digitalContainer.style.display = 'none';
                        digitalControlsToggle.style.display = 'none'; // Hide digital gear in analog mode
                    } else if (settings.displayMode === 'digital') {
                        clockElement.style.display = 'none';
                        digitalContainer.style.display = 'inline-block';
                        digitalControlsToggle.style.display = 'flex'; // Show digital gear in digital-only mode
                    }
                }
                
                ampmToggle.checked = settings.ampm || true; // Default to true if missing
                
                if (settings.showSeconds !== undefined) {
                    secondsToggle.checked = settings.showSeconds;
                }
                
                if (settings.showTimezone !== undefined) {
                    showTimezoneToggle.checked = settings.showTimezone;
                    document.querySelector('.timezone-display').style.display = 
                        settings.showTimezone ? 'block' : 'none';
                }
                
                if (settings.timezoneStyle) {
                    timezoneStyleSelect.value = settings.timezoneStyle;
                    document.querySelector('.timezone-display').className = 
                        'timezone-display ' + settings.timezoneStyle;
                } else {
                    document.querySelector('.timezone-display').className = 
                        'timezone-display rounded'; // Default
                }
                
                if (settings.showDate !== undefined) {
                    showDateToggle.checked = settings.showDate;
                    document.querySelector('.date-display').style.display = 
                        settings.showDate ? 'block' : 'none';
                }
                
                if (settings.dateStyle) {
                    dateStyleSelect.value = settings.dateStyle;
                    document.querySelector('.date-display').className = 
                        'date-display ' + settings.dateStyle;
                } else {
                    document.querySelector('.date-display').className = 
                        'date-display rounded'; // Default
                }
                
                numbersToggle.checked = settings.numbers;
                
                if (settings.numberStyle) {
                    numberStyleSelect.value = settings.numberStyle;
                }
                
                if (settings.digitalStyle) {
                    digitalStyleSelect.value = settings.digitalStyle;
                    digitalTime.className = 'digital-time ' + settings.digitalStyle;
                } else {
                    digitalTime.className = 'digital-time rounded';
                }
                
                // Apply theme setting
                if (settings.theme) {
                    themeSelect.value = settings.theme;
                    
                    // Remove all theme classes first
                    document.body.classList.remove(
                        'theme-light', 
                        'theme-dark', 
                        'theme-natural', 
                        'theme-transparent',
                        'theme-neon',
                        'theme-pastel',
                        'theme-forest',
                        'theme-sunset',
                        'theme-ocean'
                    );
                    
                    // Add the selected theme class
                    document.body.classList.add('theme-' + settings.theme);
                    
                    // Apply opacity if it was set earlier
                    if (settings.backgroundOpacity !== undefined) {
                        // This ensures opacity is applied after theme change
                        setTimeout(() => {
                            opacitySlider.dispatchEvent(new Event('input'));
                        }, 10);
                    }
                } 
                // Handle legacy settings for backward compatibility
                else if (settings.darkMode !== undefined || settings.transparent !== undefined) {
                    let themeValue = 'light'; // default
                    
                    if (settings.transparent) {
                        themeValue = 'transparent';
                    } else if (settings.darkMode) {
                        themeValue = 'dark';
                    }
                    
                    themeSelect.value = themeValue;
                    document.body.classList.add('theme-' + themeValue);
                }
                
                if (settings.scale) {
                    scaleSlider.value = settings.scale;
                    document.documentElement.style.setProperty('--scale', settings.scale / 100);
                }
                
                if (settings.handThickness) {
                    handThicknessSelect.value = settings.handThickness;
                    // Trigger the change event to apply thickness
                    const event = new Event('change');
                    handThicknessSelect.dispatchEvent(event);
                }
                
                if (settings.accentColor) {
                    accentColorPicker.value = settings.accentColor;
                    // Trigger the input event to apply all color settings
                    const accentEvent = new Event('input');
                    accentColorPicker.dispatchEvent(accentEvent);
                }
                
                if (settings.accentSize !== undefined) {
                    accentSizeSlider.value = settings.accentSize;
                }
                
                if (settings.backgroundOpacity !== undefined) {
                    opacitySlider.value = settings.backgroundOpacity;
                    // Trigger the input event to apply opacity
                    const opacityEvent = new Event('input');
                    opacitySlider.dispatchEvent(opacityEvent);
                }
                
                if (settings.secondHandColor) {
                    secondHandColorPicker.value = settings.secondHandColor;
                    // Trigger the input event to apply all color settings
                    const secondHandEvent = new Event('input');
                    secondHandColorPicker.dispatchEvent(secondHandEvent);
                }
                
                if (settings.clockFaceColor) {
                    clockFaceColorPicker.value = settings.clockFaceColor;
                    // Trigger the input event to apply the color
                    const clockFaceEvent = new Event('input');
                    clockFaceColorPicker.dispatchEvent(clockFaceEvent);
                }
                
                // Set timezone if saved
                if (settings.timezone) {
                    // Check if the saved timezone is valid
                    const allTimezones = ['local', ...timezones.map(tz => tz.value)];
                    if (allTimezones.includes(settings.timezone)) {
                        timezoneSelect.value = settings.timezone;
                    }
                }

                // Set locale if saved, otherwise default
                if (localeSelect && typeof localeOptions !== 'undefined') { // Ensure localeSelect and localeOptions exist
                    if (settings.locale && localeOptions.includes(settings.locale)) {
                        localeSelect.value = settings.locale;
                    } else {
                        // Default to browser locale or fallback to en-US
                        const browserLocale = navigator.language || 'en-US';
                        // Find the closest supported locale (exact match, then language part match, then 'en-US')
                        let supportedLocale = localeOptions.find(lc => lc.toLowerCase() === browserLocale.toLowerCase());
                        if (!supportedLocale) {
                            const languagePart = browserLocale.split('-')[0];
                            supportedLocale = localeOptions.find(lc => lc.toLowerCase().startsWith(languagePart.toLowerCase()));
                        }
                        localeSelect.value = supportedLocale || 'en-US'; // Final fallback to en-US
                    }
                }
                
                // Update UI
                updateClockNumbers();
                updateAccentSize();
                updateTimezoneDisplay(); // Update timezone navigation display
                updateLocaleDisplay(); // Update locale display after loading settings
            } else {
                // Default settings if nothing is saved
                digitalTime.className = 'digital-time rounded';
                updateClockNumbers();
                updateAccentSize();
                updateTimezoneDisplay(); // Update timezone navigation display
                updateLocaleDisplay(); // Update locale display for defaults
            }
        }
        
        // Timezone navigation for OBS mode
        // Note: prevTzBtn, nextTzBtn, and tzDisplay are already declared above
        
        // Function to update timezone display in the navigation component
        function updateTimezoneDisplay() {
            const selectedValue = timezoneSelect.value;
            let displayText = 'Local Time';
            
            if (selectedValue !== 'local') {
                const selectedOption = timezones.find(tz => tz.value === selectedValue);
                if (selectedOption) {
                    displayText = selectedOption.label;
                }
            }
            
            tzDisplay.textContent = displayText;
        }

        // Function to update locale display in the navigation component
        function updateLocaleDisplay() {
            if (localeSelect && localeDisplay) { // Add null check for elements
                const selectedValue = localeSelect.value;
                // Ensure selectedValue is valid and exists in localeNames
                if (localeNames[selectedValue]) {
                    localeDisplay.textContent = localeNames[selectedValue].split('(')[0].trim(); // Show only the name part
                } else if (typeof localeOptions !== 'undefined' && localeOptions.includes(selectedValue)) {
                     // Fallback if name is not in localeNames but option exists
                    localeDisplay.textContent = selectedValue;
                } else if (typeof localeOptions !== 'undefined' && localeOptions.length > 0) {
                    // Fallback to the first option if current value is invalid
                    localeSelect.value = localeOptions[0];
                    localeDisplay.textContent = localeNames[localeOptions[0]].split('(')[0].trim();
                } else {
                    localeDisplay.textContent = 'N/A'; // No options available
                }
            } else {
                // console.error("Locale display elements or localeNames/localeOptions not found for updateLocaleDisplay");
            }
        }

        // Navigate through locales
        function navigateLocales(direction) {
            if (!localeSelect || typeof localeOptions === 'undefined' || localeOptions.length === 0) return; 

            const currentIndex = localeOptions.indexOf(localeSelect.value);
            let nextIndex;

            if (direction === 'prev') {
                nextIndex = (currentIndex - 1 + localeOptions.length) % localeOptions.length;
            } else { // next
                nextIndex = (currentIndex + 1) % localeOptions.length;
            }
            
            localeSelect.value = localeOptions[nextIndex];
            updateLocaleDisplay();
            
            // Trigger change event to update the clock and save settings
            const event = new Event('change');
            localeSelect.dispatchEvent(event); 
            // saveSettings(); // saveSettings will be called by the event listener on localeSelect
        }
        
        // Navigate through timezones
        function navigateTimezones(direction) {
            // Create a list of all timezone values
            const tzValues = ['local', ...timezones.map(tz => tz.value)];
            
            // Find current index
            const currentIndex = tzValues.indexOf(timezoneSelect.value);
            
            // Calculate next index with wraparound
            let nextIndex;
            if (direction === 'prev') {
                nextIndex = (currentIndex - 1 + tzValues.length) % tzValues.length;
            } else { // next
                nextIndex = (currentIndex + 1) % tzValues.length;
            }
            
            // Set the new timezone
            timezoneSelect.value = tzValues[nextIndex];
            
            // Update the display
            updateTimezoneDisplay();
            
            // Trigger change event to update the clock
            const event = new Event('change');
            timezoneSelect.dispatchEvent(event);
        }
        
        // Set up event listeners for timezone navigation
        prevTzBtn.addEventListener('click', () => navigateTimezones('prev'));
        nextTzBtn.addEventListener('click', () => navigateTimezones('next'));
        
        // Initialize timezone display
        updateTimezoneDisplay();
        
        // Update timezone display when select changes
        timezoneSelect.addEventListener('change', updateTimezoneDisplay);
        
        // Set up event listeners for locale navigation
        if (prevLocaleBtn && nextLocaleBtn) { // Add null check
            prevLocaleBtn.addEventListener('click', () => navigateLocales('prev'));
            nextLocaleBtn.addEventListener('click', () => navigateLocales('next'));
        }

        // Update locale display when select changes (e.g., by presets or direct interaction)
        if (localeSelect) { // Add null check
            localeSelect.addEventListener('change', updateLocaleDisplay);
        }
        
        // Function to update control visibility based on settings
        function updateControlVisibility() {
            // Get all control items
            const controlItems = document.querySelectorAll('.control-item');
            
            // Hide Time Zone control if Show Time Zone is disabled
            const timezoneControl = document.getElementById('timezone-control');
            if (timezoneControl) {
                timezoneControl.style.display = showTimezoneToggle.checked ? 'flex' : 'none';
            }
            
            // Hide Time Zone Style if Show Time Zone is disabled
            const timeZoneStyleControl = Array.from(controlItems).find(
                item => item.querySelector('span')?.textContent === 'Time Zone Style'
            );
            if (timeZoneStyleControl) {
                timeZoneStyleControl.style.display = showTimezoneToggle.checked ? 'flex' : 'none';
            }
            
            // Hide Date Format control if Show Date is disabled
            const dateFormatControl = document.getElementById('date-format-control');
            if (dateFormatControl) {
                dateFormatControl.style.display = showDateToggle.checked ? 'flex' : 'none';
            }
            
            // Hide Date Style if Show Date is disabled
            const dateStyleControl = Array.from(controlItems).find(
                item => item.querySelector('span')?.textContent === 'Date Style'
            );
            if (dateStyleControl) {
                dateStyleControl.style.display = showDateToggle.checked ? 'flex' : 'none';
            }
            
            // Hide Number Style if Clock Numbers is disabled
            const numberStyleControl = Array.from(controlItems).find(
                item => item.querySelector('span')?.textContent === 'Number Style'
            );
            if (numberStyleControl) {
                numberStyleControl.style.display = numbersToggle.checked ? 'flex' : 'none';
            }
            
            // If Display Mode is set to Digital only
            const isDigitalOnly = displayModeSelect.value === 'digital';
            
            // Hide analog-specific controls if in Digital only mode
            const secondHandControl = Array.from(controlItems).find(
                item => item.querySelector('span')?.textContent === 'Second Hand'
            );
            const clockNumbersControl = Array.from(controlItems).find(
                item => item.querySelector('span')?.textContent === 'Clock Numbers'
            );
            const handThicknessControl = Array.from(controlItems).find(
                item => item.querySelector('span')?.textContent === 'Hand Thickness'
            );
            const secondHandColorControl = Array.from(controlItems).find(
                item => item.querySelector('span')?.textContent === 'Second Hand Color'
            );
            const opacityControl = Array.from(controlItems).find(
                item => item.querySelector('span')?.textContent === 'Background Opacity'
            );
            const clockFaceColorControl = Array.from(controlItems).find(
                item => item.querySelector('span')?.textContent === 'Clock Face Color'
            );
            
            if (secondHandControl) secondHandControl.style.display = isDigitalOnly ? 'none' : 'flex';
            if (clockNumbersControl) clockNumbersControl.style.display = isDigitalOnly ? 'none' : 'flex';
            if (numberStyleControl && isDigitalOnly) numberStyleControl.style.display = 'none';
            if (handThicknessControl) handThicknessControl.style.display = isDigitalOnly ? 'none' : 'flex';
            if (secondHandColorControl) secondHandColorControl.style.display = isDigitalOnly ? 'none' : 'flex';
            if (clockFaceColorControl) clockFaceColorControl.style.display = isDigitalOnly ? 'none' : 'flex';
            if (opacityControl) opacityControl.style.display = isDigitalOnly ? 'none' : 'flex';
            
            // Hide Digital Style if in Analog only mode
            const isAnalogOnly = displayModeSelect.value === 'analog';
            const digitalStyleControl = Array.from(controlItems).find(
                item => item.querySelector('span')?.textContent === 'Digital Style'
            );
            if (digitalStyleControl) {
                digitalStyleControl.style.display = isAnalogOnly ? 'none' : 'flex';
            }
        }

        // Set up event listeners to save settings when changed
        const settingsControls = [
            secondHandToggle, displayModeSelect, ampmToggle, secondsToggle, 
            showTimezoneToggle, timezoneStyleSelect,
            showDateToggle, dateStyleSelect, localeSelect, // Added localeSelect here
            numbersToggle, numberStyleSelect, digitalStyleSelect, themeSelect,
            scaleSlider, handThicknessSelect, accentColorPicker,
            accentSizeSlider, secondHandColorPicker, clockFaceColorPicker, timezoneSelect, opacitySlider
        ];
        
        settingsControls.forEach(control => {
            const eventType = control.type === 'range' || control.type === 'color' ? 'input' : 'change';
            control.addEventListener(eventType, saveSettings);
            
            // Additionally, update control visibility when these specific controls change
            if ([displayModeSelect, showTimezoneToggle, showDateToggle, numbersToggle].includes(control)) {
                control.addEventListener(eventType, updateControlVisibility);
            }
        });
        
        // Add event listener for opacity slider
        opacitySlider.addEventListener('input', function() {
            const opacityValue = this.value / 100;
            
            // Get the base color from the clockFaceColorPicker
            const colorValue = clockFaceColorPicker.value;
            
            // Convert hex to RGB
            const r = parseInt(colorValue.substr(1, 2), 16);
            const g = parseInt(colorValue.substr(3, 2), 16);
            const b = parseInt(colorValue.substr(5, 2), 16);
            
            // Update the opacity value in the CSS variable
            document.documentElement.style.setProperty('--clock-face-opacity', opacityValue);
            
            // Update the clock face color with the new opacity
            const newColor = `rgba(${r}, ${g}, ${b}, ${opacityValue})`;
            
            // Apply directly to the clock element to ensure it overrides theme styles
            document.querySelector('.clock').style.backgroundColor = newColor;
        });
        
        // Add event listener for clock face color picker
        clockFaceColorPicker.addEventListener('input', function() {
            const colorValue = this.value;
            const opacityValue = opacitySlider.value / 100;
            
            // Convert hex to RGB
            const r = parseInt(colorValue.substr(1, 2), 16);
            const g = parseInt(colorValue.substr(3, 2), 16);
            const b = parseInt(colorValue.substr(5, 2), 16);
            
            // Update the clock face color with the current opacity
            const newColor = `rgba(${r}, ${g}, ${b}, ${opacityValue})`;
            
            // Apply directly to the clock element
            document.querySelector('.clock').style.backgroundColor = newColor;
        });
        
        // Default values are now defined in the presets
        
        // Default settings are now handled by the preset "default"
        
        // OBS-compatible select button handlers
        function setupSelectButtons() {
            // Function to initialize all button selects
            const setupButtonGroup = (buttonClass, selectId) => {
                const buttons = document.querySelectorAll(`.${buttonClass}`);
                const select = document.getElementById(selectId);
                
                if (!buttons.length || !select) return;
                
                // Initial state - mark active button
                const initialValue = select.value;
                buttons.forEach(btn => {
                    if (btn.dataset.value === initialValue) {
                        btn.classList.add('active');
                    }
                });
                
                // Add click handler to all buttons
                buttons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        // Remove active class from all buttons and reset their styles
                        buttons.forEach(b => {
                            b.classList.remove('active');
                            b.style.removeProperty('background-color');
                            b.style.removeProperty('color');
                            b.style.removeProperty('border-color');
                        });
                        
                        // Add active class to clicked button
                        btn.classList.add('active');
                        
                        // Set select element value
                        select.value = btn.dataset.value;
                        
                        // Trigger change event for the select
                        const event = new Event('change');
                        select.dispatchEvent(event);
                    });
                });
            };
            
            // Setup all button groups
            setupButtonGroup('theme-btn', 'theme-select');
            setupButtonGroup('display-mode-btn', 'display-mode-select');
            setupButtonGroup('number-style-btn', 'number-style-select');
            setupButtonGroup('digital-style-btn', 'digital-style-select');
            setupButtonGroup('timezone-style-btn', 'timezone-style-select');
            setupButtonGroup('date-style-btn', 'date-style-select');
            setupButtonGroup('hand-thickness-btn', 'hand-thickness-select');
            setupButtonGroup('preset-btn', 'preset-select');
        }
        
        // Load settings on initialization
        loadSettings();
        // Initial call to set the locale display based on loaded or default settings
        updateLocaleDisplay(); 
        
        // Setup OBS-compatible buttons
        setupSelectButtons();
        
        // Initialize control visibility based on current settings
        updateControlVisibility();
        
        // OBS Compatibility Mode toggle
        const obsToggle = document.getElementById('obs-mode-toggle');
        
        function updateObsMode() {
            const isObsMode = obsToggle.checked;
            
            if (isObsMode) {
                document.body.classList.add('obs-mode');
                // Show swatch containers
                document.querySelectorAll('.color-picker-container').forEach(container => {
                    container.style.display = 'block';
                });
                // Hide actual color inputs
                document.querySelectorAll('input[type="color"]').forEach(input => {
                    input.style.display = 'none';
                });
                // Language control: show carousel, hide select
                const langNav = document.querySelector('.language-navigation');
                if (langNav) langNav.style.display = 'flex';
                if (languageSelect) languageSelect.style.display = 'none';
            } else {
                document.body.classList.remove('obs-mode');
                // Hide swatch containers
                document.querySelectorAll('.color-picker-container').forEach(container => {
                    container.style.display = 'none';
                });
                // Show actual color inputs
                document.querySelectorAll('input[type="color"]').forEach(input => {
                    input.style.display = 'block';
                });
                // Language control: hide carousel, show select
                const langNav = document.querySelector('.language-navigation');
                if (langNav) langNav.style.display = 'none';
                if (languageSelect) languageSelect.style.display = 'block';
            }
        }
        
        obsToggle.addEventListener('change', function() {
            updateObsMode();
            
            // Save OBS mode preference
            localStorage.setItem('obsMode', this.checked);
        });
        
        // Load OBS mode preference (enabled by default)
        const savedObsMode = localStorage.getItem('obsMode');
        if (savedObsMode === null || savedObsMode === 'true') {
            obsToggle.checked = true;
            document.querySelector('.obs-preview-window').style.display = 'block';
        }
        // Apply mode-specific UI at startup
        updateObsMode();
        
        // Update OBS preview window when toggle changes
        obsToggle.addEventListener('change', function() {
            const previewWindow = document.querySelector('.obs-preview-window');
            if (this.checked) {
                previewWindow.style.display = 'block';
            } else {
                previewWindow.style.display = 'none';
            }
        });
        
        // Ensure theme is set correctly (if nothing was loaded from localStorage)
        if (!document.body.classList.contains('theme-light') && 
            !document.body.classList.contains('theme-dark') && 
            !document.body.classList.contains('theme-natural') && 
            !document.body.classList.contains('theme-transparent') &&
            !document.body.classList.contains('theme-neon') &&
            !document.body.classList.contains('theme-pastel') &&
            !document.body.classList.contains('theme-forest') &&
            !document.body.classList.contains('theme-sunset') &&
            !document.body.classList.contains('theme-ocean')) {
            document.body.classList.add('theme-light');
        }
        
        // Update controls position
        updateControlsPosition();
        
        // Handle window resize
        window.addEventListener('resize', updateControlsPosition);
        
        // Initialize color swatches
        setupColorSwatches();
        
        // Start the clock
        updateClock();
        
        // Initialize control visibility
        updateControlVisibility();
        
        // Load saved settings last to ensure all controls are available
        loadSettings();

        // Make the clock and controls draggable
        let isDragging = false;
        let dragTarget = null;
        let offsetX, offsetY;

        // Make the clock draggable
        clock.addEventListener('mousedown', startDrag);
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);

        function startDrag(e) {
            // Don't start drag if clicking on controls or controls toggle
            if (e.target.closest('.controls') || e.target.closest('.controls-toggle')) {
                return;
            }
            
            isDragging = true;
            dragTarget = e.target.closest('.container');
            
            const rect = dragTarget.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            
            dragTarget.style.cursor = 'grabbing';
            e.preventDefault();
        }

        function drag(e) {
            if (!isDragging) return;
            
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            
            dragTarget.style.position = 'absolute';
            dragTarget.style.left = `${x}px`;
            dragTarget.style.top = `${y}px`;
            
            // Update the controls position after dragging
            updateControlsPosition();
        }

        function endDrag() {
            if (isDragging && dragTarget) {
                dragTarget.style.cursor = '';
                isDragging = false;
                
                // Ensure the controls are positioned correctly
                updateControlsPosition();
            }
        }
        
        // Setup color swatch pickers
        function setupColorSwatches() {
            // Color palettes for swatches
            const colorPalettes = {
                main: [
                    '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF',
                    '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41',
                    '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40', '#78909C', '#FFFFFF',
                    '#BDBDBD', '#757575', '#424242', '#212121', '#000000', '#85A67B'
                ],
                pastel: [
                    '#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9', '#BBDEFB',
                    '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9', '#DCEDC8', '#F0F4C3',
                    '#FFF9C4', '#FFECB3', '#FFE0B2', '#FFCCBC', '#D7CCC8', '#F5F5F5',
                    '#CFD8DC', '#FBEFEB', '#ECEBF3', '#E8F8F5', '#FAEEEE', '#F0F5E8'
                ],
                neon: [
                    '#FF0000', '#FF00FF', '#AA00FF', '#0000FF', '#00FFFF', '#00FF00',
                    '#FFFF00', '#FF6600', '#FF3399', '#33FF99', '#33FFFF', '#33CCFF',
                    '#3366FF', '#CC33FF', '#FF33CC', '#FF7F00', '#F0FF00', '#00FF7F',
                    '#FF33F5', '#FF66CC', '#33FFC4', '#FDFF00', '#808080', '#FFFFFF'
                ]
            };
            
            // Setup accent color swatches
            setupColorPickerSwatches(
                'accent-color-swatches',
                'accent-color-picker',
                colorPalettes,
                '.accent-palette-btn'
            );
            
            // Setup second hand color swatches
            setupColorPickerSwatches(
                'second-hand-color-swatches',
                'second-hand-color-picker',
                colorPalettes,
                '.second-hand-palette-btn'
            );
            
            // Setup clock face color swatches
            setupColorPickerSwatches(
                'clock-face-color-swatches',
                'clock-face-color-picker',
                colorPalettes,
                '.clock-face-palette-btn'
            );
        }
        
        function setupColorPickerSwatches(swatchesContainerId, colorPickerId, palettes, paletteButtonSelector) {
            const container = document.getElementById(swatchesContainerId);
            const colorPicker = document.getElementById(colorPickerId);
            const paletteButtons = document.querySelectorAll(paletteButtonSelector);
            
            // Initial palette is 'main'
            let currentPalette = 'main';
            
            // Function to render swatches for current palette
            function renderSwatches() {
                // Clear existing swatches
                container.innerHTML = '';
                
                // Create swatches for current palette
                palettes[currentPalette].forEach(color => {
                    const swatch = document.createElement('button');
                    swatch.className = 'color-swatch';
                    swatch.style.backgroundColor = color;
                    
                    // Mark active if matches current color picker value
                    if (color.toLowerCase() === colorPicker.value.toLowerCase()) {
                        swatch.classList.add('active');
                    }
                    
                    // Add click handler
                    swatch.addEventListener('click', () => {
                        // Update color picker value
                        colorPicker.value = color;
                        
                        // Remove active class from all swatches
                        container.querySelectorAll('.color-swatch').forEach(s => {
                            s.classList.remove('active');
                        });
                        
                        // Add active class to clicked swatch
                        swatch.classList.add('active');
                        
                        // Trigger input event on color picker to apply changes
                        const event = new Event('input');
                        colorPicker.dispatchEvent(event);
                    });
                    
                    container.appendChild(swatch);
                });
            }
            
            // Handle palette button clicks
            paletteButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Update current palette
                    currentPalette = button.dataset.palette;
                    
                    // Remove active class from all palette buttons
                    paletteButtons.forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    // Render swatches for new palette
                    renderSwatches();
                });
            });
            
            // Initialize with first palette
            renderSwatches();
            
            // Handle color picker changes (to sync selected swatch)
            colorPicker.addEventListener('input', () => {
                // Update swatches to reflect selected color
                const swatches = container.querySelectorAll('.color-swatch');
                let found = false;
                
                swatches.forEach(swatch => {
                    // Check if swatch color matches picker
                    if (rgbToHex(swatch.style.backgroundColor).toLowerCase() === colorPicker.value.toLowerCase()) {
                        swatch.classList.add('active');
                        found = true;
                    } else {
                        swatch.classList.remove('active');
                    }
                });
                
                // If we can't find an exact match, don't highlight any swatch
                if (!found) {
                    swatches.forEach(swatch => {
                        swatch.classList.remove('active');
                    });
                }
            });
        }
        
        // Helper function to convert RGB to Hex
        function rgbToHex(rgb) {
            // If already hex or named color
            if (!rgb || rgb.charAt(0) === '#') return rgb;
            
            // RGB or RGBA format parsing
            const rgbMatch = rgb.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
            if (rgbMatch) {
                return '#' + 
                    Number(rgbMatch[1]).toString(16).padStart(2, '0') +
                    Number(rgbMatch[2]).toString(16).padStart(2, '0') +
                    Number(rgbMatch[3]).toString(16).padStart(2, '0');
            }
            
            return rgb; // Return original if can't parse
        }