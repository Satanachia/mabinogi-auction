export interface FilterCriteria {
  // 공격, 부상률, 크리티컬, 밸런스, 내구력 등은 "최소/최대" 범위가 있을 수 있음
  minAttack?: number;
  maxAttack?: number;
  minMagicAttack?: number;
  maxMagicAttack?: number;
  minWoundRate?: number;  // 부상률
  maxWoundRate?: number;
  minCritical?: number;
  maxCritical?: number;
  minBalance?: number;
  maxBalance?: number;
  minDurability?: number;
  maxDurability?: number;
  sewingRank?: number;


  colorPartARMin?: number;
  colorPartARMax?: number;
  colorPartAGMin?: number;
  colorPartAGMax?: number;
  colorPartABMin?: number;
  colorPartABMax?: number;
  colorPartBRMin?: number;
  colorPartBRMax?: number;
  colorPartBGMin?: number;
  colorPartBGMax?: number;
  colorPartBBMin?: number;
  colorPartBBMax?: number;
  colorPartCRMin?: number;
  colorPartCRMax?: number;
  colorPartCGMin?: number;
  colorPartCGMax?: number;
  colorPartCBMin?: number;
  colorPartCBMax?: number;
  colorPartDRMin?: number;
  colorPartDRMax?: number;
  colorPartDGMin?: number;
  colorPartDGMax?: number;
  colorPartDBMin?: number;
  colorPartDBMax?: number;
  colorPartERMin?: number;
  colorPartERMax?: number;
  colorPartEGMin?: number;
  colorPartEGMax?: number;
  colorPartEBMin?: number;
  colorPartEBMax?: number;
  colorPartFRMin?: number;
  colorPartFRMax?: number;
  colorPartFGMin?: number;
  colorPartFGMax?: number;
  colorPartFBMin?: number;
  colorPartFBMax?: number;

  // 인챈트, 세공 옵션, 세트 효과, 에르그, 특별개조, 남은 전용 해제 횟수 등
  // 문자열 포함 검색, 특정 숫자 이상/이하 등
  enchantPrefix?: string;
  enchantSuffix?: string;
  sewingOption1?: string;
  sewingOption2?: string;
  sewingOption3?: string;
  minErg?: number;
  maxErg?: number;
  specialUpgradeR?: number;
  specialUpgradeS?: number;
  setEffect?: string;
  remainingExclusive?: number;  // 남은 전용 해제 횟수

  // 기타 필요한 옵션들을 계속 추가
}
