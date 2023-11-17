import React, {useState, useEffect} from 'react'
import { Typography, Button, Grid, Box, CircularProgress } from '@mui/material';
import {useNavigate , useParams} from 'react-router-dom'; 
import { ArrowBack } from '@mui/icons-material';
import { useGetActorDetailsQuery } from '../../services/TMDB';
import useStyles from './styles';
import { useGetMoviesByActorQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination';

const Actors = () => {
  const[page, setPage] = useState(1)
  const {id} = useParams();
  const {data, isFetching, error} = useGetActorDetailsQuery(id);
  const navigate = useNavigate();
  const classes = useStyles();
  const {data : movies, isFetching: isMoviesFetching} = useGetMoviesByActorQuery({id, page});
  
  useEffect(()=>{
    window.scrollTo(0, 0)
  })


  if(error){
    <Box display='flex' justifyContent='center' alignItems='center'>
      <Button startIcon={<ArrowBack />} onClick={()=>navigate('/')}>Go Back</Button>
    </Box>
  }

    return (
      <>
        {isFetching ? (
        <Box className={classes.loading} display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress size='5rem'></CircularProgress>
        </Box>) : (
          <>
            
        <Grid container style={{marginTop:"1%"}} spacing={3}>
          <Grid item lg={5} xl={4}>
            <img 
              className={classes.image}
              src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            />
          </Grid>
          <Grid item lg={7} xl={8} className={classes.info} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <Typography variant='h2' align='center' gutterBottom>
              {data?.name}
            </Typography>
            <Typography variant='body1' align='justify' paragraph>
              {data?.biography}
            </Typography>
          </Grid>
        </Grid>
        {isMoviesFetching ? (
        <Box className={classes.loading} display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress size='5rem'></CircularProgress>
        </Box>) : (
        <Box margin='2rem 0'>
          <Typography variant='h2' style={{ textShadow: '0px 0px 24px rgba(255, 65, 85, 0.99)'}} gutterBottom align='center'>
            Starred in
          </Typography>
          {movies && <MovieList movies={movies} numberOfMovies={12}/>}
          <Pagination currentPage={page} setPage={setPage} totalPages={data?.total_pages}></Pagination>
        </Box>
        )}
       
          </>
        )}
      </>
  )
}

export default Actors
