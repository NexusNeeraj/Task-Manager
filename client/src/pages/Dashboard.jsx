import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setTasks(res.data.tasks);
      } catch (err) {
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) {
      fetchTasks();
    }
  }, [auth]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="mt-2 text-sm">Status: {task.status}</p>
              <p className="text-sm">Priority: {task.priority}</p>
              <p className="text-sm">Due: {new Date(task.dueDate).toDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
