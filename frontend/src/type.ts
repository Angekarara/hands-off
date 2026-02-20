export type Category =
  | "All"
  | "Dairy"
  | "Produce"
  | "Protein"
  | "Drinks"
  | "Leftovers"
  | "Other";
export type FormValues = {
  itemName: string;
  Owner: string;
  category: string;
  expirationDate: string;
  isShared: boolean;
  notes: string;
};
