import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaTimes, FaSave, FaCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../services/apiConfig';

export default function AddTodo() {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title cannot be empty');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/api/todos', 
        { 
          title,
          dueDate: dueDate || null
        }
      );
      navigate('/');
    } catch (err) {
      setError('Failed to add task. Please try again.');
      setIsSubmitting(false);
      console.error(err);
    }
  };

  return (
    <motion.div 
      className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center mb-8">
        <FaPlus className="text-blue-400 text-2xl mr-2" />
        <h1 className="text-3xl font-bold text-gray-800">New Task</h1>
      </div>
      
      {error && (
        <motion.div 
          className="bg-red-50 border-l-4 border-red-500 p-4 mb-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <FaTimes className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        </motion.div>
      )}
      
      <motion.form 
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative">
          <motion.label 
            htmlFor="title" 
            className="block text-gray-700 text-sm font-semibold mb-2"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            What do you need to do?
          </motion.label>
          <motion.input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            placeholder="Enter task title..."
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          />
          <motion.div 
            className="h-1 w-0 bg-blue-300 absolute bottom-0 left-0 rounded-full"
            animate={{ width: title.length > 0 ? '100%' : '0%' }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="relative">
          <motion.label 
            htmlFor="dueDate" 
            className="block text-gray-700 text-sm font-semibold mb-2"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-blue-400" />
              When is it due? (Optional)
            </div>
          </motion.label>
          <motion.input
            type="datetime-local"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          />
        </div>
        
        <div className="flex space-x-4 pt-4">
          <motion.button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-300 to-blue-400 text-white font-medium px-6 py-3 rounded-lg hover:from-blue-400 hover:to-blue-500 shadow-md"
            whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(147, 197, 253, 0.3)" }}
            whileTap={{ scale: 0.97 }}
            disabled={isSubmitting}
          >
            <div className="flex items-center justify-center">
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <FaPlus className="mr-2" />
                </motion.div>
              ) : (
                <FaSave className="mr-2" />
              )}
              {isSubmitting ? 'Adding...' : 'Save Task'}
            </div>
          </motion.button>
          
          <motion.button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-100 text-gray-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-200 border border-gray-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex items-center justify-center">
              <FaTimes className="mr-2" />
              Cancel
            </div>
          </motion.button>
        </div>
      </motion.form>
      
      <motion.div 
        className="mt-10 text-center text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p>Tasks help you stay organized and focused. Add a clear, actionable title.</p>
      </motion.div>
    </motion.div>
  );
}
