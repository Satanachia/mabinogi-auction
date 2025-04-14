import React from "react";
import { ShopItem } from "../../../type/AuctionItem";

interface BagItemListProps {
  items: ShopItem[];
  loading: boolean;
}

function BagItemList({ items, loading }: BagItemListProps) {
  if (loading) return <p>불러오는 중...</p>;
  if (items.length === 0) return <p>조건에 맞는 아이템이 없습니다.</p>;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, idx) => {
        const colorOptions = item.item_option?.filter(
          (opt) => opt.option_type === "아이템 색상"
        ) ?? [];

        const getColorStyle = (part: "파트 A" | "파트 B" | "파트 C") => {
          const opt = colorOptions.find((o) => o.option_sub_type === part);
          if (!opt) return null;
          const [r, g, b] = opt.option_value.split(",").map(Number);
          return { backgroundColor: `rgb(${r}, ${g}, ${b})` };
        };

        return (
          <li
            key={idx}
            className="border border-slate-300 rounded bg-white shadow p-2 flex flex-col items-left"
          >
            <div className="flex gap-2">
              <div className="relative w-16 h-16">
                <img
                  src={item.image_url}
                  alt={item.item_display_name}
                  className="w-16 h-16"
                />
                {(["파트 B", "파트 C"] as const).map((part, i) => {
                  const style = getColorStyle(part);
                  if (!style) return null;
                  return (
                    <div
                      key={i}
                      className="absolute w-4 h-4 border border-white rounded-full"
                      style={{ ...style, top: `${4 + i * 20}px`, right: "4px" }}
                      title={part}
                    />
                  );
                })}
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-semibold text-sm">
                  {item.item_display_name}
                </p>
                <div className="flex flex-col gap-1 mt-1 text-xs">
                  {colorOptions.map((opt, i) => {
                    const [r, g, b] = opt.option_value.split(",").map(Number);
                    const hex = `#${[r, g, b]
                      .map((v) => v.toString(16).padStart(2, "0"))
                      .join("")}`;
                    return (
                      <div key={i} className="flex items-center gap-1">
                        <div
                          className="w-3 h-3 border border-black"
                          style={{ backgroundColor: `rgb(${r},${g},${b})` }}
                        />
                        <span>
                          {opt.option_sub_type}: ({r}, {g}, {b}) / {hex}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default React.memo(BagItemList);