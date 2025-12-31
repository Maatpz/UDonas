"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const CATEGORY_OPTIONS = [
  { value: "vestido", label: "Vestido" },
  { value: "saia", label: "Saia" },
  { value: "blusa", label: "Blusa" },
  { value: "body", label: "Body" },
  { value: "calcinha", label: "Calcinha" },
  { value: "conjunto", label: "Conjunto" },
  { value: "calca", label: "Calça" },
  { value: "short", label: "Short" },
  { value: "macaquinho", label: "Macaquinho" },
  { value: "cropped", label: "Cropped" },
];

interface Product {
  category: string | null;
}

interface CategoryFilterProps {
  selectedCategory: string;
  products: Product[];
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  selectedCategory,
  products,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <Label className="text-sm font-medium mb-2 block">
          Filtrar por Categoria
        </Label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange("all")}
            className={
              selectedCategory === "all"
                ? "bg-purple-600 hover:bg-purple-700"
                : ""
            }
          >
            Todos ({products.length})
          </Button>

          {/* {CATEGORY_OPTIONS.map((option) => {
            const count = products.filter((p) => p.category === option.value).length
            return (
              <Button
                key={option.value}
                variant={selectedCategory === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(option.value)}
                className={selectedCategory === option.value ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                {option.label} ({count})
              </Button>
            )
          })}
          <Button
            variant={selectedCategory === "uncategorized" ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange("uncategorized")}
            className={selectedCategory === "uncategorized" ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            Sem Categoria ({products.filter((p) => !p.category).length})
          </Button> */}

          {CATEGORY_OPTIONS.map((option) => {
            const count = products.filter(
              (p) => p.category?.toLowerCase() === option.value
            ).length;

            if (count === 0) return null;

            return (
              <Button
                key={option.value}
                variant={
                  selectedCategory === option.value ? "default" : "outline"
                }
                size="sm"
                onClick={() => onCategoryChange(option.value)}
                className={
                  selectedCategory === option.value
                    ? "bg-purple-600 hover:bg-purple-700"
                    : ""
                }
              >
                {option.label} ({count})
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export { CATEGORY_OPTIONS };
