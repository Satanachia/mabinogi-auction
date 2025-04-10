import { useNavigate } from 'react-router-dom';
import DropdownMenuBase from '../../../shared/components/DropdownMenuBase';
import { DropDownMenuProps } from '../../../type/AuctionItem';

const servers = ["류트", "만돌린", "하프", "울프"];

export default function DropDownMenu({ 
  open,
  selectedServer,
  setSelectedServer,
  onSubmit, 
}: DropDownMenuProps) {
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
          {servers.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <button
        onClick={onSubmit}
        className="w-full px-4 py-2 mb-0 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        📣 거뿔 내역
      </button>

      <div className="my-3 border-t border-gray-300" />

      <button
        onClick={() => navigate('/sturdy-bag')}
        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        👜 튼튼한 주머니 검색
      </button>
    </DropdownMenuBase>
  );
}