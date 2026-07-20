import { ThemeProvider }    from "./context/ThemeContext";
import { DocumentProvider } from "./context/DocumentContext";
import { ChatProvider }     from "./context/ChatContext";
import { ToastContainer }   from "./components/common/ToastContainer";
import AppRoutes            from "./routes/AppRoutes";

/**
 * Root component.
 * Wraps the entire app in context providers and mounts the global toast layer.
 */
function App() {
  return (
    <ThemeProvider>
      <DocumentProvider>
        <ChatProvider>
          <AppRoutes />
          <ToastContainer />
        </ChatProvider>
      </DocumentProvider>
    </ThemeProvider>
  );
}

export default App;
