// parseAuctionItem.ts (예: src/utils/parseAuctionItem.ts)
import { AuctionItem } from "../type/AuctionItem"; 

export function parseAuctionItem(item: AuctionItem): AuctionItem {
  // 세트 효과 등 배열 형태가 필요한 필드는 초기화
  // (이미 존재할 수도 있으니 없을 경우만 초기화)
  if (!item.set_effects) {
    item.set_effects = [];
  }

  // item_option이 없다면 그대로 반환
  if (!item.item_option) return item;

  // item_option 배열을 순회하며, AuctionItem의 추가 필드에 할당
  for (const opt of item.item_option) {
    const { option_type, option_sub_type, option_value, option_value2, option_desc } = opt;

    switch (option_type) {
      // -----------------------
      // 방어구 전용 옵션
      // -----------------------
      case "방어력":
        item.defense = Number(option_value);
        break;
      case "보호":
        item.protection = Number(option_value);
        break;
      case "마법 방어력":
        item.magic_defense = Number(option_value);
        break;
      case "마법 보호":
        item.magic_protection = Number(option_value);
        break;
      case "숙련":
        item.proficiency = Number(option_value);
        break;
      case "내구력":
        item.durability_min = Number(option_value);
        if (option_value2) {
          item.durability_max = Number(option_value2);
        } else {
          // 만약 option_value2가 없다면 최대값 = 최소값
          item.durability_max = item.durability_min;
        }
        break;

      // -----------------------
      // 무기 전용 옵션 (공격계열)
      // -----------------------
      case "공격":
        item.attack_min = Number(option_value);
        if (option_value2) {
          item.attack_max = Number(option_value2);
        } else {
          item.attack_max = item.attack_min;
        }
        break;
      case "부상률":
        // 예: "35%" ~ "60%" → '%' 제거 후 숫자 변환
        {
          const min = parseFloat(option_value.replace("%", ""));
          item.wound_rate_min = min;
          if (option_value2) {
            const max = parseFloat(option_value2.replace("%", ""));
            item.wound_rate_max = max;
          } else {
            item.wound_rate_max = min;
          }
        }
        break;
      case "크리티컬":
        // 예: "75%" → 75
        {
          const val = parseFloat(option_value.replace("%", ""));
          item.critical = val;
        }
        break;
      case "밸런스":
        // 예: "64%" → 64
        {
          const val = parseFloat(option_value.replace("%", ""));
          item.balance = val;
        }
        break;

      // -----------------------
      // 인챈트 / 아이템 보호
      // -----------------------
      case "인챈트":
        // 접두 or 접미
        if (option_sub_type === "접두") {
          item.enchant_prefix = option_value; 
          if (option_desc) {
            item.enchant_desc_prefix = option_desc; 
          }
        } else if (option_sub_type === "접미") {
          item.enchant_suffix = option_value;
          if (option_desc) {
            item.enchant_desc_suffix = option_desc;
          }
        }
        break;
      case "아이템 보호":
        // 방어구에 "인챈트 실패" 문구가 들어가지만,  
        // 굳이 필드가 필요 없다면 무시해도 됨
        break;

      // -----------------------
      // 특별 개조
      // -----------------------
      case "특별 개조":
        // sub_type = "R" or "S"
        if (option_sub_type === "R") {
          item.special_upgrade_r = Number(option_value);
        } else if (option_sub_type === "S") {
          item.special_upgrade_s = Number(option_value);
        }
        break;

      // -----------------------
      // 세공 관련
      // -----------------------
      case "세공 랭크":
        item.sewing_rank = Number(option_value);
        break;
      case "세공 옵션":
        // sub_type = "1", "2", "3"
        if (option_sub_type === "1") {
          item.sewing_option_1 = option_value;
        } else if (option_sub_type === "2") {
          item.sewing_option_2 = option_value;
        } else if (option_sub_type === "3") {
          item.sewing_option_3 = option_value;
        }
        break;

      // -----------------------
      // 에르그
      // -----------------------
      case "에르그":
        // 예: option_sub_type = "S", option_value="50", option_value2="50"
        {
          const val = Number(option_value);
          item.erg_level = val;
        }
        break;

      // -----------------------
      // 세트 효과
      // -----------------------
      case "세트 효과":
        // ex) option_value="크리티컬 대미지 증가", option_value2="4"
        if (!item.set_effects) {
          item.set_effects = [];
        }
        {
          const effectName = option_value;   // ex: "크리티컬 대미지 증가"
          const effectValue = option_value2 ? Number(option_value2) : 0;
          item.set_effects.push({ effect: effectName, value: effectValue });
        }
        break;

      // -----------------------
      // 남은 전용 해제 가능 횟수
      // -----------------------
      case "남은 전용 해제 가능 횟수":
        item.remaining_exclusive = Number(option_value);
        break;

      // -----------------------
      // 피어싱 레벨 (무기 전용)
      // -----------------------
      case "피어싱 레벨":
        // 예: option_value="4", option_value2="+3"
        // item.piercing_level=4, item.piercing_increase=3
        item.piercing_level = Number(option_value);
        if (option_value2) {
          // "+3" → 3
          item.piercing_increase = Number(option_value2.replace("+", ""));
        }
        break;

      // -----------------------
      // 아이템 색상 (파트 A~F)
      // -----------------------
      case "아이템 색상": {
        if (!option_value) break;
        if (!option_sub_type) break;
        const parts = option_value.split(",");
        if (parts.length < 3) break;
        const r = Number(parts[0]);
        const g = Number(parts[1]);
        const b = Number(parts[2]);
        
        switch (option_sub_type) {
          case "파트 A":
            item.color_part_A = { r, g, b };
            break;
          case "파트 B":
            item.color_part_B = { r, g, b };
            break;
          case "파트 C":
            item.color_part_C = { r, g, b };
            break;
          case "파트 D":
            item.color_part_D = { r, g, b };
            break;
          case "파트 E":
            item.color_part_E = { r, g, b };
            break;
          case "파트 F":
            item.color_part_F = { r, g, b };
            break;
          default:
            break;
        }
        break;
      }
    }
  }
  return item;
}
