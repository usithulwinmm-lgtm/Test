import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CryptoPrice } from '@/hooks/useCryptoPrices';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coin: CryptoPrice | null;
  onSuccess?: () => void;
}

export const TradeModal: React.FC<TradeModalProps> = ({
  open,
  onOpenChange,
  coin,
  onSuccess,
}) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');

  const handleTrade = async () => {
    if (!user || !coin || !amount || parseFloat(amount) <= 0) return;

    setLoading(true);
    try {
      const numAmount = parseFloat(amount);
      const totalValue = numAmount * coin.current_price;

      // Create transaction record
      const { error: txError } = await supabase.from('transactions').insert({
        user_id: user.id,
        type: activeTab,
        coin: coin.symbol.toUpperCase(),
        amount: numAmount,
        price_usd: totalValue,
      });

      if (txError) throw txError;

      // Update wallet balance
      const { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .eq('coin', coin.symbol.toUpperCase())
        .maybeSingle();

      if (walletError) throw walletError;

      const currentBalance = wallet?.balance || 0;
      const newBalance = activeTab === 'buy' 
        ? currentBalance + numAmount 
        : Math.max(0, currentBalance - numAmount);

      if (wallet) {
        await supabase
          .from('wallets')
          .update({ balance: newBalance })
          .eq('id', wallet.id);
      } else {
        await supabase.from('wallets').insert({
          user_id: user.id,
          coin: coin.symbol.toUpperCase(),
          balance: newBalance,
        });
      }

      toast({
        title: t('success'),
        description: `${activeTab === 'buy' ? 'Bought' : 'Sold'} ${numAmount} ${coin.symbol.toUpperCase()}`,
      });

      setAmount('');
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Trade error:', error);
      toast({
        title: t('error'),
        description: 'Transaction failed. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!coin) return null;

  const total = amount ? parseFloat(amount) * coin.current_price : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <img src={coin.image} alt={coin.name} className="w-8 h-8" />
            <span>{coin.name}</span>
            <span className="text-muted-foreground">({coin.symbol.toUpperCase()})</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'buy' | 'sell')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="buy" 
              className={`${language === 'my' ? 'font-myanmar' : ''} data-[state=active]:bg-success/20 data-[state=active]:text-success`}
            >
              {t('buy')}
            </TabsTrigger>
            <TabsTrigger 
              value="sell"
              className={`${language === 'my' ? 'font-myanmar' : ''} data-[state=active]:bg-destructive/20 data-[state=active]:text-destructive`}
            >
              {t('sell')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4 mt-4">
            <TradeForm
              amount={amount}
              setAmount={setAmount}
              total={total}
              coin={coin}
              onTrade={handleTrade}
              loading={loading}
              type="buy"
            />
          </TabsContent>

          <TabsContent value="sell" className="space-y-4 mt-4">
            <TradeForm
              amount={amount}
              setAmount={setAmount}
              total={total}
              coin={coin}
              onTrade={handleTrade}
              loading={loading}
              type="sell"
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

interface TradeFormProps {
  amount: string;
  setAmount: (amount: string) => void;
  total: number;
  coin: CryptoPrice;
  onTrade: () => void;
  loading: boolean;
  type: 'buy' | 'sell';
}

const TradeForm: React.FC<TradeFormProps> = ({
  amount,
  setAmount,
  total,
  coin,
  onTrade,
  loading,
  type,
}) => {
  const { t, language } = useLanguage();

  return (
    <>
      <div className="space-y-2">
        <label className={`text-sm text-muted-foreground ${language === 'my' ? 'font-myanmar' : ''}`}>
          {t('price')}
        </label>
        <div className="p-3 bg-muted rounded-lg">
          <span className="text-lg font-semibold">
            ${coin.current_price.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label className={`text-sm text-muted-foreground ${language === 'my' ? 'font-myanmar' : ''}`}>
          {t('amount')} ({coin.symbol.toUpperCase()})
        </label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="bg-muted border-border"
          min="0"
          step="0.0001"
        />
      </div>

      <div className="p-4 bg-muted/50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Total</span>
          <span className="text-xl font-bold">${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
        </div>
      </div>

      <Button
        onClick={onTrade}
        disabled={loading || !amount || parseFloat(amount) <= 0}
        className={`w-full ${
          type === 'buy' 
            ? 'bg-success hover:bg-success/90 text-success-foreground' 
            : 'bg-destructive hover:bg-destructive/90'
        } ${language === 'my' ? 'font-myanmar' : ''}`}
      >
        {loading ? t('loading') : `${t(type)} ${coin.symbol.toUpperCase()}`}
      </Button>
    </>
  );
};
