import { axiosClientNoAuth } from "../../services/axiosConfig";
import type { IMethodResult } from "../../types/ApiResponse";
import type {
  IForgotPassword,
  IVerifyOTPForgotPassword,
} from "../../types/TypeAuth";
import { formatParams } from "../../untils/formatParams";

export const LoginAuth = (body: any): Promise<IMethodResult<any>> => {
  const url = `/Auth/Login`;
  return axiosClientNoAuth.post(url, body);
};

export const ResendOtpForgotPasswordAuth = (
  params: any
): Promise<IMethodResult<any>> => {
  const query = formatParams(params);
  const url = `/Auth/ResendOtpForgotPassword${query}`;
  return axiosClientNoAuth.post(url);
};

export const SendOtpForgotPasswordAuth = (
  params: any
): Promise<IMethodResult<any>> => {
  const query = formatParams(params);
  const url = `/Auth/SendOtpForgotPassword${query}`;
  return axiosClientNoAuth.post(url);
};

export const VerifyOtpForgotPasswordAuth = (
  body: IVerifyOTPForgotPassword
): Promise<IMethodResult<any>> => {
  const url = `/Auth/VerifyOtpForgotPassword`;
  return axiosClientNoAuth.post(url, body);
};

export const ForgotPassworrdAuth = (
  body: IForgotPassword
): Promise<IMethodResult<any>> => {
  const url = `/Auth/ForgotPassword`;
  return axiosClientNoAuth.post(url, body);
};
