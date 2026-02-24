import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("admin");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API}/api/auth/login`,
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }

    } catch (error) {
      alert("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: "20px" }}>
          Task Management System
        </h2>

        <div style={styles.roleSwitch}>
          <button
            type="button"
            style={selectedRole === "admin" ? styles.activeBtn : styles.btn}
            onClick={() => setSelectedRole("admin")}
          >
            Admin
          </button>
          <button
            type="button"
            style={selectedRole === "employee" ? styles.activeBtn : styles.btn}
            onClick={() => setSelectedRole("employee")}
          >
            Employee
          </button>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder={`${selectedRole} Email`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.loginBtn}>
            Login as {selectedRole}
          </button>

          {selectedRole === "employee" && (
            <p style={styles.registerText}>
              New Employee?{" "}
              <span
                style={styles.registerLink}
                onClick={() => navigate("/register")}
              >
                Register here
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
  },
  card: {
    width: "380px",
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "white",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  roleSwitch: {
    display: "flex",
    marginBottom: "20px",
  },
  btn: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    background: "#eee",
    cursor: "pointer",
  },
  activeBtn: {
    flex: 1,
    padding: "10px",
    border: "1px solid #007bff",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  loginBtn: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  registerText: {
    marginTop: "15px",
    fontSize: "14px",
  },
  registerLink: {
    color: "#007bff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;