import { axiosClientNoAuth } from "../../services/axiosConfig";
import type { IMethodResult } from "../../types/ApiResponse";
import type {
  IForgotPassword,
  IVerifyOTPForgotPassword,
} from "../../types/TypeAuth";
import { formatParams } from "../../untils/formatParams";

export const LoginAuth = (body: any): Promise<IMethodResult<any>> => {
  const url = `/auth/login`;
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
  body: any
): Promise<IMethodResult<any>> => {
  const url = `/auth/send-reset-password`;
  return axiosClientNoAuth.post(url, body);
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

export const registerAuth = (body: any): Promise<IMethodResult<any>> => {
  const url = `/auth/register`;
  return axiosClientNoAuth.post(url, body);
};
