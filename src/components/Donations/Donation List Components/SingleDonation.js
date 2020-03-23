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
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
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
  const classes = useStyles();



  
    return (
        <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                        <LocationCityIcon fontSize="small"/>
                        <Typography >{`: ${props.data.charity_name?props.data.charity_name:"no name"}`}</Typography>
                        <EventNoteIcon style={{marginLeft:"10%"}} />
                        <Typography>{`: ${props.data.dateDonation?new Date(props.data.dateDonation).toDateString():"no date"}`}</Typography>
                        <Badge  badgeContent={props.data.items.length} color="primary" style={{marginLeft:"10%"}}>
                            <SaveAltIcon />
                        </Badge>
                        <LocalShippingIcon style={{marginLeft:"20%", color:"red"}} />
                        <Typography>Shiped or Not Shiped</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{display:"flex",width:"100%"}} >
                            {
                                props.data.items.map(elem =>
                                    <React.Fragment>
                                    <div className={clsx(classes.column)} key={elem._id} onClick={handlePopoverOpen} >
                                        <Chip variant="outlined" color="primary" size="small"  label={elem.name} style={{marginLeft:"5%"}}/>
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
                                <Button size="small" color="primary" onClick={()=>console.log(props.data)}>Remove this don</Button>
                                <Button size="small" color="primary" onClick={()=>console.log(props.data)}>Edit this don</Button>
                        </ExpansionPanelActions>
                </ExpansionPanel>
    )
}

export default SingleDonation
