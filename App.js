
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import axios from './Axios';

function App() {

  const [messages, setMesssages] = useState([]);

  useEffect(()=>{
    axios.get("/messages/sync").then((response)=>{
      setMesssages(response.data)
  });
},[]);

   useEffect(()=>{
    const pusher = new Pusher('fceb49d20659b6775187', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted',(newMessage)=> {
      setMesssages([...messages,newMessage])
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }

   },[messages]);
   console.log(messages);

  return (
    <div className="App">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
