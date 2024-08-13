// src/components/Dashboard/Dashboard.js
import React from 'react';
import { useBlogManagement } from '../../hooks/useBlogManagement';
import ContentEngagementDashboard from './ContentEngagementDashboard';

const Dashboard = () => {
  const { blogs } = useBlogManagement();

  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter(blog => blog.status === 'published').length;
  const pendingApproval = blogs.filter(blog => blog.status === 'pending').length;

  return (
    <div className='grid grid-cols-1 gap-8'>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-2">Total Blogs</h2>
        <p className="text-3xl">{totalBlogs}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-2">Published Blogs</h2>
        <p className="text-3xl">{publishedBlogs}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-2">Pending Approval</h2>
        <p className="text-3xl">{pendingApproval}</p>
      </div>
    </div>

    <ContentEngagementDashboard />
    </div>
  );
};

export default Dashboard;