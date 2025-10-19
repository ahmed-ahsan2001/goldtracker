# API Integration Guide for Live Gold & Silver Prices

## Current Status
The website currently uses simulated prices based on recent market trends to demonstrate full functionality. This allows you to see and test all features without requiring API keys.

## How to Integrate Live Data

### Recommended API Services

1. **GoldAPI** (https://www.goldapi.io/)
   - Pricing: Free tier available (100 requests/month)
   - Easy to integrate
   - Reliable data

2. **MetalPriceAPI** (https://metalpriceapi.com/)
   - Pricing: Free tier available (500 requests/month)
   - Multiple metals supported
   - Good documentation

3. **Metals.live** (Free but may have CORS issues)
   - No API key required
   - Limited reliability

### Integration Steps

1. Sign up for an API service and get your API key
2. Add the API key to your environment variables (never commit keys to code)
3. Update the `fetchMetalPrices` function in `src/pages/Home.js`

### Example Implementation (GoldAPI)

```javascript
const fetchMetalPrices = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const API_KEY = process.env.REACT_APP_GOLD_API_KEY;
    const response = await fetch('https://www.goldapi.io/api/XAU/USD', {
      headers: {
        'x-access-token': API_KEY
      }
    });
    
    const goldData = await response.json();
    
    // Fetch silver data
    const silverResponse = await fetch('https://www.goldapi.io/api/XAG/USD', {
      headers: {
        'x-access-token': API_KEY
      }
    });
    
    const silverData = await silverResponse.json();
    
    setMetalPrices({
      gold: {
        usd: goldData.price_gram_24k * GRAMS_PER_OUNCE,
        pkr: goldData.price_gram_24k * GRAMS_PER_OUNCE * USD_TO_PKR
      },
      silver: {
        usd: silverData.price,
        pkr: silverData.price * USD_TO_PKR
      }
    });
    
    setLastUpdated(new Date());
  } catch (err) {
    console.error('Error fetching metal prices:', err);
    setError('Unable to fetch live prices. Please try again later.');
  } finally {
    setLoading(false);
  }
};
```

### Setting Environment Variables

Create a `.env` file in the root directory:
```
REACT_APP_GOLD_API_KEY=your_api_key_here
```

**Important:** Add `.env` to your `.gitignore` to keep your API keys secure.

## Why Simulated Data for Now?

- Demonstrates all functionality without requiring paid API subscriptions
- Shows realistic price movements
- Allows you to test the complete user interface
- No rate limiting during development
- Free to use and test

When you're ready to launch with live data, follow the integration steps above!
