import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_CHARACTER_DETAILS } from "../graphql/queries";
import { useDispatch, useSelector } from "react-redux";
import { addToSquad } from "../redux/squadSlice";

function CharacterDetail() {
  // 1. URL se id nikaal rahe hain (e.g. /character/1 se id = 1)
  const { id } = useParams();

  const dispatch = useDispatch();
  const squadMembers = useSelector((state) => state.squad.members);

  // 2. GraphQL Query ko variable ke sath call kar rahe hain
  const { loading, error, data } = useQuery(GET_CHARACTER_DETAILS, {
    variables: { id },
  });

  if (loading) return <h2>Details load ho rahi hain... ⏳</h2>;
  if (error) return <h2>Error: {error.message} ❌</h2>;

  const character = data?.character;
  if (!character) return <h2>Character nahi mila! 😕</h2>;

  const isAlreadyInSquad = squadMembers.some(
    (item) => item.id === character.id,
  );

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Link
        to="/"
        style={{ textDecoration: "none", color: "#2563eb", fontWeight: "bold" }}
      >
        ⬅️ Back to All Characters
      </Link>

      <div
        style={{
          display: "flex",
          gap: "24px",
          marginTop: "20px",
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src={character.image}
          alt={character.name}
          style={{
            width: "250px",
            height: "250px",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />

        <div style={{ flex: 1 }}>
          <h2 style={{ marginTop: 0 }}>{character.name}</h2>
          <p>
            <strong>Status:</strong> {character.status}
          </p>
          <p>
            <strong>Species:</strong> {character.species}
          </p>
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
          <p>
            <strong>Origin:</strong> {character.origin?.name}
          </p>
          <p>
            <strong>Current Location:</strong> {character.location?.name}
          </p>

          <button
            disabled={isAlreadyInSquad}
            onClick={() => dispatch(addToSquad(character))}
            style={{
              padding: "10px 16px",
              backgroundColor: isAlreadyInSquad ? "#9ca3af" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: isAlreadyInSquad ? "not-allowed" : "pointer",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            {isAlreadyInSquad ? "In Squad ✅" : "+ Add to Squad"}
          </button>
        </div>
      </div>

      {/* Nested GraphQL Data: Episodes List */}
      <h3 style={{ marginTop: "30px" }}>
        Episodes Featuring {character.name} ({character.episode?.length})
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "12px",
          maxHeight: "300px",
          overflowY: "auto",
          padding: "10px",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
        }}
      >
        {character.episode?.map((ep) => (
          <div
            key={ep.id}
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
            }}
          >
            <span
              style={{ fontSize: "12px", color: "#6b7280", fontWeight: "bold" }}
            >
              {ep.episode}
            </span>
            <p
              style={{ margin: "4px 0 0", fontSize: "14px", fontWeight: "500" }}
            >
              {ep.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterDetail;
