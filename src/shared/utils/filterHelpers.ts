// src/components/filterHelpers.ts
import type { AuctionItem } from "../type/AuctionItem"; 
import type { FilterCriteria } from "../constants/filterCriteria";

export function matchFilter(item: AuctionItem, filters: FilterCriteria): boolean {
  // 공격력 필터
  if (filters.minAttack !== undefined) {
    if (item.attack_min === undefined || item.attack_min < filters.minAttack) return false;
  }
  if (filters.maxAttack !== undefined) {
    if (item.attack_max === undefined || item.attack_max > filters.maxAttack) return false;
  }

  // 부상률 필터
  if (filters.minWoundRate !== undefined) {
    if (item.wound_rate_min === undefined || item.wound_rate_min < filters.minWoundRate) return false;
  }
  if (filters.maxWoundRate !== undefined) {
    if (item.wound_rate_max === undefined || item.wound_rate_max > filters.maxWoundRate) return false;
  }

  // 크리티컬 필터
  if (filters.minCritical !== undefined) {
    if (item.critical === undefined || item.critical < filters.minCritical) return false;
  }
  if (filters.maxCritical !== undefined) {
    if (item.critical === undefined || item.critical > filters.maxCritical) return false;
  }

  // 밸런스 필터
  if (filters.minBalance !== undefined) {
    if (item.balance === undefined || item.balance < filters.minBalance) return false;
  }
  if (filters.maxBalance !== undefined) {
    if (item.balance === undefined || item.balance > filters.maxBalance) return false;
  }

  // 내구도 필터
  if (filters.minDurability !== undefined) {
    if (item.durability_min === undefined || item.durability_min < filters.minDurability) return false;
  }
  if (filters.maxDurability !== undefined) {
    if (item.durability_max === undefined || item.durability_max > filters.maxDurability) return false;
  }

  // 인챈트 필터
  if (filters.enchantPrefix) {
    if (!item.enchant_prefix || !item.enchant_prefix.includes(filters.enchantPrefix)) return false;
  }
  if (filters.enchantSuffix) {
    if (!item.enchant_suffix || !item.enchant_suffix.includes(filters.enchantSuffix)) return false;
  }

  // 에르그 필터
  if (filters.minErg !== undefined) {
    if (item.erg_level === undefined || item.erg_level < filters.minErg) return false;
  }
  if (filters.maxErg !== undefined) {
    if (item.erg_level === undefined || item.erg_level > filters.maxErg) return false;
  }

  // 특별 개조 필터
  if (filters.specialUpgradeR !== undefined) {
    if (item.special_upgrade_r === undefined || item.special_upgrade_r !== filters.specialUpgradeR) return false;
  }
  if (filters.specialUpgradeS !== undefined) {
    if (item.special_upgrade_s === undefined || item.special_upgrade_s !== filters.specialUpgradeS) return false;
  }

  // 세공 랭크 필터
  if (filters.sewingRank !== undefined) {
    if (item.sewing_rank === undefined || item.sewing_rank < filters.sewingRank) return false;
  }

  // 세공 옵션 필터
  if (filters.sewingOption1) {
    if (!item.sewing_option_1 || !item.sewing_option_1.includes(filters.sewingOption1)) return false;
  }
  if (filters.sewingOption2) {
    if (!item.sewing_option_2 || !item.sewing_option_2.includes(filters.sewingOption2)) return false;
  }
  if (filters.sewingOption3) {
    if (!item.sewing_option_3 || !item.sewing_option_3.includes(filters.sewingOption3)) return false;
  }

  // 세트 효과 필터
  if (filters.setEffect) {
    if (!item.set_effects || !item.set_effects.some(e => e.effect.includes(filters.setEffect!))) {
      return false;
    }
  }

  // 남은 전용 해제 횟수 필터
  if (filters.remainingExclusive !== undefined) {
    if (item.remaining_exclusive === undefined || item.remaining_exclusive !== filters.remainingExclusive) return false;
  }

  // 파트별 색상
  // 파트 A
  if (filters.colorPartAR && filters.colorPartAR.length > 0) {
    if (!item.color_part_A || !filters.colorPartAR.includes(item.color_part_A.r)) return false;
  }
  if (filters.colorPartAG && filters.colorPartAG.length > 0) {
    if (!item.color_part_A || !filters.colorPartAG.includes(item.color_part_A.g)) return false;
  }
  if (filters.colorPartAB && filters.colorPartAB.length > 0) {
    if (!item.color_part_A || !filters.colorPartAB.includes(item.color_part_A.b)) return false;
  }
  // 파트 B
  if (filters.colorPartBR && filters.colorPartBR.length > 0) {
    if (!item.color_part_B || !filters.colorPartBR.includes(item.color_part_B.r)) return false;
  }
  if (filters.colorPartBG && filters.colorPartBG.length > 0) {
    if (!item.color_part_B || !filters.colorPartBG.includes(item.color_part_B.g)) return false;
  }
  if (filters.colorPartBB && filters.colorPartBB.length > 0) {
    if (!item.color_part_B || !filters.colorPartBB.includes(item.color_part_B.b)) return false;
  }
  // 파트 C
  if (filters.colorPartCR && filters.colorPartCR.length > 0) {
    if (!item.color_part_C || !filters.colorPartCR.includes(item.color_part_C.r)) return false;
  }
  if (filters.colorPartCG && filters.colorPartCG.length > 0) {
    if (!item.color_part_C || !filters.colorPartCG.includes(item.color_part_C.g)) return false;
  }
  if (filters.colorPartCB && filters.colorPartCB.length > 0) {
    if (!item.color_part_C || !filters.colorPartCB.includes(item.color_part_C.b)) return false;
  }
  // 파트 D
  if (filters.colorPartDR && filters.colorPartDR.length > 0) {
    if (!item.color_part_D || !filters.colorPartDR.includes(item.color_part_D.r)) return false;
  }
  if (filters.colorPartDG && filters.colorPartDG.length > 0) {
    if (!item.color_part_D || !filters.colorPartDG.includes(item.color_part_D.g)) return false;
  }
  if (filters.colorPartDB && filters.colorPartDB.length > 0) {
    if (!item.color_part_D || !filters.colorPartDB.includes(item.color_part_D.b)) return false;
  }
  // 파트 E
  if (filters.colorPartER && filters.colorPartER.length > 0) {
    if (!item.color_part_E || !filters.colorPartER.includes(item.color_part_E.r)) return false;
  }
  if (filters.colorPartEG && filters.colorPartEG.length > 0) {
    if (!item.color_part_E || !filters.colorPartEG.includes(item.color_part_E.g)) return false;
  }
  if (filters.colorPartEB && filters.colorPartEB.length > 0) {
    if (!item.color_part_E || !filters.colorPartEB.includes(item.color_part_E.b)) return false;
  }
  // 파트 F
  if (filters.colorPartFR && filters.colorPartFR.length > 0) {
    if (!item.color_part_F || !filters.colorPartFR.includes(item.color_part_F.r)) return false;
  }
  if (filters.colorPartFG && filters.colorPartFG.length > 0) {
    if (!item.color_part_F || !filters.colorPartFG.includes(item.color_part_F.g)) return false;
  }
  if (filters.colorPartFB && filters.colorPartFB.length > 0) {
    if (!item.color_part_F || !filters.colorPartFB.includes(item.color_part_F.b)) return false;
  }


  return true;
}
