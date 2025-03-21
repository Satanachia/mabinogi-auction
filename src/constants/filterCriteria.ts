export interface FilterCriteria {
  minAttack?: number;
  maxAttack?: number;
  minWoundRate?: number;
  maxWoundRate?: number;
  minCritical?: number;
  maxCritical?: number;
  minBalance?: number;
  maxBalance?: number;
  minDurability?: number;
  maxDurability?: number;
  enchantPrefix?: string;
  enchantSuffix?: string;
  specialUpgradeR?: number;
  specialUpgradeS?: number;
  sewingRank?: number;
  sewingOption1?: string;
  sewingOption2?: string;
  sewingOption3?: string;
  minErg?: number;
  maxErg?: number;
  setEffect?: string;
  remainingExclusive?: number;
  defense?: number;
  protection?: number;
  magicDefense?: number;
  magicProtection?: number;
  
  // 색상 필터: 각 파트별 R, G, B 채널의 값 배열
  colorPartAR?: number[];
  colorPartAG?: number[];
  colorPartAB?: number[];
  
  colorPartBR?: number[];
  colorPartBG?: number[];
  colorPartBB?: number[];
  
  colorPartCR?: number[];
  colorPartCG?: number[];
  colorPartCB?: number[];
  
  colorPartDR?: number[];
  colorPartDG?: number[];
  colorPartDB?: number[];
  
  colorPartER?: number[];
  colorPartEG?: number[];
  colorPartEB?: number[];
  
  colorPartFR?: number[];
  colorPartFG?: number[];
  colorPartFB?: number[];
}
