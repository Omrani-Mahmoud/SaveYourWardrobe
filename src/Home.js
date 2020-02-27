import React from 'react';
import '../src/Assets/Css/Home.css';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles, createMuiTheme, ThemeProvider, rgbToHex} from '@material-ui/core/styles';
import { Typography} from '@material-ui/core';
import logo from './Assets/images/logo.svg'
import OurFunctionalities from './components/HomeComponents/OurFunctionalities';


const useStyles = makeStyles(({
  
    customWidth: {
      maxWidth: 300,
    },
    btn:{
        background:'rgb(193,139,65)',
        "&:hover": {
            background:'rgb(193,139,65)'
          },
        color:"white",
        fontFamily:'Lato',
        textTransform:'capitalize',
        width:"170px"
    }
  }));
  const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',

  },
};
function Home (){
    const classes = useStyles();
    return(
        <div className="mainContainer">
            <div className="inside">
            <div className="logoContainer">
                    <img src={logo} />
                </div>
                <div className="info">
                <Tooltip title="brief description oabout our story" TransitionComponent={Zoom} classes={{ tooltip: classes.customWidth }}>
                        <Button className="navBtn">Home</Button>
                    </Tooltip>
                    <Tooltip title="brief description oabout our story" TransitionComponent={Zoom} classes={{ tooltip: classes.customWidth }}>
                        <Button className="navBtn">Our story</Button>
                    </Tooltip>
                    <Tooltip TransitionComponent={Zoom} title="FAQ description">
                        <Button className="navBtn">FAQ</Button>
                    </Tooltip>
                    <Tooltip TransitionComponent={Zoom} title="our parnters">
                        <Button className="navBtn">Partnership</Button>
                    </Tooltip>
                </div>
             
            </div>
            <div className="imageBodyContainer">
                <ThemeProvider theme={theme}>
                    <Typography variant="h3" className="trySmth" > SOMETHING</Typography>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                    <Typography variant="h3" className="smthAmazing" >AMAZING</Typography>
                </ThemeProvider>
                
                
                <p className="aboutUsDescription">A digital wardrobe platform that helps you to save your wardrobe in your smartphone 
                    to get quick and easy access to your wardrobe and to fetch your clothes anywhere and at any time </p>
       
                <Button variant="contained" classes={{root: classes.btn}}> 
                    Learn More
                </Button>
            </div>
        </div>
    )
}

export default Home


/* <ThemeProvider theme={theme}>
                <Typography variant="h3" style={{marginLeft:"10%",marginTop:"10%",marginBottom:"2%"}}> How we help</Typography>
            </ThemeProvider>
            */