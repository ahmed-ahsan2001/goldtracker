// Gold Price Scraper Utilities
// This module handles fetching gold prices from various sources

class GoldPriceScraper {
  constructor() {
    this.proxies = [
      'https://api.allorigins.win/get?url=',
      'https://corsproxy.io/?',
      'https://cors-anywhere.herokuapp.com/'
    ];
    this.currentProxyIndex = 0;
  }

  // Fetch with timeout
  async fetchWithTimeout(url, timeout = 15000) {
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

  // Fetch with proxy fallback
  async fetchWithProxy(targetUrl) {
    let lastError = null;

    // Try each proxy
    for (let i = 0; i < this.proxies.length; i++) {
      const proxyIndex = (this.currentProxyIndex + i) % this.proxies.length;
      const proxy = this.proxies[proxyIndex];

      try {
        console.log(`Attempting to fetch with proxy ${proxyIndex + 1}:`, proxy);
        const response = await this.fetchWithTimeout(proxy + encodeURIComponent(targetUrl));

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        let html = '';
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          // Handle different proxy response formats
          if (data.contents) {
            html = data.contents; // allorigins format
          } else if (data.data) {
            html = data.data; // alternative format
          } else if (typeof data === 'string') {
            html = data; // string response
          } else {
            throw new Error('Unexpected JSON proxy response format');
          }
        } else {
          // Direct HTML response
          html = await response.text();
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

  // Extract price from text
  extractPriceFromText(text) {
    if (!text) return null;
    
    // Remove currency symbols and keep only digits, commas, and dots
    const cleanText = text.replace(/[^\d,\.]/g, '');
    
    // Remove commas and parse as float
    const numericValue = parseFloat(cleanText.replace(/,/g, ''));
    
    console.log('Extracting price from:', text, '-> cleaned:', cleanText, '-> numeric:', numericValue);
    
    return isNaN(numericValue) ? null : numericValue;
  }

  // Fetch international gold price from Kitco
  async fetchKitcoGoldPrice() {
    try {
      const html = await this.fetchWithProxy('https://www.kitco.com/charts/gold');
      
      // Parse the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      console.log('Attempting to parse Kitco HTML, length:', html.length);
      
      // Look for the specific h3 tag with the class (handling CSS selectors properly)
      const priceElement = doc.querySelector('h3.font-mulish.mb-\\[3px\\].text-4xl.font-bold.leading-normal.tracking-\\[1px\\]') ||
                          doc.querySelector('h3[class*="font-mulish"][class*="text-4xl"][class*="font-bold"]');
      
      if (priceElement) {
        console.log('Found Kitco price element:', priceElement.textContent);
        const priceText = priceElement.textContent.trim();
        const price = this.extractPriceFromText(priceText);
        
        if (price && price > 1000 && price < 10000) { // Reasonable range for gold price per ounce
          console.log('Successfully parsed Kitco price:', price);
          return price;
        }
      }

      // Alternative selectors if the main one fails
      const alternativeSelectors = [
        'h3[class*="font-mulish"][class*="text-4xl"]',
        'h3[class*="font-bold"][class*="leading-normal"]',
        '.font-mulish.text-4xl',
        '[class*="text-4xl"][class*="font-bold"]',
        'h3.text-4xl',
        '.price-display h3',
        '[data-price]',
        '.gold-price'
      ];

      for (const selector of alternativeSelectors) {
        const element = doc.querySelector(selector);
        if (element) {
          console.log(`Trying alternative selector ${selector}:`, element.textContent);
          const price = this.extractPriceFromText(element.textContent);
          if (price && price > 1000 && price < 10000) {
            console.log('Successfully parsed price with alternative selector:', price);
            return price;
          }
        }
      }

      // Last resort: look for any element containing a price pattern
      const allElements = doc.querySelectorAll('*');
      for (const element of allElements) {
        const text = element.textContent.trim();
        if (text.match(/\$\d{1,2},?\d{3}\.\d{2}/)) {
          const price = this.extractPriceFromText(text);
          if (price && price > 1000 && price < 10000) {
            console.log('Found price in element:', text);
            return price;
          }
        }
      }

      console.error('Failed to parse gold price from Kitco HTML');
      return null;

    } catch (error) {
      console.error('Error fetching Kitco gold price:', error);
      throw error;
    }
  }

  // Fetch local Pakistan gold price from gold.pk
  async fetchPakistanGoldPrice() {
    try {
      const html = await this.fetchWithProxy('https://gold.pk/');
      
      // Parse the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      console.log('Attempting to parse gold.pk HTML, length:', html.length);
      
      // Check if goldratehome class exists
      const goldRateElements = doc.querySelectorAll('.goldratehome');
      console.log('Found goldratehome elements:', goldRateElements.length);
      
      if (goldRateElements.length > 0) {
        goldRateElements.forEach((el, index) => {
          console.log(`goldratehome element ${index}:`, el.textContent);
        });
      }

      // Multiple strategies to find the gold price
      const strategies = [
        // Strategy 1: Look for the specific goldratehome class from gold.pk
        () => {
          const goldRateElement = doc.querySelector('.goldratehome');
          if (goldRateElement) {
            const priceText = goldRateElement.textContent.trim();
            console.log('Found goldratehome text:', priceText);
            const price = this.extractPriceFromText(priceText);
            if (price && price > 50000 && price < 500000) {
              console.log('Found price using goldratehome class:', price);
              return price;
            }
          }
          return null;
        },

        // Strategy 2: Look for other common gold price selectors
        () => {
          const selectors = [
            'p.goldratehome',
            '[data-gold-price]',
            '.gold-price',
            '#gold-price',
            '.price-value',
            '.current-price'
          ];

          for (const selector of selectors) {
            const element = doc.querySelector(selector);
            if (element) {
              const price = this.extractPriceFromText(element.textContent);
              if (price && price > 50000 && price < 500000) {
                console.log('Found price using selector:', selector, price);
                return price;
              }
            }
          }
          return null;
        },

        // Strategy 3: Look for table rows with gold price data
        () => {
          const rows = doc.querySelectorAll('tr');
          for (const row of rows) {
            const cells = row.querySelectorAll('td, th');
            let hasGoldReference = false;
            let priceValue = null;
            
            for (const cell of cells) {
              const text = cell.textContent.trim();
              // Check if this row contains gold reference
              if (text.match(/10\s*(gram|g|Gram)/i) || text.match(/gold/i)) {
                hasGoldReference = true;
              }
              // Check if this cell contains price
              if (text.match(/\d{1,3}(?:[,\.]?\d{3})*\s*(RS|PKR|₹)/i)) {
                const price = this.extractPriceFromText(text);
                if (price && price > 50000 && price < 500000) {
                  priceValue = price;
                }
              }
            }
            
            if (hasGoldReference && priceValue) {
              return priceValue;
            }
          }
          return null;
        }
      ];

      // Try each strategy
      for (const strategy of strategies) {
        const price = strategy();
        if (price && price > 0) {
          console.log('Successfully parsed Pakistan gold price:', price);
          return price;
        }
      }

      console.error('Failed to parse gold price from Pakistan HTML');
      return null;

    } catch (error) {
      console.error('Error fetching Pakistan gold price:', error);
      throw error;
    }
  }
}

export default GoldPriceScraper;