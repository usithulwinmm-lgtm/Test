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

interface WalletActionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: 'deposit' | 'withdraw';
  coin: string;
  currentBalance: number;
  onSuccess?: () => void;
}

export const WalletActionModal: React.FC<WalletActionModalProps> = ({
  open,
  onOpenChange,
  action,
  coin,
  currentBalance,
  onSuccess,
}) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    if (!user || !amount || parseFloat(amount) <= 0) return;

    const numAmount = parseFloat(amount);
    
    if (action === 'withdraw' && numAmount > currentBalance) {
      toast({
        title: t('error'),
        description: 'Insufficient balance',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // Create transaction record
      const { error: txError } = await supabase.from('transactions').insert({
        user_id: user.id,
        type: action,
        coin: coin,
        amount: numAmount,
      });

      if (txError) throw txError;

      // Update wallet balance
      const newBalance = action === 'deposit' 
        ? currentBalance + numAmount 
        : currentBalance - numAmount;

      const { error: walletError } = await supabase
        .from('wallets')
        .update({ balance: newBalance })
        .eq('user_id', user.id)
        .eq('coin', coin);

      if (walletError) throw walletError;

      toast({
        title: t('success'),
        description: `${action === 'deposit' ? 'Deposited' : 'Withdrew'} ${numAmount} ${coin}`,
      });

      setAmount('');
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Wallet action error:', error);
      toast({
        title: t('error'),
        description: 'Transaction failed. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className={`${language === 'my' ? 'font-myanmar' : ''}`}>
            {t(action)} {coin}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className={`text-sm text-muted-foreground ${language === 'my' ? 'font-myanmar' : ''}`}>
              {t('balance')}: {currentBalance.toLocaleString()} {coin}
            </label>
          </div>

          <div className="space-y-2">
            <label className={`text-sm text-muted-foreground ${language === 'my' ? 'font-myanmar' : ''}`}>
              {t('amount')}
            </label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="bg-muted border-border"
              min="0"
              step="0.0001"
              max={action === 'withdraw' ? currentBalance : undefined}
            />
          </div>

          <Button
            onClick={handleAction}
            disabled={loading || !amount || parseFloat(amount) <= 0}
            className={`w-full ${
              action === 'deposit' 
                ? 'bg-success hover:bg-success/90 text-success-foreground' 
                : 'bg-warning hover:bg-warning/90 text-warning-foreground'
            } ${language === 'my' ? 'font-myanmar' : ''}`}
          >
            {loading ? t('loading') : t(action)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
