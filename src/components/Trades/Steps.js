import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";
import TextField from '@material-ui/core/TextField';


const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  formControl: {
    minWidth: 220,
    maxWidth: 4000,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};



const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
  
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  rootList: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 100,
    marginBottom:"3%",
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Item selection', 'Informations', 'Validation'];
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Steps(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [location,status,datePost,dateTrade] = React.useState(null);
  const [reload, setReload] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const steps = getSteps();
  const handleNext = () => {
    props.disableItems(true)
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    if(activeStep===2){
      console.log("items : ", props.data)
      createDonation()
      setOpen(true)
    }

  };

  const handleBack = () => {
    if(activeStep===1)
    props.disableItems(false)
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setOpen(false);
    props.disableItems(false)
    props.resetDonItems([])
    
  };

  const handleNotifClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [newTrade,setNewTrade] = useState({location:"",status:"",datePost:"",dateTrade:"",items:props.data})


  const createDonation =()=>{
   // var newTrade = {datePost:new Date(),dateTrade:new Date(),items:props.data,status:status,location:location}
  
    axios.post("http://localhost:4000/trade",newTrade)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })

}




  return (
    <div className={classes.root} style={{width:"100%"}}>
      
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) :
        activeStep === 0?(
          <div>
              <List className={classes.rootList} subheader={<li />}>
              {props.data ?props.data.map(item => (
              <ListItem key={`${item}`}>
                <ListItemText primary={`${item.brand} || ${item.name}`} />
                <ListItemSecondaryAction>
                        <Checkbox
                        edge="end"
                        onChange={()=>{props.removeItem(item._id);setReload(!reload)}}
                        color="primary"
                        checked={true}
                 
                    />
                </ListItemSecondaryAction>
              </ListItem>
            )):null}
              </List>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                disabled={props.data.length===0?true:false}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )
        :
        activeStep === 1?(<div>
        <FormControl style={{width:'220px' , marginBottom:'4%'}}>
                <TextField classes={{root: classes.input}} id="standard-basic" label="location" name="location" onChange={(e)=>newTrade.location=e.target.value} defaultValue={newTrade.location} />
                  <br />
                 
                <TextField classes={{root: classes.input}} id="standard-basic" label="status" name="status" onChange={(e)=>newTrade.status=e.target.value} defaultValue={newTrade.status} />
                <br />
                <TextField classes={{root: classes.input}} id="standard-basic" label="Date Post" name="datePost" onChange={(e)=>newTrade.datePost=e.target.value} defaultValue={newTrade.datePost} />
                <br />
                <TextField classes={{root: classes.input}} id="standard-basic" label="Date Trade" name="dateTrade" onChange={(e)=>newTrade.dateTrade=e.target.value} defaultValue={newTrade.dateTrade} />
                <br />                    
            
      </FormControl>
        <div>
        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>):
    <div>
    <Typography variant="subtitle1" color="textSecondary" style={{marginBottom:'4%'}}>
        are you sure , that you will Post this trade ?
    </Typography>
<div>
<Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
  Back
</Button>
<Button
  variant="contained"
  color="primary"
  onClick={handleNext}
  className={classes.button}
>
  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
</Button>

</div>
</div>
        }
      </div>
      
      <Snackbar open={open} autoHideDuration={2000} onClose={handleNotifClose}>
        <Alert  onClose={handleNotifClose} severity="success">
          Thank you for your donation!
        </Alert>
      </Snackbar>
    </div>
  );
}
