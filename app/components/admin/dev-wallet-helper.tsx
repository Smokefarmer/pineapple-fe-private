'use client';

import { useEffect, useState } from 'react';
import { useChainId } from 'wagmi';
import { bscTestnet, sepolia } from 'wagmi/chains';
import { useSiwe } from '@/app/components/auth/siwe-provider';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { toast } from 'sonner';

export default function DevWalletHelper() {
  const chainId = useChainId();
  const { getAuthHeader, isSignedIn, userAddress } = useSiwe();

  const MAINNET_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const TESTNET_API_BASE_URL = process.env.NEXT_PUBLIC_TESTNET_API_BASE_URL;
  // Use testnet API for testnet chains (BSC Testnet and Sepolia)
  const isTestnet = chainId === bscTestnet.id || chainId === sepolia.id;
  const API_BASE_URL = isTestnet ? TESTNET_API_BASE_URL : MAINNET_API_BASE_URL;

  const [walletInput, setWalletInput] = useState<string>(userAddress ?? '');

  useEffect(() => {
    if (!walletInput && userAddress) setWalletInput(userAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);

  const valid = /^0x[a-fA-F0-9]{40}$/.test((walletInput || '').trim());
  const disabled = !isSignedIn || !valid;

  async function postCreate(path: 'create-test-user' | 'create-test-admin') {
    try {
      const walletAddress = (walletInput || '').trim();
      if (!walletAddress) {
        toast.error('Please enter a wallet address');
        return;
      }
      if (!valid) {
        toast.error('Invalid wallet address format');
        return;
      }
      if (!API_BASE_URL) {
        toast.error('API base URL not configured');
        return;
      }
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(getAuthHeader() || {}),
      };
      const res = await fetch(`${API_BASE_URL}/auth/${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ walletAddress }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed (${res.status})`);
      }
      const dataText = await res.text();
      let description: string = 'Operation completed';
      try {
        if (dataText.startsWith('{') && dataText.endsWith('}')) {
          const data = JSON.parse(dataText) as { message?: string };
          if (data?.message) description = data.message;
        } else if (dataText) {
          description = dataText;
        }
      } catch {
        // no-op
      }
      toast.success('Success', { description });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Request failed';
      toast.error('Error', { description: msg });
    }
  }

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Dev: Create Test Wallets</CardTitle>
        <CardDescription>Quickly create USER or ADMIN via backend dev endpoints.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Input
          placeholder="0x... wallet to create"
          value={walletInput}
          onChange={(e) => setWalletInput(e.target.value)}
        />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => postCreate('create-test-user')}
            disabled={disabled}
          >
            Create Test USER
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => postCreate('create-test-admin')}
            disabled={disabled}
          >
            Create Test ADMIN
          </Button>
        </div>
        <div className="text-[10px] text-muted-foreground">
          Uses {API_BASE_URL}/auth/create-test-*
        </div>
      </CardContent>
    </Card>
  );
}
