import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Head from 'next/head'
import db from '../db.json'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    /* New styles */
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`
function IndexPage() {
  return (
    <div>
      <Head>
        <title>Imersão React</title>
        <meta property="og:image" content="https://marquesfernandes.com/wp-content/uploads/2020/01/1555172.jpg"></meta>
      </Head>
    </div>
  )
}

const theme = db.theme;

export default function App({ Component, pageProps }) {
  return (
    <>
        <IndexPage />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
