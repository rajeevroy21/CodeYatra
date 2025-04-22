import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Upcoming from "./components/Upcoming";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Addprofile from "./components/Addprofile";
import Setting from "./components/Setting";
import useAuthInitializer from "./hooks/useAuthInitializer";
import Home from "./components/Home";
function App() {
  useAuthInitializer();
  return (
    <BrowserRouter> 
     <Navbar /> 
      <Routes>
      <Route index element={<Home />} />
      <Route path={'/upcoming'} element={<Upcoming />} />
      <Route path="/setting" element={<Setting/>}/>
      <Route path="/addprofile" element={<Addprofile/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
