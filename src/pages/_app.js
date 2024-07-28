import AppContext from '@context/AppContext';
import useAppState from '@hooks/useAppState';
import '@styles/globals.css';

export default function App({ Component, pageProps }) {
  const appState = useAppState();

  return (
    <AppContext.Provider value={appState}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
