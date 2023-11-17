import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link } from "react-router-dom"
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';


const Register = ({userID = "", usernameP = "", passwordP="", firstNameP = "", lastNameP = "", emailP="", dateOfBirthP="", imageP ="", type="register"}) => {
    const classes = useStyles();
    const [username, setUsername] = useState(usernameP)
    const [password, setPassword] = useState(passwordP)
    const [firstName, setFirstName] = useState(firstNameP)
    const [lastName, setLastName] = useState(lastNameP)
    const [email, setEmail] = useState(emailP)
    const [dateOfBirth, setDateOfBirth] = useState(dateOfBirthP)
    const [image, setImage ] = useState(imageP)
    const navigate = useNavigate();


    function convertToBase64(file){
        return new Promise((resolve, reject)=>{
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file);
            fileReader.onload = () =>{
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) =>{
                reject(error)
            }
        })
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

      const handleImageUpload = async (e)=>{
            const profileImage = e.target.files[0]
            const base64 = await convertToBase64(profileImage);
            setImage(base64)
      }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3001/auth/register", { username, password, image, firstName, lastName, email, dateOfBirth })
            navigate('/login')
        } catch (err) {
            console.error(err)
        }


    }


    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await axios.put("http://localhost:3001/auth/edit", {userID, username, password, image, firstName, lastName, email, dateOfBirth })
            alert("success")
        } catch (err) {
            console.error(err)
        }


    }

    return (
        <>
            <div className={type === 'register' ? classes.bdy : classes.edit}>
            <form className={classes.form} onSubmit={type === "register" ? handleSubmit : handleUpdate}>
            {type === "register" ? (<h2>Register</h2>) : (<h2>Edit</h2>)}
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                    <TextField
                        className={classes.textfield}
                        type="text"
                        variant='filled'
                        color='primary'
                        label="First Name"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                    />
                    <TextField
                        className={classes.textfield}
                        type="text"
                        variant='filled'
                        color='primary'
                        label="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4}}>
                    <TextField
                        className={classes.textfield}
                        type="text"
                        variant='filled'
                        color='primary'
                        label="Username"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        fullWidth
                        required
                        //sx={{ mb: 4 }}
                    />

                </Stack>
                    <TextField
                        className={classes.textfield}
                        type="password"
                        variant='filled'
                        color='primary'
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required
                        fullWidth
                        sx={{ mb: 4 }}
                    />
                <Stack spacing={2} direction="row" sx={{ marginBottom: 6 }}>
                    <label for="dateOfBirth"> Date of birth</label>
                    <TextField
                        className={classes.textfield}
                        id='dateOfBirth'
                        type="date"
                        variant='filled'
                        color='primary'
                        onChange={e => setDateOfBirth(e.target.value)}
                        value={dateOfBirth}

                        required
                        sx={{ mb: 4 }}
                    />
                    <TextField
                        className={classes.textfield}
                        type="email"
                        variant='filled'
                        color='primary'
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        fullWidth
                        required
                        sx={{ mb: 4 }}
                    />
                </Stack>
                    <Button className={classes.btn2}component="label" variant="contained" required sx={{ mr: 20 }} startIcon={<CloudUploadIcon />}>
                        Upload Profile Picture
                        <VisuallyHiddenInput  type="file" accept='.jpeg, .png, .jpg' onChange={e => handleImageUpload(e)}  name='image'/>
                    </Button>

                {type === "register" ? (
                    <Button className={classes.btn} variant="contained" color="primary" type="submit">Register</Button>

                ):(
                    <Button className={classes.btn} variant="contained" color="primary" type="submit">Update</Button>
                )}    
                {type==="register" && <small className={classes.mess}>Already have an account? <Link className={classes.login} to="/login">Login Here</Link></small>}
            </form>
            </div>
        </>


    )
}

export default Register

