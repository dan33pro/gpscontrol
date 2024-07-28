import Head from 'next/head';
import styles from '@styles/Home.module.scss';
import Hero from '@components/Hero';
import MainSection from 'layouts/MainSection';

export default function Home() {
  return (
    <>
      <Head>
        <title>Motion - Home</title>
        <meta name="description" content="Pagina de muestra para la prueba tecnica" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <Hero />
        <MainSection />
      </main>
    </>
  );
}
