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
  itemName: string;
  owner: string;
  category: Exclude<Category, "All">;
  expirationDate: string;
  shared: boolean;
  notes: string;
};
export type FormValues = {
  itemName: string;
  category: Category;
  expirationDate: string;
  shared: boolean;
  notes: string;
};

export type ItemsFilterProps = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
};

export interface ItemDetailsProps {
  item: Item;
}
