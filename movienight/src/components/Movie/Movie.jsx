import React from 'react'
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material'
import { Link } from 'react-router-dom';
import useStyles from './styles'

const Movie = (movie, i) => {
  const classes = useStyles();
  
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movieBox}>

      <Grow in key={i} timeout={750}>
        <Link className={classes.links} to={`/movie/${movie.movie.id}`}>
           {movie.movie.poster_path ? 
           <img className={classes.image} src={`https://image.tmdb.org/t/p/w500/${movie.movie.poster_path}`}
           /> : <img className={classes.image} src="https://www.fillmurray.com/200/300"/>}
          <Tooltip disableTochListener title={`${movie.movie.vote_average}/10`}>
            <div>
              <Rating readOnly value={movie.movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
          <Typography className={classes.title} variant="h5">{movie.movie.title}</Typography>
            
        </Link>

      </Grow>

      
    </Grid>
  )
}

export default Movie
