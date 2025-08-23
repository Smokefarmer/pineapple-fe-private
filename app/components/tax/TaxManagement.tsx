'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { Separator } from "@/app/components/ui/separator";
import { Skeleton } from "@/app/components/ui/skeleton";
import { 
  Settings, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2, 
  TrendingDown,
  Clock,
  Shield,
  Percent
} from "lucide-react";
import { useTaxManagement } from '@/app/lib/hooks/useTaxManagement';
import { 
  TaxDecreaseForm, 
  validateTaxRates, 
  formatTaxRate, 
  convertBasisPointsToPercentage,
  TaxValidationError 
} from '@/app/lib/types/tax';
import { toast } from 'sonner';

interface TaxManagementProps {
  tokenAddress?: string;
  creatorAddress?: string;
  launchTime?: number;
  isTokenLaunched?: boolean;
}

export default function TaxManagement({
  tokenAddress,
  creatorAddress,
  launchTime,
  isTokenLaunched = false
}: TaxManagementProps) {
  const [form, setForm] = useState<TaxDecreaseForm>({
    newBuyRate: 0,
    newSellRate: 0
  });
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const [validationErrors, setValidationErrors] = useState<TaxValidationError[]>([]);
  const [showEducationalContent, setShowEducationalContent] = useState(false);
  const [clientLaunchTime, setClientLaunchTime] = useState<number | undefined>(undefined);

  // Calculate launch time on client side to avoid hydration issues
  useEffect(() => {
    if (isTokenLaunched && !clientLaunchTime) {
      // Use a fixed calculation to avoid hydration mismatch
      const currentTime = Math.floor(Date.now() / 1000);
      setClientLaunchTime(currentTime - (29 * 24 * 60 * 60));
    }
  }, [isTokenLaunched, clientLaunchTime]);

  const {
    taxInfo,
    isLoading,
    error,
    decreaseTaxes,
    disableTaxes,
    isDecreasingTaxes,
    isDisablingTaxes,
    refetchTaxInfo
  } = useTaxManagement({
    tokenAddress,
    creatorAddress,
    launchTime: clientLaunchTime
  });

  // Initialize form with current tax rates
  useEffect(() => {
    if (taxInfo && !isFormInitialized) {
      setForm({
        newBuyRate: convertBasisPointsToPercentage(taxInfo.currentBuyRate),
        newSellRate: convertBasisPointsToPercentage(taxInfo.currentSellRate)
      });
      setIsFormInitialized(true);
    }
  }, [taxInfo, isFormInitialized]);

  // Validate form on changes
  useEffect(() => {
    if (taxInfo && isFormInitialized) {
      const errors = validateTaxRates(form, taxInfo);
      setValidationErrors(prev => {
        // Only update if errors have actually changed
        if (JSON.stringify(prev) !== JSON.stringify(errors)) {
          return errors;
        }
        return prev;
      });
    }
  }, [form, taxInfo, isFormInitialized]);

  const handleFormChange = (field: keyof TaxDecreaseForm, value: string) => {
    const numValue = value === '' ? 0 : (parseFloat(value) || 0);
    setForm(prev => ({
      ...prev,
      [field]: isNaN(numValue) ? 0 : numValue
    }));
  };

  const handleDecreaseTaxes = async () => {
    if (!taxInfo || validationErrors.length > 0) {
      toast.error('Please fix validation errors before proceeding');
      return;
    }

    try {
      await decreaseTaxes(form);
      toast.success('Tax decrease transaction submitted!');
    } catch (error: any) {
      toast.error('Failed to decrease taxes', {
        description: error.message
      });
    }
  };

  const handleDisableTaxes = async () => {
    if (!taxInfo?.canDisable) {
      toast.error('Taxes cannot be disabled yet');
      return;
    }

    try {
      await disableTaxes();
      toast.success('Tax disable transaction submitted!');
    } catch (error: any) {
      toast.error('Failed to disable taxes', {
        description: error.message
      });
    }
  };

  const formatTimeUntilDisable = (seconds: number): string => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  if (!isTokenLaunched) {
    return (
      <Card className="bg-card shadow-xl border border-border/40 rounded-lg opacity-50">
        <CardHeader className="px-6 pt-6 pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Settings className="h-5 w-5 text-muted-foreground" />
            4. Tax Management
          </CardTitle>
          <CardDescription className="mt-1">
            Manage your token's trading taxes after launch.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Tax management will be available after your token is launched and liquidity is added.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card shadow-xl border border-border/40 rounded-lg">
      <CardHeader className="px-6 pt-6 pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Settings className="h-5 w-5 text-primary" />
          4. Tax Management
        </CardTitle>
        <CardDescription className="mt-1">
          View and adjust your token's trading taxes.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 space-y-6">
        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Tax Information Display */}
        {taxInfo && (
          <>
            {/* Current Tax Rates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="h-4 w-4 text-green-500" />
                  <Label className="text-sm font-medium">Buy Tax</Label>
                </div>
                <div className="text-2xl font-bold text-green-500">
                  {formatTaxRate(taxInfo.currentBuyRate)}
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <Label className="text-sm font-medium">Sell Tax</Label>
                </div>
                <div className="text-2xl font-bold text-red-500">
                  {formatTaxRate(taxInfo.currentSellRate)}
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-yellow-500" />
                  <Label className="text-sm font-medium">Minimum</Label>
                </div>
                <div className="text-2xl font-bold text-yellow-500">
                  {formatTaxRate(taxInfo.adminMinimum)}
                </div>
              </div>
            </div>

            {/* Authorization Check */}
            {!taxInfo.canDecrease && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Only the token creator can modify tax rates.
                </AlertDescription>
              </Alert>
            )}

            {/* Tax Decrease Form */}
            {taxInfo.canDecrease && isFormInitialized && (
              <>
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Percent className="h-5 w-5" />
                    Decrease Tax Rates
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="newBuyRate">New Buy Tax Rate (%)</Label>
                      {isFormInitialized ? (
                        <Input
                          id="newBuyRate"
                          type="number"
                          step="0.01"
                          min="0"
                          max={convertBasisPointsToPercentage(taxInfo.currentBuyRate)}
                          value={form.newBuyRate.toString()}
                          onChange={(e) => handleFormChange('newBuyRate', e.target.value)}
                          className={validationErrors.some(e => e.field === 'buyRate') ? 'border-red-500' : ''}
                        />
                      ) : (
                        <Skeleton className="h-10 w-full" />
                      )}
                      {validationErrors
                        .filter(e => e.field === 'buyRate')
                        .map((error, index) => (
                          <p key={index} className="text-xs text-red-500 mt-1">
                            {error.message}
                          </p>
                        ))}
                    </div>
                    
                    <div>
                      <Label htmlFor="newSellRate">New Sell Tax Rate (%)</Label>
                      {isFormInitialized ? (
                        <Input
                          id="newSellRate"
                          type="number"
                          step="0.01"
                          min="0"
                          max={convertBasisPointsToPercentage(taxInfo.currentSellRate)}
                          value={form.newSellRate.toString()}
                          onChange={(e) => handleFormChange('newSellRate', e.target.value)}
                          className={validationErrors.some(e => e.field === 'sellRate') ? 'border-red-500' : ''}
                        />
                      ) : (
                        <Skeleton className="h-10 w-full" />
                      )}
                      {validationErrors
                        .filter(e => e.field === 'sellRate')
                        .map((error, index) => (
                          <p key={index} className="text-xs text-red-500 mt-1">
                            {error.message}
                          </p>
                        ))}
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleDecreaseTaxes}
                    disabled={isDecreasingTaxes || validationErrors.length > 0}
                    className="w-full"
                  >
                    {isDecreasingTaxes ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Decreasing Taxes...
                      </>
                    ) : (
                      <>
                        <TrendingDown className="mr-2 h-4 w-4" />
                        Decrease Taxes
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}

            {/* Disable Taxes Section */}
            {taxInfo.canDecrease && (
              <>
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Disable Creator Taxes
                  </h3>
                  
                  {taxInfo.canDisable ? (
                    <div>
                      <Alert className="mb-4">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertDescription>
                          Your token has been launched for over 30 days. You can now completely disable creator taxes.
                        </AlertDescription>
                      </Alert>
                      
                      <Button
                        onClick={handleDisableTaxes}
                        disabled={isDisablingTaxes}
                        variant="destructive"
                        className="w-full"
                      >
                        {isDisablingTaxes ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Disabling Taxes...
                          </>
                        ) : (
                          <>
                            <Shield className="mr-2 h-4 w-4" />
                            Disable All Creator Taxes
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <Alert>
                      <Clock className="h-4 w-4" />
                      <AlertDescription>
                        Creator taxes can be disabled 30 days after launch.
                        {taxInfo.timeUntilDisable && taxInfo.timeUntilDisable > 0 && (
                          <> Time remaining: <strong>{formatTimeUntilDisable(taxInfo.timeUntilDisable)}</strong></>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </>
            )}

            {/* Educational Content Toggle */}
            <Separator />
            
            <Button
              variant="outline"
              onClick={() => setShowEducationalContent(!showEducationalContent)}
              className="w-full"
            >
              <Info className="mr-2 h-4 w-4" />
              {showEducationalContent ? 'Hide' : 'Show'} Tax Information
            </Button>
            
            {showEducationalContent && (
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <h4 className="font-semibold mb-2">Tax Decrease Information</h4>
                  <p className="text-sm text-muted-foreground">
                    As a token creator, you can reduce your token's trading taxes to make it more attractive to traders. However, there are important restrictions:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li><strong>You can only decrease taxes, never increase them</strong></li>
                    <li><strong>Minimum rates apply</strong> - you cannot go below the current minimum rate</li>
                    <li><strong>Changes are permanent</strong> - once you lower taxes, you cannot raise them again</li>
                    <li><strong>30-day rule</strong> - after 30 days from launch, you can completely disable creator taxes</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Current Tax Structure</h4>
                  <p className="text-sm text-muted-foreground">
                    Your token has two types of taxes:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li><strong>Creator Taxes</strong> - These go to you and any revenue sharing partners you've set up</li>
                    <li><strong>Admin Taxes</strong> - These are protocol fees that decrease over time according to preset phases</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    The total tax paid by traders is the sum of both creator and admin taxes.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Admin Phase Information</h4>
                  <p className="text-sm text-muted-foreground">
                    Admin taxes follow a phased reduction schedule:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li><strong>Phase A</strong> - Higher admin tax rate for initial period</li>
                    <li><strong>Phase B</strong> - Reduced admin tax rate for second period</li>
                    <li><strong>Phase C</strong> - Final admin tax rate (often 0%) that continues indefinitely</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    You cannot set creator taxes below the current minimum rate.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
