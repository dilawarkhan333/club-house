import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SIgn_img from './SIgn_img'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom'
import Footers from './Footer'
import background from '../Assets/bgimage.png'
import firebase from './firebaseconfig'
const Login = () => {

    const history = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (e) => {

        e.preventDefault()
        try {

            const user = await firebase.auth().signInWithEmailAndPassword(email, password)

            if (user)

                if (user) {


                    toast("SignIn successfully");
                    history("/dashboard")
                }
            // alert("SignIn successfully")


        } catch (error) {
            if (email === "") {
                toast.error('email field is requred', {
                    position: "top-center",
                });
            } else if (!email.includes("@")) {
                toast.error('plz enter valid email addres', {
                    position: "top-center",
                });
            }else if (!email.includes("email")) {
                toast.error('plz enter valid email addres', {
                    position: "top-center",
                });
            } else if (password === "") {
                toast.error('password field is requred', {
                    position: "top-center",
                });
            } else if (password.length < 5) {
                toast.error('password length greater five', {
                    position: "top-center",
                });
            } else if (!password.includes("password")) {
                toast.error('plz enter valid password', {
                    position: "top-center",
                });
            }

            else {
                // toast("SignIn successfully");
                // history("/details")
            }
        }

    }


    return (
        <>
            <div className='bgimg' style={{ backgroundImage: `url(${background})` }} >
                <div className='clblog' >
                    <SIgn_img />
                </div>
                <p className='txtcntr' >Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>

                <div className='log-container' >
                    <div className="container mt-3">
                        <section className='d-flex justify-content-between'>
                            <div className="left_data mt-3 p-3" style={{ width: "100%" }}>

                                <Form className='txtfields'  >

                                    <Form.Group className="mb-3 col-lg-12" controlId="formBasicEmail">

                                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address or phone number" />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-12" controlId="formBasicPassword">

                                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                    </Form.Group>
                                    <Button variant="primary" className='lgbtn  col-lg-12' onClick={submit} style={{ fontWeight: "500", fontSize: "20px", borderColor: "rgb(226 232 240)" }} type="submit">
                                        Sign In
                                    </Button>

                                    <span className='lgbar mt-2' ><NavLink to="/forget" style={{ fontWeight: "600", textDecoration: "none", color: "black" }} >forget your password</NavLink></span>
                                    <span className='line mb-4 '>_________________________________________________________</span>

                                    <Button className='crte  col-lg-5 ' style={{ backgroundColor: "rgb(190 24 93)", fontWeight: "600", fontSize: "14px", borderColor: "rgb(226 232 240)", padding: "10px" }}>
                                        <span><NavLink to="/" style={{ fontWeight: "600", textDecoration: "none", color: "white" }} >Create new account</NavLink></span>
                                    </Button>
                                </Form>
                            </div>

                            {/* <span><NavLink to="/" style={{fontWeight:"600"}} >SignUp</NavLink></span>  */}
                        </section>
                        <ToastContainer />
                    </div>
                </div>
                <br />
                <br />
                <br />
                <Footers />
            </div>
           
        </>

    )
}

export default Login