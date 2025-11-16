import prisma from '../../../prisma/client.js'; 
import { ServerException ,ClientException} from '../../../utils/errors.js';
import cloudinary from '../../../config/cloudinary.js';
import { unlink } from 'fs/promises';

export class ServiceCenterService {
  async register(data, file, userId) {
    const tempPath = file?.path;
    try{
      if(!(await prisma.user.findUnique({where:{id:userId}}))) throw new ServerException('Tài Khoản người dùng không tồn tại', 404);
      if(await prisma.manufacturer.findFirst({where: { taxId: data.taxId } }) && await prisma.seller.findFirst({where: { taxId: data.taxId } }) && await prisma.serviceCenter.findFirst({where: { taxId: data.taxId } })) throw new ClientException('Mã số thuế này đã được đăng ký', 400);
      if(!file) throw new ClientException('Giấy tờ xác thực doanh nghiệp là bắt buộc', 400);
      let fileUrl ;
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'business',
          resource_type: 'raw',  
          access_mode: 'public',
        });
        fileUrl = result.secure_url;
      } catch (err) {
        throw new ServerException('Upload file xác minh thất bại', 500);
      }

      await unlink(file.path).catch(() => {});
      const newServiceCenter = await prisma.serviceCenter.create({
        data: {
          centerName: data.centerName, 
          location: data.location,
          taxId: data.taxId,
          businessLicenseFile: fileUrl,
          userId: userId
        }
      });
      return newServiceCenter;
    }finally {
      if (tempPath) await unlink(tempPath).catch(() => {});
    }
  }
  async getAllProduct(userId, query) {
    const serviceCenter = await prisma.serviceCenter.findUnique({where:{userId:userId}});
    if(!serviceCenter) throw new ClientException('Đại lý bán hàng không tồn tại',404);
    
    const products = await prisma.product.findMany({
      skip: query.offset,
      take: query.limit,
      orderBy: { createdAt: 'desc' },
    });
    const filteredProducts = products.filter(p => p.transaction?.owner?.id === serviceCenter.id && p.transaction?.owner?.role === 'SERVICE_CENTER');

    const allProducts = await prisma.product.findMany({
    });
    const totalFiltered = allProducts.filter(p => p.transaction?.owner?.id=== serviceCenter.id && p.transaction?.owner?.role === 'SERVICE_CENTER' ).length;
    const totalPages = Math.ceil(totalFiltered / query.limit);

    return {
      data: filteredProducts,
      pagination: {
        total: totalFiltered,
        totalPages,
        limit: query.limit,
        offset: query.offset,
      },
    };
  }

  async getAllCustomer(){
    const customers = await prisma.user.findMany({
      where: { roles: { has: 'CUSTOMER' } },
    });
    return customers;
  }
}
