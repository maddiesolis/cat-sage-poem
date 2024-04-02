import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import { EnglishPoem } from './components/EnglishPoem';
import '@fontsource/noto-serif-tc/400.css';
import { useEffect, useState } from 'react';
import { MandarinPoem } from './components/MandarinPoem';

const theme = extendTheme({
  fonts: {
    heading: 'Noto Serif TC, serif',
    body: 'Noto Serif TC, serif',
  },
  styles: {
    global: {
      '@font-face': [
        {
          fontFamily: 'Noto Serif TC',
          fontDisplay: 'swap',
        },
      ],
      body: {
        fontFamily: 'Noto Serif TC, serif',
      },
    },
  },
});

function App() {
  const [language, setLanguage] = useState<'english' | 'mandarin'>('english');

  const toggleLanguage = () => {
    setLanguage((currentLanguage) => (currentLanguage === 'english' ? 'mandarin' : 'english'));
  };

  useEffect(() => {
    document.addEventListener('click', toggleLanguage);
    return () => {
      document.removeEventListener('click', toggleLanguage);
    };
  }, [language]);
  
  return (
    <ChakraProvider theme={theme}>
      {language === 'mandarin' ? (
        <MandarinPoem />
      ) : (
        <EnglishPoem />
      )}
    </ChakraProvider>
  );
}

export default App;
