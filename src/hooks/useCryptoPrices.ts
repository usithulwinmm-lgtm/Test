import { useState, useEffect, useCallback } from 'react';

export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
}

const COIN_IDS = ['bitcoin', 'ethereum', 'crypto-com-chain', 'solana'];

export const useCryptoPrices = (refreshInterval = 30000) => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COIN_IDS.join(',')}&order=market_cap_desc&sparkline=false`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch prices');
      }
      
      const data = await response.json();
      setPrices(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    
    const interval = setInterval(fetchPrices, refreshInterval);
    
    return () => clearInterval(interval);
  }, [fetchPrices, refreshInterval]);

  return { prices, loading, error, refetch: fetchPrices };
};

// Mapping for symbol lookup
export const symbolToCoinId: Record<string, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  CRO: 'crypto-com-chain',
  SOL: 'solana',
};

export const coinIdToSymbol: Record<string, string> = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  'crypto-com-chain': 'CRO',
  solana: 'SOL',
};
