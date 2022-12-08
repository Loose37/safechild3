import { useState,useEffect } from 'react';
import axios from "axios"
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Login} from './components/Login';
import { Parentspage } from './components/Parentspage';
import { Staffpage } from './components/Staffpage';


function App() {
  const [students,setStudents] = useState([]);
  // const [registerEmail,setRegisterEmail] = useState("");
  // const [registerPassword,setRegisterPassword] = useState("");
  const [user,setUser] = useState({})
  const [role,setRole] = useState("")
  const [allRoles,setAllRoles] = useState([])



  useEffect(() => {
    getStudents();
    getAllRoles();

  },[]);


  async function getStudents () {
    try{
      const students = await axios.get("http://localhost:8000/api/studentsc");
      console.log (students.data);
      setStudents(students.data)

    } catch (error){
      console.log (error);
    }
  };

  async function getAllRoles () {
    try{
      const fetched = await axios.get("http://localhost:8000/roles");
      const allRoles = fetched.data;
      console.log (allRoles)
      setAllRoles(allRoles);
    }catch (error){
      console.log (error);
    }
  };


  return (
    <div className="App">
      {/* <h1>Home Page</h1> */}
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login
          user={user}
          setUser={setUser}
          role={role}
          setRole={setRole}
          allRoles={allRoles}
          
        
          />} />
          <Route path="/parents" element={<Parentspage
          user={user}
          setUser={setUser}
          role={role}
          setRole={setRole}
          allRoles={allRoles}
          
          />} />
          <Route path="/staff" element={<Staffpage
          user={user}
          setUser={setUser}
          role={role}
          setRole={setRole}
          
          />} />

          
        </Routes>
      
      </BrowserRouter>
    
    </div>
  );
}

export default App;
