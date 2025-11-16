import { ethers } from 'ethers';
import { blockchainConfig, validateBlockchainConfig } from '../config/blockchain.config.js';
import { ServerException } from '../../utils/errors.js';

class BlockchainService {
  constructor() {
    this.provider = null;
    this.wallet = null;
    this.contract = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      validateBlockchainConfig();

      // Create provider
      this.provider = new ethers.JsonRpcProvider(blockchainConfig.rpcUrl);

      // Create wallet
      this.wallet = new ethers.Wallet(blockchainConfig.privateKey, this.provider);

      // Contract ABI
      const contractABI = [
        'function addProductRecord(string _productId, string _serialNumber, string _action, string _fromId, string _fromRole, string _ownerId, string _ownerRole, string _description) public returns (bool)',
        'function getProductHistoryCount(string _productId) public view returns (uint256)',
        'function getProductRecord(string _productId, uint256 _index) public view returns (string, string, string, string, string, string, uint256, string)',
        'function productExistsOnChain(string _productId) public view returns (bool)',
        'event ProductRecordAdded(string indexed productId, string serialNumber, string action, uint256 timestamp)'
      ];

      // Create contract instance
      this.contract = new ethers.Contract(
        blockchainConfig.contractAddress,
        contractABI,
        this.wallet
      );

      this.initialized = true;
      console.log('✅ Blockchain service initialized');
      console.log('🔗 Network:', blockchainConfig.network);
      console.log('📍 Contract:', blockchainConfig.contractAddress);
      console.log('👤 Admin:', this.wallet.address);
    } catch (error) {
      console.error('❌ Blockchain init failed:', error.message);
      throw new ServerException('Failed to init blockchain: ' + error.message, 500);
    }
  }

  async addProductRecord(productData) {
    await this.ensureInitialized();

    try {
      const { productId, serialNumber, action, transaction, description } = productData;

      // Send transaction
      const tx = await this.contract.addProductRecord(
        productId,
        serialNumber,
        action,
        transaction.from.id,
        transaction.from.role,
        transaction.owner.id,
        transaction.owner.role,
        description || ''
      );

      console.log('⏳ TX sent:', tx.hash);

      // Wait for confirmation
      const receipt = await tx.wait();
      console.log('✅ TX confirmed in block:', receipt.blockNumber);

      return {
        txHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        status: receipt.status === 1 ? 'success' : 'failed'
      };
    } catch (error) {
      console.error('❌ Blockchain TX failed:', error);
      throw new ServerException(`Blockchain error: ${error.shortMessage || error.message}`, 500);
    }
  }

  async getProductHistory(productId) {
    await this.ensureInitialized();

    try {
      const count = await this.contract.getProductHistoryCount(productId);
      const history = [];

      for (let i = 0; i < count; i++) {
        const record = await this.contract.getProductRecord(productId, i);
        history.push({
          serialNumber: record[0],
          action: record[1],
          from: { id: record[2], role: record[3] },
          owner: { id: record[4], role: record[5] },
          timestamp: Number(record[6]),
          description: record[7]
        });
      }

      return history;
    } catch (error) {
      console.error('❌ Get history failed:', error);
      throw new ServerException('Failed to fetch blockchain history', 500);
    }
  }

  async verifyProduct(productId) {
    await this.ensureInitialized();
    
    try {
      return await this.contract.productExistsOnChain(productId);
    } catch (error) {
      console.error('❌ Verify failed:', error);
      return false;
    }
  }

  async getTransactionDetails(txHash) {
    await this.ensureInitialized();
    
    try {
      const tx = await this.provider.getTransaction(txHash);
      const receipt = await this.provider.getTransactionReceipt(txHash);
      
      if (!tx || !receipt) {
        throw new Error('Transaction not found');
      }

      const block = await this.provider.getBlock(receipt.blockNumber);

      return {
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        status: receipt.status === 1 ? 'success' : 'failed',
        timestamp: block.timestamp
      };
    } catch (error) {
      console.error('❌ Get TX details failed:', error);
      throw new ServerException('Transaction not found', 404);
    }
  }

  async ensureInitialized() {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  // Helper: Get current network info
  async getNetworkInfo() {
    await this.ensureInitialized();
    
    const network = await this.provider.getNetwork();
    const blockNumber = await this.provider.getBlockNumber();
    const balance = await this.provider.getBalance(this.wallet.address);

    return {
      chainId: Number(network.chainId),
      name: network.name,
      blockNumber: blockNumber,
      adminAddress: this.wallet.address,
      adminBalance: ethers.formatEther(balance)
    };
  }
}

// Singleton instance
export const blockchainService = new BlockchainService();