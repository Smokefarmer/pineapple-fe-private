// Custom hooks for tax management operations

import { useState, useEffect, useCallback } from 'react';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { 
  useReadTaxHandlerGetCurrentTaxRates, 
  useWriteTaxHandlerDecreaseTaxes,
  useWriteTaxHandlerDisableTaxes
} from '@/src/generated';
import { TaxInfo, TaxDecreaseForm, convertPercentageToBasisPoints } from '../types/tax';
import { toast } from 'sonner';

export interface UseTaxManagementProps {
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
  
  // Read current tax rates
  const {
    data: taxRatesData,
    isLoading: isLoadingTaxRates,
    error: taxRatesError,
    refetch: refetchTaxRates
  } = useReadTaxHandlerGetCurrentTaxRates({
    args: tokenAddress ? [tokenAddress as `0x${string}`] : undefined,
    query: {
      enabled: !!tokenAddress,
    }
  });

  // Write operations
  const {
    writeContract: writeDecreaseTaxes,
    data: decreaseTaxesHash,
    isPending: isDecreasingTaxes,
    error: decreaseTaxesError
  } = useWriteTaxHandlerDecreaseTaxes();

  const {
    writeContract: writeDisableTaxes,
    data: disableTaxesHash,
    isPending: isDisablingTaxes,
    error: disableTaxesError
  } = useWriteTaxHandlerDisableTaxes();

  // Wait for transaction receipts
  const { isLoading: isConfirmingDecrease } = useWaitForTransactionReceipt({
    hash: decreaseTaxesHash,
  });

  const { isLoading: isConfirmingDisable } = useWaitForTransactionReceipt({
    hash: disableTaxesHash,
  });

  // Process tax info
  const taxInfo: TaxInfo | null = taxRatesData && currentTime ? {
    currentBuyRate: Number(taxRatesData[0]),
    currentSellRate: Number(taxRatesData[1]),
    adminMinimum: Number(taxRatesData[2]),
    canDecrease: userAddress === creatorAddress && !!tokenAddress,
    canDisable: userAddress === creatorAddress && 
                !!launchTime && 
                (currentTime - launchTime) >= (30 * 24 * 60 * 60), // 30 days
    timeUntilDisable: launchTime ? 
      Math.max(0, (30 * 24 * 60 * 60) - (currentTime - launchTime)) : 
      undefined
  } : null;

  // Handle errors
  useEffect(() => {
    if (taxRatesError) {
      setError('Failed to load tax information');
    } else if (decreaseTaxesError) {
      setError('Failed to decrease taxes: ' + decreaseTaxesError.message);
      toast.error('Failed to decrease taxes', {
        description: decreaseTaxesError.message
      });
    } else if (disableTaxesError) {
      setError('Failed to disable taxes: ' + disableTaxesError.message);
      toast.error('Failed to disable taxes', {
        description: disableTaxesError.message
      });
    } else {
      setError(null);
    }
  }, [taxRatesError, decreaseTaxesError, disableTaxesError]);

  // Memoize refetch function to prevent infinite re-renders
  const memoizedRefetch = useCallback(() => {
    refetchTaxRates();
  }, [refetchTaxRates]);

  // Success notifications
  useEffect(() => {
    if (decreaseTaxesHash && !isConfirmingDecrease) {
      toast.success('Taxes decreased successfully!');
      memoizedRefetch();
    }
  }, [decreaseTaxesHash, isConfirmingDecrease, memoizedRefetch]);

  useEffect(() => {
    if (disableTaxesHash && !isConfirmingDisable) {
      toast.success('Taxes disabled successfully!');
      memoizedRefetch();
    }
  }, [disableTaxesHash, isConfirmingDisable, memoizedRefetch]);

  const decreaseTaxes = async (form: TaxDecreaseForm) => {
    if (!tokenAddress) {
      throw new Error('Token address is required');
    }

    if (!taxInfo?.canDecrease) {
      throw new Error('You are not authorized to decrease taxes for this token');
    }

    try {
      const newBuyRateBps = convertPercentageToBasisPoints(form.newBuyRate);
      const newSellRateBps = convertPercentageToBasisPoints(form.newSellRate);

      await writeDecreaseTaxes({
        args: [
          tokenAddress as `0x${string}`,
          BigInt(newBuyRateBps),
          BigInt(newSellRateBps)
        ]
      });
    } catch (error) {
      console.error('Error decreasing taxes:', error);
      throw error;
    }
  };

  const disableTaxes = async () => {
    if (!tokenAddress) {
      throw new Error('Token address is required');
    }

    if (!taxInfo?.canDisable) {
      throw new Error('Taxes cannot be disabled yet. Wait 30 days after launch.');
    }

    try {
      await writeDisableTaxes({
        args: [tokenAddress as `0x${string}`]
      });
    } catch (error) {
      console.error('Error disabling taxes:', error);
      throw error;
    }
  };

  return {
    taxInfo,
    isLoading: isLoadingTaxRates || isConfirmingDecrease || isConfirmingDisable,
    error,
    decreaseTaxes,
    disableTaxes,
    isDecreasingTaxes: isDecreasingTaxes || isConfirmingDecrease,
    isDisablingTaxes: isDisablingTaxes || isConfirmingDisable,
    refetchTaxInfo: memoizedRefetch
  };
};
