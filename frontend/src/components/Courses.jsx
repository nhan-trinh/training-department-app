import React, { useState, useEffect } from 'react';
import { fetchCourses, createCourse, updateCourse, deleteCourse } from '../api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    creditHours: 0,
    department: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await fetchCourses();
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to load courses:', error);
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
        await updateCourse(editingId, formData);
      } else {
        await createCourse(formData);
      }
      loadCourses();
      setFormData({ name: '', description: '', creditHours: 0, department: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Failed to save course:', error);
    }
  };

  const handleEdit = (course) => {
    setFormData(course);
    setEditingId(course._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      loadCourses();
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  return (
    <div>
      <h2>Course Management</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Credit Hours:</label>
          <input
            type="number"
            name="creditHours"
            value={formData.creditHours}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">{editingId ? 'Update' : 'Add'} Course</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Credit Hours</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{course.creditHours}</td>
              <td>{course.department}</td>
              <td>
                <button onClick={() => handleEdit(course)}>Edit</button>
                <button onClick={() => handleDelete(course._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Courses;