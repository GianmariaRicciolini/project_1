import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import NavWp from "./Components/NavWp";
import Details from "./Components/Details";
import ChangesForm from "./Components/ChangesForm";
import "./App.css";
import CreatePost from "./Components/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <NavWp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Details />} />
        <Route path="/changes/:id" element={<ChangesForm />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
