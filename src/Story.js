// Story.js
import React from 'react';
import './Story.css'; // Include CSS for styling (create this file)

const Story = ({ image, profileSrc, title }) => {
  return (
    <div style={{ backgroundImage: `url(${image})` }} className="story">
      <div style={{ backgroundImage: `url(${profileSrc})` }} className="story__avatar"></div>
      <h4>{title}</h4>
    </div>
  );
};

export default Story;
