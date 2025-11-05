import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PAGE_DEFAULT } from "../../../constants";
import { showSuccess, showWarning } from "../../../untils/ShowToast";
import { deleteDoctor } from "../../../api/doctor/doctor.api";
import { queryGetAllMedicalHistory } from "../../../api/medical-history/medicalHistory.query";
import type { TypeMedicalHistory } from "../../../types/TypeMedicalHistory";
import { useSelector } from "react-redux";
import { infoUserState } from "../../../features/slices/user.slice";

export function useListMedicalHistory() {
  const [searchMedicalHistory, setSearchMedicalHistory] = useState({
    keyword: "",
    pageSize: PAGE_DEFAULT,
    page: 1,
  });
  const [modaleReady, setModalReady] = useState(false);
  const [selectedMedicalHistory, setSelectedMedicalHistory] =
    useState<TypeMedicalHistory>();
  const handleSearchMedicalHistory = useCallback((value: string) => {
    setSearchMedicalHistory((prev) => ({
      ...prev,
      keyword: value,
      page: 1,
    }));
  }, []);
  const queryClient: any = useQueryClient();
  const { data, isFetching, refetch } = queryGetAllMedicalHistory({
    pageInfo: {
      pageSize: searchMedicalHistory.pageSize,
      page: searchMedicalHistory.page,
    },
    keyword: searchMedicalHistory.keyword.trim(),
  });

  const navigate = useNavigate();

  const handlePageChange = (page: number, pageSize: number) => {
    setSearchMedicalHistory((prev) => ({
      ...prev,
      page,
      pageSize,
    }));
  };

  const handleAdd = () => {
    navigate("/hospital/add-doctor");
  };
  const handleView = (dataMedicalHistory: TypeMedicalHistory) => {
    navigate(`/hospital/add-doctor?idDoctor=${dataMedicalHistory.id}`);
  };
  const handleDelete = (id: string) => {
    if (!id) {
      showWarning("ID bệnh viện không hợp lệ");
      return;
    }
    deleteDoctor({ id: id })
      .then((res) => {
        if (res?.success) {
          queryClient.removeQueries(["queryGetDetailDoctor"]);
          refetch();
        }
        res?.success ? showSuccess(res?.message) : showWarning(res?.message);
      })
      .catch((error) => {
        showWarning("Có lỗi xảy ra ");
        console.error("Lỗi khi xóa bệnh viện:", error);
      });
  };

  const handleViewDetail = useCallback((value: TypeMedicalHistory) => {
    setSelectedMedicalHistory(value);
    setModalReady(true);
  }, []);

  return {
    data: data?.data || [],
    total: data?.totalRecord || 0,
    loading: isFetching,
    searchMedicalHistory,
    setSearchMedicalHistory,
    handlePageChange,
    handleAdd,
    handleView,
    handleDelete,
    handleSearchMedicalHistory,
    selectedMedicalHistory,
    modaleReady,
    setModalReady,
    handleViewDetail,
  };
}
