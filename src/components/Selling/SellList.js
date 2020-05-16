import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './Selling.css';
import axios from "axios";
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';









const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    }, 
     media: {
       height: 140,
     
     },
     paper: {
       padding: theme.spacing(1),
       textAlign: 'center',
       color: theme.palette.text.secondary,
     },
     modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper1: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    coli:{
    
        backgroundColor:'orange',
      },
      coli1:{
    
        backgroundColor:'#00ff40',
      },
      coli2:{
    
        backgroundColor:'red',
      },
    root33: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0.5),
        },
      },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
  }));






export default function ListSell({sells}) {

    const classes = useStyles();
    const [user,setuser] = useState([]);

    const fetchIt3 =async ()=>{

 
           
 
                axios.get("https://code-beast.herokuapp.com/user")
                .then(res => {
      
                    setuser(res.data);
    
              })
    
  
      
      }

      const [state, setState] = React.useState({
        age: '',
        name: 'hai',
      });
    
      const handleChange1 = (s,event) => {
        const name = event.target.name;
        
        setState({
          ...state,
          [name]: event.target.value,
        });
    
       const val =event.target.value;
    
       if (val.toUpperCase()=="CONFIRMED"){


        s.state="Confirmed";

        axios.patch(`https://code-beast.herokuapp.com/sell/${s._id}`,s)
        .then(res =>{
            console.log(res)
           
        })    .catch(err=>{
          console.log(err)
      })


      changeItem(s);
      DeleteMyItem(s);
        
       }

       if (val.toUpperCase()=="CANCELED"){


        s.state="Canceled";

        axios.patch(`https://code-beast.herokuapp.com/sell/${s._id}`,s)
        .then(res =>{
            console.log(res)
           
        })    .catch(err=>{
          console.log(err)
      })
        
     
       }
    
       
        
    
      };




      const changeItem=(sell)=>{

 
            sell.items.map(i=>{
              
            

            axios.post("https://code-beast.herokuapp.com/itemforsell/"+i._id+"/"+sell.seller)
            .then(res=>{
                console.log(res)
                
            })
            .catch(err=>{
                console.log(err)
               
            })


          })




      }


      const DeleteMyItem=(sell)=>{

 
        sell.items.map(i=>{
          
        

        axios.post("https://code-beast.herokuapp.com/itemdelete/"+i._id+"/"+sell.buyer)
        .then(res=>{
            console.log(res)
            
        })
        .catch(err=>{
            console.log(err)
           
        })


      })

      


  }



 

      React.useEffect(() => {
   
        fetchIt3();
     
      
    
    },[])


return(

    
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="caption table">
     
      <TableHead>
        <TableRow>
          <TableCell>Item-Name</TableCell>
          <TableCell align="center">Price</TableCell>
          <TableCell align="center">Buyer-Email</TableCell>
          <TableCell align="center">Buyer-Phone</TableCell>
          <TableCell align="center">State</TableCell>
          <TableCell align="center">Validation</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sells.map((row) => (

            row.seller!=""&&row.buyer==window.localStorage.getItem("connectedUserID")?(

            

           
          <TableRow>
              {row.items.map(i=>
            <TableCell component="th" scope="row">
              {i.name} ({i.description})
            </TableCell>
            )}
            <TableCell align="center">{row.price} DT</TableCell>

                {user.map(u=>
                    u._id==row.seller?(
                        <React.Fragment>
                        <TableCell align="center">{u.email}</TableCell>
                        <TableCell align="center">{u.phoneNumber}</TableCell>
                        </React.Fragment>
                    ):null
                )}
           

            

              {row.state.toUpperCase()=="PENDING"?(

                  <React.Fragment>
                  <TableCell align="center">
                    <div className={classes.root33}>
                    <Chip
                    size="small"
                    label= {row.state}
                    icon={<AccessTimeIcon/>}
                    className={classes.coli}
                        />
                        </div>
                         </TableCell>
                           <TableCell align="center">

                           <FormControl className={classes.formControl}>
                     <InputLabel htmlFor="age-native-helper">State</InputLabel>
                     <NativeSelect
                       
                       onChange={(event)=>handleChange1(row,event)}
                       inputProps={{
                         name: 'age',
                         id: 'age-native-helper',
                       }}
                      
                     >
                       <option aria-label="None">Pending  </option>
                       <option value={"Confirmed"}>Confirmed</option>
                       <option value={"Canceled"}>Canceled</option>
                    
                     </NativeSelect>
                     
                   </FormControl>
               
               
                           </TableCell>
                           </React.Fragment>


              ):row.state.toUpperCase()=="CONFIRMED"?(
                  <React.Fragment>                <TableCell align="center">
                <div className={classes.root33}>
                <Chip
                size="small"
                label= {row.state}
                icon={<DoneIcon/>}
                className={classes.coli1}
                    />
                    </div>
                     </TableCell>

            <TableCell align="center"><DoneIcon/></TableCell>
            </React.Fragment>


              ):
              <React.Fragment>
              <TableCell align="center">
              <div className={classes.root33}>
              <Chip
              size="small"
              label= {row.state}
              icon={<CloseIcon/>}
              className={classes.coli2}
                  />
                  </div>
                   </TableCell>
                   <TableCell align="center"><CloseIcon/></TableCell>
                   </React.Fragment>
              }          
       
             
              
              
             
          
          </TableRow>

            ):null
        ))}
      </TableBody>
    </Table>
  </TableContainer>


)












}