import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

export default function MainLayout({ children, title = 'XKCD by EC' }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content='XKCD comics web app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='my-4'>{children}</main>
      <Footer />
    </div>
  );
}
