// AuthRoutes.ts
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import OtpVerifyForgotPassword from "../pages/auth/OtpVerifyForgotPassword";
import OtpVerifyRegister from "../pages/auth/OtpVerifyRegister";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";

export const AuthMainRoutes = [
  {
    path: "/auth",
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      {
        path: "otp-verify-forgot-password",
        element: <OtpVerifyForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <OtpVerifyRegister />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <Navigate to="/auth/login141241" replace />,
  // },
];
