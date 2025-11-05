export interface UserLogin {
  id?: string;
  name: string;
  email: string;
  gioiTinh?: string;
  namSinh?: string; // Nếu cần, có thể chuyển thành Date
  sdt?: string;
  diaChi?: string;
  avatar?: string;
  isVerified?: boolean;
  createdAt?: string; // Nếu cần, có thể chuyển thành Date
  updatedAt?: string; // Nếu cần, có thể chuyển thành Date
}
