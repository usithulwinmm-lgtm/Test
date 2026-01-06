import React, { useEffect, useState, useCallback } from 'react';
import { Layout } from '@/components/Layout';
import { WalletActionModal } from '@/components/WalletActionModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCryptoPrices } from '@/hooks/useCryptoPrices';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export const WalletPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { prices } = useCryptoPrices();
  const [wallets, setWallets] = useState<any[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<{ coin: string; balance: number } | null>(null);
  const [action, setAction] = useState<'deposit' | 'withdraw'>('deposit');
  const [modalOpen, setModalOpen] = useState(false);

  const fetchWallets = useCallback(async () => {
    if (user) {
      const { data } = await supabase.from('wallets').select('*').eq('user_id', user.id);
      if (data) setWallets(data);
    }
  }, [user]);

  useEffect(() => { fetchWallets(); }, [fetchWallets]);

  const handleAction = (wallet: any, actionType: 'deposit' | 'withdraw') => {
    setSelectedWallet({ coin: wallet.coin, balance: Number(wallet.balance) });
    setAction(actionType);
    setModalOpen(true);
  };

  const totalBalance = wallets.reduce((sum, wallet) => {
    const coinPrice = prices.find(p => p.symbol.toUpperCase() === wallet.coin)?.current_price || 0;
    return sum + (Number(wallet.balance) * coinPrice);
  }, 0);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="glass-card rounded-xl p-6 glow-primary">
          <p className={`text-muted-foreground mb-1 ${language === 'my' ? 'font-myanmar' : ''}`}>{t('totalBalance')}</p>
          <h2 className="text-4xl font-bold text-gradient">${totalBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h2>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h2 className={`text-lg font-semibold mb-4 ${language === 'my' ? 'font-myanmar' : ''}`}>{t('wallet')}</h2>
          <div className="space-y-4">
            {wallets.map((wallet) => {
              const coinData = prices.find(p => p.symbol.toUpperCase() === wallet.coin);
              const value = Number(wallet.balance) * (coinData?.current_price || 0);
              
              return (
                <div key={wallet.coin} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {coinData && <img src={coinData.image} alt={wallet.coin} className="w-10 h-10" />}
                    <div>
                      <p className="font-semibold">{wallet.coin}</p>
                      <p className="text-sm text-muted-foreground">{Number(wallet.balance).toLocaleString()} • ${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleAction(wallet, 'deposit')} className={`border-success text-success hover:bg-success/20 ${language === 'my' ? 'font-myanmar' : ''}`}>
                      <ArrowDownLeft className="w-4 h-4 mr-1" />{t('deposit')}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleAction(wallet, 'withdraw')} className={`border-warning text-warning hover:bg-warning/20 ${language === 'my' ? 'font-myanmar' : ''}`}>
                      <ArrowUpRight className="w-4 h-4 mr-1" />{t('withdraw')}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedWallet && (
        <WalletActionModal open={modalOpen} onOpenChange={setModalOpen} action={action} coin={selectedWallet.coin} currentBalance={selectedWallet.balance} onSuccess={fetchWallets} />
      )}
    </Layout>
  );
};
