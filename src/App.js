import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import { Form, Input } from '@rocketseat/unform';

const socket = io('http://localhost:3005');

function App() {
  const [idSocket, setIdSocket] = useState();
  const [allMessages, setAllMessages] = useState([]);
  let receivedMessages = [];


  useEffect(() => {
    function defaultFunc() {
      loadAllMessages();
      console.log('useEffetc receivedMessages- ', receivedMessages, " - allMessages", allMessages);
    }
    defaultFunc();
  },[]);

  function loadAllMessages() {
    socket.on('id', (id) => setIdSocket(id));
    console.log('loadAllMessages - id');

    // socket.on('receivedMessage', (data) => setAllMessages(data))
    socket.on('receivedMessage', function(data) {
      
      receivedMessages.push(data);
      setAllMessages(receivedMessages);
      console.log('receivedMessage - ', receivedMessages," - allMessages", allMessages );

    }); 
  }

  function sendMessage(data) {
    socket.emit('sendMessage', data);
    receivedMessages.push(data);
    setAllMessages(receivedMessages);
    console.log('sendMessages - ', receivedMessages," - allMessages", allMessages);
  };

  return (
    <div className="App">

      <Form onSubmit={sendMessage} className="formChat">
        <label htmlFor="">
          ID da conexão: { idSocket }
        </label>
        <div className="content">
          <div>
            <Input type="text" name="name" placeholder="Dígite seu nome"/>

            <div className="allMessage">
              {allMessages.map(data => (
                <div>
                  <strong>{data.name}: </strong>
                  <label htmlFor="">{data.msg}</label>
                  {console.log(data.name)}
                </div>
              ))}
            </div>

            <Input type="text" name="msg" placeholder="Dígite a mensagem"/>

            <button type="submit">Enviar</button>
          
          </div>
        </div>
      </Form>
    </div>
  );
}

export default App;
