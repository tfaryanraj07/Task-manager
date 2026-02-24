import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    deadline: "",
    assignedTo: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/tasks", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchTasks();

      // Reset form
      setForm({
        title: "",
        description: "",
        priority: "Low",
        deadline: "",
        assignedTo: "",
      });

    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const totalTasks = tasks.length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status !== "Completed").length;

  return (
    <>
      <Navbar />
      <div className="container">

        <h1>Admin Dashboard</h1>

        {/* Statistics Card */}
        <div className="card">
          <h3>Statistics</h3>
          <p>Total Tasks: {totalTasks}</p>
          <p>Completed: {completed}</p>
          <p>Pending: {pending}</p>
          <p>Total Users: {users.length}</p>
        </div>

        {/* Create Task Card */}
        <div className="card">
          <h3>Create Task</h3>

          <form onSubmit={handleCreate}>
            <input
              placeholder="Title"
              className="input"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            /><br /><br />

            <textarea
              placeholder="Description"
              className="input"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            /><br /><br />

            <select
              className="input"
              value={form.priority}
              onChange={e => setForm({ ...form, priority: e.target.value })}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select><br /><br />

            <input
              type="date"
              className="input"
              value={form.deadline}
              onChange={e => setForm({ ...form, deadline: e.target.value })}
            /><br /><br />

            <select
              className="input"
              value={form.assignedTo}
              onChange={e => setForm({ ...form, assignedTo: e.target.value })}
            >
              <option value="">Select Employee</option>
              {users.map(u => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select><br /><br />

            <button className="btn btn-primary">
              Create Task
            </button>
          </form>
        </div>

        {/* All Tasks */}
        <h3>All Tasks</h3>

        {tasks.map(task => (
          <div key={task._id} className="card">
            <h4>{task.title}</h4>
            <p>{task.description}</p>

            <span className={`badge badge-${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>

            <br /><br />

            <span className={`badge ${
              task.status === "Completed"
                ? "badge-completed"
                : task.status === "In Progress"
                ? "badge-progress"
                : "badge-pending"
            }`}>
              {task.status}
            </span>

            <p>Deadline: {task.deadline?.slice(0, 10)}</p>
            <p>Assigned To: {task.assignedTo?.name}</p>

            <button
              className="btn btn-danger"
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </button>
          </div>
        ))}

      </div>
    </>
  );
}

export default AdminDashboard;