import { PersonStanding, Timer } from "lucide-react";

const ItemsCard: React.FC = () => {
  return (
    <div className="bg-[#fdf5ea] grid grid-cols-4 gap-6 mt-10">
      <div className="flex flex-col gap-4 border border-gray-300 rounded-lg p-6 ml-10">
        <div className="flex justify-between">
          <span className="rounded-full px-6 bg-green-950 text-[#fdf5ea]">
            Produce
          </span>
          <span className="rounded-full px-6 bg-[#fdf5ea] text-green-950 border border-green-950">
            Shared
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Bananas</h2>
        </div>
        <div className="flex gap-2">
          <PersonStanding />
          owner: <span className="font-bold">Ariane</span>
        </div>
        <div className="flex gap-2">
          <Timer />
          Exp: <span className="font-bold">3/25/2026</span>
        </div>
        <div className="flex justify-between">
          <button className="text-[#fdf5ea] bg-green-950 py-1 px-12 rounded-md">
            Edit
          </button>
          <button className="text-[#fdf5ea] bg-red-950 py-1 px-12 rounded-md">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemsCard;
