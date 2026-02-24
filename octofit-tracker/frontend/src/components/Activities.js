import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        let apiUrl;
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        if (codespaceName) {
          apiUrl = `https://${codespaceName}-8000.app.github.dev/api/activities/`;
        } else {
          apiUrl = `http://localhost:8000/api/activities/`;
        }
        
        console.log('Fetching activities from API endpoint:', apiUrl);
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log('Fetched activities data:', data);
        
        // Handle both paginated and plain array responses
        const activitiesList = data.results || (Array.isArray(data) ? data : []);
        setActivities(activitiesList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="page-header">
          <h2>🏃 Activities</h2>
        </div>
        <div className="alert alert-info" role="alert">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Loading activities...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="page-header">
          <h2>🏃 Activities</h2>
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
        <h2>🏃 Activities Log</h2>
        <p>Track and view all fitness activities</p>
      </div>

      {activities.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🚫</div>
          <h4>No Activities Found</h4>
          <p className="empty-state-text">Start logging your fitness activities.</p>
          <button className="btn btn-primary mt-3">Log Activity</button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">User</th>
                <th scope="col">Activity Type</th>
                <th scope="col">Distance (km)</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>
                    <span className="badge bg-primary">{activity.id}</span>
                  </td>
                  <td>{activity.user}</td>
                  <td>
                    <span className="badge bg-info text-dark text-uppercase">
                      {activity.type}
                    </span>
                  </td>
                  <td>
                    <strong>{activity.distance}</strong>
                  </td>
                  <td>
                    <strong>{activity.duration}</strong>
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
              Activity Statistics
            </div>
            <div className="card-body">
              <p>
                <strong>Total Activities:</strong> <span className="badge bg-primary">{activities.length}</span>
              </p>
              {activities.length > 0 && (
                <>
                  <p>
                    <strong>Total Distance:</strong>{' '}
                    <span className="badge bg-success">
                      {activities.reduce((sum, a) => sum + (a.distance || 0), 0).toFixed(1)} km
                    </span>
                  </p>
                  <p>
                    <strong>Total Duration:</strong>{' '}
                    <span className="badge bg-success">
                      {activities.reduce((sum, a) => sum + (a.duration || 0), 0)} minutes
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
