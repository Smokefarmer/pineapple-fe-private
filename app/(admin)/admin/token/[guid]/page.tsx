'use client';

import { useParams, useRouter } from 'next/navigation';
import { 
  useToken, 
  useApproveToken, 
  useApproveLiquidity, 
  useWhitelistEntries
} from '@/app/lib/queries';
import { 
  useState, 
  ChangeEvent
} from 'react';
import { toast } from 'sonner';
import { 
  useWriteWhitelistAddManyToWhitelist, 
  whitelistAddress as generatedWhitelistAddress, 
} from '@/src/generated'; 
import { useAccount } from 'wagmi'; 
import { isAddress, BaseError, parseEther } from 'viem'; 

import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Skeleton } from "@/app/components/ui/skeleton";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/app/components/ui/table";
import { 
  AlertCircle, 
  ArrowLeft, 
  Check, 
  Copy, 
  Loader2, 
  PlusCircle, 
  RefreshCw, 
  X 
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { Separator } from "@/app/components/ui/separator";
import { Badge } from '@/app/components/ui/badge';

// Type definition for the structure expected by the smart contract write function
type WhitelistContractEntry = { user: `0x${string}`; allowance: bigint };

export default function TokenDetailPage() {
  const params = useParams();
  const router = useRouter();
  const guid = params.guid as string;
  const [liquidityTokenPercent, setLiquidityTokenPercent] = useState(50); 
  const [whitelistFile, setWhitelistFile] = useState<File | null>(null);
  
  // Admin phase configuration state
  const [adminPhaseA, setAdminPhaseA] = useState({ rate: 5, duration: 3600 }); // 5%, 1 hour
  const [adminPhaseB, setAdminPhaseB] = useState({ rate: 3, duration: 7200 }); // 3%, 2 hours  
  const [adminPhaseC, setAdminPhaseC] = useState({ rate: 1, duration: 0 }); // 1%, endless 
  const { chain } = useAccount(); 

  // Fetch token details
  const { 
    data: token, 
    isLoading, 
    error, 
    refetch 
  } = useToken(guid);

  // Approve token mutation (pre-deployment)
  const { 
    mutate: approveToken, 
    isPending: isApprovingToken 
  } = useApproveToken();

  // Approve liquidity mutation (post-deployment)
  const { 
    mutate: approveLiquidity, 
    isPending: isApprovingLiquidity 
  } = useApproveLiquidity();

  // Whitelist add many hook
  const { 
    writeContract: addManyToWhitelist, 
    isPending: isPendingAddMany, 
    error: errorAddMany 
  } = useWriteWhitelistAddManyToWhitelist();

  // Fetch whitelist entries
  const { 
    data: whitelistData, 
    isLoading: isLoadingWhitelist, 
    error: errorWhitelistEntries,
    refetch: refetchWhitelist 
  } = useWhitelistEntries(guid);

  // Combined loading state
  const isProcessing = isApprovingToken || isApprovingLiquidity || isPendingAddMany;

  // Handle approve token (for non-deployed tokens)
  const handleApproveToken = () => {
    if (!token || token.erc20Address || liquidityTokenPercent < 1 || liquidityTokenPercent > 100) {
      toast.warning("Cannot Approve", { description: "This action is only for tokens not yet deployed." });
      return;
    }
    
    // Validate admin phase C rate against flat tax rates
    const flatBuyTaxPercent = token.flatBuyTax / 100; // Convert from basis points to percentage
    const flatSellTaxPercent = token.flatSellTax / 100; // Convert from basis points to percentage
    
    if (adminPhaseC.rate > flatBuyTaxPercent || adminPhaseC.rate > flatSellTaxPercent) {
      toast.error("Invalid Admin Configuration", { 
        description: `Admin Phase C rate (${adminPhaseC.rate}%) cannot exceed the creator's flat tax rates (Buy: ${flatBuyTaxPercent}%, Sell: ${flatSellTaxPercent}%)` 
      });
      return;
    }
    
    // Validate that rates decrease over time
    if (adminPhaseA.rate < adminPhaseB.rate || adminPhaseB.rate < adminPhaseC.rate) {
      toast.error("Invalid Admin Configuration", { 
        description: "Admin tax rates must decrease over time (Phase A ≥ Phase B ≥ Phase C)" 
      });
      return;
    }
    
    const adminRatesBps = [
      adminPhaseA.rate * 100, // Convert to basis points
      adminPhaseB.rate * 100, 
      adminPhaseC.rate * 100
    ];
    
    const adminDurations = [
      adminPhaseA.duration,
      adminPhaseB.duration, 
      adminPhaseC.duration // Always 0 for endless
    ];
    
    approveToken({ 
      guid: token.guid, 
      liquidityTokenPercent: liquidityTokenPercent * 100,
      adminRatesBps,
      adminDurations
    }, {
      onSuccess: () => {
        toast.success("Token Approved", { 
          description: `${token.symbol} has been approved with ${liquidityTokenPercent}% liquidity and admin tax configuration.` 
        });
        refetch(); 
      },
      onError: (error: Error) => {
        toast.error("Approval Failed", { 
          description: error.message 
        });
      }
    });
  };

  // Handle approve liquidity (for deployed tokens)
  const handleApproveLiquidity = () => {
    if (!token || !token.isTokenApproved || token.isLiquidityApproved || !token.erc20Address) {
       toast.warning("Cannot Approve Liquidity", { description: "Token must be deployed, admin approved, and not yet liquidity approved." });
       return;
    }

    approveLiquidity({ 
      guid: token.guid,
    }, {
      onSuccess: () => {
        toast.success("Liquidity Settings Approved", { 
          description: `Liquidity settings for ${token.symbol} approved with ${liquidityTokenPercent}% liquidity.` 
        });
        refetch(); 
      },
      onError: (error: Error) => {
        toast.error("Liquidity Approval Failed", { 
          description: error.message 
        });
      }
    });
  };

  // Handle add many to whitelist from CSV file
  const handleAddManyToWhitelist = () => {
    if (!token || !token.guid || !chain?.id) {
      toast.warning("Token or Network Info Missing", { description: "Cannot process whitelist without token details or network connection." });
      return;
    }

    if (!whitelistFile) {
      toast.warning("No File Selected", { description: "Please select a CSV file to upload." });
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const csvData = event.target.result as string;
        const lines = csvData.trim().split(/\r?\n/); // Split by newline (Win/Unix)
        const entries: WhitelistContractEntry[] = []; // Use the contract-specific type
        const errors: string[] = [];
        const total = BigInt(token.totalSupply); // Reinstate total supply for calculation

        lines.forEach((line, index) => {
          const [addressStr, percentStr] = line.split(',').map(s => s.trim()); // Read percentage string

          if (!addressStr || !percentStr) {
            // Allow empty lines to be skipped silently
            if (line.trim() !== '') { 
              errors.push(`Line ${index + 1}: Invalid format. Use 'address,percentage'. Found: '${line}'`);
            }
            return; // Skip this line
          }

          if (!isAddress(addressStr)) {
            errors.push(`Line ${index + 1}: Invalid address '${addressStr}'.`);
            return; // Skip this line
          }

          try {
            const percentage = parseFloat(percentStr); // Parse percentage string
            if (isNaN(percentage) || percentage <= 0 || percentage > 100) { // Validate percentage
               errors.push(`Line ${index + 1}: Invalid percentage '${percentStr}'. Must be > 0 and <= 100.`);
               return; // Skip this line
            }
            // Calculate allocation based on percentage
            
            const allowance =
              (total * BigInt(Math.floor(percentage * 10000))) /
              10000n /
              100n;

            entries.push({ user: addressStr as `0x${string}`, allowance: parseEther(allowance.toString()) });
          } catch { 
             errors.push(`Line ${index + 1}: Error processing percentage '${percentStr}'.`);
             return; // Skip this line
          }
        });

        if (errors.length > 0) {
          toast.error(`Input Errors (${errors.length})`, { 
            description: (
              <ul className="list-disc list-inside text-xs max-h-40 overflow-y-auto">
                {errors.slice(0, 10).map((err, i) => <li key={i}>{err}</li>)}
                {errors.length > 10 && <li>...and {errors.length - 10} more errors. Check console for details.</li>}
              </ul>
            ),
            duration: 10000, // Show longer for error list
          });
          console.error("Whitelist CSV Parsing Errors:", errors);
          return;
        }

        if (entries.length === 0) {
          toast.warning("No Valid Entries Found", { description: "The CSV file did not contain any valid 'address,percentage' entries." });
          return;
        }

        console.log(`Adding ${entries.length} entries to whitelist for GUID: ${token.guid}`);

        const whitelistContractAddress = generatedWhitelistAddress[chain.id as keyof typeof generatedWhitelistAddress];
        if (!whitelistContractAddress) {
          toast.error("Unsupported Network", { description: "Whitelist contract address not found for this network." });
          return;
        }
        
        console.log("Whitelist Contract:", whitelistContractAddress);
        console.log("Prepared Entries:", entries);

        addManyToWhitelist({ 
          // Pass the token guid (bytes32) and entries array as arguments
          args: [token.guid as `0x${string}`, entries], 
        }, {
            onSuccess: (txHash) => {
              toast.success("Whitelist Update Transaction Sent", {
                description: `Successfully added ${entries.length} entries. Tx: ${txHash}`
              });
              setWhitelistFile(null); // Clear file on success
              // Reset the file input visually
              const fileInput = document.getElementById('whitelist-csv') as HTMLInputElement;
              if (fileInput) fileInput.value = ''; 
              refetchWhitelist(); // Refetch whitelist data
            },
            onError: (error: Error) => { 
              console.error("Whitelist Add Many Error:", error);
              toast.error("Whitelist Contract Error", {
                description: (error as BaseError)?.shortMessage || error.message,
              });
            },
          });
      } else {
         toast.error("File Read Error", { description: "Could not read the selected file." });
      }
    };

    reader.onerror = () => {
       toast.error("File Read Error", { description: "An error occurred while trying to read the file." });
    };

    // Read the file as text
    reader.readAsText(whitelistFile);
  };

  // Handle reject token
  const handleRejectToken = () => {
    toast.error("Not Implemented", { 
      description: "Token rejection API not implemented yet." 
    });
  };

  // Copy to clipboard helper
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast(`${label} copied to clipboard.`);
  };

  // Go back to admin page
  const goBack = () => {
    router.push('/admin');
  };

  // Handle file input change
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === 'text/csv') {
        setWhitelistFile(file);
        toast.info(`Selected file: ${file.name}`);
      } else {
        toast.warning("Invalid File Type", { description: "Please select a CSV file." });
        setWhitelistFile(null); // Clear selection if invalid
        event.target.value = ''; // Reset the input field
      }
    } else {
      setWhitelistFile(null); // Clear selection if no file chosen
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <Button variant="ghost" onClick={goBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Admin
        </Button>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/4 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <Button variant="ghost" onClick={goBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Admin
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Token</AlertTitle>
          <AlertDescription>
            {error.message}
            <Button variant="ghost" size="sm" onClick={() => refetch()}>
              <RefreshCw className="h-3 w-3 mr-2" /> Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="container py-8">
        <Button variant="ghost" onClick={goBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Admin
        </Button>
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">Token not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = () => {
    if (token.isOnChain && token.liquidityAdded) { 
      return <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white" title="Token is deployed and liquidity has been added.">Deployed (Live)</Badge>;
    }
    if (token.isOnChain && token.isLiquidityApproved) { 
      return <Badge variant="default" className="bg-purple-500 hover:bg-purple-600 text-white" title="Token deployed, liquidity approved. Waiting for user to add it.">Deployed (Await User Liquidity)</Badge>; 
    }
    if (token.isOnChain && token.isTokenApproved) { 
      return <Badge variant="default" className="bg-orange-500 hover:bg-orange-600 text-white" title="Token deployed. Admin must approve liquidity settings.">Deployed (Pending Liquidity Approval)</Badge>;
    }
    if (token.isTokenApproved) { 
      return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600 text-white" title="Token details approved. Waiting for user to deploy the contract.">Token Approved (Await Deployment)</Badge>;
    }
    return <Badge variant="secondary" className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900" title="Admin needs to review and approve token details.">Pending Token Approval</Badge>;
  };

  return (
    <div className="container py-8">
      <Button variant="ghost" onClick={goBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Admin
      </Button>

      <Card className="shadow-md">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                {token.name} ({token.symbol}) {getStatusBadge()}
              </CardTitle>
              <CardDescription>
                Created: {new Date(token.createdAt || Date.now()).toLocaleString()}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {!token.isTokenApproved && (
                 <Button 
                    onClick={handleApproveToken} 
                    disabled={isProcessing} 
                    className="w-full sm:w-auto"
                    title="Approve token details and initial liquidity percentage"
                 >
                    {isApprovingToken ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />} Approve Token Details
                 </Button>
              )}
              {token.isTokenApproved && token.erc20Address && !token.isLiquidityApproved && (
                  <Button 
                     onClick={handleApproveLiquidity} 
                     disabled={isProcessing} 
                     className="w-full sm:w-auto"
                     title="Approve the liquidity settings"
                  >
                     {isApprovingLiquidity ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />} Approve Liquidity
                  </Button>
              )}
              {!token.isTokenApproved && (
                 <Button 
                    variant="destructive" 
                    onClick={handleRejectToken}
                    disabled={isProcessing}
                    className="w-full sm:w-auto"
                    title="Reject this token submission"
                 >
                    <X className="mr-2 h-4 w-4" /> Reject Token
                 </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Token Details</h3>
              
              <div>
                <Label>Token Name</Label>
                <div className="flex items-center mt-1">
                  <div className="bg-muted p-2 rounded text-sm flex-grow">
                    {token.name}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="ml-2"
                    onClick={() => copyToClipboard(token.name, "Token name")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Token Symbol</Label>
                <div className="flex items-center mt-1">
                  <div className="bg-muted p-2 rounded text-sm flex-grow">
                    {token.symbol}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="ml-2"
                    onClick={() => copyToClipboard(token.symbol, "Token symbol")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Total Supply</Label>
                <div className="flex items-center mt-1">
                  <div className="bg-muted p-2 rounded text-sm flex-grow">
                    {token.totalSupply}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="ml-2"
                    onClick={() => copyToClipboard(token.totalSupply, "Total supply")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Creator Wallet</Label>
                <div className="flex items-center mt-1">
                  <div className="bg-muted p-2 rounded text-sm flex-grow font-mono text-xs truncate">
                    {token.creator || "Unknown"}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="ml-2"
                    onClick={() => copyToClipboard(token.creator || "", "Creator wallet")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Tax Configuration</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Flat Buy Tax</Label>
                  <div className="bg-muted p-2 rounded text-sm mt-1">
                    {token.flatBuyTax/100}%
                  </div>
                </div>
                
                <div>
                  <Label>Flat Sell Tax</Label>
                  <div className="bg-muted p-2 rounded text-sm mt-1">
                    {token.flatSellTax/100}%
                  </div>
                </div>
                
                <div>
                  <Label>Start Buy Tax</Label>
                  <div className="bg-muted p-2 rounded text-sm mt-1">
                    {token.startBuyTax/100}%
                  </div>
                </div>
                
                <div>
                  <Label>Start Sell Tax</Label>
                  <div className="bg-muted p-2 rounded text-sm mt-1">
                    {token.startSellTax/100}%
                  </div>
                </div>
              </div>

              <div>
                <Label>Primary Tax Recipient</Label>
                <div className="flex items-center mt-1">
                  <div className="bg-muted p-2 rounded text-sm flex-grow font-mono text-xs truncate">
                    {token.taxRecipient}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="ml-2"
                    onClick={() => copyToClipboard(token.taxRecipient, "Primary tax recipient")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {token.taxRecipient2 && (
                <div>
                  <Label>Secondary Tax Recipient</Label>
                  <div className="flex items-center mt-1">
                    <div className="bg-muted p-2 rounded text-sm flex-grow font-mono text-xs truncate">
                      {token.taxRecipient2}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="ml-2"
                      onClick={() => copyToClipboard(token.taxRecipient2, "Secondary tax recipient")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-muted-foreground">Share: </span>
                    <span className="text-sm font-medium">{token.taxRecipient2Share || 50}%</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      (Primary gets {100 - (token.taxRecipient2Share || 50)}%)
                    </span>
                  </div>
                </div>
              )}

              <div>
                <Label>Whitelist Only Duration</Label>
                <div className="bg-muted p-2 rounded text-sm mt-1">
                  {token.whitelistOnlyDuration} seconds
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Admin Tax Configuration</h3>
              
              {!token.isTokenApproved ? (
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Configure admin tax phases. Phase C rate must not exceed creator&apos;s flat tax rates (Buy: {(token.flatBuyTax/100).toFixed(1)}%, Sell: {(token.flatSellTax/100).toFixed(1)}%).
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="adminPhaseARate">Admin Tax Rate A (%)</Label>
                      <Input
                        id="adminPhaseARate"
                        type="number"
                        min={0}
                        max={50}
                        step={0.1}
                        value={adminPhaseA.rate}
                        onChange={(e) => setAdminPhaseA(prev => ({ ...prev, rate: parseFloat(e.target.value) || 0 }))}
                        disabled={isProcessing}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Tax rate from TGE (Token Generation Event)</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="adminPhaseADuration">Duration A (seconds)</Label>
                      <Input
                        id="adminPhaseADuration"
                        type="number"
                        min={0}
                        value={adminPhaseA.duration}
                        onChange={(e) => setAdminPhaseA(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                        disabled={isProcessing}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Duration for tax rate A</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="adminPhaseBRate">Admin Tax Rate B (%)</Label>
                      <Input
                        id="adminPhaseBRate"
                        type="number"
                        min={0}
                        max={50}
                        step={0.1}
                        value={adminPhaseB.rate}
                        onChange={(e) => setAdminPhaseB(prev => ({ ...prev, rate: parseFloat(e.target.value) || 0 }))}
                        disabled={isProcessing}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Tax rate after duration A expires</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="adminPhaseBDuration">Duration B (seconds)</Label>
                      <Input
                        id="adminPhaseBDuration"
                        type="number"
                        min={0}
                        value={adminPhaseB.duration}
                        onChange={(e) => setAdminPhaseB(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                        disabled={isProcessing}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Duration for tax rate B</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="adminPhaseCRate">Admin Tax Rate C (%)</Label>
                      <Input
                        id="adminPhaseCRate"
                        type="number"
                        min={0}
                        max={Math.min(token.flatBuyTax/100, token.flatSellTax/100)}
                        step={0.1}
                        value={adminPhaseC.rate}
                        onChange={(e) => setAdminPhaseC(prev => ({ ...prev, rate: parseFloat(e.target.value) || 0 }))}
                        disabled={isProcessing}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Tax rate after duration B expires (endless phase)</p>
                    </div>
                    
                    <div>
                      <Label>Duration C</Label>
                      <div className="bg-muted p-2 rounded text-sm mt-1">
                        0 (Endless)
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Duration for tax rate C (always endless)</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Admin Tax Rate A</Label>
                    <div className="bg-muted p-2 rounded text-sm mt-1">
                      {token.adminPhaseARateBps ? (token.adminPhaseARateBps/100).toFixed(1) : '0'}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Tax rate from TGE (Token Generation Event)</p>
                  </div>
                  
                  <div>
                    <Label>Duration A</Label>
                    <div className="bg-muted p-2 rounded text-sm mt-1">
                      {token.adminPhaseADuration || 0} seconds
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Duration for tax rate A</p>
                  </div>
                  
                  <div>
                    <Label>Admin Tax Rate B</Label>
                    <div className="bg-muted p-2 rounded text-sm mt-1">
                      {token.adminPhaseBRateBps ? (token.adminPhaseBRateBps/100).toFixed(1) : '0'}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Tax rate after duration A expires</p>
                  </div>
                  
                  <div>
                    <Label>Duration B</Label>
                    <div className="bg-muted p-2 rounded text-sm mt-1">
                      {token.adminPhaseBDuration || 0} seconds
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Duration for tax rate B</p>
                  </div>
                  
                  <div>
                    <Label>Admin Tax Rate C</Label>
                    <div className="bg-muted p-2 rounded text-sm mt-1">
                      {token.adminPhaseCRateBps ? (token.adminPhaseCRateBps/100).toFixed(1) : '0'}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Tax rate after duration B expires</p>
                  </div>
                  
                  <div>
                    <Label>Duration C</Label>
                    <div className="bg-muted p-2 rounded text-sm mt-1">
                      {(token.adminPhaseCDuration || 0) === 0 ? 'Endless' : `${token.adminPhaseCDuration} seconds`}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Duration for tax rate C (0 = Endless)</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4">Liquidity Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Liquidity Backing BNB</Label>
                <div className="bg-muted p-2 rounded text-sm mt-1">
                  {token.liquidityBackingETH} BNB
                </div>
              </div>

              {!token.isTokenApproved && (
                 <div>
                   <Label htmlFor="liquidityTokenPercent">Liquidity Token Percent</Label>
                   <div className="flex items-center gap-2 mt-1">
                     <Input
                       id="liquidityTokenPercent"
                       type="number"
                       min={1}
                       max={100}
                       value={liquidityTokenPercent}
                       onChange={(e) => setLiquidityTokenPercent(parseInt(e.target.value))}
                       disabled={isProcessing}
                     />
                     <span>%</span>
                   </div>
                   <p className="text-xs text-muted-foreground mt-1">
                     Percentage of tokens to allocate to liquidity pool.
                   </p>
                 </div>
              )}

              {token.liquidityTokenPercent !== undefined && (
                <div>
                  <Label>Approved Liquidity Percent</Label>
                  <div className="bg-muted p-2 rounded text-sm mt-1">
                    {token.liquidityTokenPercent/100}%
                  </div>
                </div>
              )}
            </div>
          </div>

          {token.erc20Address && (
            <>
              <Separator />
              <div>
                <Label>Contract Address</Label>
                <div className="flex items-center mt-1">
                  <div className="bg-muted p-2 rounded text-sm flex-grow font-mono text-xs truncate">
                    {token.erc20Address}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="ml-2"
                    onClick={() => copyToClipboard(token.erc20Address || "", "Contract address")}
                    disabled={!token.erc20Address} 
                    title={token.erc20Address ? "Copy contract address" : "Contract not deployed yet"}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}

          {token.erc20Address && (
            <>
          <Separator />
              <div>
                <h3 className="text-lg font-medium mb-4">Add Many to Whitelist</h3>
                <div className="space-y-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <Label htmlFor="whitelist-csv">Upload Whitelist CSV</Label>
                    <Input 
                      id="whitelist-csv" 
                      type="file" 
                      accept=".csv" 
                      onChange={handleFileChange} 
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Upload a CSV file with one entry per line: `address,percentage` (e.g., `0x123...,1.5`). Percentage is out of 100.
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={handleAddManyToWhitelist} 
                      disabled={isProcessing || !whitelistFile} 
                    >
                      {isPendingAddMany ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <PlusCircle className="mr-2 h-4 w-4" />
                      )}
                      Add Entries from CSV
                    </Button>
                  </div>
                </div>
                {errorAddMany && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error Adding Whitelist Entries</AlertTitle>
                    <AlertDescription>
                      {(errorAddMany as BaseError)?.shortMessage || errorAddMany.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

          <Separator />
          <div>
            <h3 className="text-lg font-medium mb-4">Current Whitelist</h3>
            {isLoadingWhitelist ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : errorWhitelistEntries ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error Fetching Whitelist</AlertTitle>
                <AlertDescription>
                  {errorWhitelistEntries.message}
                </AlertDescription>
              </Alert>
            ) : whitelistData && whitelistData.items.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Wallet Address</TableHead>
                    <TableHead className="text-right">Allowed Buy</TableHead>
                    <TableHead className="text-right">Recorded Buy</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Updated At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {whitelistData.items.map((entry) => (
                    <TableRow key={entry._id || entry.walletAddress}> {/* Use _id if available */}
                      <TableCell className="font-mono text-xs">
                        {entry.walletAddress}
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="ml-2 h-5 w-5"
                          onClick={() => copyToClipboard(entry.walletAddress, 'Address')}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">{ (entry.allowedBuyAmount)/1e18}</TableCell>
                      <TableCell className="text-right">{ (entry.recordedBuyAmount)/1e18}</TableCell>
                      <TableCell>{new Date(entry.createdAt).toLocaleString()}</TableCell>
                      <TableCell>{new Date(entry.updatedAt).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              // TODO: Add pagination controls if needed based on whitelistData.total, .page, .limit
            ) : (
              <p className="text-sm text-muted-foreground">No whitelist entries found.</p>
            )}
          </div>
            </>
          )}


        </CardContent>
      </Card>
    </div>
  );
}
