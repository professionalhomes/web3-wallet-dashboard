'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import WalletInfo from './WalletInfo';
import TransactionHistory from './TransactionHistory';
import DAppInteraction from './DAppInteraction';
import styles from '@/styles/Dashboard.module.css';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const [activeTab, setActiveTab] = useState('wallet');

  if (!isConnected) {
    return (
      <div className={styles.centerContent}>
        <div className={styles.connectWallet}>
          <h1>Web3 Wallet Dashboard</h1>
          <p>Connect your wallet to get started</p>
          <button onClick={() => connect()} className='btn btn-primary'>
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={`container ${styles.headerContent}`}>
          <h1 className={styles.title}>Web3 Wallet Dashboard</h1>
          <button onClick={() => disconnect()} className='btn btn-secondary'>
            Disconnect
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <div className='container'>
          <div className={styles.tabs}>
            <button
              onClick={() => setActiveTab('wallet')}
              className={`btn ${
                activeTab === 'wallet' ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              Wallet
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`btn ${
                activeTab === 'transactions' ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('dapps')}
              className={`btn ${
                activeTab === 'dapps' ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              DApps
            </button>
          </div>
          <div className={styles.content}>
            {activeTab === 'wallet' && <WalletInfo address={address} />}
            {activeTab === 'transactions' && (
              <TransactionHistory address={address} />
            )}
            {activeTab === 'dapps' && <DAppInteraction />}
          </div>
        </div>
      </main>
    </div>
  );
}
