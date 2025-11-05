import { useState } from "react";
import type { TypeNotification } from "../../../../types/TypeNotification";

interface SearchNotification {
  keyword: string;
  page: number;
  pageSize: number;
}

export const useNotificationList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TypeNotification[]>([
    {
      senderId: "ADMIN001",
      receiverId: "USER001",
      deviceTokenId: "TOKEN123",
      title: "Thông báo bảo trì hệ thống",
      body: "Hệ thống sẽ bảo trì vào ngày 10/11/2025",
      isRead: false,
    },
  ]);
  const [total, setTotal] = useState(0);
  const [searchNotification, setSearchNotification] =
    useState<SearchNotification>({
      keyword: "",
      page: 1,
      pageSize: 10,
    });

  const handlePageChange = (page: number, pageSize: number) => {
    setSearchNotification((prev) => ({
      ...prev,
      page,
      pageSize,
    }));
  };

  const handleAdd = () => {
    // Xử lý thêm mới thông báo
  };

  const handleView = (record: TypeNotification) => {
    // Xử lý xem chi tiết thông báo
  };

  const handleDelete = (id: string) => {
    // Xử lý xóa thông báo
  };

  const handleSearchNotification = (keyword: string) => {
    setSearchNotification((prev) => ({
      ...prev,
      keyword,
      page: 1,
    }));
  };

  return {
    data,
    total,
    loading,
    searchNotification,
    handlePageChange,
    handleAdd,
    handleView,
    handleDelete,
    handleSearchNotification,
  };
};
