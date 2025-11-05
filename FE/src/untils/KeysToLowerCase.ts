// utils/keysToLowerCase.ts
export function KeysToLowerCase(obj: Record<string, any>): Record<string, any> {
  if (!obj || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => KeysToLowerCase(item));
  }

  const newObj: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    newObj[key.toLowerCase()] =
      typeof value === "object" && value !== null
        ? KeysToLowerCase(value)
        : value;
  });

  return newObj;
}
