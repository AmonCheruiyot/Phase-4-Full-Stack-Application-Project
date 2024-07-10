import React, { useState } from 'react';
import Modal from 'react-modal';
import './ModalForm.css';

const ProjectFormModal = ({ isOpen, onRequestClose, onSuccess, initialProject }) => {
  const [project, setProject] = useState(initialProject ? initialProject : { name: '', description: '' });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5555/projects/${initialProject ? initialProject.id : ''}`, {
        method: initialProject ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });
      if (response.ok) {
        onSuccess();
        onRequestClose();
      } else {
        const errorData = await response.json();
        setError('Error ' + (initialProject ? 'updating' : 'creating') + ' project: ' + errorData.errors.join(', '));
      }
    } catch (error) {
      setError('Error ' + (initialProject ? 'updating' : 'creating') + ' project: ' + error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={initialProject ? 'Edit Project' : 'Add Project'}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{initialProject ? 'Edit Project' : 'Add Project'}</h2>
          <button onClick={onRequestClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <label>
              Name:
              <input
                type="text"
                value={project.name}
                onChange={(e) => setProject({ ...project, name: e.target.value })}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
                required
              />
            </label>
          </div>
          <div className="modal-footer">
            <button type="button" className="cancel-button" onClick={onRequestClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {initialProject ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </Modal>
  );
};

export default ProjectFormModal;
