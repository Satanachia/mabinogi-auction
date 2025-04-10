import { useState, useCallback } from "react";

export default function useLocalInput(
  initialValue = "", 
  onKeywordChange?: (keyword: string) => void
) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onKeywordChange?.(e.target.value);
  }, [onKeywordChange]);

  // X 아이콘 클릭 시 검색어 지우기
  const handleClear = useCallback(() => {
    setValue("");
    onKeywordChange?.("");
  }, [onKeywordChange]);

  return { value, handleChange, handleClear };
};