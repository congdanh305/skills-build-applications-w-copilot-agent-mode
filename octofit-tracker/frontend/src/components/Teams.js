import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        let apiUrl;
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        if (codespaceName) {
          apiUrl = `https://${codespaceName}-8000.app.github.dev/api/teams/`;
        } else {
          apiUrl = `http://localhost:8000/api/teams/`;
        }
        
        console.log('Fetching teams from API endpoint:', apiUrl);
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log('Fetched teams data:', data);
        
        // Handle both paginated and plain array responses
        const teamsList = data.results || (Array.isArray(data) ? data : []);
        setTeams(teamsList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="page-header">
          <h2>👫 Teams</h2>
        </div>
        <div className="alert alert-info" role="alert">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Loading teams...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="page-header">
          <h2>👫 Teams</h2>
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
        <h2>👫 Teams Management</h2>
        <p>Create and manage competitive teams</p>
      </div>

      {teams.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏢</div>
          <h4>No Teams Found</h4>
          <p className="empty-state-text">Create your first team to get started.</p>
          <button className="btn btn-primary mt-3">Create Team</button>
        </div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div className="col-md-6 mb-4" key={team.id}>
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="mb-0">{team.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <strong>Team ID:</strong> <span className="badge bg-primary">{team.id}</span>
                  </p>
                  <p className="card-text">
                    <strong>Description:</strong> {team.description || 'N/A'}
                  </p>
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-sm btn-primary me-2">View Details</button>
                  <button className="btn btn-sm btn-warning me-2">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              Team Statistics
            </div>
            <div className="card-body">
              <p>
                <strong>Total Teams:</strong> <span className="badge bg-primary">{teams.length}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teams;
