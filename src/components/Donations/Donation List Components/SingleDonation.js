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

import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import axios from "axios";
import Swal from 'sweetalert2'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SingleItem from './SingleItem';

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




function SingleDonation(props) {
    const [expanded, setExpanded] = React.useState('');
  
    const [isEit, setIsEdit] = React.useState(false);
    const [deletedList, setDeletedList] = React.useState([]);

    const [cancled, setCancled] = React.useState(false);


  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

 

  const handleDelete = (itemId) =>{
      deletedList.push(itemId)
  }

  const deleteIt = (idDonation)=>{
      axios.post(`http://code-beast.herokuapp.com/donation/${idDonation}`,deletedList)
      .then(res=>{
          console.log(res)
      })
      .catch(err=>{
          console.log(err)
      })
  
  }
  const deleteDonation = (idDonation)=>{
    axios.delete(`http://code-beast.herokuapp.com/donation/${idDonation}`)
    .then(res=>{
        console.log(res)
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
      deleteDonation(props.data._id)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}

const showIt = ()=>{
  Swal.fire({
    text: 'This donation is already shiped to the Association , you cant update it or edit it',
    width: 600,
    icon: 'info',
    padding: '3em',
    backdrop: `
      rgba(0,0,0,0.4)
     
    `
   

  })
}


  const classes = useStyles();



  
    return (
        <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                          <div style={{display:"flex",width:"100%"}}>
                          <div  style={{display:"flex" , width:"25%"}}>
                        <LocationCityIcon fontSize="small"  />
                        <Typography>{`: ${props.data.charity_name?props.data.charity_name:"no name"}`}</Typography>
                        </div>
                        <div  style={{display:"flex", width:"25%"}} >
                        <EventNoteIcon style={{marginLeft:"10%"}} />
                        <Typography>{`: ${props.data.dateDonation?new Date(props.data.dateDonation).toDateString():"no date"}`}</Typography>
                        </div>
                        <div  style={{display:"flex", width:"25%"}}>
                        <Badge  badgeContent={props.data && props.data.items && props.data.items.length!==0?props.data.items.length:0} color={props.data.items.length!==0?"primary":"secondary"} style={{marginLeft:"10%"}} showZero>
                            <SaveAltIcon style={{marginLeft:"10%"}} />
                        </Badge>
                        </div>
                        <div  style={{display:"flex", width:"25%"}}>
                        <LocalShippingIcon style={{marginLeft:"20%"}} color={props.data.shiped?"primary":"error"}/>
                       
                        <Typography>{props.data.shiped?" Shiped":" Pending"}</Typography>
                        </div>
                        </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{display:"flex",width:"100%"}} >
                            {
                                props.data.items.map(elem =>
                                    <React.Fragment key={elem._id}>
                                   
                                        <SingleItem elem={elem} isEit={isEit} handleDelete={handleDelete} cancled={cancled} />
                                       
                                
                                  </React.Fragment>
                                )
                            }
                        </ExpansionPanelDetails>
                        <ExpansionPanelActions>
                          <div hidden={isEit || props.data.shiped}>
                                <Button style={{fontWeight:"bold"}}size="small" color="primary" onClick={()=>fireAlert()}>Remove this donation</Button>
                                <Button style={{fontWeight:"bold"}} size="small" color="primary" onClick={()=>{setIsEdit(true);setCancled(false)}}>Edit items</Button>
                          </div>
                          <div hidden={!isEit || props.data.shiped}>
                                <Button style={{fontWeight:"bold"}} size="small" color="primary" onClick={()=>{setIsEdit(false);setCancled(true)}}>Cancel edit</Button>
                                <Button style={{fontWeight:"bold"}} size="small" color="primary" onClick={()=>{deleteIt(props.data._id);setIsEdit(false);}}>Save it</Button>
                          </div>
                          <div hidden={props.data.shiped?false:true}>
                          <HelpOutlineIcon onClick={showIt}  />
                          </div>
                        </ExpansionPanelActions>
                        
                </ExpansionPanel>
    )
}

export default SingleDonation
