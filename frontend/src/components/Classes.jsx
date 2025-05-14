import React, { useState, useEffect } from 'react';
import { fetchClasses, createClass, updateClass, deleteClass } from '../api';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    courseId: '',
    schedule: '',
    room: '',
    maxStudents: 0,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const response = await fetchClasses();
      setClasses(response.data);
    } catch (error) {
      console.error('Failed to load classes:', error);
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
        await updateClass(editingId, formData);
      } else {
        await createClass(formData);
      }
      loadClasses();
      setFormData({ name: '', courseId: '', schedule: '', room: '', maxStudents: 0 });
      setEditingId(null);
    } catch (error) {
      console.error('Failed to save class:', error);
    }
  };

  const handleEdit = (classItem) => {
    setFormData(classItem);
    setEditingId(classItem._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteClass(id);
      loadClasses();
    } catch (error) {
      console.error('Failed to delete class:', error);
    }
  };

  return (
    <div>
      <h2>Class Management</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Class Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Course ID:</label>
          <input
            type="text"
            name="courseId"
            value={formData.courseId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Schedule:</label>
          <input
            type="text"
            name="schedule"
            value={formData.schedule}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Room:</label>
          <input
            type="text"
            name="room"
            value={formData.room}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Max Students:</label>
          <input
            type="number"
            name="maxStudents"
            value={formData.maxStudents}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">{editingId ? 'Update' : 'Add'} Class</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Course ID</th>
            <th>Schedule</th>
            <th>Room</th>
            <th>Max Students</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem._id}>
              <td>{classItem.name}</td>
              <td>{classItem.courseId}</td>
              <td>{classItem.schedule}</td>
              <td>{classItem.room}</td>
              <td>{classItem.maxStudents}</td>
              <td>
                <button onClick={() => handleEdit(classItem)}>Edit</button>
                <button onClick={() => handleDelete(classItem._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Classes;