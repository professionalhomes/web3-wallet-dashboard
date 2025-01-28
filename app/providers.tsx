'use client';

import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

// Retrieve the Alchemy API key from environment variables
const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string;

// Configure the blockchain providers and chains
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: alchemyApiKey }),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== mainnet.id) return null;
        return {
          http: `https://worldchain-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
          webSocket: `wss://worldchain-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
        };
      },
    }),
  ]
);

// Create the Wagmi configuration
const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

// Providers component to wrap the application with WagmiConfig
export function Providers({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
