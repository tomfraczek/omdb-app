import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/home";
import { Film } from "./routes/film";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:filmId" element={<Film />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
