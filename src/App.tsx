import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import CryptoTable from './components/CryptoTable';
import { binanceWebSocket } from './services/binanceService';
import { startWebSocketSimulation, stopWebSocketSimulation } from './services/websocketService';

function App() {
  useEffect(() => {
    // Start the Binance WebSocket connection
    binanceWebSocket.start();

    // If Binance WebSocket fails to connect after 5 seconds, fall back to simulation
    const fallbackTimer = setTimeout(() => {
      if (!binanceWebSocket.isActive()) {
        console.log('Falling back to simulated data...');
        startWebSocketSimulation();
      }
    }, 5000);

    // Cleanup function
    return () => {
      clearTimeout(fallbackTimer);
      binanceWebSocket.disconnect();
      stopWebSocketSimulation();
    };
  }, []);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <div className=" w-full mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Crypto Price Tracker</h1>
          <CryptoTable />
        </div>
      </div>
    </Provider>
  );
}

export default App;
