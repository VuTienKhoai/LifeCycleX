import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Avatar,
  Row,
  Col,
  Upload,
  Card,
  type UploadFile,
  Tooltip,
  Flex,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { updateUserInfo } from "../../api/user/user.api";
import { showError, showSuccess, showWarning } from "../../untils/ShowToast";
import { useDispatch, useSelector } from "react-redux";
import { infoUserState, setUserState } from "../../features/slices/user.slice";
import MyDatePicker from "../../components/datetimePicker/MyDatePicker";
import { emailRules, nameRules, phoneRules } from "../../untils/validators";
import dayjs from "dayjs";
import { queryGetInfoUser } from "../../api/user/user.query";
import { parseToken } from "../../untils/ParseToken";
import { setAppState } from "../../features/slices/app.slice";
import { useNavigate } from "react-router-dom";
const ProfileHospital = () => {
  const [form]: any = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const infoUser = useSelector(infoUserState);
  const { refetch } = queryGetInfoUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initUserInfo = useCallback(async () => {
    try {
      const res = await refetch();
      if (res.data?.success) {
        const user = res.data.data;
        dispatch(setUserState(user));
        setFileList([]);
        setAvatarUrl(null);
      } else {
        showWarning(res.data?.message || "Đăng nhập thất bại");
      }
    } catch {
      showError("Lấy thông tin người dùng thất bại");
    }
  }, [dispatch, refetch]);

  const handleUpload = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
    if (fileList.length > 0 && fileList[0].originFileObj) {
      const file = fileList[0].originFileObj as File;
      setAvatarUrl(URL.createObjectURL(file)); // preview local
    } else {
      setAvatarUrl(null);
    }
  };

  const onFinish = useCallback(
    async (values: any) => {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("id", values.id);
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("address", values.address);
        formData.append(
          "birthOfDay",
          values?.birthOfDay ? values?.birthOfDay.format("YYYY-MM-DD") : ""
        );

        if (fileList[0]?.originFileObj) {
          formData.append("avatarFile", fileList[0].originFileObj as File);
        }

        // ✅ gọi API và await luôn
        const res: any = await updateUserInfo(formData);

        if (res.success) {
          const infoUser: any = await parseToken(res?.data?.token);

          if (!infoUser) {
            showError("Không giải mã được token");
            return;
          }
          const dataAppDispatch = {
            token: res?.data?.token,
            role_id: infoUser.Role, // lưu ý FE bạn nên để lowercase
          };
          localStorage.setItem("access_token", res?.data?.token);
          initUserInfo();
          dispatch(setAppState(dataAppDispatch));
          showSuccess("Cập nhật thành công");
        } else {
          showError(res.message || "Cập nhật thất bại");
        }
      } catch (err) {
        console.error("🚀 ~ onFinish ~ err:", err);
        showError("Cập nhật thất bại");
      } finally {
        setLoading(false);
      }
    },
    [fileList]
  );

  const handleGetInfoUser = useCallback(() => {
    form.setFieldsValue({
      id: infoUser.id,
      name: infoUser.name,
      email: infoUser.email,
      phoneNumber: infoUser.phoneNumber,
      birthOfDay: infoUser.birthOfDay ? dayjs(infoUser.birthOfDay) : null,
    });
    setAvatarUrl(infoUser.avatar || null);
  }, [form, infoUser]);

  useEffect(() => {
    if (infoUser) {
      handleGetInfoUser();
    }
  }, [handleGetInfoUser]);

  return (
    <Card
      bordered={false}
      style={{
        maxWidth: 1200, // giới hạn chiều rộng
        margin: "40px auto", // căn giữa trang
        padding: 24, // padding bên trong card
        border: "2px solid #d9d9d9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: 12, // bo góc mềm mại
        backgroundColor: "#fff",
      }}
    >
      <Button onClick={() => navigate(-1)} type="default">
        Quay lại
      </Button>
      <h3 style={{ textAlign: "center", marginBottom: 32 }}>Hồ Sơ Của Tôi</h3>
      <Row gutter={24}>
        {/* Form */}
        <Col xs={24} sm={24} md={16}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            {/* hidden id field */}
            <Form.Item name="id" hidden>
              <Input type="hidden" />
            </Form.Item>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item name="name" label="Tên người dùng" rules={nameRules}>
                  <Input placeholder="Nhập tên người dùng" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item name="email" label="Email" rules={emailRules}>
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </Col>
            </Row>

            {/* Phone + BirthOfDay */}
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="phoneNumber"
                  label="Số điện thoại"
                  rules={phoneRules}
                >
                  <Input placeholder="Nhập số điện thoại" maxLength={11} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item name="birthOfDay" label="Ngày thành lập" rules={[]}>
                  <MyDatePicker />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>

        {/* Avatar */}
        <Col
          xs={24}
          sm={24}
          md={8}
          style={{
            textAlign: "center",
            position: "relative",
          }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            <Avatar
              key={avatarUrl}
              size={150}
              src={avatarUrl}
              alt="avatar"
              style={{
                border: "2px solid #d9d9d9",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />

            <Upload
              beforeUpload={() => false}
              onChange={handleUpload}
              maxCount={1}
              showUploadList={false}
              style={{ position: "absolute", bottom: 0, right: 0 }} // góc dưới trái
            >
              <Tooltip title="Thay đổi ảnh đại diện">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  size="middle"
                  style={{
                    width: 36,
                    height: 36,
                    padding: 0,
                    borderRadius: "50%",
                    transform: "translate(-25%, 25%)", // đẩy icon ra khỏi viền avatar 1 chút
                  }}
                />
              </Tooltip>
            </Upload>
          </div>
        </Col>
      </Row>
      <Flex justify="center">
        <Form.Item style={{ textAlign: "center", marginTop: 24 }}>
          <Button
            size="large"
            type="primary"
            onClick={() => form.submit()}
            loading={loading}
          >
            Xác nhận thay đổi
          </Button>
        </Form.Item>
      </Flex>
    </Card>
  );
};

export default ProfileHospital;
