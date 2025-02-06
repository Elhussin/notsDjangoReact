// src/components/InteractionList.js
import React, { useEffect, useState } from 'react';
import {
  getInteractions,
  createInteraction,
  updateInteraction,
  deleteInteraction,
}  from '../../Api/crm.js';


const InteractionList = () => {
  const [interactions, setInteractions] = useState([]);
  const [newInteraction, setNewInteraction] = useState({ customer: '', interaction_type: '', notes: '' });
  const [editingInteraction, setEditingInteraction] = useState(null);

  // جلب قائمة التفاعلات عند تحميل المكون
  useEffect(() => {
    fetchInteractions();
  }, []);

  const fetchInteractions = async () => {
    try {
      const data = await getInteractions();
      setInteractions(data);
    } catch (error) {
      console.error('Failed to fetch interactions:', error);
    }
  };

  const handleAddInteraction = async () => {
    try {
      const data = await createInteraction(newInteraction);
      setInteractions([...interactions, data]);
      setNewInteraction({ customer: '', interaction_type: '', notes: '' }); // إعادة تعيين الحقول
    } catch (error) {
      console.error('Failed to add interaction:', error);
    }
  };

  const handleUpdateInteraction = async () => {
    try {
      const data = await updateInteraction(editingInteraction.id, editingInteraction);
      setInteractions(interactions.map((interaction) => (interaction.id === data.id ? data : interaction)));
      setEditingInteraction(null); // إنهاء وضع التحرير
    } catch (error) {
      console.error('Failed to update interaction:', error);
    }
  };

  const handleDeleteInteraction = async (id) => {
    try {
      await deleteInteraction(id);
      setInteractions(interactions.filter((interaction) => interaction.id !== id));
    } catch (error) {
      console.error('Failed to delete interaction:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>قائمة التفاعلات</h1>

      {/* إضافة تفاعل جديد */}
      <div style={{ marginBottom: '20px' }}>
        <h3>إضافة تفاعل جديد</h3>
        <input
          type="text"
          placeholder="ID العميل"
          value={newInteraction.customer}
          onChange={(e) => setNewInteraction({ ...newInteraction, customer: e.target.value })}
        />
        <select
          value={newInteraction.interaction_type}
          onChange={(e) => setNewInteraction({ ...newInteraction, interaction_type: e.target.value })}
        >
          <option value="">اختر نوع التفاعل</option>
          <option value="call">مكالمة</option>
          <option value="email">بريد إلكتروني</option>
          <option value="meeting">اجتماع</option>
        </select>
        <textarea
          placeholder="ملاحظات"
          value={newInteraction.notes}
          onChange={(e) => setNewInteraction({ ...newInteraction, notes: e.target.value })}
        />
        <button onClick={handleAddInteraction}>إضافة</button>
      </div>

      {/* تعديل تفاعل */}
      {editingInteraction && (
        <div style={{ marginBottom: '20px' }}>
          <h3>تعديل تفاعل</h3>
          <input
            type="text"
            placeholder="ID العميل"
            value={editingInteraction.customer}
            onChange={(e) =>
              setEditingInteraction({ ...editingInteraction, customer: e.target.value })
            }
          />
          <select
            value={editingInteraction.interaction_type}
            onChange={(e) =>
              setEditingInteraction({ ...editingInteraction, interaction_type: e.target.value })
            }
          >
            <option value="">اختر نوع التفاعل</option>
            <option value="call">مكالمة</option>
            <option value="email">بريد إلكتروني</option>
            <option value="meeting">اجتماع</option>
          </select>
          <textarea
            placeholder="ملاحظات"
            value={editingInteraction.notes}
            onChange={(e) =>
              setEditingInteraction({ ...editingInteraction, notes: e.target.value })
            }
          />
          <button onClick={handleUpdateInteraction}>حفظ التعديلات</button>
          <button onClick={() => setEditingInteraction(null)}>إلغاء</button>
        </div>
      )}

      {/* قائمة التفاعلات */}
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID العميل</th>
            <th>نوع التفاعل</th>
            <th>ملاحظات</th>
            <th>التاريخ</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {interactions.map((interaction) => (
            <tr key={interaction.id}>
              <td>{interaction.id}</td>
              <td>{interaction.customer}</td>
              <td>{interaction.interaction_type}</td>
              <td>{interaction.notes}</td>
              <td>{new Date(interaction.date).toLocaleString()}</td>
              <td>
                <button onClick={() => setEditingInteraction(interaction)}>تعديل</button>
                <button onClick={() => handleDeleteInteraction(interaction.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InteractionList;