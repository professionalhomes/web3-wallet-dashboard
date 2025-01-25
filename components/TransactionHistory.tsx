'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
}

interface TransactionHistoryProps {
  address: `0x${string}` | undefined;
}

export default function TransactionHistory({
  address,
}: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      if (address) {
        // This is a placeholder. In a real application, you would fetch transactions from an API or blockchain explorer
        const mockTransactions: Transaction[] = [
          {
            hash: '0x123...abc',
            from: address,
            to: '0x456...def',
            value: '0.1',
          },
          {
            hash: '0x789...ghi',
            from: '0xabc...jkl',
            to: address,
            value: '0.05',
          },
        ];
        setTransactions(mockTransactions);
      }
    }
    fetchTransactions();
  }, [address]);

  return (
    <div className='bg-surface p-6 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4'>Transaction History</h2>
      <table className='w-full'>
        <thead>
          <tr>
            <th className='text-left'>Hash</th>
            <th className='text-left'>From</th>
            <th className='text-left'>To</th>
            <th className='text-left'>Value (ETH)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.hash}>
              <td>{tx.hash}</td>
              <td>{tx.from}</td>
              <td>{tx.to}</td>
              <td>{tx.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
