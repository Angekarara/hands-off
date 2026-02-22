import type { Item } from "./type";

export const items: Item[] = [
    {
      id: "1",
      name: "Bananas",
      owner: "Ariane",
      category: "Produce",
      expirationDate: "3/25/2026",
      isShared: true,
    },
    {
      id: "2",
      name: "Greek Yogurt",
      owner: "Kevin",
      category: "Dairy",
      expirationDate: "3/10/2026",
      isShared: false,
    },
    {
      id: "3",
      name: "Chicken Breast",
      owner: "Mike",
      category: "Protein",
      expirationDate: "2/28/2026",
      isShared: true,
    },
    {
      id: "4",
      name: "Orange Juice",
      owner: "Ines",
      category: "Drinks",
      expirationDate: "3/05/2026",
      isShared: false,
    },
  ];