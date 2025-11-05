import { Flex, Image, Tooltip, type TableColumnsType } from "antd";
import type TypeHospital from "../../../types/TypeHospital";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import CustomTable from "../../../components/CustomTable";
import DebouncedSearch from "../../../components/input/DebouncedSearch";
import { useHospitalList } from "./hook/useHospitalList";

export default function ListHospital() {
  const {
    data,
    total,
    loading,
    searchHospital,
    handlePageChange,
    handleAdd,
    handleView,
    handleDelete,
    handleSearchHospital,
  } = useHospitalList();

  const columns: TableColumnsType<TypeHospital> = [
    {
      title: "Tên bệnh viện",
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
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
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
    { title: "Email", dataIndex: "email", key: "email", align: "center" },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
    },
    {
      title: "Ngày tạo",
      dataIndex: "created",
      key: "created",
      render: (value) =>
        value ? new Date(value).toLocaleDateString("en-CA") : "",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "isVerified",
      key: "isVerified",
      render: (value: boolean) =>
        value ? (
          <Tooltip title="Đã kích hoạt">
            <CheckCircleOutlined style={{ color: "green", fontSize: 18 }} />
          </Tooltip>
        ) : (
          <Tooltip title="Chưa kích hoạt">
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
          value={searchHospital.keyword}
          onSearch={handleSearchHospital}
          style={{ marginBottom: 16, width: 300 }}
        />
      </Flex>

      <CustomTable<TypeHospital>
        rowKey="id"
        columns={columns}
        dataSource={data || []}
        pageSize={searchHospital.pageSize}
        currentPage={searchHospital.page}
        total={total || 0}
        scrollY={window.innerHeight - 300}
        loading={loading}
        onPageChange={handlePageChange}
        onAdd={handleAdd}
        onView={handleView}
        onDelete={handleDelete}
        title="Danh sách bệnh viện"
      />
    </div>
  );
}
