import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles";


export default makeStyles((theme)=>({
    bdy:{
        width:"100%",    
        minHeight:"100vh",
        margin:"auto",
        marginTop:'1%'
        //backgroundColor:"rgb(250,250,250, 5%)",
           
    },

    image:{
        maxWidth: '500px',
        objectFit:'cover',
        marginBottom:"5%",
        borderRadius:"10px",
        boxShadow: '0px 0px 10px 10px #ff4155',
    },

    moviesContainer:{
        display:'flex',
        flexWrap:"wrap",
        justifyContent:'space-between',
        overflow: 'auto',
        [theme.breakpoints.down("sm")]: {
            justifyContent:'center',
        }

    },

    info:{
        marginTop:'5%',
        background:"#3c5082",
        paddingLeft:"2%",
        paddingTop:"2%",
        borderRadius:'10px',

        
    },


    backArr:{
        color:'white',
        
        borderRadius:'100%',
        
        
        
    },
    backBtn:{
        
        color:'white',
        textDecoration:'none',
       

    },

    loading:{
        marginTop:'40vh'
    },


}));



