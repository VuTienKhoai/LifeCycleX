export interface IAuthLogin {
  email: string;
  password: string;
}

export interface IVerifyOTPForgotPassword {
  email: string;
  Otp: string;
}

export interface IForgotPassword {
  email: string;
  password: string;
}
