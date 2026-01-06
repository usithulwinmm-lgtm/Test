import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signIn, signUp } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = isLogin ? await signIn(email, password) : await signUp(email, password);
    
    if (result.error) {
      setError(result.error.message);
    } else {
      navigate('/2fa');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute top-4 right-4"><LanguageSelector /></div>
      
      <div className="w-full max-w-md glass-card rounded-2xl p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">CryptoEx</h1>
          <p className={`text-muted-foreground ${language === 'my' ? 'font-myanmar' : ''}`}>
            {isLogin ? t('welcomeBack') : t('createAccount')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('email')} className="pl-10 bg-muted border-border" required />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('password')} className="pl-10 pr-10 bg-muted border-border" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <Button type="submit" disabled={loading} className={`w-full bg-primary hover:bg-primary/90 glow-primary ${language === 'my' ? 'font-myanmar' : ''}`}>
            {loading ? t('loading') : (isLogin ? t('signIn') : t('signUp'))}
          </Button>
        </form>

        <p className={`text-center mt-6 text-muted-foreground ${language === 'my' ? 'font-myanmar' : ''}`}>
          {isLogin ? t('noAccount') : t('haveAccount')}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">
            {isLogin ? t('signUp') : t('signIn')}
          </button>
        </p>
      </div>
    </div>
  );
};
