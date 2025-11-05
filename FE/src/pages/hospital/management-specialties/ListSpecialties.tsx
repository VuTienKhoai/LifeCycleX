import { Flex, Tooltip, type TableColumnsType } from "antd";
import DebouncedSearch from "../../../components/input/DebouncedSearch";
import CustomTable from "../../../components/CustomTable";
import type TypeSpecialties from "../../../types/TypeSpecialties";
import { useSpecialtiesList } from "../hook/useSpecialtiesList";
import { formatPrice } from "../../../untils/formatPrice";

export default function ListSpecialties() {
  const {
    data,
    loading,
    searchSpecialties,
    handlePageChange,
    handleAdd,
    handleView,
    handleDelete,
    handleSearchSpecialties,
    total,
  } = useSpecialtiesList();
  const columns: TableColumnsType<TypeSpecialties> = [
    {
      title: "Tên chuyên khoa",
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
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
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
      title: "Giá dịch vụ",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (value: number) => {
        const formatted = formatPrice(value);
        return (
          <Tooltip title={formatted}>
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {formatted}
            </div>
          </Tooltip>
        );
      },
    },
  ];
  return (
    <div>
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <DebouncedSearch
          placeholder="Tìm kiếm theo tên, email..."
          value={searchSpecialties.keyword}
          onSearch={handleSearchSpecialties}
          style={{ marginBottom: 16, width: 300 }}
        />
      </Flex>

      <CustomTable<TypeSpecialties>
        rowKey="id"
        columns={columns}
        dataSource={data || []}
        pageSize={searchSpecialties.pageSize}
        currentPage={searchSpecialties.page}
        total={total || 0}
        scrollY={window.innerHeight - 300}
        loading={loading}
        onPageChange={handlePageChange}
        onAdd={handleAdd}
        onView={handleView}
        onDelete={handleDelete}
        title="Danh sách chuyên khoa"
      />
    </div>
  );
}
