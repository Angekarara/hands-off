import { useState } from "react";
import Forms from "./components/forms/Forms";
import ItemsFilter from "./components/ItemsFilter";
import { Navbar } from "./components/navigations/Navbar";
import Modal from "./components/shared/Modal";
import ItemsCard from "./components/cards/ItemsCard";
import type { Category } from "./type";
import useItems from "./hooks/useItems";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const { items, isloading } = useItems();

  const normalizedSearch = searchItem.trim().toLowerCase();
  const filteredItems = items.filter((item) => {
    const matchesSearch = normalizedSearch
      ? item.name.toLowerCase().includes(normalizedSearch)
      : true;
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#fdf5ea]">
      <Navbar setIsModalOpen={setIsModalOpen} />
      <ItemsFilter
        searchTerm={searchItem}
        onSearchTermChange={setSearchItem}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Item"
      >
        <Forms />
      </Modal>
      {isloading ? (
        <div className="mx-10 mt-10 rounded-lg border border-gray-300 p-6 text-center text-green-950">
          Loading items...
        </div>
      ) : (
        <ItemsCard items={filteredItems} />
      )}
    </div>
  );
}

export default App;
