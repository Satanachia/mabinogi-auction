import { useState, useCallback } from "react";

export default function useFilterState(initialValue: string | number = "") {
  const [value, setValue] = useState(initialValue);
  const handleChange = useCallback(
    (val: string) => setValue(val === "" ? "" : Number(val)),
    []
  );
  return { value, handleChange };
};