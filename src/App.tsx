// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import ProtectedRoute from './utils/ProtectedRoute'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks/create" element={<AddTask />} />
          <Route path="/tasks/edit/:id" element={<EditTask />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
