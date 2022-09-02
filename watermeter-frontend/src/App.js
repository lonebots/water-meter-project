import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Footer from "./components/Footer";
import ChangePassword from "./pages/ChangePassword";


import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import UpdatePrice from './pages/UpdatePrice';
import PreviousBill from './pages/PreviousBill';
import AddCustomer from "./pages/AddCustomer";


function App() {
  return (
    <Router>
    <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path='/admin-home/updateprice' element={<UpdatePrice/>}/>
          <Route path='/admin-home/addcustomer' element={<AddCustomer/>}/>
          <Route path='/home/changepassword' element={<ChangePassword/>}/>
          
          <Route path='/home/prevbill' element={<PreviousBill/>}/>
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
