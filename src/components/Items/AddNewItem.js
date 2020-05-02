import React,{useState,useEffect} from 'react'
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import ItemList from './ItemList';
import InputAdornment from '@material-ui/core/InputAdornment';
import Title from '../../AdminPanel/AssociationsComponents/Title';



const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
    
      marginLeft: theme.spacing(3),


    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
function AddNewItem(){
    const classes = useStyles();
const [newItem,setNewItem] = useState({name:"aa",description:"",size:"",color:"",price:"",brand:""})
const [value,setValue] = useState({name:"",description:"",size:"",color:"",price:"",brand:"",add_date:""})
const [dataFromDB,setNewDataFromDB] = useState([]);
const [refresh,setRefresh] = useState(false);
const [wantToUpdate,setWantToUpdate] = useState(false);
const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    const addItem =()=>{
        value.add_date=new Date()
        axios.post("http://localhost:4000/item",{item:value,user:window.localStorage.getItem("connectedUserID")})
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })

    }


    const  fetchIt =async ()=>{
        const datatFromDataBase = await fetch(`http://localhost:4000/userbyId/${window.localStorage.getItem("connectedUserID")}`);
        const data = await datatFromDataBase.json();
        setNewDataFromDB((data.wardrobe.items));

}

const updateItem = (element) =>{
    setValue(element)
    setNewItem(element)
    setWantToUpdate(true)
    
    
}


        useEffect(() => {
            fetchIt()
            setRefresh(false)
        },[refresh])


   

    const deleteItem = (idItem) =>{
        axios.delete(`http://localhost:4000/item/${idItem}`)
        .then(res=>{
            console.log(res)
            setRefresh(true)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const persistUpdate = ()=>{
        axios.patch(`http://localhost:4000/item/${newItem._id}`,value)
            .then(res =>{
                console.log(res)
            })
        
             .catch(err=>{
            console.log(err)
        })
    }


    

    return(
      
           
        <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Chart */}
    
         
                <Paper className={fixedHeightPaper}  >
                
                <Title>Item form</Title>
              <div className={classes.paper} style={{marginTop:"1%",marginBottom:'2%'}}>
              
              <form className={classes.form} noValidate  onSubmit={wantToUpdate?persistUpdate:addItem}> 
             <Grid container spacing={2} lg={11}>
               
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e)=>{setValue({...value,name:e.target.value})}}
                value={value.name}
                variant="outlined"
                required
                fullWidth
                label="Item name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={(e)=>{setValue({...value,size:e.target.value})}}
              value={value.size}
                variant="outlined"
                required
                fullWidth
                label="Size"
                autoComplete="size"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              onChange={(e)=>{setValue({...value,brand:e.target.value})}}
              value={value.brand}
                variant="outlined"
                required
                fullWidth
                label="Brand"
                autoComplete="Brand"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              onChange={(e)=>{setValue({...value,description:e.target.value})}}
              value={value.description}
                variant="outlined"
                required
                fullWidth
                label="Description"
                autoComplete="Description"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              onChange={(e)=>{setValue({...value,color:e.target.value})}}
              value={value.color}
                variant="outlined"
                required
                fullWidth
                label="Color"
                autoComplete="color"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              onChange={(e)=>{setValue({...value,price:e.target.value})}}
              value={value.price}
                variant="outlined"
                required
                fullWidth
                label="Price"
                type="number"
         
              />
            </Grid>
            </Grid>
            <Grid item xs={12} sm={6} style={{float:"left",marginTop:"1%"}}>
            <Button type="submit" variant="contained" style={{float:"right"}} color="primary">Add it</Button>
            </Grid>
            </form>
      
          </div>

                </Paper>
              </Grid>
              {/* Recent Deposits */}
          
              {/* Recent Orders */}
              <Grid item xs={12} lg={8}>
                <Paper className={classes.paper}>
                 <ItemList data={dataFromDB} deleteItem={deleteItem} updateItem={updateItem}/>
                </Paper>
 
            </Grid>
            <Box pt={4}>
        
            </Box>
          </Container>
        </main>
      </div>
                
      
    )
}
 export default AddNewItem


 /*
 <form onSubmit={wantToUpdate?persistUpdate:addItem}>
                    name
                    <input type="text" name="name" onChange={(e)=>newItem.name=e.target.value} defaultValue={newItem.name} />
                        <br />
                    desc
                    <input type="text" name="description" onChange={(e)=>newItem.description=e.target.value} defaultValue={newItem.description}/>
                    <br />
                    size
                    <input type="text" onChange={(e)=>newItem.size=e.target.value} defaultValue={newItem.size}/>
                    <br />
                    color
                    <input type="text" onChange={(e)=>newItem.color=e.target.value} defaultValue={newItem.color}/>
                    <br />
                    price
                    <input type="text" onChange={(e)=>newItem.price=e.target.value} defaultValue={newItem.price} />

                    <button type="submit"> add</button>
                    
                </form>
               

                <div>
                    {dataFromDB.map(element=>
                        <div key={element._id}>
                            <li>{element.name}</li>
                            <button onClick={()=>deleteItem(element._id)}>delete</button>
                            <button onClick={()=>updateItem(element)}>update</button>    
                        </div>
                    )}
                </div> */



                /*

                   <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
              <form className={classes.form} noValidate>
             <Grid container spacing={2}>
               
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e)=>newItem.login=e.target.value}
                autoComplete="fname"
                name="login"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Item name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={(e)=>newItem.phoneNumber=e.target.value}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Size"
                name="phoneNumber"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              onChange={(e)=>newItem.address=e.target.value}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Description"
                name="address"
                autoComplete="address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              onChange={(e)=>newItem.email=e.target.value}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Color"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              onChange={(e)=>newItem.password=e.target.value}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Price"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            </Grid>
            </form>
      
          </div>
          <h1>aa</h1>
          </Container> */