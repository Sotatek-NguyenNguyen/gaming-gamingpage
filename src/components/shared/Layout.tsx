import { FC } from 'react';
// import { useWallet } from '@solana/wallet-adapter-react';
import Head from 'next/head';
// import { useGlobal } from '../../hooks/useGlobal';
// import useSmartContract from '../../hooks/useSmartContract';
import { PageTitle } from '../../shared/enum';
import Footer from './layout/footer';
import Header from './layout/header';
import ScrollTop from './ScrollTop';

interface Props {
  title?: string;
}

const Layout: FC<Props> = ({ title = PageTitle.HomePage, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <Header />

      <main className={'bg-primary-500'}>{children}</main>
      <ScrollTop />
      <Footer />
    </>
  );
};

export default Layout;
