import {CreateProductDto} from './product.dto.js';
import {ProductService} from './product.service.js';
import { successResponse,errorResponse } from '../../../utils/response.js';

export class ProductController {
  async createProduct(req, res) {
    try {
      const product = await new ProductService().createProduct(new CreateProductDto(req.body), req.user.id, req.file);
      return successResponse(res, product, 'Product created successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
  async distributeProduct(req, res) {
    try {
      const product = await new ProductService().distributeProduct(req.params.productId, req.params.saleId);
      return successResponse(res, product, 'Product distributed successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
  async sellProduct(req, res) {
    try {
      const product = await new ProductService().sellProduct(req.params.productId, req.params.customerId,req.user.id);
      return successResponse(res, product, 'Product sold successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
  async maintenanceBySaler(req,res){
    try {
      const product = await new ProductService().maintenanceBySaler(req.params.productId, req.params.serviceCenterId,req.user.id);
      return successResponse(res, product, 'Product sent to service center for maintenance successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
  async maintenanceByCustomer(req,res){
    try {
      const product = await new ProductService().maintenanceByCustomer(req.params.productId, req.params.customerId,req.user.id);
      return successResponse(res, product, 'Product sent to service center for maintenance successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
  async returnFromServiceCenter(req,res){
    try {
      const product = await new ProductService().returnFromServiceCenter(req.params.productId,req.user.id);
      return successResponse(res, product, 'Product returned from service center successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
}