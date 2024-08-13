// src/components/Common/Button.js
import React from 'react';

const Button = ({ onClick, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn btn-accent disabled:opacity-50"
    >
      {children}
    </button>
  );
};

export default Button;