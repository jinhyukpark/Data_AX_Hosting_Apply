'use client';

import { useLanguage } from "./language-provider";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingLanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'ko' ? 'en' : 'ko');
    };

    return (
        <Button
            onClick={toggleLanguage}
            variant="outline"
            size="icon"
            className="fixed bottom-6 right-6 z-50 rounded-full h-12 w-12 bg-zinc-900/80 backdrop-blur border-zinc-700 shadow-lg hover:bg-zinc-800 text-zinc-100"
            title={language === 'ko' ? 'Switch to English' : '한국어로 변경'}
        >
            <Globe className="w-5 h-5" />
            <span className="sr-only">Toggle Language</span>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold">
                {language.toUpperCase()}
            </span>
        </Button>
    );
}
