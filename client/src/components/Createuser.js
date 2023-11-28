import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from 'semantic-ui-react';
import { storage , db} from './firebaseconfig';
import { useParams, useNavigate } from "react-router-dom";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { addDoc, collection, getDoc, doc, serverTimestamp } from "firebase/firestore";

const initialState = {
    name: "",
    email: "",
    info: "",
    contact: ""
}

const Createuser = () => {
    const [data, setData] = useState(initialState);
    const { name, email, info, contact } = data;
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() =>{
    id && getSingleUser();
    },[id] )
    
    const getSingleUser = async() => {
    const docRef = doc(db, "users", id);
    const snapshot = await getDoc(docRef);
if(snapshot.exists()){
setData({ ...snapshot.data()});

}
  };
    



    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progress);
                switch (snapshot.state) {
                    case "paused":
                        console.log("upload paused")
                        break;
                    case "running":
                        console.log("upload running")
                        break;
                    default:
                        break;

                }
            },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURl) => {
                        setData((prev) => ({ ...prev, img: downloadURl }));

                    });

                }

            );
        };

        file && uploadFile();

    }, [file]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };



    const validate = () => {
        let errors = {};
        if (!name) {
            errors.name = "Name is required";

        }
        if (!email) {
            errors.email = "email is required";

        }
        if (!info) {
            errors.info = "info is required";

        }
        if (!contact) {
            errors.contact = "Contact is required";

        }
        return errors;

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = validate();
        if (Object.keys(errors).length) return setErrors(errors);
        setIsSubmit(true);
        await addDoc(collection(db, "users"),{
            ...data,
            timestamp: serverTimestamp()
        });
        navigate("/login",{replace:true});
    };

    return (
        <>
            <Grid

                centered verticalAlign="middle"
                columns="3"
                style={{ height: "80vh" }}
            >
                <Grid.Row>
                    <Grid.Column textAlign="center">
                        <div>
                            {isSubmit ? (

                                <Loader active inline="centered" size="huge" />
                            ) : (
                                <>
                                    <h2>Add user</h2>
                                    <Form onSubmit={handleSubmit} >
                                        <Form.Input label="Name" error={errors.name ? { content: errors.name } : null} placeHolder="" name="name" onChange={handleChange}
                                            value={name} autoFocus />
                                        <Form.Input label="Email" error={errors.email ? { content: errors.email } : null} placeHolder="Enter Email" name="email" onChange={handleChange}
                                            value={email} />
                                        <Form.TextArea label="Info" error={errors.info ? { content: errors.info } : null} placeHolder="Info" name="info" onChange={handleChange}
                                            value={info} />

                                        <Form.Input label="Contact" error={errors.contact ? { content: errors.contact } : null} placeHolder="Enter Contact" name="contact" onChange={handleChange}
                                            value={contact} />

                                        <Form.Input label="Upload" placeHolder="Upload image" type="file" onChange={(e) => setFile(e.target.files[0])}
                                             />

                                        <Button primary type="submit" disabled={progress !== null && progress < 100}  > Submit </Button>
                                    </Form>
                                </>
                            )}
                        </div>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}

export default Createuser;
