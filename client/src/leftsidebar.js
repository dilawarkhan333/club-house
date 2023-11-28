import React, { useState, useEffect } from 'react';
import './leftsidebar.css'; // Include CSS for styling (create this file)
import { db,database } from './components/firebaseconfig';
import { Button, Card, Grid, Container, Image } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { Collection, collection, onSnapshot } from 'firebase/firestore';
import User from './Assets/User.png'
import { RiUser3Fill } from "react-icons/ri";
import { FaClock } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { MdOutlineCalendarViewMonth } from "react-icons/md";
import { MdFeed } from "react-icons/md";
import { FaChevronCircleDown } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import {signOut} from "firebase/auth"

const LeftSidebar = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {

        list.push({ id: doc.id, ...doc.data() })
      });
      setUsers(list);
      setLoading(false);
    },
      (error) => {
        console.log("error")
      }
    );

return () =>{
  unsub();
};

  },[])

  const history = useNavigate()
  const handleClick = () =>{
    signOut(database).then(val => {
  
  history("/login")
  
  
    })
  }

  return (
    <div className="left-sidebar" >

      {/* User Profile */}
      {/* <div className="profile">
        <img
          src={User}
          alt="Profile"
          className="profile-pic"
        />
        <span className="user-name">Merry Jhonson</span>
      </div> */}

      <Container>
<Card.Group>
<Grid stackable>
  {users &&
  users.map((item) => (
<Grid.Column>
<Card key={item.id}>
  <Card.Content>
<div className="profile" >
<Image 

src={item.img}
className="profile-pic"

/>
</div>

<span className="user-name">{item.name}</span>

  </Card.Content>
  
  </Card> 

</Grid.Column>


  ))
  
  
  }



</Grid>
</Card.Group>
      </Container>


      {/* Explore Section */}
      <div className="explore">


        <a href="#"><p> <RiUser3Fill /> </p> <b>Pages</b></a>
        <a href="#"><p><FaClock /></p> <b>Memories</b></a>
        <a href="#"><p><FaBookmark /></p><b> Saved</b></a>
        <a href="#"><p><MdGroups /></p><b>Groups</b></a>
        <a href="#"><p><MdOutlineSlowMotionVideo /></p><b>Video</b></a>
        <a href="#"><p><MdOutlineCalendarViewMonth /></p><b>Events</b></a>
        <a href="#"><p><MdFeed /></p><b>Feeds</b></a>
        <a href="#"><p><FaChevronCircleDown /></p><b>See More</b></a>
        <a href="#"><p><IoLogOut /></p><button onClick={handleClick} >Logout</button></a>
        {/* Add more explore links */}
      </div>

      {/* Other functionalities */}
      {/* Add more sections like saved items, games, etc. */}
    </div>

  );
};

export default LeftSidebar;
