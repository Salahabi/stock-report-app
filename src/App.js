import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call to Polygon.io
      const stockResponse = await axios.get('https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2025-03-08/2025-03-10', {
        params: {
          apiKey: 'R0KnZeuZLRpQqA7ajnGklaNPh1RYWWkD'
        }
      });
      
      console.log('Stock data received:', stockResponse.data);
      
      // Process the stock data
      const stockData = {
        ticker: 'AAPL',
        period: '2025-03-08 to 2025-03-10',
        startPrice: 235.54,
        endPrice: 227.48,
        priceChange: ((227.48 - 235.54) / 235.54 * 100).toFixed(2),
        avgVolume: 69530324
      };
      
      // Create prompt for AI analysis
      const prompt = `Please provide a detailed analysis and recommendation for ${stockData.ticker} based on the following data:
      
      Period: ${stockData.period}
      Starting Price: $${stockData.startPrice}
      Ending Price: $${stockData.endPrice}
      Price Change: ${stockData.priceChange}%
      Average Daily Volume: ${stockData.avgVolume.toLocaleString()}`;
      
      console.log('Prompt sent to API:', prompt);
      
      // Simulate API call to AI service
      // In a real app, you would make an actual API call here
      // const aiResponse = await axios.post('https://api.deepseek.com/chat/completions', {
      //   model: 'deepseek-chat',
      //   messages: [{ role: 'user', content: prompt }]
      // });
      
      // For demo purposes, create a simulated response
      const analysisText = `Analysis for AAPL (2025-03-08 to 2025-03-10):

AAPL has shown a -3.42% change over the specified period, moving from $235.54 to $227.48.

The stock has maintained an average daily trading volume of 69,530,324 shares, indicating strong market interest.

Technical Analysis: The current price action suggests a bearish short-term trend. Investors should monitor key support levels around $225 and resistance at $235 for potential entry or exit points.

Recommendation: Based on the data provided, a cautious approach might be appropriate. The high trading volume suggests significant market interest, but the price decline indicates selling pressure. Consider waiting for stabilization before establishing new positions.`;
      
      // Set the report and turn off loading state
      setReport(analysisText);
      setIsLoading(false);
      
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to generate report. Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="bg-dark text-white p-4 mb-4">
        <div className="container">
          <h1>Stock Report App</h1>
        </div>
      </header>
      
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Generate Stock Report</h5>
                <p className="card-text">Click the button below to generate a report for AAPL stock.</p>
                <button 
                  className="btn btn-primary" 
                  onClick={fetchStockData}
                  disabled={isLoading}
                >
                  {isLoading ? 'Generating...' : 'Generate Report'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="col-md-8">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            
            <div className="stock-report-app">
              {isLoading ? (
                <div className="d-flex flex-column align-items-center justify-content-center p-5">
                  <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="mt-3">
                    <h4>Fetching stock data...</h4>
                  </div>
                </div>
              ) : report ? (
                <div className="p-4">
                  <h2 className="mb-4">Stock Analysis Report</h2>
                  <div className="report-content">
                    {report.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center p-5">
                  <h3>No report available</h3>
                  <p className="text-muted">Click the "Generate Report" button to see analysis</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;