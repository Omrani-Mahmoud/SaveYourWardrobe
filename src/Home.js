import React,{useState} from 'react';
import '../src/Assets/Css/Home.css';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles, createMuiTheme, ThemeProvider, rgbToHex} from '@material-ui/core/styles';
import { Typography} from '@material-ui/core';
import logo from './Assets/images/logo.png'
import OurFunctionalities from './components/HomeComponents/OurFunctionalities';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import donationImage from "../src/Assets/images/donation.jpg"
import sellingImage from "../src/Assets/images/selling.jpg"
import wardrobeImage from "../src/Assets/images/wardrobe.jpg"
import outfitImage from "../src/Assets/images/outfit.jpg"


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

    const [startIt, setStartIt] = useState({func1:true,func2:true,func3:true,func4:true})

    useScrollPosition(({ prevPos, currPos }) => {
    
        console.log(currPos.y)
        
        if (currPos.y <= -370) setStartIt({...startIt,func1:false})
        if (currPos.y <= -776) setStartIt({...startIt,func2:false})
        if (currPos.y <= -1132) setStartIt({...startIt,func3:false})
        if (currPos.y <= -1485) setStartIt({...startIt,func4:false})

      },[])
  
    return(
        <div className="mainContainer">
       
            <div className="inside">
            <div className="logoContainer">
                    <img src={logo} width="200px" />
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
            <div className="bodyContainer">
                <OurFunctionalities startAnimation={startIt.func1} image={donationImage} titleColor={'rgb(114,210,217)'} btnColor={'rgb(36,181,223)'} position={'left'} title={"Donation"} description={"Your donation help us deliver a world every needed person is wanted , every one could wear new clothes "}/>
                <OurFunctionalities startAnimation={startIt.func2} image={sellingImage} titleColor={'rgb(210,104,105)'} btnColor={'rgb(237,69,54)'} position={'right'} title={"Selling"} description={"Your donation help us deliver a world every needed person is wanted , every one could wear new clothes "}/>
                <OurFunctionalities startAnimation={startIt.func3} image={wardrobeImage} titleColor={'rgb(237,208,139)'} btnColor={'rgb(245,181,67)'} position={'left'} title={"Online wardrobe"} description={"Your donation help us deliver a world every needed person is wanted , every one could wear new clothes "}/>
                <OurFunctionalities startAnimation={startIt.func4} image={outfitImage} titleColor={'rgb(189,139,191)'} btnColor={'rgb(161,78,191)'} position={'right'} title={"Outfit Suggetion"} description={"Your donation help us deliver a world every needed person is wanted , every one could wear new clothes "}/>
               
                
            </div>
        </div>
    )
}

export default Home


/* <ThemeProvider theme={theme}>
                <Typography variant="h3" style={{marginLeft:"10%",marginTop:"10%",marginBottom:"2%"}}> How we help</Typography>
            </ThemeProvider>
            */
