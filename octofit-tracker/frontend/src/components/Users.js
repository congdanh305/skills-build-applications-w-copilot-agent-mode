import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let apiUrl;
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        if (codespaceName) {
          apiUrl = `https://${codespaceName}-8000.app.github.dev/api/users/`;
        } else {
          apiUrl = `http://localhost:8000/api/users/`;
        }
        
        console.log('Fetching users from API endpoint:', apiUrl);
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log('Fetched users data:', data);
        
        // Handle both paginated and plain array responses
        const usersList = data.results || (Array.isArray(data) ? data : []);
        setUsers(usersList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="page-header">
          <h2>👥 Users</h2>
        </div>
        <div className="alert alert-info" role="alert">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Loading users...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="page-header">
          <h2>👥 Users</h2>
        </div>
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="page-header">
        <h2>👥 Users Management</h2>
        <p>Manage and view all users in the system</p>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👤</div>
          <h4>No Users Found</h4>
          <p className="empty-state-text">Start by adding new users to the system.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Team</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span className="badge bg-primary">{user.id}</span>
                  </td>
                  <td>
                    <strong>{user.name}</strong>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge bg-info text-dark">{user.team || 'N/A'}</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">View</button>
                    <button className="btn btn-sm btn-warning me-2">Edit</button>
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              Statistics
            </div>
            <div className="card-body">
              <p>
                <strong>Total Users:</strong> <span className="badge bg-primary">{users.length}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
