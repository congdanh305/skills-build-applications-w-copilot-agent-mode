import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Menu with Logo */}
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img
                src={process.env.PUBLIC_URL + '/octofitapp-small.png'}
                alt="OctoFit Logo"
                className="logo-image"
              />
              OctoFit
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    👥 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    👫 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    🏃 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏆 Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <div className="container">
            <p>&copy; 2024 OctoFit Tracker - Your Personal Fitness Hub</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

// Home component
function Home() {
  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <h1 className="display-3">🐙 Welcome to OctoFit Tracker</h1>
        <p className="lead mt-3">
          Track your fitness activities, manage your team, and compete on the leaderboard!
        </p>
        <hr className="my-4" />
        <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">👥 Users</h5>
                <p className="card-text">View and manage all users in the system.</p>
                <Link to="/users" className="btn btn-primary">
                  View Users
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">👫 Teams</h5>
                <p className="card-text">Create and manage competitive teams.</p>
                <Link to="/teams" className="btn btn-primary">
                  View Teams
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">🏃 Activities</h5>
                <p className="card-text">Log and track all fitness activities.</p>
                <Link to="/activities" className="btn btn-primary">
                  View Activities
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">🏆 Leaderboard</h5>
                <p className="card-text">Check your ranking and compete with others.</p>
                <Link to="/leaderboard" className="btn btn-primary">
                  View Leaderboard
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">💪 Workouts</h5>
                <p className="card-text">Get personalized workout suggestions.</p>
                <Link to="/workouts" className="btn btn-primary">
                  View Workouts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
