"use client";

import { GenericFilter } from "./generic-filter";
import { userFilterConfig } from "@/config/filter-configs";

interface UserFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
  onClear: () => void;
  appliedFilters?: Record<string, string>;
}

export function UserFilter({
  isOpen,
  onClose,
  onApply,
  onClear,
  appliedFilters = {},
}: UserFilterProps) {
  return (
    <GenericFilter
      isOpen={isOpen}
      onClose={onClose}
      onApply={onApply}
      onClear={onClear}
      config={userFilterConfig}
      appliedFilters={appliedFilters}
    />
  );
}
