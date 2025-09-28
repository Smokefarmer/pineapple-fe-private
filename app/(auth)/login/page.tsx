'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit'; // Import RainbowKit Button
import { useSiwe } from '@/app/components/auth/siwe-provider';
import { useSession } from 'next-auth/react';
import ClientOnly from '@/app/components/client-only';

// Updated component imports
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { Button } from "@/app/components/ui/button";
// Sonner toast function
import { toast } from "sonner";
import { Loader2, CheckCircle, LogIn } from "lucide-react";

// SIWE Authentication is now handled by the SiweProvider

export default function LoginPage() {
  const { address, isConnected, isConnecting } = useAccount();
  const router = useRouter();
  const { signInWithEthereum, isLoading, isSignedIn } = useSiwe();
  const { data: session } = useSession();

  // Effect for redirecting after successful authentication
  useEffect(() => {
    if (isConnected && isSignedIn) {
      toast.success("Access Granted", {
        description: "Redirecting to dashboard...",
        duration: 1500,
      });
      const timer = setTimeout(() => {
        const role = session?.user?.role;
        const destination = role === 'ADMIN' ? '/admin' : '/dashboard';
        router.push(destination);
      }, 1500); // Delay redirect slightly
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [isConnected, isSignedIn, session?.user?.role, router]);


  // Determine the status message or component to display below the connect button
  function getStatusDisplay() {
    // Not connected yet
    if (!isConnected) {
      return (
        <div className="text-sm text-muted-foreground text-center">
          Connect your wallet to continue
        </div>
      );
    }

    // Wallet is connecting (might be brief as RainbowKit button also shows state)
    if (isConnecting) {
      return (
        <div className="flex items-center justify-center text-sm text-muted-foreground mt-4">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting wallet...
        </div>
      );
    }

    // Wallet connected but not signed in with SIWE
    if (isConnected && !isSignedIn && !isLoading) {
      return (
        <div className="flex flex-col items-center justify-center gap-2 mt-4">
          <div className="text-sm text-muted-foreground">
            Connected as <code className='font-mono bg-muted px-1 rounded'>{address?.substring(0,6)}...</code>
          </div>
          <Button 
            onClick={signInWithEthereum}
            className="mt-2"
            size="sm"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Sign-In with Ethereum
              </>
            )}
          </Button>
        </div>
      );
    }

    // SIWE authentication in progress
    if (isConnected && isLoading) {
      return (
        <div className="flex items-center justify-center text-sm text-muted-foreground mt-4">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Authenticating with Ethereum...
        </div>
      );
    }

    // Successfully authenticated
    if (isConnected && isSignedIn) {
      return (
        <Alert variant="default" className="mt-4 text-left text-xs bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-200">Access Granted</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-300"> Redirecting to dashboard...</AlertDescription>
        </Alert>
      );
    }

    // Fallback (should ideally not be reached often with the logic above)
    return null;
  }

  return (
    // Container adjusted for typical header height (h-14 => 3.5rem assumed)
    // You might need to adjust 'h-[calc(100vh-3.5rem)]' based on your actual header height
    <div className="container flex h-[calc(100vh-3.5rem)] w-screen flex-col items-center justify-center">
       <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold tracking-tight">
                  Access Token Launcher
              </CardTitle>
              <CardDescription>
                  Connect your admin-approved wallet to continue.
              </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            {/* --- RainbowKit Connect Button --- */}
            <ClientOnly fallback={
              <div className="h-10 w-full flex items-center justify-center">
                <div className="text-sm text-muted-foreground">Loading wallet...</div>
              </div>
            }>
              <ConnectButton
                  // Optional: customize appearance or behavior
                  // showBalance={false}
                  // chainStatus="icon"
                  // accountStatus="address"
              />
            </ClientOnly>

            {/* --- Status Message Area --- */}
            {/* This div ensures consistent height whether a message is present or not */}
            <div className='mt-4 min-h-[4rem] w-full flex flex-col items-center justify-center'>
                <ClientOnly fallback={
                  <div className="text-sm text-muted-foreground text-center">
                    Connect your wallet to continue
                  </div>
                }>
                  {getStatusDisplay()}
                </ClientOnly>
            </div>

          </CardContent>
       </Card>
    </div>
  );
}