import React, { useState, useEffect } from 'react';
import { fetchRetakeExams, createRetakeExam, updateRetakeExam, deleteRetakeExam, fetchRetakeCourses, createRetakeCourse, updateRetakeCourse, deleteRetakeCourse } from '../api';

const RetakeRequests = () => {
  const [activeTab, setActiveTab] = useState('exams');
  const [retakeExams, setRetakeExams] = useState([]);
  const [retakeCourses, setRetakeCourses] = useState([]);
  
  const [examFormData, setExamFormData] = useState({
    studentId: '',
    examId: '',
    reason: '',
    status: 'pending',
  });
  
  const [courseFormData, setCourseFormData] = useState({
    studentId: '',
    courseId: '',
    reason: '',
    status: 'pending',
  });
  
  const [editingExamId, setEditingExamId] = useState(null);
  const [editingCourseId, setEditingCourseId] = useState(null);

  useEffect(() => {
    if (activeTab === 'exams') {
      loadRetakeExams();
    } else {
      loadRetakeCourses();
    }
  }, [activeTab]);

  const loadRetakeExams = async () => {
    try {
      const response = await fetchRetakeExams();
      setRetakeExams(response.data);
    } catch (error) {
      console.error('Failed to load retake exams:', error);
    }
  };

  const loadRetakeCourses = async () => {
    try {
      const response = await fetchRetakeCourses();
      setRetakeCourses(response.data);
    } catch (error) {
      console.error('Failed to load retake courses:', error);
    }
  };

  const handleExamInputChange = (e) => {
    const { name, value } = e.target;
    setExamFormData({ ...examFormData, [name]: value });
  };

  const handleCourseInputChange = (e) => {
    const { name, value } = e.target;
    setCourseFormData({ ...courseFormData, [name]: value });
  };

  const handleExamSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingExamId) {
        await updateRetakeExam(editingExamId, examFormData);
      } else {
        await createRetakeExam(examFormData);
      }
      loadRetakeExams();
      setExamFormData({ studentId: '', examId: '', reason: '', status: 'pending' });
      setEditingExamId(null);
    } catch (error) {
      console.error('Failed to save retake exam:', error);
    }
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourseId) {
        await updateRetakeCourse(editingCourseId, courseFormData);
      } else {
        await createRetakeCourse(courseFormData);
      }
      loadRetakeCourses();
      setCourseFormData({ studentId: '', courseId: '', reason: '', status: 'pending' });
      setEditingCourseId(null);
    } catch (error) {
      console.error('Failed to save retake course:', error);
    }
  };

  const handleEditExam = (exam) => {
    setExamFormData(exam);
    setEditingExamId(exam._id);
  };

  const handleEditCourse = (course) => {
    setCourseFormData(course);
    setEditingCourseId(course._id);
  };

  const handleDeleteExam = async (id) => {
    try {
      await deleteRetakeExam(id);
      loadRetakeExams();
    } catch (error) {
      console.error('Failed to delete retake exam:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await deleteRetakeCourse(id);
      loadRetakeCourses();
    } catch (error) {
      console.error('Failed to delete retake course:', error);
    }
  };

  return (
    <div>
      <h2>Retake Requests</h2>
      <div>
        <button onClick={() => setActiveTab('exams')} style={{ fontWeight: activeTab === 'exams' ? 'bold' : 'normal' }}>
          Exam Retakes
        </button>
        <button onClick={() => setActiveTab('courses')} style={{ fontWeight: activeTab === 'courses' ? 'bold' : 'normal' }}>
          Course Retakes
        </button>
      </div>

      {activeTab === 'exams' ? (
        <div>
          <h3>Exam Retakes</h3>
          <form onSubmit={handleExamSubmit}>
            <div>
              <label>Student ID:</label>
              <input
                type="text"
                name="studentId"
                value={examFormData.studentId}
                onChange={handleExamInputChange}
                required
              />
            </div>
            <div>
              <label>Exam ID:</label>
              <input
                type="text"
                name="examId"
                value={examFormData.examId}
                onChange={handleExamInputChange}
                required
              />
            </div>
            <div>
              <label>Reason:</label>
              <textarea
                name="reason"
                value={examFormData.reason}
                onChange={handleExamInputChange}
                required
              />
            </div>
            <div>
              <label>Status:</label>
              <select
                name="status"
                value={examFormData.status}
                onChange={handleExamInputChange}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <button type="submit">{editingExamId ? 'Update' : 'Add'} Exam Retake</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Exam ID</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {retakeExams.map((exam) => (
                <tr key={exam._id}>
                  <td>{exam.studentId}</td>
                  <td>{exam.examId}</td>
                  <td>{exam.reason}</td>
                  <td>{exam.status}</td>
                  <td>
                    <button onClick={() => handleEditExam(exam)}>Edit</button>
                    <button onClick={() => handleDeleteExam(exam._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h3>Course Retakes</h3>
          <form onSubmit={handleCourseSubmit}>
            <div>
              <label>Student ID:</label>
              <input
                type="text"
                name="studentId"
                value={courseFormData.studentId}
                onChange={handleCourseInputChange}
                required
              />
            </div>
            <div>
              <label>Course ID:</label>
              <input
                type="text"
                name="courseId"
                value={courseFormData.courseId}
                onChange={handleCourseInputChange}
                required
              />
            </div>
            <div>
              <label>Reason:</label>
              <textarea
                name="reason"
                value={courseFormData.reason}
                onChange={handleCourseInputChange}
                required
              />
            </div>
            <div>
              <label>Status:</label>
              <select
                name="status"
                value={courseFormData.status}
                onChange={handleCourseInputChange}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <button type="submit">{editingCourseId ? 'Update' : 'Add'} Course Retake</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Course ID</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {retakeCourses.map((course) => (
                <tr key={course._id}>
                  <td>{course.studentId}</td>
                  <td>{course.courseId}</td>
                  <td>{course.reason}</td>
                  <td>{course.status}</td>
                  <td>
                    <button onClick={() => handleEditCourse(course)}>Edit</button>
                    <button onClick={() => handleDeleteCourse(course._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RetakeRequests;