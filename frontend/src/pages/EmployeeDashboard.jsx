import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = import.meta.env.VITE_API_URL;

function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${API}/api/tasks/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchTasks();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status !== "Completed").length;

  return (
    <>
      <Navbar />
      <div className="container">

        <h1>Employee Dashboard</h1>

        <div className="card">
          <h3>My Stats</h3>
          <p>Total: {total}</p>
          <p>Completed: {completed}</p>
          <p>Pending: {pending}</p>
        </div>

        {tasks.length === 0 && (
          <div className="card">
            <p>No tasks assigned.</p>
          </div>
        )}

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

            <br /><br />

            {task.status !== "Completed" && (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() => updateStatus(task._id, "In Progress")}
                >
                  In Progress
                </button>

                <button
                  className="btn btn-success"
                  onClick={() => updateStatus(task._id, "Completed")}
                  style={{ marginLeft: "10px" }}
                >
                  Complete
                </button>
              </>
            )}
          </div>
        ))}

      </div>
    </>
  );
}

export default EmployeeDashboard;