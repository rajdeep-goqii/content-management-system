// src/hooks/useTranslation.js
import { useState } from 'react';
import { translateText } from '../services/translationServices';

export const useTranslation = () => {
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState(null);

  const translate = async (text, targetLanguage) => {
    setTranslating(true);
    setError(null);
    try {
      const translatedText = await translateText(text, targetLanguage);
      setTranslating(false);
      return translatedText;
    } catch (err) {
      setError(err.message);
      setTranslating(false);
      return text; // Return original text if translation fails
    }
  };

  return { translate, translating, error };
};