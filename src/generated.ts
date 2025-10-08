import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PineappleAccessControl
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pineappleAccessControlAbi = [
  {
    type: 'constructor',
    inputs: [{ name: 'admin', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Router
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const routerAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_systemContext',
        internalType: 'contract ISystemContext',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'IncorrectETHAmount' },
  { type: 'error', inputs: [], name: 'InsufficientTokenBalance' },
  { type: 'error', inputs: [], name: 'InvalidSignatureLength' },
  { type: 'error', inputs: [], name: 'InvalidSignatureSigner' },
  { type: 'error', inputs: [], name: 'LiquidityAlreadyAdded' },
  { type: 'error', inputs: [], name: 'SignatureVerificationFailed' },
  { type: 'error', inputs: [], name: 'TokenTransferFailed' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'mintedAt',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'backingETH',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tokenPercent',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'taxRecipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'flatBuyTax',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'flatSellTax',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'startBuyTax',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'startSellTax',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'user2Recipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'user2Share',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'adminRatesBps',
        internalType: 'uint256[3]',
        type: 'uint256[3]',
        indexed: false,
      },
      {
        name: 'adminDurations',
        internalType: 'uint256[3]',
        type: 'uint256[3]',
        indexed: false,
      },
    ],
    name: 'LaunchTokenCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'pair', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LiquidityAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'pair', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'lockId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'unlockDate',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'txHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'LiquidityLocked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'addLiquiditySigned',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'totalSupply', internalType: 'uint256', type: 'uint256' },
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'taxRecipient', internalType: 'address', type: 'address' },
      { name: 'flatBuyTax', internalType: 'uint256', type: 'uint256' },
      { name: 'flatSellTax', internalType: 'uint256', type: 'uint256' },
      { name: 'startBuyTax', internalType: 'uint256', type: 'uint256' },
      { name: 'startSellTax', internalType: 'uint256', type: 'uint256' },
      { name: 'metaDataURI', internalType: 'string', type: 'string' },
      { name: 'liquidityBackingETH', internalType: 'uint256', type: 'uint256' },
      {
        name: 'liquidityTokenPercent',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'whitelistOnlyDuration',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'adminRatesBps', internalType: 'uint256[3]', type: 'uint256[3]' },
      {
        name: 'adminDurations',
        internalType: 'uint256[3]',
        type: 'uint256[3]',
      },
      { name: 'user2Recipient', internalType: 'address', type: 'address' },
      { name: 'user2Share', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'deployToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'ethAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAddLiquidityMessageToSign',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'totalSupply', internalType: 'uint256', type: 'uint256' },
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'taxRecipient', internalType: 'address', type: 'address' },
      { name: 'flatBuyTax', internalType: 'uint256', type: 'uint256' },
      { name: 'flatSellTax', internalType: 'uint256', type: 'uint256' },
      { name: 'startBuyTax', internalType: 'uint256', type: 'uint256' },
      { name: 'startSellTax', internalType: 'uint256', type: 'uint256' },
      { name: 'metaDataURI', internalType: 'string', type: 'string' },
      { name: 'liquidityBackingETH', internalType: 'uint256', type: 'uint256' },
      {
        name: 'liquidityTokenPercent',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'whitelistOnlyDuration',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'adminRatesBps', internalType: 'uint256[3]', type: 'uint256[3]' },
      {
        name: 'adminDurations',
        internalType: 'uint256[3]',
        type: 'uint256[3]',
      },
      { name: 'user2Recipient', internalType: 'address', type: 'address' },
      { name: 'user2Share', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getCreateTokenMessageToSign',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'guid', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'systemContext',
    outputs: [
      { name: '', internalType: 'contract ISystemContext', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const routerAddress = {
  1: '0x0000000000000000000000000000000000000000',
  56: '0x301e4D7a3dA5Eef64038190E4968C51D5c5b6c46',
  97: '0x072b4B787DDD8e6C78F416fCCD84f3a4dB591549',
  11155111: '0x8D01f620E9Ce74BD2F30027Bc94E5cCb17F2dad1',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const routerConfig = { address: routerAddress, abi: routerAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SystemContext
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xc3b77fdd9cbced4309052fb8f77b39853e2306cd)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x2f33f8f62e0b34ce0e50ed3fa2156432c8e4ea11)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1a5575fbf905c8d37d2698da98656f60ee07e2c0)
 */
export const systemContextAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'acl_',
        internalType: 'contract IAccessControl',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'ContractNotRegistered' },
  { type: 'error', inputs: [], name: 'OnlySystemContextAdmin' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroId' },
  {
    type: 'function',
    inputs: [],
    name: 'acl',
    outputs: [
      { name: '', internalType: 'contract IAccessControl', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getContract',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'name', internalType: 'string', type: 'string' }],
    name: 'getContractByName',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'bytes32', type: 'bytes32' },
      { name: 'adr', internalType: 'address', type: 'address' },
    ],
    name: 'setContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'adr', internalType: 'address', type: 'address' },
    ],
    name: 'setContractByName',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xc3b77fdd9cbced4309052fb8f77b39853e2306cd)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x2f33f8f62e0b34ce0e50ed3fa2156432c8e4ea11)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1a5575fbf905c8d37d2698da98656f60ee07e2c0)
 */
export const systemContextAddress = {
  1: '0x0000000000000000000000000000000000000000',
  56: '0xC3b77fDD9CbCeD4309052FB8F77b39853e2306CD',
  97: '0x2f33f8f62e0b34ce0e50eD3fA2156432C8e4Ea11',
  11155111: '0x1a5575FBF905C8d37D2698da98656F60EE07E2C0',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xc3b77fdd9cbced4309052fb8f77b39853e2306cd)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x2f33f8f62e0b34ce0e50ed3fa2156432c8e4ea11)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1a5575fbf905c8d37d2698da98656f60ee07e2c0)
 */
export const systemContextConfig = {
  address: systemContextAddress,
  abi: systemContextAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TaxHandler
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const taxHandlerAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_systemContext',
        internalType: 'contract ISystemContext',
        type: 'address',
      },
      { name: '_adminWallet', internalType: 'address', type: 'address' },
      { name: '_uniswapV2Router', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'rates',
        internalType: 'uint256[3]',
        type: 'uint256[3]',
        indexed: false,
      },
      {
        name: 'durations',
        internalType: 'uint256[3]',
        type: 'uint256[3]',
        indexed: false,
      },
    ],
    name: 'AdminPhasesSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldWallet',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newWallet',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminWalletUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ConfigRegistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newThresholdBps',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DefaultSwapThresholdUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'enabled', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'GlobalSwapAndLiquifyEnabledUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LiquidityTimestampSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'pair', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'PairAddressSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldRouter',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newRouter',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'RouterUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokensSwapped',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'ethReceived',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'adminAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'user1Amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'user2Amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SwapAndLiquify',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'enabled', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'SwapAndLiquifyEnabledUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newThreshold',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SwapThresholdUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'flatBuyTax',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'flatSellTax',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'startBuyTax',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'startSellTax',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'adminPhases',
        internalType: 'struct ILaunchRegistry.AdminPhase[3]',
        type: 'tuple[3]',
        components: [
          { name: 'rateBps', internalType: 'uint32', type: 'uint32' },
          { name: 'duration', internalType: 'uint32', type: 'uint32' },
        ],
        indexed: false,
      },
    ],
    name: 'TaxConfigRegistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'taxAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'adminRecipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'adminAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'user1Recipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'user1Amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'user2Recipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'user2Amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TaxPaid',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newBuyRate',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newSellRate',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TaxesAdjusted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TaxesDisabled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'user2',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'share',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'User2Set',
  },
  {
    type: 'function',
    inputs: [],
    name: 'adminWallet',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'pairAddress', internalType: 'address', type: 'address' },
    ],
    name: 'calculateTaxAmounts',
    outputs: [
      { name: 'taxAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'adminAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'user1Amount', internalType: 'uint256', type: 'uint256' },
      { name: 'user2Amount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'newBuyRate', internalType: 'uint256', type: 'uint256' },
      { name: 'newSellRate', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseTaxes',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultSwapThresholdParts',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'disableTaxes',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'emergencyWithdrawETH',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'emergencyWithdrawTokens',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'getCurrentTaxRates',
    outputs: [
      { name: 'buyRate', internalType: 'uint256', type: 'uint256' },
      { name: 'sellRate', internalType: 'uint256', type: 'uint256' },
      { name: 'adminMinimum', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'getSwapConfig',
    outputs: [
      {
        name: 'accumulatedTotalTokens',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'accumulatedAdminTokens',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'accumulatedUser1Tokens',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'accumulatedUser2Tokens',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'swapThreshold', internalType: 'uint256', type: 'uint256' },
      { name: 'swapAndLiquifyEnabled', internalType: 'bool', type: 'bool' },
      { name: 'pairAddress', internalType: 'address', type: 'address' },
      { name: 'effectiveThreshold', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'globalSwapAndLiquifyEnabled',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'isTokenSwapLocked',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'manualSwapAndLiquify',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'adminAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'user1Amount', internalType: 'uint256', type: 'uint256' },
      { name: 'user2Amount', internalType: 'uint256', type: 'uint256' },
      { name: 'isBuy', internalType: 'bool', type: 'bool' },
    ],
    name: 'recordTaxAndSwap',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'flatBuyTax', internalType: 'uint256', type: 'uint256' },
      { name: 'flatSellTax', internalType: 'uint256', type: 'uint256' },
      { name: 'startBuyTax', internalType: 'uint256', type: 'uint256' },
      { name: 'startSellTax', internalType: 'uint256', type: 'uint256' },
      { name: 'user2Recipient', internalType: 'address', type: 'address' },
      { name: 'user2Share', internalType: 'uint256', type: 'uint256' },
      { name: 'adminRatesBps', internalType: 'uint256[3]', type: 'uint256[3]' },
      {
        name: 'adminDurations',
        internalType: 'uint256[3]',
        type: 'uint256[3]',
      },
    ],
    name: 'registerTaxConfig',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'resetAccumulator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newWallet', internalType: 'address', type: 'address' }],
    name: 'setAdminWallet',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newThresholdParts', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setDefaultSwapThreshold',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'enabled', internalType: 'bool', type: 'bool' }],
    name: 'setGlobalSwapAndLiquifyEnabled',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setLiquidityAddedAt',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'pair', internalType: 'address', type: 'address' },
    ],
    name: 'setPairAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newRouter', internalType: 'address', type: 'address' }],
    name: 'setRouter',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'enabled', internalType: 'bool', type: 'bool' },
    ],
    name: 'setTokenSwapAndLiquifyEnabled',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'newThreshold', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setTokenSwapThreshold',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'user2', internalType: 'address', type: 'address' },
      { name: 'user2Share', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setUser2Recipient',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'shouldTriggerSwap',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'swapConfigs',
    outputs: [
      {
        name: 'accumulatedTotalTokens',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'accumulatedAdminTokens',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'accumulatedUser1Tokens',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'accumulatedUser2Tokens',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'swapThreshold', internalType: 'uint256', type: 'uint256' },
      { name: 'swapAndLiquifyEnabled', internalType: 'bool', type: 'bool' },
      { name: 'pairAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'systemContext',
    outputs: [
      { name: '', internalType: 'contract ISystemContext', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'uniswapV2Router',
    outputs: [
      {
        name: '',
        internalType: 'contract IUniswapV2Router02',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const taxHandlerAddress = {
  1: '0x0000000000000000000000000000000000000000',
  56: '0x9C0225c1Cf39bd8c3cF679d8Dd2B449094c61CC0',
  97: '0xE3ca56e113D8A942932B891CBd99725d3950694B',
  11155111: '0xaF1bE58F1C820A2Bfe87EDF60d90Bb682a9D55B3',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const taxHandlerConfig = {
  address: taxHandlerAddress,
  abi: taxHandlerAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Whitelist
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const whitelistAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_systemContext',
        internalType: 'contract ISystemContext',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WhitelistBuyRecorded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'allowance',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WhitelistEntryAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'WhitelistEntryRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32', indexed: true },
    ],
    name: 'WhitelistFinalized',
  },
  {
    type: 'function',
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'entries',
        internalType: 'struct MasterLaunchWhitelist.WhitelistEntry[]',
        type: 'tuple[]',
        components: [
          { name: 'user', internalType: 'address', type: 'address' },
          { name: 'allowance', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'addManyToWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addToWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowancePerUser',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'boughtAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
      { name: 'users', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'clearWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'guid', internalType: 'bytes32', type: 'bytes32' }],
    name: 'finalizeWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'isWhitelisted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'recordBuy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'remainingAllowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'removeFromWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'systemContext',
    outputs: [
      { name: '', internalType: 'contract ISystemContext', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'whitelistFinalized',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'whitelists',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const whitelistAddress = {
  1: '0x0000000000000000000000000000000000000000',
  56: '0x3c979BA68662Da5BCd7e42D69b88731D26Bd4286',
  97: '0x32B3302f2f9e15a93864AB3085585afB8690d00d',
  11155111: '0xB9412e3a43531053e7d3694ea7f9ee44660944Ad',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const whitelistConfig = {
  address: whitelistAddress,
  abi: whitelistAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pineappleAccessControlAbi}__
 */
export const useReadPineappleAccessControl =
  /*#__PURE__*/ createUseReadContract({ abi: pineappleAccessControlAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pineappleAccessControlAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadPineappleAccessControlDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: pineappleAccessControlAbi,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pineappleAccessControlAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadPineappleAccessControlGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: pineappleAccessControlAbi,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pineappleAccessControlAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadPineappleAccessControlHasRole =
  /*#__PURE__*/ createUseReadContract({
    abi: pineappleAccessControlAbi,
    functionName: 'hasRole',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pineappleAccessControlAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadPineappleAccessControlSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: pineappleAccessControlAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pineappleAccessControlAbi}__
 */
export const useWritePineappleAccessControl =
  /*#__PURE__*/ createUseWriteContract({ abi: pineappleAccessControlAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pineappleAccessControlAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWritePineappleAccessControlGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: pineappleAccessControlAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pineappleAccessControlAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWritePineappleAccessControlRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: pineappleAccessControlAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pineappleAccessControlAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWritePineappleAccessControlRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: pineappleAccessControlAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pineappleAccessControlAbi}__
 */
export const useSimulatePineappleAccessControl =
  /*#__PURE__*/ createUseSimulateContract({ abi: pineappleAccessControlAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pineappleAccessControlAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulatePineappleAccessControlGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pineappleAccessControlAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pineappleAccessControlAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulatePineappleAccessControlRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pineappleAccessControlAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pineappleAccessControlAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulatePineappleAccessControlRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pineappleAccessControlAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pineappleAccessControlAbi}__
 */
export const useWatchPineappleAccessControlEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: pineappleAccessControlAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pineappleAccessControlAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchPineappleAccessControlRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pineappleAccessControlAbi,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pineappleAccessControlAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchPineappleAccessControlRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pineappleAccessControlAbi,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pineappleAccessControlAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchPineappleAccessControlRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pineappleAccessControlAbi,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useReadRouter = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  address: routerAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"getAddLiquidityMessageToSign"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useReadRouterGetAddLiquidityMessageToSign =
  /*#__PURE__*/ createUseReadContract({
    abi: routerAbi,
    address: routerAddress,
    functionName: 'getAddLiquidityMessageToSign',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"getCreateTokenMessageToSign"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useReadRouterGetCreateTokenMessageToSign =
  /*#__PURE__*/ createUseReadContract({
    abi: routerAbi,
    address: routerAddress,
    functionName: 'getCreateTokenMessageToSign',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"getToken"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useReadRouterGetToken = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  address: routerAddress,
  functionName: 'getToken',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useReadRouterOwner = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  address: routerAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"systemContext"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useReadRouterSystemContext = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  address: routerAddress,
  functionName: 'systemContext',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useWriteRouter = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  address: routerAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"addLiquiditySigned"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useWriteRouterAddLiquiditySigned =
  /*#__PURE__*/ createUseWriteContract({
    abi: routerAbi,
    address: routerAddress,
    functionName: 'addLiquiditySigned',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"deployToken"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useWriteRouterDeployToken = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  address: routerAddress,
  functionName: 'deployToken',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useWriteRouterRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: routerAbi,
    address: routerAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useWriteRouterTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: routerAbi,
    address: routerAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useSimulateRouter = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  address: routerAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"addLiquiditySigned"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useSimulateRouterAddLiquiditySigned =
  /*#__PURE__*/ createUseSimulateContract({
    abi: routerAbi,
    address: routerAddress,
    functionName: 'addLiquiditySigned',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"deployToken"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useSimulateRouterDeployToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: routerAbi,
    address: routerAddress,
    functionName: 'deployToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useSimulateRouterRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: routerAbi,
    address: routerAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useSimulateRouterTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: routerAbi,
    address: routerAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useWatchRouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  address: routerAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"LaunchTokenCreated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useWatchRouterLaunchTokenCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: routerAbi,
    address: routerAddress,
    eventName: 'LaunchTokenCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"LiquidityAdded"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useWatchRouterLiquidityAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: routerAbi,
    address: routerAddress,
    eventName: 'LiquidityAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"LiquidityLocked"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useWatchRouterLiquidityLockedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: routerAbi,
    address: routerAddress,
    eventName: 'LiquidityLocked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x301e4d7a3da5eef64038190e4968c51d5c5b6c46)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x072b4b787ddd8e6c78f416fccd84f3a4db591549)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1)
 */
export const useWatchRouterOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: routerAbi,
    address: routerAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link systemContextAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xc3b77fdd9cbced4309052fb8f77b39853e2306cd)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x2f33f8f62e0b34ce0e50ed3fa2156432c8e4ea11)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1a5575fbf905c8d37d2698da98656f60ee07e2c0)
 */
export const useReadSystemContext = /*#__PURE__*/ createUseReadContract({
  abi: systemContextAbi,
  address: systemContextAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link systemContextAbi}__ and `functionName` set to `"acl"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xc3b77fdd9cbced4309052fb8f77b39853e2306cd)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x2f33f8f62e0b34ce0e50ed3fa2156432c8e4ea11)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1a5575fbf905c8d37d2698da98656f60ee07e2c0)
 */
export const useReadSystemContextAcl = /*#__PURE__*/ createUseReadContract({
  abi: systemContextAbi,
  address: systemContextAddress,
  functionName: 'acl',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link systemContextAbi}__ and `functionName` set to `"getContract"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xc3b77fdd9cbced4309052fb8f77b39853e2306cd)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x2f33f8f62e0b34ce0e50ed3fa2156432c8e4ea11)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1a5575fbf905c8d37d2698da98656f60ee07e2c0)
 */
export const useReadSystemContextGetContract =
  /*#__PURE__*/ createUseReadContract({
    abi: systemContextAbi,
    address: systemContextAddress,
    functionName: 'getContract',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link systemContextAbi}__ and `functionName` set to `"getContractByName"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xc3b77fdd9cbced4309052fb8f77b39853e2306cd)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x2f33f8f62e0b34ce0e50ed3fa2156432c8e4ea11)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1a5575fbf905c8d37d2698da98656f60ee07e2c0)
 */
export const useReadSystemContextGetContractByName =
  /*#__PURE__*/ createUseReadContract({
    abi: systemContextAbi,
    address: systemContextAddress,
    functionName: 'getContractByName',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link systemContextAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xc3b77fdd9cbced4309052fb8f77b39853e2306cd)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x2f33f8f62e0b34ce0e50ed3fa2156432c8e4ea11)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1a5575fbf905c8d37d2698da98656f60ee07e2c0)
 */
export const useWriteSystemContext = /*#__PURE__*/ createUseWriteContract({
  abi: systemContextAbi,
  address: systemContextAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link systemContextAbi}__ and `functionName` set to `"setContract"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xc3b77fdd9cbced4309052fb8f77b39853e2306cd)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x2f33f8f62e0b34ce0e50ed3fa2156432c8e4ea11)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1a5575fbf905c8d37d2698da98656f60ee07e2c0)
 */
export const useWriteSystemContextSetContract =
  /*#__PURE__*/ createUseWriteContract({
    abi: systemContextAbi,
    address: systemContextAddress,
    functionName: 'setContract',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link systemContextAbi}__ and `functionName` set to `"setContractByName"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xc3b77fdd9cbced4309052fb8f77b39853e2306cd)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x2f33f8f62e0b34ce0e50ed3fa2156432c8e4ea11)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1a5575fbf905c8d37d2698da98656f60ee07e2c0)
 */
export const useWriteSystemContextSetContractByName =
  /*#__PURE__*/ createUseWriteContract({
    abi: systemContextAbi,
    address: systemContextAddress,
    functionName: 'setContractByName',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link systemContextAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xc3b77fdd9cbced4309052fb8f77b39853e2306cd)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x2f33f8f62e0b34ce0e50ed3fa2156432c8e4ea11)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1a5575fbf905c8d37d2698da98656f60ee07e2c0)
 */
export const useSimulateSystemContext = /*#__PURE__*/ createUseSimulateContract(
  { abi: systemContextAbi, address: systemContextAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link systemContextAbi}__ and `functionName` set to `"setContract"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xc3b77fdd9cbced4309052fb8f77b39853e2306cd)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x2f33f8f62e0b34ce0e50ed3fa2156432c8e4ea11)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1a5575fbf905c8d37d2698da98656f60ee07e2c0)
 */
export const useSimulateSystemContextSetContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: systemContextAbi,
    address: systemContextAddress,
    functionName: 'setContract',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link systemContextAbi}__ and `functionName` set to `"setContractByName"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xc3b77fdd9cbced4309052fb8f77b39853e2306cd)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x2f33f8f62e0b34ce0e50ed3fa2156432c8e4ea11)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1a5575fbf905c8d37d2698da98656f60ee07e2c0)
 */
export const useSimulateSystemContextSetContractByName =
  /*#__PURE__*/ createUseSimulateContract({
    abi: systemContextAbi,
    address: systemContextAddress,
    functionName: 'setContractByName',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link taxHandlerAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useReadTaxHandler = /*#__PURE__*/ createUseReadContract({
  abi: taxHandlerAbi,
  address: taxHandlerAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"adminWallet"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useReadTaxHandlerAdminWallet = /*#__PURE__*/ createUseReadContract(
  {
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'adminWallet',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"calculateTaxAmounts"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useReadTaxHandlerCalculateTaxAmounts =
  /*#__PURE__*/ createUseReadContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'calculateTaxAmounts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"defaultSwapThresholdParts"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useReadTaxHandlerDefaultSwapThresholdParts =
  /*#__PURE__*/ createUseReadContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'defaultSwapThresholdParts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"getCurrentTaxRates"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useReadTaxHandlerGetCurrentTaxRates =
  /*#__PURE__*/ createUseReadContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'getCurrentTaxRates',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"getSwapConfig"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useReadTaxHandlerGetSwapConfig =
  /*#__PURE__*/ createUseReadContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'getSwapConfig',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"globalSwapAndLiquifyEnabled"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useReadTaxHandlerGlobalSwapAndLiquifyEnabled =
  /*#__PURE__*/ createUseReadContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'globalSwapAndLiquifyEnabled',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"isTokenSwapLocked"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useReadTaxHandlerIsTokenSwapLocked =
  /*#__PURE__*/ createUseReadContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'isTokenSwapLocked',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"shouldTriggerSwap"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useReadTaxHandlerShouldTriggerSwap =
  /*#__PURE__*/ createUseReadContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'shouldTriggerSwap',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"swapConfigs"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useReadTaxHandlerSwapConfigs = /*#__PURE__*/ createUseReadContract(
  {
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'swapConfigs',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"systemContext"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useReadTaxHandlerSystemContext =
  /*#__PURE__*/ createUseReadContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'systemContext',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"uniswapV2Router"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useReadTaxHandlerUniswapV2Router =
  /*#__PURE__*/ createUseReadContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'uniswapV2Router',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWriteTaxHandler = /*#__PURE__*/ createUseWriteContract({
  abi: taxHandlerAbi,
  address: taxHandlerAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"decreaseTaxes"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWriteTaxHandlerDecreaseTaxes =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'decreaseTaxes',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"disableTaxes"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWriteTaxHandlerDisableTaxes =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'disableTaxes',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"emergencyWithdrawETH"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWriteTaxHandlerEmergencyWithdrawEth =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'emergencyWithdrawETH',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"emergencyWithdrawTokens"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWriteTaxHandlerEmergencyWithdrawTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'emergencyWithdrawTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"manualSwapAndLiquify"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWriteTaxHandlerManualSwapAndLiquify =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'manualSwapAndLiquify',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"recordTaxAndSwap"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWriteTaxHandlerRecordTaxAndSwap =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'recordTaxAndSwap',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"registerTaxConfig"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWriteTaxHandlerRegisterTaxConfig =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'registerTaxConfig',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"resetAccumulator"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWriteTaxHandlerResetAccumulator =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'resetAccumulator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setAdminWallet"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWriteTaxHandlerSetAdminWallet =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setAdminWallet',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setDefaultSwapThreshold"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWriteTaxHandlerSetDefaultSwapThreshold =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setDefaultSwapThreshold',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setGlobalSwapAndLiquifyEnabled"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWriteTaxHandlerSetGlobalSwapAndLiquifyEnabled =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setGlobalSwapAndLiquifyEnabled',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setLiquidityAddedAt"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWriteTaxHandlerSetLiquidityAddedAt =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setLiquidityAddedAt',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setPairAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWriteTaxHandlerSetPairAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setPairAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setRouter"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWriteTaxHandlerSetRouter = /*#__PURE__*/ createUseWriteContract(
  { abi: taxHandlerAbi, address: taxHandlerAddress, functionName: 'setRouter' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setTokenSwapAndLiquifyEnabled"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWriteTaxHandlerSetTokenSwapAndLiquifyEnabled =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setTokenSwapAndLiquifyEnabled',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setTokenSwapThreshold"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWriteTaxHandlerSetTokenSwapThreshold =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setTokenSwapThreshold',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setUser2Recipient"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWriteTaxHandlerSetUser2Recipient =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setUser2Recipient',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useSimulateTaxHandler = /*#__PURE__*/ createUseSimulateContract({
  abi: taxHandlerAbi,
  address: taxHandlerAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"decreaseTaxes"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useSimulateTaxHandlerDecreaseTaxes =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'decreaseTaxes',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"disableTaxes"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useSimulateTaxHandlerDisableTaxes =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'disableTaxes',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"emergencyWithdrawETH"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useSimulateTaxHandlerEmergencyWithdrawEth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'emergencyWithdrawETH',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"emergencyWithdrawTokens"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useSimulateTaxHandlerEmergencyWithdrawTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'emergencyWithdrawTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"manualSwapAndLiquify"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useSimulateTaxHandlerManualSwapAndLiquify =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'manualSwapAndLiquify',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"recordTaxAndSwap"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useSimulateTaxHandlerRecordTaxAndSwap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'recordTaxAndSwap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"registerTaxConfig"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useSimulateTaxHandlerRegisterTaxConfig =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'registerTaxConfig',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"resetAccumulator"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useSimulateTaxHandlerResetAccumulator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'resetAccumulator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setAdminWallet"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useSimulateTaxHandlerSetAdminWallet =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setAdminWallet',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setDefaultSwapThreshold"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useSimulateTaxHandlerSetDefaultSwapThreshold =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setDefaultSwapThreshold',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setGlobalSwapAndLiquifyEnabled"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useSimulateTaxHandlerSetGlobalSwapAndLiquifyEnabled =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setGlobalSwapAndLiquifyEnabled',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setLiquidityAddedAt"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useSimulateTaxHandlerSetLiquidityAddedAt =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setLiquidityAddedAt',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setPairAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useSimulateTaxHandlerSetPairAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setPairAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setRouter"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useSimulateTaxHandlerSetRouter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setRouter',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setTokenSwapAndLiquifyEnabled"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useSimulateTaxHandlerSetTokenSwapAndLiquifyEnabled =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setTokenSwapAndLiquifyEnabled',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setTokenSwapThreshold"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useSimulateTaxHandlerSetTokenSwapThreshold =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setTokenSwapThreshold',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setUser2Recipient"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useSimulateTaxHandlerSetUser2Recipient =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setUser2Recipient',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWatchTaxHandlerEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"AdminPhasesSet"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWatchTaxHandlerAdminPhasesSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    eventName: 'AdminPhasesSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"AdminWalletUpdated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWatchTaxHandlerAdminWalletUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    eventName: 'AdminWalletUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"ConfigRegistered"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWatchTaxHandlerConfigRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    eventName: 'ConfigRegistered',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"DefaultSwapThresholdUpdated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWatchTaxHandlerDefaultSwapThresholdUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    eventName: 'DefaultSwapThresholdUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"GlobalSwapAndLiquifyEnabledUpdated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWatchTaxHandlerGlobalSwapAndLiquifyEnabledUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    eventName: 'GlobalSwapAndLiquifyEnabledUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"LiquidityTimestampSet"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWatchTaxHandlerLiquidityTimestampSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    eventName: 'LiquidityTimestampSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"PairAddressSet"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWatchTaxHandlerPairAddressSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    eventName: 'PairAddressSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"RouterUpdated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWatchTaxHandlerRouterUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    eventName: 'RouterUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"SwapAndLiquify"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWatchTaxHandlerSwapAndLiquifyEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    eventName: 'SwapAndLiquify',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"SwapAndLiquifyEnabledUpdated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWatchTaxHandlerSwapAndLiquifyEnabledUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    eventName: 'SwapAndLiquifyEnabledUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"SwapThresholdUpdated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWatchTaxHandlerSwapThresholdUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    eventName: 'SwapThresholdUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"TaxConfigRegistered"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWatchTaxHandlerTaxConfigRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    eventName: 'TaxConfigRegistered',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"TaxPaid"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWatchTaxHandlerTaxPaidEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    eventName: 'TaxPaid',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"TaxesAdjusted"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWatchTaxHandlerTaxesAdjustedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    eventName: 'TaxesAdjusted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"TaxesDisabled"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWatchTaxHandlerTaxesDisabledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    eventName: 'TaxesDisabled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"User2Set"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xe3ca56e113d8a942932b891cbd99725d3950694b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3)
 */
export const useWatchTaxHandlerUser2SetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    eventName: 'User2Set',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link whitelistAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useReadWhitelist = /*#__PURE__*/ createUseReadContract({
  abi: whitelistAbi,
  address: whitelistAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"allowancePerUser"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useReadWhitelistAllowancePerUser =
  /*#__PURE__*/ createUseReadContract({
    abi: whitelistAbi,
    address: whitelistAddress,
    functionName: 'allowancePerUser',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"boughtAmount"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useReadWhitelistBoughtAmount = /*#__PURE__*/ createUseReadContract(
  {
    abi: whitelistAbi,
    address: whitelistAddress,
    functionName: 'boughtAmount',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"isWhitelisted"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useReadWhitelistIsWhitelisted =
  /*#__PURE__*/ createUseReadContract({
    abi: whitelistAbi,
    address: whitelistAddress,
    functionName: 'isWhitelisted',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"remainingAllowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useReadWhitelistRemainingAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: whitelistAbi,
    address: whitelistAddress,
    functionName: 'remainingAllowance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"systemContext"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useReadWhitelistSystemContext =
  /*#__PURE__*/ createUseReadContract({
    abi: whitelistAbi,
    address: whitelistAddress,
    functionName: 'systemContext',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"whitelistFinalized"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useReadWhitelistWhitelistFinalized =
  /*#__PURE__*/ createUseReadContract({
    abi: whitelistAbi,
    address: whitelistAddress,
    functionName: 'whitelistFinalized',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"whitelists"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useReadWhitelistWhitelists = /*#__PURE__*/ createUseReadContract({
  abi: whitelistAbi,
  address: whitelistAddress,
  functionName: 'whitelists',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link whitelistAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useWriteWhitelist = /*#__PURE__*/ createUseWriteContract({
  abi: whitelistAbi,
  address: whitelistAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"addManyToWhitelist"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useWriteWhitelistAddManyToWhitelist =
  /*#__PURE__*/ createUseWriteContract({
    abi: whitelistAbi,
    address: whitelistAddress,
    functionName: 'addManyToWhitelist',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"addToWhitelist"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useWriteWhitelistAddToWhitelist =
  /*#__PURE__*/ createUseWriteContract({
    abi: whitelistAbi,
    address: whitelistAddress,
    functionName: 'addToWhitelist',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"clearWhitelist"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useWriteWhitelistClearWhitelist =
  /*#__PURE__*/ createUseWriteContract({
    abi: whitelistAbi,
    address: whitelistAddress,
    functionName: 'clearWhitelist',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"finalizeWhitelist"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useWriteWhitelistFinalizeWhitelist =
  /*#__PURE__*/ createUseWriteContract({
    abi: whitelistAbi,
    address: whitelistAddress,
    functionName: 'finalizeWhitelist',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"recordBuy"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useWriteWhitelistRecordBuy = /*#__PURE__*/ createUseWriteContract({
  abi: whitelistAbi,
  address: whitelistAddress,
  functionName: 'recordBuy',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"removeFromWhitelist"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useWriteWhitelistRemoveFromWhitelist =
  /*#__PURE__*/ createUseWriteContract({
    abi: whitelistAbi,
    address: whitelistAddress,
    functionName: 'removeFromWhitelist',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link whitelistAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useSimulateWhitelist = /*#__PURE__*/ createUseSimulateContract({
  abi: whitelistAbi,
  address: whitelistAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"addManyToWhitelist"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useSimulateWhitelistAddManyToWhitelist =
  /*#__PURE__*/ createUseSimulateContract({
    abi: whitelistAbi,
    address: whitelistAddress,
    functionName: 'addManyToWhitelist',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"addToWhitelist"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useSimulateWhitelistAddToWhitelist =
  /*#__PURE__*/ createUseSimulateContract({
    abi: whitelistAbi,
    address: whitelistAddress,
    functionName: 'addToWhitelist',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"clearWhitelist"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useSimulateWhitelistClearWhitelist =
  /*#__PURE__*/ createUseSimulateContract({
    abi: whitelistAbi,
    address: whitelistAddress,
    functionName: 'clearWhitelist',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"finalizeWhitelist"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useSimulateWhitelistFinalizeWhitelist =
  /*#__PURE__*/ createUseSimulateContract({
    abi: whitelistAbi,
    address: whitelistAddress,
    functionName: 'finalizeWhitelist',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"recordBuy"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useSimulateWhitelistRecordBuy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: whitelistAbi,
    address: whitelistAddress,
    functionName: 'recordBuy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"removeFromWhitelist"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useSimulateWhitelistRemoveFromWhitelist =
  /*#__PURE__*/ createUseSimulateContract({
    abi: whitelistAbi,
    address: whitelistAddress,
    functionName: 'removeFromWhitelist',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link whitelistAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useWatchWhitelistEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: whitelistAbi, address: whitelistAddress },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link whitelistAbi}__ and `eventName` set to `"WhitelistBuyRecorded"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useWatchWhitelistWhitelistBuyRecordedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: whitelistAbi,
    address: whitelistAddress,
    eventName: 'WhitelistBuyRecorded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link whitelistAbi}__ and `eventName` set to `"WhitelistEntryAdded"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useWatchWhitelistWhitelistEntryAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: whitelistAbi,
    address: whitelistAddress,
    eventName: 'WhitelistEntryAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link whitelistAbi}__ and `eventName` set to `"WhitelistEntryRemoved"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useWatchWhitelistWhitelistEntryRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: whitelistAbi,
    address: whitelistAddress,
    eventName: 'WhitelistEntryRemoved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link whitelistAbi}__ and `eventName` set to `"WhitelistFinalized"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3c979ba68662da5bcd7e42d69b88731d26bd4286)
 * - [__View Contract on Bnb Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x32b3302f2f9e15a93864ab3085585afb8690d00d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb9412e3a43531053e7d3694ea7f9ee44660944ad)
 */
export const useWatchWhitelistWhitelistFinalizedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: whitelistAbi,
    address: whitelistAddress,
    eventName: 'WhitelistFinalized',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })
