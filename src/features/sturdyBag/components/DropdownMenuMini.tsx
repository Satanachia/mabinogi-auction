import { useNavigate } from 'react-router-dom';
import DropdownMenuBase from '../../../shared/components/DropdownMenuBase';

interface DropDownMenuProps {
  open: boolean;
  selectedServer: string;
  setSelectedServer: (server: string) => void;
  onSubmit: () => void;
}

const SERVERS = ["류트", "만돌린", "하프", "울프"];

export default function DropdownMenuMini({ open, selectedServer, setSelectedServer, onSubmit }: DropDownMenuProps) {
  const navigate = useNavigate();

  return (
    <DropdownMenuBase open={open}>
      <div>
        <label htmlFor="serverSelect" className="text-sm font-semibold block mb-1">서버 선택</label>
        <select
          id="serverSelect"
          value={selectedServer}
          onChange={(e) => setSelectedServer(e.target.value)}
          className="w-full border border-slate-300 rounded px-2 py-1"
        >
          {SERVERS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <button
        onClick={onSubmit}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        📣 거뿔 내역
      </button>
      <div className="my-2 border-t border-gray-300" />
      <button
        onClick={() => navigate('/')}
        className="w-full px-4 py-2 mt-2 bg-slate-500 text-white rounded hover:bg-slate-600"
      >
        🏠 경매장 검색
      </button>
    </DropdownMenuBase>
  );
}