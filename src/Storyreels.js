// StoryReels.js
import React from 'react';
import './Storyreels.css'; // Include CSS for styling (create this file)
import Story from './Story';
import User from './Assets/User.png'
import CStory from './Assets/CStory.png'
const StoryReels = () => {
  return (
    <span className="storyReels">
      {/* Individual stories */}
      <Story
        image={User}
        profileSrc={CStory}
        title="Create Story"
      />
      {/* Add more Story components for other users */}
    </span>
  );
};

export default StoryReels;
