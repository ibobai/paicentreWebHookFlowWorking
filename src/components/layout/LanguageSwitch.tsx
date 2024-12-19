import { Globe2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Language } from '../../translations';

const languageNames: Record<Language, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية'
};

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative group">
      <button
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
        title="Change Language"
      >
        <Globe2 className="h-5 w-5 mr-1" />
        <span>{languageNames[language]}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="py-1" role="menu">
          {Object.entries(languageNames).map(([code, name]) => (
            <button
              key={code}
              onClick={() => setLanguage(code as Language)}
              className={`block w-full text-left px-4 py-2 text-sm ${
                language === code ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
              role="menuitem"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}