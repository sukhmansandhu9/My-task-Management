import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Overdue from "./components/Overdue";
import Today from "./components/Today";
import Upcoming from "./components/Upcoming";
import Addtask from "./components/Addtask";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/today" element={<Today />} />
        <Route path="/" element={<Today />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/overdue" element={<Overdue />} />
        <Route path="/add-task" element={<Addtask />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
