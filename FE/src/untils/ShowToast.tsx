import { toast } from "react-toastify";
import "../css/components/notification/ToastShow.css";
export const showSuccess = (msg: string) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
    className: "toast-success",
  });
};

export const showError = (msg: string) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    className: "toast-error",
  });
};

export const showWarning = (msg: string) => {
  toast.warn(msg, {
    position: "top-right",
    autoClose: 3000,
    className: "toast-warning",
  });
};
