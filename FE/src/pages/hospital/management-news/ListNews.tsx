import { Flex } from "antd";
import { useCallback, useState } from "react";
import DebouncedSearch from "../../../components/input/DebouncedSearch";
import { PAGE_DEFAULT } from "../../../constants";

export default function ListNews() {
  const [searchNews, setSearchNews] = useState({
    keyword: "",
    pageSize: PAGE_DEFAULT,
    page: 1,
  });
  const handleSearchNews = useCallback((value: string) => {
    setSearchNews((prev) => ({
      ...prev,
      keyword: value,
      page: 1,
    }));
  }, []);
  return (
    <div>
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <DebouncedSearch
          placeholder="Tìm kiếm theo tiêu đề, nội dung"
          value={searchNews.keyword}
          onSearch={handleSearchNews}
          style={{ marginBottom: 16, width: 300 }}
        />
      </Flex>
    </div>
  );
}
