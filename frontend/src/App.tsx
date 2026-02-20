import Forms from "./components/forms/Forms";
import ItemsFilter from "./components/ItemsFilter";
import { Navbar } from "./components/navigations/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-[#fdf5ea]">
      <Navbar />
      <ItemsFilter />
      <Forms />
    </div>
  );
}

export default App;
