import React, { useState } from "react";
import { BrowserRouter as Router,Route ,Routes } from "react-router-dom"
import Login from "./account/Login"
import Dashboard from "./home/Dashboard";
import AdminList from "./admin/AdminList";
import './app.css'
import Admin from "./admin/Admin";
import NewAdmin from "./admin/NewAdmin";


function App() {
  return (
    
      <Router>
        <Routes>
              <Route exact path="/" element={<Dashboard/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/admins" element={<AdminList />}/>
              <Route path="/admin/:adminId" element={<Admin />}/>
              <Route path="/addadmin" element={<NewAdmin />}/>

              
        </Routes>
        </Router>
  
  )
 
}

export default App;
