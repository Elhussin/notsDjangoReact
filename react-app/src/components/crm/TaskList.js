// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../../Api/crm.js';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    customer: '',
    opportunity: '',
    title: '',
    description: '',
    priority: 'medium',
    due_date: '',
    completed: false,
  });
  const [editingTask, setEditingTask] = useState(null);

  // جلب قائمة المهام عند تحميل المكون
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleAddTask = async () => {
    try {
      const data = await createTask(newTask);
      setTasks([...tasks, data]);
      setNewTask({
        customer: '',
        opportunity: '',
        title: '',
        description: '',
        priority: 'medium',
        due_date: '',
        completed: false,
      }); // إعادة تعيين الحقول
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      const data = await updateTask(editingTask.id, editingTask);
      setTasks(tasks.map((task) => (task.id === data.id ? data : task)));
      setEditingTask(null); // إنهاء وضع التحرير
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>قائمة المهام</h1>

      {/* إضافة مهمة جديدة */}
      <div style={{ marginBottom: '20px' }}>
        <h3>إضافة مهمة جديدة</h3>
        <input
          type="text"
          placeholder="ID العميل (اختياري)"
          value={newTask.customer}
          onChange={(e) => setNewTask({ ...newTask, customer: e.target.value })}
        />
        <input
          type="text"
          placeholder="ID الفرصة (اختياري)"
          value={newTask.opportunity}
          onChange={(e) => setNewTask({ ...newTask, opportunity: e.target.value })}
        />
        <input
          type="text"
          placeholder="عنوان المهمة"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="وصف المهمة"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="low">منخفض</option>
          <option value="medium">متوسط</option>
          <option value="high">عالي</option>
        </select>
        <input
          type="datetime-local"
          value={newTask.due_date}
          onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
        />
        <button onClick={handleAddTask}>إضافة</button>
      </div>

      {/* تعديل مهمة */}
      {editingTask && (
        <div style={{ marginBottom: '20px' }}>
          <h3>تعديل مهمة</h3>
          <input
            type="text"
            placeholder="ID العميل (اختياري)"
            value={editingTask.customer}
            onChange={(e) =>
              setEditingTask({ ...editingTask, customer: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="ID الفرصة (اختياري)"
            value={editingTask.opportunity}
            onChange={(e) =>
              setEditingTask({ ...editingTask, opportunity: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="عنوان المهمة"
            value={editingTask.title}
            onChange={(e) =>
              setEditingTask({ ...editingTask, title: e.target.value })
            }
          />
          <textarea
            placeholder="وصف المهمة"
            value={editingTask.description}
            onChange={(e) =>
              setEditingTask({ ...editingTask, description: e.target.value })
            }
          />
          <select
            value={editingTask.priority}
            onChange={(e) =>
              setEditingTask({ ...editingTask, priority: e.target.value })
            }
          >
            <option value="low">منخفض</option>
            <option value="medium">متوسط</option>
            <option value="high">عالي</option>
          </select>
          <input
            type="datetime-local"
            value={editingTask.due_date}
            onChange={(e) =>
              setEditingTask({ ...editingTask, due_date: e.target.value })
            }
          />
          <label>
            <input
              type="checkbox"
              checked={editingTask.completed}
              onChange={(e) =>
                setEditingTask({ ...editingTask, completed: e.target.checked })
              }
            />
            مكتملة
          </label>
          <button onClick={handleUpdateTask}>حفظ التعديلات</button>
          <button onClick={() => setEditingTask(null)}>إلغاء</button>
        </div>
      )}

      {/* قائمة المهام */}
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID العميل</th>
            <th>ID الفرصة</th>
            <th>عنوان المهمة</th>
            <th>الأولوية</th>
            <th>تاريخ الاستحقاق</th>
            <th>مكتملة</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.customer || '-'}</td>
              <td>{task.opportunity || '-'}</td>
              <td>{task.title}</td>
              <td>{task.priority}</td>
              <td>{new Date(task.due_date).toLocaleString()}</td>
              <td>{task.completed ? 'نعم' : 'لا'}</td>
              <td>
                <button onClick={() => setEditingTask(task)}>تعديل</button>
                <button onClick={() => handleDeleteTask(task.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;