export interface Category {
  code: number;
  label: string;
}

export interface CategoryGroup {
  group: string;
  subcategories: CategoryNode[];
}

export type CategoryNode = Category | CategoryGroup;

export const categoryMap: CategoryNode[] = [
  {
    group: "무기/장비",
    subcategories: [
      {
        group: "근접 무기",
        subcategories: [
          { code: 1, label: "검" },
          { code: 11, label: "너클" },
          { code: 13, label: "도끼" },
          { code: 15, label: "둔기" },
          { code: 17, label: "랜스" },
          { code: 46, label: "양손 장비" },
          { code: 74, label: "한손 장비" },
          { code: 75, label: "핸들" },
        ],
      },
      {
        group: "원거리 무기",
        subcategories: [
          { code: 16, label: "듀얼건" },
          { code: 36, label: "석궁" },
          { code: 37, label: "수리검" },
          { code: 42, label: "아틀라틀" },
          { code: 66, label: "체인 블레이드" },
          { code: 77, label: "활" },
        ],
      },
      {
        group: "마법 및 특수",
        subcategories: [
          { code: 38, label: "스태프" },
          { code: 41, label: "실린더" },
          { code: 43, label: "악기" },
          { code: 54, label: "원드" },
          { code: 21, label: "마도서" },
          { code: 51, label: "오브" },
        ],
      },
      {
        group: "생활/마리오네트",
        subcategories: [
          { code: 35, label: "생활 도구" },
          { code: 22, label: "마리오네트" },
        ],
      },
    ]
  },
  {
    group: "방어장비",
    subcategories: [
      { code: 64, label: "천옷" },
      { code: 2, label: "경갑옷" },
      { code: 62, label: "중갑옷" },
      { code: 28, label: "모자/가발" },
      { code: 29, label: "방패" },
      { code: 40, label: "신발" },
      { code: 58, label: "장갑" },
      { code: 9, label: "날개" },
      { code: 8, label: "꼬리" },
      { code: 18, label: "로브" }, 
      { code: 45, label: "액세서리" },
      { code: 47, label: "얼굴 장식" },
    ],
  },
  {
    group: "소모품/기타",
    subcategories: [
      {
        group: "소모품",
        subcategories: [
          { code: 4, label: "기타 소모품" },
          { code: 50, label: "염색 앰플" },
          { code: 53, label: "원거리 소모품" },
          { code: 55, label: "음식" },
          { code: 71, label: "포션" },
        ],
      },
      {
        group: "강화/인챈트",
        subcategories: [
          { code: 0, label: "개조석" },
          { code: 57, label: "인챈트 스크롤" },
          { code: 23, label: "마법가루" },
          { code: 33, label: "불타래" },
        ],
      },
      {
        group: "생활",
        subcategories: [
          { code: 14, label: "도면" },
          { code: 27, label: "매직 크래프트" },
          { code: 52, label: "옷본" },
          { code: 59, label: "제련/블랙스미스" },
          { code: 65, label: "천옷/방직" },
          { code: 78, label: "힐웬 공학" },
        ],
      },
      {
        group: "마기그래프",
        subcategories: [
          { code: 19, label: "마기그래프" },
          { code: 20, label: "마기그래프 도안" },
        ],
      },
      {
        group: "펫",
        subcategories: [
          { code: 32, label: "분양 메달" },
          { code: 72, label: "피니 펫" },
          { code: 73, label: "핀즈비즈" },
        ],
      },
      {
        group: "기타",
        subcategories: [
          { code: 3, label: "기타" },
          { code: 5, label: "기타 스크롤" },
          { code: 6, label: "기타 장비" },
          { code: 7, label: "기타 재료" },
          { code: 10, label: "낭만농장/달빛섬" },
          { code: 12, label: "던전 통행증" },
          { code: 24, label: "마비노벨" },
          { code: 25, label: "마족 스크롤" },
          { code: 26, label: "말풍선 스티커" },
          { code: 30, label: "변신 메달" },
          { code: 31, label: "보석" },
          { code: 34, label: "뷰티 쿠폰" },
          { code: 38, label: "스케치" },
          { code: 44, label: "알반 훈련석" },
          { code: 48, label: "에이도스" },
          { code: 49, label: "에코스톤" },
          { code: 56, label: "의자/사물" },
          { code: 60, label: "제스처" },
          { code: 61, label: "주머니" },
          { code: 63, label: "책" },
          { code: 67, label: "토템" },
          { code: 68, label: "팔리아스 유물" },
          { code: 69, label: "퍼퓸" },
          { code: 70, label: "페이지" },
          { code: 76, label: "허브" },
        ],
      },
    ],
  },
];