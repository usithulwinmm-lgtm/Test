import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Shield } from 'lucide-react';

export const TwoFaPage: React.FC = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, setTwoFaVerified } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!user) return;
    
    setLoading(true);
    setError('');
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('two_fa_pin')
      .eq('user_id', user.id)
      .single();
    
    setLoading(false);
    
    if (profile?.two_fa_pin === pin) {
      setTwoFaVerified(true);
      navigate('/dashboard');
    } else {
      setError(t('invalidPin'));
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card rounded-2xl p-8 text-center animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center animate-glow">
          <Shield className="h-8 w-8 text-primary" />
        </div>

        <h1 className={`text-2xl font-bold mb-2 ${language === 'my' ? 'font-myanmar' : ''}`}>{t('twoFactorAuth')}</h1>
        <p className={`text-muted-foreground mb-8 ${language === 'my' ? 'font-myanmar' : ''}`}>{t('enterPin')}</p>

        <div className="flex justify-center mb-4">
          <InputOTP maxLength={6} value={pin} onChange={setPin}>
            <InputOTPGroup>
              {[0,1,2,3,4,5].map(i => <InputOTPSlot key={i} index={i} className="bg-muted border-border" />)}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <p className="text-xs text-muted-foreground mb-6">{t('pinHint')}</p>
        {error && <p className="text-destructive text-sm mb-4">{error}</p>}

        <Button onClick={handleVerify} disabled={pin.length !== 6 || loading} className={`w-full bg-primary hover:bg-primary/90 glow-primary ${language === 'my' ? 'font-myanmar' : ''}`}>
          {t('verifyPin')}
        </Button>
      </div>
    </div>
  );
};
