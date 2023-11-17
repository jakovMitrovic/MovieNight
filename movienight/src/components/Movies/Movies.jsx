import React from 'react'
import { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import 'bootstrap/dist/css/bootstrap.min.css'
import Pagination from '../Pagination/Pagination';
import Poster from '../Poster/Poster';
import useStyles from './styles'



const Movies = () => {
    const[page, setPage] = useState(1)
    const { genreIdOrCategoryName, searchQuery } = useSelector((state)=> state.currentGenreOrCategory)
    const {data, error, isFetching} = useGetMoviesQuery({genreIdOrCategoryName, page, searchQuery});
    const classes = useStyles();
    
    if(isFetching){
      return(
        <Box  className={classes.loading} display='flex' justifyContent='center'>
          <CircularProgress size='4rem' />
        </Box>
      )
    }
    
    if(!data.results.length){
      return(
        <Box display='flex' alignItems='center' mt='20px'>
            <Typography variant="h4"> No movies FOUND </Typography>
        </Box>
      )
    }
    


    if(error) return 'An error has occured!'
  return (
    <div>
      <Poster movies={data.results}/>
      <MovieList movies={data} numberOfMovies={18}/>
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages}></Pagination>
    </div>
  )
}

export default Movies;
