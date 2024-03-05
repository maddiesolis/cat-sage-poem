import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import { Page } from './components/Page';
import '@fontsource/libre-baskerville';

const theme = extendTheme({
  fonts: {
    heading: 'Libre Baskerville, serif',
    body: 'Libre Baskerville, serif',
  }
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Page/>
    </ChakraProvider>
  );
}

export default App;
