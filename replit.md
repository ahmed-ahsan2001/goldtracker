# Gold Price Tracker

## Overview

This is a client-side web application that tracks and displays live gold prices. The application fetches gold price data from external sources and presents it in a clean, modern interface with automatic refresh capabilities. It's built as a single-page application using vanilla HTML, CSS, and JavaScript.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built with vanilla HTML, CSS, and JavaScript
- **Responsive Design**: Modern CSS with flexbox layout and mobile-first approach
- **Progressive Enhancement**: Graceful degradation with loading states and error handling
- **Real-time Updates**: Automatic refresh mechanism with countdown timer

### Client-Side Components
- **HTML Structure**: Semantic markup with accessibility considerations
- **CSS Styling**: Modern design with gradient backgrounds, Google Fonts (Inter), and Font Awesome icons
- **JavaScript Classes**: Object-oriented approach with a main `GoldPriceTracker` class

## Key Components

### 1. Price Display System
- **Current Price Display**: Shows gold price per 10 grams
- **Loading States**: Spinner animation during data fetching
- **Error Handling**: User-friendly error messages with retry functionality
- **Status Indicators**: Visual feedback for connection status

### 2. Data Fetching Strategy
- **CORS Proxy System**: Multiple fallback proxy services to handle cross-origin requests
- **Target URL**: Scrapes data from gold.pk website
- **Retry Logic**: Automatic failover between different proxy services
- **Error Recovery**: Graceful handling of network failures

### 3. Auto-Refresh Mechanism
- **Scheduled Updates**: Automatic refresh every 5 minutes (300,000ms)
- **Countdown Timer**: Visual countdown showing time until next update
- **Manual Refresh**: User-triggered refresh button
- **Visibility Handling**: Pauses updates when tab is not active

### 4. User Interface Elements
- **Price Card**: Central display component with header, content, and footer
- **Interactive Controls**: Refresh button and retry functionality
- **Responsive Layout**: Adapts to different screen sizes
- **Visual Feedback**: Loading spinners, status indicators, and smooth transitions

## Data Flow

1. **Application Initialization**: 
   - Initialize DOM elements and bind event listeners
   - Start the automatic refresh cycle
   - Fetch initial price data

2. **Price Fetching Process**:
   - Attempt to fetch data using current proxy
   - Parse response for gold price information
   - Handle success/failure scenarios
   - Update UI with new data or error states

3. **Automatic Updates**:
   - Set interval timer for periodic updates
   - Update countdown display
   - Trigger fresh data fetching at intervals

4. **User Interactions**:
   - Manual refresh triggers immediate data fetch
   - Retry button attempts to recover from errors
   - Visual feedback during all operations

## External Dependencies

### Third-Party Services
- **CORS Proxy Services**: 
  - `api.allorigins.win` (primary)
  - `corsproxy.io` (fallback)
- **Data Source**: gold.pk website for price scraping
- **Google Fonts**: Inter font family for typography
- **Font Awesome**: Icons for UI elements

### Browser APIs
- **Fetch API**: For making HTTP requests
- **Document Visibility API**: For handling tab visibility changes
- **DOM Manipulation**: Standard DOM APIs for UI updates
- **Timers**: setInterval/setTimeout for scheduling

## Deployment Strategy

### Static Hosting
- **Client-Only Application**: No server-side components required
- **Static File Serving**: Can be deployed on any static hosting service
- **CDN Friendly**: All assets can be cached and distributed globally

### Browser Compatibility
- **Modern Browser Support**: Requires ES6+ features (classes, arrow functions, fetch)
- **Responsive Design**: Works across desktop and mobile devices
- **Progressive Enhancement**: Graceful degradation for older browsers

### Performance Considerations
- **Minimal Bundle Size**: No build process or heavy frameworks
- **Efficient Updates**: Only updates UI when data changes
- **Resource Management**: Proper cleanup of intervals and event listeners

## Technical Notes

### Challenges Addressed
- **CORS Limitations**: Solved using proxy services with fallback options
- **Rate Limiting**: 5-minute intervals to avoid overwhelming data sources
- **Error Recovery**: Multiple retry strategies and user feedback
- **Performance**: Efficient DOM manipulation and resource cleanup

### Future Enhancements
- **Data Persistence**: Could add localStorage for offline capabilities
- **Multiple Currencies**: Support for different currency displays
- **Historical Data**: Charts and trend analysis
- **Push Notifications**: Browser notifications for significant price changes