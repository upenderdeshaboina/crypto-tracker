import { store } from '../store/store';
import { updateAsset } from '../store/cryptoSlice';

const generateRandomChange = (currentValue: number, maxChange: number) => {
  const change = (Math.random() * 2 - 1) * maxChange;
  return currentValue * (1 + change / 100);
};

const updateCryptoData = () => {
  const state = store.getState();
  const assets = state.crypto.assets;

  assets.forEach(asset => {
    const updates = {
      price: generateRandomChange(asset.price, 0.5),
      change1h: generateRandomChange(asset.change1h, 0.3),
      change24h: generateRandomChange(asset.change24h, 0.5),
      change7d: generateRandomChange(asset.change7d, 0.8),
      volume24h: generateRandomChange(asset.volume24h, 1),
    };

    store.dispatch(updateAsset({ id: asset.id, updates }));
  });
};

let intervalId: number | null = null;

export const startWebSocketSimulation = () => {
  if (intervalId === null) {
    intervalId = window.setInterval(updateCryptoData, 2000);
  }
};

export const stopWebSocketSimulation = () => {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}; 