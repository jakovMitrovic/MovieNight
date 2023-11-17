import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';


export default makeStyles((theme)=>({

    '@global': {
        '*::-webkit-scrollbar': {
          width: '0.6em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#ff4155',
          outline: '1px solid slategrey'
        },
        
      },

    imageLink:{
        //backgroundColor: "white",
        //borderRadius:'90px',
        display: "flex",
        justifyContent: 'center',
        //padding: '10% 0',
        
    },
    image:{
        width:'70%',
        
    },
    categoryContainer:{
        
        '&:hover': {
            transition: 'all 0.6s ease',
            boxShadow: '0.3em 0.3em 0.3em rgb(65, 65, 69)',
            color:'white',
            background : `#ff4155 !important`,
            '& $genreImage':{
                transition: 'all 0.6s ease',
                //filter: theme.palette.mode = 'invert(1)'
                
            }
        }
    },
    links:{
        
        color: "white",
        textDecoration:'none',
        
        
    },
    genreImage:{
        filter: theme.palette.mode = 'invert(1)'
        
    },
    sideBar:{
        backgroundColor:"#3c5082",
        
    },

    genreCategory:{
        backgroundColor:"#3c5082",
        color:"white",
        borderBottom:"solid",
        borderTop: "none"       
    },
    
    
}));