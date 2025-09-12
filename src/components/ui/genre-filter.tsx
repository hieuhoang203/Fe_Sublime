"use client";

import { GenericFilter } from "./generic-filter";
import { genreFilterConfig } from "@/config/filter-configs";

interface GenreFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
  onClear: () => void;
  appliedFilters?: Record<string, string>;
}

export function GenreFilter({
  isOpen,
  onClose,
  onApply,
  onClear,
  appliedFilters = {},
}: GenreFilterProps) {
  return (
    <GenericFilter
      isOpen={isOpen}
      onClose={onClose}
      onApply={onApply}
      onClear={onClear}
      config={genreFilterConfig}
      appliedFilters={appliedFilters}
    />
  );
}
