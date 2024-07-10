import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './ModalForm.css';

const ClientFormModal = ({ isOpen, onRequestClose, onSuccess, initialData }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setUsername(initialData.username);
      setEmail(initialData.email);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedClient = { name, username, email };
    try {
      const response = await fetch(`http://localhost:5555/clients/${initialData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedClient),
      });
      if (response.ok) {
        onSuccess();
        onRequestClose();
      } else {
        const errorData = await response.json();
        setError('Error updating client: ' + errorData.errors.join(', '));
      }
    } catch (error) {
      setError('Error updating client: ' + error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Edit Client">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Client</h2>
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
          </div>
          <div className="modal-footer">
            <button type="button" className="cancel-button" onClick={onRequestClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Update Client
            </button>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </Modal>
  );
};

export default ClientFormModal;
