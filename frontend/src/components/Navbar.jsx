import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.nav}>
      <h2 style={{margin:0}}>Task Manager</h2>

      <div>
        <span style={{marginRight:"15px"}}>
          {role?.toUpperCase()}
        </span>

        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    background: "#1f2937",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }
};

export default Navbar;