import React from 'react';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Dashboard</h1>
      <nav className="dashboard-nav">
        <ul>
          <li>
            <Link to="/merge-pdfs">Merge PDFs</Link>
          </li>
          <li>
            <Link to="/split-pdf">Split PDF</Link>
          </li>
          <li>
            <Link to="/rotate-pdf">Rotate PDF</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;