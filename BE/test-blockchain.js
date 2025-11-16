import { blockchainService } from './src/blockchain/services/blockchain.service.js';

async function test() {
  try {
    console.log('🧪 Testing blockchain service...\n');

    // Test 1: Initialize
    await blockchainService.initialize();
    console.log('✅ Test 1: Initialize OK\n');

    // Test 2: Get network info
    const networkInfo = await blockchainService.getNetworkInfo();
    console.log('✅ Test 2: Network info');
    console.log(JSON.stringify(networkInfo, null, 2), '\n');

    // Test 3: Add product record
    const testProduct = {
      productId: 'test-product-001',
      serialNumber: 'ABC123456',
      action: 'CREATED',
      transaction: {
        from: { id: 'manufacturer-001', role: 'MANUFACTURER' },
        owner: { id: 'manufacturer-001', role: 'MANUFACTURER' }
      },
      description: 'Test product creation from ES6'
    };

    const result = await blockchainService.addProductRecord(testProduct);
    console.log('✅ Test 3: Add record OK');
    console.log('TX Hash:', result.txHash);
    console.log('Block:', result.blockNumber);
    console.log('Gas Used:', result.gasUsed, '\n');

    // Test 4: Get history
    const history = await blockchainService.getProductHistory('test-product-001');
    console.log('✅ Test 4: Get history OK');
    console.log('Records:', history.length);
    console.log('Data:', JSON.stringify(history, null, 2), '\n');

    // Test 5: Verify product
    const exists = await blockchainService.verifyProduct('test-product-001');
    console.log('✅ Test 5: Product exists:', exists);

    console.log('\n🎉 All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error);
  }
}

test();