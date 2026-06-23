import { toast } from "react-toastify";

export const confirmToast = (message, onConfirm) => {
  toast(
    ({ closeToast }) => (
      <div>
        <p className="text-sm font-medium text-gray-800 mb-3">{message}</p>
        <div className="flex gap-2">
          <button
            onClick={() => { onConfirm(); closeToast(); }}
            className="flex-1 bg-red-500 text-white text-xs py-1.5 rounded hover:bg-red-600"
          >
            Yes, Delete
          </button>
          <button
            onClick={closeToast}
            className="flex-1 bg-gray-200 text-gray-700 text-xs py-1.5 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    {
      autoClose: true,
      closeOnClick: false,
      draggable: false,
      closeButton: false,
    }
  );
};
