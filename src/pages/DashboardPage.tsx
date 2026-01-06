import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { PortfolioChart } from '@/components/PortfolioChart';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCryptoPrices, symbolToCoinId } from '@/hooks/useCryptoPrices';
import { supabase } from '@/integrations/supabase/client';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { prices } = useCryptoPrices();
  const [wallets, setWallets] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      supabase.from('wallets').select('*').eq('user_id', user.id).then(({ data }) => {
        if (data) setWallets(data);
      });
    }
  }, [user]);

  const totalBalance = wallets.reduce((sum, wallet) => {
    const coinPrice = prices.find(p => p.symbol.toUpperCase() === wallet.coin)?.current_price || 0;
    return sum + (wallet.balance * coinPrice);
  }, 0);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Balance Card */}
        <div className="glass-card rounded-xl p-6 glow-primary">
          <p className={`text-muted-foreground mb-1 ${language === 'my' ? 'font-myanmar' : ''}`}>{t('totalBalance')}</p>
          <h2 className="text-4xl font-bold text-gradient">${totalBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h2>
        </div>

        <PortfolioChart />

        {/* Assets */}
        <div className="glass-card rounded-xl p-6">
          <h2 className={`text-lg font-semibold mb-4 ${language === 'my' ? 'font-myanmar' : ''}`}>{t('yourAssets')}</h2>
          <div className="space-y-3">
            {wallets.map((wallet) => {
              const coinData = prices.find(p => p.symbol.toUpperCase() === wallet.coin);
              const value = wallet.balance * (coinData?.current_price || 0);
              const change = coinData?.price_change_percentage_24h || 0;
              
              return (
                <div key={wallet.coin} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {coinData && <img src={coinData.image} alt={wallet.coin} className="w-8 h-8" />}
                    <div>
                      <p className="font-medium">{wallet.coin}</p>
                      <p className="text-sm text-muted-foreground">{wallet.balance.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    <p className={`text-sm flex items-center gap-1 ${change >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(change).toFixed(2)}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};
