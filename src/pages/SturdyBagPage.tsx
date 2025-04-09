import { useEffect, useState, useCallback } from "react";
import { getNpcShopItems } from "../services/mabinogiApi";
import { NpcShopTab, ShopItem } from "../type/AuctionItem";
import DropdownMenuMini from "../components/DropdownMenuMini";
import { Bars3Icon } from "@heroicons/react/24/outline";

interface SturdyBagPageProps {
  onHornBugleFetch: (server: string) => void;
}

const ALL_NPCS = [
  "델", "델렌", "상인 라누", "상인 피루", "모락", "상인 아루", "리나",
  "상인 누누", "상인 메루", "켄", "귀넥", "얼리", "데위", "테일로",
  "상인 세누", "상인 베루", "상인 에루", "상인 네루", "카디", "인장 상인", "피오나트",
];

const SERVERS = ["류트", "만돌린", "하프", "울프"];

const MAX_CHANNEL: Record<string, number> = {
  "류트": 44,
  "하프": 25,
  "만돌린": 16,
  "울프": 16,
};

const hexToRgb = (hex: string): [number, number, number] | null => {
  const sanitized = hex.replace(/^#/, "");
  if (sanitized.length !== 6) return null;
  const r = parseInt(sanitized.slice(0, 2), 16);
  const g = parseInt(sanitized.slice(2, 4), 16);
  const b = parseInt(sanitized.slice(4, 6), 16);
  return [r, g, b];
};

export default function SturdyBagPage({ onHornBugleFetch }: SturdyBagPageProps) {
  const [selectedNpc, setSelectedNpc] = useState(ALL_NPCS[0]);
  const [selectedServer, setSelectedServer] = useState("류트");
  const [channelInput, setChannelInput] = useState("1");
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tolerance, setTolerance] = useState(10);
  const [filteredItems, setFilteredItems] = useState<ShopItem[]>([]);

  const [partFilters, setPartFilters] = useState<Record<"A" | "B" | "C", {
    rgb: [string, string, string];
    hex: string;
  }>>({
    A: { rgb: ["", "", ""], hex: "" },
    B: { rgb: ["", "", ""], hex: "" },
    C: { rgb: ["", "", ""], hex: "" }
  });

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const channel = Number(channelInput);
      const max = MAX_CHANNEL[selectedServer];
      if (isNaN(channel) || channel < 1 || channel > max) {
        alert(`입력 가능한 채널은 1 ~ ${max}입니다.`);
        setLoading(false);
        return;
      }
      const tabs: NpcShopTab[] = await getNpcShopItems(selectedNpc, selectedServer, channel);
      const pocketItems = tabs.filter((tab) => tab.tab_name === "주머니").flatMap((tab) => tab.item);
      setItems(pocketItems);
      setFilteredItems(pocketItems);
    } catch (e) {
      console.error("아이템 불러오기 실패:", e);
      setItems([]);
      setFilteredItems([]);
    } finally {
      setLoading(false);
    }
  }, [selectedNpc, selectedServer, channelInput]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const matchesColor = (input: [string, string, string], actual: string) => {
    if (!actual) return false;
    const [r, g, b] = actual.split(",").map(v => parseInt(v.trim(), 10));
    const [ir, ig, ib] = input.map(v => parseInt(v.trim(), 10));
    if ([r, g, b, ir, ig, ib].some(isNaN)) return false;
    return (
      Math.abs(ir - r) <= tolerance &&
      Math.abs(ig - g) <= tolerance &&
      Math.abs(ib - b) <= tolerance
    );
  };

  const applyFilters = () => {
    const result = items.filter((item) => {
      const options = item.item_option.filter(opt => opt.option_type === "아이템 색상");
      return (["A", "B", "C"] as const).every((part) => {
        const [r, g, b] = partFilters[part].rgb;
        if (!r || !g || !b) return true; // 필터가 비어있으면 통과

        const opt = options.find(o => o.option_sub_type === `파트 ${part}`);
        if (!opt) return true;

        return matchesColor([r, g, b], opt.option_value);
      });
    });
    setFilteredItems(result);
  };

  const resetFilters = () => {
    setPartFilters({
      A: { rgb: ["", "", ""], hex: "" },
      B: { rgb: ["", "", ""], hex: "" },
      C: { rgb: ["", "", ""], hex: "" }
    });
    setTolerance(10);
    setFilteredItems(items);
  };

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">👜 튼튼한 주머니 검색</h1>
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 hover:bg-gray-100 rounded"
            title="메뉴 열기"
            aria-label="메뉴 열기"
          >
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          </button>
          <DropdownMenuMini 
            open={menuOpen} 
            selectedServer={selectedServer} 
            setSelectedServer={setSelectedServer}
            onSubmit={() => onHornBugleFetch(selectedServer)} 
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div>
          <label htmlFor="npcSelect" className="font-semibold block mb-1">NPC 선택</label>
          <select
            id="npcSelect"
            value={selectedNpc}
            onChange={(e) => setSelectedNpc(e.target.value)}
            className="border border-slate-300 px-2 py-1 rounded w-full"
          >
            {ALL_NPCS.map((npc) => (
              <option key={npc} value={npc}>{npc}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="serverSelect" className="font-semibold block mb-1">서버 선택</label>
          <select
            id="serverSelect"
            value={selectedServer}
            onChange={(e) => setSelectedServer(e.target.value)}
            className="border border-slate-300 px-2 py-1 rounded w-full"
          >
            {SERVERS.map((server) => (
              <option key={server} value={server}>{server}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="channelInput" className="font-semibold block mb-1">채널 입력</label>
          <input
            id="channelInput"
            type="number"
            min="1"
            max={MAX_CHANNEL[selectedServer]}
            value={channelInput}
            onChange={(e) => setChannelInput(e.target.value)}
            className="border border-slate-300 px-2 py-1 rounded w-full"
            placeholder={`1 ~ ${MAX_CHANNEL[selectedServer]}`}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 items-start">
        {(["A", "B", "C"] as const).map((part) => (
          <div key={part}>
            <label className="block font-semibold mb-1">파트 {part}</label>
            <div className="flex gap-1 mb-1">
              {[0, 1, 2].map((i) => (
                <input
                  key={i}
                  type="number"
                  min={0}
                  max={255}
                  placeholder={"RGB"[i]}
                  className="w-16 px-2 py-1 border border-slate-300 rounded"
                  value={partFilters[part].rgb[i]}
                  onChange={(e) => {
                    const updated = [...partFilters[part].rgb] as [string, string, string];
                    updated[i] = e.target.value;
                    setPartFilters({ ...partFilters, [part]: { ...partFilters[part], rgb: updated } });
                  }}
                />
              ))}
              <div className="w-6 h-6 border rounded-full" style={{ backgroundColor: `rgb(${partFilters[part].rgb.join(",")})` }}></div>
            </div>
            <input
              type="text"
              placeholder="#HEX"
              className="w-[82px] px-2 py-1 border border-slate-300 rounded"
              value={partFilters[part].hex}
              onChange={(e) => {
                const hex = e.target.value;
                const rgb = hexToRgb(hex);
                if (rgb) {
                  setPartFilters({ ...partFilters, [part]: { rgb: rgb.map(String) as [string, string, string], hex } });
                } else {
                  setPartFilters({ ...partFilters, [part]: { ...partFilters[part], hex: hex } });
                }
              }}
            />
          </div>
        ))}
        <div>
          <label className="block font-semibold mb-1" htmlFor="tolerance">오차 범위 ±</label>
          <input
            id="tolerance"
            type="number"
            value={tolerance}
            min={0}
            max={50}
            onChange={(e) => setTolerance(Number(e.target.value))}
            className="w-16 px-2 py-1 border border-slate-300 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            필터 적용
          </button>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            초기화
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-250px)] pr-1">
        {loading ? (
          <p>불러오는 중...</p>
        ) : filteredItems.length === 0 ? (
          <p>주머니 탭에 해당하는 아이템이 없습니다.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredItems.map((item, idx) => {
              const colorOptions = item.item_option?.filter(opt => opt.option_type === "아이템 색상") ?? [];
              const getColorStyle = (part: "파트 A" | "파트 B" | "파트 C") => {
                const option = colorOptions.find(opt => opt.option_sub_type === part);
                if (!option) return null;
                const [r, g, b] = option.option_value.split(",").map(Number);
                return {
                  backgroundColor: `rgb(${r}, ${g}, ${b})`
                };
              };
              return (
                <li key={idx} className="border border-slate-300 rounded bg-white shadow p-2 flex flex-col items-left">
                  <div className="flex gap-2">
                    <div className="relative w-16 h-16">
                      <img
                        src={item.image_url}
                        alt={item.item_display_name}
                        className="w-16 h-16"
                      />
                      {(["파트 B", "파트 C"] as const).map((part, i) => {
                        const colorStyle = getColorStyle(part);
                        if (!colorStyle) return null;
                        return (
                          <div
                            key={i}
                            className="absolute w-4 h-4 border border-white rounded-full"
                            style={{ 
                              ...colorStyle, 
                              top: `${4 + i * 20}px`, 
                              right: "4px" 
                            }}
                            title={part}
                          />
                        );
                      })}
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="font-semibold text-sm">{item.item_display_name}</p>
                      <div className="flex flex-col gap-1 mt-1 text-xs">
                        {colorOptions.map((opt, i) => {
                          const [r, g, b] = opt.option_value.split(",").map(Number);
                          const hex = `#${[r, g, b]
                            .map((v) => v.toString(16).padStart(2, "0"))
                            .join("")}`;
                          const color = `rgb(${r}, ${g}, ${b})`;
                          return (
                            <div key={i} className="flex items-center gap-1">
                              <div className="w-3 h-3 border border-black" style={{ backgroundColor: color }} />
                              <span>{opt.option_sub_type}: ({r}, {g}, {b}) / {hex}</span>
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
        )}
      </div>
    </div>
  );
}