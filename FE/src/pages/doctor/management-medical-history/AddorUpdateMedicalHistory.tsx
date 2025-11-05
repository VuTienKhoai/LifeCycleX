import { Button, Col, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useMedicalHistory } from "../hook/useMedicalHistoryCreate";
import DynamicForm from "../../../components/DynamicForm";

export default function AddorUpdateMedicalHistory() {
  const {
    loading,
    initialValues,
    formFields,
    formRef,
    handleSubmit,
    navigate,
    idSchedule,
    idMedicalHistory,
  } = useMedicalHistory();
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
            {idMedicalHistory ? "Cập nhật bệnh án" : "Thêm bệnh án"}
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
