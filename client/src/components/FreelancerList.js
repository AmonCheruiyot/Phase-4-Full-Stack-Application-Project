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
          // Refresh freelancer list after deletion
          handleSuccess();  // Call the handleSuccess method to refresh the list
        } else {
          throw new Error('Failed to delete freelancer');
        }
      })
      .catch(error => {
        console.error('Error deleting freelancer:', error);
        // Handle error state
      });
    }
  };

  return (
    <div>
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
              <td>{freelancer.name}</td>
              <td>{freelancer.username}</td>
              <td>{freelancer.email}</td>
              <td>{freelancer.rate}</td>
              <td>
                <button onClick={() => handleEdit(freelancer)}>Edit</button>
                <button onClick={() => handleDelete(freelancer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => openFreelancerForm(null)}>Add Freelancer</button>
    </div>
  );
};

export default FreelancerList;
