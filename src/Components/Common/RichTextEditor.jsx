// src/components/Common/RichTextEditor.js
import React from 'react';

const RichTextEditor = ({ value, onChange }) => {
  // Implement your rich text editor here
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full textarea textarea-bordered"
    />
  );
};

export default RichTextEditor;