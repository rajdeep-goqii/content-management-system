// src/hooks/useBlogManagement.js
import { useState } from 'react';
import { saveBlog, getBlog, listBlogs, approveBlog } from '../services/blogService';

export const useBlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const fetchedBlogs = await listBlogs();
      setBlogs(fetchedBlogs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createOrUpdateBlog = async (blog) => {
    setLoading(true);
    try {
      const savedBlog = await saveBlog(blog);
      setBlogs(prevBlogs => {
        const index = prevBlogs.findIndex(b => b.id === savedBlog.id);
        if (index !== -1) {
          return [...prevBlogs.slice(0, index), savedBlog, ...prevBlogs.slice(index + 1)];
        } else {
          return [...prevBlogs, savedBlog];
        }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const approveBlogPost = async (blogId) => {
    setLoading(true);
    try {
      await approveBlog(blogId);
      setBlogs(prevBlogs => prevBlogs.map(blog => 
        blog.id === blogId ? { ...blog, status: 'approved' } : blog
      ));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    blogs,
    loading,
    error,
    fetchBlogs,
    createOrUpdateBlog,
    getBlog,
    approveBlogPost
  };
};