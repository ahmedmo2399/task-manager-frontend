import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi"; 

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string; 
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let url = "/tasks?";

        if (statusFilter !== "all") {
          url += `status=${statusFilter}&`;
        }

        url = url.endsWith("&") ? url.slice(0, -1) : url;

        const response = await api.get(url);
        setTasks(response.data.data);
      } catch (err) {
        console.error("Error fetching tasks", err);
        setError("An error occurred while fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [statusFilter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handleLogout = async () => {
    await api.post("/logout");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = async (taskId: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${taskId}`);
        setTasks(tasks.filter((task) => task.id !== taskId));
        alert("Task deleted successfully");
      } catch (err) {
        setError("An error occurred while deleting the task");
        console.error("Error:", err);
      }
    }
  };

  if (loading) return <p className="text-center text-lg text-gray-600">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Task Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 flex items-center gap-2"
        >
          <span>Log Out</span>
        </button>
      </div>

      <div className="mb-6 md:mb-8 flex justify-between items-center">
        
        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border border-gray-300 transition-all duration-200 ease-in-out"
          >
            <option value="all">All Tasks</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No tasks found</p>
      ) : (
        <ul className="space-y-6">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full 
                    ${task.status === "Completed" ? "bg-green-500 text-white" :
                    task.status === "In Progress" ? "bg-yellow-500 text-white" :
                    task.status === "Pending" ? "bg-red-500 text-white" :
                    "bg-gray-300 text-gray-700"}`}
                >
                  {task.status}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{task.description}</p>
              
              <p className="text-sm text-gray-500">Due Date: {new Date(task.due_date).toLocaleDateString()}</p>

              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() => navigate(`/tasks/edit/${task.id}`)}
                  className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 flex items-center gap-2"
                >
                  <FiEdit />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 flex items-center gap-2"
                >
                  <FiTrash2 />
                  <span>Delete</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex justify-center gap-8">
        <button
          onClick={() => navigate("/tasks/create")}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 flex items-center gap-2"
        >
          <span>+ Add New Task</span>
        </button>

        <button
          onClick={() => navigate("/categories/create")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition-all duration-300 flex items-center gap-2"
        >
          <span>+ Add Category</span>
        </button>
      </div>
    </div>
  );
}
