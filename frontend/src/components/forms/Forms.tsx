import { useForm } from "react-hook-form";
import { categories } from "../../category";
import Input from "../shared/Input";
import type { Category, FormValues } from "../../type";

const Forms: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      itemName: "",
      Owner: "",
      category: "All",
      expirationDate: "",
      isShared: false,
      notes: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <form className="p-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Item Name"
        type="text"
        required
        placeholder="e.g., Almond Milk, Leftover Pizza"
        error={errors.itemName?.message}
        {...register("itemName", {
          required: "Item name is required",
          minLength: {
            value: 2,
            message: "Item name must be at least 2 characters",
          },
        })}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Owner (You)"
          type="text"
          required
          placeholder="Your Name"
          error={errors.Owner?.message}
          {...register("Owner", {
            required: "Owner name is required",
            minLength: {
              value: 2,
              message: "Owner name must be at least 2 characters",
            },
          })}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            className="border border-gray-300 w-full rounded-lg hover:border-green-950 py-2 px-3 bg-white"
            {...register("category")}
          >
            {categories.map((c: Category) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Input
        label="Expiration Date"
        type="date"
        required
        error={errors.expirationDate?.message}
        {...register("expirationDate", {
          required: "Expiration date is required",
        })}
      />

      <div className="flex items-center space-x-3 py-2">
        <input
          type="checkbox"
          id="isShared"
          className="h-5 w-5 rounded border-gray-300 text-green-950"
          {...register("isShared")}
        />
        <label htmlFor="isShared" className="text-sm font-medium text-gray-700">
          Open to sharing? (Shared items are free for all!)
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes / Warnings
        </label>
        <textarea
          className="border border-gray-300 w-full rounded-lg hover:border-green-950 py-2 px-3"
          rows={2}
          placeholder="Hands off, this is for my 3pm slump!"
          {...register("notes")}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 text-sm font-medium text-[#fdf5ea] bg-green-950 rounded-lg hover:bg-green-900"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Forms;
