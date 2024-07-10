import React, { useState } from 'react';
import Modal from 'react-modal';
import './ModalForm.css';

const FreelancerFormModal = ({ isOpen, onRequestClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [rate, setRate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFreelancer = { name, username, email, rate };
    try {
      const response = await fetch('http://localhost:5555/freelancers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFreelancer),
      });
      if (response.ok) {
        onSuccess();
        onRequestClose();
      } else {
        const errorData = await response.json();
        setError('Error creating freelancer: ' + errorData.errors.join(', '));
      }
    } catch (error) {
      setError('Error creating freelancer: ' + error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Add Freelancer">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Freelancer</h2>
          <button onClick={onRequestClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Rate:
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="modal-footer">
            <button type="button" className="cancel-button" onClick={onRequestClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Freelancer
            </button>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </Modal>
  );
};

export default FreelancerFormModal;
