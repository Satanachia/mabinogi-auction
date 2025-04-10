import React from "react";
import { AuctionItem } from "../../../type/AuctionItem";

interface ItemOptionsPaneProps {
  item: AuctionItem;
  isMobile?: boolean;
}
type OptionType = NonNullable<AuctionItem["item_option"]>[number];

function reorderOptions(options: OptionType[]): OptionType[] {
  // 우선순위 맵: 낮을수록 먼저
  const priorityMap: Record<string, number> = {
    "세공": 1,
    "에르그": 2,
    // 필요 시 다른 키워드도 추가
  };

  const getPriority = (opt: OptionType) => {
    // option_type에 포함된 키워드가 우선순위 맵에 있으면 해당 값을 반환
    for (const key in priorityMap) {
      if (opt.option_type.includes(key)) {
        return priorityMap[key];
      }
    }
    return 999; // 우선순위가 없으면 999로 처리
  };

  // 정렬
  return [...options].sort((a, b) => getPriority(a) - getPriority(b));
}

function getOptionColor(optionType: string): string {
  if (optionType.includes("세공")) return "text-green-600";
  if (optionType.includes("에르그")) return "text-blue-600";
  // 그 외 색상 추가할 옵션 추가
  return "";
}

function parseRGB(value: string): { r: number; g: number; b: number } | null {
  const regex1 = /R\s*:\s*(\d+)\s*G\s*:\s*(\d+)\s*B\s*:\s*(\d+)/i;
  const regex2 = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)$/;
  
  let match = value.match(regex1);
  if (match) {
    return {
      r: Number(match[1]),
      g: Number(match[2]),
      b: Number(match[3]),
    };
  }

  match = value.match(regex2);
  if (match) {
    return {
      r: Number(match[1]),
      g: Number(match[2]),
      b: Number(match[3]),
    };
  }

  return null;
}

// 옵션 값 출력 헬퍼
function formatOptionValue(opt: OptionType): string {
  // option_desc가 있으면 그것을 우선 사용
  if (opt.option_desc) {
    return opt.option_desc;
  }

  // 기본적으로 option_value를 시작으로 사용
  let value = `${opt.option_value}`;
  
  if (opt.option_value2) {
    // 에르그, 내구력, 일반 개조의 경우
    if (
      opt.option_type.includes("에르그") ||
      opt.option_type.includes("내구력") ||
      opt.option_type.includes("일반 개조")
    ) {
      value += ` / ${opt.option_value2}`;
    }
    // 세트 효과나 피어싱 레벨의 경우 "~" 제거
    else if (
      opt.option_type.includes("세트 효과") ||
      opt.option_type.includes("피어싱 레벨")
    ) {
      value += ` ${opt.option_value2}`;
    }
    // 그 외 기본 케이스: 그대로 "~"
    else {
      value += ` ~ ${opt.option_value2}`;
    }
  }
  
  return value;
}

function ItemOptionsPane({ item, isMobile = false }: ItemOptionsPaneProps) {
  const options = item.item_option;

  return (
    <div className="item-options-pane">
      {/* 데스크톱: 아이템 기본 정보 */}
      {!isMobile && (
        <div className="item-main-info mb-2">
          <h2 className="item-name text-lg font-bold">{item.item_display_name}</h2>
        </div>
      )}

      {/* 옵션 목록 */}
      {options && options.length > 0 && (
        <div className="item-options">
          {/* 세공, 에르그를 먼저 보이도록 재정렬 */}
          <ul className="options-list text-sm space-y-1">
            {reorderOptions(options).map((opt, idx) => {
              // 옵션값
              const val = formatOptionValue(opt);
              // RGB
              const rgb = parseRGB(val);

              return (
                <li 
                  key={idx}
                  className="option-item flex justify-between border-b border-slate-200 pb-0.5"
                >
                  <span className={getOptionColor(opt.option_type)}>
                    <strong>{opt.option_type}</strong>
                    {opt.option_sub_type ? ` (${opt.option_sub_type})` : ""}
                  </span>

                  <span className="ml-4 text-gray-700 flex items-center gap-2">
                    {val}
                    {/* RGB가 있으면 컬러 박스 표시 */}
                    {rgb && (
                      <span 
                        className="inline-block w-4 h-4 border border-slate-300"
                        style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
                      />
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default React.memo(ItemOptionsPane);