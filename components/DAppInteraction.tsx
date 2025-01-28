import { useState } from 'react';
import { useAccount, useNetwork, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import styles from '@/styles/DAppInteraction.module.css';

export default function DAppInteraction() {
  const [contractAddress, setContractAddress] = useState('');
  const [functionName, setFunctionName] = useState('');
  const [functionArgs, setFunctionArgs] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();

  const handleInteraction = async () => {
    if (!address || !chain || !walletClient) {
      setResult('Please connect your wallet first.');
      return;
    }

    setIsLoading(true);
    setResult('');

    try {
      // Create a contract instance
      const provider = new ethers.BrowserProvider(walletClient.transport);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        [
          `function ${functionName}(${functionArgs
            .split(',')
            .map(() => 'address')
            .join(',')}) public view returns (uint256)`,
        ],
        signer
      );

      // Parse function arguments
      const args = functionArgs.split(',').map((arg) => arg.trim());

      // Call the specified function
      const tx = await contract[functionName](...args);
      const result = await tx;

      setResult(`Function call successful. Result: ${result.toString()}`);
    } catch (error) {
      console.error('Error interacting with contract:', error);
      setResult(`Error: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.dappInteraction}>
      <h2>DApp Interaction</h2>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        {/* Contract address input */}
        <div className={styles.formGroup}>
          <label htmlFor='contractAddress' className={styles.label}>
            Contract Address
          </label>
          <input
            id='contractAddress'
            type='text'
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder='0x...'
            className={styles.input}
          />
        </div>
        {/* Function name input */}
        <div className={styles.formGroup}>
          <label htmlFor='functionName' className={styles.label}>
            Function Name
          </label>
          <input
            id='functionName'
            type='text'
            value={functionName}
            onChange={(e) => setFunctionName(e.target.value)}
            placeholder='balanceOf'
            className={styles.input}
          />
        </div>
        {/* Function arguments input */}
        <div className={styles.formGroup}>
          <label htmlFor='functionArgs' className={styles.label}>
            Function Arguments (comma-separated)
          </label>
          <input
            id='functionArgs'
            type='text'
            value={functionArgs}
            onChange={(e) => setFunctionArgs(e.target.value)}
            placeholder='0x123...'
            className={styles.input}
          />
        </div>
        {/* Interaction button */}
        <button
          onClick={handleInteraction}
          className={styles.button}
          disabled={isLoading}
        >
          {isLoading ? 'Interacting...' : 'Interact with DApp'}
        </button>
      </form>
      {/* Display interaction result */}
      {result && (
        <div className={styles.result}>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
