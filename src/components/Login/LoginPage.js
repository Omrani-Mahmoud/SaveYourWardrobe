import React from 'react'
import TextField from '@material-ui/core/TextField';
import wardrobeImage2 from "../../Assets/images/loginImg.jpeg"
import '../../Assets/Css/LoginPage.css';
import logo from '../../Assets/images/logoBlack.png'
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles, createMuiTheme, ThemeProvider, rgbToHex} from '@material-ui/core/styles';
import { Typography} from '@material-ui/core';
import axios from "axios";
import {Route,BrowserRouter as Router,Switch,Link,useHistory} from 'react-router-dom';
import Swal from 'sweetalert2'

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
function LoginPage(props) {

    const classes = useStyles();
    const theme = createMuiTheme();
    const [info,setInfo] = React.useState({email:"",password:""})

    const login = ()=>{
        console.log("clicked")
        axios.post("http://localhost:4000/login",info)
            .then(res=>{
                if(res.data && res.data.accessToken){
                    window.localStorage.setItem("tokenWardrobe",res.data.accessToken)
                    window.location.pathname==='/login'?
                    window.location.replace('/home'):
                    window.location.replace(window.location.pathname)
                }
                else {
                    console.log(res)
                Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                      })
                    }
            })
            .catch(err=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
            })

       
    }
   


    return (
        <div className="loginMainContainer">
               
            <div className="part1">
            <img src={logo} width="140px" height="40px" style={{marginTop:"2%"}}/>
            <ThemeProvider theme={theme}>
                    <Typography variant="h3" className="signIn" > SIGN IN</Typography>
                </ThemeProvider>
            <form noValidate autoComplete="on" >
                <TextField classes={{root: classes.input}} id="standard-basic" label="Your email" onChange={(e)=>info.email=e.target.value}/>
                <TextField classes={{root: classes.input}} id="standard-basic" label="Your password" type="password" onChange={(e)=>info.password=e.target.value}/>
                <IconButton aria-label="delete" className="connectBtn" onClick={()=>login()}>
                    <ArrowForwardIcon fontSize="large" />
                </IconButton>
            </form>
            
            <div className="loginFoot">
                <Link to='/signup'><Typography variant="body2"  display="block" className="loginFooterInfo" gutterBottom>
                    Create account
                </Typography></Link>
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
