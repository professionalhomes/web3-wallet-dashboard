import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Alchemy, Network, AssetTransfersCategory } from 'alchemy-sdk';
import styles from '@/styles/TransactionHistory.module.css';
import { ClipboardCopy } from 'lucide-react';

// Define the structure of a transaction
interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  asset: string;
}

export default function TransactionHistory() {
  const { address } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch transactions from the Alchemy API
    async function fetchTransactions() {
      if (!address) return;

      setIsLoading(true);
      setError(null);

      try {
        // Configure Alchemy SDK
        const config = {
          apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
          network: Network.ETH_MAINNET,
        };
        const alchemy = new Alchemy(config);

        // Fetch asset transfers for the connected address
        const data = await alchemy.core.getAssetTransfers({
          fromBlock: '0x0',
          fromAddress: address,
          category: [
            AssetTransfersCategory.EXTERNAL,
            AssetTransfersCategory.INTERNAL,
          ],
          maxCount: 10,
        });

        // Format the fetched transactions
        const formattedTransactions: Transaction[] = data.transfers.map(
          (tx) => ({
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            value: tx.value ? tx.value.toString() : '0',
            asset: tx.asset,
          })
        );

        setTransactions(formattedTransactions);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchTransactions();
  }, [address]);

  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000); // Reset copied text after 2 seconds
    });
  };

  // Function to truncate addresses for display
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Component to render an address with a copy button
  const renderAddress = (address: string) => (
    <div className={styles.addressContainer}>
      <span className={styles.address}>{truncateAddress(address)}</span>
      <button
        className={styles.copyButton}
        onClick={() => copyToClipboard(address)}
        aria-label='Copy full address'
      >
        <ClipboardCopy size={16} />
      </button>
      {copiedText === address && (
        <span className={styles.copiedText}>Copied!</span>
      )}
    </div>
  );

  if (isLoading) {
    return <div className={styles.loading}>Loading transactions...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.transactionHistory}>
      <h2>Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Hash</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
              <th>Asset</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.hash} className={styles.tableRow}>
                <td>{renderAddress(tx.hash)}</td>
                <td>{renderAddress(tx.from)}</td>
                <td>{renderAddress(tx.to)}</td>
                <td>{Number.parseFloat(tx.value).toFixed(4)}</td>
                <td>{tx.asset}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
