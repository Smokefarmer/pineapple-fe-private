'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAccount, useSignMessage, useChainId } from 'wagmi';
import { signIn, signOut, useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { SiweMessage } from 'siwe';
import { bscTestnet, sepolia } from 'wagmi/chains';
import { useRouter } from 'next/navigation';

// Backend API URLs
const MAINNET_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TESTNET_API_BASE_URL = process.env.NEXT_PUBLIC_TESTNET_API_BASE_URL;

// Function to get the appropriate API base URL based on the current network
const getApiBaseUrl = (chainId: number) => {
  // Use testnet API for testnet chains (BSC Testnet and Sepolia)
  const isTestnet = chainId === bscTestnet.id || chainId === sepolia.id;
  return isTestnet ? TESTNET_API_BASE_URL : MAINNET_API_BASE_URL;
};

interface SiweContextType {
  signInWithEthereum: () => Promise<void>;
  isLoading: boolean;
  isSignedIn: boolean;
  userAddress: string | undefined;
  authToken: string | undefined;
  signOutWithEthereum: () => Promise<void>;
  getAuthHeader: () => Record<string, string> | undefined;
}

const SiweContext = createContext<SiweContextType | undefined>(undefined);

export function SiweProvider({ children }: { children: ReactNode }) {
  const { address } = useAccount();
  const chainId = useChainId();
  const { signMessageAsync } = useSignMessage();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Check if the user is signed in
  const isSignedIn = !!session?.user;
  const userAddress = session?.user?.address;
  const authToken = session?.user?.token;

  // When a signed-in user changes or disconnects their wallet, sign them out.
  useEffect(() => {
    if (!isSignedIn) return;

    // If wallet disconnected or switched to a different address, sign out.
    const sessionAddress = userAddress?.toLowerCase();
    const connectedAddress = address?.toLowerCase();

    if (!connectedAddress || (sessionAddress && connectedAddress !== sessionAddress)) {
      // Fire and forget; redirect after sign out
      (async () => {
        await signOut({ redirect: false });
        toast.success('Signed out due to wallet change');
        router.push('/login');
      })();
    }
  }, [address, isSignedIn, userAddress, router]);

  const signInWithEthereum = async () => {
    try {
      if (!address) {
        toast.error("Wallet not connected", {
          description: "Please connect your wallet first",
        });
        return;
      }

      setIsLoading(true);

      // Get the appropriate API URL based on the current chain
      const API_BASE_URL = getApiBaseUrl(chainId);

      // Step 1: Get the challenge from the backend with aggressive CORS handling
      const challengeResponse = await fetch(`${API_BASE_URL}/auth/web3?address=${address}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin,
        },
      });
      
      if (!challengeResponse.ok) {
        const errorText = await challengeResponse.text();
        console.error('Challenge request failed:', {
          status: challengeResponse.status,
          statusText: challengeResponse.statusText,
          error: errorText,
          url: `${API_BASE_URL}/auth/web3?address=${address}`
        });
        throw new Error(`Failed to get authentication challenge: ${challengeResponse.status} ${challengeResponse.statusText}`);
      }
      
      // Get the challenge as text instead of trying to parse JSON
      const nonce = await challengeResponse.text();
      
      // Create a proper SIWE message
      const siweMessage = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to access Pineapple Express",
        uri: window.location.origin,
        version: '1',
        chainId: chainId,
        nonce: nonce
      });
      
      // Convert SIWE message to string
      const messageToSign = siweMessage.prepareMessage();
      
      // Step 2: Sign the challenge message
      const signature = await signMessageAsync({ message: messageToSign });
      
      // Step 3: Send the signature to the backend to verify with aggressive CORS handling
      const verifyResponse = await fetch(`${API_BASE_URL}/auth/web3`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin,
        },
        body: JSON.stringify({
          signature,
          message: messageToSign
        }),
      });
      
      if (!verifyResponse.ok) {
        const errorText = await verifyResponse.text();
        console.error('Verification request failed:', {
          status: verifyResponse.status,
          statusText: verifyResponse.statusText,
          error: errorText,
          url: `${API_BASE_URL}/auth/web3`
        });
        throw new Error(`Signature verification failed: ${verifyResponse.status} ${verifyResponse.statusText}`);
      }
      
      // Parse the response to get user info and token
      let token = "authenticated";
      let userData = null;
      
      try {
        const authData = await verifyResponse.text();
        // Check if the response is JSON
        if (authData.startsWith('{') && authData.endsWith('}')) {
          const parsedData = JSON.parse(authData);
          if (parsedData.token) {
            token = parsedData.token;
            userData = parsedData.user;
            
            // Log successful authentication
            console.log('Authentication successful:', {
              address: userData?.walletAddress,
              role: userData?.role,
              name: userData?.name
            });
          }
        } else {
          // If not JSON, use the text as the token
          token = authData;
        }
      } catch {
        console.warn("Could not parse auth response as JSON, using response as token");
      }
      
      // Step 4: Use Next-Auth to create a session
      const response = await signIn("credentials", {
        address,
        token,
        // Include additional user data in the session
        name: userData?.name || `user-${address.substring(0, 8)}`,
        role: userData?.role || 'USER',
        userId: userData?._id,
        redirect: false,
      });

      if (response?.error) {
        toast.error("Authentication failed", {
          description: response.error,
        });
      } else {
        toast.success("Successfully authenticated!");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Please try again";
      toast.error("Error signing in", {
        description: errorMessage,
      });
      console.error("Error signing in with Ethereum:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOutWithEthereum = async () => {
    await signOut({ redirect: false });
    toast.success("Signed out successfully");
    router.push('/login');
  };
  
  // Helper function to get auth headers for API requests
  const getAuthHeader = () => {
    if (!authToken) return undefined;
    return {
      'Authorization': `Bearer ${authToken}`
    };
  };

  return (
    <SiweContext.Provider
      value={{
        signInWithEthereum,
        isLoading,
        isSignedIn,
        userAddress,
        authToken,
        signOutWithEthereum,
        getAuthHeader,
      }}
    >
      {children}
    </SiweContext.Provider>
  );
}

export function useSiwe() {
  const context = useContext(SiweContext);
  if (context === undefined) {
    throw new Error("useSiwe must be used within a SiweProvider");
  }
  return context;
}
