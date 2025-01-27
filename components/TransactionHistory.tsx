import { useState, useEffect } from 'react';
import styles from '@/styles/TransactionHistory.module.css';

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
          {
            hash: '0xmno...pqr',
            from: address,
            to: '0xstu...vwx',
            value: '0.2',
          },
        ];
        setTransactions(mockTransactions);
      }
    }
    fetchTransactions();
  }, [address]);

  return (
    <div className={styles.transactionHistory}>
      <h2>Transaction History</h2>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th>Hash</th>
            <th>From</th>
            <th>To</th>
            <th>Value (ETH)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.hash} className={styles.tableRow}>
              <td className={styles.hash}>{tx.hash}</td>
              <td className={styles.hash}>{tx.from}</td>
              <td className={styles.hash}>{tx.to}</td>
              <td>{tx.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
