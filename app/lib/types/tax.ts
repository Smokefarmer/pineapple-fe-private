// Tax Management Types and Interfaces

export interface TaxInfo {
  currentBuyRate: number;    // Current buy tax rate in basis points
  currentSellRate: number;   // Current sell tax rate in basis points
  adminMinimum: number;      // Minimum tax rate enforced by admin
  canDecrease: boolean;      // Whether user can decrease taxes
  canDisable: boolean;       // Whether user can disable taxes (after 30 days)
  timeUntilDisable?: number; // Seconds until taxes can be disabled
}

export interface TaxDecreaseForm {
  newBuyRate: number;   // Input in percentage, convert to basis points
  newSellRate: number;  // Input in percentage, convert to basis points
}

export interface TaxValidationError {
  field: 'buyRate' | 'sellRate';
  message: string;
}

// Tax constants
export const TAX_CONSTANTS = {
  BASIS_POINTS: 10000,
  MIN_TAX_RATE: 400,    // 4%
  MAX_TAX_RATE: 700,    // 7%
  DISABLE_DELAY: 30 * 24 * 60 * 60, // 30 days in seconds
  DECAY_PERIOD: 10 * 60  // 10 minutes in seconds
};

// Utility functions for tax calculations
export const convertBasisPointsToPercentage = (basisPoints: number): number => {
  return basisPoints / 100;
};

export const convertPercentageToBasisPoints = (percentage: number): number => {
  return Math.floor(percentage * 100);
};

export const formatTaxRate = (basisPoints: number): string => {
  return `${(basisPoints / 100).toFixed(2)}%`;
};

// Tax validation function
export const validateTaxRates = (form: TaxDecreaseForm, currentRates: TaxInfo): TaxValidationError[] => {
  const errors: TaxValidationError[] = [];
  
  // Convert percentages to basis points for comparison
  const newBuyBps = convertPercentageToBasisPoints(form.newBuyRate);
  const newSellBps = convertPercentageToBasisPoints(form.newSellRate);
  
  if (newBuyBps > currentRates.currentBuyRate) {
    errors.push({
      field: 'buyRate',
      message: "Buy rate cannot be increased"
    });
  }
  
  if (newSellBps > currentRates.currentSellRate) {
    errors.push({
      field: 'sellRate',
      message: "Sell rate cannot be increased"
    });
  }
  
  if (newBuyBps < currentRates.adminMinimum) {
    errors.push({
      field: 'buyRate',
      message: `Buy rate cannot be below minimum (${formatTaxRate(currentRates.adminMinimum)})`
    });
  }
  
  if (newSellBps < currentRates.adminMinimum) {
    errors.push({
      field: 'sellRate',
      message: `Sell rate cannot be below minimum (${formatTaxRate(currentRates.adminMinimum)})`
    });
  }
  
  // Additional validation for reasonable ranges
  if (form.newBuyRate < 0) {
    errors.push({
      field: 'buyRate',
      message: "Buy rate cannot be negative"
    });
  }
  
  if (form.newSellRate < 0) {
    errors.push({
      field: 'sellRate',
      message: "Sell rate cannot be negative"
    });
  }
  
  if (form.newBuyRate > 100) {
    errors.push({
      field: 'buyRate',
      message: "Buy rate cannot exceed 100%"
    });
  }
  
  if (form.newSellRate > 100) {
    errors.push({
      field: 'sellRate',
      message: "Sell rate cannot exceed 100%"
    });
  }
  
  return errors;
};
