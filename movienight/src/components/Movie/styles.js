import { makeStyles } from "@mui/styles";

export default makeStyles((theme)=>({
    movieBox:{
        
        padding: '10px',
    },
    links:{
        alignItems:'center',
        textDecoration: 'none',
        fontWeight:'bolder',
        [theme.breakpoints.up('xs')]:{
            display:'flex',
            flexDirection: 'column',
        },
        '&hover': {
            cursor: 'pointer',
            textDecoration: 'none',
        }

    },
    title:{
        //color: "#F5FFFA",
        color:'white',
        textOverflow: 'ellipsis',
        width:'220px',
        whiteSpace: 'nowrap',
        overflow:'hidden',
        marginTop: '10px',
        marginBottom: 0,
        textAlign:'center',
     
    },

    image:{
        borderRadius:'10px',
        height:'300px',
        marginBottom: '10px',
        boxShadow: '0.2em 0.2em 0.2em rgb(65, 65, 69)',
        '&:hover': {
            transition: 'all 0.2s ease',
            borderRadius:"10px",
            boxShadow: '0px 0px 10px 10px #ff4155',
            //transform: 'scale(1.07)',
            //boxShadow: '0.5em 0.5em 0.5em rgb(120, 120, 120)',
        }
        },

    rating:{
        display:'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline ',
        alignSelf:'auto',
        textDecoration:'none'

    }

}));