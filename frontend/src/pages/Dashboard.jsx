import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const res = await api.post('/tasks', {
        title: newTaskTitle,
        description: newTaskDesc
      });
      setTasks([res.data, ...tasks]);
      setNewTaskTitle('');
      setNewTaskDesc('');
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="title">My Tasks Workspace</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-card">
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Create New Task</h2>
        <form onSubmit={handleCreateTask} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Task Title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              required
            />
          </div>
          <div style={{ flex: '2 1 400px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Task Description (optional)"
              value={newTaskDesc}
              onChange={(e) => setNewTaskDesc(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ flex: '0 1 auto', height: 'fit-content' }}>
            Add Task
          </button>
        </form>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div className="dashboard-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h3 style={{ color: 'var(--text-secondary)' }}>No tasks found. Create one above!</h3>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map(task => (
            <div key={task._id} className="task-card">
              <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
              </div>
              <p className="task-desc">{task.description || 'No description provided.'}</p>
              
              <div className="task-footer">
                <span className={`status-badge ${task.completed ? 'status-completed' : 'status-pending'}`}>
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
                
                {user.role === 'admin' && (
                  <button 
                    onClick={() => handleDeleteTask(task._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete Task
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
