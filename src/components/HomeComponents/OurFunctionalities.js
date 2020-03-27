import React, { useRef, useState } from 'react';
import '../../Assets/Css/OurFunctionalities.css';
import donationImage from "../../Assets/images/donation.jpg"
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import Anime, {anime} from 'react-anime';
import {Route,BrowserRouter as Router,Switch,Link,useHistory} from 'react-router-dom';



function OurFunctionalities(props) {


    return(
            <div className="container" style={props.position==='right'?{justifyContent:'flex-end',marginRight: '10%'}:{ justifyContent:'flex-start',marginLeft: '10%'}}>
                <div className="card" >
                    <div className="face1">
                        <div className="content">
                        <img src={props.image} width="500" height="300"/>
                        </div>
                    </div>
                    <Anime easing="easeOutSine"
                        
                        duration={2000}
                        loop={false}
                        translateX={props.position==='right'?'-27rem':'27rem'}
                        scaleY={.61}
                        autoplay={!props.startAnimation}
                        translateY='6rem'>
                        <div className="face2" style={props.position==='right'?{flexDirection:'row-reverse'}:{flexDirection:'row'}}>
                      
                        <Anime easing="easeOutSine"
                        
                        duration={2000}
                        loop={false}
                        scale={1}
                        autoplay={!props.startAnimation}
                        translateY='6rem'>  <div className="aaaa" style={!props.startAnimation?{marginTop:"-30px"}:null}>
                            <h1 style={{textAlign:"left",marginLeft:"10%",color:props.titleColor,fontFamily:'Lato'}}>{props.title}</h1>
    <p style={{textAlign:"left",marginLeft:"10%",marginRight:'5%',fontFamily:'Lato',fontSize:'17px',color:'rgb(204,204,204)'}}>{props.description}</p>
                            
                           </div>
                           
                            </Anime>
                            
                            <div className='btnInsideDesc' style={{ backgroundColor:props.btnColor}}>
                            {props.position==='left'?
                            <Link to="/home"><NavigateNextRoundedIcon fontSize="large" /></Link>
                            :
                            <Link><NavigateBeforeRoundedIcon fontSize="large" /></Link>}

                            </div>
                           
                        </div>
                    </Anime>
                </div>
            </div>
           
    )
    
}


export default OurFunctionalities

