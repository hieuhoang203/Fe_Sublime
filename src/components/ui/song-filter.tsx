"use client";

import { GenericFilter } from "./generic-filter";
import { songFilterConfig } from "@/config/filter-configs";

interface SongFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
  onClear: () => void;
  appliedFilters?: Record<string, string>;
}

export function SongFilter({
  isOpen,
  onClose,
  onApply,
  onClear,
  appliedFilters = {},
}: SongFilterProps) {
  return (
    <GenericFilter
      isOpen={isOpen}
      onClose={onClose}
      onApply={onApply}
      onClear={onClear}
      config={songFilterConfig}
      appliedFilters={appliedFilters}
    />
  );
}
