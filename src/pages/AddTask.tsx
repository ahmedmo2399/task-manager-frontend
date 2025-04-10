import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface Category {
  id: number;
  name: string;
}

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [dueDate, setDueDate] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/categories')
      .then(res => {
        setCategories(res.data.data);
      })
      .catch(() => {
        setError('Error loading categories');
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !dueDate || !categoryId) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await api.post('/tasks', {
        title,
        description,
        status,
        category_id: categoryId,
        due_date: dueDate,
      });
      navigate('/dashboard');
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setValidationErrors(err.response.data.errors);
        setError('Error saving task');
      } else {
        setError('Unknown error occurred while saving the task');
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 animate__animated animate__fadeInUp">Add New Task</h2>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Task Title"
            className={`w-full p-4 border-2 ${validationErrors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {validationErrors.title && <p className="text-red-500 text-sm mt-1">{validationErrors.title[0]}</p>}
        </div>

        <div className="relative">
          <textarea
            placeholder="Task Description"
            className={`w-full p-4 border-2 ${validationErrors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {validationErrors.description && <p className="text-red-500 text-sm mt-1">{validationErrors.description[0]}</p>}
        </div>

        <div className="relative">
          <select
            className={`w-full p-4 border-2 ${validationErrors.status ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out`}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {validationErrors.status && <p className="text-red-500 text-sm mt-1">{validationErrors.status[0]}</p>}
        </div>

        <div className="relative">
          <select
            className={`w-full p-4 border-2 ${validationErrors.category_id ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out`}
            value={categoryId || ''}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {validationErrors.category_id && <p className="text-red-500 text-sm mt-1">{validationErrors.category_id[0]}</p>}
        </div>

        <div className="relative">
          <input
            type="date"
            className={`w-full p-4 border-2 ${validationErrors.due_date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out`}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          {validationErrors.due_date && <p className="text-red-500 text-sm mt-1">{validationErrors.due_date[0]}</p>}
        </div>

        <button
          type="submit"
          className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
