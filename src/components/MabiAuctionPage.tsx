import { useState, useEffect, useCallback, useMemo } from "react";
import SearchAuction from "./SearchAuction";
import AuctionList from "./AuctionList";
import { AuctionItem } from "../type/AuctionItem"; 
import { fetchAuctionList, searchAuctionItems } from "../services/mabinogiApi";
import { Category, categoryMap } from "../constants/categoryMap";
import CategoryTree from "./CategoryTree";
import DetailFilter from "./DetailFilter";
import type { FilterCriteria } from "../constants/filterCriteria";
import { matchFilter } from "./filterHelpers";
import { parseAuctionItem } from "../utils/parseAuctionItem";

export default function MabinogiAuctionPage() {
  const [auctionData, setAuctionData] = useState<AuctionItem[]>([]);
  const [filteredData, setFilteredData] = useState<AuctionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({});

  // 모바일 여부 및 토글
  const [showDetailFilter, setShowDetailFilter] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // "롱 소드"로 키워드 검색
      const data = await searchAuctionItems("롱 소드");
      // console.log("초기 경매 데이터:", data);
      if (data.auction_item && data.auction_item.length > 0) {
        const parsedItems = data.auction_item.map((item: AuctionItem) =>
          parseAuctionItem(item)
        );
        setAuctionData(parsedItems);
        setFilterCriteria({});
      } else {
        setAuctionData([]);
        setError("초기 경매 데이터가 없습니다.");
      }
    } catch (err) {
      console.error(err);
      setError("초기 데이터 로딩 중 오류 발생");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handleRefresh = useCallback(async () => {
    await fetchInitialData();
  }, [fetchInitialData]);

  // auctionData 또는 filterCriteria가 변경되면 필터링 적용
  useEffect(() => {
    // 필터 조건이 없으면 전체 데이터를 그대로 사용
    if (Object.keys(filterCriteria).length === 0) {
      setFilteredData(auctionData);
    } else {
      // filterHelpers의 matchFilter를 적용하여 필터링
      const newData = auctionData.filter((item) => matchFilter(item, filterCriteria));
      setFilteredData(newData);
    }
  }, [auctionData, filterCriteria]);

  // SearchAuction에서 검색이 완료되면 이 함수를 호출하여 상태를 업데이트
  const handleSearchComplete = useCallback((results: AuctionItem[], errorMsg?: string) => {
    if (errorMsg) {
      setError(errorMsg);
    } else {
      setError(null);
    }
    const parsedItems = results.map((item) => parseAuctionItem(item));
    setAuctionData(parsedItems );
    // 검색 시에도 기존 필터 조건 초기화
    setFilterCriteria({});
  }, []);

  const handleCategoryClick = useCallback(async (cat: Category) => {
    setSelectedCategory(cat);
    setKeyword("");
    // console.log("선택한 카테고리:", cat);
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAuctionList("", cat.label);
      // console.log("키워드와 카테고리 결합 검색:", data);
      const parsedItems = data.auction_item.map((item: AuctionItem) =>
        parseAuctionItem(item)
      );

      // 검색 키워드가 있는 경우 키워드와 카테고리를 함께 사용
      if (keyword && keyword.trim() !== "") {
        const filteredItems = parsedItems.filter((item: AuctionItem) =>
          item.item_name.toLowerCase().includes(keyword.toLowerCase()) ||
          item.item_display_name.toLowerCase().includes(keyword.toLowerCase())
        );
        if (filteredItems && filteredItems.length > 0) {
          setAuctionData(filteredItems);
        } else {
          setAuctionData([]);
          setError(`'${cat.label}' 카테고리에서 '${keyword}' 검색 결과가 없습니다.`);
        }
      } else {
        // 키워드가 없는 경우 카테고리만으로 검색
        if (parsedItems && parsedItems.length > 0) {
          setAuctionData(parsedItems);
        } else {
          setAuctionData([]);
          setError("해당 카테고리 매물이 없습니다.");
        }
      }
      // 카테고리 선택 시 기존 필터 초기화
      setFilterCriteria({});
    } catch (err) {
      console.error(err);
      setError("카테고리 조회 중 오류 발생");
      setAuctionData([]);
    }
    setLoading(false);
  }, [keyword]);

  const handleFilterChange = useCallback((filters: FilterCriteria) => {
    setFilterCriteria(filters);
  }, []);

  const memoizedFilteredData = useMemo(() => filteredData, [filteredData]);

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="sticky top-0 w-full bg-white z-10">
        <SearchAuction
          onSearchComplete={handleSearchComplete}
          setLoading={setLoading}
          setError={setError}
          onKeywordChange={(kw: string) => setKeyword(kw)}
          selectedCategory={selectedCategory}
          onRefresh={handleRefresh}
        />
        {/* 상세 검색 버튼은 모바일에서만 표시 */}
        <div className="flex flex-col md:flex-row items-center pr-4 pl-4 pb-2 gap-2 w-full">
          {isMobile && (
            <button
              onClick={() => setShowDetailFilter((prev) => !prev)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
            >
              {showDetailFilter ? "상세 검색 닫기" : "상세 검색"}
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row flex-wrap gap-4 p-4">
        <aside className="lg:w-64 w-full lg:max-h-[calc(100vh-12rem)] overflow-y-auto border border-slate-300 p-2 rounded">
          <CategoryTree
            nodes={categoryMap}
            onCategoryClick={handleCategoryClick}
            selectedCategoryCode={selectedCategory ? selectedCategory.code : null}
          />
        </aside>
        {/* 모바일에서 상세 검색 버튼 눌렀을 때 카테고리 아래로 필터 표시 */}
        {isMobile && showDetailFilter && (
          <aside className="lg:w-64 w-full lg:max-h-[calc(100vh-12rem)] overflow-y-auto border border-slate-300 p-2 rounded">
            <div className="mt-4">
              <DetailFilter 
                onFilterChange={handleFilterChange}
                selectedCategory={selectedCategory}
              />
            </div>
          </aside>
            
          )}
        {/* 가운데: 경매 리스트 */}
        <div className="flex-1 min-w-0">
          <AuctionList
            auctionData={memoizedFilteredData }
            loading={loading}
            error={error}
          />
        </div>
        {/* 데스크톱에서는 오른쪽에 항상 상세 검색 */}
        {!isMobile && (
          <aside className="lg:w-72 w-full lg:max-h-[calc(100vh-12rem)] overflow-y-auto border border-slate-300 p-2 rounded">
            <DetailFilter 
              onFilterChange={handleFilterChange}
              selectedCategory={selectedCategory}
            />
          </aside>
        )}
      </div>
    </div>
  );
}
