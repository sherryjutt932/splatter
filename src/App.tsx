import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import CreateSplatter from "./component/CreateSplatterFiverr";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Splatter" element={<CreateSplatter />} />
      </Routes>
    </Router>
  );
}

export default App;
