// src/components/Common/ImageUploader.js
import React from 'react';

const ImageUploader = ({ onImageUpload }) => {
  // Implement your image uploader here
  return (
    <input
      type="file"
      onChange={(e) => {
        // Handle file upload and call onImageUpload with the image URL
        console.log('File selected:', e.target.files[0]);
        onImageUpload('https://example.com/placeholder-image.jpg');
      }}
    />
  );
};

export default ImageUploader;