import { useState, useEffect } from "react";
import SearchAuction from "./SearchAuction";
import AuctionList from "./AuctionList";
import { AuctionItem, fetchAuctionList, searchAuctionItems } from "../services/mabinogiApi";
import { Category, categoryMap } from "../constants/categoryMap";
import CategoryTree from "./CategoryTree";
import ItemOptionsPane from "./ItemOptionsPane";

export default function MabinogiAuctionPage() {
  const [auctionData, setAuctionData] = useState<AuctionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null);

  useEffect(() => {
    async function fetchInitialData() {
      setLoading(true);
      setError(null);
      try {
        // "롱 소드"로 키워드 검색
        const data = await searchAuctionItems("롱 소드");
        console.log("초기 경매 데이터:", data);
        
        // data.auction_item가 배열 형태로 넘어옴
        if (data.auction_item && data.auction_item.length > 0) {
          setAuctionData(data.auction_item);
        } else {
          setAuctionData([]);
          setError("초기 경매 데이터가 없습니다.");
        }
      } catch (err) {
        console.error(err);
        setError("초기 데이터 로딩 중 오류 발생");
      }
      setLoading(false);
    }
    fetchInitialData();
  }, []);

  // SearchAuction에서 검색이 완료되면 이 함수를 호출하여 상태를 업데이트
  const handleSearchComplete = (results: AuctionItem[], errorMsg?: string) => {
    if (errorMsg) {
      setError(errorMsg);
    } else {
      setError(null);
    }
    setAuctionData(results);
  };

  const handleCategoryClick = async (cat: Category) => {
    setSelectedCategory(cat);
    setKeyword("");
    console.log("선택한 카테고리:", cat);
    setLoading(true);
    setError(null);
    setSelectedItem(null);
    try {
      const data = await fetchAuctionList("", cat.label);
      console.log("키워드와 카테고리 결합 검색:", data);
      let filteredItems = data.auction_item;

      // 검색 키워드가 있는 경우 키워드와 카테고리를 함께 사용
      if (keyword && keyword.trim() !== "") {
        filteredItems = filteredItems.filter((item: AuctionItem) =>
          item.item_name.toLowerCase().includes(keyword.toLowerCase()) ||
          item.item_display_name.toLowerCase().includes(keyword.toLowerCase())
        );
        if (filteredItems && filteredItems.length > 0) {
          setAuctionData(data.auction_item);
        } else {
          setAuctionData([]);
          setError(`'${cat.label}' 카테고리에서 '${keyword}' 검색 결과가 없습니다.`);
        }
      } else {
        // 키워드가 없는 경우 카테고리만으로 검색
        const data = await fetchAuctionList("", cat.label);
        console.log("카테고리 API 응답:", data);
        
        if (filteredItems && filteredItems.length > 0) {
          setAuctionData(filteredItems);
        } else {
          setAuctionData([]);
          setError("해당 카테고리 매물이 없습니다.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("카테고리 조회 중 오류 발생");
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto relative">
      <div className="sticky top-0 w-full bg-white z-10">
        <SearchAuction
          onSearchComplete={handleSearchComplete}
          setLoading={setLoading}
          setError={setError}
          onKeywordChange={(kw: string) => setKeyword(kw)}
          selectedCategory={selectedCategory}
        />
      </div>
      <div className="flex gap-4 p-4">
        <aside className="w-1/6 h-[700px] overflow-y-auto border border-slate-300 p-2 rounded">
          <CategoryTree
            nodes={categoryMap}
            onCategoryClick={handleCategoryClick}
            selectedCategoryCode={selectedCategory ? selectedCategory.code : null}
          />
        </aside>
        {/* 가운데: 경매 리스트 */}
        <div className="flex-1">
          <AuctionList
            auctionData={auctionData}
            loading={loading}
            error={error}
            onSelectItem={setSelectedItem} // ← 클릭 시 아이템 선택
          />
        </div>
        {/* 오른쪽: 옵션 상세 창 */}
        <aside className="w-xs flex-initial border border-slate-300 p-2 rounded h-[700px] overflow-y-auto">
          {selectedItem ? (
            <ItemOptionsPane item={selectedItem} />
          ) : (
            <div className="text-gray-500">아이템을 선택하면 옵션이 표시됩니다.</div>
          )}
        </aside>
      </div>
    </div>
  );
}
