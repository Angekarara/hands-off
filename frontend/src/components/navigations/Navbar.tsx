export const Navbar: React.FC = () => {
  return (
    <nav className="bg-green-950 flex justify-between px-10 rounded-b-md py-5 text-[#fdf5ea] mx-10">
      <div className="flex flex-col gap-0.5">
        <div className="text-3xl font-bold">Fridge Guard</div>
        <div>Collaborative Tracking</div>
      </div>
      <button className="bg-[#fdf5ea] rounded-full text-green-950 font-semibold px-6">
        + Add Item
      </button>
    </nav>
  );
};
