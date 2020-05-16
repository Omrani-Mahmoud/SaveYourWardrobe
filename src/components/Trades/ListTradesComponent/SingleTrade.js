import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Clothes from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Help from '@material-ui/icons/Help';
import Out from "@material-ui/icons/CallMade";
import In from "@material-ui/icons/TransitEnterexit";
import axios from "axios";
import Swal from 'sweetalert2'
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Button from '@material-ui/core/Button';
import TradeDialog from './TradeDialog';



  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
  


function AllTrades(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [isEit, setIsEdit] = React.useState(false);
  const [TradeState, setTradeState] = React.useState(false);
  const [deletedList, setDeletedList] = React.useState([]);
  const [disableIt, setdisableIt] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(false);
  const [itemTrade, setItemTrade] = React.useState([]);

 
  const handleClose = value => {
    setTradeState(false);
    setSelectedValue(value);
  };


  const handleDelete = (itemId) =>{
    deletedList.push(itemId)
}

  const deleteTrade = (idTrade)=>{
    axios.delete(`http://localhost:4000/trade/${idTrade}`)
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })

}



const UserWardrobeItems=() =>{
    
    axios.get(`http://localhost:4000/user/${window.localStorage.getItem("connectedUserID")}`)
    .then(res=>{
        console.log(res)
        setItemTrade(res);
        
    })
    .catch(err=>{
        console.log(err)
    })

}


  const fireAlert =() =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        deleteTrade(props.data._id)
        Swal.fire(
          'Deleted!',
          'Your trade has been deleted.',
          'success'
        )
      }
    })
  }

  const showIt = ()=>{
    Swal.fire({
      text: 'This trade is confirmed',
      width: 600,
      icon: 'info',
      padding: '3em',
      backdrop: `
        rgba(0,0,0,0.4)
       
      `
     
  
    })
  }


    return (
    
      <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
        <LocationCityIcon fontSize="small"/>
        {`: ${props.data.location?props.data.location:"no name"}`}
        </TableCell>
        <TableCell align="left">
        <EventNoteIcon  />
          {`: ${props.data.datePost?new Date(props.data.datePost).toDateString():"no date"}`}
          </TableCell>
        <TableCell align="left">
        <Badge  badgeContent={props.data.items.length} color="primary">
                            <Clothes />
          </Badge>
        </TableCell>
        <TableCell align="left">
        <div hidden={props.data.status=="Confirmed"}>
        <Help  style={{ color:"red"  }} />
        {`${props.data.status}`}
        </div>
        <div hidden={props.data.status=="pending"}>
        <Help  style={{ color:"green"  }} />
        {`${props.data.status}`}
        </div>
        <div hidden={props.data.status=="In Progress"}>
        <Help  style={{ color:"orange" }} />
        {`${props.data.status}`}
        </div>
       
        </TableCell>
        <TableCell align="left">
        <In />
        {`: ${props.data && props.data.TradeTo && props.data.TradeTo.email?props.data.TradeTo.email:"Not Traded"}`}                                                                  
        </TableCell>

        <TableCell>
        <div hidden={props.data.status=="pending" || props.data.status=="Confirmed"}>
        <Button size="small" color="primary" onClick={()=>confirmAlert()}>Confirm Trade</Button>
          </div>
        </TableCell>

        <TableCell>
        <div hidden={isEit || props.data.shiped}>
        <Button size="small" color="primary" onClick={()=>fireAlert()}>Remove this trade</Button>
          </div>
        </TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
               Trade Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell align="right">Color</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.data.items.map((e) => (
                    <TableRow key={e.name}>
                      <TableCell component="th" scope="row">
                        {e.name}
                      </TableCell>
                      <TableCell>{e.size}</TableCell>
                      <TableCell align="right">{e.color}</TableCell>

                      <TableCell align="right">
                        {e.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      
      </React.Fragment>
 



      
        
    )
}

export default AllTrades
