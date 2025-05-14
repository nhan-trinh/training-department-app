import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  });

export const fetchCourses = () => api.get('/courses');
export const createCourse = (courseData) => api.post('/courses', courseData);
export const updateCourse = (id, courseData) => api.put(`/courses/${id}`, courseData);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);


export const fetchClasses = () => api.get('/classes');
export const createClass = (classData) => api.post('/classes', classData);
export const updateClass = (id, classData) => api.put(`/classes/${id}`, classData);
export const deleteClass = (id) => api.delete(`/classes/${id}`);

export const fetchTeacherAssignments = () => api.get('/teacher-assignments');
export const createTeacherAssignment = (assignmentData) => api.post('/teacher-assignments', assignmentData);
export const updateTeacherAssignment = (id, assignmentData) => api.put(`/teacher-assignments/${id}`, assignmentData);
export const deleteTeacherAssignment = (id) => api.delete(`/teacher-assignments/${id}`);


export const fetchCourseRegistrations = () => api.get('/course-registrations');
export const createCourseRegistration = (registrationData) => api.post('/course-registrations', registrationData);
export const updateCourseRegistration = (id, registrationData) => api.put(`/course-registrations/${id}`, registrationData);
export const deleteCourseRegistration = (id) => api.delete(`/course-registrations/${id}`);


export const fetchRetakeExams = () => api.get('/retake-exams');
export const createRetakeExam = (examData) => api.post('/retake-exams', examData);
export const updateRetakeExam = (id, examData) => api.put(`/retake-exams/${id}`, examData);
export const deleteRetakeExam = (id) => api.delete(`/retake-exams/${id}`);

export const fetchRetakeCourses = () => api.get('/retake-courses');
export const createRetakeCourse = (courseData) => api.post('/retake-courses', courseData);
export const updateRetakeCourse = (id, courseData) => api.put(`/retake-courses/${id}`, courseData);
export const deleteRetakeCourse = (id) => api.delete(`/retake-courses/${id}`);


export const fetchRegulations = () => api.get('/regulations');
export const createRegulation = (regulationData) => api.post('/regulations', regulationData);
export const updateRegulation = (id, regulationData) => api.put(`/regulations/${id}`, regulationData);
export const deleteRegulation = (id) => api.delete(`/regulations/${id}`);


export const fetchGrades = () => api.get('/grades');
export const createGrade = (gradeData) => api.post('/grades', gradeData);
export const updateGrade = (id, gradeData) => api.put(`/grades/${id}`, gradeData);
export const deleteGrade = (id) => api.delete(`/grades/${id}`);


export const fetchNotifications = () => api.get('/notifications');
export const createNotification = (notificationData) => api.post('/notifications', notificationData);
export const updateNotification = (id, notificationData) => api.put(`/notifications/${id}`, notificationData);
export const deleteNotification = (id) => api.delete(`/notifications/${id}`);

export default api;