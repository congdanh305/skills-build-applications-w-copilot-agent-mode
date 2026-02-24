import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        let apiUrl;
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        if (codespaceName) {
          apiUrl = `https://${codespaceName}-8000.app.github.dev/api/workouts/`;
        } else {
          apiUrl = `http://localhost:8000/api/workouts/`;
        }
        
        console.log('Fetching workouts from API endpoint:', apiUrl);
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log('Fetched workouts data:', data);
        
        // Handle both paginated and plain array responses
        const workoutsList = data.results || (Array.isArray(data) ? data : []);
        setWorkouts(workoutsList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="page-header">
          <h2>💪 Workouts</h2>
        </div>
        <div className="alert alert-info" role="alert">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Loading workouts...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="page-header">
          <h2>💪 Workouts</h2>
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
        <h2>💪 Personalized Workouts</h2>
        <p>Get tailored workout suggestions based on your performance</p>
      </div>

      {workouts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🤸</div>
          <h4>No Workouts Available</h4>
          <p className="empty-state-text">More workout suggestions will be available as you log activities.</p>
          <button className="btn btn-primary mt-3">Request Suggestion</button>
        </div>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div className="col-md-6 mb-4" key={workout.id}>
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="mb-0">{workout.workout}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <strong>User:</strong> <span className="badge bg-info text-dark">{workout.user}</span>
                  </p>
                  <p className="card-text">
                    <strong>Suggestion:</strong>
                  </p>
                  <div className="alert alert-info mb-0">
                    {workout.suggestion}
                  </div>
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-sm btn-success me-2">✓ Accept</button>
                  <button className="btn btn-sm btn-warning me-2">⟲ Get New</button>
                  <button className="btn btn-sm btn-danger">✕ Dismiss</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alternate Table View */}
      {workouts.length > 0 && (
        <>
          <h3 className="mt-5">All Workouts</h3>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">User</th>
                  <th scope="col">Workout</th>
                  <th scope="col">Suggestion</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout) => (
                  <tr key={workout.id}>
                    <td>
                      <span className="badge bg-primary">{workout.id}</span>
                    </td>
                    <td>
                      <strong>{workout.user}</strong>
                    </td>
                    <td>{workout.workout}</td>
                    <td>{workout.suggestion.substring(0, 50)}...</td>
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
        </>
      )}

      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              Workout Statistics
            </div>
            <div className="card-body">
              <p>
                <strong>Total Workouts:</strong> <span className="badge bg-primary">{workouts.length}</span>
              </p>
              {workouts.length > 0 && (
                <p>
                  <strong>Active Users:</strong>{' '}
                  <span className="badge bg-success">
                    {new Set(workouts.map((w) => w.user)).size}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
