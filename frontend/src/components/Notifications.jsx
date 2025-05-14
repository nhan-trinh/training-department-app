import React, { useState, useEffect } from 'react';
import { fetchNotifications, createNotification, updateNotification, deleteNotification } from '../api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    recipientType: 'all',
    recipientId: '',
    sendDate: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await fetchNotifications();
      setNotifications(response.data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
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
        await updateNotification(editingId, formData);
      } else {
        await createNotification(formData);
      }
      loadNotifications();
      setFormData({ title: '', message: '', recipientType: 'all', recipientId: '', sendDate: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Failed to save notification:', error);
    }
  };

  const handleEdit = (notification) => {
    setFormData(notification);
    setEditingId(notification._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      loadNotifications();
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Recipient Type:</label>
          <select
            name="recipientType"
            value={formData.recipientType}
            onChange={handleInputChange}
          >
            <option value="all">All</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="class">Class</option>
          </select>
        </div>
        {formData.recipientType !== 'all' && (
          <div>
            <label>Recipient ID:</label>
            <input
              type="text"
              name="recipientId"
              value={formData.recipientId}
              onChange={handleInputChange}
              required={formData.recipientType !== 'all'}
            />
          </div>
        )}
        <div>
          <label>Send Date:</label>
          <input
            type="datetime-local"
            name="sendDate"
            value={formData.sendDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">{editingId ? 'Update' : 'Send'} Notification</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Message</th>
            <th>Recipient</th>
            <th>Send Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr key={notification._id}>
              <td>{notification.title}</td>
              <td>{notification.message}</td>
              <td>
                {notification.recipientType === 'all' 
                  ? 'All' 
                  : `${notification.recipientType}: ${notification.recipientId}`}
              </td>
              <td>{new Date(notification.sendDate).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEdit(notification)}>Edit</button>
                <button onClick={() => handleDelete(notification._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notifications;