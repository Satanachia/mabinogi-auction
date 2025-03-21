import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { AuctionItem } from "../type/AuctionItem"; 
import ItemOptionsPane from "./ItemOptionsPane";
import type { JSX } from "react";
import styles from './AuctionList.module.css';

interface AuctionListProps {
  auctionData: AuctionItem[];
  loading: boolean;
  error: string | null;
}

export default function AuctionList({
  auctionData,
  loading,
  error,
  // onSelectItem,
}: AuctionListProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [hoveredItem, setHoveredItem] = useState<AuctionItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  // 툴팁 DOM 요소를 참조할 ref
  const tooltipRef = useRef<HTMLDivElement>(null);

  // 마우스 이벤트로 raw 좌표 저장 → 렌더링 후 useLayoutEffect에서 툴팁 크기 측정 → 보정
  useLayoutEffect(() => {
    if (hoveredItem && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();

      let finalX = mousePos.x + 10;
      let finalY = mousePos.y + 10;

      // 화면 오른쪽 경계를 넘어가면 왼쪽으로
      if (finalX + rect.width > window.innerWidth) {
        finalX = mousePos.x - 10 - rect.width;
      }
      // 화면 하단 경계를 넘어가면 위로
      if (finalY + rect.height > window.innerHeight) {
        finalY = mousePos.y - 10 - rect.height;
      }

      // 화면 왼쪽 경계 보정 (툴팁이 음수 좌표로 넘어가지 않도록)
      if (finalX < 0) finalX = 0;
      // 화면 상단 경계 보정 (툴팁이 음수 좌표로 넘어가지 않도록)
      if (finalY < 0) finalY = 0;

      if (tooltipRef.current) {
        tooltipRef.current.style.setProperty('--tooltip-x', `${finalX}px`);
        tooltipRef.current.style.setProperty('--tooltip-y', `${finalY}px`);
      }
    }
  }, [hoveredItem, mousePos]);

  // 뷰포트 높이에 따라 한 페이지당 표시할 아이템 수 동적 계산
  useEffect(() => {
    const updateItemsPerPage = () => {
      const itemHeight = 76;
      // 창 높이에서 상단/하단 여백 등을 뺀 사용 가능 높이(px). 필요에 따라 조정하세요.
      const availableHeight = window.innerHeight - 350;
      const calculated = Math.max(1, Math.floor(availableHeight / itemHeight));
      setItemsPerPage(calculated);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // 현재 페이지에 해당하는 아이템만 slice
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pagedResults = auctionData.slice(startIndex, endIndex);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(auctionData.length / itemsPerPage);

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
  if (!auctionData || auctionData.length === 0) {
    return <p className="p-4">해당 조건에 맞는 아이템이 없습니다.</p>;
  }

  return (
    <div>
      <ul className="space-y-4 flex flex-col">
        {pagedResults.map((item, i) => (
          <li
            key={`${item.item_name}-${i}`}
            className="group relative border border-slate-300 p-4 rounded w-full"
            onMouseEnter={() => setHoveredItem(item)}
            onMouseMove={(e) => setMousePos({ x: e.pageX, y: e.pageY })}
            onMouseLeave={() => setHoveredItem(null)}
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

      {/* 플로팅 아이템 정보 패널 */}
      {hoveredItem && (
        <div
          ref={tooltipRef}
          className={`${styles.tooltip} bg-zinc-100 rounded border border-slate-300/50 p-4 shadow-lg z-50 max-w-[500px] max-h-[70vh] overflow-y-auto`}
        >
          <ItemOptionsPane item={hoveredItem} />
        </div>
      )}
    </div>
  );
}
