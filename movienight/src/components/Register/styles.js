import { makeStyles } from "@mui/styles";


export default makeStyles((theme)=>({
    bdy:{
        width:"100%",    
        minHeight:"100vh",
        backgroundColor:"rgb(250,250,250, 5%)",
           
    },
    form: {
        width:"80%",
        backgroundColor:"rgb(250,250,250, 0%)",
        
        padding:"5%",
        margin:"auto"
    },

    textfield :{
        
        backgroundColor: "rgb(255,255,255, 80%)",
        borderRadius:"5px"
    },

    btn:{
        width:"30%",
        background:'#ff4155 !important'
    },

    btn2:{
        
        background:'#ff4155 !important'
    },

    mess:{
        marginLeft: "10%"
    },

    login:{
        textDecoration:"none",
        color:"white",
        fontSize:'120%',
        marginLeft:"10px",
        color:'#ff4155 !important',
        '&:hover': {
            transition: 'all 0.2s ease',
            transform: 'scale(1.2)',
            
        }
    }

}));