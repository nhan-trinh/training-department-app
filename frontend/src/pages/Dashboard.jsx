import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1>Training Department Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/courses">Course Management</Link></li>
          <li><Link to="/classes">Class Management</Link></li>
          <li><Link to="/teacher-assignments">Teacher Assignments</Link></li>
          <li><Link to="/course-registrations">Course Registrations</Link></li>
          <li><Link to="/retake-requests">Retake Requests</Link></li>
          <li><Link to="/regulations">Regulations</Link></li>
          <li><Link to="/grades-report">Grades Report</Link></li>
          <li><Link to="/notifications">Notifications</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;