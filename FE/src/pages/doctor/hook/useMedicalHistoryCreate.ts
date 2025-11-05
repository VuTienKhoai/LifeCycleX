// src/hooks/useDoctorForm.ts
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import type { Field } from "../../../components/DynamicForm";
import { medicalRecordFormFields } from "../../../form/medicalHistoryFields";
import { AddOrUpdateMedicalHistory } from "../../../api/medical-history/medicalHistory.api";
import { showError, showSuccess, showWarning } from "../../../untils/ShowToast";

export function useMedicalHistory() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idSchedule = searchParams.get("idSchedule");

  const idMedicalHistory = searchParams.get("idMedicalHistory");

  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<any>(null);
  const [formFields, setFormFields] = useState<Field[]>(
    medicalRecordFormFields
  );
  const formRef = useRef<any>(null);

  // fetch specialties
  //   const { data: specialtiesRes } = queryGetAllSpecialtiesByIdHospital({
  //     pageInfo: { pageSize: 9999, page: 1 },
  //     keyword: "",
  //   });

  // fetch doctor detail
  //   const { data: doctorRes } = queryGetDetailDoctor(
  //     idDoctor ? { id: idDoctor } : undefined
  //   );

  //   // map options chuyên khoa
  //   const specialtiesOptions = useMemo(
  //     () =>
  //       specialtiesRes?.data?.map((item: any) => ({
  //         label: item.name,
  //         value: item.id,
  //       })) ?? [],
  //     [specialtiesRes]
  //   );

  // inject chuyên khoa vào field
  //   useEffect(() => {
  //     if (specialtiesOptions.length > 0) {
  //       setFormFields((prev) =>
  //         prev.map((field) =>
  //           field.name === "idSpeciaties"
  //             ? { ...field, options: specialtiesOptions }
  //             : field
  //         )
  //       );
  //     }
  //   }, [specialtiesOptions]);

  //   // set initialValues khi edit
  //   useEffect(() => {
  //     if (doctorRes?.success && doctorRes.data && idDoctor) {
  //       const doctor = doctorRes.data;
  //       setInitialValues({
  //         name: doctor.name,
  //         email: doctor.email,
  //         phoneNumber: doctor.phoneNumber,
  //         address: doctor.address,
  //         birthOfDay: doctor.birthOfDay ? dayjs(doctor.birthOfDay) : null,
  //         avatarFile: doctor?.avatar || null,
  //         postion: doctor?.position,
  //         price: doctor?.price,
  //         idSpeciaties: doctor?.idSpecialty,
  //         gender: doctor?.gender,
  //       });

  //       // bỏ password khi edit
  //       setFormFields((prev) => prev.filter((f) => f.name !== "password"));
  //     }
  //   }, [doctorRes, idDoctor]);

  // submit form
  const handleSubmit = useCallback(
    async (values: any) => {
      console.log("🚀 ~ useMedicalHistory ~ values:", values);
      if (!values) return;
      const body = { ...values, scheduleId: idSchedule };
      setLoading(true);
      try {
        const res = await AddOrUpdateMedicalHistory(body);
        if (res?.success) {
          showSuccess(res?.message);
          navigate(-1);
        } else {
          showWarning(res?.message);
        }
      } catch (e) {
        console.error("Có lỗi xảy ra", e);
        showError("Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    },
    [idSchedule, navigate, queryClient]
  );

  return {
    idSchedule,
    loading,
    initialValues,
    formFields,
    formRef,
    handleSubmit,
    navigate,
    idMedicalHistory,
  };
}
