import { Button, Col, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DynamicForm from "../../../components/DynamicForm";
import { useAddorUpdateForm } from "../hook/useAddorUpdateDoctor";
export default function AddorUpdateDoctor() {
  const {
    loading,
    initialValues,
    formFields,
    formRef,
    handleSubmit,
    navigate,
    idDoctor,
  } = useAddorUpdateForm();

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
            {idDoctor ? "Cập nhật bác sĩ" : "Thêm bác sĩ"}
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
