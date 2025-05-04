import { motion } from 'framer-motion';
import { FaTrash, FaCheck, FaClock, FaCalendarAlt } from 'react-icons/fa';

export default function TodoItem({ todo, onDelete, onToggleComplete }) {
  // Format dates for display
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Check if due date is past
  const isPastDue = () => {
    if (!todo.dueDate) return false;
    return new Date(todo.dueDate) < new Date();
  };
  
  const createdAtFormatted = formatDate(todo.createdAt);
  const dueDateFormatted = formatDate(todo.dueDate);
  const isPast = isPastDue();

  return (
    <motion.li 
      className="bg-white p-5 rounded-lg shadow-md flex flex-col mb-4 border-l-4"
      style={{ 
        borderLeftColor: todo.completed ? '#93c5fd' : isPast ? '#f87171' : '#bfdbfe'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`w-6 h-6 rounded-full mr-4 flex items-center justify-center ${
              todo.completed ? 'bg-blue-300' : 'bg-gray-200'
            }`}
            onClick={() => onToggleComplete(todo._id, todo.completed)}
          >
            {todo.completed && <FaCheck className="text-white text-xs" />}
          </motion.button>
          <motion.span 
            className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
            animate={{ 
              color: todo.completed ? '#9CA3AF' : '#1F2937',
              fontWeight: todo.completed ? 300 : 500 
            }}
          >
            {todo.title}
          </motion.span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: '#93c5fd' }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-300 text-white p-2 rounded-full hover:bg-blue-400 transition-colors"
          onClick={() => onDelete(todo._id)}
        >
          <FaTrash />
        </motion.button>
      </div>
      
      <div className="mt-3 flex flex-wrap text-xs text-gray-500 space-x-4">
        {createdAtFormatted && (
          <div className="flex items-center">
            <FaClock className="mr-1 text-blue-300" />
            <span>Created: {createdAtFormatted}</span>
          </div>
        )}
        {dueDateFormatted && (
          <div className={`flex items-center ${isPast && !todo.completed ? 'text-red-500 font-medium' : ''}`}>
            <FaCalendarAlt className={`mr-1 ${isPast && !todo.completed ? 'text-red-500' : 'text-blue-300'}`} />
            <span>Due: {dueDateFormatted}</span>
          </div>
        )}
      </div>
    </motion.li>
  );
}
