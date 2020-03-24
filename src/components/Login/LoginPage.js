import React from 'react'
import TextField from '@material-ui/core/TextField';
import wardrobeImage2 from "../../Assets/images/loginImg.jpeg"
import '../../Assets/Css/LoginPage.css';
import logo from '../../Assets/images/logoBlack.png'
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles, createMuiTheme, ThemeProvider, rgbToHex} from '@material-ui/core/styles';
import { Typography} from '@material-ui/core';
import {Route,BrowserRouter as Router,Switch,Link,useHistory} from 'react-router-dom'
const useStyles = makeStyles(({
  

    input:{

        '& label': {
            color: 'black !important',
          },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
          },
    },

   
     
  }));
function LoginPage() {
    const classes = useStyles();
    const theme = createMuiTheme();
   const history = useHistory();
  
    const login = (info)=>{
        window.localStorage.setItem("tokenWardrobe","mahtoken")
        history.push('/home')
        console.log("aaa")
    }
   
    return (
        <div className="loginMainContainer">
               
            <div className="part1">
            <img src={logo} width="140px" height="40px" style={{marginTop:"2%"}}/>
            <ThemeProvider theme={theme}>
                    <Typography variant="h3" className="signIn" > SIGN IN</Typography>
                </ThemeProvider>
            <form noValidate autoComplete="on" >
                <TextField classes={{root: classes.input}} id="standard-basic" label="Your email"/>
                <TextField classes={{root: classes.input}} id="standard-basic" label="Your password" type="password"/>
                <IconButton aria-label="delete" className="connectBtn" onClick={()=>login("ff")}>
                    <ArrowForwardIcon fontSize="large" />
                </IconButton>
            </form>
            
            <div className="loginFoot">
                <Typography variant="body2"  display="block" className="loginFooterInfo" gutterBottom>
                    Create account
                </Typography>
                <Typography variant="body2"  display="block" className="loginFooterInfo" gutterBottom>
                    Cant sign in?
                </Typography>
            </div>
            </div>
            <div className="part2">
            <img src={wardrobeImage2} height="100%"/>
            </div>
              
        </div>
    )
}

export default LoginPage
