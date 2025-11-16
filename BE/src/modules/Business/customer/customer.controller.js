import {CustomerService} from './customer.service.js';
import { successResponse,errorResponse } from '../../../utils/response.js';

export class CustomerController {
  async getProductTransactionBy(req, res) {
    try {
      const data = await new CustomerService().getProductTransactionBy(req.params.serialNumber);
      return successResponse(res, data, 'Product transaction history retrieved successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
}