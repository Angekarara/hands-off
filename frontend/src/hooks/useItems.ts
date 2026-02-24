import { useCallback, useEffect, useState } from "react";
import type { Item } from "../type";
import axios from "axios";

const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemsLoading, setIsItemsLoading] = useState(false);
  const fetchItems = useCallback(async () => {
    if (itemsLoading) return;
    setIsItemsLoading(true);
    try {
      const response = await axios.get<Item[]>("http://localhost:8080/items");
      setItems(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to fetch items");
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
