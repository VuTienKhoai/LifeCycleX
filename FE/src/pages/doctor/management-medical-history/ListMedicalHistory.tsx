import { Flex, Tooltip, type TableColumnsType } from "antd";
import { useListMedicalHistory } from "../hook/useListMedicalHistory";
import type { TypeMedicalHistory } from "../../../types/TypeMedicalHistory";
import DebouncedSearch from "../../../components/input/DebouncedSearch";
import CustomTable from "../../../components/CustomTable";
import type { TypeUserResponse } from "../../../types/TypeUser";
import ModalMedicalHistory from "../components/ModalMedicalHistory";
import { infoUserState } from "../../../features/slices/user.slice";
import { useSelector } from "react-redux";
import { ROLE } from "../../../constants";

export default function ListMedicalHistory() {
  const userInfo = useSelector(infoUserState);
  const {
    data,
    total,
    loading,
    searchMedicalHistory,
    handlePageChange,
    handleView,
    setModalReady,
    modaleReady,
    handleSearchMedicalHistory,
    selectedMedicalHistory,
    handleViewDetail,
  } = useListMedicalHistory();

  const columns: TableColumnsType<TypeMedicalHistory> = [
    {
      title: "STT",
      key: "index",
      align: "center",
      width: 70,
      render: (_: any, __: TypeMedicalHistory, index: number) => index + 1,
    },
    {
      title: "Bác sĩ phụ trách",
      dataIndex: ["doctorInfo", "name"],
      key: "doctorName",
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
      dataIndex: ["userInfo"], // nếu có trong response
      key: "userInfo",
      align: "center",
      render: (value: TypeUserResponse) => (
        <Tooltip title={value?.phoneNumber}>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {value?.phoneNumber}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Tên bệnh nhân",
      dataIndex: ["userInfo"], // nếu có trong response
      key: "userInfo",
      align: "center",
      render: (value: TypeUserResponse) => (
        <Tooltip title={value?.name}>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {value?.name}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      align: "center",
      render: (value: string) => new Date(value).toLocaleDateString("vi-VN"),
    },
    {
      title: "Chẩn đoán",
      dataIndex: "diagnosis",
      key: "diagnosis",
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
      title: "Phương pháp điều trị",
      dataIndex: "medication",
      key: "medication",
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
  ];

  return (
    <div>
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <DebouncedSearch
          placeholder="Tìm kiếm theo tên, email..."
          value={searchMedicalHistory.keyword}
          onSearch={handleSearchMedicalHistory}
          style={{ marginBottom: 16, width: 300 }}
        />
      </Flex>

      <CustomTable<TypeMedicalHistory>
        rowKey="id"
        columns={columns}
        dataSource={data || []}
        pageSize={searchMedicalHistory.pageSize}
        currentPage={searchMedicalHistory.page}
        total={total || 0}
        scrollY={window.innerHeight - 300}
        loading={loading}
        onPageChange={handlePageChange}
        onView={handleView}
        onDetail={handleViewDetail}
        title="Danh sách bệnh án"
      />
      <ModalMedicalHistory
        data={selectedMedicalHistory}
        onCancel={() => setModalReady(false)}
        open={modaleReady}
      />
    </div>
  );
}
