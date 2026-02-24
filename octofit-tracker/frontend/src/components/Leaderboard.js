import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        let apiUrl;
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        if (codespaceName) {
          apiUrl = `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;
        } else {
          apiUrl = `http://localhost:8000/api/leaderboard/`;
        }
        
        console.log('Fetching leaderboard from API endpoint:', apiUrl);
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log('Fetched leaderboard data:', data);
        
        // Handle both paginated and plain array responses
        const leaderboardList = data.results || (Array.isArray(data) ? data : []);
        setLeaderboard(leaderboardList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="page-header">
          <h2>🏆 Leaderboard</h2>
        </div>
        <div className="alert alert-info" role="alert">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Loading leaderboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="page-header">
          <h2>🏆 Leaderboard</h2>
        </div>
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="container mt-4">
      <div className="page-header">
        <h2>🏆 Competitive Leaderboard</h2>
        <p>See how you rank against other users</p>
      </div>

      {leaderboard.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <h4>No Leaderboard Data</h4>
          <p className="empty-state-text">Start activities to earn points and climb the rankings.</p>
        </div>
      ) : (
        <div className="row">
          {/* Top 3 Podium */}
          <div className="col-md-12 mb-4">
            <div className="row">
              {leaderboard.slice(0, 3).map((entry, index) => (
                <div className="col-md-4" key={entry.id}>
                  <div className="card text-center h-100" style={{ borderTop: `4px solid #${['FFD700', 'C0C0C0', 'CD7F32'][index]}` }}>
                    <div className="card-body">
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                        {getMedalEmoji(index + 1)}
                      </div>
                      <h5 className="card-title">{entry.user}</h5>
                      <p className="card-text">
                        <strong style={{ fontSize: '1.5rem' }}>{entry.points}</strong> points
                      </p>
                      <span className="badge bg-primary">Rank #{index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Leaderboard Table */}
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Full Rankings</h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-hover mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">User</th>
                        <th scope="col">Points</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((entry, index) => (
                        <tr key={entry.id}>
                          <td>
                            <span className="badge bg-primary fs-6">
                              {getMedalEmoji(index + 1)}
                            </span>
                          </td>
                          <td>
                            <strong>{entry.user}</strong>
                          </td>
                          <td>
                            <span className="badge bg-success" style={{ fontSize: '1rem' }}>
                              {entry.points} pts
                            </span>
                          </td>
                          <td>
                            {index < 3 ? (
                              <span className="badge bg-warning text-dark">Top Performer</span>
                            ) : (
                              <span className="badge bg-secondary">Active</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              Leaderboard Statistics
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <strong>Total Participants:</strong>{' '}
                    <span className="badge bg-primary fs-6">{leaderboard.length}</span>
                  </p>
                </div>
                <div className="col-md-4">
                  {leaderboard.length > 0 && (
                    <p>
                      <strong>Top Score:</strong>{' '}
                      <span className="badge bg-success fs-6">
                        {Math.max(...leaderboard.map((e) => e.points))} pts
                      </span>
                    </p>
                  )}
                </div>
                <div className="col-md-4">
                  {leaderboard.length > 0 && (
                    <p>
                      <strong>Average Points:</strong>{' '}
                      <span className="badge bg-info text-dark fs-6">
                        {(leaderboard.reduce((sum, e) => sum + e.points, 0) / leaderboard.length).toFixed(0)} pts
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
