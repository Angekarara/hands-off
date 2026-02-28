import type { ItemDetailsProps } from "../type";


const ItemDetails = ({ item }: ItemDetailsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-lg font-bold text-green-950">Item Name</label>
        <p className="font-medium">{item.itemName}</p>
      </div>

      <div>
        <label className="text-lg font-bold text-green-950">Owner</label>
        <p className="font-medium">{item.owner}</p>
      </div>

      <div>
        <label className="text-lg font-bold text-green-950">Category</label>
        <p className="font-medium">{item.category}</p>
      </div>

      <div>
        <label className="text-lg font-bold text-green-950">
          Expiration Date
        </label>
        <p className="font-medium">{item.expirationDate}</p>
      </div>

      <div>
        <label className="text-lg font-bold text-green-950">Shared</label>
        <p className="font-medium">{item.shared ? "Yes" : "No"}</p>
      </div>

      <div>
        <label className="text-lg font-bold text-green-950">Notes</label>
        <p className="font-medium">{item.notes || "No notes available"}</p>
      </div>
    </div>
  );
}

export default ItemDetails;
