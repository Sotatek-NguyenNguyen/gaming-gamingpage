import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import React, { useEffect } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import { GlobalProvider } from '../contexts/global';
import { AuthProvider } from '../contexts/authContext';
import 'nprogress/nprogress.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';
// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

import '../styles/globals.css';

NProgress.configure({ showSpinner: false });

const WalletConnectionProvider = dynamic<{ children: React.ReactNode }>(
  () =>
    import('../contexts/wallet').then(({ WalletConnectionProvider }) => WalletConnectionProvider),
  {
    ssr: false,
  },
);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const routeChangeStart = () => NProgress.start();
    const routeChangeComplete = () => NProgress.done();

    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeComplete);
    router.events.on('routeChangeError', routeChangeComplete);

    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeComplete', routeChangeComplete);
      router.events.off('routeChangeError', routeChangeComplete);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WalletConnectionProvider>
      <WalletModalProvider logo="/icons/apple-touch-icon.png">
        <GlobalProvider>
          <AuthProvider>
            <Component {...pageProps} />
            <ToastContainer
              hideProgressBar={false}
              position="bottom-left"
              limit={2}
              newestOnTop
              closeButton={false}
              autoClose={5000}
              transition={Zoom}
            />
          </AuthProvider>
        </GlobalProvider>
      </WalletModalProvider>
    </WalletConnectionProvider>
  );
}

export default MyApp;
