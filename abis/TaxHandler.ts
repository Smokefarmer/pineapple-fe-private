export default [
  {
    "inputs": [
      {
        "internalType": "contract ISystemContext",
        "name": "_systemContext",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_adminWallet",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_uniswapV2Router",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256[3]",
        "name": "rates",
        "type": "uint256[3]"
      },
      {
        "indexed": false,
        "internalType": "uint256[3]",
        "name": "durations",
        "type": "uint256[3]"
      }
    ],
    "name": "AdminPhasesSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "oldWallet",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newWallet",
        "type": "address"
      }
    ],
    "name": "AdminWalletUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      }
    ],
    "name": "ConfigRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newThresholdBps",
        "type": "uint256"
      }
    ],
    "name": "DefaultSwapThresholdUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "enabled",
        "type": "bool"
      }
    ],
    "name": "GlobalSwapAndLiquifyEnabledUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "LiquidityTimestampSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "pair",
        "type": "address"
      }
    ],
    "name": "PairAddressSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "oldRouter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newRouter",
        "type": "address"
      }
    ],
    "name": "RouterUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokensSwapped",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "ethReceived",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "adminAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "user1Amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "user2Amount",
        "type": "uint256"
      }
    ],
    "name": "SwapAndLiquify",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "enabled",
        "type": "bool"
      }
    ],
    "name": "SwapAndLiquifyEnabledUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newThreshold",
        "type": "uint256"
      }
    ],
    "name": "SwapThresholdUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "guid",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "flatBuyTax",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "flatSellTax",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "startBuyTax",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "startSellTax",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint32",
            "name": "rateBps",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "duration",
            "type": "uint32"
          }
        ],
        "indexed": false,
        "internalType": "struct ILaunchRegistry.AdminPhase[3]",
        "name": "adminPhases",
        "type": "tuple[3]"
      }
    ],
    "name": "TaxConfigRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "guid",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "taxAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "adminRecipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "adminAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "user1Recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "user1Amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "user2Recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "user2Amount",
        "type": "uint256"
      }
    ],
    "name": "TaxPaid",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newBuyRate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newSellRate",
        "type": "uint256"
      }
    ],
    "name": "TaxesAdjusted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "TaxesDisabled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user2",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "share",
        "type": "uint256"
      }
    ],
    "name": "User2Set",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "FEE_UPDATE_INTERVAL",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "adminWallet",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "buyFees",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "adminAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "user1Amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "user2Amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "total",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "guid",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "pairAddress",
        "type": "address"
      }
    ],
    "name": "calculateTaxAmounts",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "taxAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "adminAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "user1Amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "user2Amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "newBuyRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "newSellRate",
        "type": "uint256"
      }
    ],
    "name": "decreaseTaxes",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "defaultSwapThresholdParts",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "disableTaxes",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "emergencyWithdrawETH",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "emergencyWithdrawTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "getCurrentTaxRates",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "buyRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "sellRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "adminMinimum",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "getSwapConfig",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "accumulatedTotalTokens",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "accumulatedAdminTokens",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "accumulatedUser1Tokens",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "accumulatedUser2Tokens",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "swapThreshold",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "swapAndLiquifyEnabled",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "pairAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "effectiveThreshold",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "globalSwapAndLiquifyEnabled",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "isTokenSwapLocked",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "lastFeeUpdate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "manualSwapAndLiquify",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "guid",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "adminAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "user1Amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "user2Amount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isBuy",
        "type": "bool"
      }
    ],
    "name": "recordTaxAndSwap",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "guid",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "flatBuyTax",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "flatSellTax",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startBuyTax",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startSellTax",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user2Recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "user2Share",
        "type": "uint256"
      },
      {
        "internalType": "uint256[3]",
        "name": "adminRatesBps",
        "type": "uint256[3]"
      },
      {
        "internalType": "uint256[3]",
        "name": "adminDurations",
        "type": "uint256[3]"
      }
    ],
    "name": "registerTaxConfig",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "resetAccumulator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "sellFees",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "adminAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "user1Amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "user2Amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "total",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newWallet",
        "type": "address"
      }
    ],
    "name": "setAdminWallet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "newThresholdParts",
        "type": "uint256"
      }
    ],
    "name": "setDefaultSwapThreshold",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "enabled",
        "type": "bool"
      }
    ],
    "name": "setGlobalSwapAndLiquifyEnabled",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "setLiquidityAddedAt",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "pair",
        "type": "address"
      }
    ],
    "name": "setPairAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newRouter",
        "type": "address"
      }
    ],
    "name": "setRouter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "enabled",
        "type": "bool"
      }
    ],
    "name": "setTokenSwapAndLiquifyEnabled",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "newThreshold",
        "type": "uint256"
      }
    ],
    "name": "setTokenSwapThreshold",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "user2",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "user2Share",
        "type": "uint256"
      }
    ],
    "name": "setUser2Recipient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "shouldTriggerSwap",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "swapConfigs",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "accumulatedTotalTokens",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "accumulatedAdminTokens",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "accumulatedUser1Tokens",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "accumulatedUser2Tokens",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "swapThreshold",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "swapAndLiquifyEnabled",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "pairAddress",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "systemContext",
    "outputs": [
      {
        "internalType": "contract ISystemContext",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "uniswapV2Router",
    "outputs": [
      {
        "internalType": "contract IUniswapV2Router02",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "guid",
        "type": "bytes32"
      }
    ],
    "name": "updateDynamicFees",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
] as const;
