import React, { useState, useCallback } from "react";
import FilterInput from "../../../shared/components/FilterInput";
import type { FilterCriteria } from "../../../constants/filterCriteria";
import type { Category } from "../../../constants/categoryMap";
import useFilterState from "../hooks/useFilterState";

interface DetailFilterProps {
  onFilterChange?: (filters: FilterCriteria) => void;
  selectedCategory?: Category | null;
}

function DetailFilter({ onFilterChange, selectedCategory }: DetailFilterProps) {
  const armorCategories = [
    "천옷",
    "경갑옷",
    "중갑옷",
    "모자/가발",
    "방패",
    "신발",
    "장갑",
    "날개",
    "꼬리",
    "로브",
    "액세서리",
    "얼굴 장식",
  ];
  const isArmor = selectedCategory && armorCategories.includes(selectedCategory.label);
  
  // 무기/일반 아이템용 필드 (방어구가 아닐 경우)
  const minAttack = useFilterState();
  const maxAttack = useFilterState();
  const minWoundRate = useFilterState();
  const maxWoundRate = useFilterState();
  const minCritical = useFilterState();
  const maxCritical = useFilterState();
  const minBalance = useFilterState();
  const maxBalance = useFilterState();
  const minErg = useFilterState();
  const maxErg = useFilterState();

  // 방어구 전용 필드: 단일 숫자 입력 (최소/최대가 아닌 한 값)
  const defense = useFilterState();
  const protection = useFilterState();
  const magicDefense = useFilterState();
  const magicProtection = useFilterState();

  // 공통 필드 (내구력, 인챈트, 에르그, 특별 개조, 색상, 세공, 세트 효과, 남은 전용 해제 횟수)
  const minDurability = useFilterState();
  const maxDurability = useFilterState();

  const [enchantPrefix, setEnchantPrefix] = useState("");
  const [enchantSuffix, setEnchantSuffix] = useState("");


  const [specialUpgradeType, setSpecialUpgradeType] = useState<"R" | "S">("R");
  const specialUpgradeR = useFilterState();
  const specialUpgradeS = useFilterState();

  // 색상: 각 파트별 R/G/B (문자열로 관리)
  type ColorRGB = {
    r: string;
    g: string;
    b: string;
  };

  const [colorPartA, setColorPartA] = useState<ColorRGB>({ r: "", g: "", b: "" });
  const [colorPartB, setColorPartB] = useState<ColorRGB>({ r: "", g: "", b: "" });
  const [colorPartC, setColorPartC] = useState<ColorRGB>({ r: "", g: "", b: "" });
  const [colorPartD, setColorPartD] = useState<ColorRGB>({ r: "", g: "", b: "" });
  const [colorPartE, setColorPartE] = useState<ColorRGB>({ r: "", g: "", b: "" });
  const [colorPartF, setColorPartF] = useState<ColorRGB>({ r: "", g: "", b: "" });

  // 세공: 랭크 및 옵션 최대 3개
  const sewingRank = useFilterState();
  const [sewingOptions, setSewingOptions] = useState<string[]>([""]);
  const updateSewingOption = useCallback((index: number, newValue: string) => {
    setSewingOptions((prev) => {
      const newOptions = [...prev];
      newOptions[index] = newValue;
      return newOptions;
    });
  }, []);

  // 세트 효과
  const [setEffect, setSetEffect] = useState("");

  // 남은 전용 해제 횟수
  const remainingExclusive = useFilterState();

  // 필터 적용 버튼 클릭 시
  const handleApplyFilter = useCallback(() => {
    const filters: FilterCriteria = {};

    if (isArmor) {
      if (defense.value !== "") filters.defense = Number(defense.value);
      if (protection.value !== "") filters.protection = Number(protection.value);
      if (magicDefense.value !== "") filters.magicDefense = Number(magicDefense.value);
      if (magicProtection.value !== "") filters.magicProtection = Number(magicProtection.value);
    } else {
      if (minAttack.value !== "") filters.minAttack = Number(minAttack.value);
      if (maxAttack.value !== "") filters.maxAttack = Number(maxAttack.value);
      if (minWoundRate.value !== "") filters.minWoundRate = Number(minWoundRate.value);
      if (maxWoundRate.value !== "") filters.maxWoundRate = Number(maxWoundRate.value);
      if (minCritical.value !== "") filters.minCritical = Number(minCritical.value);
      if (maxCritical.value !== "") filters.maxCritical = Number(maxCritical.value);
      if (minBalance.value !== "") filters.minBalance = Number(minBalance.value);
      if (maxBalance.value !== "") filters.maxBalance = Number(maxBalance.value);
    }

    // 공통 필드
    if (minDurability.value !== "") filters.minDurability = Number(minDurability.value);
    if (maxDurability.value !== "") filters.maxDurability = Number(maxDurability.value);
    if (enchantPrefix) filters.enchantPrefix = enchantPrefix;
    if (enchantSuffix) filters.enchantSuffix = enchantSuffix;
    if (minErg.value !== "") filters.minErg = Number(minErg.value);
    if (maxErg.value !== "") filters.maxErg = Number(maxErg.value);
    if (specialUpgradeType === "R" && specialUpgradeR.value !== "") filters.specialUpgradeR = Number(specialUpgradeR.value);
    if (specialUpgradeType === "S" && specialUpgradeS.value !== "") filters.specialUpgradeS = Number(specialUpgradeS.value);

    // 색상 필터: state는 string, 필터에서는 number 배열
    type ColorPart = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
    const colorParts: Record<ColorPart, ColorRGB> = {
      A: colorPartA,
      B: colorPartB,
      C: colorPartC,
      D: colorPartD,
      E: colorPartE,
      F: colorPartF,
    };

    for (const part of Object.keys(colorParts) as ColorPart[]) {
      const { r, g, b } = colorParts[part];

      if (r !== "") (filters as Partial<FilterCriteria>)[`colorPart${part}R`] = [Number(r)];
      if (g !== "") (filters as Partial<FilterCriteria>)[`colorPart${part}G`] = [Number(g)];
      if (b !== "") (filters as Partial<FilterCriteria>)[`colorPart${part}B`] = [Number(b)];
    }

    // 세공
    if (sewingRank.value !== "") filters.sewingRank = Number(sewingRank.value);
    if (sewingOptions[0]) filters.sewingOption1 = sewingOptions[0];
    if (sewingOptions[1]) filters.sewingOption2 = sewingOptions[1];
    if (sewingOptions[2]) filters.sewingOption3 = sewingOptions[2];

    // 세트 효과
    if (setEffect) filters.setEffect = setEffect;

    // 남은 전용 해제 횟수
    if (remainingExclusive.value !== "") filters.remainingExclusive = Number(remainingExclusive.value);

    // 부모로 필터 전달
    onFilterChange?.(filters);
  }, [
    isArmor,
    defense,
    protection,
    magicDefense,
    magicProtection,
    minAttack,
    maxAttack,
    minWoundRate,
    maxWoundRate,
    minCritical,
    maxCritical,
    minBalance,
    maxBalance,
    minDurability,
    maxDurability,
    enchantPrefix,
    enchantSuffix,
    minErg,
    maxErg,
    specialUpgradeType,
    specialUpgradeR,
    specialUpgradeS,
    colorPartA,
    colorPartB,
    colorPartC,
    colorPartD,
    colorPartE,
    colorPartF,
    sewingRank,
    sewingOptions,
    setEffect,
    remainingExclusive,
    onFilterChange,
  ]);

  return (
    <div>
      <h4 className="font-bold mb-4">상세 검색</h4>

      {isArmor ? (
        // 방어구 카테고리일 경우: 네 가지 단일 값 입력 필드
        <>
          <div>
            <label className="block text-sm mb-1 font-semibold">방어력</label>
            <FilterInput
              type="number"
              placeholder="입력"
              value={defense.value}
              onChange={defense.handleChange}
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-semibold">보호</label>
            <FilterInput
              type="number"
              placeholder="입력"
              value={protection.value}
              onChange={protection.handleChange}
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-semibold">마법방어력</label>
            <FilterInput
              type="number"
              placeholder="입력"
              value={magicDefense.value}
              onChange={magicDefense.handleChange}
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-semibold">마법보호</label>
            <FilterInput
              type="number"
              placeholder="입력"
              value={magicProtection.value}
              onChange={magicProtection.handleChange}
            />
          </div>
        </>
      ) : (
        // 방어구가 아닐 경우: 기존 무기 관련 범위 입력 필드
        <>
          <div>
            <label className="block text-sm mb-1 font-semibold">공격력</label>
            <div className="flex gap-2">
              <FilterInput
                type="number"
                placeholder="최소"
                value={minAttack.value}
                onChange={minAttack.handleChange}
                className="w-1/2"
              />
              <FilterInput
                type="number"
                placeholder="최대"
                value={maxAttack.value}
                onChange={maxAttack.handleChange}
                className="w-1/2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1 font-semibold">부상율</label>
            <div className="flex gap-2">
              <FilterInput
                type="number"
                placeholder="최소"
                value={minWoundRate.value}
                onChange={minWoundRate.handleChange}
                className="w-1/2"
              />
              <FilterInput
                type="number"
                placeholder="최대"
                value={maxWoundRate.value}
                onChange={maxWoundRate.handleChange}
                className="w-1/2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1 font-semibold">크리티컬</label>
            <div className="flex gap-2">
              <FilterInput
                type="number"
                placeholder="최소"
                value={minCritical.value}
                onChange={minCritical.handleChange}
                className="w-1/2"
              />
              <FilterInput
                type="number"
                placeholder="최대"
                value={maxCritical.value}
                onChange={maxCritical.handleChange}
                className="w-1/2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1 font-semibold">밸런스</label>
            <div className="flex gap-2">
              <FilterInput
                type="number"
                placeholder="최소"
                value={minBalance.value}
                onChange={minBalance.handleChange}
                className="w-1/2"
              />
              <FilterInput
                type="number"
                placeholder="최대"
                value={maxBalance.value}
                onChange={maxBalance.handleChange}
                className="w-1/2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1 font-semibold">에르그</label>
            <div className="flex gap-2">
              <FilterInput
                type="number"
                placeholder="최소"
                value={minErg.value}
                onChange={minErg.handleChange}
                className="w-1/2"
              />
              <FilterInput
                type="number"
                placeholder="최대"
                value={maxErg.value}
                onChange={maxErg.handleChange}
                className="w-1/2"
              />
            </div>
          </div>
        </>
      )}

      {/* 내구력 */}
      <div>
        <label className="block text-sm mb-1 font-semibold">내구력</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="최소"
            value={minDurability.value}
            onChange={minDurability.handleChange}
            className="w-1/2"
          />
          <FilterInput
            type="number"
            placeholder="최대"
            value={maxDurability.value}
            onChange={maxDurability.handleChange}
            className="w-1/2"
          />
        </div>
      </div>

      {/* 인챈트 */}
      <div>
        <label className="block text-sm mb-1 font-semibold">인챈트</label>
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

      {/* 특별 개조 타입 */}
      <div>
        <label htmlFor="specialUpgradeType" className="block text-sm mb-1 font-semibold">
          특별 개조 타입 선택
        </label>
        <select
          id="specialUpgradeType"
          value={specialUpgradeType}
          onChange={(e) => setSpecialUpgradeType(e.target.value as "R" | "S")}
          className="border border-slate-300 rounded px-2 py-1 w-full mb-2"
        >
          <option value="R">특별 개조 (R강)</option>
          <option value="S">특별 개조 (S강)</option>
        </select>
      </div>
      {specialUpgradeType === "R" ? (
        <div>
          <label className="block text-sm mb-1 font-semibold">특별 개조 (R강)</label>
          <FilterInput
            type="number"
            placeholder="0 ~ 7"
            value={specialUpgradeR.value}
            onChange={specialUpgradeR.handleChange}
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm mb-1 font-semibold">특별 개조 (S강)</label>
          <FilterInput
            type="number"
            placeholder="0 ~ 7"
            value={specialUpgradeS.value}
            onChange={specialUpgradeS.handleChange}
          />
        </div>
      )}

      {/* 파트 A (R/G/B 한 줄) */}
      <div>
        <label className="block text-sm mb-1 font-semibold">파트 A</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="R"
            value={colorPartA.r}
            onChange={(val: string) => setColorPartA((prev) => ({ ...prev, r: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="G"
            value={colorPartA.g}
            onChange={(val: string) => setColorPartA((prev) => ({ ...prev, g: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="B"
            value={colorPartA.b}
            onChange={(val: string) => setColorPartA((prev) => ({ ...prev, b: val }))}
            className="w-1/3"
          />
        </div>
      </div>

      {/* 파트 B */}
      <div>
        <label className="block text-sm mb-1 font-semibold">파트 B</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="R"
            value={colorPartB.r}
            onChange={(val: string) => setColorPartB((prev) => ({ ...prev, r: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="G"
            value={colorPartB.g}
            onChange={(val: string) => setColorPartB((prev) => ({ ...prev, g: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="B"
            value={colorPartB.b}
            onChange={(val: string) => setColorPartB((prev) => ({ ...prev, b: val }))}
            className="w-1/3"
          />
        </div>
      </div>

      {/* 파트 C */}
      <div>
        <label className="block text-sm mb-1 font-semibold">파트 C</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="R"
            value={colorPartC.r}
            onChange={(val: string) => setColorPartC((prev) => ({ ...prev, r: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="G"
            value={colorPartC.g}
            onChange={(val: string) => setColorPartC((prev) => ({ ...prev, g: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="B"
            value={colorPartC.b}
            onChange={(val: string) => setColorPartC((prev) => ({ ...prev, b: val }))}
            className="w-1/3"
          />
        </div>
      </div>

      {/* 파트 D */}
      <div>
        <label className="block text-sm mb-1 font-semibold">파트 D</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="R"
            value={colorPartD.r}
            onChange={(val: string) => setColorPartD((prev) => ({ ...prev, r: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="G"
            value={colorPartD.g}
            onChange={(val: string) => setColorPartD((prev) => ({ ...prev, g: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="B"
            value={colorPartD.b}
            onChange={(val: string) => setColorPartD((prev) => ({ ...prev, b: val }))}
            className="w-1/3"
          />
        </div>
      </div>

      {/* 파트 E */}
      <div>
        <label className="block text-sm mb-1 font-semibold">파트 E</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="R"
            value={colorPartE.r}
            onChange={(val: string) => setColorPartE((prev) => ({ ...prev, r: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="G"
            value={colorPartE.g}
            onChange={(val: string) => setColorPartE((prev) => ({ ...prev, g: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="B"
            value={colorPartE.b}
            onChange={(val: string) => setColorPartE((prev) => ({ ...prev, b: val }))}
            className="w-1/3"
          />
        </div>
      </div>

      {/* 파트 F */}
      <div>
        <label className="block text-sm mb-1 font-semibold">파트 F</label>
        <div className="flex gap-2">
          <FilterInput
            type="number"
            placeholder="R"
            value={colorPartF.r}
            onChange={(val: string) => setColorPartF((prev) => ({ ...prev, r: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="G"
            value={colorPartF.g}
            onChange={(val: string) => setColorPartF((prev) => ({ ...prev, g: val }))}
            className="w-1/3"
          />
          <FilterInput
            type="number"
            placeholder="B"
            value={colorPartF.b}
            onChange={(val: string) => setColorPartF((prev) => ({ ...prev, b: val }))}
            className="w-1/3"
          />
        </div>
      </div>

      {/* 세공 랭크 */}
      <div>
        <label className="block text-sm mb-1 font-semibold">세공 랭크</label>
        <FilterInput
          type="number"
          placeholder="예: 1"
          value={sewingRank.value}
          onChange={sewingRank.handleChange}
        />
      </div>

      {/* 세공 옵션 최대 3개 */}
      <div>
        <label className="block text-sm mb-1 font-semibold">세공 옵션</label>
        <div>
          {sewingOptions.map((option, index) => (
            <div key={index} className="w-full">
              <div className="flex gap-2 justify-between">
                <FilterInput
                  type="text"
                  placeholder={`옵션 ${index + 1}`}
                  value={option}
                  onChange={(val: string) => updateSewingOption(index, val)}
                  className="flex-1"
                />
                {sewingOptions.length > 1 && (
                  <button
                    className="text-white text-base w-8 mb-2 rounded bg-red-400"
                    onClick={() => setSewingOptions((prev) => prev.filter((_, i) => i !== index))}
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          ))}
          {sewingOptions.length < 3 && (
            <button
              className="text-white text-base w-8 h-8 mb-2 rounded bg-blue-400"
              onClick={() => setSewingOptions([...sewingOptions, ""])}
            >
              +
            </button>
          )}
        </div>
        
      </div>

      {/* 세트 효과 */}
      <div>
        <label className="block text-sm mb-1 font-semibold">세트 효과</label>
        <FilterInput
          type="text"
          placeholder="예: 스매시"
          value={setEffect}
          onChange={setSetEffect}
        />
      </div>

      {/* 남은 전용 해제 횟수 */}
      <div>
        <label className="block text-sm mb-1 font-semibold">남은 전용 해제 횟수</label>
        <FilterInput
          type="number"
          placeholder="입력"
          value={remainingExclusive.value}
          onChange={remainingExclusive.handleChange}
        />
      </div>

      {/* 적용 버튼 */}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
        onClick={handleApplyFilter}
      >
        적용
      </button>
    </div>
  );
}

export default React.memo(DetailFilter);