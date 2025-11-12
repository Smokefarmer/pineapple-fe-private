import { base, bsc, bscTestnet, mainnet, sepolia } from 'wagmi/chains';

/**
 * Get the native currency symbol for a given chain ID
 */
export function getNativeCurrencySymbol(chainId: number): string {
  switch (chainId) {
    case bsc.id: // BSC Mainnet
    case bscTestnet.id: // BSC Testnet
      return 'BNB';
    case mainnet.id: // Ethereum Mainnet
    case sepolia.id: // Sepolia Testnet
    case base.id: // Base Mainnet
      return 'ETH';
    default:
      return 'ETH'; // Default to ETH for unknown chains
  }
}

/**
 * Get the native currency name for a given chain ID
 */
export function getNativeCurrencyName(chainId: number): string {
  switch (chainId) {
    case bsc.id:
      return 'BNB Chain';
    case bscTestnet.id:
      return 'BNB Testnet';
    case mainnet.id:
      return 'Ethereum';
    case sepolia.id:
      return 'Sepolia';
    case base.id:
      return 'Base';
    default:
      return 'Ethereum';
  }
}

/**
 * Get the DEX name for a given chain ID
 */
export function getDexName(chainId: number): string {
  switch (chainId) {
    case bsc.id:
    case bscTestnet.id:
      return 'PancakeSwap';
    case mainnet.id:
    case sepolia.id:
    case base.id:
      return 'Uniswap';
    default:
      return 'Uniswap';
  }
}
