import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaInfoCircle, FaPlus, FaLanguage } from 'react-icons/fa';
import Modal from '../Common/Modal';
import Select from 'react-select';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import { FaT } from 'react-icons/fa6';

const BlogEditor = ({ blogId = null }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const [blog, setBlog] = useState({
    title: '',
    description: '',
    content: '',
    headerImage: '',
    contentType: 'Blog',
    program: '',
    condition: '',
    pathway: '',
    ageGroups: [],
    gender: '',
    location: '',
    language: 'English',
    assignedMembers: [],
    author: '',
    categories: [],
    seoKeywords: [],
    publishedDate: new Date().toISOString().split('T')[0],
  });

  const [libraryContent, setLibraryContent] = useState([]);
  const [selectedLibraryContent, setSelectedLibraryContent] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newSubCategory, setNewSubCategory] = useState('');
  const [categories, setCategories] = useState([
    { value: 'technology', label: 'Technology' },
    { value: 'health', label: 'Health' },
    { value: 'fitness', label: 'Fitness' },
  ]);

  const suggestedCategories = ['Lifestyle', 'Nutrition', 'Mental Health', 'Exercise'];

  useEffect(() => {
    if (blogId) {
      console.log(`Fetching blog with id: ${blogId}`);
    }
    setLibraryContent(['Library Content 1', 'Library Content 2', 'Library Content 3']);
  }, [blogId]);

  useEffect(() => {
    if (location.state && location.state.content) {
      setBlog(prevBlog => ({
        ...prevBlog,
        content: location.state.content
      }));
    } else if (blogId) {
      console.log(`Fetching blog with id: ${blogId}`);
      // Implement the fetch logic here
    }
  }, [location, blogId]);

  useEffect(() => {
    console.log("ReactQuill component:", ReactQuill);
    console.log("blog.content:", blog.content);
  }, [blog.content]);

  const handleInputChange = (field, value) => {
    console.log(`Updating ${field} with:`, value);
    setBlog(prevBlog => ({ ...prevBlog, [field]: value }));
  };

  const handleHeaderImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('headerImage', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting blog:', blog);
    document.getElementById('modal').showModal();
  };

  const handleFetchFromLibrary = () => {
    console.log('Fetching:', selectedLibraryContent);
  };

  const handleCreateWithAI = () => {
    console.log('Creating blog with AI');
  };

  const handleCreateCategory = () => {
    if (newCategory) {
      const newCategoryObject = { 
        value: newCategory.toLowerCase(), 
        label: newCategory,
        subCategories: newSubCategory ? [newSubCategory] : []
      };
      setCategories([...categories, newCategoryObject]);
      setBlog(prevBlog => ({
        ...prevBlog,
        categories: [...prevBlog.categories, newCategoryObject]
      }));
      setNewCategory('');
      setNewSubCategory('');
      setShowCategoryModal(false);
    }
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, 'image', reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    console.log("Editor content:", editorContent);
  }, [editorContent]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'link', 'image'
  ];

  const handleEditorChange = (content) => {
    setEditorContent(content);
    handleInputChange('content', content);
  };


  const handlePreview = () => {
    localStorage.setItem('blogPreview', JSON.stringify(blog));
    navigate('/blog-preview');
  };

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-primary-content">Create New Content</h2>

      <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Enter title"
            className="input input-bordered w-full"
            value={blog.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            type="text"
            placeholder="Enter description"
            className="input input-bordered w-full"
            value={blog.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* <div className="form-control">
          <label className="label">
            <span className="label-text">Fetch from Library</span>
          </label>
          <div className="flex space-x-2">
            <select 
              className="select select-bordered flex-grow"
              value={selectedLibraryContent}
              onChange={(e) => setSelectedLibraryContent(e.target.value)}
            >
              <option disabled value="">Select Content</option>
              {libraryContent.map((content, index) => (
                <option key={index} value={content}>{content}</option>
              ))}
            </select>
            <button className="btn btn-primary" onClick={handleFetchFromLibrary}>Fetch</button>
          </div>
        </div> */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Content Type</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={blog.contentType}
            onChange={(e) => handleInputChange('contentType', e.target.value)}
          >
            <option disabled value="">Select Content Type</option>
            <option>Blog</option>
            <option>Workout Video</option>
            <option>Awareness Video</option>
          </select>
        </div>


        

        <div className="form-control">
          <label className="label">
            <span className="label-text">Author</span>
          </label>
          <input
            type="text"
            placeholder="Enter author name"
            className="input input-bordered w-full"
            value={blog.author}
            onChange={(e) => handleInputChange('author', e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Language</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={blog.language}
            onChange={(e) => handleInputChange('language', e.target.value)}
          >
            <option value="English">English</option>
            <option value="Arabic">Arabic</option>
          </select>
        </div>

        

        {/* <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            placeholder="Enter location"
            className="input input-bordered w-full"
            value={blog.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={blog.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
          >
            <option disabled value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="all">All</option>
          </select>
        </div> */}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Categories</span>
          </label>
          <div className="flex items-center space-x-2">
            <Select
              isMulti
              options={categories}
              value={blog.categories}
              onChange={(selectedOptions) => handleInputChange('categories', selectedOptions)}
              className="flex-grow"
              placeholder="Select categories"
            />
            <Tooltip title="Add new category" position="top" animation="scale">
              <button className="btn btn-circle btn-sm" onClick={() => setShowCategoryModal(true)}>
                <FaPlus />
              </button>
            </Tooltip>
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">SEO Keywords</span>
          </label>
          <Select
            isMulti
            options={[]}
            value={blog.seoKeywords}
            onChange={(selectedOptions) => handleInputChange('seoKeywords', selectedOptions)}
            className="w-full"
            placeholder="Add SEO Keywords"
            onInputChange={(inputValue) => {
              if (inputValue && inputValue.trim() !== '') {
                return [{ value: inputValue, label: inputValue }, ...blog.seoKeywords];
              }
              return blog.seoKeywords;
            }}
          />
        </div>
      </div>
      <div className='grid grid-cols-3 gap-2'>

      <div className="form-control">
          <label className="label">
            <span className="label-text">Program</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={blog.program}
            onChange={(e) => handleInputChange('program', e.target.value)}
          >
            <option disabled value="">Select Program</option>
            <option>Program 1</option>
            <option>Program 2</option>
            <option>Program 3</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Condition</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={blog.condition}
            onChange={(e) => handleInputChange('condition', e.target.value)}
          >
            <option disabled value="">Select Condition</option>
            <option>Condition 1</option>
            <option>Condition 2</option>
            <option>Condition 3</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Pathway</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={blog.pathway}
            onChange={(e) => handleInputChange('pathway', e.target.value)}
          >
            <option disabled value="">Select Pathway</option>
            <option>Pathway 1</option>
            <option>Pathway 2</option>
            <option>Pathway 3</option>
          </select>
        </div>

      </div>

      <div className="form-control mb-6">
        <label className="label">
          <span className="label-text">Header Image</span>
        </label>
        <div className="flex items-center space-x-2">
          <input 
            type="file" 
            className="file-input file-input-bordered w-full" 
            onChange={handleHeaderImageUpload}
          />
          {blog.headerImage && (
            <img src={blog.headerImage} alt="Header" className="w-16 h-16 object-cover rounded" />
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className='flex flex-row w-full justify-between items-center py-4'>
        <h3 className="text-3xl font-semibold mb-2 w-1/2">Content</h3>
        <div className="form-control w-1/2">
          <label className="label">
            <span className="label-text">Language</span>
          </label>
          <select 
            className="select select-bordered select-sm w-full"
            value={blog.language}
            onChange={(e) => handleInputChange('language', e.target.value)}
          >
            <option value="English">English</option>
            <option value="Arabic">Arabic</option>
          </select>
        </div>
        </div>
        <div className='flex flex-row w-full gap-16 justify-between py-4'>
        <div className="bg-base-200 p-4 rounded-lg">
          {/* <div className="flex items-center space-x-2 mb-4">
            <FaInfoCircle className="text-info" />
            <span>You can add images by clicking the image button in the editor toolbar.</span>
          </div> */}
          <h1 className="text-xl font-semibold mb-2">English</h1>
          <div className="quill-editor-container" style={{ height: '420px', width: '100%' }}>
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={handleEditorChange}
              modules={modules}
              formats={formats}
              style={{ height: '350px' }}
            />
          </div>
        </div>
        <div className="divider divider-horizontal">
            <div className="btn btn-accent w-36 flex flex-row justify-center items-center gap-2" 
            // onClick={handleTranslate}
            >
               <FaLanguage className="text-3xl" /> <span>Translate</span>
            </div>
        </div>
        <div className="bg-base-200 p-4 rounded-lg">
          {/* <div className="flex items-center space-x-2 mb-4">
            <FaInfoCircle className="text-info" />
            <span>You can add images by clicking the image button in the editor toolbar.</span>
          </div> */}
          <div className="quill-editor-container" style={{ height: '420px', width: '100%' }}>
          <h1 className="text-xl font-semibold mb-2">Arabic</h1>
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={handleEditorChange}
              modules={modules}
              formats={formats}
              style={{ height: '350px' }}
            />
          </div>
        </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <button className="btn btn-primary" onClick={handleSubmit}>Submit for Approval</button>
          <button className="btn btn-secondary" onClick={handlePreview}>Preview</button>
          <button className="btn btn-accent" onClick={handleCreateWithAI}>Create with AI</button>
        </div>
        <button className="btn btn-outline">Cancel</button>
      </div>

      <Modal 
        title={"Success"}
        content={"Blog created successfully"}
        action={"success"}
      />

{showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Create New Category</h3>
            <input
              type="text"
              placeholder="New Category"
              className="input input-bordered w-full mb-4"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <input
              type="text"
              placeholder="Sub-category (optional)"
              className="input input-bordered w-full mb-4"
              value={newSubCategory}
              onChange={(e) => setNewSubCategory(e.target.value)}
            />
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Suggested Categories:</h4>
              <div className="flex flex-wrap gap-2">
                {suggestedCategories.map((category, index) => (
                  <button 
                    key={index} 
                    className="badge badge-outline hover:badge-primary"
                    onClick={() => setNewCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button className="btn btn-primary" onClick={handleCreateCategory}>Create</button>
              <button className="btn btn-outline" onClick={() => setShowCategoryModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;