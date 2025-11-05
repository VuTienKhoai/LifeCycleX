import { Input } from "antd";
import { useState, useEffect, memo } from "react";

const { Search } = Input;

interface DebouncedSearchProps {
  value?: string;
  onSearch: (value: string) => void;
  debounceTime?: number;
  placeholder?: string;
  style?: React.CSSProperties;
}

function DebouncedSearchComponent({
  value = "",
  onSearch,
  debounceTime = 1000,
  placeholder,
  style,
}: DebouncedSearchProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(inputValue);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [inputValue, onSearch, debounceTime]);

  return (
    <Search
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      style={style}
      allowClear
    />
  );
}

// Memo để tránh render lại khi props không đổi
export default memo(DebouncedSearchComponent);
