import { Flex, Image, Tooltip, type TableColumnsType } from "antd";
import DebouncedSearch from "../../../components/input/DebouncedSearch";
import CustomTable from "../../../components/CustomTable";
import type TypeDoctor from "../../../types/TypeDoctor";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useDoctorList } from "../hook/useDoctorList";

export default function ListDoctor() {
  const {
    data,
    loading,
    searchDoctor,
    total,
    handlePageChange,
    handleAdd,
    handleView,
    handleDelete,
    handleSearchDoctor,
  } = useDoctorList();
  const columns: TableColumnsType<TypeDoctor> = [
    {
      title: "Tên bác sĩ",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (value: string) => (
        <Tooltip title={value}>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {value}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Địa chỉ email",
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (value: string) => (
        <Tooltip title={value}>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {value}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "avatar",
      render: (value: string) =>
        value ? (
          <Image
            src={value}
            alt="avatar"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <span>Không có ảnh</span>
        ),
      align: "center",
    },
    {
      title: "Tên chuyên khoa",
      dataIndex: "nameSpecialty",
      key: "nameSpecialty",
      align: "center",
      render: (value: string) => (
        <Tooltip title={value}>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {value}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Chức danh",
      dataIndex: "position",
      key: "position",
      align: "center",
      render: (value: string) => (
        <Tooltip title={value}>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {value}
          </div>
        </Tooltip>
      ),
    },

    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
    },

    {
      title: "Trạng thái",
      dataIndex: "isVerified",
      key: "isVerified",
      render: (value: boolean) =>
        value ? (
          <Tooltip title="Hoạt động">
            <CheckCircleOutlined style={{ color: "green", fontSize: 18 }} />
          </Tooltip>
        ) : (
          <Tooltip title="Đã khóa">
            <CloseCircleOutlined style={{ color: "red", fontSize: 18 }} />
          </Tooltip>
        ),
      align: "center",
      width: 100,
    },
  ];
  return (
    <div>
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <DebouncedSearch
          placeholder="Tìm kiếm theo tên, email..."
          value={searchDoctor.keyword}
          onSearch={handleSearchDoctor}
          style={{ marginBottom: 16, width: 300 }}
        />
      </Flex>

      <CustomTable<TypeDoctor>
        rowKey="id"
        columns={columns}
        dataSource={data || []}
        pageSize={searchDoctor.pageSize}
        currentPage={searchDoctor.page}
        total={total || 0}
        scrollY={window.innerHeight - 300}
        loading={loading}
        onPageChange={handlePageChange}
        onAdd={handleAdd}
        onView={handleView}
        onDelete={handleDelete}
        title="Danh sách bác sĩ"
      />
    </div>
  );
}
