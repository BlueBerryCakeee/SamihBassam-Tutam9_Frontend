import { useState, useEffect } from 'react';
import TodoItem from '../components/TodoItem';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpinner, FaClipboardList } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../services/apiConfig';
import { Link } from 'react-router-dom'; // Add this import

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get('/api/todos');
        setTodos(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch todos');
        setLoading(false);
        console.error(err);
      }
    };

    if (user) {
      fetchTodos();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      await api.patch(`/api/todos/${id}`, { completed: !completed });
      setTodos(todos.map(todo => 
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <FaSpinner className="text-blue-400 text-3xl" />
      </motion.div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
      <p className="text-red-600">{error}</p>
      <button 
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );

  return (
    <motion.div 
      className="max-w-lg mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <FaClipboardList className="text-blue-400 text-xl mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">
              {user && `${user.username}'s Tasks`}
            </h1>
          </div>
          
          {todos.length === 0 ? (
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No tasks found. Let's add some!</p>
              <motion.div 
                className="inline-block mt-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Replace <a> with <Link> component */}
                <Link to="/add" className="bg-blue-400 text-white px-6 py-2 rounded-md hover:bg-blue-500 inline-block">
                  Add Your First Task
                </Link>
              </motion.div>
            </div>
          ) : (
            <AnimatePresence>
              <div className="divide-y">
                {todos.map((todo) => (
                  <TodoItem 
                    key={todo._id} 
                    todo={todo} 
                    onDelete={handleDelete} 
                    onToggleComplete={handleToggleComplete}
                  />
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </div>
      
      {todos.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            {todos.filter(todo => todo.completed).length} of {todos.length} tasks completed
          </p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div 
              className="bg-blue-400 h-1.5 rounded-full"
              style={{ width: `${(todos.filter(todo => todo.completed).length / todos.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
