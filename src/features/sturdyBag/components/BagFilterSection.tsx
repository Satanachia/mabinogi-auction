import React from "react";
import ColorFilter from "../../../shared/components/ColorFilter";

interface BagFilterSectionProps {
  rgbA: [number, number, number];
  rgbB: [number, number, number];
  rgbC: [number, number, number];
  hexA: string;
  hexB: string;
  hexC: string;
  tolerance: number;
  onRGBChange: (part: "A" | "B" | "C", index: number, value: number) => void;
  onHexChange: (part: "A" | "B" | "C", hex: string) => void;
  onToleranceChange: (value: number) => void;
  onApply: () => void;
  onReset: () => void;
}

const BagFilterSection: React.FC<BagFilterSectionProps> = ({
  rgbA, rgbB, rgbC,
  hexA, hexB, hexC,
  tolerance,
  onRGBChange,
  onHexChange,
  onToleranceChange,
  onApply,
  onReset,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 md:mb-2">
      <div className="flex flex-col md:flex-row gap-2 items-start">
        <ColorFilter
          label="파트 A"
          rgb={rgbA}
          hex={hexA}
          onRGBChange={(i, v) => onRGBChange("A", i, v)}
          onHexChange={(hex) => onHexChange("A", hex)}
        />
        <ColorFilter
          label="파트 B"
          rgb={rgbB}
          hex={hexB}
          onRGBChange={(i, v) => onRGBChange("B", i, v)}
          onHexChange={(hex) => onHexChange("B", hex)}
        />
        <ColorFilter
          label="파트 C"
          rgb={rgbC}
          hex={hexC}
          onRGBChange={(i, v) => onRGBChange("C", i, v)}
          onHexChange={(hex) => onHexChange("C", hex)}
        />
      </div>

      <div className="flex flex-row items-start gap-2">
        <div className="flex flex-row md:flex-col items-end md:items-stretch gap-2">
          <div className="flex flex-col">
            <label htmlFor="tolerance-input">오차 범위 ±</label>
            <input
              id="tolerance-input"
              type="number"
              value={tolerance}
              onChange={(e) => onToleranceChange(Number(e.target.value))}
              className="border px-2 py-1 rounded w-20"
            />
          </div>          
          <button onClick={onApply} className="bg-blue-500 text-white px-4 py-2 rounded">
            필터링
          </button>
          <button onClick={onReset} className="bg-gray-300 text-black px-4 py-2 rounded">
            초기화
          </button>
        </div>        
      </div>
    </div>
  );
};

export default BagFilterSection;
