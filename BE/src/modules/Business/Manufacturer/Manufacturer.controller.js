import {RegisterDto} from './Manufacturer.dto.js';
import {ManufacturerService} from './Manufacturer.service.js';
import { successResponse,errorResponse } from '../../../utils/response.js';

export class ManufacturerController {
  async register(req, res) {
    try {
      const manufacturer = await new ManufacturerService().register(new RegisterDto(req.body), req.file, req.user.id);
      return successResponse(res, manufacturer, 'Manufacturer registered successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
  async getAllProduct(req, res) {
    try {
      const products = await new ManufacturerService().getAllProduct(req.user.id, req.validatedQuery);
      return successResponse(res, products, 'Products retrieved successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
  async getAllSeller(req, res) {
    try {
      const sellers = await new ManufacturerService().getAllSeller();
      return successResponse(res, sellers, 'Sellers retrieved successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
}