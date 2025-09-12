"use client";

import { GenericFilter } from "./generic-filter";
import { artistFilterConfig } from "@/config/filter-configs";

interface ArtistFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
  onClear: () => void;
  appliedFilters?: Record<string, string>;
}

export function ArtistFilter({
  isOpen,
  onClose,
  onApply,
  onClear,
  appliedFilters = {},
}: ArtistFilterProps) {
  return (
    <GenericFilter
      isOpen={isOpen}
      onClose={onClose}
      onApply={onApply}
      onClear={onClear}
      config={artistFilterConfig}
      appliedFilters={appliedFilters}
    />
  );
}
