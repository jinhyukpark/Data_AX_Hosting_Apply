'use client';

import { useLanguage } from "./language-provider";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'ko' ? 'en' : 'ko');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
            title={language === 'ko' ? 'Switch to English' : '한국어로 변경'}
        >
            <Globe className="w-5 h-5" />
            <span className="text-xs font-medium uppercase">{language}</span>
        </button>
    );
}
