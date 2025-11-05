export interface PersonBaseDTO {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  gender?: string | null;
  birthOfDay?: string | null; // ISO Date string (từ DateTime bên .NET)
  phoneNumber?: string | null;
  address?: string | null;
  avatar?: string | null; // Dùng cho hiển thị View
}
