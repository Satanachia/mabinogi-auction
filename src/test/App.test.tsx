// __tests__/App.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import CategoryTree from '../components/CategoryTree';
import ItemOptionsPane from '../components/ItemOptionsPane';
import AuctionList from '../components/AuctionList';
import SearchAuction from '../components/SearchAuction';
import MabinogiAuctionPage from '../components/MabiAuctionPage';

// ----------------------------------------
// CategoryTree 컴포넌트
// ----------------------------------------
describe('CategoryTree 컴포넌트', () => {
  const sampleNodes = [
    { code: 1, label: '검' },
    {
      group: '방어구',
      subcategories: [
        { code: 2, label: '투구' },
        { code: 3, label: '방패' },
      ],
    },
  ];

  it('리프 카테고리와 그룹 확장 동작을 올바르게 수행해야 한다', () => {
    const onCategoryClick = vi.fn();
    render(
      <CategoryTree
        nodes={sampleNodes}
        onCategoryClick={onCategoryClick}
        selectedCategoryCode={null}
      />
    );

    expect(screen.getByText('검')).toBeInTheDocument();
    expect(screen.getByText('방어구')).toBeInTheDocument();
    expect(screen.queryByText('투구')).not.toBeInTheDocument();
    expect(screen.queryByText('방패')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('방어구'));
    expect(screen.getByText('투구')).toBeInTheDocument();
    expect(screen.getByText('방패')).toBeInTheDocument();

    fireEvent.click(screen.getByText('투구'));
    expect(onCategoryClick).toHaveBeenCalledWith({ code: 2, label: '투구' });
  });
});

// ----------------------------------------
// ItemOptionsPane 컴포넌트
// ----------------------------------------
describe('ItemOptionsPane 컴포넌트', () => {
  it('경매 아이템의 상세 정보와 옵션을 올바르게 렌더링해야 한다', () => {
    // AuctionItem 타입에 누락된 속성을 추가합니다.
    const auctionItem = {
      item_count: 1,
      item_name: '테스트 소드',
      item_display_name: '테스트 소드',
      auction_price_per_unit: 10000,
      date_auction_expire: new Date('2025-12-31T23:59:59').toISOString(),
      item_option: [
        {
          option_type: '데미지',
          option_sub_type: '물리',
          option_desc: '공격력 증가',
          option_value: "10",
          option_value2: "20",
        },
      ],
    };

    render(<ItemOptionsPane item={auctionItem} />);
    
    expect(screen.getByText('테스트 소드')).toBeInTheDocument();
    expect(screen.getByText(/10,000 Gold/)).toBeInTheDocument();
  });
});

// ----------------------------------------
// AuctionList 컴포넌트
// ----------------------------------------
describe('AuctionList 컴포넌트', () => {
  it('로딩 및 에러 상태를 올바르게 렌더링해야 한다', () => {
    const onSelectItem = vi.fn();
    const { rerender } = render(
      <AuctionList auctionData={[]} loading={true} error={null} onSelectItem={onSelectItem} />
    );
    expect(screen.getByText('로딩 중...')).toBeInTheDocument();

    rerender(
      <AuctionList auctionData={[]} loading={false} error="테스트 에러" onSelectItem={onSelectItem} />
    );
    expect(screen.getByText('테스트 에러')).toBeInTheDocument();
  });
});

// ----------------------------------------
// SearchAuction 컴포넌트
// ----------------------------------------
describe('SearchAuction 컴포넌트', () => {
  it('빈 검색어 입력 시 에러 메시지가 설정되어야 한다', async () => {
    const onSearchComplete = vi.fn();
    const setLoading = vi.fn();
    const setError = vi.fn();
    
    render(
      <SearchAuction
        onSearchComplete={onSearchComplete}
        setLoading={setLoading}
        setError={setError}
        selectedCategory={null}
      />
    );
    
    fireEvent.click(screen.getByRole('button', { name: '검색' }));
    expect(setError).toHaveBeenCalledWith("검색어를 입력하세요.");
  });
});

// ----------------------------------------
// MabinogiAuctionPage 컴포넌트
// ----------------------------------------
// 초기 렌더링 시 "롱 소드" 아이템이 나열되도록 모킹 데이터 수정
vi.mock('../services/mabinogiApi', () => ({
  searchAuctionItems: vi.fn(() =>
    Promise.resolve({
      auction_item: [
        {
          item_count: 1,
          item_name: 'long_sword_1',
          item_display_name: '롱 소드',
          auction_price_per_unit: 4900,
          date_auction_expire: new Date('2025-12-31T23:59:59').toISOString(),
          item_option: [],
        },
        {
          item_count: 1,
          item_name: 'long_sword_2',
          item_display_name: '롱 소드',
          auction_price_per_unit: 19990,
          date_auction_expire: new Date('2025-12-31T23:59:59').toISOString(),
          item_option: [],
        },
      ],
    })
  ),
  fetchAuctionList: vi.fn(() =>
    Promise.resolve({
      auction_item: [
        {
          item_count: 1,
          item_name: 'long_sword_3',
          item_display_name: '롱 소드',
          auction_price_per_unit: 4498,
          date_auction_expire: new Date('2025-12-31T23:59:59').toISOString(),
          item_option: [],
        },
      ],
    })
  ),
}));

describe('MabinogiAuctionPage 컴포넌트', () => {
  it('초기 데이터 fetch 후 "롱 소드" 아이템이 렌더링되어야 한다', async () => {
    render(<MabinogiAuctionPage />);
    
    await waitFor(() => {
      const items = screen.getAllByText('롱 소드');
      expect(items.length).toBeGreaterThanOrEqual(2);
    });
  });
});
