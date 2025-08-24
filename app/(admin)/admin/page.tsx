'use client';

// Updated component imports
import { Button } from "@/app/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/app/components/ui/table";
import DevWalletHelper from "@/app/components/admin/dev-wallet-helper";
import UserManagement from "@/app/components/admin/UserManagement";
import { useCanCreateAdmin } from "@/app/lib/hooks/useUserRole";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/app/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";

// Sonner toast function
import { toast } from "sonner";
import { useAccount } from 'wagmi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {  Eye, Loader2, PlusCircle, RefreshCw, Trash2, UserCheck, Users, AlertCircle } from "lucide-react";
import { useRouter } from 'next/navigation';

// Import token queries
import { useTokens, Token } from '@/app/lib/queries';
import { Badge } from "@/app/components/ui/badge";

// --- Placeholder API & Mutation Functions ---
async function fetchWhitelistedWallets(): Promise<string[]> { await new Promise(r => setTimeout(r, 800)); return ['0xUserA...', '0xUserB...', '0xPartnerX...', '0xd8b2a4901d769a5532c8e297d57698dcbae0633f']; }
async function addWhitelistedWallet(walletAddress: string): Promise<void> { if (!walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) throw new Error("Invalid address format."); await new Promise(r => setTimeout(r, 500)); console.log("Wallet Added:", walletAddress); }
async function removeWhitelistedWallet(walletAddress: string): Promise<void> { await new Promise(r => setTimeout(r, 500)); console.log("Wallet Removed:", walletAddress); }
// --- End Placeholder Functions ---


export default function AdminPage() {
  const { address, isConnected } = useAccount();
  const queryClient = useQueryClient();
  const router = useRouter();
  const canCreateAdmin = useCanCreateAdmin();

  const [newWalletAddress, setNewWalletAddress] = useState('');
  const [walletToRemove, setWalletToRemove] = useState<string | null>(null); // For confirmation dialog

  // --- Queries ---
  const { data: tokensData, isLoading: isLoadingTokens, error: tokensError, refetch: refetchTokens } = useTokens();
  
  const { data: whitelistedWalletsData, isLoading: isLoadingWallets, error: walletsError, refetch: refetchWallets } = useQuery({
    queryKey: ['whitelistedWallets'], queryFn: fetchWhitelistedWallets, enabled: isConnected, staleTime: 60 * 1000,
  });
  // --- End Queries ---

  // Function to navigate to token details
  const viewTokenDetails = (guid: string) => {
    router.push(`/admin/token/${guid}`);
  };

  const { mutate: addWalletMutate, isPending: isAddingWallet } = useMutation({
    mutationFn: addWhitelistedWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whitelistedWallets'] });
      setNewWalletAddress('');
      toast.success("Wallet Added", { description: "Address added to whitelist." }); // Sonner
    },
    onError: (error: Error) => toast.error("Error Adding Wallet", { description: error.message }), // Sonner
  });
   const { mutate: removeWalletMutate, isPending: isRemovingWallet } = useMutation({
    mutationFn: removeWhitelistedWallet,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['whitelistedWallets'] });
      toast.success("Wallet Removed", { description: `Address ${variables.substring(0,8)}... removed.` }); // Sonner
      setWalletToRemove(null); // Close dialog on success
    },
    onError: (error: Error) => toast.error("Error Removing Wallet", { description: error.message }), // Sonner
  });
  // --- End Mutations ---


  // --- Handlers ---
  const handleAddWallet = () => {
      if (!newWalletAddress) return;
      // Basic validation before sending
      if (!newWalletAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
          toast.error("Invalid Address Format", { description: "Please enter a valid Ethereum address starting with 0x."})
          return;
      }
      addWalletMutate(newWalletAddress);
  }
  const handleRemoveWalletConfirm = () => {
      if (walletToRemove) {
          removeWalletMutate(walletToRemove);
      }
  }
   const copyToClipboard = (text: string) => {
       navigator.clipboard.writeText(text);
       toast("Address copied to clipboard."); // Use Sonner simple toast
   }
  // --- End Handlers ---


  // --- Render Logic ---
  if (!isConnected) {
    return <div className="container py-8"><Card className="p-6 text-center text-muted-foreground">Please connect wallet.</Card></div>;
  }

  return (
    <TooltipProvider delayDuration={100}>
     <div className="container py-8 space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Connected: <code className="font-mono">{address?.substring(0, 6)}...{address?.substring(address.length-4)}</code></p>
            </div>
            <div className="flex items-center gap-4">
                <UserManagement isSuperAdmin={canCreateAdmin} />
            </div>
        </div>

        {/* Token Management */}
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Token Management & Approval</CardTitle>
                <CardDescription>Review and manage user-submitted tokens.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoadingTokens ? ( <Skeleton className="h-40 w-full" /> )
                : tokensError ? ( <Alert variant="destructive"><AlertCircle className="h-4 w-4"/> <AlertTitle>Error Loading Tokens</AlertTitle> <AlertDescription>{tokensError.message} <Button variant="ghost" size="sm" onClick={() => refetchTokens()}><RefreshCw className="h-3 w-3 ml-2"/></Button></AlertDescription></Alert> )
                : (
                    <Table>
                        <TableCaption>{!tokensData || tokensData.length === 0 ? 'No tokens submitted yet.' : 'List of submitted tokens.'}</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Symbol</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Creator</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(tokensData || []).map((token: Token) => (
                                <TableRow key={token.guid}>
                                    <TableCell className="font-medium">{token.symbol}</TableCell>
                                    <TableCell>{token.name}</TableCell>
                                    <TableCell>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span className="font-mono cursor-pointer text-xs" onClick={() => copyToClipboard(token.creator || '')}>
                                                    {token.creator ? `${token.creator.substring(0, 6)}...${token.creator.substring(token.creator.length-4)}` : 'Unknown'}
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent><p>Click to copy: {token.creator}</p></TooltipContent>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        {token.isOnChain ? (
                                            <Badge className="bg-green-500">Deployed</Badge>
                                        ) : token.isTokenApproved ? (
                                            <Badge className="bg-blue-500">Approved</Badge>
                                        ) : (
                                            <Badge className="bg-yellow-500">Pending</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right space-x-1">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-7 w-7" 
                                                    onClick={() => viewTokenDetails(token.guid)}
                                                >
                                                    <Eye className="h-4 w-4"/>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent><p>View Token Details</p></TooltipContent>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>

        {/* User Access Management */}
        <Card className="shadow-md">
             <CardHeader>
                <CardTitle className="flex items-center gap-2"><UserCheck className="h-5 w-5" /> User Access (dApp Whitelist)</CardTitle>
                <CardDescription>Manage wallet addresses allowed to access and use the dApp.</CardDescription>
            </CardHeader>
             <CardContent>
                 {isLoadingWallets ? ( <Skeleton className="h-40 w-full" /> )
                 : walletsError ? ( <Alert variant="destructive"><AlertCircle className="h-4 w-4"/> <AlertTitle>Error Loading Whitelist</AlertTitle> <AlertDescription>{walletsError.message} <Button variant="ghost" size="sm" onClick={() => refetchWallets()}><RefreshCw className="h-3 w-3 ml-2"/></Button></AlertDescription></Alert> )
                 : (<>
                     <div className="flex items-end space-x-2 mb-6">
                        <div className="flex-grow">
                            <Label htmlFor="addWallet">Add Wallet Address</Label>
                            <Input id="addWallet" placeholder="0x..." value={newWalletAddress} onChange={(e) => setNewWalletAddress(e.target.value)} disabled={isAddingWallet} />
                        </div>
                        <Button onClick={handleAddWallet} disabled={isAddingWallet || !newWalletAddress.match(/^0x[a-fA-F0-9]{40}$/)}>
                             {isAddingWallet ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <PlusCircle className="mr-2 h-4 w-4"/> } Add
                        </Button>
                     </div>
                     <h3 className="text-base font-medium mb-2">Current Whitelisted Wallets ({whitelistedWalletsData?.length || 0})</h3>
                      <div className="max-h-60 overflow-y-auto border rounded-md p-2">
                        {whitelistedWalletsData?.length === 0 ? (<p className="text-sm text-center text-muted-foreground py-4">No wallets whitelisted.</p>)
                         : (<ul className="space-y-1">
                             {(whitelistedWalletsData || []).map(w => (
                                <li key={w} className="text-sm flex justify-between items-center pr-1 hover:bg-muted/50 rounded p-1">
                                    <code className="font-mono text-xs truncate mr-2" title={w}>{w}</code>
                                     <Dialog open={walletToRemove === w} onOpenChange={(open) => !open && setWalletToRemove(null)}>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:text-red-600 flex-shrink-0" onClick={() => setWalletToRemove(w)} disabled={isRemovingWallet && walletToRemove === w}>
                                                 {(isRemovingWallet && walletToRemove === w) ? <Loader2 className="h-3 w-3 animate-spin"/> : <Trash2 className="h-3 w-3"/>}
                                            </Button>
                                        </DialogTrigger>
                                         <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Confirm Removal</DialogTitle>
                                                <DialogDescription>
                                                    Are you sure you want to remove this wallet from the whitelist?
                                                    <code className="block text-xs mt-2 break-all">{w}</code>
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                                                <Button variant="destructive" onClick={handleRemoveWalletConfirm} disabled={isRemovingWallet}>
                                                    {isRemovingWallet && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>} Remove Wallet
                                                </Button>
                                            </DialogFooter>
                                         </DialogContent>
                                    </Dialog>
                                </li>
                            ))}
                         </ul>)}
                      </div>
                    </>
                 )}
            </CardContent>
        </Card>

        {/* Dev helpers (visible only in development) */}
        <DevWalletHelper />

     </div>
    </TooltipProvider>
  );
}