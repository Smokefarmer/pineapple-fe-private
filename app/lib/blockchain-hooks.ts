import { useQuery } from '@tanstack/react-query';
import { usePublicClient, useChainId } from 'wagmi';
import {
  getTokenFromBlockchain,
  getTokensByCreator,
  checkLiquidityAdded,
  TokenFromBlockchain,
} from './blockchain-queries';

/**
 * Hook to fetch a token directly from the blockchain by GUID
 * This bypasses the indexer and queries events directly from the Router contract
 */
export function useTokenFromBlockchain(guid: string | undefined, options?: { enabled?: boolean }) {
  const publicClient = usePublicClient();
  const chainId = useChainId();

  return useQuery({
    queryKey: ['token-blockchain', guid, chainId],
    queryFn: async () => {
      if (!publicClient || !guid) {
        throw new Error('Public client or GUID not available');
      }
      return getTokenFromBlockchain(publicClient, guid, chainId);
    },
    enabled: options?.enabled !== undefined ? options.enabled && !!publicClient && !!guid : !!publicClient && !!guid,
    staleTime: 30 * 1000, // Cache for 30 seconds (blockchain data doesn't change often)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

/**
 * Hook to fetch all tokens created by a specific address from the blockchain
 */
export function useTokensByCreatorFromBlockchain(
  creatorAddress: string | undefined,
  options?: { enabled?: boolean }
) {
  const publicClient = usePublicClient();
  const chainId = useChainId();

  return useQuery({
    queryKey: ['tokens-blockchain', creatorAddress, chainId],
    queryFn: async () => {
      if (!publicClient || !creatorAddress) {
        throw new Error('Public client or creator address not available');
      }
      return getTokensByCreator(publicClient, creatorAddress, chainId);
    },
    enabled:
      options?.enabled !== undefined
        ? options.enabled && !!publicClient && !!creatorAddress
        : !!publicClient && !!creatorAddress,
    staleTime: 30 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

/**
 * Hook to check if liquidity has been added for a token
 */
export function useLiquidityStatusFromBlockchain(
  guid: string | undefined,
  options?: { enabled?: boolean }
) {
  const publicClient = usePublicClient();
  const chainId = useChainId();

  return useQuery({
    queryKey: ['liquidity-status-blockchain', guid, chainId],
    queryFn: async () => {
      if (!publicClient || !guid) {
        throw new Error('Public client or GUID not available');
      }
      return checkLiquidityAdded(publicClient, guid, chainId);
    },
    enabled: options?.enabled !== undefined ? options.enabled && !!publicClient && !!guid : !!publicClient && !!guid,
    staleTime: 30 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

/**
 * Utility function to convert blockchain token data to the frontend Token interface
 */
export function convertBlockchainTokenToToken(blockchainToken: TokenFromBlockchain) {
  return {
    guid: blockchainToken.guid,
    erc20Address: blockchainToken.tokenAddress,
    creator: blockchainToken.owner,
    name: '', // Not available from blockchain event, would need to query ERC20 contract
    symbol: '', // Not available from blockchain event, would need to query ERC20 contract
    totalSupply: '0', // Not available from blockchain event, would need to query ERC20 contract
    flatBuyTax: Number(blockchainToken.flatBuyTax),
    flatSellTax: Number(blockchainToken.flatSellTax),
    startBuyTax: Number(blockchainToken.startBuyTax),
    startSellTax: Number(blockchainToken.startSellTax),
    liquidityBackingETH: blockchainToken.backingETH.toString(),
    liquidityTokenPercent: Number(blockchainToken.tokenPercent),
    taxRecipient: blockchainToken.taxRecipient,
    taxRecipient2: blockchainToken.user2Recipient !== '0x0000000000000000000000000000000000000000' 
      ? blockchainToken.user2Recipient 
      : undefined,
    taxRecipient2Share: Number(blockchainToken.user2Share),
    whitelistOnlyDuration: 0, // Not available from blockchain event
    isOnChain: true,
    isTokenApproved: true, // If it's on-chain, it's been approved
    liquidityAdded: blockchainToken.liquidityAdded,
    createdAt: new Date(Number(blockchainToken.mintedAt) * 1000).toISOString(),
    adminPhaseARateBps: Number(blockchainToken.adminRatesBps[0]),
    adminPhaseBRateBps: Number(blockchainToken.adminRatesBps[1]),
    adminPhaseCRateBps: Number(blockchainToken.adminRatesBps[2]),
    adminPhaseADuration: Number(blockchainToken.adminDurations[0]),
    adminPhaseBDuration: Number(blockchainToken.adminDurations[1]),
    adminPhaseCDuration: Number(blockchainToken.adminDurations[2]),
  };
}

