"use client";

import { GenericFilter } from "./generic-filter";
import { albumFilterConfig } from "@/config/filter-configs";

interface AlbumFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
  onClear: () => void;
  appliedFilters?: Record<string, string>;
}

export function AlbumFilter({
  isOpen,
  onClose,
  onApply,
  onClear,
  appliedFilters = {},
}: AlbumFilterProps) {
  return (
    <GenericFilter
      isOpen={isOpen}
      onClose={onClose}
      onApply={onApply}
      onClear={onClear}
      config={albumFilterConfig}
      appliedFilters={appliedFilters}
    />
  );
}
