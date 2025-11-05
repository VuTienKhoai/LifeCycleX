import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PAGE_DEFAULT } from "../../../../constants";
import { queryGetAllHospital } from "../../../../api/hospital/hospital.query";
import type TypeHospital from "../../../../types/TypeHospital";
import { deleteHospital } from "../../../../api/hospital/hospital.api";
import { showSuccess, showWarning } from "../../../../untils/ShowToast";

export function useHospitalList() {
  const [searchHospital, setSearchHospital] = useState({
    keyword: "",
    pageSize: PAGE_DEFAULT,
    page: 1,
  });
  const queryClient: any = useQueryClient();
  const { data, isFetching, refetch } = queryGetAllHospital({
    pageInfo: {
      pageSize: searchHospital.pageSize,
      page: searchHospital.page,
    },
    keyword: searchHospital.keyword.trim(),
  });
  const navigate = useNavigate();

  const handlePageChange = (page: number, pageSize: number) => {
    setSearchHospital((prev) => ({
      ...prev,
      page,
      pageSize,
    }));
  };

  const handleAdd = () => {
    navigate("/Admin/add-hospital");
  };
  const handleView = (dataHospital: TypeHospital) => {
    navigate(`/Admin/add-hospital?idHospital=${dataHospital.id}`);
  };
  const handleDelete = (id: string) => {
    if (!id) {
      showWarning("ID bệnh viện không hợp lệ");
      return;
    }
    deleteHospital({ idHospital: id })
      .then((res) => {
        if (res?.success) {
          queryClient.removeQueries(["queryGetDetailHospital"]);
          refetch();
        }
        res?.success ? showSuccess(res?.message) : showWarning(res?.message);
      })
      .catch((error) => {
        showWarning("Xóa bệnh viện thất bại");
        console.error("Lỗi khi xóa bệnh viện:", error);
      });
  };

  const handleSearchHospital = useCallback((value: string) => {
    setSearchHospital((prev) => ({
      ...prev,
      keyword: value,
      page: 1,
    }));
  }, []);

  return {
    data: data?.data || [],
    total: data?.totalRecord || 0,
    loading: isFetching,
    searchHospital,
    setSearchHospital,
    handlePageChange,
    handleAdd,
    handleView,
    handleDelete,
    handleSearchHospital,
  };
}
