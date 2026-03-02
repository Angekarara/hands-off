import { useState } from "react";
import Form from "../components/forms/Form";
import ItemsFilter from "../components/ItemsFilter";
import Modal from "../components/shared/Modal";
import ItemsCard from "../components/cards/ItemsCard";
import ItemDetails from "../components/ItemDetails";
import type { Category, Item } from "../type";
import useItems from "../hooks/useItems";
import axios from "axios";
import { apiUrl } from "../constants/apiUrl";

const ItemsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [viewingItem, setViewingItem] = useState<Item | null>(null);
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

  const handleDelete = async (id: string, onDelete: () => void) => {
    try {
      await axios.delete(`${apiUrl}/delete/${id}`);
      onDelete();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Failed to delete item");
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setViewingItem(null);
  };

  const handleViewDetails = (item: Item) => {
    setViewingItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <ItemsFilter
        searchTerm={searchItem}
        onSearchTermChange={setSearchItem}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          editingItem
            ? "Edit Item"
            : viewingItem
              ? "Item Details"
              : "Add New Item"
        }
      >
        {editingItem || !viewingItem ? (
          <Form
            onSuccess={() => {
              refetch();
              handleCloseModal();
            }}
            editItem={editingItem || undefined}
          />
        ) : (
          <ItemDetails item={viewingItem} />
        )}
      </Modal>
      {isloading ? (
        <div className="text-center text-gray-500">Loading items...</div>
      ) : (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mx-10 w-fit bg-green-950 text-[#fdf5ea] px-6 py-2 rounded-md"
          >
            Add New Item
          </button>
          <ItemsCard
            items={filteredItems}
            onDelete={(id) => {
              handleDelete(id, () => {
                refetch();
              });
            }}
            onEdit={handleEdit}
            onView={handleViewDetails}
          />
        </>
      )}
    </div>
  );
};

export default ItemsPage;
