import { useEffect, useState, useCallback } from "react";
import { getNpcShopItems } from "../services/mabinogiApi";
import { NpcShopTab, ShopItem } from "../type/AuctionItem";

const ALL_NPCS  = [
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
}

export default function SturdyBagPage() {
  const [selectedNpc, setSelectedNpc] = useState(ALL_NPCS[0]);
  const [selectedServer, setSelectedServer] = useState("류트");
  const [channelInput, setChannelInput] = useState("1");
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(false);

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
      const pocketItems = tabs
        .filter((tab) => tab.tab_name === "주머니")
        .flatMap((tab) => tab.item);
      
      setItems(pocketItems);
    } catch (e) {
      console.error("아이템 불러오기 실패:", e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [selectedNpc, selectedServer, channelInput]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div className="min-h-screen mx-auto p-4 bg-gray-50 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">🎒 주머니 검색</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* NPC 선택 */}
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

        {/* 서버 선택 */}
        <div>
          <label htmlFor="serverSelect" className="font-semibold block mb-1">서버 선택</label>
          <select
            id="serverSelect"
            value={selectedServer}
            onChange={(e) => setSelectedServer(e.target.value)}
            className="border border-slate-300 px-2 py-1 rounded w-full"
          >
            {SERVERS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* 채널 입력 */}
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

      {/* 아이템 목록 */}
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] rounded border border-none bg-white p-4 shadow-inner">
        {loading ? (
          <p>불러오는 중...</p>
        ) : items.length === 0 ? (
          <p>주머니 탭에 해당하는 아이템이 없습니다.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, idx) => {
              const colorOptions = item.item_option?.filter(opt => opt.option_type === "아이템 색상") ?? [];

              return (
                <li key={idx} className="border border-slate-300 rounded bg-white shadow p-4 flex flex-col items-left">
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.image_url}
                      alt={item.item_display_name}
                      className="w-16 h-16 mb-2 border border-slate-300 rounded"
                    />

                    <div className="flex flex-col gap-2">
                      <p className="text-lg font-bold">{item.item_display_name}</p>

                      <div className="flex flex-col text-sm text-gray-700">
                        {colorOptions.map((opt, i) => {
                          const [r, g, b] = opt.option_value.split(",").map(Number);
                          const rgb = `(${r}, ${g}, ${b})`;
                          const color = `rgb(${r}, ${g}, ${b})`;

                          return (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-4 h-4 border border-black" style={{ backgroundColor: color }} />
                              <span>{opt.option_sub_type}: {rgb}</span>
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