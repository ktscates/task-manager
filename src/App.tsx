import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext"; // Import the TaskProvider
import TaskManager from "./pages/TaskManager";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./pages/Auth";
import { ToastProvider } from "./context/ToastContext";

const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <TaskProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/auth" replace />} />
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <TaskManager />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </TaskProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
