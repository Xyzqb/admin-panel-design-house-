import { toast } from "react-toastify";

export const showSuccess = (message) => {
  toast.success(message);
};

export const showError = (message) => {
  toast.error(message);
};

export const showInfo = (message) => {
  toast.info(message);
};

export const showWarning = (message) => {
  toast.warning(message);
};

/* ✅ FIXED spelling */
export const showLoginSuccess = () => {
  toast.success("Login successful 🎉");
};

export const showLoginError = () => {
  toast.error("Invalid username or password ❌");
};

export const showUploadSuccess = () => {
  toast.success("Uploaded successfully 🎉");
};

export const showStatusUpdated = () =>
  toast.info("status updated");

export const showDeleted = () =>
  toast.success("data deleted successfully 🗑️");

export const addSuccessfully = () =>{
  toast.success("data added successfully");
}