import { jwtDecode } from "jwt-decode";

interface ParsedUserInfo {
  userId?: string;
  email?: string;
  role?: string;
  exp?: number;
}

export const parseToken = (token: string): ParsedUserInfo | null => {
  try {
    const decoded: any = jwtDecode(token);

    // const userId = decoded["nameid"]; // hoặc decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    // const role = decoded["role"];
    // const exp = decoded.exp;

    // userinfo là JSON base64
    let userInfoDecoded: any = null;
    if (decoded["userinfo"]) {
      const userInfoJson = atob(decoded["userinfo"]); // decode base64
      userInfoDecoded = JSON.parse(userInfoJson);
    }

    return userInfoDecoded;
  } catch (error) {
    console.error("Token không hợp lệ:", error);
    return null;
  }
};
