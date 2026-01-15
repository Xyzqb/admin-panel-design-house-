import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppToast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
    />
  );
};

export default AppToast;
