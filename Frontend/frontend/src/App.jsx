import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Blogtitlegenerator from "./components/Blogtitlegenerator";
import Dashboard from "./components/Dashboard";
import AIassistant from "./components/AIassistant";
import Resumeassistant from "./components/Resumeassistant";
import AIArticleassistant from "./components/AIArticleassistant";
import PrivateRoute from "./auth/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Regcard from "./components/Regcard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/aboutus" element={<Home />} />
          <Route path="/contactus" element={<Home />} /> */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="aiarticleassistant" element={<AIArticleassistant />} />
            <Route path="aiassistant" element={<AIassistant />} />
            <Route path="resumeassistant" element={<Resumeassistant />} />
            <Route path="blogtitlegenerator" element={<Blogtitlegenerator />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/popup" element={<Regcard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
