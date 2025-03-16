import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

describe('CategoryTree Component', () => {

  it('리프 카테고리와 그룹 확장 동작을 올바르게 수행해야 한다', () => {
    const onCategoryClick = vi.fn();

    // "검" (리프 카테고리)가 표시되어야 함
    expect(screen.getByText('검')).toBeInTheDocument();
    // "방어구" 그룹은 표시되지만 하위 항목은 아직 표시되지 않음
    expect(screen.getByText('방어구')).toBeInTheDocument();
    expect(screen.queryByText('투구')).not.toBeInTheDocument();
    expect(screen.queryByText('방패')).not.toBeInTheDocument();

    // 그룹 "방어구" 클릭하여 확장
    fireEvent.click(screen.getByText('방어구'));
    // 하위 카테고리들이 표시되어야 함
    expect(screen.getByText('투구')).toBeInTheDocument();
    expect(screen.getByText('방패')).toBeInTheDocument();

    // 하위 항목 "투구" 클릭 시 콜백 호출 확인
    fireEvent.click(screen.getByText('투구'));
    expect(onCategoryClick).toHaveBeenCalledWith({ code: 2, label: '투구' });
  });
});

describe('ItemOptionsPane Component', () => {
  it('경매 아이템의 상세 정보와 옵션을 올바르게 렌더링해야 한다', () => {

    expect(screen.getByText('롱 소드')).toBeInTheDocument();
    expect(screen.getByText('옵션:')).toBeInTheDocument();
    expect(screen.getByText(/Damage/)).toBeInTheDocument();
    expect(screen.getByText(/Increase attack power/)).toBeInTheDocument();
  });
});

describe('AuctionList Component', () => {
  it('페이지네이션 및 아이템 선택 기능이 올바르게 동작해야 한다', () => {

    // 첫 페이지에 7개 아이템이 표시되어야 함
    for (let i = 0; i < 7; i++) {
      expect(screen.getByText(`Item ${i}`)).toBeInTheDocument();
    }
    // 두번째 페이지 아이템은 아직 보이지 않아야 함
    expect(screen.queryByText('Item 7')).not.toBeInTheDocument();

    // 페이지 버튼 "2" 클릭
    fireEvent.click(screen.getByText('2'));
    // 이제 Item 7, 8, 9가 표시되어야 함
    expect(screen.getByText('Item 7')).toBeInTheDocument();
    expect(screen.getByText('Item 8')).toBeInTheDocument();
    expect(screen.getByText('Item 9')).toBeInTheDocument();

  });

  it('로딩 및 에러 상태를 올바르게 렌더링해야 한다', () => {

    expect(screen.getByText('로딩 중...')).toBeInTheDocument();

    expect(screen.getByText('Test error')).toBeInTheDocument();
  });
});

describe('SearchAuction Component', () => {
  it('빈 검색어 입력 시 에러 메시지가 설정되어야 한다', async () => {
    const setError = vi.fn();
    
    // 검색어 없이 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: '검색' }));
    
    expect(setError).toHaveBeenCalledWith("검색어를 입력하세요.");
  });
});

describe('MabinogiAuctionPage Component', () => {
  it('초기 데이터 fetch 후 경매 아이템이 렌더링되어야 한다', async () => {
    
    // 초기 로딩 후 "롱 소드" 텍스트가 표시되어야 함
    await waitFor(() => expect(screen.getByText('롱 소드')).toBeInTheDocument());
  });
});