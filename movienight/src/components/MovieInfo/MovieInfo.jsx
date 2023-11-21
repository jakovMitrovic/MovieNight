import React, { useEffect, useState } from 'react'
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useGetMovieQuery } from '../../services/TMDB';
import useStyles from './styles';
import { useGetRecommendedQuery, useGetUserDetailsQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import { Container } from 'react-bootstrap'
import UseGetUserID from "../../services/UseGetUserID"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie'



const MovieInfo = () => {
  const { id } = useParams();
  const userID = UseGetUserID();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: userData, isFetching: isFetchingUser, userError } = useGetUserDetailsQuery(userID);
  const classes = useStyles();
  const { data: recommendations, isFetching: isRecommendationsFetcihng } = useGetRecommendedQuery({ list: '/recommendations', movie_id: id });
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSaved, setSaved] = useState(false)
  const [cookies, _] = useCookies(["access_token"])


  



  useEffect(() => {
    console.log(cookies.access_token)
    window.scrollTo(0, 0)
    
    const interval = setInterval(() => {
        if(cookies.access_token !== undefined){
        axios.get(`http://localhost:3001/movies/savedMovies/id/${userID}`, {headers: {authorization: cookies.access_token}})
        .then(res => {
          
          if(res?.data.savedMovies.includes(id)){
            setSaved(true)
          }else{
            setSaved(false)
          }
          
        })
        .catch(err => console.error(err));

      }

      }, 1000); 
      
      return () => clearInterval(interval);
      
    
    
  }, [])
  

  


  const removeSaved = async () => {
    const id = data?.id
    try {
      setSaved(false)
      const response = await axios.put("http://localhost:3001/movies/removeSaved", { id, userID }, {headers: {authorization: cookies.access_token}});
      setSavedMovies(response.data.savedMovies);

    } catch (error) {
      console.log(error)
    }


  }


  const saveMovie = async () => {
    const id = data?.id
    const title = data?.title
    const poster_path = data?.poster_path
    const vote_average = data?.vote_average

    console.log(data?.reviews)

    axios.post("http://localhost:3001/movies", { id, title, poster_path, vote_average }, {headers: {authorization: cookies.access_token}})
    setSaved(true)
    try {
      const response = await axios.put("http://localhost:3001/movies", { id, userID }, {headers: {authorization: cookies.access_token}});
      setSavedMovies(response.data.savedMovies);
    } catch (err) {
      console.log(err)
    }


  }


  return (
    <>

      {isFetching ? (
        <Box className={classes.loading} display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress size='5rem'></CircularProgress>
        </Box>) : (




        <Grid container className={classes.containerSpaceAround}>
          
          <Grid item sm={12} lg={4}>
            <Link size='5rem' className={classes.backBtn} to={'/'}><ArrowBack className={classes.backArr} /> Go Back</Link>
            <img
              className={classes.poster}
              src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
              alt={data?.title}
            />
          </Grid>
          <Grid className={classes.info} item container direction='column' lg={7}>
            <Typography variant='h3' align="center" gutterBottom>
              {data?.title} ({(data?.release_date.split('-')[0])})
            </Typography>
            <Typography variant='h5' align="center" gutterBottom>
              {data?.tagline}
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
              {data?.runtime}min
            </Typography>

            <Box display='flex' justifyContent='center' alignItems='center' style={{ marginTop: '10px', marginBottom: '10px' }} >
              <Rating gutterBottom readOnly value={data?.vote_average / 2} precision={0.1}></Rating>
              <Typography variant='subtitle1' gutterBottom style={{ marginLeft: '10px', marginRight: '50px' }}>
                {Math.round(data?.vote_average * 10) / 10}/10
              </Typography>
            </Box>




            <Grid item className={classes.genresC}>
              {data?.genres?.map((genre, i) => (
                <Link key={genre.name} className={classes.genreLinks} to="/" onClick={() => { }}>
                  {`${genre.name}  `}
                </Link>
              ))}
              {cookies.access_token !== undefined && (userID && 
                (isSaved && (<Link className={classes.favButton} onClick={removeSaved}><StarRateIcon />Remove from favourites</Link>))
              )
              }

              {cookies.access_token !== undefined  && (userID && 
                (!isSaved && (<Link className={classes.favButton} onClick={saveMovie}><StarBorderIcon />Add to favourites</Link>))
              )
              }



            </Grid>
            <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
              Overview
            </Typography>
            <Typography style={{ marginBottom: '2rem' }}>
              {data?.overview}
            </Typography>
            <Typography variant="h5" gutterBottom>
              Top Cast
            </Typography>
            <Grid item container spacing={2}>
              {data && data.credits?.cast?.map((character, i) => (
                character.profile_path && (<Grid className={classes.actor} key={i} item xs={4} md={2} style={{ textDecoration: 'none' }} component={Link} to={`/actors/${character.id}`}>
                  <img className={classes.castImg} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
                  <Typography color="white">
                    {character?.name}
                  </Typography>
                  <Typography color="#A9A9A9">
                    {character.character.split('/'[0])}
                  </Typography>
                </Grid>
                )
              )).slice(0, 6)}
            </Grid>

          </Grid>
      
      
       
          {data?.videos?.results?.length > 0 && (

            <Container className={classes.trailerContainer}>
              <div className="ratio ratio-16x9">
                <iframe src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                  title="YouTube video"
                  allow={"autoplay"}
                  allowFullScreen
                  
                  className={classes.trailer}
                >

                </iframe>

              </div>
            </Container>


          )}
          <Box marginTop="5rem" width='100%'>
            <Typography variant='h3' align='center' className={classes.recommendedTitle} gutterBottom>Similar movies & tv shows</Typography>
            {recommendations
              ? <MovieList movies={recommendations} numberOfMovies={12} />
              : <Box>No movies found</Box>
            }
          </Box>
        </Grid>
      )}
      <Grid className={classes.reviews} style={{maxHeight: 400, overflow: 'auto'}} item sm={24} lg={8}>
          <Typography variant='h3' align="center" gutterBottom>Reviews</Typography>
          {data?.reviews.results.map((review)=>(
          <Box className={classes.review}>
            <Typography variant='h4' gutterBottom>{review.author}</Typography>
            <Typography color="#A9A9A9"  gutterBottom>{review.created_at.split('T')[0]}</Typography>
            <Typography>{review.content}</Typography>
          </Box>

          ))}

        </Grid>
    </>
  )

}


export default MovieInfo
