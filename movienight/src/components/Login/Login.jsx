import React from 'react'
import { useState } from 'react'
import axios from "axios"
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom"
import { TextField, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom"
import useStyles from "./styles"



function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [_, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate();
    const [errM, setErrM] = useState("");
    const classes = useStyles();
    const [loading, setLoading] = useState(false);



    const handleSubmit = async(e) =>{
        e.preventDefault()
        setErrM(false)
        

        setLoading(true)
        try{
            const response = await axios.post("http://localhost:3001/auth/login", {username, password})
            if(response.data.userId === undefined){
                setErrM("Username or password incorect")
                setLoading(false)
                
            }else{
                setCookies("access_token", response.data.token);
                window.localStorage.setItem("userID", response.data.userId)
                navigate("/")
                
            }
        }catch(err){
            alert(err)
        }


    }

  return (
    <div className={classes.bdy}>
        <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
            <h2 className={classes.title}>Login</h2>
                <TextField 
                className={classes.textfield}
                    label="Username"
                    onChange={e => setUsername(e.target.value)}
                    required
                    variant="filled"
                    color="primary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={username}
                    
                 />
                 <TextField 
                 className={classes.textfield}
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="filled"
                    color="primary"
                    type="password"
                    value={password}
                   
                    fullWidth
                    sx={{mb: 3}}
                 />
                 <Button className={classes.btn} variant="contained" color="primary"  type="submit">{loading ? <CircularProgress size='1.5rem'/> : "Login"}</Button>
             
                <small className={classes.mess}>Need an account <Link type='button' className={classes.register} to="/register">Register here</Link></small>
                <p className={classes.errM}>{errM}</p>
        </form>
    </div>







  )
}

export default Login
