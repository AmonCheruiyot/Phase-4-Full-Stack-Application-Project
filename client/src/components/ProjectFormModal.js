import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './ModalForm.css';

const ProjectFormModal = ({ isOpen, onRequestClose, onSuccess, initialProject }) => {
  const [project, setProject] = useState({ title: '', description: '', rate: '', freelancer_id: '', client_id: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialProject) {
      setProject(initialProject);
    } else {
      setProject({ title: '', description: '', rate: '', freelancer_id: '', client_id: '' });
    }
  }, [initialProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = initialProject ? 'PUT' : 'POST';
    const url = `http://localhost:5555/projects${initialProject ? `/${initialProject.id}` : ''}`;

    try {
      const response = await fetch(url, {
        method,
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
        setError(`Error ${initialProject ? 'updating' : 'creating'} project: ${errorData.errors.join(', ')}`);
      }
    } catch (error) {
      setError(`Error ${initialProject ? 'updating' : 'creating'} project: ${error.message}`);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={initialProject ? 'Edit Project' : 'Add Project'}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2>{initialProject ? 'Edit Project' : 'Add Project'}</h2>
          <button onClick={onRequestClose} className="close-button">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={project.title}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={project.description}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Rate:
              <input
                type="number"
                name="rate"
                value={project.rate}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Freelancer ID:
              <input
                type="number"
                name="freelancer_id"
                value={project.freelancer_id}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Client ID:
              <input
                type="number"
                name="client_id"
                value={project.client_id}
                onChange={handleChange}
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
