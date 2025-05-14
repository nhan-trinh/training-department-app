import React, { useState, useEffect } from 'react';
import { fetchTeacherAssignments, createTeacherAssignment, updateTeacherAssignment, deleteTeacherAssignment } from '..  /api';

const TeacherAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({
    teacherId: '',
    classId: '',
    assignmentDate: '',
    status: 'active',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      const response = await fetchTeacherAssignments();
      setAssignments(response.data);
    } catch (error) {
      console.error('Failed to load teacher assignments:', error);
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
        await updateTeacherAssignment(editingId, formData);
      } else {
        await createTeacherAssignment(formData);
      }
      loadAssignments();
      setFormData({ teacherId: '', classId: '', assignmentDate: '', status: 'active' });
      setEditingId(null);
    } catch (error) {
      console.error('Failed to save teacher assignment:', error);
    }
  };

  const handleEdit = (assignment) => {
    setFormData(assignment);
    setEditingId(assignment._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTeacherAssignment(id);
      loadAssignments();
    } catch (error) {
      console.error('Failed to delete teacher assignment:', error);
    }
  };

  return (
    <div>
      <h2>Teacher Assignments</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Teacher ID:</label>
          <input
            type="text"
            name="teacherId"
            value={formData.teacherId}
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
          <label>Assignment Date:</label>
          <input
            type="date"
            name="assignmentDate"
            value={formData.assignmentDate}
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="submit">{editingId ? 'Update' : 'Add'} Assignment</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Teacher ID</th>
            <th>Class ID</th>
            <th>Assignment Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id}>
              <td>{assignment.teacherId}</td>
              <td>{assignment.classId}</td>
              <td>{new Date(assignment.assignmentDate).toLocaleDateString()}</td>
              <td>{assignment.status}</td>
              <td>
                <button onClick={() => handleEdit(assignment)}>Edit</button>
                <button onClick={() => handleDelete(assignment._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherAssignments;