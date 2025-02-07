// src/components/ComplaintList.js
import React, { useEffect, useState } from 'react';
import {
  getComplaints,
  createComplaint,
  updateComplaint,
  deleteComplaint,
} from '../../Api/crm.js';


const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState({ customer: '', description: '' });
  const [editingComplaint, setEditingComplaint] = useState(null);

  // جلب قائمة الشكاوى عند تحميل المكون
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getComplaints();
      setComplaints(data);
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
    }
  };

  const handleAddComplaint = async () => {
    try {
      const data = await createComplaint(newComplaint);
      setComplaints([...complaints, data]);
      setNewComplaint({ customer: '', description: '' }); // إعادة تعيين الحقول
    } catch (error) {
      console.error('Failed to add complaint:', error);
    }
  };

  const handleUpdateComplaint = async () => {
    try {
      const data = await updateComplaint(editingComplaint.id, editingComplaint);
      setComplaints(complaints.map((complaint) => (complaint.id === data.id ? data : complaint)));
      setEditingComplaint(null); // إنهاء وضع التحرير
    } catch (error) {
      console.error('Failed to update complaint:', error);
    }
  };

  const handleDeleteComplaint = async (id) => {
    try {
      await deleteComplaint(id);
      setComplaints(complaints.filter((complaint) => complaint.id !== id));
    } catch (error) {
      console.error('Failed to delete complaint:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>قائمة الشكاوى</h1>

      {/* إضافة شكوى جديدة */}
      <div style={{ marginBottom: '20px' }}>
        <h3>إضافة شكوى جديدة</h3>
        <input
          type="text"
          placeholder="ID العميل"
          value={newComplaint.customer}
          onChange={(e) => setNewComplaint({ ...newComplaint, customer: e.target.value })}
        />
        <textarea
          placeholder="وصف الشكوى"
          value={newComplaint.description}
          onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
        />
        <button onClick={handleAddComplaint}>إضافة</button>
      </div>

      {/* تعديل شكوى */}
      {editingComplaint && (
        <div style={{ marginBottom: '20px' }}>
          <h3>تعديل شكوى</h3>
          <input
            type="text"
            placeholder="ID العميل"
            value={editingComplaint.customer}
            onChange={(e) =>
              setEditingComplaint({ ...editingComplaint, customer: e.target.value })
            }
          />
          <textarea
            placeholder="وصف الشكوى"
            value={editingComplaint.description}
            onChange={(e) =>
              setEditingComplaint({ ...editingComplaint, description: e.target.value })
            }
          />
          <select
            value={editingComplaint.status}
            onChange={(e) =>
              setEditingComplaint({ ...editingComplaint, status: e.target.value })
            }
          >
            <option value="open">مفتوحة</option>
            <option value="resolved">تم الحل</option>
          </select>
          <button onClick={handleUpdateComplaint}>حفظ التعديلات</button>
          <button onClick={() => setEditingComplaint(null)}>إلغاء</button>
        </div>
      )}

      {/* قائمة الشكاوى */}
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID العميل</th>
            <th>وصف الشكوى</th>
            <th>الحالة</th>
            <th>تاريخ الإنشاء</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.id}</td>
              <td>{complaint.customer}</td>
              <td>{complaint.description}</td>
              <td>{complaint.status}</td>
              <td>{new Date(complaint.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => setEditingComplaint(complaint)}>تعديل</button>
                <button onClick={() => handleDeleteComplaint(complaint.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintList;