'use client';

import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { useSiwe } from '@/app/components/auth/siwe-provider';
import { useTokens, type Token } from '@/app/lib/queries';
import { useRouter } from 'next/navigation';
import { Button } from "@/app/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
// import { toast } from "sonner";
import { Plus, Coins, ArrowRight, RefreshCw, AlertCircle } from "lucide-react";

// No need to define Token interface or fetchUserTokens function as they're imported from queries.ts

export default function DashboardPage() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { isSignedIn } = useSiwe();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch user's tokens using the custom hook
  const { data: allTokens, isLoading, isError, error, refetch } = useTokens();
  const { address } = useAccount();
  
  // Filter tokens to only show ones created by the current user
  const tokens = allTokens?.filter((token: Token) => token.creator === address) || [];

  // Handle creating a new token
  const handleCreateToken = () => {
    // Generate a unique ID for the new token
    const newTokenId = `new-${Date.now()}`;
    router.push(`/dashboard/${newTokenId}`);
  };

  // Navigate to token details
  const navigateToToken = (guid: string) => {
    router.push(`/dashboard/${guid}`);
  };

  // Show loading state
  if (!isClient) {
    return <div className="container max-w-4xl mx-auto p-6">
      <LoadingDashboard />
    </div>;
  }

  // Show not connected state
  if (!isConnected || !isSignedIn) {
    return (
      <div className="container max-w-4xl mx-auto p-6">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            Please connect your wallet and sign in to access your dashboard.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Created Tokens</h1>
        <Button onClick={() => refetch()} variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <LoadingDashboard />
      ) : isError ? (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to load your tokens'}
          </AlertDescription>
        </Alert>
      ) : (
        <>
          {tokens && tokens.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {tokens.map((token: Token) => (
                <Card key={token.guid} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Coins className="h-5 w-5 text-primary" />
                      {token.symbol}
                    </CardTitle>
                    <CardDescription>
                      {token.createdAt ? `Created ${new Date(token.createdAt).toLocaleDateString()}` : token.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 pt-0">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Supply:</span>
                        <span>{Number(token.totalSupply).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span>
                          {token.isTokenApproved ? (token.isOnChain ? 'Deployed' : 'Approved') : 'Not Deployed'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="secondary" 
                      className="w-full gap-2"
                      onClick={() => navigateToToken(token.guid)}
                    >
                      Manage Token
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="mb-8">
              <CardContent className="pt-6 pb-6 text-center">
                <p className="text-muted-foreground mb-2">You don&apos;t have any tokens yet.</p>
                <p className="text-sm text-muted-foreground">Create your first token to get started.</p>
              </CardContent>
            </Card>
          )}

          {/* Create New Token CTA */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 pb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Create a New Token</h3>
                  <p className="text-sm text-muted-foreground">Launch your own token with customizable parameters</p>
                </div>
                <Button onClick={handleCreateToken} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Token
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

// Loading skeleton component
function LoadingDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[1, 2].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-1/3 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="pb-2 pt-0">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="pt-6 pb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-2/3">
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-9 w-full md:w-1/3" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
