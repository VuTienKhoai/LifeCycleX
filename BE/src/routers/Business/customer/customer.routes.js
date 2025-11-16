import { Router } from 'express';
import { CustomerController } from '../../../modules/Business/customer/customer.controller.js';
import { upload } from '../../../middlewares/upload.middleware.js';
import { validateQuery, paginationSchema } from '../../../validators/queryValidator.js';


const router = Router();
router.get('/product-transaction/:serialNumber', new CustomerController().getProductTransactionBy);
export default router;