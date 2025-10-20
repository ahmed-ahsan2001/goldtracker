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