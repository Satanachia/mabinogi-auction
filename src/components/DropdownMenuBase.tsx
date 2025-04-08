import { ReactNode } from "react";

interface DropdownMenuBaseProps {
  open: boolean;
  children: ReactNode;
}

export default function DropdownMenuBase({ open, children }: DropdownMenuBaseProps) {
  return (
    <div
      className={
        `absolute right-0 mt-2 w-60 bg-white border border-slate-300/50 rounded shadow-lg z-50 p-4 space-y-2
        transition-all duration-200 ease-in-out
        ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`
      }
    >
      {children}
    </div>
  );
}