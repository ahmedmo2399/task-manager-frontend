import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import ProtectedRoute from './utils/ProtectedRoute'; 
import AddCategory from './pages/AddCategory';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from / based on token */}
        <Route path="/" element={
          token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks/create" element={<AddTask />} />
          <Route path="/tasks/edit/:id" element={<EditTask />} />
          <Route path="/categories/create" element={<AddCategory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
