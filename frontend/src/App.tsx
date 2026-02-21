import { useState } from "react";
import Forms from "./components/forms/Forms";
import ItemsFilter from "./components/ItemsFilter";
import { Navbar } from "./components/navigations/Navbar";
import Modal from "./components/shared/Modal";
import ItemsCard from "./components/cards/ItemsCard";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#fdf5ea]">
      <Navbar setIsModalOpen={setIsModalOpen} />
      <ItemsFilter />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Item"
      >
        <Forms />
      </Modal>
      <ItemsCard />
    </div>
  );
}

export default App;
