"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormInput, FormSelect } from "@/components/ui/form";
import { DatePicker } from "@/components/ui/date-picker";
import { X, Filter, Search } from "lucide-react";

export interface FilterField {
  key: string;
  label: string;
  type: "text" | "select" | "date" | "number";
  placeholder?: string;
  options?: { value: string; label: string }[];
  gridCols?: 1 | 2; // For responsive grid
}

export interface FilterConfig {
  title: string;
  fields: FilterField[];
  defaultValues?: Record<string, string>;
}

interface GenericFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
  onClear: () => void;
  config: FilterConfig;
  appliedFilters?: Record<string, string>;
}

export function GenericFilter({
  isOpen,
  onClose,
  onApply,
  onClear,
  config,
  appliedFilters = {},
}: GenericFilterProps) {
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Initialize filters with default values or applied filters
  useEffect(() => {
    const initialFilters: Record<string, string> = {};

    config.fields.forEach((field) => {
      initialFilters[field.key] =
        appliedFilters[field.key] || config.defaultValues?.[field.key] || "";
    });

    setFilters(initialFilters);
  }, [config.fields, appliedFilters, config.defaultValues]);

  const handleInputChange = (fieldKey: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [fieldKey]: value,
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters: Record<string, string> = {};
    config.fields.forEach((field) => {
      clearedFilters[field.key] = "";
    });
    setFilters(clearedFilters);
    onClear();
  };

  const renderField = (field: FilterField) => {
    const commonProps = {
      value: filters[field.key] || "",
      onChange: (value: string) => handleInputChange(field.key, value),
      placeholder: field.placeholder,
    };

    switch (field.type) {
      case "select":
        return <FormSelect {...commonProps} options={field.options || []} />;
      case "date":
        return <DatePicker {...commonProps} />;
      case "number":
        return <FormInput {...commonProps} type="number" />;
      default:
        return <FormInput {...commonProps} type="text" />;
    }
  };

  const renderFieldGroup = (fields: FilterField[]) => {
    return fields.map((field) => (
      <div
        key={field.key}
        className={field.gridCols === 2 ? "md:col-span-2" : ""}
      >
        <FormField label={field.label}>{renderField(field)}</FormField>
      </div>
    ));
  };

  const groupFieldsByRow = () => {
    const rows: FilterField[][] = [];
    let currentRow: FilterField[] = [];

    config.fields.forEach((field) => {
      if (field.gridCols === 2) {
        // Full width field - start new row
        if (currentRow.length > 0) {
          rows.push(currentRow);
          currentRow = [];
        }
        rows.push([field]);
      } else {
        // Half width field
        currentRow.push(field);
        if (currentRow.length === 2) {
          rows.push(currentRow);
          currentRow = [];
        }
      }
    });

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  };

  if (!isOpen) return null;

  const fieldRows = groupFieldsByRow();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 bg-black border border-spotify-light-gray">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-spotify-green" />
            <CardTitle className="text-xl text-white">{config.title}</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-spotify-text-gray hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {fieldRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid gap-4 ${
                row.length === 1 && row[0].gridCols === 2
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {renderFieldGroup(row)}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-spotify-light-gray">
            <Button
              variant="ghost"
              onClick={handleClear}
              className="text-spotify-text-gray hover:text-white"
            >
              Clear All
            </Button>
            <Button variant="spotifySecondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="spotify"
              onClick={handleApply}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
