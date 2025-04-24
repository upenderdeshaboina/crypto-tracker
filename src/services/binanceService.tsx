import { store } from '../store/store';
import { updateAsset } from '../store/cryptoSlice';

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws';
const SYMBOLS = [
  'btcusdt',
  'ethusdt',
  'adausdt',
  'xrpusdt',
  'bnbusdt',
  'solusdt',
  'dogeusdt',
  'dotusdt',
  'maticusdt',
  'linkusdt'
];

interface BinanceWebSocketMessage {
  e: string;  // Event type
  E: number;  // Event time
  s: string;  // Symbol
  p: string;  // Price change
  P: string;  // Price change percent
  w: string;  // Weighted average price
  c: string;  // Last price
  Q: string;  // Last quantity
  o: string;  // Open price
  h: string;  // High price
  l: string;  // Low price
  v: string;  // Total traded base asset volume
  q: string;  // Total traded quote asset volume
  O: number;  // Statistics open time
  C: number;  // Statistics close time
  F: number;  // First trade ID
  L: number;  // Last trade Id
  n: number;  // Total number of trades
}

class BinanceWebSocket {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 1000;
  private isConnected = false;

  constructor() {
    // Don't auto-connect, wait for explicit start
  }

  public start() {
    if (!this.isConnected) {
      console.log('Starting Binance WebSocket connection...');
      this.connect();
    }
  }

  private connect() {
    try {
      this.ws = new WebSocket(BINANCE_WS_URL);

      this.ws.onopen = () => {
        console.log('Connected to Binance WebSocket');
        this.subscribe();
        this.reconnectAttempts = 0;
        this.isConnected = true;
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.e === '24hrTicker') {  // Only handle ticker events
            this.handleMessage(data);
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('Disconnected from Binance WebSocket');
        this.isConnected = false;
        this.handleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnected = false;
      };
    } catch (error) {
      console.error('Error creating WebSocket:', error);
      this.handleReconnect();
    }
  }

  private subscribe() {
    if (!this.ws) return;

    const subscribeMessage = {
      method: 'SUBSCRIBE',
      params: SYMBOLS.map(symbol => `${symbol}@ticker`),
      id: 1
    };

    try {
      this.ws.send(JSON.stringify(subscribeMessage));
      console.log('Subscribed to symbols:', SYMBOLS);
    } catch (error) {
      console.error('Error subscribing to symbols:', error);
    }
  }

  private handleMessage(data: BinanceWebSocketMessage) {
    const symbol = data.s.toLowerCase();
    const price = parseFloat(data.c);
    const priceChangePercent = parseFloat(data.P);
    const volume = parseFloat(data.v);

    const symbolToId: { [key: string]: number } = {
      'btcusdt': 1,
      'ethusdt': 2,
      'adausdt': 3,
      'xrpusdt': 4,
      'bnbusdt': 5,
      'solusdt': 6,
      'dogeusdt': 7,
      'dotusdt': 8,
      'maticusdt': 9,
      'linkusdt': 10
    };

    const assetId = symbolToId[symbol];
    if (assetId) {
      store.dispatch(updateAsset({
        id: assetId,
        updates: {
          price,
          change24h: priceChangePercent,
          volume24h: volume
        }
      }));
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectTimeout * this.reconnectAttempts;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms`);
      
      setTimeout(() => {
        this.connect();
      }, delay);
    } else {
      console.error('Max reconnection attempts reached. Please restart the application.');
    }
  }

  public disconnect() {
    if (this.ws) {
      console.log('Disconnecting Binance WebSocket...');
      this.ws.close();
      this.ws = null;
      this.isConnected = false;
    }
  }

  public isActive(): boolean {
    return this.isConnected;
  }
}

export const binanceWebSocket = new BinanceWebSocket(); 