import React from 'react';

const Footer = ({ isSidebarOpen }) => {
  return (
    <footer className={`bg-primary text-primary-content p-4 sticky bottom-0 z-10 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
      <div className="flex items-center justify-center flex-col">
        <img
          src='https://appcdn.goqii.com/storeimg/1174_1719242636.png'
          alt="goqii"
          className="w-24 mb-2"
        />
        <p className="text-sm">© 2024 goqii. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;