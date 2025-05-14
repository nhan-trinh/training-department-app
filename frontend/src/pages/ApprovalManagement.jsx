import React from 'react';
import CourseRegistrations from '../components/CourseRegistrations';
import RetakeRequests from '../components/RetakeRequests';

const ApprovalManagement = () => {
  return (
    <div>
      <h1>Approval Management</h1>
      <h2>Course Registrations</h2>
      <CourseRegistrations />
      
      <h2>Retake Requests</h2>
      <RetakeRequests />
    </div>
  );
};

export default ApprovalManagement;