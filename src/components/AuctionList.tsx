import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { AuctionItem } from "../type/AuctionItem"; 
import ItemOptionsPane from "./ItemOptionsPane";
import useIsMobile from "../hooks/useIsMobile";
import useTooltipPosition from "../hooks/useTooltipPosition";
import { goldFormat } from "../utils/goldFormat";
import type { JSX } from "react";
import styles from './AuctionList.module.css';
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

interface AuctionListProps {
  auctionData: AuctionItem[];
  loading: boolean;
  error: string | null;
}

function AuctionList({
  auctionData,
  loading,
  error,
}: AuctionListProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [sortPrice, setSortPrice] = useState<"asc" | "desc">("asc");
  const isMobile = useIsMobile();
  const [hoveredItem, setHoveredItem] = useState<AuctionItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  // 툴팁 DOM 요소를 참조할 ref
  const tooltipRef = useRef<HTMLDivElement>(null);

  // 모바일용: 각 아이템의 옵션 토글 state
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useTooltipPosition(tooltipRef, mousePos, hoveredItem, isMobile);

  // 뷰포트 높이에 따라 한 페이지당 표시할 아이템 수 동적 계산
  useEffect(() => {
    const updateItemsPerPage = () => {
      const itemHeight = 76;
      // 창 높이에서 상단/하단 여백 등을 뺀 사용 가능 높이(px)
      const availableHeight = window.innerHeight - 350;
      const calculated = Math.max(1, Math.floor(availableHeight / itemHeight));
      setItemsPerPage(calculated);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // 가격 정렬 적용
  const sortedPrice = useMemo(() => {
    // auction_price_per_unit가 없으면 0 처리
    const copy = [...auctionData];
    copy.sort((a, b) => {
      const priceA = a.auction_price_per_unit ?? 0;
      const priceB = b.auction_price_per_unit ?? 0;
      return sortPrice === "asc" ? priceA - priceB : priceB - priceA;
    });
    return copy;
  }, [auctionData, sortPrice]);

  // 현재 페이지에 해당하는 아이템만 slice
  const startIndex = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage, itemsPerPage]);
  const endIndex = useMemo(() => startIndex + itemsPerPage, [startIndex, itemsPerPage]);
  const pagedResults = useMemo(() => sortedPrice.slice(startIndex, endIndex), [sortedPrice, startIndex, endIndex]);

  // 전체 페이지 수 계산
  const totalPages = useMemo(() => Math.ceil(sortedPrice.length / itemsPerPage), [sortedPrice, itemsPerPage]);

  // 한 그룹에 최대 8개 페이지 버튼만 표시
  const maxVisiblePages = useMemo(() => (isMobile ? 6 : 8), [isMobile]); // 모바일에선 6개 까지
  const currentGroup = useMemo(() => Math.floor((currentPage - 1) / maxVisiblePages), [currentPage, maxVisiblePages]);
  const startPage = useMemo(() => currentGroup * maxVisiblePages + 1, [currentGroup, maxVisiblePages]);
  const endPage = useMemo(() => Math.min(startPage + maxVisiblePages - 1, totalPages), [startPage, maxVisiblePages, totalPages]);

  // 가격 정렬 토글
  const handleSortToggle = useCallback(() => {
    setCurrentPage(1);
    setSortPrice((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  // 페이지 변경 핸들러
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // 모바일: 아이템 옵션 토글 핸들러
  const handleToggle = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  if (loading) return <p className="p-4">로딩 중...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!auctionData || auctionData.length === 0) {
    return <p className="p-4">해당 조건에 맞는 아이템이 없습니다.</p>;
  }

  return (
    <div className="relative">
      {/* 정렬 버튼 */}
      <button
        onClick={handleSortToggle}
        className="absolute z-10 border border-slate-300 rounded px-3 py-1 bg-white hover:bg-gray-100 inline-flex items-center gap-1 top-[-40px] right-0"
      >
        {sortPrice === "asc" ? (
          <>
            <ChevronUpIcon className="h-4 w-4 text-blue-600" />
            <span>오름차순</span>
          </>
        ) : (
          <>
            <ChevronDownIcon className="h-4 w-4 text-blue-600" />
            <span>내림차순</span>
          </>
        )}
      </button>
      <ul className="space-y-4 flex flex-col">
        {pagedResults.map((item, i) => (
          <li
            key={`${item.item_name}-${i}`}
            className="border border-slate-300 mb-2 p-4 rounded w-full hover:bg-blue-100"
            onMouseEnter={!isMobile ? () => setHoveredItem(item) : undefined}
            onMouseMove={!isMobile ? (e) => setMousePos({ x: e.pageX, y: e.pageY }) : undefined}
            onMouseLeave={!isMobile ? () => setHoveredItem(null) : undefined}
          >
            {/* 간단 정보 표시 */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start gap-2">
                <p className="font-bold">{item.item_display_name}</p>
                <p className="flex flex-row justify-end text-sm text-gray-600">
                  만료 시각: {item.date_auction_expire 
                  ? new Date(item.date_auction_expire).toLocaleString() 
                  : "정보 없음"}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <p>
                  {(item.auction_price_per_unit !== undefined && item.auction_price_per_unit !== null)
                    ? goldFormat(item.auction_price_per_unit)
                    : "가격 정보 없음"} Gold
                </p>
                {/* 모바일에서는 "옵션 보기" 토글 버튼 */}
                {isMobile && (
                  <button
                    className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
                    onClick={() => handleToggle(i)}
                  >
                    {expandedIndex === i ? "옵션 닫기" : "옵션 보기"}
                  </button>
                )}
              </div>
            </div>
            {/* 모바일: 토글 시 아이템 옵션 표시 */}
            {isMobile && expandedIndex === i && (
              <div className="mt-2">
                <ItemOptionsPane item={item} isMobile={isMobile} />
              </div>
            )}
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

export default React.memo(AuctionList);