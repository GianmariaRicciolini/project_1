import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import NavWp from "./Components/NavWp";

// import PostDetails from './components/PostDetails';

function App() {
  return (
    <BrowserRouter>
      <NavWp />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/posts/:id" element={<PostDetails />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
