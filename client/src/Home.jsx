import React, { useState } from "react";
import io from "socket.io-client";
import "./App.css";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001/")
function Home() {
  // const socket = io("http://localhost:3001/")
  // socket.connect(() => {
  //   console.log("connected");
  // })
  // // socket.io.on("reconnect" , () => {
  // //   console.log("connected");
  // // });
//   let socket;
//   function Connect(){
//     socket = io("http://localhost:3001");
//     socket.connect();
//     console.log("Connected",socket.id);
    
//   }
  // function Disconnect(){
  //   socket.disconnect();
  //   // socket.disconnect();
  //   // socket.close();
  //   console.log("Disconnected",socket.id);
  // }
    const [userName,setUsername] = useState("");
    const [room,setRoom] = useState("");
//   const [r,setR] = useState("");
    const[showChat,setShowChat] = useState(false);


    const joinRoom = () => {
        if(userName !== "" && room !== ""){
            // setR(room);
            socket.emit("joinRoom",room);
            setShowChat(true);
        }
    }

    return (
        <div className="">
            {/* <a href="/user"><button >Connect</button></a> */}
            {/* <button onClick={Disconnect}>Disconnect</button> */}
            {!showChat ? (
                <div className="">
                    <h3 className="text-7xl text-white">Join A Chat</h3>
                    <input type="text" placeholder="UserName" onChange={(e) => {setUsername(e.target.value)}} />
                    <input type="text" placeholder="Room ID"  onChange={(e) => {setRoom(e.target.value)}} />
                    <button onClick={joinRoom}>Join A Room</button>
                </div>
                ) : (
                    <Chat socket={socket} userName={userName} room={room} />
                )
            }
            
            
        </div>
    );
}

export default Home;
