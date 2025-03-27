import { useRef, useState, useEffect } from "react";
interface HornBugleModalProps {
  messages: { character_name: string; message: string; date_send: string }[];
  onClose: () => void;
}

export default function HornBugleModal({
  messages,
  onClose,
}: HornBugleModalProps) {
  const MODAL_WIDTH = 384;
  const MODAL_HEIGHT = 200;

  const modalRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(() => ({
    x: (window.innerWidth - MODAL_WIDTH) / 2,
    y: (window.innerHeight - MODAL_HEIGHT) / 2,
  }));
  const offset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const dragThreshold = 2;

  const limitWithinWindow = (x: number, y: number) => ({
    x: Math.max(0, Math.min(x, window.innerWidth - 400)),
    y: Math.max(0, Math.min(y, window.innerHeight - 200)),
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = Math.abs(e.clientX - lastMousePos.current.x);
      const dy = Math.abs(e.clientY - lastMousePos.current.y);

      if (!isDragging.current && (dx > dragThreshold || dy > dragThreshold)) {
        isDragging.current = true;
      }

      if (isDragging.current) {
        const next = {
          x: e.clientX - offset.current.x,
          y: e.clientY - offset.current.y,
        };
        setPosition(limitWithinWindow(next.x, next.y));
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = (e: MouseEvent) => {
      offset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      isDragging.current = false;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const dragHeader = modalRef.current?.querySelector(".drag-handle") as HTMLElement | null;
    dragHeader?.addEventListener("mousedown", handleMouseDown);

    return () => {
      dragHeader?.removeEventListener("mousedown", handleMouseDown);
    };
  }, [position]);

  return (
    <div
      ref={modalRef}
      className="fixed w-96 bg-white shadow-lg border border-slate-300 rounded-lg z-50 transition-all duration-200"
      style={{ top: position.y, left: position.x, userSelect: "none" }}
    >
      <div className="drag-handle flex justify-between items-center bg-blue-600 text-white px-4 py-2 rounded-t cursor-move">
        <span>📣 거뿔 내역</span>
        <button onClick={onClose} className="text-white hover:text-gray-200">✕</button>
      </div>
      <div className="p-4 max-h-[400px] overflow-y-auto space-y-2">
        {messages.length === 0 ? (
          <div className="text-sm text-gray-500">데이터가 없습니다.</div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className="text-sm border-b border-slate-300 pb-2">
              <strong>{msg.character_name}</strong>: {msg.message}
              <div className="text-xs text-gray-500">{new Date(msg.date_send).toLocaleString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}