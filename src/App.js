import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

//Components
import Authentication from "./Components/Authentication";
import Dashboard from "./Components/Dashboard";
import ErrorPage from "./Components/ErrorPage";
import SetBudget from "./Components/SetBudget";
import Select from "./Components/Select";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/set" element={<SetBudget />} />
          <Route path="/select" element={<Select />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
