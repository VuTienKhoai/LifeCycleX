// utils/formatPrice.ts
export const formatPrice = (value: number | string, currency = "VNĐ") => {
  if (!value && value !== 0) return "";
  const numberValue = Number(value);
  if (isNaN(numberValue)) return String(value);

  return numberValue.toLocaleString("vi-VN") + " " + currency;
};
