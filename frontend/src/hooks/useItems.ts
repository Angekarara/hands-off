import { useCallback, useEffect, useState } from "react";
import type { Item } from "../type";

const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemsLoading, setIsItemsLoading] = useState(false);
  const fetchItems = useCallback(async () => {
    if (itemsLoading) return;
    setIsItemsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/items");
      if (!response.ok) {
        throw new Error("failed to fetch items");
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    } finally {
      setIsItemsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, isloading: itemsLoading, refetch: fetchItems };
};

export default useItems;
