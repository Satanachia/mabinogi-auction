import { useState } from "react";
import type { Category, CategoryNode } from "../constants/categoryMap";

interface CategoryTreeProps {
  nodes: CategoryNode[];
  onCategoryClick: (cat: Category) => void;
  selectedCategoryCode: number | null;
}

export default function CategoryTree({
  nodes,
  onCategoryClick,
  selectedCategoryCode,
}: CategoryTreeProps) {
  // key: group 문자열, value: boolean (true=열림, false=닫힘)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (groupLabel: string) => {
    setExpanded((prev) => ({
      ...prev,
      [groupLabel]: !prev[groupLabel], // 토글
    }));
  };

  return (
    <ul className="space-y-1">
      {nodes.map((node, idx) => 
        "code" in node ? (
          // 리프 카테고리
          <li
            key={node.code}
            className={`cursor-pointer hover:underline ${
              selectedCategoryCode === node.code ? "text-blue-600 font-semibold" : ""
            }`}
            onClick={() => onCategoryClick(node)}
          >
            {node.label}
          </li>
        ) : (
          // 그룹(대분류)
          <li key={idx}>
            <div
              onClick={() => toggleExpand(node.group)}
              className="cursor-pointer inline-flex items-center select-none"
            >
              <span className="mr-1">
                {expanded[node.group] ? "▼" : "▶"}
              </span>
              <span className="font-semibold">{node.group}</span>
            </div>
            {expanded[node.group] && (
              <div className="ml-4 mt-1">
                <CategoryTree
                  nodes={node.subcategories}
                  onCategoryClick={onCategoryClick}
                  selectedCategoryCode={selectedCategoryCode}
                />
              </div>
            )}
          </li>
        )
      )}
    </ul>
  );
}