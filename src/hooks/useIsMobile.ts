import { useState, useEffect } from "react";

export default function useIsMobile(breakpoint = 768) {
    // 현재 화면이 모바일인지 판별 (768px 미만이면 모바일)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);
  
    return isMobile;
};