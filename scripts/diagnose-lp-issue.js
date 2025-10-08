// Run this to diagnose the LP creation issue
// Usage: node scripts/diagnose-lp-issue.js <TOKEN_ADDRESS> <USER_ADDRESS>

const { createPublicClient, http, parseEther, formatEther } = require('viem');
const { sepolia } = require('viem/chains');

const TOKEN_ADDRESS = process.argv[2];
const USER_ADDRESS = process.argv[3];
const ROUTER_ADDRESS = '0x1646265b7ab16a7b6921f21119517941bd35abe9';
const TEAMFINANCE_ADDRESS = '0xdB4581Ad615fA2B93fC6205b9a9Dd4234724A4A5';

const client = createPublicClient({
  chain: sepolia,
  transport: http('https://eth-sepolia.g.alchemy.com/v2/tkjYW8TyYZ6QLjzbYZBkS')
});

const ERC20_ABI = [
  {
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const TEAMFINANCE_ABI = [
  {
    inputs: [{ name: '_tokenAddress', type: 'address' }],
    name: 'getFeesInETH',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

async function diagnose() {
  if (!TOKEN_ADDRESS || !USER_ADDRESS) {
    console.log('Usage: node diagnose-lp-issue.js <TOKEN_ADDRESS> <USER_ADDRESS>');
    process.exit(1);
  }

  console.log('=== LP Creation Diagnostic ===\n');
  console.log('Token:', TOKEN_ADDRESS);
  console.log('User:', USER_ADDRESS);
  console.log('Router:', ROUTER_ADDRESS);
  console.log('TeamFinance Mock:', TEAMFINANCE_ADDRESS);
  console.log('');

  try {
    // Check user's ETH balance
    const ethBalance = await client.getBalance({ address: USER_ADDRESS });
    console.log('✓ User ETH Balance:', formatEther(ethBalance), 'ETH');

    // Check total supply
    const totalSupply = await client.readContract({
      address: TOKEN_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'totalSupply',
    });
    console.log('✓ Token Total Supply:', totalSupply.toString());

    // Check user's token balance
    const tokenBalance = await client.readContract({
      address: TOKEN_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [USER_ADDRESS],
    });
    console.log('✓ User Token Balance:', tokenBalance.toString());

    // Check token allowance for Router
    const allowance = await client.readContract({
      address: TOKEN_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'allowance',
      args: [USER_ADDRESS, ROUTER_ADDRESS],
    });
    console.log('✓ Token Allowance for Router:', allowance.toString());

    // Check TeamFinance fees
    const fees = await client.readContract({
      address: TEAMFINANCE_ADDRESS,
      abi: TEAMFINANCE_ABI,
      functionName: 'getFeesInETH',
      args: [TOKEN_ADDRESS],
    });
    console.log('✓ TeamFinance Fees:', formatEther(fees), 'ETH (', fees.toString(), 'wei)');

    // Warnings
    console.log('\n=== Checks ===');
    if (tokenBalance < totalSupply / 2n) {
      console.log('⚠️  User has less than 50% of supply');
    } else {
      console.log('✓ User has sufficient tokens');
    }

    if (allowance < tokenBalance) {
      console.log('⚠️  Token allowance is less than balance - need to approve!');
    } else {
      console.log('✓ Token allowance is sufficient');
    }

    const requiredETH = parseEther('0.05') + fees;
    if (ethBalance < requiredETH) {
      console.log('⚠️  User has insufficient ETH. Need:', formatEther(requiredETH), 'ETH, Have:', formatEther(ethBalance), 'ETH');
    } else {
      console.log('✓ User has sufficient ETH');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

diagnose();
