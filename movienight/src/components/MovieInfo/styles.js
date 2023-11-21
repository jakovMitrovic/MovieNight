import { makeStyles } from "@mui/styles";


export default makeStyles((theme)=>({
    

    containerSpaceAround:{
        justifyContent: 'space-around',
        //justifySelf:"center",
        margin:'10px 0 !important',
        
        //backgroundColor:"rgb(250,250,250, 40%) !important",      
        [theme.breakpoints.down('sm')]:{
            flexDirection:'column',
            flexWrap: 'wrap',
        }
    

    },
    poster:{
        borderRadius:'10px',
        marginLeft:'10%',
        marginTop:'5%',
        width:'80%',
        marginBottom:'40px',
        boxShadow: '0px 0px 25px 15px #ff4155',
        [theme.breakpoints.down('sm')]:{
            //margin: '0, auto',
            display: 'flex',
            justifyContent:'center',
            width:"200px",
            height:'350px',
            marginBottom:'30px',
        },
        [theme.breakpoints.down('md')]:{
            display: 'flex',
            justifyContent:'center',
            width:"100%",
            height:'450px',
           
        },
        
        
    },
    genresC:{
        display: "flex",
        justifyContent:'center',
        
    },
    genreLinks:{
        textDecoration:"none",
        color:"white !important",
        marginLeft:"10px", 
        marginRight:"10px", 
        
    },
    castImg:{
        width:'100%',
        maxWidth:'7em',
        height: '8em',
        objectFit: 'cover',
        borderRadius:"10px",
        '&:hover': {
            transition: 'all 0.2s ease',
            borderRadius:"10px",
            boxShadow: '0px 0px 10px 10px #ff4155',
            
        }
       
        
    },
    trailerContainer:{
        width:"100%",
        border:"0",
        marginTop:"5%",
    },
    trailer:{
        boxShadow: '0px 0px 25px 15px #ff4155',
        borderRadius:"10px",
        margingTop:"20px !important",
        //width:"maxWidth",
  
    },

    favButton:{
        textDecoration:"none",
        color:"white",
        fontSize:'120%',
        marginLeft:"10px",
        '&:hover': {
            transition: 'all 0.5s ease',
            color:'#ff4155'
            
        }
    },

    loading:{
        height:"100vh",
        marginTop:'40vh'
    },

    info:{
        background:"#3c5082",
        paddingLeft:"2%",
        paddingTop:"2%",
        borderRadius:'10px',
       
        
    },
    backArr:{
        color:'white',
        background:'#222d5b',
        borderRadius:'100%',
        margin:'0px',
        
    },
    backBtn:{
        marginLeft:'0%',
        color:'white',
        textDecoration:'none'

    },

    recommendedTitle:{
        textShadow: '0px 0px 24px rgba(255, 65, 85, 0.99)',
      
    },

    reviews:{
        padding:'30px',
        borderRadius:"10px"
        
        
    },
    
    review:{
        backgroundColor:"#3c5082",
        marginBottom:"15px",
        padding:"20px",
        borderRadius:"10px"


    }
   

    
    


}));



