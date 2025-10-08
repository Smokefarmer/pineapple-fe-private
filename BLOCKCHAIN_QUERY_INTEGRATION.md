# Direct Blockchain Query Integration Guide

This guide explains how to use the direct blockchain queries to fetch token data, bypassing the indexer dependency.

## Problem

The indexer is not picking up the `LaunchTokenCreated` event, which prevents the admin dashboard from showing token deployment status and liquidity details.

## Solution

Query the blockchain directly via RPC to fetch token creation events from the Router contract.

## Files Created

1. **`app/lib/blockchain-queries.ts`** - Core blockchain query functions using Viem
2. **`app/lib/blockchain-hooks.ts`** - React hooks for blockchain queries
3. **`app/components/TokenFromBlockchainExample.tsx`** - Example component

## How to Use

### Option 1: Replace Backend Query Entirely

In your dashboard component, replace the backend API call with blockchain query:

```typescript
// OLD (via backend/indexer):
import { useToken } from '@/lib/queries';
const { data: tokenData, isLoading, error } = useToken(tokenId);

// NEW (direct blockchain):
import { useTokenFromBlockchain, convertBlockchainTokenToToken } from '@/lib/blockchain-hooks';
const { data: blockchainToken, isLoading, error } = useTokenFromBlockchain(tokenId);
const tokenData = blockchainToken ? convertBlockchainTokenToToken(blockchainToken) : null;
```

### Option 2: Fallback to Blockchain (Recommended)

Keep the backend query but fall back to blockchain if it fails:

```typescript
import { useToken } from '@/lib/queries';
import { useTokenFromBlockchain, convertBlockchainTokenToToken } from '@/lib/blockchain-hooks';

// Try backend first
const { data: backendToken, isLoading: backendLoading, error: backendError } = useToken(tokenId);

// Fall back to blockchain if backend fails or returns null
const { 
  data: blockchainToken, 
  isLoading: blockchainLoading 
} = useTokenFromBlockchain(tokenId, {
  enabled: !backendLoading && (!backendToken || !!backendError)
});

// Use blockchain data if backend data is not available
const tokenData = backendToken || (blockchainToken ? convertBlockchainTokenToToken(blockchainToken) : null);
const isLoading = backendLoading || blockchainLoading;
```

### Option 3: Check Deployment Status Specifically

To check if a token has been deployed (for the admin liquidity flow):

```typescript
import { useTokenFromBlockchain } from '@/lib/blockchain-hooks';

function LiquidityDashboard({ tokenId }: { tokenId: string }) {
  // Query blockchain for token creation event
  const { data: blockchainToken, isLoading } = useTokenFromBlockchain(tokenId);
  
  // Check if token is deployed on-chain
  const isDeployed = !!blockchainToken;
  const tokenAddress = blockchainToken?.tokenAddress;
  const liquidityAdded = blockchainToken?.liquidityAdded || false;
  
  if (isLoading) {
    return <div>Checking deployment status...</div>;
  }
  
  if (!isDeployed) {
    return <div>Token not yet deployed to blockchain</div>;
  }
  
  return (
    <div>
      <p>Token Address: {tokenAddress}</p>
      <p>Liquidity Added: {liquidityAdded ? 'Yes' : 'No'}</p>
      {!liquidityAdded && <button>Add Liquidity</button>}
    </div>
  );
}
```

### Get All User Tokens from Blockchain

```typescript
import { useTokensByCreatorFromBlockchain } from '@/lib/blockchain-hooks';
import { useAccount } from 'wagmi';

function MyTokensList() {
  const { address } = useAccount();
  const { data: tokens, isLoading } = useTokensByCreatorFromBlockchain(address);
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {tokens?.map(token => (
        <div key={token.guid}>
          {token.tokenAddress} - Liquidity: {token.liquidityAdded ? 'Added' : 'Pending'}
        </div>
      ))}
    </div>
  );
}
```

### Check Liquidity Status

```typescript
import { useLiquidityStatusFromBlockchain } from '@/lib/blockchain-hooks';

function LiquidityStatus({ guid }: { guid: string }) {
  const { data: liquidityStatus } = useLiquidityStatusFromBlockchain(guid);
  
  if (!liquidityStatus?.added) {
    return <div>Liquidity not yet added</div>;
  }
  
  return (
    <div>
      <p>Liquidity Added!</p>
      <p>Pair Address: {liquidityStatus.pairAddress}</p>
      <p>Timestamp: {new Date(Number(liquidityStatus.timestamp) * 1000).toLocaleString()}</p>
    </div>
  );
}
```

## Integration Steps for Admin Dashboard

1. **Update the Token Detail Page** (`app/(admin)/admin/token/[guid]/page.tsx`):

```typescript
// Add blockchain query import
import { useTokenFromBlockchain } from '@/lib/blockchain-hooks';

// Inside the component, add blockchain query
const { data: blockchainToken } = useTokenFromBlockchain(guid, {
  enabled: !tokenData?.isOnChain // Only query if backend says not on-chain
});

// Merge data
const isActuallyDeployed = tokenData?.isOnChain || !!blockchainToken;
const actualTokenAddress = blockchainToken?.tokenAddress || tokenData?.erc20Address;
const actualLiquidityAdded = blockchainToken?.liquidityAdded || tokenData?.liquidityAdded;
```

2. **Update User Dashboard** (`app/(user)/dashboard/[id]/page.tsx`):

Similar approach - add blockchain query as fallback or primary source for deployment status.

## Benefits

- ✅ **No Indexer Dependency**: Works even if indexer is down or delayed
- ✅ **Real-time Data**: Always gets latest blockchain state
- ✅ **Reliable**: Queries directly from blockchain
- ✅ **Fallback Strategy**: Can use as fallback if backend/indexer fails

## Performance Considerations

- Blockchain queries can take 1-3 seconds depending on block range
- Data is cached for 30 seconds by React Query
- For better performance, consider:
  - Reducing block range if you know approximate deployment time
  - Using contract deployment block as starting point
  - Implementing pagination for user token lists

## RPC Configuration

The queries use the RPC endpoint configured in wagmi:
- **Sepolia**: `https://eth-sepolia.g.alchemy.com/v2/tkjYW8TyYZ6QLjzbYZBkS`

## Debugging

All blockchain queries log detailed information to console:
```
🔍 Querying blockchain for token with GUID: 0x...
   Router contract: 0x71fa6b273e1736e388b508303846f5203aaeca2a
   Chain ID: 11155111
   Searching blocks 7000000 to 7100000
   Found 1 LaunchTokenCreated events
   ✅ Found token at address: 0x...
   Liquidity added: false
```

## Testing

1. Create a token via the normal flow
2. Deploy it to blockchain
3. Open browser console and check for blockchain query logs
4. Verify the token details are loaded correctly
5. Add liquidity and verify it's detected

## Next Steps

After confirming blockchain queries work:
1. Update admin dashboard to use blockchain queries for deployment status
2. Consider removing indexer dependency for critical flows
3. Keep backend for metadata storage (name, symbol, image, etc.)
4. Use hybrid approach: metadata from backend, deployment status from blockchain

