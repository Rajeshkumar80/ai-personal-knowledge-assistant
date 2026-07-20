/**
 * Minimal toast notification system.
 * Dispatches custom DOM events consumed by <ToastContainer>.
 */
const toast = {
  success: (message) => dispatch("success", message),
  error:   (message) => dispatch("error",   message),
  info:    (message) => dispatch("info",    message),
  warning: (message) => dispatch("warning", message),
};

function dispatch(type, message) {
  window.dispatchEvent(
    new CustomEvent("app:toast", { detail: { type, message, id: Date.now() } })
  );
}

export default toast;
