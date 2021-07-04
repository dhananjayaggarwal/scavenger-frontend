import logo from './logo.svg';
import './App.css';
// import { socket } from "./service/socket";
import socketClient  from "socket.io-client";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route} from 'react-router-dom'
import ContactForm from './components/ContactForm';
import LoginForm from './components/LoginForm';
import Header from './components/Header'
import axios from 'axios';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({bid: "", role: ""});
  useEffect(()=>{
    console.log('maine toh nhi kiya login', isLoggedIn)
    const checkUserAuthenticated =  async function(){
      const authenticationToken = localStorage.getItem('token');
      if(authenticationToken){
      let config = { headers: {'Authorization': 'Bearer ' + authenticationToken}};
       const result = await axios.get(process.env.REACT_APP_API_URL+'/api/user/checkLogin', config)
       if(result){
         let d = {bid: result.data.branchId, role:  result.data.role}
        setUserData(d);
        console.log("userData", userData);
         setIsLoggedIn(true)
         console.log('chal gaya')
       } else{
         localStorage.removeItem('token');
         console.log('ni chala')
       }
      } else{
        setIsLoggedIn(false);
      }
     }
     checkUserAuthenticated();
  },[])

  useEffect(() => {
    if(isLoggedIn){
      console.log("socket wala chalra hai", userData)
    const SOCKET_URL = process.env.REACT_APP_API_URL;
    const socket = socketClient(SOCKET_URL);
    socket.on('connection', () => {
    console.log(`I'm connected with the back-end`);

      // emit event from client-side
      socket.emit("join", { "bid": userData.bid, "role": userData.role });
    });

    socket.on('notification', (data, notification_id) => {
		console.log(data, notification_id); 
		socket.emit("notification_received", { "bid": userData.bid, "nid": notification_id });
		})
    socket.on("connect_error", (err) => { console.log(`connect_error due to ${err.message}`); });
  } 
  }, [isLoggedIn]);



  return (
    <BrowserRouter>
    <div className="App">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Route path="/" exact component = {() => <ContactForm isLoggedIn={isLoggedIn} />} />      
      <Route path='/login' exact component={() => <LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData}/>}  />
    </div>
    </BrowserRouter>
  );
}

export default App;
