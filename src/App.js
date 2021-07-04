import logo from './logo.svg';
import './App.css';
import { socket } from "./service/socket";
import React, { useState, useEffect } from "react";

import ContactForm from './components/ContactForm';
import Header from './components/Header'
function App() {
  useEffect(() => {

    socket.on('connection', () => {
      console.log(`I'm connected with the back-end`);

      // emit event from client-side
      socket.emit("join", { "bid": "1", "role": "BRANCH" });
    });



    socket.on('notification', (data, notification_id) => {
		console.log(data, notification_id); 
		socket.emit("notification_received", { "bid": "1", "nid": notification_id });
		})


    socket.on("connect_error", (err) => { console.log(`connect_error due to ${err.message}`); });
  }, []);



  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Header></Header>
      <ContactForm></ContactForm>
    </div>
  );
}

export default App;
