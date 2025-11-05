import { axiosClient, axiosClientFile } from "../../services/axiosConfig";

export const getUserInfo = () => {
  const url = `/User/GetInfoUser`;
  return axiosClient.get(url);
};
export const updateUserInfo = (body: any) => {
  const url = `/User/UpdateInfoUser`;
  return axiosClientFile.post(url, body);
};
