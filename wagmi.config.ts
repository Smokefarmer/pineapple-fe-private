import { defineConfig } from '@wagmi/cli'
import { Abi, Address, erc20Abi } from 'viem'

import { bsc, bscTestnet, mainnet, sepolia } from 'wagmi/chains'
import {  react } from '@wagmi/cli/plugins'
import Router from './abis/Router';
import WhitelistHandler from './abis/WhitelistHandler';
import TaxHandler from './abis/TaxHandler';
import PineappleAccessControl from './abis/PineappleAccessControl';
import SystemContext from './abis/SystemContext';

const addresses =  {
  "network": "mainnet",
  "systemContext": "0xc3b77fdd9cbced4309052fb8f77b39853e2306cd",
  "registry": "0xe3f6288f5f8c0032ab6452018af1c032b78fffca",
  "factory": "0xb398cee9c9e8d98d15f03f0c12e411ad9c3e7530",
  "router": "0x301e4d7a3da5eef64038190e4968c51d5c5b6c46",
  "verifyTypedData": "0x66c61ebdc293a76c1d5063228f6da075906f0a6b",
  "masterTaxHandler": "0x9c0225c1cf39bd8c3cf679d8dd2b449094c61cc0",
  "masterLaunchWhitelist": "0x3c979ba68662da5bcd7e42d69b88731d26bd4286",
  "pancakeRouter": "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  "pancakeFactory": "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
  "teamFinanceLocker": "0xda60847CCeb04ce00c072c7357677e908263317B"
}

const addressesTest = {
  "network": "bscTestnet",
  "systemContext": "0x2f33f8f62e0b34ce0e50ed3fa2156432c8e4ea11",
  "registry": "0x5ab313a6fe2bde9a9bbe97f3432b8f6ef8efb90f",
  "factory": "0x1284f56f3a7403e0a56be801e4a2100821ef8e43",
  "router": "0x072b4b787ddd8e6c78f416fccd84f3a4db591549",
  "verifyTypedData": "0x64fd6e1ea7861ecf51d811597454ec310432e9e7",
  "masterTaxHandler": "0xe3ca56e113d8a942932b891cbd99725d3950694b",
  "masterLaunchWhitelist": "0x32b3302f2f9e15a93864ab3085585afb8690d00d",
  "pancakeRouter": "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
  "pancakeFactory": "0x6725F303b657a9451d8BA641348b6761A6CC7a17",
  "teamFinanceLocker": "0xD7eaa812Ab150A8E9a82A5b4107A83BA1F228dfA"
}

// Ethereum Mainnet addresses - TODO: Replace with actual deployed contract addresses
const addressesEthMainnet = {
  "network": "ethereum",
  "systemContext": "0x0000000000000000000000000000000000000000", // TODO: Replace with actual address
  "registry": "0x0000000000000000000000000000000000000000", // TODO: Replace with actual address
  "factory": "0x0000000000000000000000000000000000000000", // TODO: Replace with actual address
  "router": "0x0000000000000000000000000000000000000000", // TODO: Replace with actual address
  "verifyTypedData": "0x0000000000000000000000000000000000000000", // TODO: Replace with actual address
  "masterTaxHandler": "0x0000000000000000000000000000000000000000", // TODO: Replace with actual address
  "masterLaunchWhitelist": "0x0000000000000000000000000000000000000000", // TODO: Replace with actual address
  "uniswapRouter": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // Uniswap V2 Router
  "uniswapFactory": "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f", // Uniswap V2 Factory
  "teamFinanceLocker": "0x0000000000000000000000000000000000000000" // TODO: Replace with actual address
}

// Sepolia Testnet addresses - Latest deployed contract addresses
const addressesSepoliaTestnet = {
  "network": "sepoliaTestnet",
  "systemContext": "0x1a5575fbf905c8d37d2698da98656f60ee07e2c0",
  "registry": "0xe5e20d0d58163e54ec1b722e26020888ec7c2d1e",
  "factory": "0x8cfa6db94468a35ca1df8f6f928454a70ba601d1",
  "router": "0x8d01f620e9ce74bd2f30027bc94e5ccb17f2dad1",
  "verifyTypedData": "0x05e79bb3a8ebf5993580e5a72d112125a229f550",
  "masterTaxHandler": "0xaf1be58f1c820a2bfe87edf60d90bb682a9d55b3",
  "masterLaunchWhitelist": "0xb9412e3a43531053e7d3694ea7f9ee44660944ad",
  "uniswapRouter": "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008", // Uniswap V2 Router on Sepolia
  "uniswapFactory": "0x7E0987E5b3a30e3f2828572Bb659A548460a3003", // Uniswap V2 Factory on Sepolia
  "teamFinanceLocker": "0xdB4581Ad615fA2B93fC6205b9a9Dd4234724A4A5",
  "backendSigner": "0xA58255dC711CD3A32004bbd5bDb1f76394D3d829"
}

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'erc20',
      abi: erc20Abi,
    },
    {
      name: 'Router',
      abi: Router as Abi,
      address: {
        [bscTestnet.id]: addressesTest.router as Address,
        [bsc.id]: addresses.router as Address,
        [mainnet.id]: addressesEthMainnet.router as Address,
        [sepolia.id]: addressesSepoliaTestnet.router as Address,
      },
    }, {
      name: 'Whitelist',
      abi: WhitelistHandler as Abi,
      address: {
        [bscTestnet.id]: addressesTest.masterLaunchWhitelist as Address,
        [bsc.id]: addresses.masterLaunchWhitelist as Address,
        [mainnet.id]: addressesEthMainnet.masterLaunchWhitelist as Address,
        [sepolia.id]: addressesSepoliaTestnet.masterLaunchWhitelist as Address,
      },
    }, {
      name: 'TaxHandler',
      abi: TaxHandler as Abi,
      address: {
        [bscTestnet.id]: addressesTest.masterTaxHandler as Address,
        [bsc.id]: addresses.masterTaxHandler as Address,
        [mainnet.id]: addressesEthMainnet.masterTaxHandler as Address,
        [sepolia.id]: addressesSepoliaTestnet.masterTaxHandler as Address,
      },
    }, {
      name: 'SystemContext',
      abi: SystemContext as Abi,
      address: {
        [bscTestnet.id]: addressesTest.systemContext as Address,
        [bsc.id]: addresses.systemContext as Address,
        [mainnet.id]: addressesEthMainnet.systemContext as Address,
        [sepolia.id]: addressesSepoliaTestnet.systemContext as Address,
      },
    }, {
      name: 'PineappleAccessControl',
      abi: PineappleAccessControl as Abi,
      // Address will be resolved dynamically from SystemContext.acl()
    }
  ],
  plugins: [
    
    react()
  ],
 
})
