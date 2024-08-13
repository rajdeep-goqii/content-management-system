// src/components/Layout/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiHome, FiEdit, FiList, FiTable } from 'react-icons/fi';
import Logo from "../../assets/logo_bupasa.png"

const Sidebar = ({ isOpen, toggleSidebar }) => {

    const [selected, setSelected] = useState(0);

  return (
    <aside className={`bg-primary text-neutral fixed h-full transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
        <img src={Logo} onClick={toggleSidebar} className="w-10 cursor-pointer" alt="logo" />
        <h1 className={`font-bold ${isOpen ? 'block' : 'hidden'}`}>CMS</h1>
        </div>
        <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-primary-dark">
          <FiMenu />
        </button>
      </div>
      <nav className="mt-8">
        <ul className="mx-2">
          <li className="mb-2">
            <Link to="/" onClick={() => setSelected(0)} className={`flex items-center p-4 gap-2 bg-white hover:bg-primary-dark shadow-lg rounded-lg ${selected === 0 ? 'bg-primary-dark rounded-lg shadow-lg' : ''}`}>
              <FiHome className="" />
              <span className={isOpen ? 'block' : 'hidden'}>Dashboard</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/create-blog" onClick={() => setSelected(1)} className={`flex items-center gap-2 p-4 bg-white hover:bg-primary-dark shadow-lg rounded-lg ${selected === 1 ? 'bg-primary-dark rounded-lg shadow-lg' : ''}`}>
              <FiEdit className="" />
              <span className={isOpen ? 'block' : 'hidden'}>Create Blog</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/blog-list" onClick={() => setSelected(2)} className={`flex items-center gap-2 p-4 bg-white hover:bg-primary-dark shadow-lg rounded-lg ${selected === 2 ? 'bg-primary-dark rounded-lg shadow-lg' : ''}`}>
              <FiList className="" />
              <span className={isOpen ? 'block' : 'hidden'}>Blog List</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/content-management" onClick={() => setSelected(3)} className={`flex items-center gap-2 p-4 bg-white hover:bg-primary-dark shadow-lg rounded-lg ${selected === 3 ? 'bg-primary-dark rounded-lg shadow-lg' : ''}`}>
              <FiTable className="" />
              <span className={isOpen ? 'block' : 'hidden'}>Content Management</span>
            </Link>
          </li>

        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;