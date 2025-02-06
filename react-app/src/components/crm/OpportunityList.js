// src/components/OpportunityList.js
import React, { useEffect, useState } from 'react';
import {
  getOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} from '../../Api/crm.js';


const OpportunityList = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [newOpportunity, setNewOpportunity] = useState({ customer: '', title: '', stage: 'lead', amount: '' });
  const [editingOpportunity, setEditingOpportunity] = useState(null);

  // جلب قائمة الفرص عند تحميل المكون
  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const data = await getOpportunities();
      setOpportunities(data);
    } catch (error) {
      console.error('Failed to fetch opportunities:', error);
    }
  };

  const handleAddOpportunity = async () => {
    try {
      const data = await createOpportunity(newOpportunity);
      setOpportunities([...opportunities, data]);
      setNewOpportunity({ customer: '', title: '', stage: 'lead', amount: '' }); // إعادة تعيين الحقول
    } catch (error) {
      console.error('Failed to add opportunity:', error);
    }
  };

  const handleUpdateOpportunity = async () => {
    try {
      const data = await updateOpportunity(editingOpportunity.id, editingOpportunity);
      setOpportunities(opportunities.map((opportunity) => (opportunity.id === data.id ? data : opportunity)));
      setEditingOpportunity(null); // إنهاء وضع التحرير
    } catch (error) {
      console.error('Failed to update opportunity:', error);
    }
  };

  const handleDeleteOpportunity = async (id) => {
    try {
      await deleteOpportunity(id);
      setOpportunities(opportunities.filter((opportunity) => opportunity.id !== id));
    } catch (error) {
      console.error('Failed to delete opportunity:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>قائمة الفرص</h1>

      {/* إضافة فرصة جديدة */}
      <div style={{ marginBottom: '20px' }}>
        <h3>إضافة فرصة جديدة</h3>
        <input
          type="text"
          placeholder="ID العميل"
          value={newOpportunity.customer}
          onChange={(e) => setNewOpportunity({ ...newOpportunity, customer: e.target.value })}
        />
        <input
          type="text"
          placeholder="عنوان الفرصة"
          value={newOpportunity.title}
          onChange={(e) => setNewOpportunity({ ...newOpportunity, title: e.target.value })}
        />
        <select
          value={newOpportunity.stage}
          onChange={(e) => setNewOpportunity({ ...newOpportunity, stage: e.target.value })}
        >
          <option value="lead">Lead</option>
          <option value="qualified">Qualified</option>
          <option value="proposal">Proposal</option>
          <option value="negotiation">Negotiation</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
        <input
          type="number"
          placeholder="المبلغ"
          value={newOpportunity.amount}
          onChange={(e) => setNewOpportunity({ ...newOpportunity, amount: e.target.value })}
        />
        <button onClick={handleAddOpportunity}>إضافة</button>
      </div>

      {/* تعديل فرصة */}
      {editingOpportunity && (
        <div style={{ marginBottom: '20px' }}>
          <h3>تعديل فرصة</h3>
          <input
            type="text"
            placeholder="ID العميل"
            value={editingOpportunity.customer}
            onChange={(e) =>
              setEditingOpportunity({ ...editingOpportunity, customer: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="عنوان الفرصة"
            value={editingOpportunity.title}
            onChange={(e) =>
              setEditingOpportunity({ ...editingOpportunity, title: e.target.value })
            }
          />
          <select
            value={editingOpportunity.stage}
            onChange={(e) =>
              setEditingOpportunity({ ...editingOpportunity, stage: e.target.value })
            }
          >
            <option value="lead">Lead</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="negotiation">Negotiation</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
          <input
            type="number"
            placeholder="المبلغ"
            value={editingOpportunity.amount}
            onChange={(e) =>
              setEditingOpportunity({ ...editingOpportunity, amount: e.target.value })
            }
          />
          <button onClick={handleUpdateOpportunity}>حفظ التعديلات</button>
          <button onClick={() => setEditingOpportunity(null)}>إلغاء</button>
        </div>
      )}

      {/* قائمة الفرص */}
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID العميل</th>
            <th>عنوان الفرصة</th>
            <th>المرحلة</th>
            <th>المبلغ</th>
            <th>تاريخ الإنشاء</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opportunity) => (
            <tr key={opportunity.id}>
              <td>{opportunity.id}</td>
              <td>{opportunity.customer}</td>
              <td>{opportunity.title}</td>
              <td>{opportunity.stage}</td>
              <td>{opportunity.amount}</td>
              <td>{new Date(opportunity.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => setEditingOpportunity(opportunity)}>تعديل</button>
                <button onClick={() => handleDeleteOpportunity(opportunity.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OpportunityList;