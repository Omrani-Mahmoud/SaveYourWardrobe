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
import wardrobeImage2 from "../src/Assets/images/wardrobe2.png"
import EmailIcon from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Pulse from 'react-reveal/Pulse';

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
    },
    input:{
        width:"200px",
        '& label': {
            color: 'white !important',
          },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
          },
    },
    paper: {
        backgroundColor:"transparent",
        marginTop:"10px"
      },
      icon:{
          marginTop:'6px',
          color:"black"
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
        
        if (currPos.y <= -370 ) setStartIt({...startIt,func1:false})
        if (currPos.y <= -776) setStartIt({...startIt,func2:false,func1:false})
        if (currPos.y <= -1132) setStartIt({...startIt,func3:false,func2:false,func1:false})
        if (currPos.y <= -1485) setStartIt({...startIt,func4:false,func3:false,func2:false,func1:false})

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
                <OurFunctionalities startAnimation={startIt.func1} image={donationImage} titleColor={'rgb(75, 75, 75)'} btnColor={'rgb(193,139,65)'} position={'left'} title={"Donation"} description={"Your donation help us deliver a world every needed person is wanted , every one could wear new clothes "}/>
                <OurFunctionalities startAnimation={startIt.func2} image={sellingImage} titleColor={'rgb(75, 75, 75)'} btnColor={'rgb(102,49,31)'} position={'right'} title={"Selling"} description={"Your donation help us deliver a world every needed person is wanted , every one could wear new clothes "}/>
                <OurFunctionalities startAnimation={startIt.func3} image={wardrobeImage} titleColor={'rgb(75, 75, 75)'} btnColor={'rgb(193,139,65)'} position={'left'} title={"Online wardrobe"} description={"Your donation help us deliver a world every needed person is wanted , every one could wear new clothes "}/>
                <OurFunctionalities startAnimation={startIt.func4} image={outfitImage} titleColor={'rgb(75, 75, 75)'} btnColor={'rgb(102,49,31)'} position={'right'} title={"Outfit Suggetion"} description={"Your donation help us deliver a world every needed person is wanted , every one could wear new clothes "}/>
                  
                <div className="imageWardrobe">
                <ThemeProvider theme={theme}>
                    <Typography variant="h3" className="trySmth2" > WHAT DO WE HAVE IN OUR WARDROBE ?</Typography>
                </ThemeProvider>
              
                    <h1> </h1>
                   
                    <img src={wardrobeImage2} width="600" height="400"/>
                    <p>aaa aaa a a a aaaaaa  a a a  a a  a a  a a  adza d az d az e aze
                    aaa aaa a a a aaaaaa  a a a  a a  a a  a a  adza d az d az e aze
                    aaa aaa a a a aaaaaa  a a a  a a  a a  a a  adza d az d az e aze
                    aaa aaa a a a aaaaaa  a a a  a a  a a  a a  adza d az d az e aze </p>
                    <Button variant="contained" classes={{root: classes.btn}}> 
                    Learn More
                     </Button>
                </div>

                <div className="footer">
                    <div className="insideFooter">
                        <div className="part1">
                        <h3>NEWS ?</h3>
                            <span>Whant to know what's new </span>
                            <Paper className={classes.paper} elevation={0} >
                            <TextField classes={{root: classes.input}} label="Your email" />
                            <IconButton>
                            <EmailIcon className={classes.icon} />
                            </IconButton>
                            </Paper>
                        </div>
                        <div className="part2">
                        <h3>CONTACT</h3>
                            <span>Esprit , Ghazela 2080</span>
                            <span>(+216) 33 333 3333</span>
                            <br />
                            <span>CodeBeast@esprit.Tn</span>

                        </div>
                        <div className="part3">
                        <h3>JOIN US</h3>
                            <span>Facebook</span>
                            <span>Instagram</span>
                            <span>Google+</span>
                        </div>

                    </div>
                </div>
                <div className="footer2">
        
                       <p>Copyright © SaveYourWardrobe</p>
                       <p><FacebookIcon fontSize="large" id="ic"/>
                       <YouTubeIcon fontSize="large" id="ic"/>
                       <InstagramIcon fontSize="large" id="ic" /></p>
                       <p><span style={{marginRight:"30px"}}>Privacy Policy</span><span>Terms of Use</span> </p>

              
                </div>
            </div>
        
           
        </div>
    )
}

export default Home



