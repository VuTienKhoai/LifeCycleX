// scripts/deploy.js
import hre from 'hardhat';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('🚀 Deploying ProductTracking contract...');

  const ProductTracking = await hre.ethers.getContractFactory('ProductTracking');
  const productTracking = await ProductTracking.deploy();

  await productTracking.waitForDeployment();
  
  const contractAddress = await productTracking.getAddress();

  console.log('✅ ProductTracking deployed to:', contractAddress);

  // Lưu deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    network: hre.network.name,
    deployedAt: new Date().toISOString()
  };

  // Tạo file config tự động
  const configDir = path.join(__dirname, '../src/blockchain/config');
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(configDir, 'deployment.json'),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log('📝 Deployment info saved to src/blockchain/config/deployment.json');
  
  const [deployer] = await hre.ethers.getSigners();
  console.log('\n🔑 Admin address:', deployer.address);
  console.log('\n⚠️  Copy thông tin này vào file .env:');
  console.log(`CONTRACT_ADDRESS=${contractAddress}`);
  console.log(`PRIVATE_KEY=${process.env.PRIVATE_KEY || '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d'}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });