import React, {useEffect} from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const Poster = ({movies}) => {
    const classes = useStyles();

    useEffect(()=>{
        console.log(movies)
        var slideIndex = 0;
        carousel();
        
        function carousel() {
          var i;
          var x = document.getElementsByClassName(classes.featuredCardContainer);
          for (i = 0; i < x.length; i++) {
            if(x[i] !== undefined){
                x[i].style.opacity = "0%"
            }
          }
          slideIndex++;
          if (slideIndex > x.length) {slideIndex = 1}
          if(x[slideIndex-1] !== undefined){
              x[slideIndex-1].style.opacity = "100%";
          }
          setTimeout(carousel, 15000); 
        }
    },[])

    

   
    return (
        <div className={classes.poster}>
        {movies?.map((movie)=>(

        <Box className={classes.featuredCardContainer}>
            <Card className={classes.card} classes={{ root: classes.cardRoot }}>
                <CardMedia
                    media="picture"
                    alt={movie.title}
                    image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                    title={movie.title}
                    className={classes.cardMedia}
                />
                <Box padding="20px">
                    <CardContent className={classes.cardContent} classes={{ root: classes.cardContentRoot }}>
                        <Typography variant="h5" gutterBottom>{movie.title}</Typography>
                        <Box display="flex" align="center">
                            <Rating readOnly value={movie.vote_average / 2}></Rating>
                            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>{movie?.vote_average}/10 </Typography>
                        </Box>
                        <Typography variant="body2">{movie.overview}</Typography>
                    </CardContent>
                </Box>
            </Card>
        </Box>
        ))}

        </div>
    );
};

export default Poster;


