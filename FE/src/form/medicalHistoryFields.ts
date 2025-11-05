import type { Field } from "../components/DynamicForm";

export const medicalRecordFormFields: Field[] = [
  {
    name: "diagnosis",
    label: "Chuẩn đoán",
    type: "textarea",
    rules: [
      { required: true, message: "Vui lòng nhập chuẩn đoán" },
      { max: 500, message: "Chuẩn đoán không vượt quá 500 ký tự" },
    ],
  },
  {
    name: "medication",
    label: "Thuốc điều trị",
    type: "textarea",
    rules: [
      { required: true, message: "Vui lòng nhập thuốc điều trị" },
      { max: 500, message: "Thuốc điều trị không vượt quá 500 ký tự" },
    ],
  },
];
