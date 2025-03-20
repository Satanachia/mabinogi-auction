import { useState } from "react";
import { AuctionItem } from "../type/AuctionItem"; 
import { fetchAuctionList, searchAuctionItems } from "../services/mabinogiApi";
import type { JSX } from "react";
import { Category } from "../constants/categoryMap";

interface SearchAuctionProps {
  onSearchComplete: (results: AuctionItem[], errorMsg?: string) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  onKeywordChange?: (kw: string) => void;
  selectedCategory: Category | null;
}

export default function SearchAuction({
  onSearchComplete,
  setLoading,
  setError,
  onKeywordChange,
  selectedCategory,
}: SearchAuctionProps): JSX.Element {
  const [keyword, setKeyword] = useState<string>("");

  const handleSearch = async () => {
    if (!keyword.trim()) {
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
          item.item_name.toLowerCase().includes(keyword.toLowerCase()) ||
          item.item_display_name.toLowerCase().includes(keyword.toLowerCase())
        );
        console.log("로컬 필터링 결과:", filteredItems);

        if (filteredItems.length === 0) {
          onSearchComplete([], `'${selectedCategory.label}' 카테고리에서 '${keyword}' 검색 결과가 없습니다.`);
        } else {
          onSearchComplete(filteredItems);
        }
      } else {
        // 카테고리가 선택되지 않은 경우 일반 키워드 검색
        const data = await searchAuctionItems(keyword);
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if (onKeywordChange) {
      onKeywordChange(e.target.value);
    }
  };

  // X 아이콘 클릭 시 검색어 지우기
  const handleClear = () => {
    setKeyword("");
    if (onKeywordChange) {
      onKeywordChange("");
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col md:flex-row items-center gap-2 mb-4 w-full">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="아이템 이름 입력"
              value={keyword}
              onChange={handleChange}
              className="border border-slate-300 rounded px-3 py-2 w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            {keyword && (
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
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
          >
            검색
          </button>
        </div>
      </div>
    </>
  );
}
