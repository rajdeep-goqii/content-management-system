// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Dashboard from './Components/Dashboard/Dashboard';
import BlogEditor from './Components/Blog/BlogEditor';
import BlogList from './Components/Blog/BlogList';
import ContentManagement from './Components/Blog/ContentManagement';
import BlogCreationOptions from './Components/Blog/BlogCreationOptions';
import ChooseTemplate from './Components/Blog/ChooseTemplate';
import CreateWithAI from './Components/Blog/CreateWithAI';
import BlogPreview from './Components/Blog/BlogPreview';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-blog" element={<BlogCreationOptions />} />
          <Route path="/choose-template" element={<ChooseTemplate />} />
          <Route path="/create-with-ai" element={<CreateWithAI />} />
          <Route path="/blog-editor" element={<BlogEditor />} />
          <Route path="/blog-list" element={<BlogList />} />
          <Route path="/blog-preview" element={<BlogPreview />} />
          <Route path="/content-management" element={<ContentManagement />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;