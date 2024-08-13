// src/components/Blog/BlogList.jsx
import React, { useState } from 'react';
import Button from '../Common/Button';

const dummyBlogs = [
  { id: 1, title: 'Introduction to React', author: 'John Doe', status: 'approved', type: 'Frontend' },
  { id: 2, title: 'Advanced JavaScript Techniques', author: 'Jane Smith', status: 'pending', type: 'JavaScript' },
  { id: 3, title: 'CSS Grid Layout', author: 'Bob Johnson', status: 'approved', type: 'CSS' },
  { id: 4, title: 'Node.js Best Practices', author: 'Alice Brown', status: 'pending', type: 'Backend' },
  { id: 5, title: 'React.js State Management', author: 'Charlie Lee', status: 'rejected', type: 'Frontend' },
];

const BlogList = () => {
    const [blogs, setBlogs] = useState(dummyBlogs);
  const [sortBy, setSortBy] = useState('title');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);

  const approveBlogPost = (id) => {
    console.log(`Blog post ${id} approved`);
    // In a real application, you would update the blog status here
  };

  const handleSort = (type) => {
    setSortBy(type);
    const sortedBlogs = [...blogs].sort((a, b) => a[type].localeCompare(b[type]));
    setBlogs(sortedBlogs);
  };

  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <div className="mb-4 flex flex-row justify-between">
            <div>
        <label htmlFor="contentType" className="mr-2">Filter by Content Type:</label>
        <select id="contentType" className="select select-bordered select-sm  max-w-xs">
          <option value="all">All</option>
          <option value="blog">Blog</option>
          <option value="workoutVideo">Workout Video</option>
          <option value="awarenessVideo">Awareness Video</option>
        </select>
            </div>
        <input type="text" placeholder="Search" className="input input-bordered input-sm w-full max-w-xs ml-4" />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>
              <button className="btn btn-ghost btn-xs" onClick={() => handleSort('title')}>
                Title {sortBy === 'title' && '↓'}
              </button>
            </th>
            <th>
              <button className="btn btn-ghost btn-xs" onClick={() => handleSort('author')}>
                Author {sortBy === 'author' && '↓'}
              </button>
            </th>
            <th>
              <button className="btn btn-ghost btn-xs" onClick={() => handleSort('status')}>
                Status {sortBy === 'status' && '↓'}
              </button>
            </th>
            <th>
              <button className="btn btn-ghost btn-xs" onClick={() => handleSort('type')}>
                Type {sortBy === 'type' && '↓'}
              </button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td>
                <span className={`font-semibold  p-1 ${blog.status === 'approved' ? 'text-green-500' : blog.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                  {blog.status}
                </span>
              </td>
              <td>{blog.type}</td>
              <td>
                <div className="flex space-x-2">
                    {blog.status === 'approved' && (
                        <button className="btn btn-accent w-[85px]" onClick={() => console.log(`Edit blog ${blog.id}`)}>Edit</button>
                        
                    )}
                  {blog.status !== 'approved' && (
                    <>
                    <button className="btn  btn-success" onClick={() => approveBlogPost(blog.id)}>Approve</button>
                    <button className="btn  btn-error" onClick={() => console.log(`Delete blog ${blog.id}`)}>Delete</button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        <div className="btn-group">
          {[...Array(Math.ceil(blogs.length / blogsPerPage))].map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm ${currentPage === index + 1 ? 'btn-active' : ''}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;