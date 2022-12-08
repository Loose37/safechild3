import React, { useState,useEffect, useRef } from 'react';
import {auth} from "../firebase-config";
import {onAuthStateChanged,signOut} from "firebase/auth"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export function Staffpage (props) {
  const {user,setUser,role} = props;
  const[allRoutes,setAllRoutes] = useState([]);
  const[selectedChild,setSelectedChild] = useState("");
  const[selectedChildren,setSelectedChildren] = useState([]);
  const[selectedRoute,setSelectedRoute] = useState("route_1");
  const[response,setResponse] =useState("");
  const navigate = useNavigate();

  const current = new Date()  
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}  ${current.getHours()}:${current.getMinutes()}`;

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if(!user){
      }
    })
  },[]);
  
  useEffect(() => {
    getAllRoutes()
  },[]);

  useEffect(() => {
    getAllChildren()
  },[selectedRoute]);


  async function logout () {
    try{
      await signOut(auth)
    } catch (error){
      console.log (error)
    }
  };


  async function getAllRoutes(){
    try{
      const fetchedRoutes = await axios.get("/routes")
      const routes = fetchedRoutes.data
      // console.log ("🍎",routes)
      setAllRoutes(routes)
    }catch(error){
      console.log (error)
    }
  };

  async function getAllChildren(){
    try{
      const fetchedChildren = await axios.post("/children", {route:selectedRoute})
      const children = fetchedChildren.data
      // console.log (children)
      setSelectedChildren(children)
      // console.log (selectedChildren)
    }catch (error) {
      console.log (error)
    }
  };


  function selectRoute1 (){
    setSelectedRoute("route_1")
  };
  function selectRoute2 (){
    setSelectedRoute("route_2")
  };

  

  async function childGotOnBus(){
    try {
      const childEvent = await axios.post("/events",{event:"got_on_bus", route:selectedRoute,time:date, ID:selectedChild.student_unique_ID},);  
      const res = childEvent.data
      // setResponse(res)
      console.log (res)
    } catch (error) {
      console.log (error)
    }
  };

  async function childGotOffBus(){
    try {
      const childEvent = await axios.post("/events",{event:"got_off_bus", route:selectedRoute, time:date, ID:selectedChild.student_unique_ID},);  
      const res = childEvent.data
      // setResponse(res)
      console.log (res)
    } catch (error) {
      console.log (error)
    }
  };

  async function childGotToClass(){
    try {
      const childEvent = await axios.post("/events",{event:"got_to_class", route:selectedRoute, time:date, ID:selectedChild.student_unique_ID},);  
      const res = childEvent.data
      // setResponse(res)
      console.log (res)
    } catch (error) {
      console.log (error)
    }
  };
  async function childGotOutOfClass(){
    try {
      const childEvent = await axios.post("/events",{event:"got_out_of_class", route:selectedRoute, time:date, ID:selectedChild.student_unique_ID},);  
      const res = childEvent.data
      // setResponse(res)
      console.log (res)
    } catch (error) {
      console.log (error)
    }
  };



console.log (role)
  return(
    <div>

      <h1>Welcome {user.email} you are signed in as Staff</h1>
      <button onClick={(e)=>{
        navigate("/")
        }}>Back to Login Page</button>
      <div className="routes_view">
       <h3>This are your routes for {date}</h3>
       {allRoutes.map(route => <p>{route.all_routes}</p>)}
       <button className='route_1_button' onClick={(e) =>{
         selectRoute1()
       }
        }>Show route 1 </button>  
       <button className='route_2_button' onClick={(e) => {
          selectRoute2()
       }}>Show route 2 </button>

      </div>


      <div className='events_view'>
        
        {/* <h1>Route events</h1> */}
        <div className='children_gallery'>
          <h2>Children on Route {selectedRoute}</h2>
          <div className='children_names_container'>
            <div className='children_name_list'>
              {selectedChildren.map(child => 
                <div>              
                  <p className='child_details'>{`${child.first_name} ${child.last_name} ${child.image} `}</p>
                  <button className='select_child_button' onClick={(e)=>setSelectedChild(child)}>Select this child</button>
                </div>  
              )}
            </div>
            
          </div>
        </div>

        <div className='actions_gallery'>

          Selected Child:
          {<p>{`${selectedChild.first_name} ${selectedChild.last_name} ${selectedChild.image}`}</p>}
          <button onClick={(e)=>childGotOnBus()}>Child got on bus</button>
          <button onClick={(e)=>childGotOffBus()}>Child got off bus</button>
          <button onClick={(e)=>childGotToClass()}>Child got to class</button>
          <button onClick={(e)=>childGotOutOfClass()}>Child got out of class</button>

        </div>




      </div>

    </div>

  )
}



