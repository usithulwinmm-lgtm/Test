import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LanguageSelector } from '@/components/LanguageSelector';
import { User, Shield, Globe, Eye, EyeOff, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export const SettingsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [displayName, setDisplayName] = useState('');
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showCurrentPin, setShowCurrentPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pinLoading, setPinLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name, two_fa_pin')
        .eq('user_id', user.id)
        .single();
      
      if (data) {
        setDisplayName(data.display_name || '');
      }
      setProfileLoading(false);
    };
    
    fetchProfile();
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: displayName })
      .eq('user_id', user.id);
    
    setLoading(false);
    
    if (error) {
      toast({
        title: t('error'),
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: t('success'),
        description: t('profileUpdated'),
      });
    }
  };

  const handleUpdatePin = async () => {
    if (!user) return;
    
    if (newPin.length !== 6 || !/^\d+$/.test(newPin)) {
      toast({
        title: t('error'),
        description: t('pinMustBe6Digits'),
        variant: 'destructive',
      });
      return;
    }
    
    if (newPin !== confirmPin) {
      toast({
        title: t('error'),
        description: t('pinsDontMatch'),
        variant: 'destructive',
      });
      return;
    }
    
    // Verify current PIN
    const { data: profile } = await supabase
      .from('profiles')
      .select('two_fa_pin')
      .eq('user_id', user.id)
      .single();
    
    if (profile?.two_fa_pin !== currentPin) {
      toast({
        title: t('error'),
        description: t('currentPinIncorrect'),
        variant: 'destructive',
      });
      return;
    }
    
    setPinLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({ two_fa_pin: newPin })
      .eq('user_id', user.id);
    
    setPinLoading(false);
    
    if (error) {
      toast({
        title: t('error'),
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: t('success'),
        description: t('pinUpdated'),
      });
      setCurrentPin('');
      setNewPin('');
      setConfirmPin('');
    }
  };

  if (profileLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className={cn('text-3xl font-bold', language === 'my' && 'font-myanmar')}>
            {t('settings')}
          </h1>
          <p className={cn('text-muted-foreground mt-1', language === 'my' && 'font-myanmar')}>
            {t('manageYourAccount')}
          </p>
        </div>

        <div className="grid gap-6">
          {/* Profile Settings */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className={cn(language === 'my' && 'font-myanmar')}>
                    {t('profileSettings')}
                  </CardTitle>
                  <CardDescription className={cn(language === 'my' && 'font-myanmar')}>
                    {t('updateYourProfile')}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className={cn(language === 'my' && 'font-myanmar')}>
                  {t('email')}
                </Label>
                <Input
                  value={user?.email || ''}
                  disabled
                  className="bg-muted/50"
                />
              </div>
              <div className="space-y-2">
                <Label className={cn(language === 'my' && 'font-myanmar')}>
                  {t('displayName')}
                </Label>
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder={t('enterDisplayName')}
                  className="bg-muted/50 border-border"
                />
              </div>
              <Button 
                onClick={handleUpdateProfile} 
                disabled={loading}
                className={cn('glow-primary', language === 'my' && 'font-myanmar')}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Check className="h-4 w-4 mr-2" />
                )}
                {t('saveChanges')}
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <CardTitle className={cn(language === 'my' && 'font-myanmar')}>
                    {t('securitySettings')}
                  </CardTitle>
                  <CardDescription className={cn(language === 'my' && 'font-myanmar')}>
                    {t('changeYour2FaPin')}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className={cn(language === 'my' && 'font-myanmar')}>
                  {t('currentPin')}
                </Label>
                <div className="relative">
                  <Input
                    type={showCurrentPin ? 'text' : 'password'}
                    value={currentPin}
                    onChange={(e) => setCurrentPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="••••••"
                    className="bg-muted/50 border-border pr-10"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPin(!showCurrentPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrentPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <Separator className="bg-border/50" />
              
              <div className="space-y-2">
                <Label className={cn(language === 'my' && 'font-myanmar')}>
                  {t('newPin')}
                </Label>
                <div className="relative">
                  <Input
                    type={showNewPin ? 'text' : 'password'}
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="••••••"
                    className="bg-muted/50 border-border pr-10"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPin(!showNewPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className={cn(language === 'my' && 'font-myanmar')}>
                  {t('confirmNewPin')}
                </Label>
                <Input
                  type="password"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="••••••"
                  className="bg-muted/50 border-border"
                  maxLength={6}
                />
              </div>
              
              <Button 
                onClick={handleUpdatePin} 
                disabled={pinLoading || !currentPin || !newPin || !confirmPin}
                variant="outline"
                className={cn('border-amber-500/50 text-amber-500 hover:bg-amber-500/10', language === 'my' && 'font-myanmar')}
              >
                {pinLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Shield className="h-4 w-4 mr-2" />
                )}
                {t('updatePin')}
              </Button>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <CardTitle className={cn(language === 'my' && 'font-myanmar')}>
                    {t('languageSettings')}
                  </CardTitle>
                  <CardDescription className={cn(language === 'my' && 'font-myanmar')}>
                    {t('chooseYourLanguage')}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Label className={cn(language === 'my' && 'font-myanmar')}>
                  {t('selectLanguage')}
                </Label>
                <LanguageSelector />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
