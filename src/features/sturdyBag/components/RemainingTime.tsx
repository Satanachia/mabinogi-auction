import React, { useEffect, useState, useRef } from "react";

interface RemainingTimeProps {
  nextUpdateTime: string | null;
  onRefresh : () => void;
}

const RemainingTime: React.FC<RemainingTimeProps> = React.memo(({ nextUpdateTime, onRefresh  }) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!nextUpdateTime) return;

    const target = new Date(nextUpdateTime).getTime();
    const calculateRemaining = () => {
      const now = Date.now();
      return Math.max(0, Math.floor((target - now) / 1000));
    };

    setSecondsLeft(calculateRemaining());

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev - 1;
        if (next <= 0 && !hasTriggered.current) {
          hasTriggered.current = true;
          onRefresh ();
        }
        return next > 0 ? next : 0;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current!);
      hasTriggered.current = false;
    };
  }, [nextUpdateTime, onRefresh ]);

  if (!nextUpdateTime) return null;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="text-sm text-gray-500">
      ⏱ 다음 상점 갱신까지 {minutes}분 {seconds.toString().padStart(2, "0")}초
    </div>
  );
});

export default RemainingTime;
