class GoldPriceTracker {
    constructor() {
        this.currentPrice = null;
        this.lastUpdated = null;
        this.refreshInterval = null;
        this.countdownInterval = null;
        this.refreshIntervalMs = 300000; // 5 minutes
        this.countdownTime = 0;
        
        // CORS proxy URLs (fallback options)
        this.proxies = [
            'https://api.allorigins.win/get?url=',
            'https://corsproxy.io/?'
        ];
        
        this.currentProxyIndex = 0;
        this.targetUrl = 'https://gold.pk/';
        
        this.initializeElements();
        this.bindEvents();
        this.startApplication();
    }
    
    initializeElements() {
        // Main display elements
        this.loadingEl = document.getElementById('loading');
        this.priceContentEl = document.getElementById('price-content');
        this.errorMessageEl = document.getElementById('error-message');
        this.goldPriceEl = document.getElementById('gold-price');
        this.lastUpdatedEl = document.getElementById('last-updated');
        this.updateTimeEl = document.getElementById('update-time');
        this.errorTextEl = document.getElementById('error-text');
        
        // Control elements
        this.refreshBtnEl = document.getElementById('refresh-btn');
        this.retryBtnEl = document.getElementById('retry-btn');
        
        // Status elements
        this.countdownEl = document.getElementById('countdown');
        this.statusIndicatorEl = document.getElementById('status-indicator');
        this.statusTextEl = document.getElementById('status-text');
    }
    
    bindEvents() {
        this.refreshBtnEl.addEventListener('click', () => this.manualRefresh());
        this.retryBtnEl.addEventListener('click', () => this.fetchGoldPrice());
        
        // Handle visibility change to pause/resume when tab is not active
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseCountdown();
            } else {
                this.resumeCountdown();
            }
        });
    }
    
    startApplication() {
        this.updateStatus('Connecting...', false);
        this.fetchGoldPrice();
        this.startAutoRefresh();
    }
    
    async fetchGoldPrice() {
        this.showLoading();
        this.updateStatus('Fetching data...', false);
        
        try {
            const html = await this.fetchWithProxy();
            const price = this.parseGoldPrice(html);
            
            if (price) {
                this.updatePrice(price);
                this.updateStatus('Connected', true);
                this.resetCountdown();
            } else {
                throw new Error('Unable to parse gold price from the website');
            }
        } catch (error) {
            console.error('Error fetching gold price:', error);
            this.showError(error.message);
            this.updateStatus('Connection failed', false);
        }
    }
    
    async fetchWithProxy() {
        let lastError = null;
        
        // Try each proxy
        for (let i = 0; i < this.proxies.length; i++) {
            const proxyIndex = (this.currentProxyIndex + i) % this.proxies.length;
            const proxy = this.proxies[proxyIndex];
            
            try {
                console.log(`Attempting to fetch with proxy ${proxyIndex + 1}:`, proxy);
                const response = await this.fetchWithTimeout(proxy + encodeURIComponent(this.targetUrl), 15000);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                const data = await response.json();
                
                // Handle different proxy response formats
                let html = '';
                if (data.contents) {
                    html = data.contents; // allorigins format
                } else if (typeof data === 'string') {
                    html = data; // corsproxy format
                } else {
                    throw new Error('Unexpected proxy response format');
                }
                
                if (!html || html.length < 100) {
                    throw new Error('Received empty or invalid response');
                }
                
                // Update current proxy index for next request
                this.currentProxyIndex = proxyIndex;
                return html;
                
            } catch (error) {
                console.error(`Proxy ${proxyIndex + 1} failed:`, error.message);
                lastError = error;
                continue;
            }
        }
        
        // If all proxies failed, throw the last error
        throw new Error(`All proxies failed. Last error: ${lastError?.message || 'Unknown error'}`);
    }
    
    fetchWithTimeout(url, timeout) {
        return new Promise((resolve, reject) => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => {
                controller.abort();
                reject(new Error('Request timeout'));
            }, timeout);
            
            fetch(url, { signal: controller.signal })
                .then(response => {
                    clearTimeout(timeoutId);
                    resolve(response);
                })
                .catch(error => {
                    clearTimeout(timeoutId);
                    reject(error);
                });
        });
    }
    
    parseGoldPrice(html) {
        try {
            // Create a DOM parser to parse the HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Multiple strategies to find the gold price
            const strategies = [
                // Strategy 1: Look for common gold price selectors
                () => {
                    const selectors = [
                        '[data-gold-price]',
                        '.gold-price',
                        '#gold-price',
                        '.price-value',
                        '.current-price'
                    ];
                    
                    for (const selector of selectors) {
                        const element = doc.querySelector(selector);
                        if (element) {
                            return this.extractPriceFromText(element.textContent);
                        }
                    }
                    return null;
                },
                
                // Strategy 2: Look for table cells with price patterns
                () => {
                    const cells = doc.querySelectorAll('td, th, div, span');
                    for (const cell of cells) {
                        const text = cell.textContent.trim();
                        if (text.match(/^\d+[,\.]?\d*\s*(RS|PKR|₹)/i)) {
                            return this.extractPriceFromText(text);
                        }
                    }
                    return null;
                },
                
                // Strategy 3: Regex search in the entire HTML
                () => {
                    const priceRegex = /(\d{1,3}(?:[,\.]?\d{3})*(?:\.\d{2})?)\s*(RS|PKR|₹)/gi;
                    const matches = html.match(priceRegex);
                    if (matches && matches.length > 0) {
                        // Take the first reasonable price (between 50,000 and 500,000)
                        for (const match of matches) {
                            const price = this.extractPriceFromText(match);
                            if (price && price > 50000 && price < 500000) {
                                return price;
                            }
                        }
                    }
                    return null;
                },
                
                // Strategy 4: Look for meta tags or JSON-LD
                () => {
                    const metaPrice = doc.querySelector('meta[property="product:price:amount"]');
                    if (metaPrice) {
                        return parseFloat(metaPrice.getAttribute('content'));
                    }
                    
                    const jsonLd = doc.querySelector('script[type="application/ld+json"]');
                    if (jsonLd) {
                        try {
                            const data = JSON.parse(jsonLd.textContent);
                            if (data.offers && data.offers.price) {
                                return parseFloat(data.offers.price);
                            }
                        } catch (e) {
                            // JSON parsing failed, continue
                        }
                    }
                    return null;
                }
            ];
            
            // Try each strategy
            for (const strategy of strategies) {
                const price = strategy();
                if (price && price > 0) {
                    console.log('Successfully parsed price:', price);
                    return price;
                }
            }
            
            console.error('Failed to parse gold price from HTML');
            return null;
            
        } catch (error) {
            console.error('Error parsing HTML:', error);
            return null;
        }
    }
    
    extractPriceFromText(text) {
        // Remove currency symbols and extract numeric value
        const cleanText = text.replace(/[^\d,\.]/g, '');
        const numericValue = parseFloat(cleanText.replace(/,/g, ''));
        return isNaN(numericValue) ? null : numericValue;
    }
    
    updatePrice(price) {
        this.currentPrice = price;
        this.lastUpdated = new Date();
        
        // Format price with thousands separators
        const formattedPrice = new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: 'PKR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
        
        // Update price display with animation
        this.goldPriceEl.classList.add('updating');
        this.goldPriceEl.textContent = formattedPrice;
        
        setTimeout(() => {
            this.goldPriceEl.classList.remove('updating');
        }, 500);
        
        // Update last updated time
        this.updateTimeEl.textContent = this.formatTime(this.lastUpdated);
        
        // Show price content and hide loading/error
        this.showPriceContent();
    }
    
    showLoading() {
        this.loadingEl.classList.remove('hidden');
        this.priceContentEl.classList.add('hidden');
        this.errorMessageEl.classList.add('hidden');
    }
    
    showPriceContent() {
        this.loadingEl.classList.add('hidden');
        this.priceContentEl.classList.remove('hidden');
        this.errorMessageEl.classList.add('hidden');
        this.lastUpdatedEl.classList.remove('hidden');
    }
    
    showError(message) {
        this.loadingEl.classList.add('hidden');
        this.priceContentEl.classList.add('hidden');
        this.errorMessageEl.classList.remove('hidden');
        this.errorTextEl.textContent = message;
    }
    
    formatTime(date) {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }
    
    updateStatus(message, isOnline) {
        this.statusTextEl.textContent = message;
        this.statusIndicatorEl.classList.toggle('online', isOnline);
        this.statusIndicatorEl.classList.toggle('offline', !isOnline);
    }
    
    manualRefresh() {
        this.refreshBtnEl.classList.add('spinning');
        this.fetchGoldPrice().finally(() => {
            this.refreshBtnEl.classList.remove('spinning');
        });
    }
    
    startAutoRefresh() {
        this.refreshInterval = setInterval(() => {
            this.fetchGoldPrice();
        }, this.refreshIntervalMs);
        
        this.resetCountdown();
    }
    
    resetCountdown() {
        this.countdownTime = this.refreshIntervalMs / 1000; // Convert to seconds
        this.updateCountdown();
        this.startCountdown();
    }
    
    startCountdown() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
        
        this.countdownInterval = setInterval(() => {
            this.countdownTime -= 1;
            this.updateCountdown();
            
            if (this.countdownTime <= 0) {
                this.resetCountdown();
            }
        }, 1000);
    }
    
    updateCountdown() {
        if (this.countdownTime <= 0) {
            this.countdownEl.textContent = 'Refreshing...';
            return;
        }
        
        const minutes = Math.floor(this.countdownTime / 60);
        const seconds = this.countdownTime % 60;
        this.countdownEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    pauseCountdown() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
    }
    
    resumeCountdown() {
        if (this.countdownTime > 0) {
            this.startCountdown();
        }
    }
    
    destroy() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const tracker = new GoldPriceTracker();
    
    // Handle page unload
    window.addEventListener('beforeunload', () => {
        tracker.destroy();
    });
});

// Handle errors globally
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});
