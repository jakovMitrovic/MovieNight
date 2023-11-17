import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Actors, Movies, MovieInfo, Profile, Navbar } from './'
import Register from "./Register/Register"
import Login from "./Login/Login"
import useStyles from './Styles';



const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route exact path="/" element={<Movies />} />
          <Route exact path="/movie/:id" element={<MovieInfo />} />
          <Route exact path="/actors/:id" element={<Actors />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route exact path='/register' element={<Register/>} />
          <Route exact path='/login' element={<Login/>} />
        </Routes>
      </main>
    </div>
  )
};

export default App;
