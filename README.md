# Stock Report App

A simple React application that fetches stock data from Polygon.io API and generates analysis reports.

## Features

- Add and remove stock tickers
- Fetch real-time stock data from Polygon.io API
- Generate detailed stock analysis reports
- Clean and responsive UI with Bootstrap

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/Salahabi/stock-report-app.git
   cd stock-report-app
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

1. Enter a stock ticker symbol (e.g., AAPL, MSFT, GOOGL) in the input field and click "Add"
2. Click "Generate Report" to fetch stock data and generate an analysis
3. View the detailed report in the right panel

## API Keys

This application uses the Polygon.io API for stock data. You'll need to replace the placeholder API key in `src/services/api.js` with your own key.

## License

MIT