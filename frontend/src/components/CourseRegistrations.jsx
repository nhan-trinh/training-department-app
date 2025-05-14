import React, { useState, useEffect } from 'react';
import { fetchCourseRegistrations, createCourseRegistration, updateCourseRegistration, deleteCourseRegistration } from '../api';

const CourseRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    classId: '',
    registrationDate: '',
    status: 'pending',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    try {
      const response = await fetchCourseRegistrations();
      setRegistrations(response.data);
    } catch (error) {
      console.error('Failed to load course registrations:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateCourseRegistration(editingId, formData);
      } else {
        await createCourseRegistration(formData);
      }
      loadRegistrations();
      setFormData({ studentId: '', classId: '', registrationDate: '', status: 'pending' });
      setEditingId(null);
    } catch (error) {
      console.error('Failed to save course registration:', error);
    }
  };

  const handleEdit = (registration) => {
    setFormData(registration);
    setEditingId(registration._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourseRegistration(id);
      loadRegistrations();
    } catch (error) {
      console.error('Failed to delete course registration:', error);
    }
  };

  return (
    <div>
      <h2>Course Registrations</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student ID:</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Class ID:</label>
          <input
            type="text"
            name="classId"
            value={formData.classId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Registration Date:</label>
          <input
            type="date"
            name="registrationDate"
            value={formData.registrationDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit">{editingId ? 'Update' : 'Add'} Registration</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Class ID</th>
            <th>Registration Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration) => (
            <tr key={registration._id}>
              <td>{registration.studentId}</td>
              <td>{registration.classId}</td>
              <td>{new Date(registration.registrationDate).toLocaleDateString()}</td>
              <td>{registration.status}</td>
              <td>
                <button onClick={() => handleEdit(registration)}>Edit</button>
                <button onClick={() => handleDelete(registration._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseRegistrations;