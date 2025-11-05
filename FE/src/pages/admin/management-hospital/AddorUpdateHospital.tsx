import { useNavigate, useSearchParams } from "react-router-dom";
import DynamicForm, { type Field } from "../../../components/DynamicForm";
import { showError, showSuccess, showWarning } from "../../../untils/ShowToast";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Row, Col } from "antd";
import { AddOrUpdateHospital } from "../../../api/hospital/hospital.api";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { queryGetDetailHospital } from "../../../api/hospital/hospital.query";
import { hospitalFormFields } from "../../../form/hospitalFormFields";
export default function AddOrUpdateUser() {
  const formRef = useRef<any>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idHospital = searchParams.get("idHospital");
  const [loading, setLoading] = useState(false);
  const queryClient: any = useQueryClient();
  const [initialValues, setInitialValues] = useState<any>(null);
  const [formFields, setFormFields] = useState<Field[]>(hospitalFormFields);
  const { data } = queryGetDetailHospital(
    idHospital ? { id: idHospital } : undefined
  );

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values?.name || "");
    formData.append("email", values?.email || "");
    formData.append("gender", values?.gender || "");
    formData.append("birthOfDay", values?.birthOfDay ? values.birthOfDay : "");
    formData.append("phoneNumber", values?.phoneNumber || "");
    formData.append("address", values?.address || "");
    formData.append("website", values?.website || "");
    formData.append("password", values?.password || "");
    if (values.avatarFile?.file instanceof File) {
      formData.append("avatarFile", values.avatarFile.file);
    }
    if (idHospital) {
      formData.append("id", idHospital || "");
    }
    handleAddHospital(formData);
  };

  const handleAddHospital = useCallback((formData: FormData) => {
    setLoading(true);
    AddOrUpdateHospital(formData)
      .then((res) => {
        if (res?.success) {
          showSuccess(res?.message);
          queryClient.removeQueries(["queryGetAllHospital"]);
          queryClient.removeQueries(["queryGetDetailHospital"]);
          navigate(-1);
        } else {
          showWarning(res?.message);
        }
      })
      .catch((e) => {
        console.log("Có lỗi xảy ra", e);
        showError("Lỗi khi thêm bệnh viện");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleHospitalDetail = useCallback((hospital: any) => {
    setInitialValues({
      name: hospital.name,
      email: hospital.email,
      phoneNumber: hospital.phoneNumber,
      address: hospital.address,
      website: hospital.webUrl,
      birthOfDay: hospital.birthOfDay ? dayjs(hospital.birthOfDay) : null,
      avatarFile: hospital?.avatar || null, // vẫn để string url
    });

    setFormFields((prev) => prev.filter((f) => f.name !== "password"));
  }, []);

  useEffect(() => {
    if (data?.success && data?.data && idHospital) {
      handleHospitalDetail(data.data);
    }
  }, [data]);
  return (
    <div style={{ padding: 24, borderRadius: 8 }}>
      <Row align="middle" gutter={16} style={{ marginBottom: 24 }}>
        <Col>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          />
        </Col>
        <Col>
          <h3 style={{ margin: 0 }}>
            {idHospital ? "Cập nhật bệnh viện" : "Thêm bệnh viện"}
          </h3>
        </Col>
      </Row>

      <DynamicForm
        fields={formFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        formRef={formRef}
        loading={loading}
        isEdit
      />
    </div>
  );
}
