'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import WalletInfo from './WalletInfo';
import TransactionHistory from './TransactionHistory';
import DAppInteraction from './DAppInteraction';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const [activeTab, setActiveTab] = useState('wallet');

  if (!isConnected) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <h1 className='text-4xl font-bold mb-8'>Web3 Wallet Dashboard</h1>
        <button
          onClick={() => connect()}
          className='bg-primary text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors'
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <header className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>Web3 Wallet Dashboard</h1>
        <button
          onClick={() => disconnect()}
          className='bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors'
        >
          Disconnect
        </button>
      </header>
      <nav className='mb-8'>
        <ul className='flex space-x-4'>
          <li>
            <button
              onClick={() => setActiveTab('wallet')}
              className={`py-2 px-4 rounded ${
                activeTab === 'wallet' ? 'bg-primary text-white' : 'bg-surface'
              }`}
            >
              Wallet
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-2 px-4 rounded ${
                activeTab === 'transactions'
                  ? 'bg-primary text-white'
                  : 'bg-surface'
              }`}
            >
              Transactions
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('dapps')}
              className={`py-2 px-4 rounded ${
                activeTab === 'dapps' ? 'bg-primary text-white' : 'bg-surface'
              }`}
            >
              DApps
            </button>
          </li>
        </ul>
      </nav>
      <main>
        {activeTab === 'wallet' && <WalletInfo address={address} />}
        {activeTab === 'transactions' && (
          <TransactionHistory address={address} />
        )}
        {activeTab === 'dapps' && <DAppInteraction />}
      </main>
    </div>
  );
}
