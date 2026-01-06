import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TradeModal } from '@/components/TradeModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCryptoPrices, CryptoPrice } from '@/hooks/useCryptoPrices';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

export const MarketPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { prices, loading, refetch } = useCryptoPrices();
  const [selectedCoin, setSelectedCoin] = useState<CryptoPrice | null>(null);
  const [tradeOpen, setTradeOpen] = useState(false);

  const handleBuy = (coin: CryptoPrice) => {
    setSelectedCoin(coin);
    setTradeOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${language === 'my' ? 'font-myanmar' : ''}`}>{t('market')}</h1>
          <Button variant="ghost" size="sm" onClick={refetch} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className={`text-left p-4 text-muted-foreground font-medium ${language === 'my' ? 'font-myanmar' : ''}`}>{t('coin')}</th>
                  <th className={`text-right p-4 text-muted-foreground font-medium ${language === 'my' ? 'font-myanmar' : ''}`}>{t('price')}</th>
                  <th className={`text-right p-4 text-muted-foreground font-medium hidden sm:table-cell ${language === 'my' ? 'font-myanmar' : ''}`}>{t('change24h')}</th>
                  <th className={`text-right p-4 text-muted-foreground font-medium hidden md:table-cell ${language === 'my' ? 'font-myanmar' : ''}`}>{t('marketCap')}</th>
                  <th className={`text-right p-4 text-muted-foreground font-medium ${language === 'my' ? 'font-myanmar' : ''}`}>{t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {prices.map((coin) => (
                  <tr key={coin.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                        <div>
                          <p className="font-medium">{coin.name}</p>
                          <p className="text-sm text-muted-foreground">{coin.symbol.toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right font-medium">${coin.current_price.toLocaleString()}</td>
                    <td className="p-4 text-right hidden sm:table-cell">
                      <span className={`flex items-center justify-end gap-1 ${coin.price_change_percentage_24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {coin.price_change_percentage_24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                      </span>
                    </td>
                    <td className="p-4 text-right hidden md:table-cell text-muted-foreground">${(coin.market_cap / 1e9).toFixed(2)}B</td>
                    <td className="p-4 text-right">
                      <Button size="sm" onClick={() => handleBuy(coin)} className={`bg-success hover:bg-success/90 text-success-foreground ${language === 'my' ? 'font-myanmar' : ''}`}>
                        {t('buy')}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <TradeModal open={tradeOpen} onOpenChange={setTradeOpen} coin={selectedCoin} />
    </Layout>
  );
};
