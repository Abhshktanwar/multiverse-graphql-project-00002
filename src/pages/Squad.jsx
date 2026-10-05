import { useSelector, useDispatch } from "react-redux";
import { removeFromSquad } from "../redux/squadSlice";
import { Link } from "react-router-dom";

function Squad() {
  const dispatch = useDispatch();
  // 1. Redux store se squad members le rahe hain
  const squadMembers = useSelector((state) => state.squad.members);

  // 2. JavaScript Revision: Array.reduce() se stats calculate karna
  const stats = squadMembers.reduce(
    (acc, char) => {
      if (char.status === "Alive") acc.alive += 1;
      else if (char.status === "Dead") acc.dead += 1;
      else acc.unknown += 1;
      return acc;
    },
    { alive: 0, dead: 0, unknown: 0 }, // Intial Accumulator
  );

  // Agar squad khali hai:
  if (squadMembers.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Aapka Squad abhi khali hai! 🛡️</h2>
        <p>Home page par ja kar apne pasandeeda characters add karein.</p>
        <Link
          to="/"
          style={{
            display: "inline-block",
            marginTop: "10px",
            padding: "10px 16px",
            backgroundColor: "#2563eb",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          Explore Characters 🚀
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h2>My Multiverse Squad 🛡️ ({squadMembers.length} Members)</h2>
      {/* Squad Stats Bar */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "12px 16px",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <span>
          💚 <strong>Alive:</strong> {stats.alive}
        </span>
        <span>
          💀 <strong>Dead:</strong> {stats.dead}
        </span>
        <span>
          ❓ <strong>Unknown:</strong> {stats.unknown}
        </span>
      </div>
      {/* Squad Members Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {squadMembers.map((char) => (
          <div
            key={char.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={char.image}
              alt={char.name}
              style={{ width: "100%", borderRadius: "6px" }}
            />
            <h3 style={{ margin: "10px 0 5px" }}>{char.name}</h3>
            <p
              style={{
                margin: "0 0 10px",
                color: char.status === "Alive" ? "green" : "red",
              }}
            >
              {char.status} - {char.species}
            </p>
            {/* Remove Button */}
            <button
              onClick={() => dispatch(removeFromSquad(char.id))}
              style={{
                width: "100%",
                padding: "8px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Remove ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Squad;
