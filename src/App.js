import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { useState } from "react";
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Welcome from "./components/Welcome";
function App() {
  
  return (
    <BrowserRouter>
    <div className="fl">
    <div className="container">
      
      <Routes>
      <Route path='/' element={<SignUp/>}/>
     <Route path='/login' element={<Login/>}/>
    { localStorage.isLogin === 'true' && <Route path='/welcome' element={<Welcome/>}/>
     }
     </Routes>
    
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;