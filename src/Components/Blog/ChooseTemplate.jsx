import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { FaClone, FaArrowRight } from 'react-icons/fa';

const ChooseTemplate = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const existingTemplates = [
    { value: 'template1', label: 'Health and Wellness Blog' },
    { value: 'template2', label: 'Fitness Tips Blog' },
    { value: 'template3', label: 'Nutrition Guide Blog' },
  ];

  const handleChooseTemplate = () => {
    if (selectedTemplate) {
      const templateContent = `This is the content of ${selectedTemplate.label}`;
      navigate('/blog-editor', { state: { content: templateContent } });
    }
  };

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-xl max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-primary-content flex items-center">
        <FaClone className="mr-3" /> Choose Existing Template
      </h2>
      
      <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
        <div className="card-body">
          <p className="text-lg mb-4">Select a template to jumpstart your blog creation:</p>
          <Select
            options={existingTemplates}
            onChange={setSelectedTemplate}
            placeholder="Select a template"
            className="mb-6"
            styles={{
              control: (base) => ({
                ...base,
                borderColor: '#d1d5db',
                '&:hover': { borderColor: '#9ca3af' },
              }),
            }}
          />
          <div className="card-actions justify-end">
            <button 
              className="btn btn-primary btn-lg"
              onClick={handleChooseTemplate} 
              disabled={!selectedTemplate}
            >
              Use Template <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseTemplate;