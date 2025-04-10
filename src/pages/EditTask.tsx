import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

interface Category {
  id: number;
  name: string;
}

interface Task {
  title: string;
  description: string;
  status: string;
  category_id: number;
  due_date: string;
}

export default function EditTask() {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/categories')
      .then(res => {
        setCategories(res.data.data);
      })
      .catch(() => setError('Error loading categories'));

    if (id) {
      api.get(`/tasks/${id}`)
        .then(res => {
          setTask(res.data.data);
        })
        .catch(() => setError('Error loading task'));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!task?.title || !task?.description || !task?.due_date || !task?.category_id) {
      setError('Please fill out all fields');
      return;
    }

    try {
      await api.put(`/tasks/${id}`, {
        title: task.title,
        description: task.description,
        status: task.status,
        category_id: task.category_id,
        due_date: task.due_date,
      });

      setSuccessMessage('Changes saved successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setValidationErrors(err.response.data.errors);
        setError('Error saving changes');
      } else {
        setError('Unknown error occurred while saving changes');
      }
    }
  };

  if (!task) return <p className="text-center">Loading task...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-lg">
      <h2 className="text-xl font-bold mb-6">Edit Task</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Task Title"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${validationErrors.title ? 'border-red-500' : ''}`}
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
          {validationErrors.title && <p className="text-red-500 text-sm">{validationErrors.title[0]}</p>}
        </div>

        <div>
          <textarea
            placeholder="Task Description"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${validationErrors.description ? 'border-red-500' : ''}`}
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            required
          />
          {validationErrors.description && <p className="text-red-500 text-sm">{validationErrors.description[0]}</p>}
        </div>

        <div>
          <select
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${validationErrors.status ? 'border-red-500' : ''}`}
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Done</option>
          </select>
          {validationErrors.status && <p className="text-red-500 text-sm">{validationErrors.status[0]}</p>}
        </div>

        <div>
          <select
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${validationErrors.category_id ? 'border-red-500' : ''}`}
            value={task.category_id || ''}
            onChange={(e) => setTask({ ...task, category_id: Number(e.target.value) })}
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {validationErrors.category_id && <p className="text-red-500 text-sm">{validationErrors.category_id[0]}</p>}
        </div>

        <div>
          <input
            type="date"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${validationErrors.due_date ? 'border-red-500' : ''}`}
            value={task.due_date}
            onChange={(e) => setTask({ ...task, due_date: e.target.value })}
            required
          />
          {validationErrors.due_date && <p className="text-red-500 text-sm">{validationErrors.due_date[0]}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
