import { Link } from "react-router-dom";

// 1. useSelector import karein Redux se

import { useSelector } from "react-redux";

function Navbar() {
  // 2. Redux store se squad members ki list nikaal rahe hain
  const squadMembers = useSelector((state) => state.squad.members);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        backgroundColor: "#1f2937",
        color: "white",
        borderRadius: "8px",
        marginBottom: "16px",
      }}
    >
      <h2 style={{ margin: 0 }}>
        <Link to="/" style={{ color: "#38bdf8", textDecoration: "none" }}>
          🌌 Multiverse Explorer
        </Link>
      </h2>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
        >
          Home
        </Link>
        <Link
          to="/squad"
          style={{
            color: "#4ade80",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          {/* 3. Dynamic count yahan dikhaya */}
          My Squad 🛡️ ({squadMembers.length})
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;
