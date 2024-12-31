import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

// Notification class to handle toasts
class Notification {
  // Display success toast
  static success(message, options = {}) {
    toast.success(message, {
      position: "top-right",
      className: "custom-notification",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      ...options, // Allow overriding the default options
    });
  }

  // Display error toast
  static error(message, options = {}) {
    toast.error(message, {
      position: "top-right",
      className: "custom-notification",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      ...options, // Allow overriding the default options
    });
  }

  // Display info toast
  static info(message, options = {}) {
    toast.info(message, {
      position: "top-right",
      className: "custom-notification",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      ...options, // Allow overriding the default options
    });
  }

  // Display warning toast
  static warning(message, options = {}) {
    toast.warning(message, {
      position: "top-right",
      autoClose: 5000,
      className: "custom-notification",
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      ...options, // Allow overriding the default options
    });
  }

  // Display custom toast
  static custom(type, message, options = {}) {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,

      progress: undefined,
      theme: "dark",
      transition: Bounce,
      ...options, // Allow overriding the default options
    });
  }
}

export default Notification;
