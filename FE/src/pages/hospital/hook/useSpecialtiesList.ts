import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PAGE_DEFAULT } from "../../../constants";
import { deleteHospital } from "../../../api/hospital/hospital.api";
import { showSuccess, showWarning } from "../../../untils/ShowToast";
import { queryGetAllSpecialtiesByIdHospital } from "../../../api/specialties/specialties.query";
import type TypeSpecialties from "../../../types/TypeSpecialties";
import { deleteSpecialties } from "../../../api/specialties/specialties.api";

export function useSpecialtiesList() {
  const [searchSpecialties, setSearchSpecialties] = useState({
    keyword: "",
    pageSize: PAGE_DEFAULT,
    page: 1,
  });
  const queryClient: any = useQueryClient();
  const { data, isFetching, refetch } = queryGetAllSpecialtiesByIdHospital({
    pageInfo: {
      pageSize: searchSpecialties.pageSize,
      page: searchSpecialties.page,
    },
    keyword: searchSpecialties.keyword.trim(),
  });
  const navigate = useNavigate();

  const handlePageChange = (page: number, pageSize: number) => {
    setSearchSpecialties((prev) => ({
      ...prev,
      page,
      pageSize,
    }));
  };

  const handleAdd = () => {
    navigate("/hospital/add-specialties");
  };
  const handleView = (dataSpecialty: TypeSpecialties) => {
    navigate(`/hospital/add-specialties?idSpecialty=${dataSpecialty.id}`);
  };
  const handleDelete = (id: string) => {
    if (!id) {
      showWarning("ID chuyên khoa không hợp lệ");
      return;
    }
    deleteSpecialties({ id: id })
      .then((res) => {
        if (res?.success) {
          queryClient.removeQueries(["queryGetAllSpecialtiesByIdHospital"]);
          queryClient.removeQueries(["queryGetDetailSpecialties"]);
          refetch();
        }
        res?.success ? showSuccess(res?.message) : showWarning(res?.message);
      })
      .catch((error) => {
        showWarning("Xóa chuyên khoa thất bại");
        console.error("Lỗi khi xóa chuyên khoa:", error);
      });
  };

  const handleSearchSpecialties = useCallback((value: string) => {
    setSearchSpecialties((prev) => ({
      ...prev,
      keyword: value,
      page: 1,
    }));
  }, []);

  return {
    data: data?.data || [],
    total: data?.totalRecord || 0,
    loading: isFetching,
    searchSpecialties,
    setSearchSpecialties,
    handlePageChange,
    handleAdd,
    handleView,
    handleDelete,
    handleSearchSpecialties,
  };
}
