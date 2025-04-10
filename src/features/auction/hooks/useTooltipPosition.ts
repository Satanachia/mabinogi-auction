import { useLayoutEffect, RefObject } from "react";
import type { AuctionItem } from "../../../type/AuctionItem";

export default function useTooltipPosition(
  tooltipRef: RefObject<HTMLDivElement | null>,
  mousePos: { x: number; y: number },
  hoveredItem: AuctionItem | null,
  isMobile: boolean,
  offset = 10,
) {
  // 마우스 이벤트로 raw 좌표 저장 → 렌더링 후 useLayoutEffect에서 툴팁 크기 측정 → 보정
  useLayoutEffect(() => {
    if (!isMobile && hoveredItem && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();

      let finalX = mousePos.x + offset;
      let finalY = mousePos.y + offset;

      // 화면 오른쪽 경계를 넘어가면 왼쪽으로
      if (finalX + rect.width > window.innerWidth) {
        finalX = mousePos.x - offset - rect.width;
      }
      // 화면 하단 경계를 넘어가면 위로
      if (finalY + rect.height > window.innerHeight) {
        finalY = mousePos.y - offset - rect.height;
      }

      // 화면 왼쪽 경계 보정 (툴팁이 음수 좌표로 넘어가지 않도록)
      if (finalX < 0) finalX = 0;
      // 화면 상단 경계 보정 (툴팁이 음수 좌표로 넘어가지 않도록)
      if (finalY < 0) finalY = 0;

      if (tooltipRef.current) {
        tooltipRef.current.style.setProperty('--tooltip-x', `${finalX}px`);
        tooltipRef.current.style.setProperty('--tooltip-y', `${finalY}px`);
      }
    }
  }, [hoveredItem, mousePos, isMobile, tooltipRef, offset]);
}