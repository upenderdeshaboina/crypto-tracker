import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CryptoData {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  chartData: number[];
}

export type SortField = 'price' | 'change1h' | 'change24h' | 'change7d' | 'marketCap' | 'volume24h';
export type SortOrder = 'asc' | 'desc';

export interface CryptoState {
  assets: CryptoData[];
  loading: boolean;
  error: string | null;
  sortField: SortField;
  sortOrder: SortOrder;
  filter: string;
}

const initialState: CryptoState = {
  assets: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 93759.48,
      change1h: 0.43,
      change24h: 0.93,
      change7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      circulatingSupply: 19.85,
      chartData: [89000, 90000, 91000, 92000, 93000, 93500, 93759.48],
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      price: 1802.46,
      change1h: 0.60,
      change24h: 3.21,
      change7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547469307,
      circulatingSupply: 120.71,
      chartData: [1600, 1650, 1700, 1750, 1780, 1790, 1802.46],
    },
    {
      id: 3,
      name: 'Tether',
      symbol: 'USDT',
      price: 1.00,
      change1h: 0.00,
      change24h: 0.00,
      change7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      circulatingSupply: 145.27,
      chartData: [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
    },
    {
      id: 4,
      name: 'XRP',
      symbol: 'XRP',
      price: 2.22,
      change1h: 0.46,
      change24h: 0.54,
      change7d: 6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      circulatingSupply: 58.39,
      chartData: [2.10, 2.12, 2.15, 2.18, 2.20, 2.21, 2.22],
    },
    {
      id: 5,
      name: 'BNB',
      symbol: 'BNB',
      price: 606.65,
      change1h: 0.09,
      change24h: -1.20,
      change7d: 3.73,
      marketCap: 85471956947,
      volume24h: 1874281784,
      circulatingSupply: 140.89,
      chartData: [580, 585, 590, 595, 600, 605, 606.65],
    },
    {
      id: 6,
      name: 'Solana',
      symbol: 'SOL',
      price: 151.51,
      change1h: 0.53,
      change24h: 1.26,
      change7d: 14.74,
      marketCap: 78381958631,
      volume24h: 4881674486,
      circulatingSupply: 517.31,
      chartData: [132, 135, 140, 145, 148, 150, 151.51],
    }
  ],
  loading: false,
  error: null,
  sortField: 'marketCap',
  sortOrder: 'desc',
  filter: '',
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAsset: (state, action: PayloadAction<{ id: number; updates: Partial<CryptoData> }>) => {
      const { id, updates } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      if (asset) {
        Object.assign(asset, updates);
      }
    },
    setSortField: (state, action: PayloadAction<SortField>) => {
      state.sortField = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const { updateAsset, setSortField, setSortOrder, setFilter } = cryptoSlice.actions;

// Selectors
export const selectSortedAndFilteredAssets = (state: { crypto: CryptoState }) => {
  const { assets, sortField, sortOrder, filter } = state.crypto;
  
  let filteredAssets = assets;
  if (filter) {
    const lowerFilter = filter.toLowerCase();
    filteredAssets = assets.filter(asset => 
      asset.name.toLowerCase().includes(lowerFilter) ||
      asset.symbol.toLowerCase().includes(lowerFilter)
    );
  }

  return [...filteredAssets].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const modifier = sortOrder === 'asc' ? 1 : -1;
    return (aValue - bValue) * modifier;
  });
};

export default cryptoSlice.reducer; 