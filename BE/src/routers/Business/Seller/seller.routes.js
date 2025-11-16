import { Router } from 'express';
import { SellerController } from '../../../modules/Business/Seller/Seller.controller.js';
import { upload } from '../../../middlewares/upload.middleware.js';
import { validateQuery, paginationSchema } from '../../../validators/queryValidator.js';
const router = Router();
router.post('/register', upload.single('businessLicenseFile'), new SellerController().register);
router.get('/',validateQuery(paginationSchema), new SellerController().getAllProduct);
router.get('/service-centers', new SellerController().getAllServiceCenter);
export default router;