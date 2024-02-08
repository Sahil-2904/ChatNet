import React,{useEffect, useState} from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
function Chat({socket,userName,room}){
    const [currMessage,setcurrMessage] = useState("");
    const [messageList,setMessageList] = useState([]);
    const sendMsg = async () => {
        try{
            if(currMessage !== ""){
                const data = {
                    room:room,
                    author:userName,
                    message:currMessage,
                    time: new Date().getHours() + ":" +new Date().getMinutes()
                }
                await socket.emit("message",data);
                setMessageList((list) => [...list,data]);
                setcurrMessage("");
            }
        }
        catch(e){
            console.log(e);
        }
    }
    useEffect((() => {
        socket.on("receiveMsg",(data) => {
            console.log(data);
            setMessageList((list) => [...list,data]);
            // console.log(messageList);
        })
    }),[socket])
    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat. Joined as {userName}</p>
                {/* <p>Joined as {userName}</p> */}
                {/* {
                    room !== "" ? (<h3>Connected to Room: {room}</h3>) : (<h3>Not Connected to any room</h3>)
                } */}
            </div>
            <div className='chat-body'>
                <ScrollToBottom className="message-container">
                {
                    messageList.map((msgContent,index) => {
                        return (
                            <div key={index} className='message' id={userName === msgContent.author ? "you" : "other" }>
                                <div>
                                    <div className='message-content'>
                                        <p>{msgContent.message}</p>
                                    </div>
                                    <div className='message-meta'>
                                        <p id="time">{msgContent.time}</p>
                                        <p id="author">{msgContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input value={currMessage} type="text" placeholder='Type a Message' onChange={(e) => setcurrMessage(e.target.value)} onKeyPress={(e) => {e.key === "Enter" && sendMsg()}}/>
                <button onClick={sendMsg}>Send</button>
            </div>
        </div>
    );
}
export default Chat;