import { makeStyles } from "@mui/styles";

export default makeStyles(()=>({
    image:{
        maxWidth: '90%',
        borderRadius:'20px',
        objectFit:'cover',
        borderRadius:"10px",
        boxShadow: '0px 0px 10px 10px #ff4155',
    },
    loading:{
        height:"100vh",
        marginTop:'40vh'
    },
    info:{
        marginTop:'1%',
        background:"#3c5082",
        paddingLeft:"2%",
        paddingTop:"2%",
        borderRadius:'10px',

        
    },
}));