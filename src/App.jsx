import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Squad from "./pages/Squad";
import CharacterDetail from "./pages/CharacterDetail"; // <-- Import kiya

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Navbar har page par upar dikhega */}
        <Navbar />

        {/* URL ke mutabiq page switch hoga */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/squad" element={<Squad />} />
          {/* Dynamic Route: :id ka matlab koi bhi character ID ho sakti hai */}
          <Route path="/character/:id" element={<CharacterDetail />} />
          {/* 404 Not Found Page */}
          <Route path="*" element={<h2>404 - Page Not Found 🚫</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
