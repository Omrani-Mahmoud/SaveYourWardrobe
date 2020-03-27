import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import EventNoteIcon from '@material-ui/icons/EventNote';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import CardInsideList from './CardInsideList';
import Help from '@material-ui/icons/Help';

import Receive from "@material-ui/icons/CallReceived";
import Out from "@material-ui/icons/CallMade";


import axios from "axios";
import Swal from 'sweetalert2'

import TradeDialog from './TradeDialog';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      flexBasis: '1%',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }));

const ExpansionPanel = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiExpansionPanel);
  
  const ExpansionPanelSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiExpansionPanelSummary);
  
  const ExpansionPanelDetails = withStyles(theme => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiExpansionPanelDetails);




function SingleTrade(props) {
    const [expanded, setExpanded] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };


  const handlePopoverClose = () => {
    setAnchorEl(null);
  };





  const open = Boolean(anchorEl);
  const [isEit, setIsEdit] = React.useState(false);
  const [TradeState, setTradeState] = React.useState(false);

  const [deletedList, setDeletedList] = React.useState([]);
  const [disableIt, setdisableIt] = React.useState(false);
  const classes = useStyles();
  
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
        <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <ExpansionPanelSummary  aria-controls="panel1d-content" id="panel1d-header">
                        <LocationCityIcon fontSize="small"/>
                        <Typography >{`: ${props.data.location?props.data.location:"no name"}`}</Typography>
                        <EventNoteIcon style={{marginLeft:"10%"}} />
                        <Typography>{`: ${props.data.datePost?new Date(props.data.datePost).toDateString():"no date"}`}</Typography>
                        <Badge  badgeContent={props.data.items.length} color="primary" style={{marginLeft:"10%"}}>
                            <SaveAltIcon />
                        </Badge>
                        <Help style={{marginLeft:"10%", color:"red"  }} />
                        <Typography>{`Status: ${props.data.status}`}</Typography>
                        <Out style={{marginLeft:"10%"}} />
                        
                        {
                         props.data.TradeFrom.map(elem =>
                            <div className={clsx(classes.column)}>
                                        <Chip variant="outlined" color="primary" size="small"  label={elem.email} style={{marginLeft:"5%"}}/>
                              </div>
                         )
                        }

                       
                         


                        </ExpansionPanelSummary>

                        <TradeDialog  selectedValue={selectedValue} onClose={handleClose} open={TradeState} data={itemTrade} trade={props.data} />
                        <ExpansionPanelDetails style={{display:"flex",width:"100%"}} >
                            {
                                props.data.items.map(elem =>
                                    <React.Fragment>
                                    <div className={clsx(classes.column)} key={elem._id} onClick={handlePopoverOpen} >
                                        <Chip variant="outlined" color="primary" size="small"  label={elem.name} style={{marginLeft:"5%"}} disabled={disableIt} onDelete={isEit?()=>{handleDelete(elem._id);setdisableIt(true)}:null} />
                                    </div>
                                        <Popover
                                            id="mouse-over-popover"
                                            className={classes.popover}
                                            classes={{
                                            paper: classes.paper,
                                            }}
                                            open={open}
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                            }}
                                            onClose={handlePopoverClose}
                                            
                                        >
                                            <CardInsideList data={elem} />
                                    </Popover>
                                  </React.Fragment>
                                )
                            }
                        </ExpansionPanelDetails>
                            
                        
                          

                        <ExpansionPanelActions>
                        <div hidden={props.data.status==="Confirmed"}>

                                <Button size="small" color="primary" onClick={()=>fireAlert()}>Remove this trade</Button>
                                <Button size="small" color="primary" onClick={()=>{setTradeState(true);UserWardrobeItems()}}>Accept Trade</Button>
                        </div>

                            <div hidden={props.data.status==="pending"}>
                          <HelpOutlineIcon onClick={showIt}  />
                          </div>
                        </ExpansionPanelActions>
                </ExpansionPanel>
    )
}

export default SingleTrade
