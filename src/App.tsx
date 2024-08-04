import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./routes/login";
import Dashboard from "./routes/dashboard";
import Year from "./routes/module";
import ResultLHP from "./routes/resultLHP";
import NameDetailLHP from "./routes/nameDetailLHP";
import CreateClass from "./routes/createclass";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/year" element={<Year/>} />
        <Route path="/year/resultLHP" element={<ResultLHP/>} />
        <Route path="/year/resultLHP/nameDetailLHP" element={<NameDetailLHP/>} />
        <Route path="/year/create" element={<CreateClass/>} />
      </Routes>
    </Router>
  );
}

export default App;
