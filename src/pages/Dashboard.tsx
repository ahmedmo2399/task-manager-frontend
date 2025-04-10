import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data.data);
      } catch (err) {
        console.error('Error fetching tasks', err);
        navigate('/'); 
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleLogout = async () => {
    await api.post('/logout');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleDelete = async (taskId: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${taskId}`);
        setTasks(tasks.filter(task => task.id !== taskId)); 
                alert('Task deleted successfully');
      } catch (err) {
        setError('An error occurred while deleting the task');
        console.error('Error:', err);
      }
    }
  };

  if (loading) return <p className="text-center text-lg text-gray-600">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Task Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
        >
          Log Out
        </button>
      </div>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {tasks.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No tasks yet</p>
      ) : (
        <ul className="space-y-6">
          {tasks.map((task) => (
            <li key={task.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
                <span className="text-sm text-gray-500">{task.status}</span>
              </div>
              <p className="text-gray-700 mb-4">{task.description}</p>

              <div className="flex space-x-4">
                <button
                  onClick={() => navigate(`/tasks/edit/${task.id}`)}
                  className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/tasks/create')}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
        >
          + Add New Task
        </button>
      </div>
    </div>
  );
}
