import axios from 'axios'
import PageLayout from 'examples/LayoutContainers/PageLayout'
import ComponentNavbar from 'examples/Navbars/ComponentNavbar'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import userLogo from "assets/images/logoUser.png" 
import chatLogo from "assets/images/logo.png" 
import team4 from 'assets/images/ranim.png'


import './chat.css'
import MDButton from 'components/MDButton'

const Chat = () => {
    const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const email = useSelector((state) => state.auth.value.email);
  const [user,setUser]=useState({ 
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
  })
  const fetchUserByEmail= async (email) => {
    const url = `http://localhost:8023/user/findByEmail/${email}`;
    const response = await axios.get(url);
    setUser(response.data);
};
useEffect(() => {
    fetchUserByEmail(email);
  }, [email]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    console.log("hi");

    try {
      const response = await fetch('your_api_endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const responseData = await response.json();
      console.log(responseData);

      setResponse(responseData.choices[0].message.content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    < div className='backg'> 
    <PageLayout >
    <ComponentNavbar/>
    <div className="bgContainer mt-5"  >       
          <div className="col-sm-9">
            <h1>Welcome {user.firstname} !</h1>
          </div>

        <div className="chat-box mt-3">
          <div className="user-message">
            <img src={userLogo} alt="User" className="avatar" />
            <p className="message">{message}</p>
          </div>
          <div className="gpt-response">
            <img src={chatLogo} alt="ChatGPT" className="avatar" />
            <p className="message">{response}</p>
          </div>
        </div>

        <div className="form-group mt-3">
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
    </PageLayout>
    </div>
  )
}

export default Chat