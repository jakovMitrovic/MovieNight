import React from 'react'

import { Typography, CircularProgress, Button, Box } from '@mui/material'
import { ExitToApp } from '@mui/icons-material'
import UseGetUserID from "../../services/UseGetUserID"
import { useGetUserDetailsQuery } from "../../services/TMDB"
import { useCookies } from 'react-cookie'

import useStyles from './styles'
import { useState } from 'react'
import Movie from '../Movie/Movie'
import Register from '../Register/Register'
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'
import { useEffect, useReducer } from 'react'
import { Grid } from '@mui/material';
import axios from 'axios'
import { useParams } from 'react-router-dom'

import { useGetSavedMoviesQuery } from '../../services/TMDB'
import MovieList from '../MovieList/MovieList'

const Profile = () => {


  const { id } = useParams();
  const { data, isFetching, error } = useGetUserDetailsQuery(id);

  //const { data: movies, isFetching: isSavedFetching, errxor } = useGetSavedMoviesQuery(id);
  const [editB, setEditB] = useState(false)
  const [cookies, setCookies] = useCookies(["access_token"])
  const classes = useStyles()
  const [movies, setMovies] = useState();






  const logout = () => {

    setCookies("access_token", "")
    window.localStorage.removeItem("userID")
    window.location.href = '/'
  }

  useEffect(() => {
    window.scrollTo(0, 0)

    const interval = setInterval(() => {
      axios.get(`http://localhost:3001/movies/savedMovies/${id}`, {headers: {authorization: cookies?.access_token}})
        .then(res => setMovies(res?.data))
        .catch(err => console.error(err));
    }, 1000); //set your time here. repeat every 5 seconds

    return () => clearInterval(interval);






  }, []);

 

  return (


<>

      {movies === undefined ? (
        <Box className={classes.loading} display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress size='5rem'></CircularProgress>
        </Box>
      ) : (
    <div className={classes.bdy}>

        <Grid container spacing={3}>
          <Grid item lg={5} xl={4}>
            <img
              className={classes.image}
              src={data?.image}
            />
          </Grid>
          <Grid className={classes.info} item container direction='column' lg={7} >
            <Typography variant='h3' align="center" gutterBottom style={{ marginTop: '6%' }}>
              {data?.firstName} {data?.lastName}
              <Typography color="#A9A9A9">
                Name
              </Typography>
            </Typography>
            <Typography variant='h3' gutterBottom align="center" >
              {data?.username}
              <Typography color="#A9A9A9">
                username
              </Typography>
            </Typography>
            <Typography variant='h3' gutterBottom align="center" >
              {data?.email}
              <Typography color="#A9A9A9">
                eMail
              </Typography>
            </Typography>
            <Box align="center" style={{ marginTop: '10%' }}>

              <Link size='5rem' className={classes.backBtn} to={"/"}><ArrowBack className={classes.backArr} /> Go Back</Link>
              <Button style={{ marginLeft: '50px', marginRight: '50px' }} color='inherit' onClick={() => { setEditB(!editB) }}>
                {editB ? "Close" : "Edit"} &nbsp; <EditIcon />
              </Button>
              <Button color='inherit' onClick={logout}>
                Logout &nbsp; <ExitToApp />
              </Button>
            </Box>
          </Grid>
        </Grid>

      {editB && (
        <Register userID={id}
          usernameP={data?.username}
          passwordP={data?.password}
          firstNameP={data?.firstName}
          lastNameP={data?.lastName}
          emailP={data?.email}
          dateOfBirthP={data?.dateOfBirth}
          imageP={data?.image}
          type="edit" />

      )}


      <Box margin='2rem 0'>
        <Typography variant='h2' align='center' gutterBottom style={{ textShadow: '0px 0px 24px rgba(255, 65, 85, 0.99)' }}>
          Saved Movies
        </Typography>
        <Grid container className={classes.moviesContainer}>
        {movies.savedMovies?.map((movie, i) => (
          <Movie key={i} movie={movie} i={i} />
        ))}
        </Grid>

      

      </Box>


    </div>
      )}
</>



  );
}

export default Profile

