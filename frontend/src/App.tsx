import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import { Page } from './components/Page';
import '@fontsource/libre-baskerville';
import '@fontsource/noto-serif-tc';
import { englishPoem } from './data/poems';
import { useEffect, useState } from 'react';

const theme = extendTheme({
  fonts: {
    // heading: 'Libre Baskerville, serif',
    // body: 'Libre Baskerville, serif',
    heading: 'Noto Serif TC, serif',
    body: 'Noto Serif TC, serif'
  }
})

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
  }, []);
  
  return (
    <ChakraProvider theme={theme}>
      <Page lines={englishPoem} language={language}/>
    </ChakraProvider>
  );
}

export default App;
