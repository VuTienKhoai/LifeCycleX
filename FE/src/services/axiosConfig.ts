import axios from "axios";
import { APP_URL } from "../constants/Url";

// ✅ Request interceptor — không còn thêm Bearer
const handleRequest = (config: any) => {
  // Để axios tự throw lỗi nếu ngoài 200–299
  config.validateStatus = (status: number) => {
    return status >= 200 && status < 300;
  };

  return config;
};

const handleRequestError = (error: any) => {
  return Promise.reject(error);
};

// ✅ Response interceptor
const handleResponse = (response: any) => {
  return response.data;
};

const handleResponseError = async (error: any) => {
  console.error("axios error:", error);
  return Promise.reject(error.response?.data || error);
};

// ⚙️ Tạo các client riêng biệt cho từng loại
export const axiosClient = axios.create({
  baseURL: APP_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosClientFile = axios.create({
  baseURL: APP_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

export const axiosClientNoAuth = axios.create({
  baseURL: APP_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🧩 Gắn interceptor vào tất cả client
axiosClient.interceptors.request.use(handleRequest, handleRequestError);
axiosClient.interceptors.response.use(handleResponse, handleResponseError);

axiosClientFile.interceptors.request.use(handleRequest, handleRequestError);
axiosClientFile.interceptors.response.use(handleResponse, handleResponseError);

axiosClientNoAuth.interceptors.response.use(
  handleResponse,
  handleResponseError
);
