import React, { useState, useCallback } from "react";
import type { Category, CategoryNode } from "../../../constants/categoryMap";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

interface CategoryTreeProps {
  nodes: CategoryNode[];
  onCategoryClick: (cat: Category) => void;
  selectedCategoryCode: number | null;
}

function CategoryTree({
  nodes,
  onCategoryClick,
  selectedCategoryCode,
}: CategoryTreeProps) {
  // key: group 문자열, value: boolean (true=열림, false=닫힘)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = useCallback((groupLabel: string) => {
    setExpanded((prev) => ({
      ...prev,
      [groupLabel]: !prev[groupLabel], // 토글
    }));
  }, []);

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
              {expanded[node.group] ? (
                <ChevronDownIcon className="h-4 w-4 text-blue-600 mr-1" />
              ) : (
                <ChevronRightIcon className="h-4 w-4 text-blue-600 mr-1" />
              )}
              <span className="font-semibold">{node.group}</span>
            </div>
            <div className={`ml-4 mt-1 overflow-hidden transition-all duration-200 ease-in-out ${
              expanded[node.group] ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <CategoryTree
                nodes={node.subcategories}
                onCategoryClick={onCategoryClick}
                selectedCategoryCode={selectedCategoryCode}
              />
            </div>
          </li>
        )
      )}
    </ul>
  );
}

export default React.memo(CategoryTree);