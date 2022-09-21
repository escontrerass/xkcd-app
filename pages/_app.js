import { I18NProvider } from 'context/i18n'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>XKCD by EC</title>
        <meta name='description' content='XKCD comics web app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <I18NProvider>
        <Component {...pageProps} />
      </I18NProvider>
    </>
  )
}

export default MyApp
