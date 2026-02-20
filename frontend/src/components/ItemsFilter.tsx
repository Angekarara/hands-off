import { Search } from "lucide-react";
import Input from "./shared/Input";
import { categories } from "../category";
import type { Category } from "../type";

const ItemsFilter: React.FC = () => {
  return (
    <div className="flex justify-between mx-10">
      <div className="flex items-center gap-2">
        <Input
          placeholder="search items..."
          icon={Search}
          className="py-2 pr-44"
        />
      </div>
      <div className="flex justify-between py-5 gap-4">
        {categories.map((category: Category) => {
          return (
            <button
              key={category}
              className="bg-green-950 text-[#fdf5ea] rounded-full py-2 px-6 font-semibold"
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
