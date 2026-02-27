import { PersonStanding, Timer } from "lucide-react";
import type { Item } from "../../type";

type ItemsCardProps = {
  items: Item[];
  onDelete: (id: string) => void;
  onEdit?: (item: Item) => void;
};

const ItemsCard = ({ items, onDelete, onEdit }: ItemsCardProps) => {
  if (items.length === 0) {
    return (
      <div className="mx-10 mt-10 rounded-lg border border-gray-300 p-6 text-center text-green-950">
        Nothing found here.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-6 mt-10 px-10">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-4 border border-gray-300 rounded-lg p-6"
        >
          <div className="flex justify-between">
            <span className="rounded-full px-6 bg-green-950 text-[#fdf5ea]">
              {item.category}
            </span>
            <span className="rounded-full px-6 bg-[#fdf5ea] text-green-950 border border-green-950">
              {item.shared ? "Shared" : "Private"}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{item.itemName}</h2>
          </div>
          <div className="flex gap-2">
            <PersonStanding />
            owner: <span className="font-bold">{item.owner}</span>
          </div>
          <div className="flex gap-2">
            <Timer />
            Exp: <span className="font-bold">{item.expirationDate}</span>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="text-[#fdf5ea] bg-green-950 py-1 px-12 rounded-md"
              onClick={() => onEdit && onEdit(item)}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="text-[#fdf5ea] bg-red-950 py-1 px-12 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsCard;
