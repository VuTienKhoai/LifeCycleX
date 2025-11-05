// src/hooks/useDoctorForm.ts
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import type { Field } from "../../../components/DynamicForm";
import { doctorFormFields } from "../../../form/doctorFormFields";
import { queryGetAllSpecialtiesByIdHospital } from "../../../api/specialties/specialties.query";
import { queryGetDetailDoctor } from "../../../api/doctor/doctor.query";
import { AddOrUpdateDoctor } from "../../../api/doctor/doctor.api";
import { showError, showSuccess, showWarning } from "../../../untils/ShowToast";

export function useAddorUpdateForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idDoctor = searchParams.get("idDoctor");

  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<any>(null);
  const [formFields, setFormFields] = useState<Field[]>(doctorFormFields);
  const formRef = useRef<any>(null);

  // fetch specialties
  const { data: specialtiesRes } = queryGetAllSpecialtiesByIdHospital({
    pageInfo: { pageSize: 9999, page: 1 },
    keyword: "",
  });

  // fetch doctor detail
  const { data: doctorRes } = queryGetDetailDoctor(
    idDoctor ? { id: idDoctor } : undefined
  );

  // map options chuyên khoa
  const specialtiesOptions = useMemo(
    () =>
      specialtiesRes?.data?.map((item: any) => ({
        label: item.name,
        value: item.id,
      })) ?? [],
    [specialtiesRes]
  );

  // inject chuyên khoa vào field
  useEffect(() => {
    if (specialtiesOptions.length > 0) {
      setFormFields((prev) =>
        prev.map((field) =>
          field.name === "idSpeciaties"
            ? { ...field, options: specialtiesOptions }
            : field
        )
      );
    }
  }, [specialtiesOptions]);

  // set initialValues khi edit
  useEffect(() => {
    if (doctorRes?.success && doctorRes.data && idDoctor) {
      const doctor = doctorRes.data;
      setInitialValues({
        name: doctor.name,
        email: doctor.email,
        phoneNumber: doctor.phoneNumber,
        address: doctor.address,
        birthOfDay: doctor.birthOfDay ? dayjs(doctor.birthOfDay) : null,
        avatarFile: doctor?.avatar || null,
        postion: doctor?.position,
        price: doctor?.price,
        idSpeciaties: doctor?.idSpecialty,
        gender: doctor?.gender,
      });

      // bỏ password khi edit
      setFormFields((prev) => prev.filter((f) => f.name !== "password"));
    }
  }, [doctorRes, idDoctor]);

  // submit form
  const handleSubmit = useCallback(
    async (values: any) => {
      if (!values) return;

      const formData = new FormData();
      Object.entries({
        name: values?.name,
        email: values?.email,
        gender: values?.gender,
        birthOfDay: values?.birthOfDay || "",
        phoneNumber: values?.phoneNumber,
        address: values?.address,
        password: values?.password,
        postion: values?.postion,
        price: values?.price,
        idSpeciaties: values?.idSpeciaties,
        id: idDoctor || "",
      }).forEach(([key, value]) => {
        if (value) formData.append(key, value as string);
      });

      if (values.avatarFile?.file instanceof File) {
        formData.append("avatarFile", values.avatarFile.file);
      }

      setLoading(true);
      try {
        const res = await AddOrUpdateDoctor(formData);
        if (res?.success) {
          showSuccess(res?.message);
          await queryClient.removeQueries({ queryKey: ["queryGetAllDoctor"] });
          await queryClient.removeQueries({
            queryKey: ["queryGetDetailDoctor"],
          });
          navigate(-1);
        } else {
          showWarning(res?.message);
        }
      } catch (e) {
        console.error("Có lỗi xảy ra", e);
        showError("Lỗi khi thêm/cập nhật bác sĩ");
      } finally {
        setLoading(false);
      }
    },
    [idDoctor, navigate, queryClient]
  );

  return {
    idDoctor,
    loading,
    initialValues,
    formFields,
    formRef,
    handleSubmit,
    navigate,
  };
}
