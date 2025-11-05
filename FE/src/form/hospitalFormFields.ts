import type { Field } from "../components/DynamicForm";
import {
  emailRules,
  nameRules,
  phoneRules,
  websiteRules,
} from "../untils/validators";

export const hospitalFormFields: Field[] = [
  {
    name: "name",
    label: "Tên bệnh viện",
    type: "text",
    rules: nameRules,
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    rules: emailRules,
  },
  {
    name: "phoneNumber",
    label: "Số điện thoại",
    type: "text",
    rules: phoneRules,
  },
  {
    name: "address",
    label: "Địa chỉ",
    type: "text",
    rules: [{ required: true, message: "Vui lòng nhập địa chỉ" }],
  },
  {
    name: "password",
    label: "Mật khẩu",
    type: "password",
    rules: [{ required: true, message: "Vui lòng nhập mật khẩu" }],
  },
  { name: "birthOfDay", label: "Ngày thành lập", type: "date", rules: [] },
  {
    name: "website",
    label: "Website",
    type: "text",
    rules: websiteRules,
  },

  {
    name: "avatarFile",
    label: "Ảnh đại diện",
    type: "file",
    rules: [{ required: true, message: "Vui lòng tải lên ảnh đại diện" }],
  },
];
