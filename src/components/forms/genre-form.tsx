"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormInput, FormTextarea } from "@/components/ui/form";
import { Music, Save, X } from "lucide-react";

interface Genre {
  id: string;
  name: string;
  description?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface GenreFormProps {
  genre?: Genre | null;
  onSubmit: (genre: Omit<Genre, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
  loading?: boolean;
  error?: string;
}

const defaultColors = [
  "#1DB954", // Spotify Green
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#96CEB4", // Mint
  "#FFEAA7", // Yellow
  "#DDA0DD", // Plum
  "#98D8C8", // Aqua
  "#F7DC6F", // Gold
  "#BB8FCE", // Lavender
];

export function GenreForm({
  genre,
  onSubmit,
  onCancel,
  loading = false,
  error,
}: GenreFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: defaultColors[0],
  });

  useEffect(() => {
    if (genre) {
      setFormData({
        name: genre.name || "",
        description: genre.description || "",
        color: genre.color || defaultColors[0],
      });
    } else {
      setFormData({
        name: "",
        description: "",
        color: defaultColors[0],
      });
    }
  }, [genre]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
      color: formData.color,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-black border-0 shadow-lg">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: formData.color }}
          >
            <Music className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Genre Name */}
          <FormField label="Genre Name" required>
            <FormInput
              placeholder="Enter genre name"
              value={formData.name}
              onChange={(value) => handleInputChange("name", value)}
            />
          </FormField>

          {/* Description */}
          <FormField label="Description">
            <FormTextarea
              placeholder="Enter genre description"
              value={formData.description}
              onChange={(value) => handleInputChange("description", value)}
              rows={3}
            />
          </FormField>

          {/* Color Selection */}
          <FormField label="Color">
            <div className="flex flex-wrap gap-2">
              {defaultColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleInputChange("color", color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    formData.color === color
                      ? "border-white scale-110"
                      : "border-spotify-text-gray hover:border-white hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-spotify-text-gray">Custom:</span>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => handleInputChange("color", e.target.value)}
                className="w-8 h-8 rounded border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-spotify-green transition-all duration-200"
              />
            </div>
          </FormField>

          {/* Preview */}
          <FormField label="Preview">
            <div className="p-3 bg-black rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: formData.color }}
                >
                  <Music className="h-3 w-3 text-white" />
                </div>
                <div>
                  <div className="font-medium text-white">
                    {formData.name || "Genre Name"}
                  </div>
                  {formData.description && (
                    <div className="text-xs text-spotify-text-gray">
                      {formData.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </FormField>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="flex-1 text-spotify-text-gray hover:text-white hover:bg-white/10"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.name.trim()}
              className="flex-1 bg-spotify-green hover:bg-spotify-green-hover text-black font-medium"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {genre ? "Update Genre" : "Create Genre"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
