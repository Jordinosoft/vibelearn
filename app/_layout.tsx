import { Stack } from "expo-router";
import React, { createContext, useContext, useState } from "react";
import { i18n, setLanguage as updateI18nLanguage } from "./lib/i18n";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState(i18n.locale);

  const setLanguage = (lang: string) => {
    updateI18nLanguage(lang);
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </LanguageProvider>
  );
}
