import type { Field } from "../components/DynamicForm";
import { POSITION_OPTIONS } from "../constants";
import {
  birthDayRules,
  emailRules,
  nameRules,
  phoneRules,
  priceRules,
} from "../untils/validators";

export const doctorFormFields: Field[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    rules: emailRules,
  },
  {
    name: "password",
    label: "Mật khẩu",
    type: "password",
    rules: [{ required: true, message: "Vui lòng nhập mật khẩu" }],
  },
  {
    name: "name",
    label: "Họ và tên",
    type: "text",
    rules: nameRules,
  },
  {
    name: "price",
    label: "Giá khám",
    type: "price",
    rules: priceRules,
  },
  {
    name: "gender",
    label: "Giới tính",
    type: "select",
    options: [
      { label: "Nam", value: "Male" },
      { label: "Nữ", value: "Female" },
      { label: "Khác", value: "Other" },
    ],
    rules: [{ required: true, message: "Vui lòng chọn giới tính" }],
  },
  {
    name: "idSpeciaties",
    label: "Chuyên khoa",
    type: "select",
    options: [],
    rules: [{ required: true, message: "Vui lòng chọn chuyên khoa" }],
  },
  {
    name: "birthOfDay",
    label: "Ngày sinh",
    type: "date",
    rules: birthDayRules,
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
    fullWidth: true,
  },
  {
    name: "postion",
    label: "Chức vụ",
    type: "select",
    rules: [{ required: true, message: "Vui lòng chọn chức vụ" }],
    options: POSITION_OPTIONS,
  },
  {
    name: "avatarFile",
    label: "Ảnh đại diện",
    type: "file",
    rules: [{ required: false }],
  },
];
