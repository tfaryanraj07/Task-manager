import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchTasks();
  };

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status !== "Completed").length;

  return (
    <>
      <Navbar />
      <div className="container"></div>
    
      <div style={{ padding: "20px" }}>
        <h1>Employee Dashboard</h1>

        <h3>My Stats</h3>
        <p>Total: {total}</p>
        <p>Completed: {completed}</p>
        <p>Pending: {pending}</p>

        <hr />

        {tasks.length === 0 && <p>No tasks assigned.</p>}

        {tasks.map(task => (
          <div key={task._id} style={{border:"1px solid gray", padding:"10px", margin:"10px 0"}}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>

            {task.status !== "Completed" && (
              <>
                <button onClick={() => updateStatus(task._id, "In Progress")}>
                  In Progress
                </button>
                <button onClick={() => updateStatus(task._id, "Completed")}>
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