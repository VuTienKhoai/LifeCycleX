import express from 'express';
import authRoutes from './routers/auth.routes.js';
import ManufacturerRoutes  from './routers/Business/manufacturer/manufacturer.routes.js';
import ServiceCenterRoutes  from './routers/Business/ServiceCenter/serviceCenter.routes.js';
import SellerRoutes  from './routers/Business/Seller/seller.routes.js';
import ProductRoutes from './routers/Business/product/product.routes.js';
import ReviewRoutes from './routers/admin/review.routes.js';
import CustomerRoutes from './routers/Business/customer/customer.routes.js';

import { loggerMiddleware } from './middlewares/logger.middleware.js';
import { responseTimeMiddleware } from './middlewares/responseTime.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { authMiddleware } from './middlewares/auth.middleware.js';
import passport from 'passport'; 
import './config/passport.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.static('public'));
app.use(cookieParser()); 
const allowedOrigins = [
  process.env.FRONTEND_URL,   
  process.env.FRONTEND_URL_ADMIN,
  'http://localhost:5000',
];

app.use(cors({
  origin: function (origin, callback) {
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Không được phép truy cập bởi CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(loggerMiddleware);
app.use(responseTimeMiddleware);
app.use(passport.initialize());

app.use('/auth', authRoutes);
//api for admin
app.use('/review',authMiddleware(['ADMIN']), ReviewRoutes);

//api cho những role còn lại
app.use('/customer',authMiddleware(['CUSTOMER']), CustomerRoutes);
app.use('/manufacturer',authMiddleware(['CUSTOMER', 'MANUFACTURER']), ManufacturerRoutes);
app.use('/service-center',authMiddleware(['CUSTOMER','SERVICE_CENTER']), ServiceCenterRoutes);
app.use('/seller',authMiddleware(['CUSTOMER','SELLER',]), SellerRoutes);

app.use('/product', ProductRoutes);
app.use(errorMiddleware);

export default app;
