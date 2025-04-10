import React from "react";
import RemainingTime from "./RemainingTime";

interface BagTopBarProps {
  selectedNpc: string;
  selectedServer: string;
  channelInput: string;
  onNpcChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onServerChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChannelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextUpdateTime: string | null;
  onTimeReached: () => void;
}

const ALL_NPCS = [
  "델", "델렌", "상인 라누", "상인 피루", "모락", "상인 아루", "리나",
  "상인 누누", "상인 메루", "켄", "귀넥", "얼리", "데위", "테일로",
  "상인 세누", "상인 베루", "상인 에루", "상인 네루", "카디", "인장 상인", "피오나트",
];

const SERVERS = ["류트", "만돌린", "하프", "울프"];

const BagTopBar: React.FC<BagTopBarProps> = ({
  selectedNpc,
  selectedServer,
  channelInput,
  onNpcChange,
  onServerChange,
  onChannelChange,
  nextUpdateTime,
  onTimeReached,
}) => {
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* NPC / 서버 / 채널 입력 */}
      <div className="flex flex-wrap gap-2">
        <div className="flex flex-col">
          <label htmlFor="npc-select" className="text-sm">NPC</label>
          <select
            id="npc-select"
            value={selectedNpc}
            onChange={onNpcChange}
            className="border border-slate-300 px-2 py-1 rounded w-full"
          >
            {ALL_NPCS.map((npc) => (
              <option key={npc} value={npc}>{npc}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="server-select" className="text-sm">서버</label>
          <select
            id="server-select"
            value={selectedServer}
            onChange={onServerChange}
            className="border border-slate-300 px-2 py-1 rounded w-full"
          >
            {SERVERS.map((server) => (
              <option key={server} value={server}>{server}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="channel-input" className="text-sm">채널</label>
          <input
            id="channel-input"
            type="number"
            value={channelInput}
            onChange={onChannelChange}
            className="border border-slate-300 px-2 py-1 w-20 rounded"
            min={1}
          />
        </div>
      </div>

      {/* 타이머 */}
      <RemainingTime nextUpdateTime={nextUpdateTime} onTimeReached={onTimeReached} />
    </div>
  );
};

export default BagTopBar;
