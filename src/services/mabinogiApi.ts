export interface OptionType {
  option_type: string;
  option_sub_type: string | null;
  option_value: string;
  option_value2: string | null;
  option_desc: string | null;
}

export interface AuctionItem {
  auction_price_per_unit: number;   
  date_auction_expire: string;        
  item_count: number;              
  item_display_name: string;       
  item_name: string;
  item_option?: OptionType[];
}

interface AuctionResponse {
  auction_item: AuctionItem[];
  next_cursor?: string | null;
}

const API_KEY = import.meta.env.VITE_NEXON_API_KEY;
const BASE_URL = "https://open.api.nexon.com/mabinogi/v1/auction";
const DEFAULT_CURSOR = ""; 

export async function fetchAuctionList(
  item_name: string,
  auction_item_category: string | number,
  cursor: string = DEFAULT_CURSOR
): Promise<AuctionResponse> {
  const categoryStr = String(auction_item_category).trim();
  const trimmedName = item_name.trim();
  const url = new URL(`${BASE_URL}/list`);
  
  // 항상 카테고리 파라미터는 포함
  url.searchParams.append("auction_item_category", categoryStr);
  
  // 길이가 2 이상일 때만 item_name 파라미터를 추가
  if (trimmedName && trimmedName.length >= 2) {
    url.searchParams.append("item_name", trimmedName);
  }

  if (cursor) {
    url.searchParams.append("cursor", cursor);
  }

  console.log("API 요청 URL:", url.toString());

  const response = await fetch(url.toString(), {
    headers: {
      "accept": "application/json",
      "x-nxopen-api-key": API_KEY,
    },
  });
  console.log("API 호출 결과:", response);
  if (response.status === 400) {
    return { auction_item: [], next_cursor: null };
  }

  if (!response.ok) {
    throw new Error(`경매장 리스트 호출 실패: ${response.statusText}`);
  }

  const data = (await response.json()) as AuctionResponse;
  return data;
}

export async function searchAuctionItems(
  keyword: string,
  cursor: string = DEFAULT_CURSOR
): Promise<AuctionResponse> {
  const searchKeyword = keyword.trim();
  if (searchKeyword === "") {
    throw new Error("키워드가 비어있습니다.");
  }

  const url = new URL(`${BASE_URL}/keyword-search`);
  url.searchParams.append("keyword", searchKeyword);
  if (cursor) {
    url.searchParams.append("cursor", cursor);
  }

  const response = await fetch(url.toString(), {
    headers: {
      "accept": "application/json",
      "x-nxopen-api-key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`키워드 검색 호출 실패: ${response.statusText}`);
  }

  const data = (await response.json()) as AuctionResponse;
  return data;
}