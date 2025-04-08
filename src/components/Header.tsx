import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import DropDownMenu from "./DropdownMenu";
import { HeaderProps } from "../type/AuctionItem";

export default function Header({ onHornBugleFetch }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState("류트");

  return (
    <div className="flex justify-between items-center px-4 py-3 border-b border-slate-300 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold">마비노기 경매장 검색</h1>
      <div className="relative">
        <button 
          aria-label="메뉴 열기" 
          onClick={() => setMenuOpen((prev) => !prev)} className="p-2"
        >
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        </button>
        <DropDownMenu
          open={menuOpen}
          selectedServer={selectedServer}
          setSelectedServer={setSelectedServer}
          onSubmit={() => {
            onHornBugleFetch?.(selectedServer);
            setMenuOpen(false);
          }}
        />
      </div>
    </div>
  );
}
