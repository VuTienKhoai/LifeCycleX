import { memo } from "react";
import { Button, Form, Input, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import { COLOR_PRIMARY } from "../../../constants";

interface TimeSlotFormProps {
  form: any;
  onGenerate: () => void;
}

const TimeSlotForm = ({ form, onGenerate }: TimeSlotFormProps) => {
  return (
    <Form
      form={form}
      layout="inline"
      initialValues={{
        name: "Ca sáng",
        start: dayjs("08:00", "HH:mm"),
        end: dayjs("12:00", "HH:mm"),
        duration: "30",
      }}
      style={{ marginBottom: 20 }}
    >
      <Form.Item label="Tên khung giờ" name="name">
        <Input placeholder="Ca sáng" />
      </Form.Item>

      <Form.Item label="Giờ bắt đầu" name="start">
        <TimePicker format="HH:mm" />
      </Form.Item>

      <Form.Item label="Giờ kết thúc" name="end">
        <TimePicker format="HH:mm" />
      </Form.Item>

      <Form.Item label="Độ dài slot" name="duration">
        <Select style={{ width: 120 }}>
          <Select.Option value="15">15 phút</Select.Option>
          <Select.Option value="30">30 phút</Select.Option>
          <Select.Option value="45">45 phút</Select.Option>
          <Select.Option value="60">60 phút</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          style={{ background: COLOR_PRIMARY }}
          onClick={onGenerate}
        >
          Xem trước
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(TimeSlotForm);
