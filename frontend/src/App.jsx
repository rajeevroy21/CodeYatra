import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Upcoming from "./components/Upcoming";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Addprofile from "./components/Addprofile";
import Setting from "./components/Setting";
import useAuthInitializer from "./hooks/useAuthInitializer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./components/Home";
function App() {
  
  useAuthInitializer();
  
  return (
    <BrowserRouter> 
    <ScrollToTop />
     <Navbar /> 
      <Routes>
      <Route index element={<Home />} />
      <Route path={'/upcoming'} element={<Upcoming />} />
      <Route path="/setting" element={<Setting/>}/>
      <Route path="/addprofile" element={<Addprofile/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
