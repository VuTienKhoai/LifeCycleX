import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryGetAllDoctor } from "../../../api/doctor/doctor.query";
import { PAGE_DEFAULT } from "../../../constants";
import type TypeDoctor from "../../../types/TypeDoctor";
import { showSuccess, showWarning } from "../../../untils/ShowToast";
import { deleteDoctor } from "../../../api/doctor/doctor.api";

export function useDoctorList() {
  const [searchDoctor, setSearchDoctor] = useState({
    keyword: "",
    pageSize: PAGE_DEFAULT,
    page: 1,
  });
  const queryClient: any = useQueryClient();
  const { data, isFetching, refetch } = queryGetAllDoctor({
    pageInfo: {
      pageSize: searchDoctor.pageSize,
      page: searchDoctor.page,
    },
    keyword: searchDoctor.keyword.trim(),
  });
  const navigate = useNavigate();

  const handlePageChange = (page: number, pageSize: number) => {
    setSearchDoctor((prev) => ({
      ...prev,
      page,
      pageSize,
    }));
  };

  const handleAdd = () => {
    navigate("/hospital/add-doctor");
  };
  const handleView = (dataDoctor: TypeDoctor) => {
    navigate(`/hospital/add-doctor?idDoctor=${dataDoctor.id}`);
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

  const handleSearchDoctor = useCallback((value: string) => {
    setSearchDoctor((prev) => ({
      ...prev,
      keyword: value,
      page: 1,
    }));
  }, []);

  return {
    data: data?.data || [],
    total: data?.totalRecord || 0,
    loading: isFetching,
    searchDoctor,
    setSearchDoctor,
    handlePageChange,
    handleAdd,
    handleView,
    handleDelete,
    handleSearchDoctor,
  };
}
