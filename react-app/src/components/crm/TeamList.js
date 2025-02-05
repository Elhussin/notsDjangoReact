// src/components/TeamList.js
import React, { useEffect, useState } from 'react';
import {
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
} from '../../Api/crm.js';

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState({ name: '', members: [] });
  const [editingTeam, setEditingTeam] = useState(null);

  // جلب قائمة الفرق عند تحميل المكون
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const data = await getTeams();
      setTeams(data);
    } catch (error) {
      console.error('Failed to fetch teams:', error);
    }
  };

  const handleAddTeam = async () => {
    try {
      const data = await createTeam(newTeam);
      setTeams([...teams, data]);
      setNewTeam({ name: '', members: [] }); // إعادة تعيين الحقول
    } catch (error) {
      console.error('Failed to add team:', error);
    }
  };

  const handleUpdateTeam = async () => {
    try {
      const data = await updateTeam(editingTeam.id, editingTeam);
      setTeams(teams.map((team) => (team.id === data.id ? data : team)));
      setEditingTeam(null); // إنهاء وضع التحرير
    } catch (error) {
      console.error('Failed to update team:', error);
    }
  };

  const handleDeleteTeam = async (id) => {
    try {
      await deleteTeam(id);
      setTeams(teams.filter((team) => team.id !== id));
    } catch (error) {
      console.error('Failed to delete team:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>قائمة الفرق</h1>

      {/* إضافة فريق جديد */}
      <div style={{ marginBottom: '20px' }}>
        <h3>إضافة فريق جديد</h3>
        <input
          type="text"
          placeholder="اسم الفريق"
          value={newTeam.name}
          onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
        />
        <textarea
          placeholder="IDs الأعضاء (مفصولة بفاصلة)"
          value={newTeam.members.join(',')}
          onChange={(e) =>
            setNewTeam({
              ...newTeam,
              members: e.target.value.split(',').map((id) => id.trim()),
            })
          }
        />
        <button onClick={handleAddTeam}>إضافة</button>
      </div>

      {/* تعديل فريق */}
      {editingTeam && (
        <div style={{ marginBottom: '20px' }}>
          <h3>تعديل فريق</h3>
          <input
            type="text"
            placeholder="اسم الفريق"
            value={editingTeam.name}
            onChange={(e) =>
              setEditingTeam({ ...editingTeam, name: e.target.value })
            }
          />
          <textarea
            placeholder="IDs الأعضاء (مفصولة بفاصلة)"
            value={editingTeam.members.join(',')}
            onChange={(e) =>
              setEditingTeam({
                ...editingTeam,
                members: e.target.value.split(',').map((id) => id.trim()),
              })
            }
          />
          <button onClick={handleUpdateTeam}>حفظ التعديلات</button>
          <button onClick={() => setEditingTeam(null)}>إلغاء</button>
        </div>
      )}

      {/* قائمة الفرق */}
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>اسم الفريق</th>
            <th>الأعضاء</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>{team.members.join(', ')}</td>
              <td>
                <button onClick={() => setEditingTeam(team)}>تعديل</button>
                <button onClick={() => handleDeleteTeam(team.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamList;