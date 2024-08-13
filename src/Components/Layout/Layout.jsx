import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex bg-base-100 min-h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1">
        <Header isSidebarOpen={isSidebarOpen} />
        <main className={`flex-1 p-4 overflow-auto bg-primary transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
          {children}
        </main>
        <Footer isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default Layout;