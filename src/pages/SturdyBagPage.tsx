import { useEffect, useState, useCallback } from "react";
import { getNpcShopItems } from "../services/mabinogiApi";
import { ShopItem, ShopApiResponse } from "../type/AuctionItem";
import DropdownMenuMini from "../features/sturdyBag/components/DropdownMenuMini";
import { Bars3Icon } from "@heroicons/react/24/outline";
import BagTopBar from "../features/sturdyBag/components/BagTopBar";
import BagFilterSection from "../features/sturdyBag/components/BagFilterSection";
import { matchesColor } from "../shared/utils/matchesColor";
import BagItemList from "../features/sturdyBag/components/BagItemList";
import RemainingTime from "../features/sturdyBag/components/RemainingTime";

interface SturdyBagPageProps {
  onHornBugleFetch: (server: string) => void;
}

const ALL_NPCS = [
  "델", "델렌", "상인 라누", "상인 피루", "모락", "상인 아루", "리나",
  "상인 누누", "상인 메루", "켄", "귀넥", "얼리", "데위", "테일로",
  "상인 세누", "상인 베루", "상인 에루", "상인 네루", "카디", "인장 상인", "피오나트",
];

const MAX_CHANNEL: Record<string, number> = {
  "류트": 44,
  "하프": 25,
  "만돌린": 16,
  "울프": 16,
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
  const [nextUpdateTime, setNextUpdateTime] = useState<string | null>(null);

  const [rgbA, setRgbA] = useState<[number, number, number]>([NaN, NaN, NaN]);
  const [rgbB, setRgbB] = useState<[number, number, number]>([NaN, NaN, NaN]);
  const [rgbC, setRgbC] = useState<[number, number, number]>([NaN, NaN, NaN]);

  const [hexA, setHexA] = useState("");
  const [hexB, setHexB] = useState("");
  const [hexC, setHexC] = useState("");

  const fetchItems = useCallback(async (npc: string, server: string, channelStr: string) =>  {
    setLoading(true);
    try {
      const channel = Number(channelStr);
      const max = MAX_CHANNEL[server];
      if (isNaN(channel) || channel < 1 || channel > max) {
        alert(`입력 가능한 채널은 1 ~ ${max}입니다.`);
        setLoading(false);
        return;
      }
      const data: ShopApiResponse = await getNpcShopItems(npc, server, channel);
      const pocketItems = (data.npc_shop ?? [])
        .filter((tab) => tab.tab_name.includes("주머니"))
        .flatMap((tab) => tab.item);

      setItems(pocketItems);
      setFilteredItems(pocketItems);
      setNextUpdateTime(data.date_shop_next_update);
    } catch (e) {
      console.error("아이템 불러오기 실패:", e);
      setItems([]);
      setFilteredItems([]);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchItems(selectedNpc, selectedServer, channelInput);
  }, [fetchItems, selectedNpc, selectedServer, channelInput]);
  
  const handleNpcChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedNpc(e.target.value);
  }, []);

  const handleServerChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedServer(e.target.value);
  }, []);

  const handleChannelChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelInput(e.target.value);
  }, []);

  const handleFilterChange = (
    part: "A" | "B" | "C",
    index: number,
    value: number
  ) => {
    const updater = part === "A" ? setRgbA : part === "B" ? setRgbB : setRgbC;
    const current = part === "A" ? rgbA : part === "B" ? rgbB : rgbC;
    const updated = [...current] as [number, number, number];
    updated[index] = value;
    updater(updated);
  };
  
  const hexToRgb = (hex: string): [number, number, number] | null => {
    const sanitized = hex.replace(/^#/, "");
    if (sanitized.length !== 6) return null;
    const r = parseInt(sanitized.slice(0, 2), 16);
    const g = parseInt(sanitized.slice(2, 4), 16);
    const b = parseInt(sanitized.slice(4, 6), 16);
    return [r, g, b];
  };
  
  const handleHexInput = (part: "A" | "B" | "C", hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return;
  
    if (part === "A") {
      setHexA(hex);
      setRgbA(rgb);
    } else if (part === "B") {
      setHexB(hex);
      setRgbB(rgb);
    } else {
      setHexC(hex);
      setRgbC(rgb);
    }
  };

  const applyFilters = () => {
    const result = items.filter((item) => {
      const options = item.item_option.filter((o) => o.option_type === "아이템 색상");
  
      const getColor = (part: "A" | "B" | "C") =>
        options.find((o) => o.option_sub_type === `파트 ${part}`)?.option_value || "";
  
      return (
        matchesColor(rgbA, getColor("A"), tolerance) &&
        matchesColor(rgbB, getColor("B"), tolerance) &&
        matchesColor(rgbC, getColor("C"), tolerance)
      );
    });
  
    setFilteredItems(result);
  };

  const resetFilters = () => {
    setRgbA([NaN, NaN, NaN]);
    setRgbB([NaN, NaN, NaN]);
    setRgbC([NaN, NaN, NaN]);
    setHexA("");
    setHexB("");
    setHexC("");
    setTolerance(10);
    setFilteredItems(items);
  };

  return (
    <div className="min-h-screen max-w-screen-xl overflow-y-auto mx-auto p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4 border-b border-slate-300 pb-2">
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
        <BagTopBar
          selectedNpc={selectedNpc}
          selectedServer={selectedServer}
          channelInput={channelInput}
          onNpcChange={handleNpcChange}
          onServerChange={handleServerChange}
          onChannelChange={handleChannelChange}
        />
        <div>
          <RemainingTime
            nextUpdateTime={nextUpdateTime}
            onRefresh={() => fetchItems(selectedNpc, selectedServer, channelInput)}
          />
        </div>
      </div>
      <BagFilterSection
        rgbA={rgbA}
        rgbB={rgbB}
        rgbC={rgbC}
        hexA={hexA}
        hexB={hexB}
        hexC={hexC}
        tolerance={tolerance}
        onRGBChange={handleFilterChange}
        onHexChange={handleHexInput}
        onToleranceChange={setTolerance}
        onApply={applyFilters}
        onReset={resetFilters}
      />
      <div className="overflow-y-auto max-h-[calc(92vh-300px)]">
        <BagItemList 
          items={filteredItems} 
          loading={loading} 
        />
      </div>
    </div>
  );
}