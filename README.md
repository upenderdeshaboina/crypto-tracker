# Crypto Price Tracker

A real-time cryptocurrency price tracking application built with React, TypeScript, and Tailwind CSS. The application provides live updates of cryptocurrency prices and market data using the Binance WebSocket API, with a fallback to simulated data.

![Crypto Tracker Screenshot](/public/images/screenshot.png)

## Features

- **Real-time Price Updates**: Live cryptocurrency price updates via Binance WebSocket API
- **Multiple Data Points**: Track prices, market cap, volume, and price changes (1h, 24h, 7d)
- **Interactive Table**:
  - Sortable columns
  - Real-time search filtering
  - Mini price charts
  - Responsive design with sticky headers and columns
- **Modern UI/UX**:
  - Clean and intuitive interface
  - Smooth animations and transitions
  - Custom scrollbars
  - Mobile-responsive design
- **Fallback System**: Automatic fallback to simulated data if WebSocket connection fails

## Demo

Watch the application in action:

![Demo GIF](/public/images/demo.gif)


The demo showcases:
- Real-time price updates
- Interactive table sorting
- Search functionality
- Mini chart animations


## Technologies Used

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Heroicons v1
- **Real-time Data**: Binance WebSocket API
- **Build Tool**: Vite

## Prerequisites

Before running this project, make sure you have:
- Node.js (v16 or higher)
- npm (v7 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/upenderdeshaboina/crypto-tracker.git
cd crypto-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
crypto-tracker/
├── public/
│   └── images/          # Cryptocurrency logos
├── src/
│   ├── components/      # React components
│   ├── services/        # WebSocket and API services
│   ├── store/          # Redux store and slices
│   ├── types/          # TypeScript type definitions
│   └── App.tsx         # Main application component
├── scripts/            # Utility scripts
└── package.json        # Project dependencies
```

## Key Components

### CryptoTable
- Main component displaying cryptocurrency data
- Features sortable columns and real-time search
- Implements responsive design with sticky headers
- Displays mini price charts using Recharts

### Services
- **binanceService**: Handles WebSocket connection to Binance API
- **websocketService**: Provides fallback simulated data

### State Management
- Uses Redux Toolkit for state management
- Implements real-time updates through WebSocket integration
- Manages sorting and filtering functionality

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run test`: Run tests


## Styling

The project uses Tailwind CSS with custom configurations:
- Custom scrollbar styling
- Responsive design utilities
- Color scheme customization


## Contact

- Name - Upender Deshaboina
- Project Link: [https://github.com/upenderdeshaboina/crypto-tracker.git](https://github.com/upenderdeshaboina/crypto-tracker.git)
