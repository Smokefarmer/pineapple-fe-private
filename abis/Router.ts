export default [
  {
    "inputs": [
      {
        "internalType": "contract ISystemContext",
        "name": "_systemContext",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "IncorrectETHAmount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientTokenBalance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidSignatureLength",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidSignatureSigner",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LiquidityAlreadyAdded",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SignatureVerificationFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TokenTransferFailed",
    "type": "error"
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
        "indexed": false,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "mintedAt",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "backingETH",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenPercent",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "taxRecipient",
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
        "indexed": false,
        "internalType": "address",
        "name": "user2Recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "user2Share",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256[3]",
        "name": "adminRatesBps",
        "type": "uint256[3]"
      },
      {
        "indexed": false,
        "internalType": "uint256[3]",
        "name": "adminDurations",
        "type": "uint256[3]"
      }
    ],
    "name": "LaunchTokenCreated",
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
        "name": "pair",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "LiquidityAdded",
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
        "name": "pair",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "lockId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "unlockDate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "txHash",
        "type": "bytes32"
      }
    ],
    "name": "LiquidityLocked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "guid",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "name": "addLiquiditySigned",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
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
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "totalSupply",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "taxRecipient",
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
        "internalType": "string",
        "name": "metaDataURI",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "liquidityBackingETH",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "liquidityTokenPercent",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "whitelistOnlyDuration",
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
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "name": "deployToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
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
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "ethAmount",
        "type": "uint256"
      }
    ],
    "name": "getAddLiquidityMessageToSign",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
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
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "totalSupply",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "taxRecipient",
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
        "internalType": "string",
        "name": "metaDataURI",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "liquidityBackingETH",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "liquidityTokenPercent",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "whitelistOnlyDuration",
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
      }
    ],
    "name": "getCreateTokenMessageToSign",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
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
      }
    ],
    "name": "getToken",
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
    "inputs": [],
    "name": "owner",
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
    "inputs": [],
    "name": "renounceOwnership",
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
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
] as const;
