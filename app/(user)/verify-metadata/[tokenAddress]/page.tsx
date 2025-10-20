'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useReadContract } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { AlertCircle, CheckCircle2, ExternalLink, Copy, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { isAddress } from 'viem';

interface MetadataResult {
  name?: string;
  description?: string;
  image?: string;
  external_url?: string;
  [key: string]: unknown;
}

// ABI for reading token data
const tokenAbi = [
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'metadataURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'contractURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export default function VerifyMetadataPage() {
  const params = useParams();
  const tokenAddress = params.tokenAddress as string;
  
  const [metadataUri, setMetadataUri] = useState('');
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<MetadataResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [tokenAddressInput, setTokenAddressInput] = useState(tokenAddress || '');
  const [isValidAddress, setIsValidAddress] = useState(false);

  // Validate address
  useEffect(() => {
    setIsValidAddress(!!tokenAddressInput && isAddress(tokenAddressInput));
  }, [tokenAddressInput]);

  // Read standard token functions
  const { data: tokenName } = useReadContract({
    address: isValidAddress ? (tokenAddressInput as `0x${string}`) : undefined,
    abi: tokenAbi,
    functionName: 'name',
    query: { enabled: isValidAddress }
  });

  const { data: tokenSymbol } = useReadContract({
    address: isValidAddress ? (tokenAddressInput as `0x${string}`) : undefined,
    abi: tokenAbi,
    functionName: 'symbol',
    query: { enabled: isValidAddress }
  });

  const { data: tokenDecimals } = useReadContract({
    address: isValidAddress ? (tokenAddressInput as `0x${string}`) : undefined,
    abi: tokenAbi,
    functionName: 'decimals',
    query: { enabled: isValidAddress }
  });

  const { data: tokenTotalSupply } = useReadContract({
    address: isValidAddress ? (tokenAddressInput as `0x${string}`) : undefined,
    abi: tokenAbi,
    functionName: 'totalSupply',
    query: { enabled: isValidAddress }
  });

  // Try to read metadataURI from contract
  const { data: contractMetadataUri, isLoading: isLoadingContractUri, error: contractUriError } = useReadContract({
    address: isValidAddress ? (tokenAddressInput as `0x${string}`) : undefined,
    abi: tokenAbi,
    functionName: 'metadataURI',
    query: { enabled: isValidAddress }
  });

  // Try alternative metadata functions
  const { data: contractTokenUri } = useReadContract({
    address: isValidAddress ? (tokenAddressInput as `0x${string}`) : undefined,
    abi: tokenAbi,
    functionName: 'tokenURI',
    query: { enabled: isValidAddress }
  });

  const { data: contractContractUri } = useReadContract({
    address: isValidAddress ? (tokenAddressInput as `0x${string}`) : undefined,
    abi: tokenAbi,
    functionName: 'contractURI',
    query: { enabled: isValidAddress }
  });

  const fetchMetadata = useCallback(async (uri?: string) => {
    const uriToFetch = uri || metadataUri;
    if (!uriToFetch) {
      toast.error('Please enter a metadata URI');
      return;
    }

    setLoading(true);
    setError(null);
    setMetadata(null);
    setImageLoadError(false);

    try {
      // Handle IPFS URIs
      let fetchUrl = uriToFetch;
      if (uriToFetch.startsWith('ipfs://')) {
        // Convert ipfs:// to HTTP gateway
        fetchUrl = uriToFetch.replace('ipfs://', 'https://ipfs.io/ipfs/');
      }

      const response = await fetch(fetchUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setMetadata(data);
      toast.success('Metadata fetched successfully');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMsg);
      toast.error('Failed to fetch metadata', { description: errorMsg });
    } finally {
      setLoading(false);
    }
  }, [metadataUri]);

  // Auto-populate and verify when contract URI is fetched
  useEffect(() => {
    // Try metadataURI first, then tokenURI, then contractURI
    const uri = contractMetadataUri || contractTokenUri || contractContractUri;
    
    if (uri && typeof uri === 'string') {
      setMetadataUri(uri);
      // Auto-verify
      if (!metadata) {
        fetchMetadata(uri);
      }
    }
  }, [contractMetadataUri, contractTokenUri, contractContractUri, metadata, fetchMetadata]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const validateMetadata = () => {
    if (!metadata) return { valid: false, issues: ['No metadata loaded'] };

    const issues: string[] = [];

    if (!metadata.name) issues.push('Missing "name" field');
    if (!metadata.image) issues.push('Missing "image" field');
    if (metadata.image && !metadata.image.startsWith('http') && !metadata.image.startsWith('ipfs://')) {
      issues.push('Image URL should start with http:// or https:// or ipfs://');
    }

    return {
      valid: issues.length === 0,
      issues
    };
  };

  const validation = metadata ? validateMetadata() : null;

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Token Metadata Verifier</CardTitle>
          <CardDescription>
            Verify your token&apos;s metadata URI for DexScreener compatibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Token Address Input */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="token-address">Token Contract Address</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  id="token-address"
                  placeholder="0x..."
                  value={tokenAddressInput}
                  onChange={(e) => setTokenAddressInput(e.target.value)}
                  className={tokenAddressInput && !isValidAddress ? 'border-destructive' : ''}
                />
                {isLoadingContractUri && (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Reading...
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Enter your token contract address to automatically fetch and verify metadata
              </p>
              {tokenAddressInput && !isValidAddress && (
                <p className="text-xs text-destructive mt-1">
                  Invalid Ethereum address format
                </p>
              )}
            </div>
          </div>

          {/* Contract Info Display */}
          {isValidAddress && (tokenName || tokenSymbol) && (
            <div className="border border-border rounded-lg p-4 space-y-3 bg-muted/20">
              <h3 className="font-semibold text-sm">On-Chain Token Data</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {tokenName && (
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <p className="font-medium">{tokenName as string}</p>
                  </div>
                )}
                {tokenSymbol && (
                  <div>
                    <span className="text-muted-foreground">Symbol:</span>
                    <p className="font-medium">{tokenSymbol as string}</p>
                  </div>
                )}
                {tokenDecimals !== undefined && (
                  <div>
                    <span className="text-muted-foreground">Decimals:</span>
                    <p className="font-medium">{tokenDecimals.toString()}</p>
                  </div>
                )}
                {tokenTotalSupply && (
                  <div>
                    <span className="text-muted-foreground">Total Supply:</span>
                    <p className="font-medium">{(Number(tokenTotalSupply) / 10**18).toLocaleString()}</p>
                  </div>
                )}
              </div>
              
              {/* Metadata URI Status */}
              <div className="pt-2 border-t border-border/50">
                <span className="text-muted-foreground text-xs">Metadata Functions:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded ${contractMetadataUri ? 'bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-red-500/20 text-red-700 dark:text-red-400'}`}>
                    {contractMetadataUri ? '✓' : '✗'} metadataURI()
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${contractTokenUri ? 'bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-red-500/20 text-red-700 dark:text-red-400'}`}>
                    {contractTokenUri ? '✓' : '✗'} tokenURI()
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${contractContractUri ? 'bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-red-500/20 text-red-700 dark:text-red-400'}`}>
                    {contractContractUri ? '✓' : '✗'} contractURI()
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Contract Error */}
          {contractUriError && isValidAddress && !contractMetadataUri && !contractTokenUri && !contractContractUri && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>No Metadata URI Found:</strong> The contract doesn&apos;t have metadataURI(), tokenURI(), or contractURI() functions.
                <br />
                <span className="text-xs">You&apos;ll need to manually enter the metadata URI below.</span>
              </AlertDescription>
            </Alert>
          )}

          {/* Metadata URI Section - Always show if address is valid */}
          {isValidAddress && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="metadata-uri">
                  {metadataUri ? 'Metadata URI (from contract)' : 'Metadata URI (manual input)'}
                </Label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    id="metadata-uri"
                    placeholder="https://your-metadata-url.com/metadata.json or ipfs://..."
                    value={metadataUri}
                    onChange={(e) => setMetadataUri(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        fetchMetadata();
                      }
                    }}
                  />
                  <Button onClick={() => fetchMetadata()} disabled={loading || !metadataUri}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify'
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metadataUri 
                    ? 'Metadata URI fetched from contract (you can edit and re-verify)'
                    : 'Paste your metadata URI here to verify it'}
                </p>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Error:</strong> {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Validation Results */}
          {validation && (
            <Alert variant={validation.valid ? 'default' : 'destructive'}>
              {validation.valid ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <AlertDescription>
                    <strong className="text-green-500">Valid Metadata</strong>
                    <br />
                    Your metadata follows the expected format for DexScreener.
                  </AlertDescription>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Invalid Metadata</strong>
                    <ul className="list-disc list-inside mt-2">
                      {validation.issues.map((issue, i) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </>
              )}
            </Alert>
          )}

          {/* Metadata Display */}
          {metadata && (
            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-lg">Metadata Content</h3>
                
                {/* Token Name */}
                {metadata.name && (
                  <div>
                    <Label className="text-muted-foreground">Name</Label>
                    <p className="font-medium">{metadata.name}</p>
                  </div>
                )}

                {/* Description */}
                {metadata.description && (
                  <div>
                    <Label className="text-muted-foreground">Description</Label>
                    <p className="text-sm">{metadata.description}</p>
                  </div>
                )}

                {/* Image */}
                {metadata.image && (
                  <div>
                    <Label className="text-muted-foreground">Image URL</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs bg-muted p-2 rounded flex-1 truncate">
                        {metadata.image}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(metadata.image as string)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const imageUrl = metadata.image as string;
                          const url = imageUrl.startsWith('ipfs://')
                            ? imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/')
                            : imageUrl;
                          window.open(url, '_blank');
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Image Preview */}
                    <div className="mt-4">
                      <Label className="text-muted-foreground mb-2 block">Image Preview</Label>
                      {!imageLoadError ? (
                        <img
                          src={
                            metadata.image.startsWith('ipfs://')
                              ? metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
                              : metadata.image
                          }
                          alt={metadata.name as string}
                          className="max-w-xs rounded-lg border border-border"
                          onError={() => setImageLoadError(true)}
                        />
                      ) : (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Failed to load image. The URL may be incorrect or the image may not be accessible.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                )}

                {/* External URL */}
                {metadata.external_url && (
                  <div>
                    <Label className="text-muted-foreground">External URL</Label>
                    <a
                      href={metadata.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                    >
                      {metadata.external_url}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Raw JSON */}
              <div>
                <Label className="text-muted-foreground mb-2 block">Raw JSON</Label>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                  {JSON.stringify(metadata, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="border border-border rounded-lg p-4 bg-muted/20">
            <h3 className="font-semibold mb-2">DexScreener Requirements</h3>
            <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
              <li>Metadata must be publicly accessible (HTTP/HTTPS or IPFS)</li>
              <li>Must include a &quot;name&quot; field</li>
              <li>Must include an &quot;image&quot; field with a valid image URL</li>
              <li>Image should be accessible and in a common format (PNG, JPG, SVG)</li>
              <li>Recommended: Include &quot;description&quot; and &quot;external_url&quot; fields</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

