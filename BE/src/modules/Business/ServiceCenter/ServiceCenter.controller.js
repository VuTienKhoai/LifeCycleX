import {RegisterDto} from './ServiceCenter.dto.js';
import {ServiceCenterService} from './ServiceCenter.service.js';
import { successResponse,errorResponse } from '../../../utils/response.js';

export class ServiceCenterController {
  async register(req, res) {
    try {
      const manufacturer = await new ServiceCenterService().register(new RegisterDto(req.body), req.file, req.user.id);
      return successResponse(res, manufacturer, 'ServiceCenter registered successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
  async getAllProduct(req, res) {
    try {
      const products = await new ServiceCenterService().getAllProduct(req.user.id, req.validatedQuery);
      return successResponse(res, products, 'Products retrieved successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }

  async getAllCustomer(req, res) {
    try {
      const customers = await new ServiceCenterService().getAllCustomer();
      return successResponse(res, customers, 'Customers retrieved successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
}