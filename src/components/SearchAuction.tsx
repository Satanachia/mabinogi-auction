import React, { useCallback } from "react";
import { AuctionItem } from "../type/AuctionItem"; 
import { fetchAuctionList, searchAuctionItems } from "../services/mabinogiApi";
import useLocalInput from "../hooks/useLocalInput";
import type { JSX } from "react";
import { Category } from "../constants/categoryMap";

interface SearchAuctionProps {
  onSearchComplete: (results: AuctionItem[], errorMsg?: string) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  onKeywordChange?: (kw: string) => void;
  selectedCategory: Category | null;
  onRefresh: () => void;
}

function SearchAuction({
  onSearchComplete,
  setLoading,
  setError,
  onKeywordChange,
  selectedCategory,
  onRefresh,
}: SearchAuctionProps): JSX.Element {
  const {value: localKeyword, handleChange, handleClear } = useLocalInput("", onKeywordChange);

  const handleSearch = useCallback(async () => {
    if (!localKeyword.trim()) {
      setError("검색어를 입력하세요.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // 카테고리가 선택되어 있는 경우 해당 카테고리에서 검색
      if (selectedCategory) {
        const data = await fetchAuctionList("", selectedCategory.label);
        console.log("카테고리 전체 검색 결과:", data);

        const filteredItems = data.auction_item.filter((item: AuctionItem) =>
          item.item_name.toLowerCase().includes(localKeyword.toLowerCase()) ||
          item.item_display_name.toLowerCase().includes(localKeyword.toLowerCase())
        );
        console.log("로컬 필터링 결과:", filteredItems);

        if (filteredItems.length === 0) {
          onSearchComplete([], `'${selectedCategory.label}' 카테고리에서 '${localKeyword}' 검색 결과가 없습니다.`);
        } else {
          onSearchComplete(filteredItems);
        }
      } else {
        // 카테고리가 선택되지 않은 경우 일반 키워드 검색
        const data = await searchAuctionItems(localKeyword);
        console.log("키워드 검색 결과:", data);
        
        if (data.auction_item.length === 0) {
          onSearchComplete([], "검색 결과가 없습니다.");
        } else {
          onSearchComplete(data.auction_item);
        }
      }
    } catch (err) {
      console.error(err);
      onSearchComplete([], "검색 중 오류 발생");
    }
    setLoading(false);
  }, [localKeyword, selectedCategory, onSearchComplete, setError, setLoading]);

  return (
    <>
      <div className="pt-4 pb-0">
        <div className="flex flex-col lg:flex-row items-center gap-2 mb-2 w-full">
          <div className="relative w-full lg:w-1/2">
            <input
              type="text"
              placeholder="아이템 이름 입력"
              value={localKeyword}
              onChange={handleChange}
              className="border border-slate-300 rounded px-3 py-2 w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            {localKeyword && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full lg:w-auto"
          >
            검색
          </button>

          <button
            onClick={onRefresh}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full lg:w-auto"
          >
            새로고침
          </button>

        </div>
      </div>
    </>
  );
}

export default React.memo(SearchAuction);