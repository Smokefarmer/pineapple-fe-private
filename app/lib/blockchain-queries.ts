import { PublicClient, decodeEventLog, parseAbiItem } from 'viem';
import { routerAbi, routerAddress } from '@/generated';

/**
 * Token data from LaunchTokenCreated event
 */
export interface TokenFromBlockchain {
  guid: string;
  tokenAddress: string;
  owner: string;
  mintedAt: bigint;
  backingETH: bigint;
  tokenPercent: bigint;
  taxRecipient: string;
  flatBuyTax: bigint;
  flatSellTax: bigint;
  startBuyTax: bigint;
  startSellTax: bigint;
  user2Recipient: string;
  user2Share: bigint;
  adminRatesBps: readonly [bigint, bigint, bigint];
  adminDurations: readonly [bigint, bigint, bigint];
  blockNumber: bigint;
  transactionHash: string;
  liquidityAdded?: boolean;
}

/**
 * Query the blockchain directly for a LaunchTokenCreated event by GUID
 * This bypasses the indexer and queries the Router contract events directly
 */
export async function getTokenFromBlockchain(
  publicClient: PublicClient,
  guid: string,
  chainId: number
): Promise<TokenFromBlockchain | null> {
  try {
    const contractAddress = routerAddress[chainId as keyof typeof routerAddress];
    
    if (!contractAddress) {
      console.error(`No Router contract address configured for chain ${chainId}`);
      return null;
    }

    console.log(`🔍 Querying blockchain for token with GUID: ${guid}`);
    console.log(`   Router contract: ${contractAddress}`);
    console.log(`   Chain ID: ${chainId}`);

    // Get the current block number
    const currentBlock = await publicClient.getBlockNumber();
    
    // Define a reasonable block range to search (last 100,000 blocks, adjust as needed)
    // For production, you might want to start from contract deployment block
    const fromBlock = currentBlock - BigInt(100000);
    
    console.log(`   Searching blocks ${fromBlock} to ${currentBlock}`);

    // Query for LaunchTokenCreated events
    const logs = await publicClient.getLogs({
      address: contractAddress,
      event: parseAbiItem('event LaunchTokenCreated(bytes32 indexed guid, address token, address owner, uint256 mintedAt, uint256 backingETH, uint256 tokenPercent, address taxRecipient, uint256 flatBuyTax, uint256 flatSellTax, uint256 startBuyTax, uint256 startSellTax, address user2Recipient, uint256 user2Share, uint256[3] adminRatesBps, uint256[3] adminDurations)'),
      args: {
        guid: guid as `0x${string}`,
      },
      fromBlock,
      toBlock: currentBlock,
    });

    console.log(`   Found ${logs.length} LaunchTokenCreated events`);

    if (logs.length === 0) {
      console.warn(`   No LaunchTokenCreated event found for GUID: ${guid}`);
      return null;
    }

    // Take the first (should be only) event for this GUID
    const log = logs[0];
    
    // Decode the event
    const decoded = decodeEventLog({
      abi: routerAbi,
      data: log.data,
      topics: log.topics,
    });

    console.log(`   ✅ Found token at address: ${decoded.args.token}`);

    // Check if liquidity has been added by querying LiquidityAdded events for this GUID
    const liquidityLogs = await publicClient.getLogs({
      address: contractAddress,
      event: parseAbiItem('event LiquidityAdded(bytes32 indexed guid, address indexed pair, uint256 timestamp)'),
      args: {
        guid: guid as `0x${string}`,
      },
      fromBlock,
      toBlock: currentBlock,
    });

    const liquidityAdded = liquidityLogs.length > 0;
    console.log(`   Liquidity added: ${liquidityAdded}`);

    return {
      guid: decoded.args.guid,
      tokenAddress: decoded.args.token,
      owner: decoded.args.owner,
      mintedAt: decoded.args.mintedAt,
      backingETH: decoded.args.backingETH,
      tokenPercent: decoded.args.tokenPercent,
      taxRecipient: decoded.args.taxRecipient,
      flatBuyTax: decoded.args.flatBuyTax,
      flatSellTax: decoded.args.flatSellTax,
      startBuyTax: decoded.args.startBuyTax,
      startSellTax: decoded.args.startSellTax,
      user2Recipient: decoded.args.user2Recipient,
      user2Share: decoded.args.user2Share,
      adminRatesBps: decoded.args.adminRatesBps,
      adminDurations: decoded.args.adminDurations,
      blockNumber: log.blockNumber,
      transactionHash: log.transactionHash,
      liquidityAdded,
    };
  } catch (error) {
    console.error('❌ Error querying blockchain for token:', error);
    throw error;
  }
}

/**
 * Get all tokens created by a specific address
 */
export async function getTokensByCreator(
  publicClient: PublicClient,
  creatorAddress: string,
  chainId: number
): Promise<TokenFromBlockchain[]> {
  try {
    const contractAddress = routerAddress[chainId as keyof typeof routerAddress];
    
    if (!contractAddress) {
      console.error(`No Router contract address configured for chain ${chainId}`);
      return [];
    }

    console.log(`🔍 Querying blockchain for tokens by creator: ${creatorAddress}`);

    const currentBlock = await publicClient.getBlockNumber();
    const fromBlock = currentBlock - BigInt(100000);

    // Query for all LaunchTokenCreated events
    const logs = await publicClient.getLogs({
      address: contractAddress,
      event: parseAbiItem('event LaunchTokenCreated(bytes32 indexed guid, address token, address owner, uint256 mintedAt, uint256 backingETH, uint256 tokenPercent, address taxRecipient, uint256 flatBuyTax, uint256 flatSellTax, uint256 startBuyTax, uint256 startSellTax, address user2Recipient, uint256 user2Share, uint256[3] adminRatesBps, uint256[3] adminDurations)'),
      fromBlock,
      toBlock: currentBlock,
    });

    // Filter events by creator address and decode them
    const tokens: TokenFromBlockchain[] = [];
    
    for (const log of logs) {
      const decoded = decodeEventLog({
        abi: routerAbi,
        data: log.data,
        topics: log.topics,
      });

      // Filter by creator
      if (decoded.args.owner.toLowerCase() === creatorAddress.toLowerCase()) {
        // Check liquidity status for each token
        const liquidityLogs = await publicClient.getLogs({
          address: contractAddress,
          event: parseAbiItem('event LiquidityAdded(bytes32 indexed guid, address indexed pair, uint256 timestamp)'),
          args: {
            guid: decoded.args.guid,
          },
          fromBlock,
          toBlock: currentBlock,
        });

        tokens.push({
          guid: decoded.args.guid,
          tokenAddress: decoded.args.token,
          owner: decoded.args.owner,
          mintedAt: decoded.args.mintedAt,
          backingETH: decoded.args.backingETH,
          tokenPercent: decoded.args.tokenPercent,
          taxRecipient: decoded.args.taxRecipient,
          flatBuyTax: decoded.args.flatBuyTax,
          flatSellTax: decoded.args.flatSellTax,
          startBuyTax: decoded.args.startBuyTax,
          startSellTax: decoded.args.startSellTax,
          user2Recipient: decoded.args.user2Recipient,
          user2Share: decoded.args.user2Share,
          adminRatesBps: decoded.args.adminRatesBps,
          adminDurations: decoded.args.adminDurations,
          blockNumber: log.blockNumber,
          transactionHash: log.transactionHash,
          liquidityAdded: liquidityLogs.length > 0,
        });
      }
    }

    console.log(`   Found ${tokens.length} tokens for creator ${creatorAddress}`);
    return tokens;
  } catch (error) {
    console.error('❌ Error querying blockchain for creator tokens:', error);
    throw error;
  }
}

/**
 * Check if liquidity has been added for a token
 */
export async function checkLiquidityAdded(
  publicClient: PublicClient,
  guid: string,
  chainId: number
): Promise<{ added: boolean; pairAddress?: string; timestamp?: bigint }> {
  try {
    const contractAddress = routerAddress[chainId as keyof typeof routerAddress];
    
    if (!contractAddress) {
      return { added: false };
    }

    const currentBlock = await publicClient.getBlockNumber();
    const fromBlock = currentBlock - BigInt(100000);

    const logs = await publicClient.getLogs({
      address: contractAddress,
      event: parseAbiItem('event LiquidityAdded(bytes32 indexed guid, address indexed pair, uint256 timestamp)'),
      args: {
        guid: guid as `0x${string}`,
      },
      fromBlock,
      toBlock: currentBlock,
    });

    if (logs.length === 0) {
      return { added: false };
    }

    const log = logs[0];
    const decoded = decodeEventLog({
      abi: routerAbi,
      data: log.data,
      topics: log.topics,
    });

    return {
      added: true,
      pairAddress: decoded.args.pair,
      timestamp: decoded.args.timestamp,
    };
  } catch (error) {
    console.error('❌ Error checking liquidity status:', error);
    return { added: false };
  }
}

