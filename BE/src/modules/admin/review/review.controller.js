import {ReviewService} from './review.service.js';
import { successResponse,errorResponse } from '../../../utils/response.js';

export class ReviewController {
  async getAllBusinessAccount(req, res) {
    try {
      const businesses = await new ReviewService().getAllBusinessAccount();
      return successResponse(res, businesses, 'Pending business accounts retrieved successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }

  async approveBusinessAccount(req, res) {
    try {
      const business = await new ReviewService().ApproveBusinessAccount(req.params.businessId);
      return successResponse(res, business, 'Business account approved successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
  async approveRequest(req, res) {
    try {
      const request = await new ReviewService().ApproveRequest(req.params.requestId);
      return successResponse(res, request, 'Approval request approved successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
  async getAllRequest(req, res) {
    try {
      const requests = await new ReviewService().getAllRequest();
      return successResponse(res, requests, 'Pending approval requests retrieved successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, error.status || 500);
    }
  }
}