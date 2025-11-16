import { Router } from 'express';
import { ServiceCenterController } from '../../../modules/Business/ServiceCenter/ServiceCenter.controller.js';
import { upload } from '../../../middlewares/upload.middleware.js';
import { validateQuery, paginationSchema } from '../../../validators/queryValidator.js';
const router = Router();
router.post('/register', upload.single('businessLicenseFile'), new ServiceCenterController().register);
router.get('/',validateQuery(paginationSchema), new ServiceCenterController().getAllProduct);
router.get('/customers', new ServiceCenterController().getAllCustomer);
export default router;