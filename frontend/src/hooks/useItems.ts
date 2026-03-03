import { useCallback, useEffect, useState } from "react";
import type { Item } from "../type";
import { apiClient } from "../api/client";

const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemsLoading, setIsItemsLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    setIsItemsLoading(true);
    try {
      const response = await apiClient.get<Item[]>("/items");
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch items", error);
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
