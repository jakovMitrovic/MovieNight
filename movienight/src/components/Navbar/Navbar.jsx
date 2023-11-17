import React, { useState } from 'react'
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery, Icon } from '@mui/material'
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom'
import { ClassNames } from '@emotion/react'
import useStyles from './styles';
import { useTheme } from '@mui/material/styles';
import Sidebar from '../Sidebar/Sidebar';
import Search from '../Search/Search';
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import UseGetUserID from '../../services/UseGetUserID'
import { useGetUserDetailsQuery } from "../../services/TMDB"




const Navbar = () => {
  
  const [mobileOpen, setmobileOpen] = useState(false)
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const userID = UseGetUserID();
  const { data, isFetching, error } = useGetUserDetailsQuery(userID);
  const navigate = useNavigate();

  
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton color='inherit' edge='start'
              style={{ outline: 'none ' }} onClick={() => setmobileOpen((previousMobileOpen) => !previousMobileOpen)}
              className={classes.menuButton}>
              <Menu />
            </IconButton>
          )}
          
  {!isMobile && <Search />}
    {isMobile && <Search />}

         
          {!window.localStorage.getItem("userID") ? (
            <>

              <Link className={classes.login} to="/login">Login</Link>
            </>

          ) : (
            <>
             
              <Button color="inherit" 
                      className={classes.linkButton}
                      onClick={()=>{navigate(`/profile/${userID}`)}}>
                {!isMobile && <>My Profile &nbsp;</>}
                <Avatar 
                  style={{ width:30, height: 30 }}
                  alt="Profile"
                  src={data?.image}
                  />
              </Button>

            </>

          )}

        </Toolbar>

      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor='right'
              open={mobileOpen}
              onClose={() => setmobileOpen((previousMobileOpen) => !previousMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setmobileOpen={setmobileOpen} />
            </Drawer>
          ) : (
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent">
              <Sidebar setmobileOpen={setmobileOpen} />
            </Drawer>
          )}

        </nav>
      </div>
    </>
  )
}

export default Navbar
