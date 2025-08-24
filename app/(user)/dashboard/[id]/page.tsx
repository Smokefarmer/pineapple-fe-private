'use client';

import { useAccount, useChainId, useWaitForTransactionReceipt, usePublicClient } from 'wagmi';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, useMemo } from 'react';
import { useWriteRouterDeployToken, useReadRouterGetToken, useWriteRouterAddLiquiditySigned, routerAddress, useReadErc20Allowance, useWriteErc20Approve } from '@/src/generated';
// Import query functions
import { useToken, useTokenDeploySignature, useTokenLiquiditySignature, useCreateToken, Token } from '@/app/lib/queries';
// Corrected component imports
import { Button } from "@/app/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Separator } from "@/app/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
// Sonner toast function
import { toast } from "sonner";
import { CheckCircle2, Info, Loader2, XCircle, Settings, Rocket, HelpCircle, Coins, CopyIcon, RefreshCw } from "lucide-react";
import { parseEther } from 'viem'; // Import parseEther and getContract from viem
import TaxManagement from '@/app/components/tax/TaxManagement';

// --- Placeholder Types ---
interface ProjectDetails {
  name: string; // Token name
  ticker: string; // Token symbol
  supply: string; // Total supply
  liquidity: string; // Represents BNB amount
  flatBuyTax: string; // Flat buy tax percentage
  flatSellTax: string; // Flat sell tax percentage
  startBuyTax: string; // Initial buy tax percentage
  startSellTax: string; // Initial sell tax percentage
  taxWallet1: string; // BEP-20 Address (tax recipient)
  taxWallet2: string; // Optional BEP-20 Address
  metadataURI: string; // Token metadata URI
  whitelistDuration: string; // Whitelist only duration in seconds
  isContractDeployed: boolean;
  liquidityAdded: boolean;
  erc20Address?: string; // BEP-20 Address
  isTokenApproved: boolean;
  isLiquidityApproved: boolean; // Add field
  originalToken?: Token; // Keep the original token data for reference
  creator?: string; // Creator address
  // Admin configuration fields are now handled in admin approval process
}
// --- End Placeholder Types ---


// Map Token to ProjectDetails for UI compatibility
function mapTokenToProjectDetails(tokenData: Token | undefined): ProjectDetails | undefined {
    if (!tokenData) return undefined;
    

    
    return {
        name: tokenData.name,
        ticker: tokenData.symbol,
        supply: tokenData.totalSupply,
        liquidity: tokenData.liquidityBackingETH,
        flatBuyTax: `${tokenData.flatBuyTax / 100}`, // Convert from basis points to percentage
        flatSellTax: `${tokenData.flatSellTax / 100}`, // Convert from basis points to percentage
        startBuyTax: `${tokenData.startBuyTax / 100}`, // Convert from basis points to percentage
        startSellTax: `${tokenData.startSellTax / 100}`, // Convert from basis points to percentage
        taxWallet1: tokenData.taxRecipient,
        taxWallet2: tokenData.taxRecipient2 || '',
        metadataURI: tokenData.metaDataURI || '',
        whitelistDuration: `${tokenData.whitelistOnlyDuration}`,
        isContractDeployed: !!tokenData.isOnChain,
        liquidityAdded: !!tokenData.liquidityAdded,
        erc20Address: tokenData.erc20Address,
        isTokenApproved: !!tokenData.isTokenApproved,
        isLiquidityApproved: !!tokenData.isLiquidityApproved, // Map field
        originalToken: tokenData, // Keep the original token data for reference
        creator: tokenData.creator, // Map creator address
        // Admin configuration fields are handled in admin approval process
    };
}






export default function UserDashboardPage() {
  const chainId = useChainId();
  const { id: tokenId } = useParams<{ id: string }>();
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const queryClient = useQueryClient();
  
  // Check if this is a new token creation (token IDs starting with 'new-')
  const isNewTokenCreation = tokenId?.startsWith('new-');

  // Form state initialized with default values to avoid controlled/uncontrolled input warnings
  const [formData, setFormData] = useState<Partial<ProjectDetails>>({
    name: '',
    ticker: '',
    supply: '',
    liquidity: '',
    flatBuyTax: '',
    flatSellTax: '',
    startBuyTax: '',
    startSellTax: '',
    taxWallet1: '',
    taxWallet2: '',
    metadataURI: '',
    whitelistDuration: '0'
  });
  const [imageFile, setImageFile] = useState<File | null>(null); // Add state for image file
  // Hydration guard to ensure consistent server/client markup
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  // Create token mutation
  const { mutate: createToken, isPending: isCreatingToken } = useCreateToken();
  
  // --- Queries ---
  // Only fetch token data if it's not a new token creation
  const { data: tokenData, isLoading, isError, error, refetch: refetchToken } = useToken(tokenId, {enabled: !!tokenId && !isNewTokenCreation});
  
  // Map fetched token data to project details for the UI
  const details = useMemo(() => mapTokenToProjectDetails(tokenData), [tokenData]);

  // Determine if configuration is disabled based on token state
  const isConfigurationDisabled = useMemo(() => 
    !isNewTokenCreation,
    [isNewTokenCreation]
  );

  // --- Signatures for Contract Interaction ---
  // Get deploy signature only when manually requested
  const {  refetch: fetchDeploySignature, failureReason } = useTokenDeploySignature(tokenId, {
    enabled: false // Disabled by default, will be fetched manually
  });
  
  console.log({failureReason})
  // Get liquidity signature only when manually requested
  const {  refetch: fetchLiquiditySignature } = useTokenLiquiditySignature(tokenId, {
    enabled: false // Disabled by default, will be fetched manually
  });
  
  // Wagmi hooks for contract interactions
  const { writeContractAsync: approveToken} = useWriteErc20Approve();
 
  const { writeContractAsync: deployToken, isPending: isDeployingContract, error: deployError } = useWriteRouterDeployToken();
  const { writeContractAsync: addLiquidity, isPending: isCreatingLiquidity, error: lpError } = useWriteRouterAddLiquiditySigned();
  const { refetch: getTokenAllowance } = useReadErc20Allowance({
    args: [
      address?.toLowerCase() as `0x${string}`,
      routerAddress[chainId as keyof typeof routerAddress] as `0x${string}`,
    ],
    address: details?.erc20Address as `0x${string}`,
  });
  
  // State for transaction hashes - MUST be declared before useWaitForTransactionReceipt
  const [deployTxHash, setDeployTxHash] = useState<`0x${string}` | undefined>();
  const [lpTxHash, setLpTxHash] = useState<`0x${string}` | undefined>();

  // Wait for deploy transaction
  const { isLoading: isConfirmingDeploy, isSuccess: isDeployConfirmed, error: deployConfirmError } = 
    useWaitForTransactionReceipt({ 
      hash: deployTxHash, 
    });

  // Wait for LP transaction
  const { isLoading: isConfirmingLp, isSuccess: isLpConfirmed, isError: isLpConfirmError, error: lpConfirmError } = 
    useWaitForTransactionReceipt({ 
      hash: lpTxHash, 
    });

  // Refetch token data when LP is confirmed
  useEffect(() => {
    if (isLpConfirmed && tokenId && !isNewTokenCreation) {
      toast.success("Liquidity Pool Created", { id: "lp-toast", description: "Liquidity successfully added to PancakeSwap." });
      queryClient.invalidateQueries({ queryKey: ['token', tokenId] });
      setLpTxHash(undefined); // Reset hash after confirmation
    }
    if (isLpConfirmError && lpConfirmError) {
        toast.error("LP Confirmation Failed", { id: "lp-toast", description: lpConfirmError.message });
        setLpTxHash(undefined); // Reset hash after error
    }
  }, [isLpConfirmed, isLpConfirmError, lpConfirmError, tokenId, queryClient, isNewTokenCreation]);

  // Check if the token has been deployed by querying the contract
  const { data: tokenAddress, refetch: refetchTokenAddress } = useReadRouterGetToken({
    args: details?.originalToken ? [details.originalToken.guid as `0x${string}`] : undefined,
    query: {
      enabled: !!details?.originalToken && !isNewTokenCreation, // Only run if we have a token and it's not a new creation flow
    }
  })

   // Effect to synchronize form state with fetched data
   useEffect(() => {
    if (details && !isNewTokenCreation) {
        // Create a subset for setFormData to avoid including originalToken
        const formDataUpdate = {
            name: details.name || '',
            ticker: details.ticker || '',
            supply: details.supply || '',
            liquidity: details.liquidity || '',
            flatBuyTax: details.flatBuyTax || '',
            flatSellTax: details.flatSellTax || '',
            startBuyTax: details.startBuyTax || '',
            startSellTax: details.startSellTax || '',
            taxWallet1: details.taxWallet1 || '',
            taxWallet2: details.taxWallet2 || '',
            metadataURI: details.metadataURI || '',
            whitelistDuration: details.whitelistDuration || '0'
        };
        setFormData(formDataUpdate);
    }
    // Don't reset form for new token creation as it should keep default empty values
  }, [details, isNewTokenCreation]); // Re-run effect when projectData changes (now memoized)
  
  // Effect to handle successful deployment
  useEffect(() => {
    if (isDeployConfirmed) {
      toast.success("Token Deployed", { 
        description: "Your token has been successfully deployed to the blockchain." 
      });
      // Refetch token data to update UI
      queryClient.invalidateQueries({ queryKey: ['token', tokenId] });
      // Refetch token address from the contract
      refetchTokenAddress();
    }
  }, [isDeployConfirmed, tokenId, queryClient, refetchTokenAddress]);
  
  // Effect to handle successful LP creation
  useEffect(() => {
    if (isLpConfirmed) {
      toast.success("Liquidity Added", { 
        description: "Liquidity has been successfully added to your token." 
      });
      // Refetch token data to update UI
      queryClient.invalidateQueries({ queryKey: ['token', tokenId] });
    }
  }, [isLpConfirmed, tokenId, queryClient]);
  
  // Effect to update token address if found from contract
  useEffect(() => {
    if (tokenAddress && tokenAddress !== '0x0000000000000000000000000000000000000000' && details?.originalToken) {
      // If we have a valid token address from the contract but it's not in our backend yet,
      // we could update it in the backend here or just update the UI
      console.log("Token address from contract:", tokenAddress);
    }
  }, [tokenAddress, details]);


  // --- Mutations with Sonner ---
  // Handle token creation submission
  const handleCreateTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address) {
      toast.error("Authentication Error", { description: "Please connect your wallet." });
      return;
    }

    // --- Enhanced Form Validation ---
    const errors: string[] = [];

    // Basic existence checks
    if (!formData.name) errors.push("Token Name is required.");
    if (!formData.ticker) errors.push("Token Ticker is required.");
    if (!formData.supply) errors.push("Total Supply is required.");
    if (!formData.liquidity) errors.push("Initial Liquidity (BNB) is required.");
    if (!formData.flatBuyTax) errors.push("Flat Buy Tax is required.");
    if (!formData.flatSellTax) errors.push("Flat Sell Tax is required.");
    if (!formData.startBuyTax) errors.push("Start Buy Tax is required.");
    if (!formData.startSellTax) errors.push("Start Sell Tax is required.");
    if (!formData.taxWallet1) errors.push("Primary Tax Wallet is required.");
    
    // Validate second wallet if provided
    if (formData.taxWallet2 && !/^0x[a-fA-F0-9]{40}$/.test(formData.taxWallet2)) {
        errors.push("Secondary Tax Wallet must be a valid BEP-20 address if provided.");
    }
    if (!formData.whitelistDuration) errors.push("Whitelist Duration is required.");
    if (!imageFile) errors.push("Token Image is required.");

    // Value range checks (convert string inputs to numbers for comparison)
    const flatBuyTaxNum = parseFloat(formData.flatBuyTax || '0');
    const flatSellTaxNum = parseFloat(formData.flatSellTax || '0');
    const startBuyTaxNum = parseFloat(formData.startBuyTax || '0');
    const startSellTaxNum = parseFloat(formData.startSellTax || '0');
    const liquidityNum = parseFloat(formData.liquidity || '0');
    const whitelistDurationNum = parseInt(formData.whitelistDuration || '-1', 10);

    if (formData.flatBuyTax && (flatBuyTaxNum < 4 || flatBuyTaxNum > 7)) errors.push("Flat Buy Tax must be between 4% and 7%.");
    if (formData.flatSellTax && (flatSellTaxNum < 4 || flatSellTaxNum > 7)) errors.push("Flat Sell Tax must be between 4% and 7%.");
    if (formData.startBuyTax && (startBuyTaxNum < 4 || startBuyTaxNum > 20)) errors.push("Start Buy Tax must be between 4% and 20%.");
    if (formData.startSellTax && (startSellTaxNum < 4 || startSellTaxNum > 20)) errors.push("Start Sell Tax must be between 4% and 20%.");
    if (formData.liquidity && liquidityNum <= 0) errors.push("Initial Liquidity (BNB) must be greater than 0.");
    if (formData.whitelistDuration && (whitelistDurationNum < 0 || whitelistDurationNum > 180)) errors.push("Whitelist Duration must be between 0 and 180 seconds.");
        
    // Add more specific checks if needed (e.g., supply format, address format)

    if (errors.length > 0) {
      toast.error("Form Validation Error", {
        description: (
          <ul className="list-disc pl-5">
            {errors.map((error, index) => <li key={index}>{error}</li>)}
          </ul>
        ),
      });
      return;
    }
    // --- End Validation ---

    const submissionData = new FormData();
    // Append text data (convert percentages back to basis points)
    submissionData.append('name', formData.name || '');
    submissionData.append('symbol', formData.ticker || '');
    submissionData.append('totalSupply', formData.supply || '0');
    submissionData.append('flatBuyTax', String(flatBuyTaxNum * 100)); // Convert % back to basis points
    submissionData.append('flatSellTax', String(flatSellTaxNum * 100)); // Convert % back to basis points
    submissionData.append('startBuyTax', String(startBuyTaxNum * 100)); // Convert % back to basis points
    submissionData.append('startSellTax', String(startSellTaxNum * 100)); // Convert % back to basis points
    submissionData.append('liquidityBackingETH', formData.liquidity || '0');
    submissionData.append('whitelistOnlyDuration', String(whitelistDurationNum)); // Use validated number
    submissionData.append('taxRecipient', formData.taxWallet1 || '');
    submissionData.append('taxRecipient2', formData.taxWallet2 || '');
    submissionData.append('creator', address || ''); // Add creator address
    // Append file data
    if (imageFile) {
      submissionData.append('image', imageFile);
    }
    
    // Log data before sending
    console.log('Submitting token creation data:', Object.fromEntries(submissionData.entries()));
    

    // Call the mutation
    createToken(submissionData, {
      onSuccess: (data) => {
        toast.success("Token Created", { description: "Your token has been created and is awaiting admin approval." });
        // Redirect to the new token page
        if (data && data.guid) {
          window.location.href = `/dashboard/${data.guid}`;
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Allow any for flexible API error handling
      onError: (error: any) => { 
        const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";
        toast.error("Token Creation Error", { description: errorMessage });
      }
    });
  };
  

  // --- Event Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    } else {
      setImageFile(null);
    }
  };

   const handleDeploy = async () => {
    // TODO: Implement a confirmation Dialog from shadcn/ui before proceeding
    if (!details?.isTokenApproved || !details?.originalToken?.guid) {
      toast.warning("Configuration Issue", { description: "Please ensure token is approved before deploying." });
      return;
    }
  
    try {
      // First fetch the deploy signature
      toast.info("Fetching signature", { description: "Getting deployment signature..." });
      const signatureResult = await fetchDeploySignature();
      const signature = signatureResult.data?.signature;
    
      if (!signature) {
        toast.error("Missing Signature", { description: "Could not get deployment signature. Please try again." });
        return;
      }
    
      // Now proceed with deployment
      const backendMessage = signatureResult.data?.message;
      console.log("=== BACKEND MESSAGE ANALYSIS ===");
      console.log("Full backend message received:", backendMessage);
      console.log("Admin phase fields in backend message:");
      console.log("- adminPhaseARateBps:", backendMessage?.adminPhaseARateBps);
      console.log("- adminPhaseBRateBps:", backendMessage?.adminPhaseBRateBps);
      console.log("- adminPhaseCRateBps:", backendMessage?.adminPhaseCRateBps);
      console.log("- adminPhaseADuration:", backendMessage?.adminPhaseADuration);
      console.log("- adminPhaseBDuration:", backendMessage?.adminPhaseBDuration);
      console.log("- adminPhaseCDuration:", backendMessage?.adminPhaseCDuration);
      console.log("Signature received:", signatureResult.data?.signature);
      console.log("=== END BACKEND MESSAGE ANALYSIS ===");
      const tokenArgs = [
        backendMessage.guid,
        backendMessage.name,
        backendMessage.symbol,
        BigInt(backendMessage.totalSupply), // totalSupply (uint256 -> BigInt)
        backendMessage.creator, // creator (address)
        backendMessage.taxRecipient, // taxRecipient (address)
        backendMessage.flatBuyTax, // flatBuyTax (uint256 but as number like in working script)
        backendMessage.flatSellTax, // flatSellTax (uint256 but as number like in working script)
        backendMessage.startBuyTax, // startBuyTax (uint256 but as number like in working script)
        backendMessage.startSellTax, // startSellTax (uint256 but as number like in working script)
        backendMessage.metaDataURI, // metaDataURI (string)
        BigInt(backendMessage.liquidityBackingETH), // liquidityBackingETH (uint256 -> BigInt)
        backendMessage.liquidityTokenPercent, // liquidityTokenPercent (uint256 but as number like in working script)
        backendMessage.whitelistOnlyDuration, // whitelistOnlyDuration (uint256 but as number like in working script)
        // Try both individual fields and array formats for admin data
        backendMessage.adminRatesBps || [backendMessage.adminPhaseARateBps || 0, backendMessage.adminPhaseBRateBps || 0, backendMessage.adminPhaseCRateBps || 0], // adminRatesBps (uint32[3])
        backendMessage.adminDurations || [backendMessage.adminPhaseADuration || 0, backendMessage.adminPhaseBDuration || 0, backendMessage.adminPhaseCDuration || 0], // adminDurations (uint32[3])
        signature, // signature (bytes)
      ] as const;
      console.log("Token deployment arguments (matching working script format):", {
        tokenArgs,
        formattedArgs: {
          guid: tokenArgs[0],
          name: tokenArgs[1],
          symbol: tokenArgs[2],
          totalSupply: tokenArgs[3].toString(),
          creator: tokenArgs[4],
          taxRecipient: tokenArgs[5],
          flatBuyTax: tokenArgs[6], // number (not BigInt)
          flatSellTax: tokenArgs[7], // number (not BigInt)
          startBuyTax: tokenArgs[8], // number (not BigInt)
          startSellTax: tokenArgs[9], // number (not BigInt)
          metaDataURI: tokenArgs[10],
          liquidityBackingETH: tokenArgs[11].toString(),
          liquidityTokenPercent: tokenArgs[12], // number (not BigInt)
          whitelistOnlyDuration: tokenArgs[13], // number (not BigInt)
          adminRatesBps: tokenArgs[14],
          adminDurations: tokenArgs[15],
          signature: tokenArgs[16]
        }
      });

      // Validate parameters against working script constraints
      console.log("=== PARAMETER VALIDATION ===");
      console.log("Checking parameters against working script constraints...");
      
      const validationIssues = [];
      
      // Check tax rates (should be between 4% and 20% as basis points)
      if (tokenArgs[6] < 400 || tokenArgs[6] > 2000) validationIssues.push(`flatBuyTax ${tokenArgs[6]} not in range 400-2000`);
      if (tokenArgs[7] < 400 || tokenArgs[7] > 2000) validationIssues.push(`flatSellTax ${tokenArgs[7]} not in range 400-2000`);
      if (tokenArgs[8] < 400 || tokenArgs[8] > 2000) validationIssues.push(`startBuyTax ${tokenArgs[8]} not in range 400-2000`);
      if (tokenArgs[9] < 400 || tokenArgs[9] > 2000) validationIssues.push(`startSellTax ${tokenArgs[9]} not in range 400-2000`);
      
      // Check admin rates (should be reasonable basis points)
      const adminRates = tokenArgs[14] as number[];
      if (adminRates[0] < 0 || adminRates[0] > 5000) validationIssues.push(`adminRateA ${adminRates[0]} not in range 0-5000`);
      if (adminRates[1] < 0 || adminRates[1] > 5000) validationIssues.push(`adminRateB ${adminRates[1]} not in range 0-5000`);
      if (adminRates[2] < 0 || adminRates[2] > 5000) validationIssues.push(`adminRateC ${adminRates[2]} not in range 0-5000`);
      
      // Check admin durations (should be reasonable)
      const adminDurations = tokenArgs[15] as number[];
      if (adminDurations[0] < 0) validationIssues.push(`adminDurationA ${adminDurations[0]} is negative`);
      if (adminDurations[1] < 0) validationIssues.push(`adminDurationB ${adminDurations[1]} is negative`);
      if (adminDurations[2] !== 0) validationIssues.push(`adminDurationC ${adminDurations[2]} should be 0 (infinite)`);
      
      // Check liquidity token percent (should be reasonable)
      if (tokenArgs[12] < 1000 || tokenArgs[12] > 9000) validationIssues.push(`liquidityTokenPercent ${tokenArgs[12]} not in range 1000-9000 (10%-90%)`);
      
      // Check addresses
      if (!tokenArgs[4] || !tokenArgs[4].startsWith('0x')) validationIssues.push(`creator address ${tokenArgs[4]} invalid`);
      if (!tokenArgs[5] || !tokenArgs[5].startsWith('0x')) validationIssues.push(`taxRecipient address ${tokenArgs[5]} invalid`);
      
      if (validationIssues.length > 0) {
        console.error("=== PARAMETER VALIDATION FAILED ===");
        validationIssues.forEach(issue => console.error(`❌ ${issue}`));
      } else {
        console.log("✅ All parameters pass validation checks");
      }
      console.log("=== END PARAMETER VALIDATION ===");

      // Try to simulate the contract call to catch revert reasons before sending
      if (publicClient) {
        try {
          console.log("Simulating contract call to check for revert reasons...");
          // Import the router ABI from generated file
          const { routerAbi } = await import('@/src/generated');
          
          // Try to simulate the contract call
          const simulationResult = await publicClient.simulateContract({
            address: routerAddress[chainId as keyof typeof routerAddress] as `0x${string}`,
            abi: routerAbi,
            functionName: 'deployToken',
            args: tokenArgs,
            account: address
          });
          
          console.log("Contract simulation successful:", simulationResult);
          
          // Also try gas estimation
          const gasEstimate = await publicClient.estimateContractGas({
            address: routerAddress[chainId as keyof typeof routerAddress] as `0x${string}`,
            abi: routerAbi,
            functionName: 'deployToken',
            args: tokenArgs,
            account: address
          });
          console.log("Gas estimate successful:", gasEstimate.toString());
          
        } catch (simulationError) {
          console.error("=== CONTRACT SIMULATION FAILED ===");
          console.error("This is why the transaction would revert:");
          console.error("Full simulation error:", simulationError);
          
          if (simulationError instanceof Error) {
            const errorObj = simulationError as Error & { 
              cause?: { reason?: string; shortMessage?: string; message?: string; [key: string]: unknown }; 
              shortMessage?: string; 
              details?: unknown; 
              data?: { message?: string; [key: string]: unknown }; 
              code?: string;
              reason?: string;
              metaMessages?: unknown;
            };
            console.error("Simulation error details:", {
              name: errorObj.name,
              message: errorObj.message,
              cause: errorObj.cause,
              shortMessage: errorObj.shortMessage,
              details: errorObj.details,
              data: errorObj.data,
              code: errorObj.code,
              reason: errorObj.reason,
              metaMessages: errorObj.metaMessages
            });
            
            // Extract revert reason
            let revertReason = "";
            if (errorObj.shortMessage) {
              revertReason = errorObj.shortMessage;
            } else if (errorObj.details) {
              revertReason = String(errorObj.details);
            } else if (errorObj.reason) {
              revertReason = errorObj.reason;
            } else if (errorObj.data?.message) {
              revertReason = errorObj.data.message;
            } else if (errorObj.cause?.reason) {
              revertReason = errorObj.cause.reason;
            } else if (errorObj.cause?.shortMessage) {
              revertReason = errorObj.cause.shortMessage;
            }
            
            console.error("Extracted revert reason:", revertReason);
            
            toast.error("Contract Simulation Failed", { 
              id: "deploy-toast", 
              description: revertReason || simulationError.message,
              duration: 15000
            });
            return; // Don't proceed with the actual transaction
          }
        }
      }

      console.log("Sending deployment transaction...");
      const hash = await deployToken({
        args: tokenArgs
      });
      setDeployTxHash(hash);
      console.log('Deploy transaction sent successfully:', {
        hash,
        chainId,
        timestamp: new Date().toISOString()
      });

    } catch (err: unknown) {
      console.error("=== DEPLOYMENT ERROR DETAILS ===");
      console.error("Full error object:", err);
      console.error("Error type:", typeof err);
      console.error("Error constructor:", err?.constructor?.name);
      
      let errorMessage = "An unknown error occurred.";
      let detailedError = "";
      
      if (err instanceof Error) {
        console.error("Error message:", err.message);
        console.error("Error stack:", err.stack);
        
        // Check for various error properties that might contain revert reasons
        const errorObj = err as Error & { 
          cause?: { reason?: string; shortMessage?: string; message?: string; [key: string]: unknown }; 
          shortMessage?: string; 
          details?: unknown; 
          data?: { message?: string; [key: string]: unknown }; 
          reason?: string;
          code?: string;
          metaMessages?: unknown;
        };
        console.error("Error properties:", {
          name: errorObj.name,
          message: errorObj.message,
          cause: errorObj.cause,
          shortMessage: errorObj.shortMessage,
          details: errorObj.details,
          metaMessages: errorObj.metaMessages,
          data: errorObj.data,
          code: errorObj.code,
          reason: errorObj.reason
        });

        // Try to extract revert reason from different possible locations
        let revertReason = "";
        
        // Check for Wagmi/Viem specific error formats
        if (errorObj.shortMessage) {
          revertReason = errorObj.shortMessage;
        } else if (errorObj.details) {
          revertReason = String(errorObj.details);
        } else if (errorObj.reason) {
          revertReason = errorObj.reason;
        } else if (errorObj.data?.message) {
          revertReason = errorObj.data.message;
        } else if (errorObj.cause?.reason) {
          revertReason = errorObj.cause.reason;
        } else if (errorObj.cause?.message) {
          revertReason = errorObj.cause.message;
        }

        // Check if the error message contains common revert patterns
        const message = err.message.toLowerCase();
        if (message.includes('user rejected') || message.includes('user denied')) {
          errorMessage = "Transaction was rejected by user";
        } else if (message.includes('insufficient funds')) {
          errorMessage = "Insufficient funds for gas fees";
        } else if (message.includes('gas')) {
          errorMessage = "Gas estimation failed - transaction would revert";
        } else if (revertReason) {
          errorMessage = `Contract reverted: ${revertReason}`;
        } else {
          errorMessage = err.message;
        }

        detailedError = `
Error Type: ${errorObj.name || 'Unknown'}
Message: ${err.message}
Revert Reason: ${revertReason || 'None found'}
Chain ID: ${chainId}
Token GUID: ${details?.originalToken?.guid || 'Unknown'}
Timestamp: ${new Date().toISOString()}
        `.trim();
      }
      
      console.error("=== FORMATTED ERROR MESSAGE ===");
      console.error(errorMessage);
      console.error("=== DETAILED ERROR INFO ===");
      console.error(detailedError);
      console.error("=== END ERROR DETAILS ===");
      
      toast.error("Deployment Failed", { 
        id: "deploy-toast", 
        description: errorMessage,
        duration: 10000 // Show error longer for user to read
      });
    }
  }

  const handleCreateLP = async () => {
  if (!publicClient) {
    toast.error("Client Error", { description: "Blockchain client not available. Please refresh and try again." });
    return;
  }
    // Validate required data for LP creation
    if (!details?.isContractDeployed) {
      toast.warning("Cannot Create LP", { description: "Contract must be deployed first." });
      return;
    }
    if (!details?.isTokenApproved) {
      toast.warning("Cannot Create LP", { description: "Token must be approved by admin first." });
      return;
    }
    if (!details?.isLiquidityApproved) {
      toast.warning("Cannot Create LP", { description: "Liquidity parameters must be approved by admin first." });
      return;
    }
    if (details?.liquidityAdded) {
      toast.info("LP Already Exists", { description: "Liquidity pool has already been created." });
      return;
    }
    // Ensure originalToken and necessary fields exist
    if (!details?.originalToken?.guid || !details?.originalToken?.liquidityBackingETH || !details?.erc20Address) {
      toast.error("Missing Data", { description: "Token details are incomplete for LP creation." });
      return;
    }

    try {
      // First fetch the liquidity signature
      toast.info("Fetching signature", { id: "lp-toast", description: "Getting liquidity signature..." });
      const signatureResult = await fetchLiquiditySignature();
      const signature = signatureResult.data?.signature;

      if (!signature) {
        toast.error("Missing Signature Data", { id: "lp-toast", description: "Could not get liquidity signature. Please try again." });
        return;
      }
      


      const liquidityTokenPercent = BigInt(
        details.originalToken.liquidityTokenPercent!
      ); // e.g. 5000 = 50%
      // Calculate raw token amount first
      const rawLiquidityTokenAmount =
        (BigInt(details.originalToken.totalSupply) * liquidityTokenPercent) / 10000n;
      
      // Adjust for 18 decimal places (multiply by 10^18)
      const liquidityTokenAmount = rawLiquidityTokenAmount * 10n ** 18n;

      // Define router address from your constants
      // Type assertion to handle the index signature issue
      const ROUTER_ADDRESS = routerAddress[chainId as keyof typeof routerAddress] as `0x${string}`;

      const totalEth = parseEther(signatureResult.data?.message?.totalETH);
      // Check current allowance
      toast.info("Checking allowance", { id: "lp-toast", description: "Checking token allowance for router..." });
      const currentAllowance = (await getTokenAllowance())?.data // Default to 0n if undefined
      console.log({details, currentAllowance, liquidityTokenAmount});
      if ( currentAllowance! < liquidityTokenAmount ) {
        console.log("Approving tokens");
        toast.info("Approving tokens", { id: "lp-toast", description: "Approving token transfer for liquidity..." });

        const approvalResult = await approveToken({
          args: [
            ROUTER_ADDRESS!,
            liquidityTokenAmount
          ],
          address:  details?.erc20Address as `0x${string}`
        });

        toast.loading("Waiting for approval", { id: "lp-toast", description: "Waiting for approval transaction to be confirmed on-chain..." });
        
        // Wait for the approval transaction to be confirmed
        try {
          const approvalReceipt = await publicClient.waitForTransactionReceipt({
            hash: approvalResult,
          });
          console.log("Approval confirmed:", approvalReceipt);
          toast.success("Tokens approved", { id: "lp-toast", description: "Router approved for token transfer" });
        } catch (waitError) {
          console.error("Error waiting for approval confirmation:", waitError);
          toast.error("Approval Failed", { id: "lp-toast", description: "Failed to confirm token approval. Please try again." });
          return; // Exit the function if approval confirmation fails
        }
      } else {
        console.log("✅ Token allowance already sufficient");
      }

      toast.info("Sending Transaction", { id: "lp-toast", description: "Please approve the transaction in your wallet to add liquidity." });

      // Ensure guid has 0x prefix for the cast to be safe
    
      // Call the addLiquidity function with the signature and required ETH value
      console.log({signatureResult, signature, totalEth});
      const hash = await addLiquidity({
        args: [
          signatureResult.data?.message?.guid, // Use pre-formatted guid
          signature // Pass the fetched signature correctly as the second arg
        ],
        value: totalEth, // Use parseEther
      });
      setLpTxHash(hash); // Set hash to start monitoring
      toast.loading("Processing Transaction", { id: "lp-toast", description: "Waiting for blockchain confirmation..." });
      console.log('Add Liquidity transaction sent:', hash);

    } catch (err: unknown) {
      let errorMessage = "An unknown error occurred.";
      if (err instanceof Error) {
        // Attempt to access Wagmi's shortMessage or fall back to standard message
        errorMessage = err.message;
      }
      toast.error("LP Creation Failed", { id: "lp-toast", description: errorMessage });
      console.error("LP creation failed:", err);
    }
  }

  const copyAddress = (addr: string | undefined) => {
    if (!addr) return;
    navigator.clipboard.writeText(addr);
    toast.success("Address copied to clipboard!");
  }
  // --- End Event Handlers ---


  // --- Render Logic ---

  // Guard: render stable markup until mounted to avoid hydration mismatch
  if (!hasMounted) {
      return (
          <div className="container py-10 space-y-10">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading dashboard...</p>
              </div>
            </div>
          </div>
      );
  }

   // 0. Check if we have a valid token ID
   if (!tokenId) {
       return (
           <div className="container py-12 flex items-center justify-center min-h-[calc(100vh-8rem)]">
             <Card className="text-center max-w-md w-full bg-card shadow-xl border border-border/50 p-8 rounded-lg">
                 <CardHeader className="p-0 mb-4">
                     <CardTitle className="text-2xl font-semibold">Invalid Token</CardTitle>
                 </CardHeader>
                 <CardContent className="p-0">
                     <p className="text-muted-foreground">No token ID provided. Please go back to the dashboard and select a token.</p>
                 </CardContent>
             </Card>
           </div>
       );
   }

   // 1. Handle Not Connected State
   if (!isConnected) {
      return (
          <div className="container py-12 flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <Card className="text-center max-w-md w-full bg-card shadow-xl border border-border/50 p-8 rounded-lg">
                <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl font-semibold">Connect Wallet</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <p className="text-muted-foreground">Please connect your wallet via the header to access the dashboard.</p>
                </CardContent>
            </Card>
          </div>
      );
  }

  // 2. Handle Loading State
  if (isLoading && !isNewTokenCreation) {
      return (
          <div className="container py-10 space-y-10">
              <Skeleton className="h-16 w-full rounded-lg" /> {/* Status Alert Skeleton */}
              {/* Config Card Skeleton */}
              <Card className="bg-card shadow-xl border-border/50">
                  <CardHeader className="px-6 pt-6 pb-4"><Skeleton className="h-6 w-1/2" /><Skeleton className="h-4 w-3/4 mt-2" /></CardHeader>
                  <CardContent className="px-6 pt-2 pb-6 space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Skeleton className="h-16 w-full" /><Skeleton className="h-16 w-full" /><Skeleton className="h-16 w-full" /><Skeleton className="h-16 w-full" /></div><div className="space-y-4"><Skeleton className="h-16 w-full" /><Skeleton className="h-16 w-full" /></div></CardContent>
                  <CardFooter className="border-t border-border/50 px-6 py-4 bg-muted/20 rounded-b-lg"><Skeleton className="h-10 w-40" /></CardFooter>
              </Card>
              {/* Deploy Card Skeleton */}
              <Card className="bg-card shadow-xl border-border/50"><CardHeader className="px-6 pt-6 pb-4"><Skeleton className="h-6 w-1/2" /><Skeleton className="h-4 w-3/4 mt-2" /></CardHeader><CardContent className="px-6 pb-6"><Skeleton className="h-12 w-48" /></CardContent></Card>
              {/* LP Card Skeleton */}
              <Card className="bg-card shadow-xl border-border/50"><CardHeader className="px-6 pt-6 pb-4"><Skeleton className="h-6 w-1/2" /><Skeleton className="h-4 w-3/4 mt-2" /></CardHeader><CardContent className="px-6 pb-6"><Skeleton className="h-12 w-48" /></CardContent></Card>
              {/* Status Card Skeleton */}
              <Card className="bg-card shadow-xl border-border/50"><CardHeader className="px-6 pt-6 pb-4"><Skeleton className="h-6 w-1/2" /></CardHeader><CardContent className="px-6 pt-2 pb-6 space-y-4"><Skeleton className="h-5 w-full" /><Skeleton className="h-5 w-2/3" /><Skeleton className="h-px w-full bg-muted/50 my-3" /><Skeleton className="h-5 w-full" /><Skeleton className="h-5 w-1/2" /><Skeleton className="h-px w-full bg-muted/50 my-3" /><Skeleton className="h-5 w-full" /><Skeleton className="h-px w-full bg-muted/50 my-3" /><div className="flex justify-between"><Skeleton className="h-6 w-1/3" /><Skeleton className="h-8 w-1/4" /></div> </CardContent></Card>
          </div>
      );
  }

  // 3. Handle Error State
   if (isError && !isNewTokenCreation) {
        return (
            <div className="container py-10">
             <Alert variant="destructive" className="bg-destructive/10 border-destructive/30 text-red-400 dark:text-red-500 dark:border-red-500/30 dark:bg-red-900/20 p-6 rounded-lg">
                <XCircle className="h-6 w-6 text-destructive dark:text-red-500" />
                <AlertTitle className="text-xl font-semibold text-destructive dark:text-red-500 mt-1 mb-2">
                 Error Loading Project Data
                 </AlertTitle>
                <AlertDescription className="text-base">
                 Failed to load project details: {error.message}.
                 <Button variant="outline" size="sm" onClick={() => refetchToken()} className="ml-4 mt-2 border-destructive/50 text-destructive hover:bg-destructive/10">
                    <RefreshCw className="mr-2 h-4 w-4"/> Retry
                 </Button>
                </AlertDescription>
            </Alert>
            </div>
        );
    }

  // --- Main Dashboard Render (Data is available or new token) ---
   // For new token creation, create a default empty project details
   const tokenState = isNewTokenCreation 
     ? { 
         name: '',
         ticker: '',
         supply: '',
         liquidity: '',
         flatBuyTax: '',
         flatSellTax: '',
         startBuyTax: '',
         startSellTax: '',
         taxWallet1: '',
         taxWallet2: '',
         metadataURI: '',
         whitelistDuration: '0',
         isContractDeployed: false,
         liquidityAdded: false,
         isTokenApproved: false,
         isLiquidityApproved: false, // Add field
         
       } as ProjectDetails 
     : details;
   
   
   // Determine the token state
   const isNewToken = isNewTokenCreation || !tokenState?.isTokenApproved;
   const isApprovedNotOnchain = !isNewTokenCreation && tokenState?.isTokenApproved && !tokenState?.isContractDeployed;
   const isOnchainNoLiquidity = !isNewTokenCreation && tokenState?.isContractDeployed && !tokenState?.liquidityAdded;
   
   // Set action flags based on token state
   const canDeploy = isApprovedNotOnchain;
   // Check form data for liquidity amount when deciding if LP can be created
   const canCreateLP = isOnchainNoLiquidity && !!tokenState.erc20Address && !!formData?.liquidity && Number(formData.liquidity) > 0;

  // Show loading state to prevent hydration mismatch
  if ((isLoading && !isNewTokenCreation) || (!isNewTokenCreation && !details)) {
    return (
      <div className="container py-10 space-y-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading token information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 space-y-10"> {/* Increased spacing */}

        
         {/* Authentication status is now handled by SIWE */}


        {/* Token State Alert */}
        {tokenState && isNewTokenCreation ? (
          <Alert className="w-full p-4 bg-blue-500/10 border-blue-500/30 text-blue-600">
            <Settings className="h-5 w-5 mt-0.5 text-blue-500" />
            <AlertTitle className="text-lg font-medium mb-1 w-full">
              New Token - Fill Out Information
            </AlertTitle>
            <AlertDescription className="text-sm w-full">
              Please fill out the token information below and submit to create your token.
            </AlertDescription>
          </Alert>
        ) : tokenState ? (
            <Alert className={`w-full p-4 ${isNewToken && !isNewTokenCreation ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-600' : 
                              isApprovedNotOnchain ? 'bg-blue-500/10 border-blue-500/30 text-blue-600' : 
                              isOnchainNoLiquidity ? 'bg-green-500/10 border-green-500/30 text-green-600' :
                              'bg-primary/10 border-primary/30 text-primary'}`}>
                {isNewToken && !isNewTokenCreation && <Info className="h-5 w-5 mt-0.5 text-yellow-500" />}
                {isApprovedNotOnchain && <Rocket className="h-5 w-5 mt-0.5 text-blue-500" />}
                {isOnchainNoLiquidity && <Coins className="h-5 w-5 mt-0.5 text-green-500" />}
                {!isNewToken && !isApprovedNotOnchain && !isOnchainNoLiquidity && <CheckCircle2 className="h-5 w-5 mt-0.5 text-primary" />}
                <AlertTitle className="text-lg font-medium mb-1 w-full">
                            {isNewToken && !isNewTokenCreation ? 'New Token - Awaiting Approval' : 
                             isApprovedNotOnchain ? 'Token Approved - Ready to Deploy' : 
                             isOnchainNoLiquidity ? 'Token Deployed - Add Liquidity' :
                             'Token Active - Trading Live'}
                        </AlertTitle>
                        <AlertDescription className="text-sm w-full">
                            {isNewToken && !isNewTokenCreation ? 'Your token is awaiting admin approval. Once approved, you can deploy it to the blockchain.' : 
                             isApprovedNotOnchain ? 'Your token has been approved! You can now deploy it to the blockchain.' : 
                             isOnchainNoLiquidity ? 'Your token is deployed on-chain. Add liquidity to enable trading.' :
                             'Your token is fully deployed with liquidity. Trading is now active!'}
                        </AlertDescription>
            </Alert>
        ) : null}

        {/* Step 1: Input Project Details */}
        <Card className="bg-card shadow-xl border border-border/40 rounded-lg transition-opacity hover:border-border/70">
            <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <Settings className="h-5 w-5 text-primary" />
                    1. Project Configuration
                </CardTitle>
                <CardDescription className="mt-1">Define the parameters for your new token on BNB Chain.</CardDescription>
            </CardHeader>
            <form onSubmit={handleCreateTokenSubmit}>
                <CardContent className="px-6 pt-2 pb-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                        <div>
                            <Label htmlFor="name">Token Name <span className="text-destructive dark:text-red-500 ml-0.5">*</span></Label>
                            <Input id="name" placeholder="e.g., Pineapple Exchange" value={formData.name || ''} onChange={handleInputChange} required disabled={isConfigurationDisabled} className="mt-1.5"/>
                        </div>
                        <div>
                            <Label htmlFor="ticker">Token Symbol <span className="text-destructive dark:text-red-500 ml-0.5">*</span></Label>
                            <Input id="ticker" placeholder="e.g., PEXP" value={formData.ticker || ''} onChange={handleInputChange} required maxLength={5} disabled={isConfigurationDisabled} className="mt-1.5"/>
                        </div>
                        <div>
                            <Label htmlFor="supply">Total Supply <span className="text-destructive dark:text-red-500 ml-0.5">*</span></Label>
                            <Input id="supply" type="number" placeholder="e.g., 100000000" value={formData.supply || ''} onChange={handleInputChange} required min="1" disabled={isConfigurationDisabled} className="mt-1.5"/>
                        </div>
                        <div>
                            <Label htmlFor="liquidity">Initial Liquidity (BNB) <span className="text-destructive dark:text-red-500 ml-0.5">*</span></Label>
                            <Input id="liquidity" type="number" placeholder="e.g., 50" value={formData.liquidity || ''} onChange={handleInputChange} required min="0.01" step="0.01" disabled={isConfigurationDisabled} className="mt-1.5"/>
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <h3 className="text-sm font-medium">Tax Configuration</h3>
                        <Separator className="my-2" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                        <div>
                            <Label htmlFor="flatBuyTax">Flat Buy Tax (%) <span className="text-destructive dark:text-red-500 ml-0.5">*</span></Label>
                            <Input id="flatBuyTax" type="number" placeholder="e.g., 2" value={formData.flatBuyTax || ''} onChange={handleInputChange} required max="7" min="4" step="0.1" disabled={isConfigurationDisabled} className="mt-1.5"/>
                        </div>
                        <div>
                            <Label htmlFor="flatSellTax">Flat Sell Tax (%) <span className="text-destructive dark:text-red-500 ml-0.5">*</span></Label>
                            <Input id="flatSellTax" type="number" placeholder="e.g., 2" value={formData.flatSellTax || ''} onChange={handleInputChange} required max="7" min="4" step="0.1" disabled={isConfigurationDisabled} className="mt-1.5"/>
                        </div>
                        <div>
                            <Label htmlFor="startBuyTax">Initial Buy Tax (%) <span className="text-destructive dark:text-red-500 ml-0.5">*</span></Label>
                            <Input id="startBuyTax" type="number" placeholder="e.g., 2" value={formData.startBuyTax || ''} onChange={handleInputChange} required max="20" min="4" step="0.1" disabled={isConfigurationDisabled} className="mt-1.5"/>
                        </div>
                        <div>
                            <Label htmlFor="startSellTax">Initial Sell Tax (%) <span className="text-destructive dark:text-red-500 ml-0.5">*</span></Label>
                            <Input id="startSellTax" type="number" placeholder="e.g., 2" value={formData.startSellTax || ''} onChange={handleInputChange} required max="20" min="4" step="0.1" disabled={isConfigurationDisabled} className="mt-1.5"/>
                        </div>
                    </div>

                    
                    <div className="space-y-1">
                        <h3 className="text-sm font-medium">Additional Configuration</h3>
                        <Separator className="my-2" />
                    </div>
                    
                    <div className="space-y-5">
                        <div>
                            <Label htmlFor="taxWallet1">Primary Tax Recipient Wallet <span className="text-destructive dark:text-red-500 ml-0.5">*</span></Label>
                            <Input id="taxWallet1" placeholder="0x..." value={formData.taxWallet1 || ''} onChange={handleInputChange} required pattern="^0x[a-fA-F0-9]{40}$" title="Enter a valid BEP-20 address" disabled={isConfigurationDisabled} className="mt-1.5"/>
                        </div>
                        <div>
                            <Label htmlFor="taxWallet2">Secondary Tax Recipient Wallet (Optional)</Label>
                            <Input id="taxWallet2" placeholder="0x... (optional)" value={formData.taxWallet2 || ''} onChange={handleInputChange} pattern="^0x[a-fA-F0-9]{40}$" title="Enter a valid BEP-20 address (optional)" disabled={isConfigurationDisabled} className="mt-1.5"/>
                            <p className="text-xs text-muted-foreground mt-1">If provided, tax revenue will be split between primary and secondary wallets</p>
                        </div>
                        <div>
                            <Label htmlFor="whitelistDuration">Whitelist Only Duration (seconds)</Label>
                            <Input id="whitelistDuration" type="number" placeholder="max 180 seconds" value={formData.whitelistDuration} onChange={handleInputChange} min="0" max="180" disabled={isConfigurationDisabled} className="mt-1.5"/>
                        </div>
                        <div>
                            <Label htmlFor="token-image">Token Image <span className="text-destructive dark:text-red-500 ml-0.5">*</span></Label>
                            <Input
                              id="token-image"
                              type="file"
                              accept="image/*" // Restrict to image types
                              onChange={handleFileChange}
                              disabled={isConfigurationDisabled}
                              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                              required // Make image required
                            />
                            {imageFile && <p className="text-sm text-muted-foreground mt-1">Selected: {imageFile.name}</p>}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t border-border/50 px-6 py-4 bg-muted/20 rounded-b-lg">
                    <Button type="submit" disabled={isCreatingToken || !isConnected || isConfigurationDisabled} className="w-auto">
                        {isCreatingToken ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Settings className="mr-2 h-4 w-4" />}
                        Create Token
                    </Button>
                </CardFooter>
            </form>
        </Card>

        {/* Step 2: Deploy Contract */}
        <Card className={`bg-card shadow-xl border border-border/40 rounded-lg ${isApprovedNotOnchain ? 'ring-2 ring-blue-500/20' : ''}`}>
            <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold"> <Rocket className="h-5 w-5 text-primary" /> 2. Deploy Smart Contract </CardTitle>
                 <CardDescription className="mt-1">Deploy the token contract to the BNB Chain. Requires gas fees (BNB).</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
                <Button onClick={handleDeploy} disabled={!canDeploy || isDeployingContract || isConfirmingDeploy} size="lg" className="px-6">
                    {(isDeployingContract || isConfirmingDeploy) ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isConfirmingDeploy ? 'Confirming...' : 'Deploying...'}
                        </>
                    ) : (
                        <>
                            <Rocket className="mr-2 h-4 w-4"/> Deploy Contract
                        </>
                    )}
                </Button>
                 {tokenState?.isContractDeployed && (
                     <div className="mt-4 text-sm text-green-400 flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4"/> Contract deployed! Address:
                        {tokenState.erc20Address &&
                            <>
                                <code className="ml-1 font-mono text-xs bg-muted/50 px-1.5 py-0.5 rounded">{tokenState.erc20Address.substring(0,6)}...{tokenState.erc20Address.substring(tokenState.erc20Address.length-4)}</code>
                                <Button variant="ghost" size="icon" className="h-auto w-auto p-0 ml-1 text-green-400 hover:text-green-300" onClick={() => copyAddress(tokenState.erc20Address)}>
                                    <CopyIcon className="h-4 w-4"/>
                                </Button>
                            </>
                        }
                     </div>
                 )}
                 {isNewToken && <p className="mt-3 text-xs text-yellow-400 flex items-center gap-1"><Info size={14}/> Token awaiting admin approval.</p>}
                 {isApprovedNotOnchain && <p className="mt-3 text-xs text-yellow-400 flex items-center gap-1"><Info size={14}/> Deploying requires gas fees (BNB) in your wallet.</p>}
                 {isOnchainNoLiquidity && <p className="mt-3 text-xs text-yellow-400 flex items-center gap-1"><Info size={14}/> Contract successfully deployed. Proceed to add liquidity.</p>}
            </CardContent>
        </Card>

        {/* Step 3: Create Liquidity Pool */}
        <Card className={`bg-card shadow-xl border border-border/40 rounded-lg ${isOnchainNoLiquidity ? 'ring-2 ring-green-500/20' : ''}`}>
            <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold"> <Coins className="h-5 w-5 text-primary" /> 3. Create Liquidity Pool </CardTitle>
                <CardDescription className="mt-1">Add liquidity to enable trading on PancakeSwap.</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
                <Button onClick={()=>handleCreateLP()}
                        disabled={!canCreateLP || isCreatingLiquidity || isConfirmingLp || !tokenState?.isLiquidityApproved} // Add check to disabled
                        size="lg"
                        className="px-6 w-full flex justify-center items-center gap-2"
                >
                    {(isCreatingLiquidity || isConfirmingLp) ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isConfirmingLp ? 'Confirming...' : 'Creating LP...'}
                        </>
                    ) : (
                        <>
                            <Coins className="mr-2 h-4 w-4"/> Create Liquidity Pool
                        </>
                    )}
                </Button>
                {tokenState?.liquidityAdded && <p className="mt-3 text-xs text-green-400 flex items-center gap-1"><CheckCircle2 size={14}/> Liquidity Pool is Live!</p>}
                {!tokenState?.liquidityAdded && isOnchainNoLiquidity && formData.liquidity && <p className="mt-3 text-xs text-muted-foreground">Adding liquidity will enable trading on PancakeSwap.</p>}
                {/* Update feedback messages */}
                {tokenState?.isContractDeployed && !tokenState?.isTokenApproved && <p className="mt-3 text-xs text-yellow-400 flex items-center gap-1"><Info size={14}/> Token awaiting admin approval.</p>}
                {tokenState?.isTokenApproved && !tokenState?.isLiquidityApproved && <p className="mt-3 text-xs text-yellow-400 flex items-center gap-1"><Info size={14}/> Liquidity parameters awaiting admin approval.</p>}
            </CardContent>
        </Card>

        {/* Tax Management Section */}
        {tokenState && tokenState.erc20Address && (
          <TaxManagement
            tokenAddress={tokenState.erc20Address}
            creatorAddress={tokenState.creator}
            isTokenLaunched={tokenState.liquidityAdded || false}
          />
        )}

        {/* Step 4: Project Status */}
        <Card className="bg-card shadow-xl border border-border/40 rounded-lg">
            <CardHeader className="px-6 pt-6 pb-4">
                 <CardTitle className="flex items-center gap-2 text-lg font-semibold"> <HelpCircle className="h-5 w-5 text-primary" /> 5. Project Status & Info </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pt-2 pb-6 space-y-4 text-sm">
                <div className="flex justify-between items-center"><span>Token Ticker:</span> <span className="font-mono bg-muted/50 px-2 py-1 rounded-md text-xs">{tokenState?.ticker || 'N/A'}</span></div>
                <div className="flex justify-between items-center"><span>Total Supply:</span> <span className="font-medium">{tokenState?.supply ? Number(tokenState.supply).toLocaleString() : 'N/A'}</span></div>
                <Separator className="bg-border/30 my-3" />
                <div className="flex justify-between items-center"><span>Deployment Status:</span> {tokenState?.isContractDeployed ? <span className="text-green-400 font-medium flex items-center gap-1"><CheckCircle2 size={16}/>Deployed</span> : <span className="text-yellow-400 font-medium flex items-center gap-1"><Info size={16}/>Not Deployed</span>}</div>
                {tokenState?.erc20Address && <div className="flex justify-between items-center gap-4"><span>Contract Address:</span> <div className="flex items-center"><code className="text-xs font-mono bg-muted/50 px-2 py-1 rounded-md truncate max-w-full">{tokenState.erc20Address}</code><Button variant="ghost" size="icon" className="h-auto w-auto p-0 ml-1 text-muted-foreground hover:text-foreground" onClick={() => copyAddress(tokenState.erc20Address)}><CopyIcon className="h-4 w-4"/></Button></div></div>}
                <Separator className="bg-border/30 my-3" />
                <div className="flex justify-between items-center"><span>Liquidity Pool:</span> {tokenState?.liquidityAdded ? <span className="text-green-400 font-medium flex items-center gap-1"><CheckCircle2 size={16}/>Live (PancakeSwap)</span> : <span className="text-yellow-400 font-medium flex items-center gap-1"><Info size={16}/>Not Created</span>}</div>
                 <Separator className="bg-border/30 my-3" />
                <div>
                    <strong className="block mb-2 text-base">Tax Wallets:</strong>
                    <ul className="space-y-2 text-xs">
                        <li className="flex justify-between items-center"><span>User 1:</span> <code className="font-mono bg-muted/50 px-2 py-1 rounded-md">{tokenState?.taxWallet1 || 'N/A'}</code></li>
                        <li className="flex justify-between items-center"><span>User 2:</span> <code className="font-mono bg-muted/50 px-2 py-1 rounded-md">{tokenState?.taxWallet2 || 'Not Set'}</code></li>
                        <li className="flex justify-between items-center"><span>Admin (Internal):</span> <code className="font-mono bg-muted/50 px-2 py-1 rounded-md">0xAdmin...abc</code></li>
                    </ul>
                </div>
            </CardContent>
        </Card>
        {(deployError || deployConfirmError) && <Alert variant="destructive" className="mt-4"><XCircle className="h-4 w-4"/><AlertTitle>Deploy Error</AlertTitle><AlertDescription className="text-xs">{deployError?.message || deployConfirmError?.message || 'An unknown error occurred.'}</AlertDescription></Alert>}
        {(lpError || lpConfirmError) && <Alert variant="destructive" className="mt-4"><XCircle className="h-4 w-4"/><AlertTitle>LP Error</AlertTitle><AlertDescription className="text-xs">{lpError?.message || lpConfirmError?.message || 'An unknown error occurred.'}</AlertDescription></Alert>}
    </div>
  );
}