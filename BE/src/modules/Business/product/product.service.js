import prisma from '../../../prisma/client.js'; 
import { ServerException ,ClientException} from '../../../utils/errors.js';
import cloudinary from '../../../config/cloudinary.js';
import { unlink } from 'fs/promises';
import crypto from 'crypto';

export class ProductService {
  async createProduct(data, userId,file) {
    const tempPath = file?.path;
    try{
      if(!(await prisma.user.findUnique({where:{id:userId}}))) throw new ServerException('Tài Khoản người dùng không tồn tại', 404);
      const manufacturer = await prisma.manufacturer.findFirst({where:{userId:userId}});
      if(!manufacturer) throw new ClientException('Chỉ nhà sản xuất mới có thể tạo sản phẩm', 403);
      if(manufacturer.status !== 'approved') throw new ClientException('Tài khooan doanh nghiệp chưa được phê duyệt', 403);
      const serialNumber = crypto.randomBytes(9)
        .toString('base64')
        .replace(/[^a-zA-Z0-9]/g, '')
        .substring(0, 12)
        .toUpperCase();
      if(!file) throw new ClientException('Ảnh mô tả sản phẩm là bắt buộc', 400);
      let fileUrl ;
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'products',
        });
        fileUrl = result.secure_url;
      } catch (err) {
        throw new ServerException('Upload ảnh mô tả sản phẩm thất bại', 500);
      }

      await unlink(file.path).catch(() => {});
      const transaction = {
        from: {
          id: manufacturer.id,
          role: 'MANUFACTURER'
        },
        owner: {
          id: manufacturer.id,
          role: 'MANUFACTURER'
        },
      };
      const newProduct = await prisma.product.create({
        data: {
          serialNumber: serialNumber,
          name: data.name,
          price: data.price,
          manufactureDate: data.manufactureDate,
          manufacturerId: manufacturer.id,
          productImage: fileUrl,
          transaction: transaction,
        }
      });
      const newProductHistory = await prisma.productHistory.create({
        data: {
          product: { connect: { id: newProduct.id } },
          actionType: 'CREATED',
          user: { connect: { id: userId } },
          description: `Hành động CREATE được thực hiện bởi nhà sản xuất ${manufacturer.companyName}`,
          transaction: transaction,
        }
      });
      const newApprovalRequest = await prisma.approvalRequest.create({
        data: {
          productId: newProduct.id,
          productHistoryId: newProductHistory.id,
          action:'CREATED',
          status: 'OPEN',
          description: `Yêu cầu phê duyệt hành động CREATE sản phẩm với số serial ${newProduct.serialNumber} từ nhà sản xuất ${manufacturer.companyName}`
        }
      });
      return { newProduct,newProductHistory,newApprovalRequest };
    }finally {
      if (tempPath) await unlink(tempPath).catch(() => {});
    }
  }

  //phân phối sản phẩm
  async distributeProduct(productId, saleId){
    const productexit = await prisma.product.findUnique({where:{id:productId}});
    const manufacture = await prisma.manufacturer.findFirst({where:{id:productexit.manufacturerId}});
    const sale = await prisma.seller.findUnique({where:{id:saleId}});
    const transaction = {
      from: {
        id: manufacture.id,
        role: 'MANUFACTURER'
      },
      owner: {
        id: saleId,
        role: 'SELLER'
      },
    };
    const product = await prisma.product.update({
      where: { id: productId },
      data: { status: 'DISTRIBUTED',transaction:transaction },
    });
    const newProductHistory = await prisma.productHistory.create({
      data: {
        product: { connect: { id: productexit.id } },
        actionType: 'DISTRIBUTED',
        user: { connect: { id: manufacture.userId } },
        description: `Hành động DISTRIBUTED được thực hiện bởi nhà sản xuất ${manufacture.companyName} cho đại lý bán hàng ${sale.storeName}`,
        transaction: transaction,
      }
    });
    const newApprovalRequest = await prisma.approvalRequest.create({
      data: {
        productId: productexit.id,
        productHistoryId: newProductHistory.id,
        action:'DISTRIBUTED',
        status: 'OPEN',
        description: `Yêu cầu phê duyệt hành động DISTRIBUTED sản phẩm với số serial ${productexit.serialNumber} từ nhà sản xuất ${manufacture.companyName}`
      }
    });
    return {product,newProductHistory,newApprovalRequest};
  }

  //bán sản phẩm 
  async sellProduct(productId, customerId,userId){
    const productexit = await prisma.product.findUnique({where:{id:productId}});
    const sale = await prisma.seller.findUnique({where:{userId:userId}});
    const customer= await prisma.customer.findUnique({where:{id:customerId}});
    const transaction = {
      from: {
        id: sale.id,
        role: 'SELLER'
      },
      owner: {
        id: customerId,
        role: 'CUSTOMER'
      },
    };
    const product = await prisma.product.update({
      where: { id: productId },
      data: { status: 'SOLD',transaction:transaction },
    });
    const newProductHistory = await prisma.productHistory.create({
      data: {
        product: { connect: { id: productexit.id } },
        actionType: 'SOLD',
        user: { connect: { id: sale.userId } },
        description: `Hành động SOLD được thực hiện bởi đại lý bán hàng ${sale.storeName} cho khách hàng ${customer.fullName}`,
        transaction: transaction,
      }
    });
    const newApprovalRequest = await prisma.approvalRequest.create({
      data: {
        productId: productexit.id,
        productHistoryId: newProductHistory.id,
        action:'SOLD',
        status: 'OPEN',
        description: `Yêu cầu phê duyệt hành động SOLD sản phẩm với số serial ${productexit.serialNumber} từ đại lý bán hàng ${sale.storeName}`
      }
    });
    return {product,newProductHistory,newApprovalRequest};
  }

  //gửi bảo hành từ đại lý bán hàng
  async maintenanceBySaler(productId,serviceCenterId,userId){
    const productexit = await prisma.product.findUnique({where:{id:productId}});
    const sale = await prisma.seller.findUnique({where:{userId:userId}});
    const serviceCenter= await prisma.serviceCenter.findUnique({where:{id:serviceCenterId}});
    const transaction = {
      from: {
        id: sale.id,
        role: 'SELLER'
      },
      owner: {
        id: serviceCenterId,
        role: 'SERVICE_CENTER'
      },
    };
    const product = await prisma.product.update({
      where: { id: productId },
      data: { status: 'WARRANTY',transaction:transaction },
    });
    const newProductHistory = await prisma.productHistory.create({
      data: {
        product: { connect: { id: productexit.id } },
        actionType: 'WARRANTY',
        user: { connect: { id: sale.userId } },
        description: `Hành động WARRANTY được thực hiện bởi đại lý bán hàng ${sale.storeName} cho trung tâm bảo hành ${serviceCenter.centerName}`,
        transaction: transaction,
      }
    });
    const newApprovalRequest = await prisma.approvalRequest.create({
      data: {
        productId: productexit.id,
        productHistoryId: newProductHistory.id,
        action:'WARRANTY',
        status: 'OPEN',
        description: `Yêu cầu phê duyệt hành động WARRANTY sản phẩm với số serial ${productexit.serialNumber} từ đại lý bán hàng ${sale.storeName}`
      }
    });
    return {product,newProductHistory,newApprovalRequest};
  }

  //nhận sản phẩm bảo hành từ trực tiếp customer
  async maintenanceByCustomer(productId,customerId,userId){
    const productexit = await prisma.product.findUnique({where:{id:productId}});
    const customer = await prisma.customer.findUnique({where:{id:customerId}});
    const serviceCenter= await prisma.serviceCenter.findUnique({where:{userId:userId}});
    const transaction = {
      from: {
        id: customer.id,
        role: 'CUSTOMER'
      },
      owner: {
        id: serviceCenter.id,
        role: 'SERVICE_CENTER'
      },
    };
    const product = await prisma.product.update({
      where: { id: productId },
      data: { status: 'WARRANTY',transaction:transaction },
    });
    const newProductHistory = await prisma.productHistory.create({
      data: {
        product: { connect: { id: productexit.id } },
        actionType: 'WARRANTY',
        user: { connect: { id: serviceCenter.userId } },
        description: `Hành động WARRANTY được thực hiện bởi trung tâm bảo hành ${serviceCenter.centerName} cho Khách hàng ${customer.fullName}`,
        transaction: transaction,
      }
    });
    const newApprovalRequest = await prisma.approvalRequest.create({
      data: {
        productId: productexit.id,
        productHistoryId: newProductHistory.id,
        action:'WARRANTY',
        status: 'OPEN',
        description: `Yêu cầu phê duyệt hành động WARRANTY sản phẩm với số serial ${productexit.serialNumber} từ trung tâm bảo hành ${serviceCenter.centerName}`
      }
    });
    return {product,newProductHistory,newApprovalRequest};
  }

  //trung tâm bảo hành trả sản phẩm cho đại lý bán hàng hoặc khách hàng
  async returnFromServiceCenter(productId,userId){
    const productexit = await prisma.product.findUnique({where:{id:productId}});
    const serviceCenter= await prisma.serviceCenter.findUnique({where:{userId:userId}});
    let ownerRole;
    let onwerName;
    let onwerRoleTranslate;
    const sale= await prisma.seller.findUnique({where:{id:productexit.transaction.from.id}});
    if(sale){
      ownerRole='SELLER';
      onwerName=sale.storeName;
      onwerRoleTranslate='đại lý bán hàng';
    }
    else{
      const customer= await prisma.customer.findUnique({where:{id:productexit.transaction.from.id}});
      if(customer) {
        ownerRole='CUSTOMER';
        onwerName=customer.fullName;
        onwerRoleTranslate='khách hàng';
      }
    }
    const transaction = {
      from: {
        id: serviceCenter.id,
        role: 'SERVICE_CENTER'
      },
      owner: {
        id: productexit.transaction.from.id,
        role: ownerRole
      },
    };
    const product = await prisma.product.update({
      where: { id: productId },
      data: { status: 'REPAIRED',transaction:transaction },
    });
    const newProductHistory = await prisma.productHistory.create({
      data: {
        product: { connect: { id: productexit.id } },
        actionType: 'REPAIRED',
        user: { connect: { id: serviceCenter.userId } },
        description: `Hành động REPAIRED được thực hiện bởi trung tâm bảo hành ${serviceCenter.centerName} cho ${onwerRoleTranslate} ${onwerName}`,
        transaction: transaction,
      }
    });
    const newApprovalRequest = await prisma.approvalRequest.create({
      data: {
        productId: productexit.id,
        productHistoryId: newProductHistory.id,
        action:'REPAIRED',
        status: 'OPEN',
        description: `Yêu cầu phê duyệt hành động REPAIRED sản phẩm với số serial ${productexit.serialNumber} từ trung tâm bảo hành ${serviceCenter.centerName}`
      }
    });
    return {product,newProductHistory,newApprovalRequest};
  }
}
