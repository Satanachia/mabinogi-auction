import { useState } from "react";
import { AuctionItem } from "../services/mabinogiApi";
import type { JSX } from "react";

interface AuctionListProps {
  auctionData: AuctionItem[];
  loading: boolean;
  error: string | null;
  onSelectItem: (item: AuctionItem) => void;
}

const ITEMS_PER_PAGE = 7;

export default function AuctionList({
  auctionData,
  loading,
  error,
  onSelectItem,
}: AuctionListProps): JSX.Element {
  // 페이지 상태는 AuctionList 컴포넌트 내부에서 관리할 수도 있고,
  // 부모에서 관리하도록 할 수도 있다.
  const [currentPage, setCurrentPage] = useState(1);
  
  // 현재 페이지에 해당하는 아이템만 slice
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pagedResults = auctionData.slice(startIndex, endIndex);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(auctionData.length / ITEMS_PER_PAGE);

  // 한 그룹에 최대 10개 페이지 버튼만 표시
  const maxVisiblePages = 10;
  const currentGroup = Math.floor((currentPage - 1) / maxVisiblePages);
  const startPage = currentGroup * maxVisiblePages + 1;
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <p className="p-4">로딩 중...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  // if (!auctionData || auctionData.length === 0)
  //   return <p className="p-4">검색된 경매장 데이터가 없습니다.</p>;

  return (
    <div>
      <ul className="space-y-4 flex flex-col">
        {pagedResults.map((item, i) => (
          <li
            key={`${item.item_name}-${i}`}
            className="group relative border border-slate-300 p-4 rounded w-full"
            onClick={() => onSelectItem(item)} // ← 클릭 시 선택 아이템 전달
          >
            {/* 간단 정보 표시 */}
            <div className="flex justify-between">
              <p className="font-bold">{item.item_display_name}</p>
              <p>
                {(item.auction_price_per_unit !== undefined && item.auction_price_per_unit !== null)
                  ? item.auction_price_per_unit.toLocaleString()
                  : "가격 정보 없음"} Gold
              </p>
            </div>
            <p className="flex flex-row justify-end text-sm text-gray-600">
              만료 시각: {item.date_auction_expire ? new Date(item.date_auction_expire).toLocaleString() : "정보 없음"}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center gap-2 w-full">
        {startPage > 1 && (
          <button
            onClick={() => handlePageChange(startPage - 1)}
            className="px-3 py-1 rounded border border-slate-300 bg-white hover:bg-gray-100"
          >
            {"<"}
          </button>
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
            className={`px-3 py-1 rounded border border-slate-300 ${
              page === currentPage ? "bg-blue-300 cursor-default" : "bg-white hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
        {endPage < totalPages && (
          <button
            onClick={() => handlePageChange(endPage + 1)}
            className="px-3 py-1 rounded border border-slate-300 bg-white hover:bg-gray-100"
          >
            {">"}
          </button>
        )}
      </div>
    </div>
  );
}
