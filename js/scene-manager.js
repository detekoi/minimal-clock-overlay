        // Data storage structure
        const STORAGE_KEY = 'minimal-clock-scenes';
        const DEFAULT_DATA = {
            version: '1.0',
            instances: []
        };
        
        // i18n setup
        const languageSelect = document.getElementById('language-select');

        function applyTranslations(lang) {
            const t = (translations && translations[lang]) ? translations[lang] : (translations && translations['en']) || {};
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
            setupValidationMessages(lang);
            // Refresh dynamic content so buttons/labels reflect the new language
            try { renderInstances(); } catch (e) {}
        }

        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => setLanguage(e.target.value));
        }

        document.addEventListener('DOMContentLoaded', () => {
            const saved = (function(){
                if (typeof localStorage !== 'undefined' && localStorage.getItem('language')) return localStorage.getItem('language');
                const nav = navigator.language || navigator.userLanguage || '';
                if (nav.toLowerCase().startsWith('ru')) return 'ru';
                if (nav.toLowerCase().startsWith('pl')) return 'pl';
                return 'en';
            })();
            if (languageSelect) languageSelect.value = saved;
            applyTranslations(saved);
            setupValidationMessages(saved);
        });

        function setupValidationMessages(lang) {
            const t = (typeof translations !== 'undefined' && (translations[lang] || translations['en'])) || {};
            if (instanceNameInput) {
                instanceNameInput.oninvalid = function() { this.setCustomValidity(t.requiredFieldMessage || 'Please fill out this field'); };
                instanceNameInput.oninput = function() { this.setCustomValidity(''); };
            }
            if (instanceIdInput) {
                instanceIdInput.oninvalid = function() { this.setCustomValidity(t.requiredFieldMessage || 'Please fill out this field'); };
                instanceIdInput.oninput = function() { this.setCustomValidity(''); };
            }
        }

        // DOM Elements
        const createForm = document.getElementById('create-instance-form');
        const instanceNameInput = document.getElementById('instance-name');
        const instanceIdInput = document.getElementById('instance-id');
        const instanceDescriptionInput = document.getElementById('instance-description');
        const instancesList = document.getElementById('instances-list');
        const emptyState = document.getElementById('empty-state');
        const sortBySelect = document.getElementById('sort-by');
        const searchInput = document.getElementById('search-instances');
        const detailsModal = document.getElementById('instance-details-modal');
        const closeModalBtn = document.getElementById('close-modal');
        const closeDetailsBtn = document.getElementById('close-details-btn');
        const instanceUrlEl = document.getElementById('instance-url');
        const copyUrlBtn = document.getElementById('copy-url-btn');
        const tooltip = copyUrlBtn.querySelector('.tooltip');
        const detailsContent = document.getElementById('instance-details-content');
        const firstRunModal = document.getElementById('first-run-modal');
        const firstRunCloseBtn = document.getElementById('first-run-close');
        const firstRunCreateBtn = document.getElementById('first-run-create');
        
        // Auto-generate ID from name
        instanceNameInput.addEventListener('input', function() {
            const name = this.value;
            const id = name.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
                .replace(/\s+/g, '-') // Replace spaces with dashes
                .replace(/-+/g, '-'); // Remove duplicate dashes
            instanceIdInput.value = id;
        });
        
        // Create instance
        createForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = instanceNameInput.value.trim();
            const id = instanceIdInput.value.trim();
            const description = instanceDescriptionInput.value.trim();
            
            // With native validation active, the submit event won't fire when invalid.
            
            // Check if ID already exists
            const instances = getData().instances;
            if (instances.some(instance => instance.instanceId === id)) {
                showAlert('This Instance ID already exists. Please choose a different one.', 'warning');
                return;
            }
            
            // Create new instance
            const newInstance = {
                instanceId: id,
                name: name,
                description: description || null,
                createdAt: new Date().toISOString(),
                lastUsed: new Date().toISOString()
            };
            
            // Add to storage
            instances.push(newInstance);
            saveData({ version: '1.0', instances });
            
            // Reset form
            createForm.reset();
            
            // Update UI
            renderInstances();
            
            // Show success message
            const lang = (typeof localStorage !== 'undefined' && localStorage.getItem('language')) || 'en';
            const t = (typeof translations !== 'undefined' && (translations[lang] || translations['en'])) || {};
            showAlert((t.sceneCreatedTitle || 'Scene Created Successfully!'), 'success');
            
            // Show details modal with URL
            if (firstRunModal) {
                firstRunModal.classList.remove('show');
            }
            showInstanceDetails(newInstance);
        });
        
        // Get data from localStorage
        function getData() {
            const storedData = localStorage.getItem(STORAGE_KEY);
            return storedData ? JSON.parse(storedData) : DEFAULT_DATA;
        }
        
        // Save data to localStorage
        function saveData(data) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
        
        // Render instances list
        function renderInstances() {
            const data = getData();
            const instances = [...data.instances]; // Clone for sorting
            const searchTerm = searchInput.value.toLowerCase();
            const sortBy = sortBySelect.value;
            
            // Filter instances
            const filteredInstances = instances.filter(instance => {
                return instance.name.toLowerCase().includes(searchTerm) || 
                       (instance.description && instance.description.toLowerCase().includes(searchTerm)) ||
                       instance.instanceId.toLowerCase().includes(searchTerm);
            });
            
            // Sort instances
            filteredInstances.sort((a, b) => {
                if (sortBy === 'name') {
                    return a.name.localeCompare(b.name);
                } else if (sortBy === 'createdAt') {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }
                return 0;
            });
            
            // Clear list
            instancesList.innerHTML = '';
            
            // Show/hide empty state
            if (filteredInstances.length === 0) {
                emptyState.style.display = 'block';
                document.getElementById('instances-table').style.display = 'none';
                // Show first-run modal if there are truly no instances saved
                if (data.instances.length === 0) {
                    firstRunModal.classList.add('show');
                }
            } else {
                emptyState.style.display = 'none';
                document.getElementById('instances-table').style.display = 'table';
                
                // Render each instance
                filteredInstances.forEach(instance => {
                    const row = document.createElement('tr');
                    
                    // Format date
                    const lastUsedDate = new Date(instance.lastUsed);
                    const formattedDate = lastUsedDate.toLocaleDateString() + ' ' + 
                                          lastUsedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    
                    // Generate the URL
                    const baseUrl = window.location.href.replace(/\/[^\/]*$/, '/clock-overlay.html');
                    const url = `${baseUrl}?scene=${instance.instanceId}`;
                    
                    const lang = (typeof localStorage !== 'undefined' && localStorage.getItem('language')) || 'en';
                    const t = (typeof translations !== 'undefined' && (translations[lang] || translations['en'])) || {};
                    row.innerHTML = `
                        <td>
                            <div>${instance.name}</div>
                            ${instance.description ? `<div class="text-sm text-muted">${instance.description}</div>` : ''}
                            <div class="text-xs mt-1">
                                <span class="badge">${instance.instanceId}</span>
                            </div>
                        </td>
                        <td>
                            <div class="url-display table-url-display">
                                <span class="truncate">${url}</span>
                                <button class="copy-btn row-copy-btn" data-url="${url}">
                                    ${t.copyButton || 'Copy'}
                                    <span class="tooltip">${t.copiedTooltip || 'Copied!'}</span>
                                </button>
                            </div>
                        </td>
                        <td>
                            <div class="actions">
                                <button class="btn btn-sm view-btn" data-id="${instance.instanceId}">${t.detailsButton || 'Details'}</button>
                                <div class="confirm-wrapper">
                                    <button class="btn btn-sm btn-danger delete-btn" data-id="${instance.instanceId}">${t.deleteButton || 'Delete'}</button>
                                    <div class="confirm-message" id="confirm-${instance.instanceId}">
                                        <span class="confirm-text">${t.confirmAreYouSure || 'Are you sure?'}</span>
                                        <button class="btn btn-sm confirm-yes" data-id="${instance.instanceId}">${t.confirmYes || 'Yes'}</button>
                                        <button class="btn btn-sm confirm-no" data-id="${instance.instanceId}">${t.confirmNo || 'No'}</button>
                                    </div>
                                </div>
                            </div>
                        </td>
                    `;
                    
                    instancesList.appendChild(row);
                });
                
                // Add event listeners to buttons
                document.querySelectorAll('.view-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const instanceId = this.getAttribute('data-id');
                        const instance = filteredInstances.find(inst => inst.instanceId === instanceId);
                        if (instance) {
                            // Update last used time
                            updateLastUsed(instanceId);
                            showInstanceDetails(instance);
                        }
                    });
                });
                
                // Add event listeners to row copy buttons
                document.querySelectorAll('.row-copy-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const url = this.getAttribute('data-url');
                        const tooltip = this.querySelector('.tooltip');
                        
                        // Copy to clipboard
                        if (navigator.clipboard) {
                            navigator.clipboard.writeText(url)
                                .then(() => {
                                    tooltip.classList.add('show');
                                    setTimeout(() => tooltip.classList.remove('show'), 2000);
                                })
                                .catch(err => console.error('Could not copy text: ', err));
                        } else {
                            // Fallback for older browsers
                            const textArea = document.createElement('textarea');
                            textArea.value = url;
                            textArea.style.position = 'fixed';
                            document.body.appendChild(textArea);
                            textArea.focus();
                            textArea.select();
                            
                            try {
                                document.execCommand('copy');
                                tooltip.classList.add('show');
                                setTimeout(() => tooltip.classList.remove('show'), 2000);
                            } catch (err) {
                                console.error('Could not copy text: ', err);
                            }
                            
                            document.body.removeChild(textArea);
                        }
                    });
                });
                
                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const instanceId = this.getAttribute('data-id');
                        const confirmMessage = document.getElementById(`confirm-${instanceId}`);
                        confirmMessage.classList.add('show');
                    });
                });
                
                document.querySelectorAll('.confirm-yes').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const instanceId = this.getAttribute('data-id');
                        deleteInstance(instanceId);
                    });
                });
                
                document.querySelectorAll('.confirm-no').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const instanceId = this.getAttribute('data-id');
                        const confirmMessage = document.getElementById(`confirm-${instanceId}`);
                        confirmMessage.classList.remove('show');
                    });
                });
            }
        }
        
        // Show instance details modal
        function showInstanceDetails(instance) {
            // Generate the URL
            const baseUrl = window.location.href.replace(/\/[^\/]*$/, '/clock-overlay.html');
            const url = `${baseUrl}?scene=${instance.instanceId}`;
            instanceUrlEl.textContent = url;
            
            // Set modal title to reflect whether this is a new instance
            const isNewInstance = new Date().getTime() - new Date(instance.createdAt).getTime() < 5000;
            const lang = (typeof localStorage !== 'undefined' && localStorage.getItem('language')) || 'en';
            const t = (typeof translations !== 'undefined' && (translations[lang] || translations['en'])) || {};
            document.querySelector('.modal-title').textContent = isNewInstance ? (t.sceneCreatedTitle || "Scene Created Successfully!") : (t.sceneDetailsTitle || "Scene Details");
            
            detailsContent.innerHTML = `
                <div class="form-group">
                    <label>${t.nameLabel || 'Name'}</label>
                    <div class="form-control">${instance.name}</div>
                </div>
                <div class="form-group">
                    <label>${t.sceneIdLabel || 'Scene ID'}</label>
                    <div class="form-control">${instance.instanceId}</div>
                </div>
                ${instance.description ? `
                <div class="form-group">
                    <label>${t.descriptionLabel || 'Description (optional)'}</label>
                    <div class="form-control">${instance.description}</div>
                </div>
                ` : ''}
                <div class="form-group">
                    <label>${t.createdLabel || 'Created'}</label>
                    <div class="form-control">${formatDateTime(instance.createdAt)}</div>
                </div>
            `;
            
            // For new instances, add instruction text
            if (isNewInstance) {
                const instructionEl = document.createElement('div');
                instructionEl.className = 'alert alert-success mt-3';
                instructionEl.innerHTML = `
                    <span class="alert-icon">✓</span>
                    <div>
                        <strong>${t.nextStepsTitle || 'Next steps:'}</strong>
                        <ol class="mt-2">
                            <li>${t.nextStep1 || 'Copy the URL above'}</li>
                            <li>${t.nextStep2 || 'In OBS, add a Browser Source (size: 300x300)'}</li>
                            <li>${t.nextStep3 || 'Paste this URL in the Browser Source URL field'}</li>
                        </ol>
                    </div>
                `;
                detailsContent.appendChild(instructionEl);
            }
            
            // Show modal
            detailsModal.classList.add('show');
        }
        
        // Format date time
        function formatDateTime(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        }
        
        // Copy URL to clipboard
        copyUrlBtn.addEventListener('click', function() {
            const url = instanceUrlEl.textContent;
            
            // Use clipboard API if available
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url)
                    .then(() => showTooltip())
                    .catch(err => console.error('Could not copy text: ', err));
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = url;
                textArea.style.position = 'fixed';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    showTooltip();
                } catch (err) {
                    console.error('Could not copy text: ', err);
                }
                
                document.body.removeChild(textArea);
            }
        });
        
        function showTooltip() {
            tooltip.classList.add('show');
            setTimeout(() => {
                tooltip.classList.remove('show');
            }, 2000);
        }
        
        // Delete instance
        function deleteInstance(instanceId) {
            const data = getData();
            const index = data.instances.findIndex(inst => inst.instanceId === instanceId);
            
            if (index !== -1) {
                const instanceName = data.instances[index].name;
                data.instances.splice(index, 1);
                saveData(data);
                renderInstances();
                showAlert(`Clock scene "${instanceName}" deleted`, 'success');
            }
        }
        
        // Update last used time
        function updateLastUsed(instanceId) {
            const data = getData();
            const instance = data.instances.find(inst => inst.instanceId === instanceId);
            
            if (instance) {
                instance.lastUsed = new Date().toISOString();
                saveData(data);
                renderInstances();
            }
        }
        
        // Show alert message
        function showAlert(message, type) {
            // Remove any existing alerts
            const existingAlert = document.querySelector('.alert');
            if (existingAlert) {
                existingAlert.remove();
            }
            
            // Create alert
            const alert = document.createElement('div');
            alert.className = `alert alert-${type}`;
            alert.innerHTML = `
                <span class="alert-icon">${type === 'success' ? '✓' : '!'}</span>
                <span>${message}</span>
            `;
            
            // Insert after header
            const header = document.querySelector('.header');
            header.parentNode.insertBefore(alert, header.nextSibling);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                alert.remove();
            }, 5000);
        }
        
        // Close modal
        closeModalBtn.addEventListener('click', function() {
            detailsModal.classList.remove('show');
        });
        
        closeDetailsBtn.addEventListener('click', function() {
            detailsModal.classList.remove('show');
        });
        
        // Close modal when clicking outside
        detailsModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });

        // First-run modal interactions
        if (firstRunCloseBtn) {
            firstRunCloseBtn.addEventListener('click', function() {
                firstRunModal.classList.remove('show');
            });
        }
        if (firstRunModal) {
            firstRunModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('show');
                }
            });
        }
        if (firstRunCreateBtn) {
            firstRunCreateBtn.addEventListener('click', function() {
                firstRunModal.classList.remove('show');
                // Focus the name field to guide user to create the first scene
                instanceNameInput.focus();
            });
        }
        
        // Filter and sort instances
        sortBySelect.addEventListener('change', renderInstances);
        searchInput.addEventListener('input', renderInstances);
        
        // Initial render
        renderInstances();
