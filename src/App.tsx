import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/home";
import { Film } from "./routes/film";
import { SearchProvider } from "./context/searchContext";

function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/film/:filmId" element={<Film />} />
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;
