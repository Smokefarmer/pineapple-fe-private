// Custom hooks for tax management operations

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useToken } from '../queries';
import { 
  useReadTaxHandlerGetCurrentTaxRates, 
  useWriteTaxHandlerDecreaseTaxes,
  useWriteTaxHandlerDisableTaxes
} from '@/src/generated';
import { TaxInfo, TaxDecreaseForm } from '../types/tax';
import { toast } from 'sonner';

export interface UseTaxManagementProps {
  tokenId?: string;
  tokenAddress?: string;
  creatorAddress?: string;
  launchTime?: number; // Unix timestamp of when liquidity was added
}

export interface UseTaxManagementReturn {
  taxInfo: TaxInfo | null;
  isLoading: boolean;
  error: string | null;
  decreaseTaxes: (form: TaxDecreaseForm) => Promise<void>;
  disableTaxes: () => Promise<void>;
  isDecreasingTaxes: boolean;
  isDisablingTaxes: boolean;
  refetchTaxInfo: () => void;
}

export const useTaxManagement = ({
  tokenId,
  tokenAddress,
  creatorAddress,
  launchTime
}: UseTaxManagementProps): UseTaxManagementReturn => {
  const { address: userAddress } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  // Update current time on client side to avoid hydration mismatch
  useEffect(() => {
    setCurrentTime(Date.now() / 1000);
    
    // Update time every minute to keep it reasonably current
    const interval = setInterval(() => {
      setCurrentTime(Date.now() / 1000);
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  
  // Fetch token details to get tax configuration
  const { data: tokenData, isLoading: isLoadingToken } = useToken(tokenId || '', {
    enabled: !!tokenId
  });
  
  // ✅ Read current tax rates directly from MasterTaxHandler contract
  const { 
    data: taxRatesData, 
    isLoading: isLoadingTaxRates,
    refetch: refetchTaxRates 
  } = useReadTaxHandlerGetCurrentTaxRates({
    args: tokenAddress ? [tokenAddress as `0x${string}`] : undefined,
    query: {
      enabled: !!tokenAddress,
      refetchInterval: 60000, // Refetch every minute
    }
  });

  // Check if user can decrease taxes (must be creator)
  const canDecrease = userAddress && creatorAddress && 
    userAddress.toLowerCase() === creatorAddress.toLowerCase();

  // Check if user can disable taxes (after all phases complete)
  const totalPhaseDuration = tokenData?.adminDurations 
    ? (tokenData.adminDurations[0] || 0) + (tokenData.adminDurations[1] || 0)
    : 0;
  const canDisable = canDecrease && currentTime && launchTime && totalPhaseDuration > 0 &&
    (currentTime - launchTime) >= totalPhaseDuration;

  // Write operations for decreasing taxes
  const { 
    writeContract: writeDecreaseTaxes,
    data: decreaseTaxesHash,
    isPending: isDecreasingTaxes,
    error: decreaseTaxesError 
  } = useWriteTaxHandlerDecreaseTaxes();

  // Write operations for disabling taxes
  const { 
    writeContract: writeDisableTaxes,
    data: disableTaxesHash,
    isPending: isDisablingTaxes,
    error: disableTaxesError 
  } = useWriteTaxHandlerDisableTaxes();

  // Process tax info from contract
  const taxInfo: TaxInfo | null = taxRatesData ? {
    currentBuyRate: Number(taxRatesData[0]), // buyRate in basis points
    currentSellRate: Number(taxRatesData[1]), // sellRate in basis points
    adminMinimum: Number(taxRatesData[2]), // adminMinimum in basis points
    canDecrease: canDecrease || false,
    canDisable: canDisable || false,
    timeUntilDisable: launchTime && totalPhaseDuration > 0 && currentTime ? 
      Math.max(0, totalPhaseDuration - (currentTime - launchTime)) : 
      undefined
  } : null;

  // Handle errors
  useEffect(() => {
    if (decreaseTaxesError) {
      setError(decreaseTaxesError.message);
      toast.error("Failed to decrease taxes", { 
        description: decreaseTaxesError.message 
      });
    }
    if (disableTaxesError) {
      setError(disableTaxesError.message);
      toast.error("Failed to disable taxes", { 
        description: disableTaxesError.message 
      });
    }
  }, [decreaseTaxesError, disableTaxesError]);

  const decreaseTaxes = async (form: TaxDecreaseForm) => {
    if (!tokenAddress) {
      toast.error("Token address not found");
      return;
    }
    
    try {
      await writeDecreaseTaxes({
        args: [
          tokenAddress as `0x${string}`,
          BigInt(form.newBuyRate * 100), // Convert percentage to basis points
          BigInt(form.newSellRate * 100)
        ]
      });
      toast.success("Tax decrease submitted", {
        description: "Transaction is being processed"
      });
    } catch (err: any) {
      toast.error("Failed to submit transaction", {
        description: err.message
      });
    }
  };

  const disableTaxes = async () => {
    if (!tokenAddress) {
      toast.error("Token address not found");
      return;
    }
    
    try {
      await writeDisableTaxes({
        args: [tokenAddress as `0x${string}`]
      });
      toast.success("Tax disable submitted", {
        description: "Transaction is being processed"
      });
    } catch (err: any) {
      toast.error("Failed to submit transaction", {
        description: err.message
      });
    }
  };

  return {
    taxInfo,
    isLoading: isLoadingTaxRates,
    error,
    decreaseTaxes,
    disableTaxes,
    isDecreasingTaxes,
    isDisablingTaxes,
    refetchTaxInfo: refetchTaxRates
  };
};
