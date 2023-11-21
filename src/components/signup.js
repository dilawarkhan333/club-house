import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SIgn_img from './SIgn_img'
import { Await, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import background from '../Assets/sgimg.png'
import "../App.css"
import Footers from './Footer'
import firebase from './firebaseconfig'


const Signup = () => {

     const history = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [date, setDate] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (e) => {

        e.preventDefault()
        try {

            const user = await firebase.auth().createUserWithEmailAndPassword(email, password)

            if (user)
             {
        
             }
  
            
           
        } catch (error) {

            if (name === "") {
                toast.error(' name field is requred!',{
                    position: "top-center",
                });
            } else if (email === "") {
                 toast.error('email field is requred',{
                    position: "top-center",
                });
            } else if (!email.includes("@")) {
                 toast.error('plz enter valid email addres',{
                    position: "top-center",
                });
            } else if (date === "") {
                 toast.error('date field is requred',{
                    position: "top-center",
                });
            } else if (password === "") {
                 toast.error('password field is requred',{
                    position: "top-center",
                });
            } else if (password.length < 5) {
                 toast.error('password length greater five',{
                    position: "top-center",
                });
              } else{
                toast("Account Create successfully");
                history("/login")

              }

          
        
        }

    }


    return (
        <>
            <div className='' style={{ backgroundImage: `url(${background})`}} >
                <div className='clb' >
                    <SIgn_img />
                </div>
                <div className='main-container' >
                    <div className="container mt-3"  >
                        <section className='d-flex justify-content-between'>
                            <div className="left_data mt-3 p-3" style={{ width: "100%" }}>

                                <Form className='fields'  >
                                    <Form.Group className="mb-3 col-lg-10" controlId="formBasicEmail">

                                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="First Name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-lg-10" controlId="formBasicEmail">

                                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address or phone number" />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-10" value={date} onChange={(e) => setDate(e.target.value)} controlId="formBasicEmail">

                                        <Form.Control name='date' type="date" />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-10" controlId="formBasicPassword">

                                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                    </Form.Group>
                                    <Button variant="primary" className='sgnbtn col-lg-10' onClick={submit} style={{ backgroundColor: "rgb(244 114 182)", fontWeight: "900", fontSize: "20px", borderColor: "rgb(226 232 240)", borderRadius: "8px" }} type="submit">
                                        Sign Up
                                    </Button>
                                </Form>
                                <p className='tapbar mt-3'>Already Have an Account? <span ><NavLink to="/login" style={{ fontWeight: "600" }} >Sign in</NavLink></span> </p>
                            </div>
                          

                        </section>
                        <ToastContainer />
                    </div>
                </div>
                <br />
                <br />
                <br />
            </div>
            <Footers />
        </>
    )
}

export default Signup
