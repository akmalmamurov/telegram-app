import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Boots from "./Pages/boots/Boost";
import Earn from "./Pages/earn/Earn";
import Frens from "./Pages/frens/Frens";
import Stats from "./Pages/stats/Stats";
import Tasks from "./Pages/tasks/Tasks";
import Layout from "./components/layout/Layout";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" theme="dark" />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<Layout />}>
          <Route path="/frens" element={<Frens />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/main" element={<Earn />} />
          <Route path="/boost" element={<Boots />} />
          <Route path="/stats" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
