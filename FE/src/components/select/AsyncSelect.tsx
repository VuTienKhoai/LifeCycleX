import React, { memo, useEffect, useState, useCallback, useRef } from "react";
import { Select, Spin } from "antd";

interface AsyncSelectProps {
  placeholder?: string;
  fetchOptions: (params: { page: number; keyword?: string }) => Promise<{
    data: { label: string; value: string }[];
    hasMore: boolean;
  }>;
  value?: string;
  onChange?: (value: string) => void;
}

const AsyncSelect: React.FC<AsyncSelectProps> = ({
  placeholder,
  fetchOptions,
  value,
  onChange,
}) => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchingRef = useRef(false);

  const loadOptions = useCallback(
    async (reset = false) => {
      if (fetchingRef.current || (!hasMore && !reset)) return;
      console.log("Xin chào");
      fetchingRef.current = true;
      setLoading(true);

      try {
        const res = await fetchOptions({
          page: reset ? 1 : page,
          keyword,
        });

        setOptions((prev) => (reset ? res.data : [...prev, ...res.data]));
        setHasMore(res.hasMore);
        setPage((prev) => (reset ? 2 : prev + 1));
      } finally {
        setLoading(false);
        fetchingRef.current = false;
      }
    },
    [fetchOptions, page, keyword, hasMore]
  );

  // search theo keyword
  const handleSearch = (val: string) => {
    setKeyword(val);
    setPage(1);
    setHasMore(true);
    loadOptions(true);
  };

  // load trang đầu tiên
  useEffect(() => {
    loadOptions(true);
  }, []);

  return (
    <Select
      showSearch
      value={value}
      placeholder={placeholder}
      filterOption={false}
      onSearch={handleSearch}
      onChange={onChange}
      notFoundContent={loading ? <Spin size="small" /> : null}
      style={{ width: "100%" }}
      onPopupScroll={(e) => {
        const target = e.target as HTMLElement;
        if (
          target.scrollTop + target.offsetHeight >= target.scrollHeight - 50 &&
          hasMore &&
          !loading
        ) {
          loadOptions();
        }
      }}
      options={options}
    />
  );
};

export default memo(AsyncSelect);
