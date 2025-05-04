import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaPlus, FaSearch, FaInbox, FaCalendarDay, FaCalendarAlt,
  FaTag, FaProjectDiagram, FaUsers, FaChevronDown, FaChevronRight
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const [expandedSections, setExpandedSections] = useState({
    myProjects: true,
    team: true
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const myProjects = [
    { id: 'fitness', name: 'Fitness', color: 'bg-green-400' },
    { id: 'groceries', name: 'Groceries', color: 'bg-yellow-400' },
    { id: 'appointments', name: 'Appointments', color: 'bg-blue-400' }
  ];

  const teamProjects = [
    { id: 'brand', name: 'New Brand', color: 'bg-purple-400' },
    { id: 'website', name: 'Website Update', color: 'bg-blue-400' },
    { id: 'roadmap', name: 'Product Roadmap', color: 'bg-green-400' },
    { id: 'meeting', name: 'Meeting Agenda', color: 'bg-orange-400' }
  ];

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="w-64 bg-white h-screen overflow-y-auto fixed left-0 top-0 shadow-md z-10"
    >
      {/* User profile */}
      <div className="flex items-center p-4 border-b">
        <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center text-white font-medium">
          {user?.username?.charAt(0).toUpperCase() || 'U'}
        </div>
        <span className="ml-2 text-gray-700 font-medium">{user?.username || 'User'}</span>
      </div>

      {/* Add task button */}
      <div className="px-4 pt-4">
        <Link to="/add">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 px-4 bg-blue-300 rounded-md text-white flex items-center"
          >
            <FaPlus className="mr-2" /> Add task
          </motion.button>
        </Link>
      </div>

      {/* Search input */}
      <div className="px-4 py-3">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Navigation sections */}
      <nav className="px-2">
        <ul className="space-y-1">
          <NavItem to="/" icon={<FaInbox />} active={location.pathname === "/"}>
            Inbox
          </NavItem>
          <NavItem to="/today" icon={<FaCalendarDay />} active={location.pathname === "/today"}>
            Today
          </NavItem>
          <NavItem to="/upcoming" icon={<FaCalendarAlt />} active={location.pathname === "/upcoming"}>
            Upcoming
          </NavItem>
          <NavItem to="/filters" icon={<FaTag />} active={location.pathname === "/filters"}>
            Filters & Labels
          </NavItem>
        </ul>

        {/* My Projects */}
        <div className="mt-6">
          <div 
            className="flex items-center justify-between px-2 py-2 cursor-pointer text-gray-700 hover:bg-gray-100 rounded"
            onClick={() => toggleSection('myProjects')}
          >
            <div className="flex items-center">
              <FaProjectDiagram className="mr-3 text-gray-500" />
              <span className="font-medium">My Projects</span>
            </div>
            {expandedSections.myProjects ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
          </div>

          {expandedSections.myProjects && (
            <ul className="pl-10 mt-1 space-y-1">
              {myProjects.map(project => (
                <ProjectItem 
                  key={project.id} 
                  name={project.name} 
                  color={project.color} 
                  to={`/projects/${project.id}`}
                  active={location.pathname === `/projects/${project.id}`}
                />
              ))}
            </ul>
          )}
        </div>

        {/* Team */}
        <div className="mt-4">
          <div 
            className="flex items-center justify-between px-2 py-2 cursor-pointer text-gray-700 hover:bg-gray-100 rounded"
            onClick={() => toggleSection('team')}
          >
            <div className="flex items-center">
              <FaUsers className="mr-3 text-gray-500" />
              <span className="font-medium">Team</span>
            </div>
            {expandedSections.team ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
          </div>

          {expandedSections.team && (
            <ul className="pl-10 mt-1 space-y-1">
              {teamProjects.map(project => (
                <ProjectItem 
                  key={project.id} 
                  name={project.name} 
                  color={project.color} 
                  to={`/team/${project.id}`}
                  active={location.pathname === `/team/${project.id}`}
                />
              ))}
            </ul>
          )}
        </div>
      </nav>
    </motion.div>
  );
}

function NavItem({ to, icon, active, children }) {
  return (
    <li>
      <Link to={to}>
        <motion.div
          whileHover={{ backgroundColor: '#f3f4f6' }}
          className={`flex items-center px-2 py-2 rounded ${active ? 'bg-blue-50 text-blue-500' : 'text-gray-700'}`}
        >
          <span className="mr-3">{icon}</span>
          <span>{children}</span>
        </motion.div>
      </Link>
    </li>
  );
}

function ProjectItem({ name, color, to, active }) {
  return (
    <li>
      <Link to={to}>
        <motion.div
          whileHover={{ backgroundColor: '#f3f4f6' }}
          className={`flex items-center px-2 py-2 rounded ${active ? 'bg-blue-50' : ''}`}
        >
          <div className={`w-3 h-3 rounded-sm ${color} mr-3`}></div>
          <span className="text-gray-700">{name}</span>
        </motion.div>
      </Link>
    </li>
  );
}
