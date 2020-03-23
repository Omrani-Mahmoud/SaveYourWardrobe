import React,{useState,useEffect} from 'react'
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import '../../Assets/Css/LoginPage.css';
import { makeStyles, createMuiTheme, ThemeProvider, rgbToHex} from '@material-ui/core/styles';
import { Typography} from '@material-ui/core';



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




function AddNewTrade(){

const [newTrade,setNewTrade] = useState({location:"",status:"",datePost:"",dateTrade:"",items:[]})
const [dataFromDB,setNewDataFromDB] = useState([]);
const [refresh,setRefresh] = useState(false);
const [wantToUpdate,setWantToUpdate] = useState(false);
const classes = useStyles();
const theme = createMuiTheme();


    const addTrade =()=>{
        axios.post("http://localhost:4000/trade",newTrade)
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })

    }


    const  fetchIt =async ()=>{
        const datatFromDataBase = await fetch("http://localhost:4000/trade");
        const data = await datatFromDataBase.json();
        setNewDataFromDB(data);

}

const updateTrade = (element) =>{
     setNewTrade(element)
    setWantToUpdate(true)
    
    
}

        useEffect(() => {
            fetchIt()
            setRefresh(false)
        },[refresh])

    const deleteTrade = (idTrade) =>{
        axios.delete(`http://localhost:4000/trade/${idTrade}`)
        .then(res=>{
            console.log(res)
            setRefresh(true)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const persistUpdate = ()=>{
        axios.patch(`http://localhost:4000/trade/${newTrade._id}`,newTrade)
            .then(res =>{
                console.log(res)
            })
        
             .catch(err=>{
            console.log(err)
        })
    }


    

    return(
        <div>
                <form onSubmit={addTrade}>
                <TextField classes={{root: classes.input}} id="standard-basic" label="location" name="location" onChange={(e)=>newTrade.location=e.target.value} defaultValue={newTrade.location} />
                  <br />
                 
                <TextField classes={{root: classes.input}} id="standard-basic" label="status" name="status" onChange={(e)=>newTrade.status=e.target.value} defaultValue={newTrade.status} />
                <br />
                <TextField classes={{root: classes.input}} id="standard-basic" label="Date Post" name="datePost" onChange={(e)=>newTrade.datePost=e.target.value} defaultValue={newTrade.datePost} />
                <br />
                <TextField classes={{root: classes.input}} id="standard-basic" label="Date Trade" name="dateTrade" onChange={(e)=>newTrade.dateTrade=e.target.value} defaultValue={newTrade.dateTrade} />
                <br />
                    <button type="submit"> add</button>
                    
                </form>
               

              
        </div>
    )
}
 export default AddNewTrade
