import { useState } from "react"; // 1. useState import kiya
import { useQuery } from "@apollo/client/react";
import { GET_CHARACTERS } from "../graphql/queries";

// 1. Redux hooks aur action import karein
import { useDispatch, useSelector } from "react-redux";
import { addToSquad } from "../redux/squadSlice";
import { Link } from "react-router-dom"; // <-- 1. Link import kiya

function Home() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  // 2. Dispatch function aur current squad members nikaalein
  const dispatch = useDispatch();
  const squadMembers = useSelector((state) => state.squad.members);

  // 3. Search aur Filter ke liye React States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  if (loading) return <h2>Characters load ho rahe hain... ⏳</h2>;
  if (error) return <h2>Error: {error.message} ❌</h2>;

  const characters = data?.characters?.results || [];

  // 4. JavaScript Revision: Array.filter() se search aur status filter karna
  const filteredCharacters = characters.filter((char) => {
    const matchesSearch = char.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "ALL" || char.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Header bar: Title + Search + Filter */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>Multiverse Characters</h2>

        {/* YE HISSA ADD KAREIN: Search Bar aur Dropdown */}
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Search by name (e.g. Rick)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              minWidth: "220px",
              fontSize: "14px",
            }}
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            <option value="ALL">All Status</option>
            <option value="Alive">Alive 💚</option>
            <option value="Dead">Dead 💀</option>
            <option value="unknown">Unknown ❓</option>
          </select>
        </div>
      </div>

      <p style={{ color: "#6b7280", marginBottom: "16px" }}>
        Showing {filteredCharacters.length} of {characters.length} characters
      </p>
      {/* Agar koi character match na kare */}
      {filteredCharacters.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
          <h3>Koi character match nahi hua! 🔍</h3>
          <p>Dusra naam try karein ya filter reset karein.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {filteredCharacters.map((char) => {
            const isAlreadyInSquad = squadMembers.some(
              (item) => item.id === char.id,
            );
            return (
              <div
                key={char.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "12px",
                  textAlign: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "white",
                }}
              >
                <Link
                  to={`/character/${char.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={char.image}
                    alt={char.name}
                    style={{
                      width: "100%",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  />
                  <h3 style={{ margin: "10px 0 5px", color: "#2563eb" }}>
                    {char.name}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 10px",
                      color: char.status === "Alive" ? "green" : "red",
                    }}
                  >
                    {char.status} - {char.species}
                  </p>
                </Link>

                {/* 3. Button par click hone par dispatch chalega */}
                <button
                  disabled={isAlreadyInSquad}
                  onClick={() => dispatch(addToSquad(char))}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: isAlreadyInSquad ? "#9ca3af" : "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: isAlreadyInSquad ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {isAlreadyInSquad ? "In Squad ✅" : "+ Add to Squad"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Home;
