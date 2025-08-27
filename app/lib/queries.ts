import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount, useChainId } from 'wagmi';
import { useSiwe } from '@/app/components/auth/siwe-provider';
import { bscTestnet } from 'wagmi/chains';

// API base URLs
const MAINNET_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TESTNET_API_BASE_URL = process.env.NEXT_PUBLIC_TESTNET_API_BASE_URL;

// Function to get the appropriate API base URL based on the current network
const getApiBaseUrl = (chainId: number) => {
  return chainId === bscTestnet.id ? TESTNET_API_BASE_URL : MAINNET_API_BASE_URL;
};

// API client with authentication handling
const apiClient = {
  fetch: async (endpoint: string, options: RequestInit = {}, chainId: number) => {
    // Get the appropriate API base URL based on the chain ID
    const API_BASE_URL = getApiBaseUrl(chainId);
    console.log({API_BASE_URL});
    // We'll use the session directly in each query function
    // This avoids the need for a separate getAuthToken function

    // Initialize headers as a mutable Record, merging options.headers
    // This allows using string keys like 'Content-Type'
    const headers: Record<string, string> = {};
    if (options.headers) {
      // Iterate over options.headers safely, handling Headers object or array/object forms
      if (options.headers instanceof Headers) {
          options.headers.forEach((value, key) => { headers[key] = value; });
      } else if (Array.isArray(options.headers)) {
          options.headers.forEach(([key, value]) => { headers[key] = value; });
      } else {
          Object.assign(headers, options.headers);
      }
    }

    // Conditionally set Content-Type unless the body is FormData
    if (!(options.body instanceof FormData)) {
      // Set default Content-Type if not already present
      if (!headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
      }
    } else {
      // If body is FormData, ensure Content-Type is NOT set,
      // allowing the browser to set the correct multipart/form-data boundary.
      delete headers['Content-Type'];
    }

    const config = {
      ...options,
      headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); // Try to get error message from body
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
    
    // ---> ADDED: Handle 204 No Content <---
    if (response.status === 204) {
      return null; 
    }

    // ---> MODIFIED: Return parsed JSON on success <---
    return response.json(); 
  }
};

// Token interface
export interface Token {
  guid: string;
  name: string;
  symbol: string;
  totalSupply: string;
  flatBuyTax: number;
  flatSellTax: number;
  startBuyTax: number;
  startSellTax: number;
  liquidityBackingETH: string;
  whitelistOnlyDuration: number;
  taxRecipient: string;
  taxRecipient2?: string;
  taxRecipient2Share?: number;
  imageUrl?: string;
  metaDataURI?: string;
  erc20Address?: string;
  isOnChain?: boolean;
  isTokenApproved?: boolean;
  liquidityAdded?: boolean;
  isLiquidityApproved?: boolean;
  liquidityTokenPercent?: number;
  creator?: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
  __v?: number;
  // Admin configuration fields (individual fields as returned by backend)
  adminPhaseARateBps?: number; // Admin tax rate A in basis points
  adminPhaseBRateBps?: number; // Admin tax rate B in basis points
  adminPhaseCRateBps?: number; // Admin tax rate C in basis points
  adminPhaseADuration?: number; // Admin duration A in seconds
  adminPhaseBDuration?: number; // Admin duration B in seconds
  adminPhaseCDuration?: number; // Admin duration C in seconds
}

// Token creation interface
export interface TokenCreateRequest {
  name: string;
  symbol: string;
  totalSupply: string;
  flatBuyTax: number;
  flatSellTax: number;
  startBuyTax: number;
  startSellTax: number;
  liquidityBackingETH: string;
  whitelistOnlyDuration: number;
  taxRecipient: string;
  taxRecipient2?: string;
  taxRecipient2Share?: number;
  metaDataURI: string;
  image?: string;
  // Admin configuration fields (individual fields as returned by backend)
  adminPhaseARateBps?: number; // Admin tax rate A in basis points
  adminPhaseBRateBps?: number; // Admin tax rate B in basis points
  adminPhaseCRateBps?: number; // Admin tax rate C in basis points
  adminPhaseADuration?: number; // Admin duration A in seconds
  adminPhaseBDuration?: number; // Admin duration B in seconds
  adminPhaseCDuration?: number; // Admin duration C in seconds
}

// Token approval interface
export interface ApproveTokenRequest {
  liquidityTokenPercent: number;
}

// Define the structure for a single whitelist entry
export interface WhitelistEntry {
  walletAddress: string; // Renamed from address
  allowedBuyAmount: number;
  recordedBuyAmount: number;
  createdAt: number; // Timestamp
  updatedAt: number; // Timestamp
  guid: string;
  _id?: string; // Made optional as it wasn't in the provided example
}

// Define the structure for the paginated API response
export interface PaginatedWhitelistResponse {
  items: WhitelistEntry[];
  total: number;
  page: number;
  limit: number;
}

// Function to fetch whitelist entries from the API
const fetchWhitelistEntries = async (guid: string, chainId: number, page = 1, limit = 25): Promise<PaginatedWhitelistResponse> => {
  if (!guid) throw new Error("GUID is required to fetch whitelist entries");
  // Construct URL with query parameters for pagination
  // ---> MODIFIED: Directly return the result from apiClient.fetch <---
  const responseData = await apiClient.fetch(`/whitelist/${guid}?page=${page}&limit=${limit}`, {}, chainId);

  // apiClient.fetch now returns parsed data or throws an error.
  // We might need to handle the case where it returns null (e.g., 204 No Content),
  // although for a GET request returning a list, 204 is unlikely. 
  // Let's assume it always returns the expected PaginatedWhitelistResponse object on success here.
  return responseData as PaginatedWhitelistResponse;
};

// React Query hook to fetch whitelist entries
export const useWhitelistEntries = (guid: string) => {
  const { address } = useAccount();
  const { isSignedIn, getAuthHeader } = useSiwe();
  const chainId = useChainId();

  return useQuery<PaginatedWhitelistResponse, Error>({
    queryKey: ['whitelist', guid, address], // Query key includes the token guid and user address
    queryFn: async () => {
      if (!guid || !address || !isSignedIn) {
        throw new Error('Authentication required');
      }

      const authHeaders = getAuthHeader();
      if (!authHeaders) {
        throw new Error('Authentication token not found');
      }

      return fetchWhitelistEntries(guid, chainId);
    },
    enabled: !!guid && !!address && !!isSignedIn, // Only run the query if guid and user address are available
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
};

/**
 * Fetch all tokens for the current user
 */
export function useTokens() {
  const { address } = useAccount();
  const { isSignedIn, getAuthHeader } = useSiwe();
  const chainId = useChainId();
  console.log({chainId});
  return useQuery({
    queryKey: ['tokens', address],
    queryFn: async () => {
      if (!address || !isSignedIn) {
        throw new Error('Authentication required');
      }
      
      const authHeaders = getAuthHeader();
      if (!authHeaders) {
        throw new Error('Authentication token not found');
      }

      return apiClient.fetch('/token', {
        headers: authHeaders
      }, chainId);
    },
    enabled: !!address && !!isSignedIn,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Fetch a single token by ID
 */
export function useToken(tokenId: string, options?: { enabled: boolean }) {
  const { address } = useAccount();
  const { isSignedIn, getAuthHeader } = useSiwe();
  const chainId = useChainId();

  return useQuery({
    queryKey: ['token', tokenId, address],
    queryFn: async () => {
      if (!tokenId || !address || !isSignedIn) {
        throw new Error('Authentication required');
      }

      const authHeaders = getAuthHeader();
      if (!authHeaders) {
        throw new Error('Authentication token not found');
      }

      return apiClient.fetch(`/token/${tokenId}`, {
        headers: authHeaders
      }, chainId);
    },
    enabled: options?.enabled !== undefined ? options.enabled && !!tokenId && !!address && !!isSignedIn : !!tokenId && !!address && !!isSignedIn,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Create a new token
 */
export function useCreateToken() {
  const { address } = useAccount();
  const { isSignedIn, getAuthHeader } = useSiwe();
  const queryClient = useQueryClient();
  const chainId = useChainId();

  return useMutation({
    mutationFn: async (payload: FormData) => {
      if (!address || !isSignedIn) {
        throw new Error('Authentication required');
      }

      const authHeaders = getAuthHeader();
      if (!authHeaders) {
        throw new Error('Authentication token not found');
      }

      return apiClient.fetch('/token', {
        method: 'POST',
        headers: authHeaders, 
        body: payload 
      }, chainId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tokens'] });
    }
  });
}

/**
 * Approve a token with liquidity percentage
 */
export function useApproveToken() {
  const { address } = useAccount();
  const { isSignedIn, getAuthHeader } = useSiwe();
  const queryClient = useQueryClient();
  const chainId = useChainId();

  return useMutation({
    mutationFn: async ({ 
      guid, 
      liquidityTokenPercent, 
      adminRatesBps, 
      adminDurations
    }: { 
      guid: string; 
      liquidityTokenPercent: number;
      adminRatesBps: number[];
      adminDurations: number[];
    }) => {
      if (!address || !isSignedIn) {
        throw new Error('Authentication required');
      }

      const authHeaders = getAuthHeader();
      if (!authHeaders) {
        throw new Error('Authentication token not found');
      }

      return apiClient.fetch('/token/approve-token', { 
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({
          guid,
          liquidityTokenPercent,
          adminRatesBps,
          adminDurations
        })
      }, chainId);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['token', variables.guid] });
      queryClient.invalidateQueries({ queryKey: ['tokens'] });
    }
  });
};

/**
 * Approve liquidity deployment (ADMIN)
 */
export const useApproveLiquidity = () => {
  const { address } = useAccount();
  const { isSignedIn, getAuthHeader } = useSiwe();
  const queryClient = useQueryClient();
  const chainId = useChainId();

  return useMutation({
    mutationFn: async ({ guid }: { guid: string }) => {
      if (!address || !isSignedIn) {
        throw new Error('Authentication required');
      }

      const authHeaders = getAuthHeader();
      if (!authHeaders) {
        throw new Error('Authentication token not found');
      }

      return apiClient.fetch('/token/approve-liquidity', { 
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ guid })
      }, chainId);
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch the specific token query
      queryClient.invalidateQueries({ queryKey: ['token', variables.guid] });
      // Optionally invalidate the list query if needed
      // queryClient.invalidateQueries({ queryKey: ['tokens'] }); 
    }
  });
};

/**
 * Get token deploy signature
 */
export function useTokenDeploySignature(guid: string, options?: { enabled?: boolean }) {
  const { address } = useAccount();
  const { isSignedIn, getAuthHeader } = useSiwe();
  const chainId = useChainId();

  return useQuery({
    queryKey: ['tokenDeploySignature', guid, address],
    queryFn: async () => {
      if (!guid || !address || !isSignedIn) {
        throw new Error('Authentication required');
      }

      const authHeaders = getAuthHeader();
      if (!authHeaders) {
        throw new Error('Authentication token not found');
      }

      return apiClient.fetch(`/token/${guid}/create-signature`, {
        headers: authHeaders
      }, chainId);
    },
    enabled: options?.enabled !== undefined ? options.enabled && !!guid && !!address && !!isSignedIn : !!guid && !!address && !!isSignedIn,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Get token liquidity signature
 */
export function useTokenLiquiditySignature(guid: string, options?: { enabled?: boolean }) {
  const { address } = useAccount();
  const { isSignedIn, getAuthHeader } = useSiwe();
  const chainId = useChainId();

  return useQuery({
    queryKey: ['tokenLiquiditySignature', guid, address],
    queryFn: async () => {
      if (!guid || !address || !isSignedIn) {
        throw new Error('Authentication required');
      }

      const authHeaders = getAuthHeader();
      if (!authHeaders) {
        throw new Error('Authentication token not found');
      }

      return apiClient.fetch(`/token/${guid}/liquidity-signature`, {
        headers: authHeaders
      }, chainId);
    },
    enabled: options?.enabled !== undefined ? options.enabled && !!guid && !!address && !!isSignedIn : !!guid && !!address && !!isSignedIn,
    staleTime: 60 * 1000, // 1 minute
  });
}
