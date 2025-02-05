// src/components/CampaignList.js
import React, { useEffect, useState } from 'react';
import {
  getCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from '../../Api/crm.js';


const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    customers: [],
  });
  const [editingCampaign, setEditingCampaign] = useState(null);

  // جلب قائمة الحملات عند تحميل المكون
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
    }
  };

  const handleAddCampaign = async () => {
    try {
      const data = await createCampaign(newCampaign);
      setCampaigns([...campaigns, data]);
      setNewCampaign({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        customers: [],
      }); // إعادة تعيين الحقول
    } catch (error) {
      console.error('Failed to add campaign:', error);
    }
  };

  const handleUpdateCampaign = async () => {
    try {
      const data = await updateCampaign(editingCampaign.id, editingCampaign);
      setCampaigns(campaigns.map((campaign) => (campaign.id === data.id ? data : campaign)));
      setEditingCampaign(null); // إنهاء وضع التحرير
    } catch (error) {
      console.error('Failed to update campaign:', error);
    }
  };

  const handleDeleteCampaign = async (id) => {
    try {
      await deleteCampaign(id);
      setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
    } catch (error) {
      console.error('Failed to delete campaign:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>قائمة الحملات</h1>

      {/* إضافة حملة جديدة */}
      <div style={{ marginBottom: '20px' }}>
        <h3>إضافة حملة جديدة</h3>
        <input
          type="text"
          placeholder="اسم الحملة"
          value={newCampaign.name}
          onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
        />
        <textarea
          placeholder="وصف الحملة"
          value={newCampaign.description}
          onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
        />
        <input
          type="date"
          value={newCampaign.start_date}
          onChange={(e) => setNewCampaign({ ...newCampaign, start_date: e.target.value })}
        />
        <input
          type="date"
          value={newCampaign.end_date}
          onChange={(e) => setNewCampaign({ ...newCampaign, end_date: e.target.value })}
        />
        <button onClick={handleAddCampaign}>إضافة</button>
      </div>

      {/* تعديل حملة */}
      {editingCampaign && (
        <div style={{ marginBottom: '20px' }}>
          <h3>تعديل حملة</h3>
          <input
            type="text"
            placeholder="اسم الحملة"
            value={editingCampaign.name}
            onChange={(e) =>
              setEditingCampaign({ ...editingCampaign, name: e.target.value })
            }
          />
          <textarea
            placeholder="وصف الحملة"
            value={editingCampaign.description}
            onChange={(e) =>
              setEditingCampaign({ ...editingCampaign, description: e.target.value })
            }
          />
          <input
            type="date"
            value={editingCampaign.start_date}
            onChange={(e) =>
              setEditingCampaign({ ...editingCampaign, start_date: e.target.value })
            }
          />
          <input
            type="date"
            value={editingCampaign.end_date}
            onChange={(e) =>
              setEditingCampaign({ ...editingCampaign, end_date: e.target.value })
            }
          />
          <button onClick={handleUpdateCampaign}>حفظ التعديلات</button>
          <button onClick={() => setEditingCampaign(null)}>إلغاء</button>
        </div>
      )}

      {/* قائمة الحملات */}
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>اسم الحملة</th>
            <th>الوصف</th>
            <th>تاريخ البدء</th>
            <th>تاريخ الانتهاء</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id}>
              <td>{campaign.id}</td>
              <td>{campaign.name}</td>
              <td>{campaign.description}</td>
              <td>{new Date(campaign.start_date).toLocaleDateString()}</td>
              <td>{new Date(campaign.end_date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => setEditingCampaign(campaign)}>تعديل</button>
                <button onClick={() => handleDeleteCampaign(campaign.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignList;