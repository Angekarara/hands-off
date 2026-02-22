import { Search } from "lucide-react";
import Input from "./shared/Input";
import { categories } from "../category";
import type { Category, ItemsFilterProps } from "../type";

const ItemsFilter = ({
  searchTerm,
  onSearchTermChange,
  selectedCategory,
  onSelectCategory,
}: ItemsFilterProps) => {
  return (
    <div className="flex justify-between mx-10">
      <div className="flex items-center gap-2">
        <Input
          placeholder="search items..."
          icon={Search}
          className="py-2 pr-44"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
        />
      </div>
      <div className="flex justify-between py-5 gap-4">
        {categories.map((category: Category) => {
          const isSelected = category === selectedCategory;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectCategory(category)}
              className={`rounded-full py-2 px-6 font-semibold border ${
                isSelected
                  ? "bg-green-950 text-[#fdf5ea] border-green-950"
                  : "bg-[#fdf5ea] text-green-950 border-green-950"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ItemsFilter;
