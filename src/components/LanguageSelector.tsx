import React from 'react';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language, languageNames, languageFlags } from '@/lib/translations';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages: Language[] = ['en', 'my', 'zh', 'th'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{languageFlags[language]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`cursor-pointer ${language === lang ? 'bg-primary/20' : ''}`}
          >
            <span className="mr-2">{languageFlags[lang]}</span>
            <span className={lang === 'my' ? 'font-myanmar' : ''}>
              {languageNames[lang]}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
