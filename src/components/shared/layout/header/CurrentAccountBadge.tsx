import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import React, { useCallback, useEffect, useMemo, useState, FC } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useAlert, useAuth, useGlobal, useSmartContract } from '../../../../hooks';

const CurrentAccountBadge: FC = ({ children }) => {
  const { publicKey, wallet, connected, disconnect, signMessage, adapter } = useWallet();
  const { visible, setVisible } = useWalletModal();
  const { login, logout, isAuthenticated } = useAuth();
  const { setAccountBalance, balance } = useGlobal();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showErr, setShowErr] = useState(false);

  const { alertInfo, alertError } = useAlert();
  const { refreshWalletBalance } = useSmartContract();

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const content = useMemo(() => {
    if (children) return children;
    if (!wallet || !base58) return null;
    return base58.slice(0, 4) + '..' + base58.slice(-4);
  }, [children, wallet, base58]);

  const onDisconnect = () => {
    logout();
    disconnect();
  };

  const copyAddress = useCallback(async () => {
    if (base58) {
      await navigator.clipboard.writeText(base58);
      setCopied(true);
      setTimeout(() => setCopied(false), 400);
    }
  }, [base58]);

  const openModal = useCallback(() => {
    setVisible(true);
    setShowErr(true);
  }, [setVisible, setShowErr]);

  useEffect(() => {
    const initBalance = async () => {
      try {
        setLoading(true);
        if (!isAuthenticated) {
          await login(publicKey, signMessage, adapter);
        }
        await refreshWalletBalance();
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setAccountBalance(null);
      }
    };

    if (connected) {
      initBalance();
    } else {
      setAccountBalance(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, isAuthenticated]);

  useEffect(() => {
    if (copied) {
      alertInfo('Copied');
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copied]);

  useEffect(() => {
    if (wallet && showErr && !visible) {
      // @ts-ignore
      const solanaWallet = typeof window !== 'undefined' && window.solana;
      // @ts-ignore
      const solletWallet = typeof window !== 'undefined' && window.sollet;

      if (
        wallet.name === 'Phantom' &&
        (!solanaWallet || (solanaWallet && !solanaWallet.isPhantom))
      ) {
        alertError('Please install Phantom wallet extension');
        setShowErr(false);
      } else if (wallet.name === 'Sollet (Extension)' && !solletWallet) {
        alertError('Please install Sollet wallet extension');
        setShowErr(false);
      }
    }
  }, [wallet, alertError, showErr, visible]);

  if (!wallet || (!visible && !connected) || !isAuthenticated) {
    return (
      <button
        onClick={openModal}
        className="px-4 h-12 overflow-hidden text-sm text-white font-bold rounded-md shadow-md bg-white bg-opacity-50 border border-black border-opacity-50"
      >
        Connect Wallet
      </button>
    );
  }
  if (!base58) {
    return (
      <button className="w-64 h-12 overflow-hidden text-sm font-bold text-white rounded-md shadow-md bg-white bg-opacity-50 border border-black border-opacity-50">
        Connecting...
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between w-64 h-12 overflow-hidden text-sm rounded-full shadow-md bg-primary-400 border border-primary-200">
      <button
        onClick={onDisconnect}
        className="flex items-center justify-center p-2 mx-2 bg-black rounded-full"
      >
        <FaTimes className="z-20 text-white" />
      </button>
      <div className="flex items-center justify-between w-full">
        {loading ? (
          <span className="h-3 bg-gray-300 rounded-full w-14 animate-pulse" />
        ) : (
          <span className="ml-auto text-sm tracking-normal text-white">
            {balance?.formatted} SOL
          </span>
        )}
        <div
          onClick={copyAddress}
          className="flex items-center justify-center p-2 mx-2 text-sm text-white bg-secondary-100 rounded-full cursor-pointer w-28 font-normal tracking-wide"
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default CurrentAccountBadge;
