import prisma from '../../../prisma/client.js'; 
import { ServerException } from '../../../utils/errors.js';
import { blockchainService } from '../../../blockchain/services/blockchain.service.js';

export class CustomerService {
  async getProductTransactionBy(serialNumber) {
    // 1. Lấy product
    const product = await prisma.product.findUnique({
      where: { serialNumber },
    });
    if (!product) throw new ServerException('Sản phẩm không tồn tại', 404);

    // 2. Lấy tất cả history của product
    const allHistories = await prisma.productHistory.findMany({
      where: { productId: product.id },
    });

    if (allHistories.length === 0)
      throw new ServerException('Sản phẩm chưa có lịch sử giao dịch', 404);

    // 3. Lọc history có txHash để gọi blockchain
    const historiesWithTx = allHistories.filter(h => h.txHash);

    // 4. Lấy blockchain data cho những history có txHash
    const blockchainDataMap = {};
    await Promise.all(
      historiesWithTx.map(async h => {
        try {
          const data = await blockchainService.getTransactionDetails(h.txHash);
          blockchainDataMap[h.id] = data; // lưu theo id của productHistory
        } catch (err) {
          blockchainDataMap[h.id] = null; // nếu fail thì vẫn hiển thị nhưng kèm null
        }
      })
    );

    // 5. Ghép blockchain info vào từng productHistory
    const historiesWithStatus = allHistories.map(h => ({
      ...h,
      blockchain: blockchainDataMap[h.id] || null, // null nếu chưa có blockchain
      status: h.txHash ? 'confirmed' : 'pending', // phân biệt trạng thái
    }));

    return { product, histories: historiesWithStatus };
  }
}
