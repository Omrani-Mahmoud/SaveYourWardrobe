import React from 'react'
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Popover from '@material-ui/core/Popover';
import CardInsideList from './CardInsideList';
import {uri} from "../../../UrlBase";



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
function SingleItem(props) {


   
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [disableIt, setdisableIt] = React.useState(false);
    const handlePopoverOpen = event => {
        setAnchorEl(event.currentTarget);
      };
    
      const handlePopoverClose = () => {
          console.log("closed")
        setAnchorEl(null);
      };
    const open = Boolean(anchorEl);
    const classes = useStyles();
    React.useEffect(() => {
      if(props.cancled)
        setdisableIt(false)
    }, [props.cancled])

    return (
        <div className={clsx(classes.column)} key={props.elem._id}  >
        <Chip variant="outlined" color="primary" size="small"  onClick={handlePopoverOpen} label={props.elem.name} style={{marginLeft:"5%"}} disabled={disableIt} onDelete={props.isEit?()=>{props.handleDelete(props.elem._id);setdisableIt(true)}:null} />
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
      
        <CardInsideList data={props.elem} />

</Popover>
</div>
    )
}

export default SingleItem
