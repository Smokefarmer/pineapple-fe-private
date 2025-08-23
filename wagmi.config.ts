import { defineConfig } from '@wagmi/cli'
import { Abi, Address, erc20Abi } from 'viem'

import { bsc, bscTestnet } from 'wagmi/chains'
import {  react } from '@wagmi/cli/plugins'
import Router from './abis/Router';
import WhitelistHandler from './abis/WhitelistHandler';
import TaxHandler from './abis/TaxHandler';

const addresses =  {
  "network": "mainnet",
  "systemContext": "0x14e2ca2c31318a82ec71543d9c34daed655dff37",
  "registry": "0x937e179fbbdd2fec6740778acf0e164e13a98378",
  "factory": "0x5b49482d042639ae135e36e735cc958b9e34b27d",
  "router": "0x4af082409f215f08ea214c154b5d6c7b922d8d40",
  "verifyTypedData": "0xc415113c1dd50f459aa2dbeb9ca93c6288e53d5a",
  "masterTaxHandler": "0xca99786bc41a5cd004a29e3adbe992b3d879fef0",
  "masterLaunchWhitelist": "0x8243275253ea18b01441397188a03bf2c44c1790",
  "pancakeRouter": "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  "pancakeFactory": "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
  "teamFinanceLocker": "0xda60847CCeb04ce00c072c7357677e908263317B"
}

const addressesTest = {
  "network": "bscTestnet",
  "systemContext": "0xf9c0ec13bbd861d54c4453b8f2d34507ae9b5f3d",
  "registry": "0x7cac71adaf1399b6b0a6321d5c571bf9fa203dc0",
  "factory": "0x7cf2f664c77420e00fb4abd954d1f7cfc81eb8dc",
  "router": "0x934bc099c6589a2b7058edfbaf610e7dd767faaa",
  "verifyTypedData": "0x82a45d7e36deb48f4314bfa38882cb85905f986f",
  "masterTaxHandler": "0x6cffb2372d66c039d129b7ef5f25fb86bc9de31a",
  "masterLaunchWhitelist": "0x1c2d024794986c8c5e5e94e528b500f54433c4f3",
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
    }
  ],
  plugins: [
    
    react()
  ],
 
})
