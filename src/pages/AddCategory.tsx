import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CreateCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/categories', { name: categoryName });
      navigate('/dashboard'); 
    } catch (err) {
      setError('Failed to create category');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create Category</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleCreateCategory}>
        <div className="mb-4">
          <label htmlFor="categoryName" className="block text-gray-700 mb-2">Category Name</label>
          <input
            id="categoryName"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Create Category
          </button>
        </div>
      </form>
    </div>
  );
}
