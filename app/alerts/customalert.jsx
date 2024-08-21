import React, { useEffect, useState } from 'react';

import './customalert.css';

const CustomAlert = ({ message, show, onClose }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 300); // delay to allow animation
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div className={`custom-alert ${show ? 'show' : 'hide'}`}>
      <div className="alert-content">
        <span>{message}</span>
        <button onClick={onClose}>x</button>
      </div>
    </div>
  );
};

export default CustomAlert;