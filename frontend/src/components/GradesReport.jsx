import React, { useState, useEffect } from 'react';
import { fetchGrades } from '../api';

const GradesReport = () => {
  const [grades, setGrades] = useState([]);
  const [filters, setFilters] = useState({
    studentId: '',
    courseId: '',
    classId: '',
  });

  useEffect(() => {
    loadGrades();
  }, []);

  const loadGrades = async () => {
    try {
      const response = await fetchGrades();
      setGrades(response.data);
    } catch (error) {
      console.error('Failed to load grades:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredGrades = grades.filter(grade => {
    return (
      (filters.studentId === '' || grade.studentId.includes(filters.studentId)) &&
      (filters.courseId === '' || grade.courseId.includes(filters.courseId)) &&
      (filters.classId === '' || grade.classId.includes(filters.classId))
    );
  });

  return (
    <div>
      <h2>Grades Report</h2>
      <div>
        <label>Filter by Student ID:</label>
        <input
          type="text"
          name="studentId"
          value={filters.studentId}
          onChange={handleFilterChange}
        />
      </div>
      <div>
        <label>Filter by Course ID:</label>
        <input
          type="text"
          name="courseId"
          value={filters.courseId}
          onChange={handleFilterChange}
        />
      </div>
      <div>
        <label>Filter by Class ID:</label>
        <input
          type="text"
          name="classId"
          value={filters.classId}
          onChange={handleFilterChange}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Course ID</th>
            <th>Class ID</th>
            <th>Grade</th>
            <th>Status</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {filteredGrades.map((grade) => (
            <tr key={grade._id}>
              <td>{grade.studentId}</td>
              <td>{grade.courseId}</td>
              <td>{grade.classId}</td>
              <td>{grade.grade}</td>
              <td>{grade.status}</td>
              <td>{grade.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradesReport;