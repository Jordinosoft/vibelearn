import { Stack } from "expo-router";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { i18n, setLanguage as updateI18nLanguage, registerLanguageChangeCallback } from "./lib/i18n";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export default function RootLayout() {
  const [language, setLanguage] = useState(i18n.locale);

  const [fontsLoaded] = useFonts({
    // This is the default font for Ionicons. Make sure it matches what Expo expects.
    'Ionicons': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
  });

  useEffect(() => {
    // This ensures the initial language is set correctly if it was determined asynchronously
    setLanguage(i18n.locale);

    // Register the callback to re-render the app when language changes
    registerLanguageChangeCallback(setLanguage);

    return () => {
      // Optionally unregister the callback on component unmount to prevent memory leaks
      registerLanguageChangeCallback(() => {}); // Set to a no-op function
    };
  }, []); // Empty dependency array means this runs once on mount

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded, onLayoutRootView]);

  const handleSetLanguage = (lang: string) => {
    updateI18nLanguage(lang);
    setLanguage(lang);
  };

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      <Stack screenOptions={{ headerShown: false }} />
    </LanguageContext.Provider>
  );
}
