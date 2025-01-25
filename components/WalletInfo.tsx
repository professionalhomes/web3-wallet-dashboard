'use client';

import { useBalance } from 'wagmi';

interface WalletInfoProps {
  address: `0x${string}` | undefined;
}

export default function WalletInfo({ address }: WalletInfoProps) {
  const { data: balance } = useBalance({
    address: address,
  });

  return (
    <div className='bg-surface p-6 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4'>Wallet Information</h2>
      <p className='mb-2'>
        <span className='font-semibold'>Address:</span> {address}
      </p>
      <p>
        <span className='font-semibold'>Balance:</span>{' '}
        {balance ? `${balance.formatted} ${balance.symbol}` : 'Loading...'}
      </p>
    </div>
  );
}
