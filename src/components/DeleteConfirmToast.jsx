import { toast } from "react-toastify";

const DeleteConfirmToast = ({ onDelete }) => {
  return (
    <div>
      <p className="font-semibold mb-3">
        Are you sure you want to delete?
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            onDelete();
            toast.dismiss();
          }}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          Delete
        </button>

        <button
          onClick={() => toast.dismiss()}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default DeleteConfirmToast;