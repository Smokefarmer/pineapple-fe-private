import { defineConfig } from '@wagmi/cli'
import { Abi, Address, erc20Abi } from 'viem'

import { bsc, bscTestnet } from 'wagmi/chains'
import {  react } from '@wagmi/cli/plugins'
import Router from './abis/Router';
import WhitelistHandler from './abis/WhitelistHandler';
import TaxHandler from './abis/TaxHandler';
import PineappleAccessControl from './abis/PineappleAccessControl';
import SystemContext from './abis/SystemContext';

const addresses =  {
  "network": "mainnet",
  "systemContext": "0x524091b0a431af72b305f7a0be336cb26bb4d05d",
  "registry": "0x90ef3445b7296ad8d57bd6ddc7cb7a4c6787252b",
  "factory": "0x3ca7b3f15a55ff29380376588db2eb13bfe43901",
  "router": "0xb455e2bb78bae7d8cf20db076fb0cd1d13a21789",
  "verifyTypedData": "0x0e4a498dc3fc5c5e4e3774cbc0c5eefbb51b0c8e",
  "masterTaxHandler": "0xd645645ee16d3c8127ee46e8866be393f0ae2045",
  "masterLaunchWhitelist": "0xfd1e575b55e2ef197a8db22f74daccb7185dd415",
  "pancakeRouter": "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  "pancakeFactory": "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
  "teamFinanceLocker": "0xE2fE530C047f2d85298b07D9333C05737f1435fB"
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
      },
    }, {
      name: 'Whitelist',
      abi: WhitelistHandler as Abi,
      address: {
        [bscTestnet.id]: addressesTest.masterLaunchWhitelist as Address,
        [bsc.id]: addresses.masterLaunchWhitelist as Address,
      },
    }, {
      name: 'TaxHandler',
      abi: TaxHandler as Abi,
      address: {
        [bscTestnet.id]: addressesTest.masterTaxHandler as Address,
        [bsc.id]: addresses.masterTaxHandler as Address,
      },
    }, {
      name: 'SystemContext',
      abi: SystemContext as Abi,
      address: {
        [bscTestnet.id]: addressesTest.systemContext as Address,
        [bsc.id]: addresses.systemContext as Address,
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
