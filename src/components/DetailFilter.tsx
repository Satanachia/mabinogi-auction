import { useState } from "react";
import FilterInput from "./FilterInput";
import type { FilterCriteria } from "../constants/filterCriteria";

interface DetailFilterProps {
  onFilterChange?: (filters: FilterCriteria) => void;
}

type ColorRange = {
  rMin: number | "",
  rMax: number | "",
  gMin: number | "",
  gMax: number | "",
  bMin: number | "",
  bMax: number | ""
};

export default function DetailFilter({ onFilterChange }: DetailFilterProps) {
  // 공격(Attack)
  const [minAttack, setMinAttack] = useState<number | "">("");
  const [maxAttack, setMaxAttack] = useState<number | "">("");

  // 마법공격(magicAttack)
  const [minMagicAttack, setMinMagicAttack] = useState<number | "">("");
  const [maxMagicAttack, setMaxMagicAttack] = useState<number | "">("");

  // 부상률(WoundRate)
  const [minWoundRate, setMinWoundRate] = useState<number | "">("");
  const [maxWoundRate, setMaxWoundRate] = useState<number | "">("");

  // 크리티컬(Critical)
  const [minCritical, setMinCritical] = useState<number | "">("");
  const [maxCritical, setMaxCritical] = useState<number | "">("");

  // 밸런스 (min / max)
  const [minBalance, setMinBalance] = useState<number | "">("");
  const [maxBalance, setMaxBalance] = useState<number | "">("");

  // 내구력(Durability)
  const [minDurability, setMinDurability] = useState<number | "">("");
  const [maxDurability, setMaxDurability] = useState<number | "">("");

  // 인챈트
  const [enchantPrefix, setEnchantPrefix] = useState("");
  const [enchantSuffix, setEnchantSuffix] = useState("");

  // 에르그
  const [minErg, setMinErg] = useState<number | "">("");
  const [maxErg, setMaxErg] = useState<number | "">("");

  // 특별 개조
  const [specialUpgradeType, setSpecialUpgradeType] = useState<"R" | "S">("R");
  const [specialUpgradeR, setSpecialUpgradeR] = useState<number | "">("");
  const [specialUpgradeS, setSpecialUpgradeS] = useState<number | "">("");

  // 색상: 각 파트별 (A~F) RGB 최소/최대 입력 (0~255)
  const [colorPartA, setColorPartA] = useState<ColorRange>({
    rMin: "", rMax: "", gMin: "", gMax: "", bMin: "", bMax: ""
  });
  const [colorPartB, setColorPartB] = useState<ColorRange>({
    rMin: "", rMax: "", gMin: "", gMax: "", bMin: "", bMax: ""
  });
  const [colorPartC, setColorPartC] = useState<ColorRange>({
    rMin: "", rMax: "", gMin: "", gMax: "", bMin: "", bMax: ""
  });
  const [colorPartD, setColorPartD] = useState<ColorRange>({
    rMin: "", rMax: "", gMin: "", gMax: "", bMin: "", bMax: ""
  });
  const [colorPartE, setColorPartE] = useState<ColorRange>({
    rMin: "", rMax: "", gMin: "", gMax: "", bMin: "", bMax: ""
  });
  const [colorPartF, setColorPartF] = useState<ColorRange>({
    rMin: "", rMax: "", gMin: "", gMax: "", bMin: "", bMax: ""
  });

  // 세공 랭크
  const [sewingRank, setSewingRank] = useState<number | "">("");

  // 세공 옵션
  const [sewingOptions, setSewingOptions] = useState<string[]>([""]);

  const updateSewingOption = (index: number, newValue: string) => {
    setSewingOptions((prev) => {
      const newOptions = [...prev];
      newOptions[index] = newValue;
      return newOptions;
    });
  };

  // 세트 효과
  const [setEffect, setSetEffect] = useState("");

  // 남은 전용 해제 횟수
  const [remainingExclusive, setRemainingExclusive] = useState<number | "">("");

  const handleApplyFillter = () => {
    const filters: FilterCriteria = {
      minAttack: minAttack === "" ? undefined : minAttack,
      maxAttack: maxAttack === "" ? undefined : maxAttack,

      minMagicAttack: minMagicAttack === "" ? undefined : minMagicAttack,
      maxMagicAttack: maxMagicAttack === "" ? undefined : maxMagicAttack,

      minWoundRate: minWoundRate === "" ? undefined : minWoundRate,
      maxWoundRate: maxWoundRate === "" ? undefined : maxWoundRate,

      minCritical: minCritical === "" ? undefined : minCritical,
      maxCritical: maxCritical === "" ? undefined : maxCritical,

      minBalance: minBalance === "" ? undefined : minBalance,
      maxBalance: maxBalance === "" ? undefined : maxBalance,

      minDurability: minDurability === "" ? undefined : minDurability,
      maxDurability: maxDurability === "" ? undefined : maxDurability,

      // 색상: 각 파트별 RGB 최소/최대 값
      colorPartARMin: colorPartA.rMin === "" ? undefined : colorPartA.rMin,
      colorPartARMax: colorPartA.rMax === "" ? undefined : colorPartA.rMax,
      colorPartAGMin: colorPartA.gMin === "" ? undefined : colorPartA.gMin,
      colorPartAGMax: colorPartA.gMax === "" ? undefined : colorPartA.gMax,
      colorPartABMin: colorPartA.bMin === "" ? undefined : colorPartA.bMin,
      colorPartABMax: colorPartA.bMax === "" ? undefined : colorPartA.bMax,

      colorPartBRMin: colorPartB.rMin === "" ? undefined : colorPartB.rMin,
      colorPartBRMax: colorPartB.rMax === "" ? undefined : colorPartB.rMax,
      colorPartBGMin: colorPartB.gMin === "" ? undefined : colorPartB.gMin,
      colorPartBGMax: colorPartB.gMax === "" ? undefined : colorPartB.gMax,
      colorPartBBMin: colorPartB.bMin === "" ? undefined : colorPartB.bMin,
      colorPartBBMax: colorPartB.bMax === "" ? undefined : colorPartB.bMax,

      colorPartCRMin: colorPartC.rMin === "" ? undefined : colorPartC.rMin,
      colorPartCRMax: colorPartC.rMax === "" ? undefined : colorPartC.rMax,
      colorPartCGMin: colorPartC.gMin === "" ? undefined : colorPartC.gMin,
      colorPartCGMax: colorPartC.gMax === "" ? undefined : colorPartC.gMax,
      colorPartCBMin: colorPartC.bMin === "" ? undefined : colorPartC.bMin,
      colorPartCBMax: colorPartC.bMax === "" ? undefined : colorPartC.bMax,

      colorPartDRMin: colorPartD.rMin === "" ? undefined : colorPartD.rMin,
      colorPartDRMax: colorPartD.rMax === "" ? undefined : colorPartD.rMax,
      colorPartDGMin: colorPartD.gMin === "" ? undefined : colorPartD.gMin,
      colorPartDGMax: colorPartD.gMax === "" ? undefined : colorPartD.gMax,
      colorPartDBMin: colorPartD.bMin === "" ? undefined : colorPartD.bMin,
      colorPartDBMax: colorPartD.bMax === "" ? undefined : colorPartD.bMax,

      colorPartERMin: colorPartE.rMin === "" ? undefined : colorPartE.rMin,
      colorPartERMax: colorPartE.rMax === "" ? undefined : colorPartE.rMax,
      colorPartEGMin: colorPartE.gMin === "" ? undefined : colorPartE.gMin,
      colorPartEGMax: colorPartE.gMax === "" ? undefined : colorPartE.gMax,
      colorPartEBMin: colorPartE.bMin === "" ? undefined : colorPartE.bMin,
      colorPartEBMax: colorPartE.bMax === "" ? undefined : colorPartE.bMax,

      colorPartFRMin: colorPartF.rMin === "" ? undefined : colorPartF.rMin,
      colorPartFRMax: colorPartF.rMax === "" ? undefined : colorPartF.rMax,
      colorPartFGMin: colorPartF.gMin === "" ? undefined : colorPartF.gMin,
      colorPartFGMax: colorPartF.gMax === "" ? undefined : colorPartF.gMax,
      colorPartFBMin: colorPartF.bMin === "" ? undefined : colorPartF.bMin,
      colorPartFBMax: colorPartF.bMax === "" ? undefined : colorPartF.bMax,

      enchantPrefix: enchantPrefix || undefined,
      enchantSuffix: enchantSuffix || undefined,

      specialUpgradeR:
        specialUpgradeType === "R" ? (specialUpgradeR === "" ? undefined : specialUpgradeR) : undefined,
      specialUpgradeS:
        specialUpgradeType === "S" ? (specialUpgradeS === "" ? undefined : specialUpgradeS) : undefined,

      sewingRank: sewingRank === "" ? undefined : sewingRank,

     // 세공 옵션은 배열에서 최대 3개까지 추출
     sewingOption1: sewingOptions[0] || undefined,
     sewingOption2: sewingOptions[1] || undefined,
     sewingOption3: sewingOptions[2] || undefined,

      minErg: minErg === "" ? undefined : minErg,
      maxErg: maxErg === "" ? undefined : maxErg,

      setEffect: setEffect || undefined,
      remainingExclusive: remainingExclusive === "" ? undefined : remainingExclusive,
    };
    onFilterChange?.(filters);
  };

  return (
    <div>
      <h4>상세 검색</h4>

      {/* 공격력 입력 그룹 */}
      <div className="mb-4">
        <label className="block text-sm mb-1">공격력</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="최소"
            value={minAttack}
            onChange={(value: string) => setMinAttack(value === "" ? "" : Number(value))}
            className="w-1/2"
          />
          <FilterInput
            type="number"
            placeholder="최대"
            value={maxAttack}
            onChange={(value: string) => setMaxAttack(value === "" ? "" : Number(value))}
            className="w-1/2"
          />
        </div>
      </div>

      {/* 마법공격력 입력 그룹 */}
      <div className="mb-4">
        <label className="block text-sm mb-1">마법 공격력</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="최소"
            value={minMagicAttack}
            onChange={(value: string) => setMinMagicAttack(value === "" ? "" : Number(value))}
            className="w-1/2"
          />
          <FilterInput
            type="number"
            placeholder="최대"
            value={maxMagicAttack}
            onChange={(value: string) => setMaxMagicAttack(value === "" ? "" : Number(value))}
            className="w-1/2"
          />
        </div>
      </div>

      {/* 부상율 입력 그룹 */}
      <div className="mb-4">
        <label className="block text-sm mb-1">부상율</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="최소"
            value={minWoundRate}
            onChange={(value: string) => setMinWoundRate(value === "" ? "" : Number(value))}
            className="w-1/2"
          />
          <FilterInput
            type="number"
            placeholder="최대"
            value={maxWoundRate}
            onChange={(value: string) => setMaxWoundRate(value === "" ? "" : Number(value))}
            className="w-1/2"
          />
        </div>
      </div>

      {/* 크리티컬 입력 그룹 */}
      <div className="mb-4">
        <label className="block text-sm mb-1">크리티컬</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="최소"
            value={minCritical}
            onChange={(value: string) =>
              setMinCritical(value === "" ? "" : Number(value))
            }
            className="w-1/2"
          />
          <FilterInput
            type="number"
            placeholder="최대"
            value={maxCritical}
            onChange={(value: string) =>
              setMaxCritical(value === "" ? "" : Number(value))
            }
            className="w-1/2"
          />
        </div>
      </div>

      {/* 밸런스 입력 그룹 */}
      <div className="mb-4">
        <label className="block text-sm mb-1">밸런스</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="최소"
            value={minBalance}
            onChange={(value: string) =>
              setMinBalance(value === "" ? "" : Number(value))
            }
            className="w-1/2"
          />
          <FilterInput
            type="number"
            placeholder="최대"
            value={maxBalance}
            onChange={(value: string) =>
              setMaxBalance(value === "" ? "" : Number(value))
            }
            className="w-1/2"
          />
        </div>
      </div>

      {/* 내구력 입력 그룹 */}
      <div className="mb-4">
        <label className="block text-sm mb-1">내구력</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="최소"
            value={minDurability}
            onChange={(value: string) =>
              setMinDurability(value === "" ? "" : Number(value))
            }
            className="w-1/2"
          />
          <FilterInput
            type="number"
            placeholder="최대"
            value={maxDurability}
            onChange={(value: string) =>
              setMaxDurability(value === "" ? "" : Number(value))
            }
            className="w-1/2"
          />
        </div>
      </div>

      {/* 인챈트 입력 그룹 */}
      <div className="mb-4">
        <label className="block text-sm mb-1">인챈트</label>
        <div className="flex gap-2">
          <FilterInput
            type="text"
            placeholder="접두"
            value={enchantPrefix}
            onChange={setEnchantPrefix}
            className="w-1/2"
          />
          <FilterInput
            type="text"
            placeholder="접미"
            value={enchantSuffix}
            onChange={setEnchantSuffix}
            className="w-1/2"
          />
        </div>
      </div>

      {/* 에르그 입력 그룹 */}
      <div className="mb-4">
        <label className="block text-sm mb-1">에르그</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="최소"
            value={minErg}
            onChange={(value: string) =>
              setMinErg(value === "" ? "" : Number(value))
            }
            className="w-1/2"
          />
          <FilterInput
            type="number"
            placeholder="최대"
            value={maxErg}
            onChange={(value: string) =>
              setMaxErg(value === "" ? "" : Number(value))
            }
            className="w-1/2"
          />
        </div>
      </div>

      {/* 특별 개조 타입 선택 */}
      <div className="mb-4">
        <label htmlFor="specialUpgradeType" className="block text-sm mb-1">특별 개조 타입 선택</label>
        <select
          id="specialUpgradeType"
          value={specialUpgradeType}
          onChange={(e) => setSpecialUpgradeType(e.target.value as "R" | "S")}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="R">특별 개조 (R강)</option>
          <option value="S">특별 개조 (S강)</option>
        </select>
      </div>

      {/* 선택된 특별 개조 타입에 따른 입력 */}
      {specialUpgradeType === "R" ? (
        <div className="mb-4">
          <label className="block text-sm mb-1">특별 개조 (R강)</label>
          <FilterInput
            type="number"
            placeholder="0 ~ 7"
            value={specialUpgradeR}
            onChange={(value: string) =>
              setSpecialUpgradeR(value === "" ? "" : Number(value))
            }
          />
        </div>
      ) : (
        <div className="mb-4">
          <label className="block text-sm mb-1">특별 개조 (S강)</label>
          <FilterInput
            type="number"
            placeholder="0 ~ 7"
            value={specialUpgradeS}
            onChange={(value: string) =>
              setSpecialUpgradeS(value === "" ? "" : Number(value))
            }
          />
        </div>
      )}

      {/* 파트 A */}
      <div className="mb-4">
        <label className="block text-sm mb-1 font-semibold">파트 A</label>
        <div className="mb-2">
          <label className="text-xs">R</label>
          <div className="flex gap-2">
            <FilterInput
              type="number"
              placeholder="min"
              value={colorPartA.rMin}
              onChange={(value: string) =>
                setColorPartA((prev) => ({ ...prev, rMin: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
            <FilterInput
              type="number"
              placeholder="max"
              value={colorPartA.rMax}
              onChange={(value: string) =>
                setColorPartA((prev) => ({ ...prev, rMax: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
          </div>
        </div>
        <div className="mb-2">
          <label className="text-xs">G</label>
          <div className="flex gap-2">
            <FilterInput
              type="number"
              placeholder="min"
              value={colorPartA.gMin}
              onChange={(value: string) =>
                setColorPartA((prev) => ({ ...prev, gMin: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
            <FilterInput
              type="number"
              placeholder="max"
              value={colorPartA.gMax}
              onChange={(value: string) =>
                setColorPartA((prev) => ({ ...prev, gMax: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
          </div>
        </div>
        <div>
          <label className="text-xs">B</label>
          <div className="flex gap-2">
            <FilterInput
              type="number"
              placeholder="min"
              value={colorPartA.bMin}
              onChange={(value: string) =>
                setColorPartA((prev) => ({ ...prev, bMin: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
            <FilterInput
              type="number"
              placeholder="max"
              value={colorPartA.bMax}
              onChange={(value: string) =>
                setColorPartA((prev) => ({ ...prev, bMax: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
          </div>
        </div>
      </div>

      {/* 파트 B */}
      <div className="mb-4">
        <label className="block text-sm mb-1 font-semibold">파트 B</label>
        <div className="mb-2">
          <label className="text-xs">R</label>
          <div className="flex gap-2">
            <FilterInput
              type="number"
              placeholder="min"
              value={colorPartB.rMin}
              onChange={(value: string) =>
                setColorPartB((prev) => ({ ...prev, rMin: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
            <FilterInput
              type="number"
              placeholder="max"
              value={colorPartB.rMax}
              onChange={(value: string) =>
                setColorPartB((prev) => ({ ...prev, rMax: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
          </div>
        </div>
        <div className="mb-2">
          <label className="text-xs">G</label>
          <div className="flex gap-2">
            <FilterInput
              type="number"
              placeholder="min"
              value={colorPartB.gMin}
              onChange={(value: string) =>
                setColorPartB((prev) => ({ ...prev, gMin: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
            <FilterInput
              type="number"
              placeholder="max"
              value={colorPartB.gMax}
              onChange={(value: string) =>
                setColorPartB((prev) => ({ ...prev, gMax: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
          </div>
        </div>
        <div>
          <label className="text-xs">B</label>
          <div className="flex gap-2">
            <FilterInput
              type="number"
              placeholder="min"
              value={colorPartB.bMin}
              onChange={(value: string) =>
                setColorPartB((prev) => ({ ...prev, bMin: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
            <FilterInput
              type="number"
              placeholder="max"
              value={colorPartB.bMax}
              onChange={(value: string) =>
                setColorPartB((prev) => ({ ...prev, bMax: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
          </div>
        </div>
      </div>

      {/* 파트 C */}
      <div className="mb-4">
        <label className="block text-sm mb-1 font-semibold">파트 C</label>
        <div className="mb-2">
          <label className="text-xs">R</label>
          <div className="flex gap-2">
            <FilterInput
              type="number"
              placeholder="min"
              value={colorPartC.rMin}
              onChange={(value: string) =>
                setColorPartC((prev) => ({ ...prev, rMin: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
            <FilterInput
              type="number"
              placeholder="max"
              value={colorPartC.rMax}
              onChange={(value: string) =>
                setColorPartC((prev) => ({ ...prev, rMax: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
          </div>
        </div>
        <div className="mb-2">
          <label className="text-xs">G</label>
          <div className="flex gap-2">
            <FilterInput
              type="number"
              placeholder="min"
              value={colorPartC.gMin}
              onChange={(value: string) =>
                setColorPartC((prev) => ({ ...prev, gMin: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
            <FilterInput
              type="number"
              placeholder="max"
              value={colorPartC.gMax}
              onChange={(value: string) =>
                setColorPartC((prev) => ({ ...prev, gMax: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
          </div>
        </div>
        <div>
          <label className="text-xs">B</label>
          <div className="flex gap-2">
            <FilterInput
              type="number"
              placeholder="min"
              value={colorPartC.bMin}
              onChange={(value: string) =>
                setColorPartC((prev) => ({ ...prev, bMin: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
            <FilterInput
              type="number"
              placeholder="max"
              value={colorPartC.bMax}
              onChange={(value: string) =>
                setColorPartC((prev) => ({ ...prev, bMax: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
          </div>
        </div>
      </div>

      {/* 파트 D */}
      <div className="mb-4">
        <label className="block text-sm mb-1 font-semibold">파트 D</label>
        <div className="mb-2">
          <label className="text-xs">R</label>
          <div className="flex gap-2">
            <FilterInput
              type="number"
              placeholder="min"
              value={colorPartD.rMin}
              onChange={(value: string) =>
                setColorPartD((prev) => ({ ...prev, rMin: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
            <FilterInput
              type="number"
              placeholder="max"
              value={colorPartD.rMax}
              onChange={(value: string) =>
                setColorPartD((prev) => ({ ...prev, rMax: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
          </div>
        </div>
        <div className="mb-2">
          <label className="text-xs">G</label>
          <div className="flex gap-2">
            <FilterInput
              type="number"
              placeholder="min"
              value={colorPartD.gMin}
              onChange={(value: string) =>
                setColorPartD((prev) => ({ ...prev, gMin: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
            <FilterInput
              type="number"
              placeholder="max"
              value={colorPartD.gMax}
              onChange={(value: string) =>
                setColorPartD((prev) => ({ ...prev, gMax: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
          </div>
        </div>
        <div>
          <label className="text-xs">B</label>
          <div className="flex gap-2">
            <FilterInput
              type="number"
              placeholder="min"
              value={colorPartD.bMin}
              onChange={(value: string) =>
                setColorPartD((prev) => ({ ...prev, bMin: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
            <FilterInput
              type="number"
              placeholder="max"
              value={colorPartD.bMax}
              onChange={(value: string) =>
                setColorPartD((prev) => ({ ...prev, bMax: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
          </div>
        </div>
      </div>

      {/* 파트 E */}
      <div className="mb-4">
        <label className="block text-sm mb-1 font-semibold">파트 E</label>
        <div className="mb-2">
          <label className="text-xs">R</label>
          <div className="flex gap-2">
            <FilterInput
              type="number"
              placeholder="min"
              value={colorPartE.rMin}
              onChange={(value: string) =>
                setColorPartE((prev) => ({ ...prev, rMin: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
            <FilterInput
              type="number"
              placeholder="max"
              value={colorPartE.rMax}
              onChange={(value: string) =>
                setColorPartE((prev) => ({ ...prev, rMax: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
          </div>
        </div>
        <div className="mb-2">
          <label className="text-xs">G</label>
          <div className="flex gap-2">
            <FilterInput
              type="number"
              placeholder="min"
              value={colorPartE.gMin}
              onChange={(value: string) =>
                setColorPartE((prev) => ({ ...prev, gMin: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
            <FilterInput
              type="number"
              placeholder="max"
              value={colorPartE.gMax}
              onChange={(value: string) =>
                setColorPartE((prev) => ({ ...prev, gMax: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
          </div>
        </div>
        <div>
          <label className="text-xs">B</label>
          <div className="flex gap-2">
            <FilterInput
              type="number"
              placeholder="min"
              value={colorPartE.bMin}
              onChange={(value: string) =>
                setColorPartE((prev) => ({ ...prev, bMin: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
            <FilterInput
              type="number"
              placeholder="max"
              value={colorPartE.bMax}
              onChange={(value: string) =>
                setColorPartE((prev) => ({ ...prev, bMax: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
          </div>
        </div>
      </div>

      {/* 파트 F */}
      <div className="mb-4">
        <label className="block text-sm mb-1 font-semibold">파트 F</label>
        <div className="mb-2">
          <label className="text-xs">R</label>
          <div className="flex gap-2">
            <FilterInput
              type="number"
              placeholder="min"
              value={colorPartF.rMin}
              onChange={(value: string) =>
                setColorPartF((prev) => ({ ...prev, rMin: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
            <FilterInput
              type="number"
              placeholder="max"
              value={colorPartF.rMax}
              onChange={(value: string) =>
                setColorPartF((prev) => ({ ...prev, rMax: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
          </div>
        </div>
        <div className="mb-2">
          <label className="text-xs">G</label>
          <div className="flex gap-2">
            <FilterInput
              type="number"
              placeholder="min"
              value={colorPartF.gMin}
              onChange={(value: string) =>
                setColorPartF((prev) => ({ ...prev, gMin: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
            <FilterInput
              type="number"
              placeholder="max"
              value={colorPartF.gMax}
              onChange={(value: string) =>
                setColorPartF((prev) => ({ ...prev, gMax: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
          </div>
        </div>
        <div>
          <label className="text-xs">B</label>
          <div className="flex gap-2">
            <FilterInput
              type="number"
              placeholder="min"
              value={colorPartF.bMin}
              onChange={(value: string) =>
                setColorPartF((prev) => ({ ...prev, bMin: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
            <FilterInput
              type="number"
              placeholder="max"
              value={colorPartF.bMax}
              onChange={(value: string) =>
                setColorPartF((prev) => ({ ...prev, bMax: value === "" ? "" : Number(value) }))
              }
              className="w-1/2"
            />
          </div>
        </div>
      </div>

      {/* 세공 랭크 입력 그룹 */}
      <div className="mb-4">
        <label className="block text-sm mb-1">세공 랭크</label>
        <FilterInput
          type="number"
          placeholder="예: 1"
          value={sewingRank}
          onChange={(value: string) =>
            setSewingRank(value === "" ? "" : Number(value))
          }
        />
      </div>

      {/* 세공 옵션 입력 그룹 */}
      <div className="mb-4">
        <label className="block text-sm mb-1">세공 옵션</label>
        {sewingOptions.map((option, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <FilterInput
              type="text"
              placeholder={`옵션 ${index + 1}`}
              value={option}
              onChange={(value: string) => updateSewingOption(index, value)}
              className="flex-1"
            />
            {/* 옵션이 1개 이상일 때 제거 버튼 표시 */}
            {sewingOptions.length > 1 && (
              <button
                className="text-red-500 text-sm"
                onClick={() =>
                  setSewingOptions((prev) => prev.filter((_, i) => i !== index))
                }
              >
                -
              </button>
            )}
          </div>
        ))}
        {sewingOptions.length < 3 && (
          <button
            className="text-blue-500 text-sm"
            onClick={() => setSewingOptions([...sewingOptions, ""])}
          >
            +
          </button>
        )}
      </div>

      {/* 세트 효과 입력 그룹 */}
      <div className="mb-4">
        <label className="block text-sm mb-1">세트 효과</label>
        <FilterInput
          type="text"
          placeholder="입력"
          value={setEffect}
          onChange={setSetEffect}
        />
      </div>

      {/* 남은 전용 해제 횟수 입력 그룹 */}
      <div className="mb-4">
        <label className="block text-sm mb-1">남은 전용 해제 횟수</label>
        <FilterInput
          type="number"
          placeholder="입력"
          value={remainingExclusive}
          onChange={(value: string) =>
            setRemainingExclusive(value === "" ? "" : Number(value))
          }
        />
      </div>      

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
        onClick={handleApplyFillter}
      >
        적용
      </button>
    </div>
  )
}