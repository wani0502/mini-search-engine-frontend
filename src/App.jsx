import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Upload from "./pages/Upload";
import Documents from "./pages/Documents";
import PublicDocuments from "./pages/PublicDocuments";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import EditDocument from "./pages/EditDocument";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      {/* public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* protected */}
      <Route
        path="/dashboard"
        element={
         
            <Dashboard />
       
        }
      />
     
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        }
      />

      <Route
        path="/search"
        element={
          <ProtectedRoute>
           <Search/>
          </ProtectedRoute>
        }
      />

        <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
           </ProtectedRoute>
        }
      />

      <Route
        path="/documents"
        element={
          <ProtectedRoute>
            <Documents />
          </ProtectedRoute>
        }
      />
      <Route path="/documents/:id/edit" element={<EditDocument />} />
      <Route path="/public" element={<PublicDocuments />} />
    </Routes>
  );
}

export default App;
