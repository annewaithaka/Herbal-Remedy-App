import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCommentDots, faImage } from '@fortawesome/free-solid-svg-icons';
import './ProductsPage.css';

function ProductsPage() {
  const [herbs, setHerbs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [currentHerb, setCurrentHerb] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');

  useEffect(() => {
    fetchHerbs();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.modal-content') === null) {
        setShowEditModal(false);
        setShowDeleteModal(false);
        setShowAddModal(false);
        setShowCommentModal(false);
        setShowImageUploadModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchHerbs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/herbs');
      setHerbs(response.data);
    } catch (error) {
      console.error('Error fetching herbs:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/herbs/${id}`);
      fetchHerbs();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting herb:', error);
    }
  };

  const handleEdit = (herb) => {
    setCurrentHerb(herb);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.patch(`http://localhost:3001/herbs/${currentHerb.id}`, currentHerb);
      fetchHerbs();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error editing herb:', error);
    }
  };

  const handleAddHerb = () => {
    setCurrentHerb({ name: '', description: '', image: '', comments: [] });
    setShowAddModal(true);
  };

  const handleSaveNewHerb = async () => {
    try {
      await axios.post('http://localhost:3001/herbs', currentHerb);
      fetchHerbs();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding new herb:', error);
    }
  };

  const handleAddComment = async (id) => {
    try {
      const herb = herbs.find(h => h.id === id);
      const updatedHerb = { 
        ...herb, 
        comments: [...(herb.comments || []), newComment] 
      };

      await axios.patch(`http://localhost:3001/herbs/${id}`, updatedHerb);
      setHerbs(herbs.map(h => (h.id === id ? updatedHerb : h)));
      setShowCommentModal(false);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentHerb({ ...currentHerb, [name]: value });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUploadedImage(URL.createObjectURL(file));
  };

  const handleSaveImage = async () => {
    try {
      const updatedHerb = { ...currentHerb, image: uploadedImage };
      await axios.patch(`http://localhost:3001/herbs/${currentHerb.id}`, updatedHerb);
      fetchHerbs();
      setShowImageUploadModal(false);
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const filteredHerbs = herbs.filter((herb) =>
    herb.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getImagePath = (imageName) => {
    try {
      return require(`../assets/${imageName}`);
    } catch (error) {
      console.error('Error loading image:', error);
      return null;
    }
  };

  return (
    <div className="products-page">
      <nav className="navbar">
        <h1>Herbstore</h1>
        <input
          type="text"
          placeholder="Search for a herb..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
        <button className="upload-button" onClick={handleAddHerb}>
          <FontAwesomeIcon icon={faPlus} /> Upload New Herb
        </button>
      </nav>
      <div className="herbs-container">
        {filteredHerbs.map((herb) => (
          <div className="herb-card" key={herb.id}>
            <img src={getImagePath(herb.image)} alt={herb.name} className="herb-image" />
            <h3>{herb.name}</h3>
            <p>{herb.description}</p>
            <button className="edit-button" onClick={() => handleEdit(herb)}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
            <button className="delete-button" onClick={() => { setCurrentHerb(herb); setShowDeleteModal(true); }}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
            <button className="comment-button" onClick={() => { setCurrentHerb(herb); setShowCommentModal(true); }}>
              <FontAwesomeIcon icon={faCommentDots} /> Comment
            </button>
            <button className="image-button" onClick={() => { setCurrentHerb(herb); setShowImageUploadModal(true); }}>
              <FontAwesomeIcon icon={faImage} /> Upload Image
            </button>
            {herb.latest && <span className="latest-discovery">Latest Discovery</span>}
            <div className="comments">
              {herb.comments && herb.comments.map((comment, index) => (
                <p key={index} className="comment-text">{comment}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Herb Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Herb</h2>
            <input
              type="text"
              name="name"
              value={currentHerb.name}
              onChange={handleInputChange}
              placeholder="Herb Name"
            />
            <textarea
              name="description"
              value={currentHerb.description}
              onChange={handleInputChange}
              placeholder="Herb Description"
            />
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={() => setShowEditModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Add New Herb Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Herb</h2>
            <input
              type="text"
              name="name"
              value={currentHerb.name}
              onChange={handleInputChange}
              placeholder="Herb Name"
            />
            <textarea
              name="description"
              value={currentHerb.description}
              onChange={handleInputChange}
              placeholder="Herb Description"
            />
            <button onClick={handleSaveNewHerb}>Save</button>
            <button onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Delete Herb</h2>
            <p>Are you sure you want to delete {currentHerb.name}?</p>
            <button onClick={() => handleDelete(currentHerb.id)}>Yes, Delete</button>
            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Comment on {currentHerb.name}</h2>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment..."
            />
            <button onClick={() => handleAddComment(currentHerb.id)}>Add Comment</button>
            <button onClick={() => setShowCommentModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Image Upload Modal */}
      {showImageUploadModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Upload Image for {currentHerb.name}</h2>
            <input type="file" onChange={handleImageUpload} />
            <button onClick={handleSaveImage}>Save Image</button>
            <button onClick={() => setShowImageUploadModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
