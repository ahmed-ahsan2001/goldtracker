# Gold Price Tracker

## Overview

This is a modern React-based web application that tracks and displays live gold prices with multiple calculation units and comprehensive features. The application fetches gold price data from external sources and presents it in a clean, dark-themed interface with automatic refresh capabilities. It's built as a multi-page application using React, React Router, and modern web technologies.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Multi-Page Application**: Built with React 19 and React Router DOM
- **Component-Based Architecture**: Modular components for Navigation, Pages, and Features
- **Dark Theme Design**: Professional dark color scheme with gold accents
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Real-time Updates**: Automatic refresh mechanism with countdown timer
- **Client-Side Routing**: Seamless navigation between pages

### React Components
- **Navigation Component**: Sticky navigation with active state indicators
- **Page Components**: Home, International, About, Contact, Privacy Policy pages
- **Shared Styling**: Consistent dark theme with gold accent colors
- **Modern Hooks**: useState, useEffect, useCallback for state management

## Key Components

### 1. Price Display System
- **Multi-Unit Display**: Shows gold prices for 10 grams, 1 gram, and 1 tola (11.6638g)
- **Calculated Prices**: Automatic conversion between different units
- **Local & International**: Separate pages for Pakistan and international gold prices
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
- **Navigation Bar**: Sticky navigation with page routing
- **Price Cards**: Multiple cards for different weight units
- **Information Pages**: About Us, Contact, Privacy Policy pages
- **Interactive Controls**: Refresh button and retry functionality
- **Responsive Layout**: Adapts to different screen sizes
- **Visual Feedback**: Loading spinners, status indicators, and smooth transitions
- **Dark Theme**: Professional dark color scheme with gold accents

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
- **Data Sources**: 
  - gold.pk website for Pakistani gold prices
  - Kitco.com for international gold prices (specific H3 tag selector)
- **Google Fonts**: Inter font family for typography
- **Font Awesome**: Icons for UI elements
- **React Router**: Client-side routing for navigation

### Browser APIs & Dependencies
- **Fetch API**: For making HTTP requests
- **Document Visibility API**: For handling tab visibility changes
- **React**: Component-based UI library
- **React Router DOM**: Client-side routing
- **Timers**: setInterval/setTimeout for scheduling
- **Modern React Hooks**: useState, useEffect, useCallback

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

### Recent Changes (July 15, 2025)
- **✅ Migrated to React**: Converted from vanilla JavaScript to React 19
- **✅ Multi-Page Architecture**: Added routing with Home, International, About, Contact, Privacy pages
- **✅ Enhanced Price Display**: Added 1 gram and 1 tola calculations alongside 10 grams
- **✅ Dark Theme**: Implemented professional dark color scheme with gold accents
- **✅ International Prices**: Updated to fetch from Kitco.com using specific HTML selector
- **✅ Responsive Navigation**: Sticky navigation bar with active state indicators
- **✅ Unit Conversions**: Automatic calculations between grams, tolas, and ounces
- **✅ Unified Scraper**: Created GoldPriceScraper class for both local and international prices
- **✅ Kitco Integration**: Added support for scraping Kitco.com H3 tag with specific class

### Future Enhancements
- **API Key Integration**: Complete setup for international gold price API
- **Data Persistence**: Add localStorage for offline capabilities
- **Historical Data**: Charts and trend analysis
- **Push Notifications**: Browser notifications for significant price changes
- **User Preferences**: Save preferred units and refresh intervals