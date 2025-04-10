import React from "react";
interface FilterInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  className?: string;
}

function FilterInput({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
}: FilterInputProps) {
  return (
    <div>
      {label && <label className="block text-sm mb-1">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={Number.isNaN(value) ? "" : value}
        onChange={(e) => onChange(e.target.value)}
        className={`border border-slate-300 rounded mb-2 px-2 py-1 ${className}`}
      />
    </div>
  );
}

export default React.memo(FilterInput);