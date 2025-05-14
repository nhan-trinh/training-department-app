import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CourseManagement from './pages/CourseManagement';
import ClassManagement from './pages/ClassManagement';
import ApprovalManagement from './pages/ApprovalManagement';
import ReportView from './pages/ReportView';
import RegulationView from './pages/RegulationView';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<CourseManagement />} />
          <Route path="/classes" element={<ClassManagement />} />
          <Route path="/teacher-assignments" element={<ApprovalManagement />} />
          <Route path="/course-registrations" element={<ApprovalManagement />} />
          <Route path="/retake-requests" element={<ApprovalManagement />} />
          <Route path="/regulations" element={<RegulationView />} />
          <Route path="/grades-report" element={<ReportView />} />
          <Route path="/notifications" element={<RegulationView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;