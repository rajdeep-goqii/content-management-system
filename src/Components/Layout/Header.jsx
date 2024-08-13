import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const Header = ({ isSidebarOpen }) => {
  const location = useLocation();

  const routeNameMap = useMemo(() => ({
    '/': 'Dashboard',
    '/create-blog': 'Create Blog',
    '/choose-template': 'Choose Template',
    '/create-with-ai': 'Create with AI',
    '/blog-list': 'Blog List',
    '/content-management': 'Content Management',
    '/blog-editor': 'Blog Editor',
    '/blog-preview': 'Blog Preview'
  }), []);

  const getPageName = () => {
    const exactMatch = routeNameMap[location.pathname];
    if (exactMatch) return exactMatch;

    // Handle nested routes
    const pathSegments = location.pathname.split('/').filter(Boolean);
    for (let i = pathSegments.length; i > 0; i--) {
      const partialPath = '/' + pathSegments.slice(0, i).join('/');
      if (routeNameMap[partialPath]) return routeNameMap[partialPath];
    }

    return 'Page Not Found';
  };

  return (
    <header className={`bg-primary text-primary-content p-4 sticky top-0 z-10 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
      <h1 className="text-2xl font-bold text-center">{getPageName()}</h1>
    </header>
  );
};

export default Header;