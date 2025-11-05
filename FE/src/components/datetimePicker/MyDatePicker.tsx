import { memo } from "react";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import viVN from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";

dayjs.locale("vi");

interface MyDatePickerProps extends DatePickerProps {}

const MyDatePicker = (props: MyDatePickerProps) => {
  return (
    <DatePicker
      style={{ width: "100%" }}
      placeholder="Chọn ngày"
      format="DD/MM/YYYY"
      locale={viVN}
      {...props}
    />
  );
};

export default memo(MyDatePicker);
