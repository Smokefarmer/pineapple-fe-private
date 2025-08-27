'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { toast } from "sonner";
import { UserPlus, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { useSiwe } from '@/app/components/auth/siwe-provider';
import { useReadSystemContextAcl } from '@/src/generated';
import { useChainId, useWriteContract } from 'wagmi';
import { keccak256, toBytes } from 'viem';

import PineappleAccessControl from '@/abis/PineappleAccessControl';
import { bscTestnet } from 'wagmi/chains';

interface UserManagementProps {
  isSuperAdmin?: boolean;
}

// Backend API URLs
const MAINNET_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TESTNET_API_BASE_URL = process.env.NEXT_PUBLIC_TESTNET_API_BASE_URL;

// Function to get the appropriate API base URL based on the current network
const getApiBaseUrl = (chainId: number) => {
  return chainId === bscTestnet.id ? TESTNET_API_BASE_URL : MAINNET_API_BASE_URL;
};

// Smart contract role constant
const WHITELIST_ADMIN_ROLE = keccak256(toBytes('WHITELIST_ADMIN_ROLE'));

// API response interfaces
interface CreateUserResponse {
  message: string;
  user: {
    walletAddress: string;
    name: string;
    role: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

// API functions for user/admin creation
async function createUserAsAdmin(walletAddress: string, authHeader: Record<string, string>, chainId: number): Promise<CreateUserResponse> {
  const response = await fetch(`${getApiBaseUrl(chainId)}/api/v1/auth/create-user`, {
    method: 'POST',
    headers: {
      ...authHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ walletAddress }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create user');
  }

  return response.json();
}

async function createAdmin(walletAddress: string, authHeader: Record<string, string>, chainId: number): Promise<CreateUserResponse> {
  const response = await fetch(`${getApiBaseUrl(chainId)}/api/v1/auth/create-admin`, {
    method: 'POST',
    headers: {
      ...authHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ walletAddress }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create admin');
  }

  return response.json();
}

function UserDialog({ 
  isOpen, 
  onOpenChange, 
  type, 
  onSubmit, 
  loading,
  isGrantingRole = false
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'user' | 'admin';
  onSubmit: (walletAddress: string) => void;
  loading: boolean;
  isGrantingRole?: boolean;
}) {
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate wallet address format
    if (!walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      setError('Please enter a valid Ethereum address (0x followed by 40 hex characters)');
      return;
    }

    onSubmit(walletAddress);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setWalletAddress('');
      setError('');
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === 'admin' ? (
              <>
                <ShieldCheck className="h-5 w-5" />
                Create New Admin
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5" />
                Create New User
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {type === 'admin' 
              ? 'Add a new admin user to the system. This is a 2-step process: 1) Create user account, 2) Grant WHITELIST_ADMIN_ROLE on smart contract. Only super admins can create new admins.'
              : 'Add a new user to the system. They will be able to create and manage tokens.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="walletAddress">Wallet Address</Label>
            <Input
              id="walletAddress"
              type="text"
              placeholder="0x1234567890abcdef1234567890abcdef12345678"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="mt-1"
              disabled={loading || isGrantingRole}
              pattern="^0x[a-fA-F0-9]{40}$"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter a valid Ethereum wallet address
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={loading || isGrantingRole}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || isGrantingRole || !walletAddress}>
              {(loading || isGrantingRole) ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  {type === 'admin' ? (
                    <>
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Create Admin
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create User
                    </>
                  )}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function UserManagement({ isSuperAdmin = false }: UserManagementProps) {
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getAuthHeader } = useSiwe();
  const chainId = useChainId();
  
  // Get ACL address from SystemContext
  const { data: aclAddress } = useReadSystemContextAcl();
  
  // Smart contract hook for granting admin role
  const { writeContractAsync: writeContract, isPending: isGrantingRole } = useWriteContract();

  const handleCreateUser = async (walletAddress: string) => {
    setLoading(true);
    try {
      const authHeader = getAuthHeader();
      if (!authHeader) {
        throw new Error('Authentication required');
      }

      await createUserAsAdmin(walletAddress, authHeader, chainId);
      toast.success('User Created Successfully', {
        description: `User ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)} has been created.`
      });
      setUserDialogOpen(false);
    } catch (error) {
      toast.error('Failed to Create User', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (walletAddress: string) => {
    setLoading(true);
    try {
      const authHeader = getAuthHeader();
      if (!authHeader) {
        throw new Error('Authentication required');
      }

      if (!aclAddress) {
        throw new Error('ACL address not available. Please try again.');
      }

      // Step 1: Create admin user via API
      toast.info('Creating Admin User...', {
        description: 'Step 1: Creating admin user account'
      });
      
      await createAdmin(walletAddress, authHeader, chainId);
      
      // Step 2: Grant WHITELIST_ADMIN_ROLE via smart contract
      toast.info('Granting Admin Role...', {
        description: 'Step 2: Granting WHITELIST_ADMIN_ROLE on smart contract'
      });
      
      const txHash = await writeContract({
        abi: PineappleAccessControl,
        address: aclAddress,
        functionName: 'grantRole',
        args: [WHITELIST_ADMIN_ROLE, walletAddress as `0x${string}`]
      });
      
      toast.success('Admin Created Successfully', {
        description: `Admin ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)} created and role granted. TX: ${txHash.substring(0, 10)}...`
      });
      setAdminDialogOpen(false);
    } catch (error) {
      toast.error('Failed to Create Admin', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Add User Button */}
      <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        </DialogTrigger>
      </Dialog>

      {/* Add Admin Button - Only visible to super admin */}
      {isSuperAdmin && (
        <Dialog open={adminDialogOpen} onOpenChange={setAdminDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <ShieldCheck className="h-4 w-4" />
              Add Admin
            </Button>
          </DialogTrigger>
        </Dialog>
      )}

      {/* User Creation Dialog */}
      <UserDialog
        isOpen={userDialogOpen}
        onOpenChange={setUserDialogOpen}
        type="user"
        onSubmit={handleCreateUser}
        loading={loading}
        isGrantingRole={false}
      />

      {/* Admin Creation Dialog */}
      <UserDialog
        isOpen={adminDialogOpen}
        onOpenChange={setAdminDialogOpen}
        type="admin"
        onSubmit={handleCreateAdmin}
        loading={loading}
        isGrantingRole={isGrantingRole}
      />
    </div>
  );
}
