import React from 'react';
import './HerbCard.css';

// Import images
import tumericImg from '../assets/tumeric.jpg';
import gingerImg from '../assets/ginger.jpg';
// Import other images...

// Map filenames to images
const images = {
  "tumeric.jpg": tumericImg,
  "ginger.jpg": gingerImg,
  // Map other image filenames...
};

function HerbCard({ herb }) {
  const imageSrc = images[herb.image] || null;

  return (
    <div className="herb-card">
      {imageSrc && <img src={imageSrc} alt={herb.name} className="herb-image" />}
      <h3>{herb.name}</h3>
      <ul>
        {herb.advantages.map((advantage, index) => (
          <li key={index}>{advantage}</li>
        ))}
      </ul>
    </div>
  );
}

function HerbCard({ herb, onAddComment }) {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleAddComment = () => {
    if (comment.trim()) {
      onAddComment(herb.id, comment);
      setComment('');
    }
  };

  return (
    <div className="herb-card">
      <img src={herb.image} alt={herb.name} className="herb-image" />
      <h3>{herb.name}</h3>
      <ul>
        {herb.advantages.map((advantage, index) => (
          <li key={index}>{advantage}</li>
        ))}
      </ul>
      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && (
        <div className="comments-section">
          <ul>
            {herb.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      )}
    </div>
  );
}
export default HerbCard;
