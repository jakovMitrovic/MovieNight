import {makeStyles, withTheme} from  "@mui/styles";
import { useTheme } from '@mui/material/styles';


export default makeStyles((theme)=>({
    
    

   searchContainer:{
    background: "white",
    borderRadius:'25px',
    padding: '0 15px',
    '&:hover': {
        transition:'1s',
        boxShadow: '0px 0px 10px 10px #ff4155',

    },
    
    '*::placeholder': {
        
        color:'#ff4155'
        
        },
   
    [theme.breakpoints.down('sm')] : {
      
        width:'50%',
    },
    
    },
    input:{ 
        '&:focus':{
            transition:'0.5s',
            boxShadow: '0px 0px 10px 10px #ff4155'
        },
        [theme.breakpoints.down('sm')] : {
            marginTop: '-5px',
            marginBottom: '10px'
        }

    } ,

    

    
}));