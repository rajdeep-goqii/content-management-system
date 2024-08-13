import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRobot, FaMagic, FaEdit } from 'react-icons/fa';

const CreateWithAI = () => {
  const navigate = useNavigate();
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGeneratedContent, setAiGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateWithAI = async () => {
    setIsLoading(true);
    // Simulating AI generation
    setTimeout(() => {
      const generatedContent = `AI-generated content based on: "${aiPrompt}"`;
      setAiGeneratedContent(generatedContent);
      setIsLoading(false);
    }, 2000);
  };

  const handleEditAIContent = () => {
    navigate('/blog-editor', { state: { content: aiGeneratedContent } });
  };

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-xl max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-primary-content flex items-center">
        <FaRobot className="mr-3" /> Create with AI
      </h2>
      
      <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
        <div className="card-body">
          <p className="text-lg mb-4">Enter a topic or idea for your blog post:</p>
          <textarea
            placeholder="E.g., '10 tips for maintaining a healthy lifestyle'"
            className="textarea textarea-bordered w-full h-32 mb-4"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
          />
          <div className="card-actions justify-end">
            <button 
              className={`btn btn-primary btn-lg ${isLoading ? 'loading' : ''}`}
              onClick={handleCreateWithAI} 
              disabled={!aiPrompt || isLoading}
            >
              {isLoading ? 'Generating...' : (
                <>
                  Generate Content <FaMagic className="ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {aiGeneratedContent && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 text-primary-content">AI Generated Content Preview</h3>
          <div className="bg-base-200 p-6 rounded-lg mb-4 shadow-inner">
            <p className="whitespace-pre-wrap">{aiGeneratedContent}</p>
          </div>
          <button className="btn btn-secondary btn-lg" onClick={handleEditAIContent}>
            <FaEdit className="mr-2" /> Edit AI Content
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateWithAI;