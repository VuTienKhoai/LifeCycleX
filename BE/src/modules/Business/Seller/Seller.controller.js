import {RegisterDto} from './Seller.dto.js';
import {SellerService} from './Seller.service.js';
import { successResponse,errorResponse } from '../../../utils/response.js';

export class SellerController {
  async register(req, res) {
    try {
      const manufacturer = await new SellerService().register(new RegisterDto(req.body), req.file, req.user.id);
      return successResponse(res, manufacturer, 'Seller registered successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
  async getAllProduct(req, res) {
    try {
      const products = await new SellerService().getAllProduct(req.user.id, req.validatedQuery);
      return successResponse(res, products, 'Products retrieved successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
  async getAllServiceCenter(req, res) {
    try {
      const serviceCenters = await new SellerService().getAllServiceCenter();
      return successResponse(res, serviceCenters, 'Service Centers retrieved successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
}