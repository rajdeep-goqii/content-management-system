import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMobile, FaTabletAlt, FaDesktop } from 'react-icons/fa';

const BlogPreview = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [viewportSize, setViewportSize] = useState('desktop');

  useEffect(() => {
    const storedBlog = localStorage.getItem('blogPreview');
    if (storedBlog) {
      setBlog(JSON.parse(storedBlog));
    } else {
      // If no blog data is found, redirect to the blog editor
      navigate('/create-blog');
    }
  }, [navigate]);

  console.log(blog);

  const getViewportClass = () => {
    switch (viewportSize) {
      case 'mobile':
        return 'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5';
      case 'tablet':
        return 'w-full sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3';
      default:
        return 'w-full';
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Blog Preview</h2>
      
      <div className="mb-4 flex justify-center space-x-4">
        <button 
          className={`btn btn-sm ${viewportSize === 'mobile' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setViewportSize('mobile')}
        >
          <FaMobile className="mr-2" /> Mobile
        </button>
        <button 
          className={`btn btn-sm ${viewportSize === 'tablet' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setViewportSize('tablet')}
        >
          <FaTabletAlt className="mr-2" /> Tablet
        </button>
        <button 
          className={`btn btn-sm ${viewportSize === 'desktop' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setViewportSize('desktop')}
        >
          <FaDesktop className="mr-2" /> Desktop
        </button>
      </div>

      <div className={`mx-auto ${getViewportClass()} border p-4 overflow-auto`} style={{ maxHeight: '600px' }}>
        <h1 className="text-2xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-600 mb-4">By {blog.author} | {blog.publishedDate}</p>
        {blog.headerImage && (
          <img src={blog.headerImage} alt={blog.title} className="w-full h-48 object-cover mb-4 rounded" />
        )}
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Categories:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {blog.categories.map((category, index) => (
              <span key={index} className="badge badge-primary">{category.label}</span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">SEO Keywords:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {blog.seoKeywords.map((keyword, index) => (
              <span key={index} className="badge badge-secondary">{keyword.label}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button className="btn btn-primary" onClick={() => navigate('/blog-editor')}>
          Back to Editor
        </button>
      </div>
    </div>
  );
};

export default BlogPreview;