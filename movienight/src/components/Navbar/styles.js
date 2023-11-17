import {makeStyles} from  "@mui/styles";
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;


export default makeStyles((theme)=>({
    toolbar:{
        backgroundColor:"#3c5082",
        height:'80px',
        display:'flex',
        justifyContent: 'space-between',
        marginLeft: '240px',
        [theme.breakpoints.down('sm')]:{
            marginLeft:0,
            flexWrap: 'wrap',
        }

    },
    menuButton:{
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]:{
            display:'none',
        }

    },
    drawer:{
        [theme.breakpoints.up('sm')]:{
            width:drawerWidth,
            flexShrink: 0,
        },

    },
    drawerPaper:{
        width:drawerWidth,
    },
    linkButton:{
        textDecoration:"none",
        color:"white",
        fontSize:'120%',
        '&:hover' : {
            transition: 'all 0.5s ease',
            transform: 'scale(1.07)',
            
        }
    },
    login:{
        textDecoration:"none",
        color:"white",
        fontSize:'120%',
        '&:hover': {
            transition: 'all 0.5s ease',
            transform: 'scale(1.07)',
            
        }
    }
}));