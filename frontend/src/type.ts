export type Category =
  | "All"
  | "Dairy"
  | "Produce"
  | "Protein"
  | "Drinks"
  | "Leftovers"
  | "Other";

export type Item = {
  id: string;
  name: string;
  owner: string;
  category: Exclude<Category, "All">;
  expirationDate: string;
  isShared: boolean;
};
export type FormValues = {
  itemName: string;
  Owner: string;
  category: Category;
  expirationDate: string;
  isShared: boolean;
  notes: string;
};

export type ItemsFilterProps = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
};
