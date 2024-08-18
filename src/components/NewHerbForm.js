import React, { useState } from 'react';
import axios from 'axios';

function NewHerbForm({ onNewHerb }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newHerb = { name, description, image, latest: true };

    try {
      const response = await axios.post('http://localhost:3001/herbs', newHerb);
      onNewHerb(response.data); // Update the herbs list in the parent component
    } catch (error) {
      console.error('Error adding new herb:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-herb-form">
      <input
        type="text"
        placeholder="Herb Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Herb Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <button type="submit">Add Herb</button>
    </form>
  );
}

export default NewHerbForm;
