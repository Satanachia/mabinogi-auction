interface FilterInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  className?: string;
}

export default function FilterInput({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
}: FilterInputProps) {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm mb-1">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border rounded px-2 py-1 w-full ${className}`}
      />
    </div>
  );
}