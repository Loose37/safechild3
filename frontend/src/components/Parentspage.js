import React, { useState,useEffect } from 'react';
import {auth} from "../firebase-config";
import {onAuthStateChanged} from "firebase/auth"
import {useNavigate} from "react-router-dom"
import axios from "axios"


export function Parentspage (props) {
  const {user,setUser,allRoles} = props;
  const [history,setHistory] = useState([])
  const [childID,setChildID] = useState("")
  const [childData,setChildData] =useState(false)
  // const [childRoute,setChildRoute] = useState("")
  const current = new Date();  
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}  ${current.getHours()}:${current.getMinutes()}`;
  const navigate = useNavigate()

 useEffect(() => {
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    handleChildID();
  })
  },[]);


  // useEffect(() => {
  //   getChildData();
  // },[childID]);
  

  console.log (childID)
  console.log (childData)

  function handleChildID (){
    allRoles.map ((fetchedUser) => {
      console.log (fetchedUser)
      if (user && fetchedUser.email === user.email ){
        setChildID(fetchedUser.studentID)
        console.log (childID)
      }
    });
  };

  async function getChildData(){
    try{
      const fetchedData = await axios.post("/singlechild",{id:childID})
      const data = fetchedData.data
      console.log ("🍎",data)
      setChildData(data)
    }catch(error){
      console.log (error)
    }
  };

  async function getChildEvents(){
    try {
      const fetchedHistory = await axios.post("/history", {id:childID, route:"route_1"})
      const events = fetchedHistory.data
      console.log ("✳️✳️", events)
      setHistory(events)
      
    } catch (error) {
      console.log (error)
      
    }
  }
  console.log (history)

 
  if (childData.length > 0){
    return (
      <div className="parents_page">
      <h1>Welcome {user.email}</h1>
      <h3>{date}</h3>
      <button onClick={(e)=>{
        navigate("/")
        }}>Back to Login Page
      </button>
      {<h3>Displaying the events of {childData[0].first_name} {childData[0].last_name}</h3>}
      <div className='events_history'>
        <div>
          {history.map(event=>
          <p className='event'>{`Got on the bus at ${event.time_when_got_on_bus}   Got off bus at ${event.time_when_got_off_bus}  Got to class at ${event.time_when_got_to_class} Got out of class at ${event.time_when_got_out_of_class} ` }</p>)}
        
        </div>    
      </div>
      <button className='refresh_history' onClick={(e)=>{
        getChildEvents()
        getChildData()
        }}>Click here to refresh your child's history</button>
    </div>
    )
  } else {
    return(
      <div className="parents_page">
        <h1>Welcome {user.email}</h1>
        <h3>{date}</h3>
        <button onClick={(e)=>{
          navigate("/")
          }}>Back to Login Page
        </button>
        {/* {<h3>Displaying the events of {childData[0].first_name} {childData[0].last_name}</h3>} */}
        <div className='events_history'>
          <div>
            {/* {history.map(event=><div className='event'>{event}</div>)} */}
          
          </div>    
        </div>
        <button className='refresh_history' onClick={(e)=>{
          getChildEvents()
          getChildData()
        }}>Click here to refresh your child's history</button>
      </div>
    )
  }
}
