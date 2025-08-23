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
        "internalType": "uint32[3]",
        "name": "rates",
        "type": "uint32[3]"
      },
      {
        "indexed": false,
        "internalType": "uint32[3]",
        "name": "durations",
        "type": "uint32[3]"
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
    "name": "handleTax",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "taxAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "adminRecipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "adminAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user1Recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "user1Amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user2Recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "user2Amount",
        "type": "uint256"
      }
    ],
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
        "internalType": "uint32[3]",
        "name": "adminRatesBps",
        "type": "uint32[3]"
      },
      {
        "internalType": "uint32[3]",
        "name": "adminDurations",
        "type": "uint32[3]"
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
  }
] as const;
