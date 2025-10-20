# Gold & Silver Price Tracker

## Overview

This professional React-based web application tracks and displays live gold and silver prices with a clean table layout, offering both light and dark themes and automatic refresh capabilities. Built as a multi-page application using React 19 and React Router, it's designed for optimal AdSense approval and provides comprehensive precious metal price information. The project aims to provide a reliable and user-friendly platform for tracking gold and silver, with potential for market leadership in online precious metals tracking.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Core Architecture
-   **Pure Frontend Application**: Designed for easy deployment with no backend dependencies.
-   **Multi-Page Application (MPA)**: Utilizes React 19 and React Router DOM for client-side routing.
-   **Component-Based**: Modular design with dedicated components for navigation, pages, and features.
-   **Theme System**: Supports professional light and dark modes with a toggle and persistence via localStorage.
-   **Responsive Design**: Mobile-first approach using CSS Grid and Flexbox.
-   **Real-time Updates**: Automatic refresh mechanism with a countdown timer for price data.

### UI/UX Decisions
-   **Professional Table Layout**: Clean, easy-to-read tables for price display.
-   **Visual Themes**: Light mode with clean white backgrounds and dark text; Dark mode with dark backgrounds and gold accents.
-   **Navigation**: Sticky navigation with theme toggle and active state indicators.
-   **Educational Content Integration**: Grid layout for informative cards designed for AdSense readiness.
-   **Professional Footer**: Comprehensive footer with quick links and information.

### Feature Specifications
-   **Price Display System**:
    -   Multi-unit (tola, gram, 10-gram, ounce) and multi-purity (24K, 22K) display.
    -   Dual metal (gold, silver) and dual currency (PKR, USD) pricing.
    -   Calculated prices from a base spot price per ounce.
    -   Loading states and last updated timestamps.
-   **Auto-Refresh Mechanism**: Scheduled updates every 5 minutes and manual refresh option.
-   **AdSense Ready Content**: Educational articles, FAQs, investment tips, and market factor explanations.

### Technical Implementations
-   **State Management**: Utilizes React hooks (`useState`, `useEffect`, `useCallback`, `useContext`) and a `ThemeContext` for global theme state.
-   **CSS Variables**: Extensive use of CSS variables for consistent and smooth theme transitions.
-   **Price Calculation Logic**: Prices are derived from a base per-ounce spot price with defined conversion rates for units and currencies (e.g., 1 Tola = 11.6638 grams, 1 Ounce = 31.1035 grams, configurable USD to PKR rate).

## External Dependencies

### NPM Packages
-   **react** (^19.1.0)
-   **react-dom** (^19.1.0)
-   **react-router-dom** (^7.6.3)
-   **react-scripts** (^5.0.1)

### External Resources
-   **Google Fonts**: Inter font family for typography.
-   **Font Awesome**: Icons for UI elements (via CDN).
## Recent Changes

### October 20, 2025
- **✅ Light Mode Enhancement**: Significantly improved light mode colors and styling
  - Added vibrant golden gradient to hero section instead of subtle gray
  - Enhanced text contrast with darker, more readable colors (#0f172a for headings)
  - Improved button styling with better visibility (golden yellow #eab308 with white text)
  - Enhanced table row hover with subtle golden highlight (#fef3c7)
  - Updated all light mode CSS variables for better visibility and professionalism
  - **Consistent Styling Across All Pages**: Extended golden theme to International, About, Contact, and Privacy pages
  - Added missing CSS variables (--primary-hover, --card-background, --shadow, --border-color, --hover-bg, --input-bg, --error-color) for both light and dark themes
- **✅ 22K Gold Prices**: Added complete 22K gold price table on home page
  - Shows 91.67% pure gold prices (22/24 purity calculation)
  - Displays prices for all units: 1 Tola, 10 Grams, 1 Gram, 1 Ounce
  - Both PKR and USD pricing included
  - Positioned between 24K gold and silver sections
  - Uses same professional table layout as 24K prices
- **✅ FAQ Section Improvement**: Enhanced FAQ alignment and spacing on home page
  - Added proper spacing and borders between FAQ items
  - Improved readability with better line-height
  - Consistent styling with rest of the page
- **✅ Footer on All Pages**: Added professional footer to all pages
  - Footer now appears on Home, International, About, Contact, and Privacy pages
  - Consistent footer design across all pages with three sections: About Us, Quick Links, Contact
  - Includes copyright notice with dynamic year
  - Footer styling matches the light/dark theme system
- **✅ Code Quality**: Enhanced calculatePrices function to accept purity parameter for flexible calculations
