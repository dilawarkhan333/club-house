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
import { sendPasswordResetEmail } from "firebase/auth";
const Forget = () => {

    const history = useNavigate();
    const [email, setEmail] = useState('')
    const [loading, setloading] = useState(false)


    const submit = async (e) => {
        // console.log(history)
        //   history("/login")
        setloading(true)
        e.preventDefault()
        try {
            await firebase.auth().sendPasswordResetEmail(email)
            setloading(false)
            toast.success('email field is requred', {
                position: "top-center",
            });
            setEmail("")
            // history("/login")


        } catch (error) {
            if (email === "") {
                toast.error('email field is requred', {
                    position: "top-center",
                });
                setloading(false)
            }

            else if (!email.includes("@")) {
                toast.error('plz enter valid email addres', {
                    position: "top-center",
                });
            }

            else {
                // toast("Check Email");
                history("/login")

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
                                    <span className='lgbar mb-2 ' ><NavLink to="/login" style={{ fontWeight: "600", textDecoration: "none", color: "black" }} >Back to Signin</NavLink></span>

                                    {
                                        loading == false ?
                                            <Button variant="primary" className='lgbtn  col-lg-12' onClick={submit} style={{ fontWeight: "500", fontSize: "20px", borderColor: "rgb(226 232 240)" }} type="submit">
                                                Reset
                                            </Button>
                                            :
                                            <b>Loading....</b>


                                    }





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

export default Forget