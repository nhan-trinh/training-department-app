import React, { useState, useEffect } from 'react';
import { fetchRegulations, createRegulation, updateRegulation, deleteRegulation } from '../api';

const Regulations = () => {
  const [regulations, setRegulations] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    effectiveDate: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadRegulations();
  }, []);

  const loadRegulations = async () => {
    try {
      const response = await fetchRegulations();
      setRegulations(response.data);
    } catch (error) {
      console.error('Failed to load regulations:', error);
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
        await updateRegulation(editingId, formData);
      } else {
        await createRegulation(formData);
      }
      loadRegulations();
      setFormData({ title: '', description: '', category: '', effectiveDate: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Failed to save regulation:', error);
    }
  };

  const handleEdit = (regulation) => {
    setFormData(regulation);
    setEditingId(regulation._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRegulation(id);
      loadRegulations();
    } catch (error) {
      console.error('Failed to delete regulation:', error);
    }
  };

  return (
    <div>
      <h2>Regulations</h2>
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
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Effective Date:</label>
          <input
            type="date"
            name="effectiveDate"
            value={formData.effectiveDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">{editingId ? 'Update' : 'Add'} Regulation</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Effective Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {regulations.map((regulation) => (
            <tr key={regulation._id}>
              <td>{regulation.title}</td>
              <td>{regulation.description}</td>
              <td>{regulation.category}</td>
              <td>{new Date(regulation.effectiveDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(regulation)}>Edit</button>
                <button onClick={() => handleDelete(regulation._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Regulations;