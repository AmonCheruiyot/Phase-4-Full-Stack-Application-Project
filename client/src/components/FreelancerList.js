import React from 'react';
import './FreelancerList.css';

const FreelancerList = ({ freelancers, openFreelancerForm, handleSuccess }) => {
  const handleEdit = (freelancer) => {
    openFreelancerForm(freelancer);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this freelancer?')) {
      fetch(`http://localhost:5555/freelancers/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            handleSuccess();
          } else {
            throw new Error('Failed to delete freelancer');
          }
        })
        .catch(error => {
          console.error('Error deleting freelancer:', error);
        });
    }
  };

  return (
    <div className="container">
      <h2>Freelancers</h2>
      <table className="freelancer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Rate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {freelancers.map(freelancer => (
            <tr key={freelancer.id}>
              <td data-label="Name">{freelancer.name}</td>
              <td data-label="Username">{freelancer.username}</td>
              <td data-label="Email">{freelancer.email}</td>
              <td data-label="Rate">{freelancer.rate}</td>
              <td data-label="Action">
                <div className="action-buttons">
                  <button className="edit-button" onClick={() => handleEdit(freelancer)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(freelancer.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-freelancer-button" onClick={() => openFreelancerForm(null)}>Add Freelancer</button>
    </div>
  );
};

export default FreelancerList;
