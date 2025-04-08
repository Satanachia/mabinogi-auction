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

  // 방어구 전용 옵션 (방어계열)
  defense?: number;          
  protection?: number;      
  magic_defense?: number;    
  magic_protection?: number; 
  proficiency?: number;        

  // 무기 전용 옵션 (공격계열)
  attack_min?: number;      
  attack_max?: number;        
  wound_rate_min?: number;     
  wound_rate_max?: number;     
  critical?: number;      
  balance?: number; 
  // 무기도 숙련(프로피션시) 사용 → proficiency 재사용 가능
  
  // 내구도 (공통: 방어구, 무기 모두 사용)
  durability_min?: number; 
  durability_max?: number;

  // 인챈트 (무기; 방어구는 "아이템 보호"로 표기)
  enchant_prefix?: string;         
  enchant_suffix?: string;    
  enchant_desc_prefix?: string;   
  enchant_desc_suffix?: string;  

  // 특별 개조 (둘 중 하나)
  special_upgrade_r?: number; 
  special_upgrade_s?: number; 

  // 세공 관련
  sewing_rank?: number;        
  sewing_option_1?: string;   
  sewing_option_2?: string;    
  sewing_option_3?: string;   

  // 에르그
  erg_level?: number;       

  // 세트 효과  
  set_effects?: { effect: string; value: number }[];

  // 피어싱 레벨 (무기 전용)
  piercing_level?: number;    
  piercing_increase?: number; 

  // 남은 전용 해제 가능 횟수
  remaining_exclusive?: number;  

  // 아이템 색상 – 각 파트별 RGB 값
  color_part_A?: { r: number; g: number; b: number };  
  color_part_B?: { r: number; g: number; b: number };  
  color_part_C?: { r: number; g: number; b: number };  
  color_part_D?: { r: number; g: number; b: number }; 
  color_part_E?: { r: number; g: number; b: number };  
  color_part_F?: { r: number; g: number; b: number };  
}

export interface ShopItem {
  item_display_name: string;
  item_count: number;
  image_url: string;
  item_option: {
    option_type: string;
    option_sub_type: "파트 A" | "파트 B" | "파트 C";
    option_value: string;
  }[];
}

export interface NpcShopTab {
  tab_name: string;
  item: ShopItem[];
}

export interface DropDownMenuProps {
  open: boolean;
  selectedServer: string;
  setSelectedServer: (server: string) => void;
  onSubmit: () => void;
}

export interface HeaderProps {
  onHornBugleFetch?: (server: string) => void;
}