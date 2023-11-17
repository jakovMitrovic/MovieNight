import { makeStyles } from "@mui/styles";

export default makeStyles(()=>({
    root: {
        display:'flex',
        height: '100%',
        backgroundColor: "white"
    },
    toolbar: {
      height:"70px",

    },
    content:{
        flexGrow: "1",
        padding: '2em',
        height:'100%',
        color:'white',
        background:"#222d5b",
        //background: 'rgb(45,60,107)',
        //background:'radial-gradient(circle, rgba(45,60,107,1) 62%, rgba(255,65,85,1) 96%)',
        minHeight:'100vh'
    },
}));