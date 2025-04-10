import { useEffect, useState, useRef } from "react";

interface RemainingTimeProps {
  nextUpdateTime: string | null;
  onTimeReached: () => void;
}

const RemainingTime: React.FC<RemainingTimeProps> = ({ nextUpdateTime, onTimeReached }) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
        if (prev <= 1) {
          onTimeReached();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextUpdateTime, onTimeReached]);

  if (!nextUpdateTime) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="text-sm text-gray-500">
      ⏱ 다음 상점 갱신까지 {minutes}분 {seconds.toString().padStart(2, "0")}초
    </div>
  );
};

export default RemainingTime;
