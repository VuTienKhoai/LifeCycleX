import { Button, Col, Row } from "antd";
import type { Field } from "../../../components/DynamicForm";
import { nameRules, priceRules } from "../../../untils/validators";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import DynamicForm from "../../../components/DynamicForm";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AddOrUpdateSpecialties } from "../../../api/specialties/specialties.api";
import { showError, showSuccess, showWarning } from "../../../untils/ShowToast";
import { queryGetDetailSpecialties } from "../../../api/specialties/specialties.query";
const initialFields: Field[] = [
  {
    name: "name",
    label: "Tên chuyên khoa",
    type: "text",
    rules: nameRules,
  },
  {
    name: "price",
    label: "Giá",
    type: "price",
    rules: priceRules,
  },
  {
    name: "description",
    label: "Mô tả",
    type: "textarea",
    rules: [],
    fullWidth: true,
  },
];
export default function AddorUpdateSpecialties() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idSpecialty = searchParams.get("idSpecialty");
  const [loading, setLoading] = useState(false);
  const queryClient: any = useQueryClient();
  const [initialValues, setInitialValues] = useState<any>(null);
  const [formFields, setFormFields] = useState<Field[]>(initialFields);
  const formRef = useRef<any>(null);

  const { data } = queryGetDetailSpecialties(
    idSpecialty ? { id: idSpecialty } : undefined
  );

  const handleAddSpecialties = useCallback((values: any) => {
    if (!values) return;
    if (idSpecialty) {
      values = { ...values, id: idSpecialty };
    }
    AddOrUpdateSpecialties(values)
      .then((res) => {
        if (res?.success) {
          showSuccess(res?.message);
          queryClient.removeQueries(["queryGetAllSpecialtiesByIdHospital"]);
          navigate(-1);
        } else {
          showWarning(res?.message);
        }
      })
      .catch((e) => {
        console.log("Có lỗi xảy ra", e);
        showError("Có lỗi xảy ra");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSpecialtiesDetail = useCallback((values: any) => {
    setInitialValues({
      name: values.name,
      price: values.price,
      description: values.description,
    });

    setFormFields((prev) => prev.filter((f) => f.name !== "password"));
  }, []);

  useEffect(() => {
    if (data?.success && data?.data && idSpecialty) {
      handleSpecialtiesDetail(data.data);
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
            {idSpecialty ? "Cập nhật chuyên khoa" : "Thêm chuyên khoa"}
          </h3>
        </Col>
      </Row>

      <DynamicForm
        fields={formFields}
        initialValues={initialValues}
        onSubmit={handleAddSpecialties}
        formRef={formRef}
        loading={loading}
        isEdit
      />
    </div>
  );
}
