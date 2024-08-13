import React from 'react';
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaClone, FaRobot } from 'react-icons/fa';

const BlogCreationOptions = () => {
  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-primary-content">Create New Blog</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/blog-editor" className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <h3 className="card-title"><FaPencilAlt className="mr-2" /> Create from Scratch</h3>
            <p>Start with a blank canvas and create your blog post from scratch.</p>
          </div>
        </Link>

        <Link to="/choose-template" className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <h3 className="card-title"><FaClone className="mr-2" /> Choose Existing Template</h3>
            <p>Select from a variety of pre-designed templates to jumpstart your blog.</p>
          </div>
        </Link>

        <Link to="/create-with-ai" className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <h3 className="card-title"><FaRobot className="mr-2" /> Create with AI</h3>
            <p>Let our AI assist you in generating content for your blog post.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BlogCreationOptions;