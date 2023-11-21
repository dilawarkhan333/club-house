import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
export default function Footers() {
  return (


  
    <MDBFooter bgColor='light'>
      <MDBContainer className='pt-4'>
      
           
           <p className='demitxt' >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias.
              Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam,
              est atque cumque eum delectus sint.  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias.
              Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam,
              est atque cumque eum delectus sint!
            </p>
            
 <div className='icns' >
 <p className='txtf mt-2 '>Follow Us</p>
<div className='lgicn' >
           <h3><FaFacebookF /></h3>
           <h3><FaInstagram /></h3>
           <h3><BsTwitterX /></h3>
           </div>     
           </div>   
      </MDBContainer>

    </MDBFooter>
   
  );
}