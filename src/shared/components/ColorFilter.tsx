import FilterInput from "./FilterInput";

interface ColorFilterProps {
  label: string;
  rgb: [number, number, number];
  hex: string;
  onRGBChange: (index: number, value: number) => void;
  onHexChange: (hex: string) => void;
}

const ColorFilter: React.FC<ColorFilterProps> = ({ label, rgb, hex, onRGBChange, onHexChange }) => {
  return (
    <div className="flex flex-row md:flex-col gap-1 items-end md:items-start">
      <div>
        <div className="font-semibold">{label}</div>
        <div className="flex gap-2 items-center">
          <FilterInput
            label="R"
            type="number"
            value={rgb[0]}
            onChange={(v) => onRGBChange(0, Number(v))}
            className="w-full max-w-[100px]"
          />
          <FilterInput
            label="G"
            type="number"
            value={rgb[1]}
            onChange={(v) => onRGBChange(1, Number(v))}
            className="w-full max-w-[100px]"
          />
          <FilterInput
            label="B"
            type="number"
            value={rgb[2]}
            onChange={(v) => onRGBChange(2, Number(v))}
            className="w-full max-w-[100px]"
          />
        </div>
      </div>
      <div className="mt-1 max-w-[100px]">
        <FilterInput
          label="HEX"
          placeholder="#RRGGBB"
          value={hex}
          onChange={(v) => onHexChange(v)}
          className="w-full max-w-[100px]"
        />
      </div>
    </div>
  );
};

export default ColorFilter;