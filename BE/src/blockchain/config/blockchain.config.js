import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load deployment info
let deploymentInfo = {};
try {
  const deploymentPath = path.join(__dirname, 'deployment.json');
  if (fs.existsSync(deploymentPath)) {
    const data = fs.readFileSync(deploymentPath, 'utf8');
    deploymentInfo = JSON.parse(data);
  }
} catch (error) {
  console.warn('⚠️  No deployment info found');
}

export const blockchainConfig = {
  network: process.env.BLOCKCHAIN_NETWORK || 'ganache',
  rpcUrl: process.env.ETHEREUM_RPC_URL || 'http://127.0.0.1:8545',
  contractAddress: process.env.CONTRACT_ADDRESS || deploymentInfo.contractAddress || '',
  
  // Ganache Account #0 (Admin) - KHÔNG ĐỔI
  privateKey: process.env.PRIVATE_KEY || '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d',
  
  gasLimit: 3000000,
  maxFeePerGas: null,
  maxPriorityFeePerGas: null,
  
  retryAttempts: 3,
  retryDelay: 2000,
};

export const validateBlockchainConfig = () => {
  if (!blockchainConfig.contractAddress) {
    console.error('⚠️  Contract chưa được deploy!');
    console.error('📝 Chạy: npm run blockchain:deploy');
    throw new Error('Contract address not configured');
  }
  
  if (!blockchainConfig.rpcUrl) {
    throw new Error('RPC URL không hợp lệ!');
  }
};

// Helper: Get Ganache accounts info
export const getGanacheAccounts = () => {
  return {
    admin: {
      address: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
      privateKey: '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d'
    },
    accounts: [
      '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1', // Account #0 (Admin)
      '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0', // Account #1
      '0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b', // Account #2
      '0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d', // Account #3
      '0xd03ea8624C8C5987235048901fB614fDcA89b117', // Account #4
    ]
  };
};