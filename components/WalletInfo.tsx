import { useBalance } from 'wagmi';
import styles from '@/styles/WalletInfo.module.css';

interface WalletInfoProps {
  address: `0x${string}` | undefined;
}

export default function WalletInfo({ address }: WalletInfoProps) {
  // Fetch balance for the connected wallet
  const { data: balance } = useBalance({
    address: address,
  });

  return (
    <div className={styles.walletInfo}>
      <h2>Wallet Information</h2>
      <div className={styles.infoGrid}>
        {/* Display wallet address */}
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Address</div>
          <div className={styles.infoValue}>{address}</div>
        </div>
        {/* Display wallet balance */}
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Balance</div>
          <div className={styles.infoValue}>
            {balance ? (
              <span className={styles.balance}>
                {balance.formatted}
                <span className={styles.balanceSymbol}>{balance.symbol}</span>
              </span>
            ) : (
              'Loading...'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
