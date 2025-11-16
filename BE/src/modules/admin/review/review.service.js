import prisma from '../../../prisma/client.js'; 
import { ServerException } from '../../../utils/errors.js';
import { blockchainService } from '../../../blockchain/services/blockchain.service.js';

export class ReviewService {
  async getAllBusinessAccount(){
    const manufacturers = await prisma.manufacturer.findMany({
      include: { user: true }
    });
    const sellers = await prisma.seller.findMany({
      include: { user: true }
    });
    const serviceCenters = await prisma.serviceCenter.findMany({
      include: { user: true }
    });
    return { manufacturers, sellers, serviceCenters };
  }


  async ApproveBusinessAccount(businessId) {
    let modelName;
    let roleUsser;
    if (await prisma.manufacturer.findUnique({ where: { id: businessId } })) 
    {
      modelName = 'manufacturer';
      roleUsser='MANUFACTURER';
    }
    else if (await prisma.seller.findUnique({ where: { id: businessId } })) 
    {
      modelName = 'seller';
      roleUsser='SELLER';
    }
    else if (await prisma.serviceCenter.findUnique({ where: { id: businessId } })) 
    {
      modelName = 'serviceCenter';
      roleUsser='SERVICE_CENTER';
    }
    else throw new ServerException('Tài khoản doanh nghiệp không tồn tại', 404);
    const updatedBusiness = await prisma[modelName].update({
      where: { id: businessId },
      data: { status: 'approved' },
    });
    const user = await prisma.user.update({
      where: { id: updatedBusiness.userId },
      data: {
        roles: {
          push: roleUsser,
        },
      },
    });
    return {updatedBusiness,user};
  }

  async ApproveRequest(requestId) {
    const request = await prisma.approvalRequest.findUnique({ 
      where: { id: requestId },
      include: {
        product: {
          include: {
            manufacturer: true
          }
        },
        productHistory: true
      }
    });

    if (!request) {
      throw new ServerException('Yêu cầu không tồn tại', 404);
    }

    if (request.status !== 'OPEN') {
      throw new ServerException('Yêu cầu đã được xử lý', 400);
    }

    if (!request.product) {
      throw new ServerException('Không tìm thấy sản phẩm', 404);
    }
    try {
      console.log(`🔄 Processing approval for request: ${requestId}`);
      
      const blockchainData = {
        productId: request.productId,
        serialNumber: request.product.serialNumber,
        action: request.action, // CREATED, DISTRIBUTED, SOLD, WARRANTY, REPAIRED
        transaction: request.productHistory.transaction,
        description: request.description
      };

      console.log('📤 Sending to blockchain:', blockchainData);

      // 4. Ghi lên blockchain (CHỈ KHI APPROVE)
      const blockchainResult = await blockchainService.addProductRecord(blockchainData);
      
      console.log('✅ Blockchain TX confirmed:', blockchainResult.txHash);

      
      await prisma.$transaction(async (tx) => {
  
        const updatedRequest = await tx.approvalRequest.update({
          where: { id: requestId },
          data: { 
            status: 'APPROVED',
            approvedAt: new Date()
          },
        });

        const updatedProduct = await tx.product.update({
          where: { id: request.productId },
          data: {
            blockchainHash: blockchainResult.txHash,
            updatedAt: new Date()
          }
        });

        const updatedHistory = await tx.productHistory.update({
          where: { id: request.productHistoryId },
          data: {
            txHash: blockchainResult.txHash
          }
        });

        return { updatedRequest, updatedProduct, updatedHistory };
      });

    } catch (error) {
      throw new ServerException(`Không thể phê duyệt: ${error.message}`, 500);
    }
  }

  async getAllRequest(){
    const requests = await prisma.approvalRequest.findMany({
      where: { status: 'OPEN' },
      include: {
        product: {
          include: {
            manufacturer: true
          }
        },
        productHistory: true
      }
    });
    return requests;
  }
}
