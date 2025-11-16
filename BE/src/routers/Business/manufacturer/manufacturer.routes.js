import { Router } from 'express';
import { ManufacturerController } from '../../../modules/Business/Manufacturer/Manufacturer.controller.js';
import { upload } from '../../../middlewares/upload.middleware.js';
import { validateQuery, paginationSchema } from '../../../validators/queryValidator.js';
const router = Router();
router.post('/register', upload.single('businessLicenseFile'), new ManufacturerController().register);
router.get('/',validateQuery(paginationSchema), new ManufacturerController().getAllProduct);
router.get('/sellers', new ManufacturerController().getAllSeller);
export default router;