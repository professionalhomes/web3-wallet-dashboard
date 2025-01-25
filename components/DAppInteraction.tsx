'use client';

import { useState } from 'react';
import { ethers } from 'ethers';

export default function DAppInteraction() {
  const [contractAddress, setContractAddress] = useState('');
  const [functionName, setFunctionName] = useState('');
  const [functionArgs, setFunctionArgs] = useState('');
  const [result, setResult] = useState('');

  const handleInteraction = async () => {
    try {
      // This is a simplified example. In a real application, you would need to:
      // 1. Connect to the user's wallet
      // 2. Create a contract instance
      // 3. Call the specified function with the provided arguments
      // 4. Handle the result

      setResult('Interaction successful! (This is a placeholder result)');
    } catch (error) {
      setResult('Error: ' + (error as Error).message);
    }
  };

  return (
    <div className='bg-surface p-6 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4'>DApp Interaction</h2>
      <div className='mb-4'>
        <label htmlFor='contractAddress' className='block mb-2'>
          Contract Address:
        </label>
        <input
          id='contractAddress'
          type='text'
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          className='w-full p-2 bg-background text-text rounded'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='functionName' className='block mb-2'>
          Function Name:
        </label>
        <input
          id='functionName'
          type='text'
          value={functionName}
          onChange={(e) => setFunctionName(e.target.value)}
          className='w-full p-2 bg-background text-text rounded'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='functionArgs' className='block mb-2'>
          Function Arguments (comma-separated):
        </label>
        <input
          id='functionArgs'
          type='text'
          value={functionArgs}
          onChange={(e) => setFunctionArgs(e.target.value)}
          className='w-full p-2 bg-background text-text rounded'
        />
      </div>
      <button
        onClick={handleInteraction}
        className='bg-secondary text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-colors'
      >
        Interact with DApp
      </button>
      {result && <p className='mt-4'>{result}</p>}
    </div>
  );
}
