
import { useState, useEffect, useRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import './style.css'
import MDBox from "components/MDBox";
import breakpoints from "assets/theme/base/breakpoints";
import backgroundImage from "assets/images/bg-profile.jpeg";
import { useSelector } from "react-redux";
import axios from "axios";
import { AppBar, Box, Button, Icon, Modal, Switch, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";


function Header({ children }) {

  const [followsMe, setFollowsMe] = useState(true);
  const [mentionsMe, setMentionsMe] = useState(true);
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const navigate= useNavigate();
  const [showForm, setShowForm] = useState(false); 
  const [showFileName, setShowFileName] = useState(false); 
  const [message, setMessage] = useState("");
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
  });
  const [emailForm, setEmailForm] = useState({
    from:"",
    to:"",
    subject:"",
    message:""
  });

  const fileInputRef=useRef(null);
  const [currentUserDetails,setCurrentUserDetails ]=useState(null);
  const profileImageUrl = user?.imageUrl || "";
  const filename=profileImageUrl?profileImageUrl.split('/').pop():'';
  const imageUrlPath=`http://localhost:8023/user/images/${encodeURI(filename)}`
  const [selectedFileName ,setSelectedFileName]= useState('') ;

  const fetchUserByEmail= async (email) => {
    const url = `http://localhost:8023/user/findByEmail/${email}`;
    const response = await axios.get(url);
    console.log("Response from server:", response.data, response);
    setUser(response.data);
};

 useEffect(() => {
  fetchUserByEmail(email);
}, [email]);

  useEffect(() => {

    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };


  const handleSendMessage = async () => {
    try {
      // Assuming you have an API endpoint to send messages
      await axios.post("http://localhost:8023/email/send-email", emailForm);
      handleCloseForm();
      dispatch({ type: "MESSAGE_SENT", payload: message });
      setEmailForm({
        from:"",
        to:"",
        subject:"",
        message:""
      });
      navigate("/profile")

    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmailForm({ ...emailForm, [name]: value });
  };
  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };


  

const handleImageClick=()=>{
  if (fileInputRef.current){fileInputRef.current.click() ;}
}

const handleImagechange=(event)=>{
const file=event.target.files[0];
if (file) {
  const reader =new FileReader();
  reader.onload=()=>{
    console.log("sucessfuly",reader.result);
    setSelectedFileName(file.name) //update the name of the file
  };
  reader.readAsDataURL(file);
}
};

  const handleImageUpload = async () => {
    try {
        const accessToken = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('profileImage', fileInputRef.current.files[0]);

    const response1 = await axios.post('http://localhost:8023/user-activity/save',
    {
      userId: user.id,
      timestamp: new Date(),
      description: 'Changed profile image',
  }
    );


        const response = await axios.put(`http://localhost:8023/user/update-profile/${user.id}`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/formData',
            }
        });
        console.log('profile image', response.data);
        setShowFileName(true);
        setUser(prevUser => ({ ...prevUser, imageUrl: response.data.imageUrl }));
    } catch (error) {
        console.error("Error uploading image:", error);
    }
};

const handleUpdateUser= async () => {
  const url = `http://localhost:8023/user/update`;
  const response = await axios.put(url,user);
  console.log("user updated:", response.data);
  setUser(response.data);

  const response1 = await axios.post('http://localhost:8023/user-activity/save',
  {
    userId: user.id,
    timestamp: new Date(),
    description: 'Profile details updated',
}
  );
};
  return (

    
    <MDBox position="relative" mb={5}>
      
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <h6  className="detailsTitle" >
         MY  <strong>PROFILE</strong> INFORMATIONS 
        </h6>
        <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }} style={{paddingTop:'1%',width:'35%'}}>
            <AppBar position="static" >
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="Dashboard"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      home
                    </Icon>
                  }
                  onClick={navigateToDashboard}
                />
                <Tab
                  label=
                  "Message"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      email
                    </Icon>
                  }
                  onClick={handleOpenForm}
                 />
               { showForm &&
                <Modal open={open} onClose={handleCloseForm}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          minWidth: 400,
          maxWidth: 600,
          borderRadius: 8,
        }}
      >
        <Typography variant="h5" component="h2" mb={2}>
          Compose Message
        </Typography>
        <form onSubmit={handleSendMessage}>
          <Box mb={2}>
            <TextField
              label="From"
              variant="outlined"
              name="from"
              value={emailForm.from}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="To"
              variant="outlined"
              name="to"
              value={emailForm.to}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Subject"
              variant="outlined"
              name="subject"
              value={emailForm.subject}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Message"
              variant="outlined"
              name="message"
              value={emailForm.message}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" gap="5%">
          <Button type="submit" variant="contained" color="info" style={{color:"white",backgroundColor:"rgb(184, 6, 6)"}} onClick={handleCloseForm}>
             Close
          </Button>
            <Button type="submit" variant="contained" color="info" style={{color:"white",backgroundColor:"blueviolet"}}>
              Send
            </Button>
            
          </Box>
        </form>
      </Box>
    </Modal>
}
              </Tabs>
            </AppBar>
  </Grid>
  <Grid container spacing={3} alignItems="center">
         
  <Grid item xs={12} sm={6} style={{ height: '50rem' }}>

    {/* Left Section */}
    <Card className="profile-card">
      {/* Profile Image */}
      <Grid item>
        <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImagechange}
       />
       <img
        className="profile_imgg"
        src={imageUrlPath}
        alt="profile-image"
        onClick={handleImageClick}
       />
      
      <MDButton variant="gradient" color="info" fullWidth type="submit" onClick={handleImageUpload}style={{width:'50%' ,marginLeft:'23%'}}>Upload Image</MDButton>
        <div style={{color:'grey' , padding:'3% 0 0 30%', fontSize:'13px'}}> Filename: {showFileName ? selectedFileName : <></>}</div>
      </Grid>

      <MDBox style={{paddingRight:'50%'}} >
        <h6  className="details">
       MY PROFILE DETAILS 
        </h6>
        <MDBox display="flex" alignItems="center" mb={0.5}  className="profileTextt">     
            <h6 className="detailsField" > Username :  </h6>
            <h4 className="detailsValues">{user.firstname} {user.lastname}</h4>               
        </MDBox> 

        <MDBox display="flex" alignItems="center" mb={0.5}  className="profileTextt">     
            <h6 className="detailsField" >  Number :  </h6>
            <h4 className="tdClass" style={{paddingLeft:"7%"}}>{user.phone}</h4>               
        </MDBox>

        <MDBox display="flex" alignItems="center" mb={0.5}  className="profileTextt">     
            <h6 className="detailsField" >  Email:  </h6>
            <h4 className="tdClass" style={{paddingLeft:"5%"}}>{user.email}</h4>               
        </MDBox>     

        <MDBox display="flex" alignItems="center" mb={0.5}  className="profileTextt">     
            <h6 className="detailsField" >  Profession :  </h6>
            <h4 className="tdClass">{user.profession}</h4>               
        </MDBox>
      </MDBox>
    </Card>
  </Grid>
  

  <Grid item xs={12} sm={6} style={{ height: '35rem' }} >
    {/* Right Section */}
    <Grid container direction="column" spacing={3} >
    
      {/* Top Section */}
      <Grid item>
        <Card className="update-form-card">
         <h5 className="details">EDIT PROFILE</h5>
          <form className="update-form">
            <TextField label="First Name" name="firstname" value={user.firstname} variant="outlined" fullWidth onChange={handleProfileChange}/>
            <TextField label="Last Name" name="lastname" value={user.lastname} variant="outlined" fullWidth onChange={handleProfileChange}/>
            <TextField label="Email"  name="email" value={user.email} variant="outlined" fullWidth onChange={handleProfileChange}/>
            <TextField label="Phone" name="phone" value={user.phone} variant="outlined" fullWidth onChange={handleProfileChange} />
            <TextField label="Profession" name="profession" value={user.profession} variant="outlined" fullWidth onChange={handleProfileChange}/>
           
            <MDButton variant="gradient" color="info" fullWidth type="submit" onClick={handleUpdateUser}>Update</MDButton>


          </form>
        </Card>
      </Grid>
      {/* Bottom Section */}
      <Grid item  >   
      <Card className="empty-card">

      <MDBox>
        <h6 className="details">
          Platform Settings
        </h6>
      </MDBox>
      <MDBox>
        <h6  style={{color:"grey", paddingTop:'5%'}}>
          ACCOUNT
        </h6>
      </MDBox>
      <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
        
          <MDBox mt={0.5} display='flex'>
            <Switch checked={followsMe} onChange={() => setFollowsMe(!followsMe)} />
            <h6 className="settings">
             News Alert
            </h6>
          </MDBox>

          <MDBox mt={0.5} display='flex'>
          <Switch checked={mentionsMe} onChange={() => setMentionsMe(!mentionsMe)} />
            <h6 className="settings">
           Company Notifications
            </h6>
          </MDBox>
        </MDBox>          
        </Card>
         
      </Grid>  
    </Grid> 
  </Grid>
</Grid>        
      </Card>
    </MDBox>
  );
}

Header.defaultProps = {
  children: "",
};

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;