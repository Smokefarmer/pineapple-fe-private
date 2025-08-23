import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Router
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
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
        name: 'adminRatesBps',
        internalType: 'uint32[3]',
        type: 'uint32[3]',
        indexed: false,
      },
      {
        name: 'adminDurations',
        internalType: 'uint32[3]',
        type: 'uint32[3]',
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
      { name: 'adminRatesBps', internalType: 'uint32[3]', type: 'uint32[3]' },
      { name: 'adminDurations', internalType: 'uint32[3]', type: 'uint32[3]' },
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
      { name: 'adminRatesBps', internalType: 'uint32[3]', type: 'uint32[3]' },
      { name: 'adminDurations', internalType: 'uint32[3]', type: 'uint32[3]' },
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
 */
export const routerAddress = {
  56: '0x4aF082409F215F08EA214c154b5d6c7B922D8d40',
  97: '0x934bc099c6589a2b7058eDFBAF610e7DD767FAAa',
} as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
 */
export const routerConfig = { address: routerAddress, abi: routerAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TaxHandler
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
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
        internalType: 'uint32[3]',
        type: 'uint32[3]',
        indexed: false,
      },
      {
        name: 'durations',
        internalType: 'uint32[3]',
        type: 'uint32[3]',
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
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'disableTaxes',
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
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'pairAddress', internalType: 'address', type: 'address' },
    ],
    name: 'handleTax',
    outputs: [
      { name: 'taxAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'adminRecipient', internalType: 'address', type: 'address' },
      { name: 'adminAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'user1Recipient', internalType: 'address', type: 'address' },
      { name: 'user1Amount', internalType: 'uint256', type: 'uint256' },
      { name: 'user2Recipient', internalType: 'address', type: 'address' },
      { name: 'user2Amount', internalType: 'uint256', type: 'uint256' },
    ],
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
      { name: 'adminRatesBps', internalType: 'uint32[3]', type: 'uint32[3]' },
      { name: 'adminDurations', internalType: 'uint32[3]', type: 'uint32[3]' },
    ],
    name: 'registerTaxConfig',
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
      { name: 'user2', internalType: 'address', type: 'address' },
      { name: 'user2Share', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setUser2Recipient',
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
] as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const taxHandlerAddress = {
  56: '0xcA99786BC41A5CD004a29E3aDBE992B3D879Fef0',
  97: '0x6CffB2372d66c039D129b7eF5F25fb86bC9dE31A',
} as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const taxHandlerConfig = {
  address: taxHandlerAddress,
  abi: taxHandlerAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Whitelist
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
 */
export const whitelistAddress = {
  56: '0x8243275253eA18B01441397188A03bF2c44C1790',
  97: '0x1C2d024794986c8C5e5E94e528B500F54433C4F3',
} as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
 */
export const useReadRouter = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  address: routerAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"getAddLiquidityMessageToSign"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
 */
export const useReadRouterGetToken = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  address: routerAddress,
  functionName: 'getToken',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
 */
export const useReadRouterOwner = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  address: routerAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"systemContext"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
 */
export const useReadRouterSystemContext = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  address: routerAddress,
  functionName: 'systemContext',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
 */
export const useWriteRouter = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  address: routerAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"addLiquiditySigned"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
 */
export const useWriteRouterDeployToken = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  address: routerAddress,
  functionName: 'deployToken',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
 */
export const useSimulateRouter = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  address: routerAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"addLiquiditySigned"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
 */
export const useWatchRouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  address: routerAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"LaunchTokenCreated"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x4af082409f215f08ea214c154b5d6c7b922d8d40)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x934bc099c6589a2b7058edfbaf610e7dd767faaa)
 */
export const useWatchRouterOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: routerAbi,
    address: routerAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link taxHandlerAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useReadTaxHandler = /*#__PURE__*/ createUseReadContract({
  abi: taxHandlerAbi,
  address: taxHandlerAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"adminWallet"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useReadTaxHandlerAdminWallet = /*#__PURE__*/ createUseReadContract(
  {
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'adminWallet',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"getCurrentTaxRates"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useReadTaxHandlerGetCurrentTaxRates =
  /*#__PURE__*/ createUseReadContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'getCurrentTaxRates',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"systemContext"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useReadTaxHandlerSystemContext =
  /*#__PURE__*/ createUseReadContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'systemContext',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useWriteTaxHandler = /*#__PURE__*/ createUseWriteContract({
  abi: taxHandlerAbi,
  address: taxHandlerAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"decreaseTaxes"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useWriteTaxHandlerDisableTaxes =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'disableTaxes',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"handleTax"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useWriteTaxHandlerHandleTax = /*#__PURE__*/ createUseWriteContract(
  { abi: taxHandlerAbi, address: taxHandlerAddress, functionName: 'handleTax' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"registerTaxConfig"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useWriteTaxHandlerRegisterTaxConfig =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'registerTaxConfig',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setAdminWallet"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useWriteTaxHandlerSetAdminWallet =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setAdminWallet',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setLiquidityAddedAt"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useWriteTaxHandlerSetLiquidityAddedAt =
  /*#__PURE__*/ createUseWriteContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setLiquidityAddedAt',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setUser2Recipient"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useSimulateTaxHandler = /*#__PURE__*/ createUseSimulateContract({
  abi: taxHandlerAbi,
  address: taxHandlerAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"decreaseTaxes"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useSimulateTaxHandlerDisableTaxes =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'disableTaxes',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"handleTax"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useSimulateTaxHandlerHandleTax =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'handleTax',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"registerTaxConfig"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useSimulateTaxHandlerRegisterTaxConfig =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'registerTaxConfig',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setAdminWallet"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useSimulateTaxHandlerSetAdminWallet =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setAdminWallet',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setLiquidityAddedAt"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useSimulateTaxHandlerSetLiquidityAddedAt =
  /*#__PURE__*/ createUseSimulateContract({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    functionName: 'setLiquidityAddedAt',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link taxHandlerAbi}__ and `functionName` set to `"setUser2Recipient"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useWatchTaxHandlerEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"AdminPhasesSet"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useWatchTaxHandlerConfigRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    eventName: 'ConfigRegistered',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"LiquidityTimestampSet"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
 */
export const useWatchTaxHandlerLiquidityTimestampSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: taxHandlerAbi,
    address: taxHandlerAddress,
    eventName: 'LiquidityTimestampSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link taxHandlerAbi}__ and `eventName` set to `"TaxConfigRegistered"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xca99786bc41a5cd004a29e3adbe992b3d879fef0)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
 */
export const useReadWhitelist = /*#__PURE__*/ createUseReadContract({
  abi: whitelistAbi,
  address: whitelistAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"allowancePerUser"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
 */
export const useReadWhitelistWhitelists = /*#__PURE__*/ createUseReadContract({
  abi: whitelistAbi,
  address: whitelistAddress,
  functionName: 'whitelists',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link whitelistAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
 */
export const useWriteWhitelist = /*#__PURE__*/ createUseWriteContract({
  abi: whitelistAbi,
  address: whitelistAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"addManyToWhitelist"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
 */
export const useWriteWhitelistRecordBuy = /*#__PURE__*/ createUseWriteContract({
  abi: whitelistAbi,
  address: whitelistAddress,
  functionName: 'recordBuy',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"removeFromWhitelist"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
 */
export const useSimulateWhitelist = /*#__PURE__*/ createUseSimulateContract({
  abi: whitelistAbi,
  address: whitelistAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link whitelistAbi}__ and `functionName` set to `"addManyToWhitelist"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
 */
export const useWatchWhitelistEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: whitelistAbi, address: whitelistAddress },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link whitelistAbi}__ and `eventName` set to `"WhitelistBuyRecorded"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8243275253ea18b01441397188a03bf2c44c1790)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x1c2d024794986c8c5e5e94e528b500f54433c4f3)
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
