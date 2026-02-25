import { useState } from "react";
import Form from "./components/forms/Form";
import ItemsFilter from "./components/ItemsFilter";
import { Navbar } from "./components/navigations/Navbar";
import Modal from "./components/shared/Modal";
import ItemsCard from "./components/cards/ItemsCard";
import type { Category, Item } from "./type";
import useItems from "./hooks/useItems";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { items, isloading, refetch } = useItems();

  const normalizedSearch = searchItem.trim().toLowerCase();
  const filteredItems = items.filter((item) => {
    const matchesSearch = normalizedSearch
      ? item.itemName.toLowerCase().includes(normalizedSearch)
      : true;
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingItem(null);
  };

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
        onClose={handleCloseModal}
        title={isEditing ? "Edit Item" : "Add New Item"}
      >
        <Form
          onSuccess={() => {
            refetch();
            setIsModalOpen(false);
          }}
          editItem={editingItem || undefined}
          isEditing={isEditing}
        />
      </Modal>
      {isloading ? (
        <div className="mx-10 mt-10 rounded-lg border border-gray-300 p-6 text-center text-green-950">
          Loading items...
        </div>
      ) : (
        <ItemsCard items={filteredItems} onDelete={refetch} onEdit={handleEdit} />
      )}
    </div>
  );
}

export default App;
