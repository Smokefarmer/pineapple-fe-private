import { defineConfig } from '@wagmi/cli'
import { Abi, Address, erc20Abi } from 'viem'

import { bsc, bscTestnet, mainnet, sepolia } from 'wagmi/chains'
import { react } from '@wagmi/cli/plugins'
import Router from './abis/Router';
import WhitelistHandler from './abis/WhitelistHandler';
import TaxHandler from './abis/TaxHandler';
import PineappleAccessControl from './abis/PineappleAccessControl';
import SystemContext from './abis/SystemContext';

const addresses = {
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
  "systemContext": "0x524091b0a431af72b305f7a0be336cb26bb4d05d",
  "registry": "0x90ef3445b7296ad8d57bd6ddc7cb7a4c6787252b",
  "factory": "0x3ca7b3f15a55ff29380376588db2eb13bfe43901",
  "router": "0xb455e2bb78bae7d8cf20db076fb0cd1d13a21789",
  "verifyTypedData": "0x0e4a498dc3fc5c5e4e3774cbc0c5eefbb51b0c8e",
  "masterTaxHandler": "0xd645645ee16d3c8127ee46e8866be393f0ae2045",
  "masterLaunchWhitelist": "0xfd1e575b55e2ef197a8db22f74daccb7185dd415",
  "pancakeRouter": "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
  "pancakeFactory": "0x6725F303b657a9451d8BA641348b6761A6CC7a17",
  "teamFinanceLocker": "0xD7eaa812Ab150A8E9a82A5b4107A83BA1F228dfA"
}

// Ethereum Mainnet addresses - TODO: Replace with actual deployed contract addresses
const addressesEthMainnet = {
  "network": "ethereum",
  "systemContext": "0x0e4a498dc3fc5c5e4e3774cbc0c5eefbb51b0c8e", // TODO: Replace with actual address
  "registry": "0x3ca7b3f15a55ff29380376588db2eb13bfe43901", // TODO: Replace with actual address
  "factory": "0xd645645ee16d3c8127ee46e8866be393f0ae2045", // TODO: Replace with actual address
  "router": "0x90ef3445b7296ad8d57bd6ddc7cb7a4c6787252b", // TODO: Replace with actual address
  "verifyTypedData": "0xb455e2bb78bae7d8cf20db076fb0cd1d13a21789", // TODO: Replace with actual address
  "masterTaxHandler": "0xfd1e575b55e2ef197a8db22f74daccb7185dd415", // TODO: Replace with actual address
  "masterLaunchWhitelist": "0x163d8cdfbd361ea2514ecb7e9345479987661d13", // TODO: Replace with actual address
  "uniswapRouter": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // Uniswap V2 Router
  "uniswapFactory": "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f", // Uniswap V2 Factory
  "teamFinanceLocker": "0xc8F5c3a8467D9E12C8293288DD9F88D30c41C237" // TODO: Replace with actual address
}

// Sepolia Testnet addresses - Latest deployed contract addresses
const addressesSepoliaTestnet = {
  "network": "sepoliaTestnet",
  "systemContext": "0xc16d960610844562d8e39021a0f05f828656cbfb",
  "registry": "0x2024d32232fd6200b942374c8fb15d0ac5b17ae9",
  "factory": "0x475cf945747f6259e27fc5f9ae4b31548ee8c1a1",
  "router": "0x71fa6b273e1736e388b508303846f5203aaeca2a",
  "verifyTypedData": "0xaab7109d0ef4c1f02b62bd36fc8e01492868b21c",
  "masterTaxHandler": "0xe4d1a1570b9a4feb0a2070ba78ef9751f05ce0e9",
  "masterLaunchWhitelist": "0xa259d106caeed43c49c068e05a902e1380407fa1",
  "uniswapRouter": "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008",
  "uniswapFactory": "0x7E0987E5b3a30e3f2828572Bb659A548460a3003",
  "teamFinanceLocker": "0xdB4581Ad615fA2B93fC6205b9a9Dd4234724A4A5",
  // Previous masterTaxHandler: "0x366564536c7d4c5889217ca29e7a7430cd4478fb"
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
