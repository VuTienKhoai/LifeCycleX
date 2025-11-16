import { Router } from 'express';
import { ProductController } from '../../../modules/Business/product/product.controller.js';
import { upload } from '../../../middlewares/upload.middleware.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();
//hành động của nhà sản xuất
router.post('/create',authMiddleware(['MANUFACTURER']), upload.single('productImage'), new ProductController().createProduct);
router.post('/distributed/:productId/:saleId',authMiddleware(['MANUFACTURER']), new ProductController().distributeProduct);
//hành động của đại lý bán hàng
router.post('/sell/:productId/:customerId',authMiddleware(['SELLER']), new ProductController().sellProduct);
router.post('/maintenanceBySaler/:productId/:serviceCenterId',authMiddleware(['SELLER']), new ProductController().maintenanceBySaler);
//hành động của trung tâm bảo hành
router.post('/maintenanceByCustomer/:productId/:customerId',authMiddleware(['SERVICE_CENTER']), new ProductController().maintenanceByCustomer);
router.post('/returnFromServiceCenter/:productId',authMiddleware(['SERVICE_CENTER']), new ProductController().returnFromServiceCenter);
export default router;