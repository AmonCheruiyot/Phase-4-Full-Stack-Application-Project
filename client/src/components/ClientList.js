import React from 'react';
import './ClientList.css';

const ClientList = ({ clients, openClientForm, handleSuccess }) => {
  const handleEdit = (client) => {
    openClientForm(client);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      fetch(`http://localhost:5555/clients/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            handleSuccess();
          } else {
            throw new Error('Failed to delete client');
          }
        })
        .catch(error => {
          console.error('Error deleting client:', error);
        });
    }
  };

  return (
    <div className="container">
      <h2>Clients</h2>
      <table className="client-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td data-label="Name">{client.name}</td>
              <td data-label="Username">{client.username}</td>
              <td data-label="Email">{client.email}</td>
              <td data-label="Action">
                <div className="action-buttons">
                  <button className="edit-button" onClick={() => handleEdit(client)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(client.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-client-button" onClick={() => openClientForm(null)}>Add Client</button>
    </div>
  );
};

export default ClientList;
