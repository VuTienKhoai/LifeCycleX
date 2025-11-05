// validators.ts

// Email
export const emailRules = [
  { required: true, message: "Vui lòng nhập email" },
  { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email không hợp lệ" },
  {
    validator: (_: any, value: string) => {
      if (value && value.trim() !== value) {
        return Promise.reject("Email không được có khoảng trắng đầu/cuối");
      }
      return Promise.resolve();
    },
  },
];

// Số điện thoại Việt Nam
export const phoneRules = [
  { required: true, message: "Vui lòng nhập số điện thoại" },
  {
    pattern: /^[0-9]{10,11}$/,
    message: "Số điện thoại phải từ 10 đến 11 chữ số",
  },
  {
    validator: (_: any, value: string) => {
      if (value && value.trim() !== value) {
        return Promise.reject(
          "Số điện thoại không được có khoảng trắng đầu/cuối"
        );
      }
      return Promise.resolve();
    },
  },
];

// Tên người dùng
export const nameRules = [
  { required: true, message: "Vui lòng nhập thông tin" },
  {
    validator: (_: any, value: string) => {
      if (value && value.trim() !== value) {
        return Promise.reject("Không được có khoảng trắng đầu/cuối");
      }
      return Promise.resolve();
    },
  },
];

export const websiteRules = [
  { required: true, message: "Vui lòng nhập website" },
  {
    pattern: /^(https?:\/\/)?([\w.-]+)\.[a-zA-Z]{2,}(\/.*)?$/,
    message: "Website không hợp lệ",
  },
  {
    validator: (_: any, value: string) => {
      if (value && value.trim() !== value) {
        return Promise.reject("Website không được có khoảng trắng đầu/cuối");
      }
      return Promise.resolve();
    },
  },
];

export const birthDayRules = [
  { required: true, message: "Vui lòng chọn ngày " },
];

// Mô tả sản phẩm
export const descriptionRules = [
  { required: false },
  { max: 255, message: "Mô tả không vượt quá 255 ký tự" },
];

// Giá sản phẩm
export const priceRules = [
  { required: true, message: "Giá trị là bắt buộc" },
  {
    validator: (_: any, value: any) => {
      if (value === undefined || value === null) return Promise.resolve();
      if (isNaN(value)) {
        return Promise.reject("Giá phải là số");
      }
      if (value <= 0) {
        return Promise.reject("Giá phải lớn hơn 0");
      }
      return Promise.resolve();
    },
  },
];
