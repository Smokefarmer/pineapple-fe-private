import { defineConfig } from "@wagmi/cli";
import { Abi, Address, erc20Abi } from "viem";

import { bsc, bscTestnet, mainnet, sepolia } from "wagmi/chains";
import { react } from "@wagmi/cli/plugins";
import Router from "./abis/Router";
import WhitelistHandler from "./abis/WhitelistHandler";
import TaxHandler from "./abis/TaxHandler";
import PineappleAccessControl from "./abis/PineappleAccessControl";
import SystemContext from "./abis/SystemContext";

const addresses = {
  network: "bscMainnet",
  systemContext: "0x63a55187a3d80ad339562ad13b5ee6690bd6ed65",
  acl: "0x5e980a5834e549cf9f483d4aef174c3bb40eadb9",
  registry: "0xb64ea959cce5370c8970e443c7530672c723c728",
  factory: "0x4bbe11f7885b2dc3348f2e5b1d1b9762a1c9ea40",
  router: "0x20c11ca62f43b487017ae44e4f98bd48f8926e04",
  verifyTypedData: "0x70193f52323bba019414f7fed661655b579b33be",
  masterTaxHandler: "0x774a038327f5b6d4b0fe334868c063da119c6c33",
  masterLaunchWhitelist: "0x85305d0ad6fb1b2db9934abb4d2aa133c784d394",
  pancakeRouter: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  pancakeFactory: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
  teamFinanceLocker: "0x0C89C0407775dd89b12918B9c0aa42Bf96518820",
  backendSigner: "0xA58255dC711CD3A32004bbd5bDb1f76394D3d829",
};

const addressesTest = {
  network: "bscTestnet",
  systemContext: "0x95c895b566d14f09ebf87ed106edcb26ce6dd8c1",
  acl: "0xd6e5e9151f8088cfb7b6bc35d63c4648ef40deab",
  registry: "0xfd0fbee680253eb69f127f5b3b522b452cb72339",
  factory: "0xcee5e098273973f8883194c7ed6273e16f8e0e2e",
  router: "0xf5b9e717dd864b3fb52d6420b796115adf507fd2",
  verifyTypedData: "0x5c8539f834829efe4fcfd134283035f0119481b7",
  masterTaxHandler: "0x5e980a5834e549cf9f483d4aef174c3bb40eadb9",
  masterLaunchWhitelist: "0x63a55187a3d80ad339562ad13b5ee6690bd6ed65",
  pancakeRouter: "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
  pancakeFactory: "0x6725F303b657a9451d8BA641348b6761A6CC7a17",
  teamFinanceLocker: "0x61CDC76F4eD13BB034a667eBC8ca7E3b9D317DEf",
  backendSigner: "0xA58255dC711CD3A32004bbd5bDb1f76394D3d829",
};

// Ethereum Mainnet addresses
const addressesEthMainnet = {
  network: "ethMainnet",
  systemContext: "0xd022ef71a4993aa654cc99106efbf0d190065d7b",
  acl: "0xcdbc2def67fced930ac8e3ff774fc9e1520ce91c",
  registry: "0xd57fe4367ef5aa6ff4bb700e7610fa62688cd2aa",
  factory: "0xb5d9ad9db07b73e3e4152949ac7ffb11ef65c2ee",
  router: "0x65c4d5e48944e3d73b084c9a3ca17ef40ce5f47e",
  verifyTypedData: "0xdb4581ad615fa2b93fc6205b9a9dd4234724a4a5",
  masterTaxHandler: "0x749284ab46a43c85d2fc91b2a7a6216504675199",
  masterLaunchWhitelist: "0x5e0ab84c4c79b41f57c10655df80c3df2cb8808c",
  uniswapRouter: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  uniswapFactory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
  teamFinanceLocker: "0xE2fE530C047f2d85298b07D9333C05737f1435fB",
  backendSigner: "0xA58255dC711CD3A32004bbd5bDb1f76394D3d829",
};

// Sepolia Testnet addresses
const addressesSepoliaTestnet = {
  network: "sepolia",
  systemContext: "0xc16d960610844562d8e39021a0f05f828656cbfb",
  registry: "0x2024d32232fd6200b942374c8fb15d0ac5b17ae9",
  factory: "0x475cf945747f6259e27fc5f9ae4b31548ee8c1a1",
  router: "0x71fa6b273e1736e388b508303846f5203aaeca2a",
  verifyTypedData: "0xaab7109d0ef4c1f02b62bd36fc8e01492868b21c",
  masterTaxHandler: "0xe4d1a1570b9a4feb0a2070ba78ef9751f05ce0e9",
  masterLaunchWhitelist: "0xa259d106caeed43c49c068e05a902e1380407fa1",
  uniswapRouter: "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008",
  uniswapFactory: "0x7E0987E5b3a30e3f2828572Bb659A548460a3003",
  teamFinanceLocker: "0xdB4581Ad615fA2B93fC6205b9a9Dd4234724A4A5",
  // Previous masterTaxHandler: "0x366564536c7d4c5889217ca29e7a7430cd4478fb"
};

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "erc20",
      abi: erc20Abi,
    },
    {
      name: "Router",
      abi: Router as Abi,
      address: {
        [bscTestnet.id]: addressesTest.router as Address,
        [bsc.id]: addresses.router as Address,
        [mainnet.id]: addressesEthMainnet.router as Address,
        [sepolia.id]: addressesSepoliaTestnet.router as Address,
      },
    },
    {
      name: "Whitelist",
      abi: WhitelistHandler as Abi,
      address: {
        [bscTestnet.id]: addressesTest.masterLaunchWhitelist as Address,
        [bsc.id]: addresses.masterLaunchWhitelist as Address,
        [mainnet.id]: addressesEthMainnet.masterLaunchWhitelist as Address,
        [sepolia.id]: addressesSepoliaTestnet.masterLaunchWhitelist as Address,
      },
    },
    {
      name: "TaxHandler",
      abi: TaxHandler as Abi,
      address: {
        [bscTestnet.id]: addressesTest.masterTaxHandler as Address,
        [bsc.id]: addresses.masterTaxHandler as Address,
        [mainnet.id]: addressesEthMainnet.masterTaxHandler as Address,
        [sepolia.id]: addressesSepoliaTestnet.masterTaxHandler as Address,
      },
    },
    {
      name: "SystemContext",
      abi: SystemContext as Abi,
      address: {
        [bscTestnet.id]: addressesTest.systemContext as Address,
        [bsc.id]: addresses.systemContext as Address,
        [mainnet.id]: addressesEthMainnet.systemContext as Address,
        [sepolia.id]: addressesSepoliaTestnet.systemContext as Address,
      },
    },
    {
      name: "PineappleAccessControl",
      abi: PineappleAccessControl as Abi,
      // Address will be resolved dynamically from SystemContext.acl()
    },
  ],
  plugins: [react()],
});
