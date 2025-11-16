import { Router } from 'express';
import { ReviewController } from '../../modules/admin/review/review.controller.js';

const router = Router();
router.post('/approve-business/:businessId', new ReviewController().approveBusinessAccount);
router.post('/approve-request/:requestId', new ReviewController().approveRequest);
router.get('/pending-businesses', new ReviewController().getAllBusinessAccount);
router.get('/open-requests', new ReviewController().getAllRequest);
export default router;