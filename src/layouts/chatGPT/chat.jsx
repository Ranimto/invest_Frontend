import axios from 'axios';
import ComponentNavbar from 'examples/Navbars/ComponentNavbar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import userLogo from "assets/images/logoUser.png";
import chatLogo from "assets/images/logo.png";
import './chat.css';
import MDButton from 'components/MDButton';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const email = useSelector((state) => state.auth.value.email);
  const token = useSelector((state) => state.auth.value.token);
  const [user, setUser] = useState({ 
    id:"",  
    firstname:"",
    lastname:"",
    email :"",
    phone :"",
    city:"",
    nationality:"",
    postcode:"",
    profession:"",
    imageUrl:""
  });

  const fetchUserByEmail= async(email)=>{
    const response= await axios.get(`http://localhost:8023/user/findByEmail/${email}`, 
    {
      headers: {
          'Authorization': `Bearer ${token}` 
      }
  });
    setUser( response.data);  
  }

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    if (!message.trim()) return;
    const newMessage = { sender: 'user', content: message };
    setChatHistory([...chatHistory, newMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const body = {
        message: message
      };
      const response = await axios.post("http://127.0.0.1:5111/chatgeneration", body);
      const newResponse = { sender: 'bot', content: response.data.response };
      setChatHistory([...chatHistory, newMessage, newResponse]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    fetchUserByEmail(email)
  },[email])
  return (
    <div style={{backgroundColor:"transparent"}}> 
      <DashboardLayout>
        <ComponentNavbar/>
        <div className="bgContainer mt-5">       
          <div className="col-sm-9">
            <h1>Welcome to our AI-Chat {user.firstname} !</h1>
            <p style={{margin:"-5% 0 0 30%" ,color:"rgba(16, 5, 65, 0.873)" ,fontWeight:"100" , fontSize:"14px"}}>If You Have Any Guestion Feel Free To Ask Our AI-bot !</p>
          </div>

          <div className="chat-box mt-3" style={{backgroundColor:"transparent", border:"1px solid blueviolet", marginTop:"5%"}}>
            {chatHistory.map((chat, index) => (
              <Grid key={index} className={chat.sender === 'user' ? 'user-message' : 'bot-response'} display="flex" justifyContent={chat.sender === 'user' ? "flex-end" : "flex-start"} alignItems="center">
                <img src={chat.sender === 'user' ? userLogo : chatLogo} alt={chat.sender === 'user' ? "User" : "Bot"} className="avatar" />
                <p className={chat.sender === 'user' ? 'user-text' : 'bot-text'} style={{marginLeft:"1%"}}>{chat.content}</p>
              </Grid>
            ))}
            {isLoading && <div className="loading"><CircularProgress /></div>}
          </div>
          <div className="form-group mt-3" style={{marginLeft:"1%"}}>
            <textarea 
              className="form-control"
              rows="3"
              placeholder="Type your message here"
              value={message}
              onChange={handleChange}
            ></textarea>
          </div>
          <MDButton variant="gradient" color="info" fullWidth type="submit" onClick={handleSubmit} className='chatBtn'>Send</MDButton>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default Chat;
