import React from 'react'
import { List, ListItem, ListItemText, ListItemIcon, Box, CircularProgress, Divider } from '@mui/material'
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useStyles from './Styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres'
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' }
]


const Sidebar = ({ setMobileOpen }) => {
    const { genreIdOrCategoryName } = useSelector((state)=> state.currentGenreOrCategory)
    const theme = useTheme();
    const classes = useStyles();
    const { data, isFetching } = useGetGenresQuery();
    const dispatch = useDispatch();

    

    return (
        <div className={classes.sideBar}>
            <>
               
                <Link to="/" className={classes.imageLink}>
                    <img className={classes.image}
                    src={genreIcons["logo"]}
                        alt='Logo'
                    />

                </Link>
                <Divider />
                <List>
                    <ListItem className={classes.genreCategory}>Categories</ListItem>
                    {categories.map(({ label, value }) => (
                        <Link key={value} className={classes.links} to="/">
                            <ListItem className={classes.categoryContainer} onClick={() => dispatch(selectGenreOrCategory(value))} button>
                                <ListItemIcon>
                                    <img src={genreIcons[label.toLowerCase()]} className={classes.genreImage} height={30} />
                                </ListItemIcon>
                                <ListItemText primary={label} />
                            </ListItem>
                        </Link>
                    ))}
                </List>

                <Divider />

                <List>
                    <ListItem className={classes.genreCategory}>Genres</ListItem>
                    {isFetching ? (
                        <Box display='flex' justifyContent='center'>
                            <CircularProgress />
                        </Box>
                    ) : data.genres.map(({ name, id }) => (
                        <Link key={name} className={classes.links} to="/">
                            <ListItem className={classes.categoryContainer} onClick={() => dispatch(selectGenreOrCategory(id))} button>
                                <ListItemIcon>
                                    <img src={genreIcons[name.toLowerCase()]} className={classes.genreImage} height={30} />
                                </ListItemIcon>
                                <ListItemText primary={name} />
                            </ListItem>
                        </Link>
                    ))}
                </List>


            </>
        </div>
    )
}

export default Sidebar
