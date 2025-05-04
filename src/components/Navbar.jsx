import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaPlus, FaTasks, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  return (
    <motion.nav 
      className="bg-gradient-to-r from-blue-300 to-blue-400 text-white shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto py-5 px-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <FaTasks className="mr-2 text-2xl" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Task By Samih
          </motion.span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex space-x-1 mr-4">
                <NavLink to="/" isActive={location.pathname === "/"}>
                  <FaHome className="mr-1" /> Home
                </NavLink>
                <NavLink to="/add" isActive={location.pathname === "/add"}>
                  <FaPlus className="mr-1" /> New Task
                </NavLink>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="hidden md:inline text-sm bg-white bg-opacity-20 py-1 px-3 rounded-full">
                  <FaUser className="inline mr-1" /> {user.username}
                </span>
                <button 
                  onClick={logout}
                  className="text-white hover:text-blue-100 flex items-center"
                >
                  <FaSignOutAlt className="mr-1" /> 
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex space-x-4">
              <NavLink to="/login" isActive={location.pathname === "/login"}>
                Login
              </NavLink>
              <NavLink to="/register" isActive={location.pathname === "/register"}>
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({ to, children, isActive }) {
  return (
    <Link to={to}>
      <motion.div 
        className={`relative px-4 py-2 rounded-full flex items-center ${
          isActive ? 'text-white' : 'text-blue-100'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
        {isActive && (
          <motion.div 
            className="absolute inset-0 bg-white bg-opacity-20 rounded-full"
            layoutId="nav-underline"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </motion.div>
    </Link>
  );
}
