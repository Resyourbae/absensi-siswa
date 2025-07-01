import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AbsensiForm from "./components/AbsensiForm";
import AbsensiTable from "./components/AbsensiTable";
import Home from "./components/Home";

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<AbsensiForm />} />
          <Route path="/table" element={<AbsensiTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
