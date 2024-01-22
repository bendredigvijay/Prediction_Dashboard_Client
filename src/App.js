import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./components/Login/LoginForm";
function App() {
  return (
    <Router>
      {/* <SideBar> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />

        </Routes>
      {/* </SideBar> */}
      <Routes>
        <Route path="/login" element={<LoginForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
