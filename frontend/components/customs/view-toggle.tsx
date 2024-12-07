"use client";

import { LayoutGrid, List } from "lucide-react";
import { Toggle } from "../ui/toggle";

interface Props {
  isListView: boolean;
  setIsListView: (list: boolean) => void;
}

export function ViewToggle({ isListView, setIsListView }: Props) {
  return (
    <Toggle
      variant="outline"
      pressed={isListView}
      onPressedChange={() => setIsListView(!isListView)}
    >
      <List
        className={`h-[1.2rem] w-[1.2rem] opacity-0 scale-0 transition-all ${
          isListView && "scale-100 opacity-100"
        }`}
      />
      <LayoutGrid
        className={`absolute h-[1.2rem] w-[1.2rem] opacity-0 scale-0 transition-all ${
          !isListView && "scale-100 opacity-100"
        }`}
      />
    </Toggle>
  );
}
