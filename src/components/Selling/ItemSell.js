import React, { useState } from 'react';

import {useParams} from 'react-router-dom'
import './Selling.css';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import exchange from '../../Assets/images/outfit.jpg'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

import othercl from '../../Assets/images/saleee.jpg'


import TextField from '@material-ui/core/TextField';






const useStyles = makeStyles((theme) => ({
    root: {
   
      width: '100%',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
        
        maxWidth: "100%",
        height:350,
    
    },
    cover1: {
        
      maxWidth: "100%",
      height:250,
  
  },
  cover2: {
        
    width:151,
    height:190,
   
   

},

  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  }));


// FoR Steps

  function getSteps() {
    return ['Selecting Item', 'Infomations About Sell', 'Confirmation'];
  }
  
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Select Item ...';
      case 1:
        return 'Almost done...';
      case 2:
        return 'Well Done!';
      default:
        return 'Unknown stepIndex';
    }
  }

// FoR Steps

const ItemSell=()=>{

    const classes = useStyles();
  const theme = useTheme();

    const itemId= useParams().itemId;
    const [kk,setkk] = useState([{}]);

    const [disable,setdisable]=useState(true);

    

    const [activeStep, setActiveStep] = React.useState(1);

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if(activeStep===2){

      alert(prix);

    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setdisable(true);
  };


  
  
  
    const fetchIt1 =async ()=>{
      const datatFromDataBase = await fetch("http://localhost:4000/item/"+itemId);
      const data = await datatFromDataBase.json();
     
    
      setkk(data);

    
    }
    
    React.useEffect(() => {
      fetchIt1()
     
  },[])
  
 
  var suggest=(kk.price/2)+kk.price*0.15;

  const inputProps = {
    step: 1,
    max:kk.price-1,
    min:1,
  };
  
  var ladate=new Date()
 
  var aujourdhui=ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear();




 const [prix,setprix] = useState();
 const [Error,setError]=useState('');

const ChangeHandler=event=>{

  
  setprix(event.target.value);

  if (event.target.value!=""){
    if (event.target.value>0 && event.target.value<kk.price){
      setError("");
      setdisable(false);
    }else{
      setError("Error :The new price must be lower than the older and positive!");
      setdisable(true);
    }

   
  }else{
    setError("");
    setdisable(true);
  }


 
};


 
  return (
    <Grid container spacing={3}>
        <Grid item xs={4}>
        <Paper className={classes.paper}>
    <Card className={classes.root} className="head">
        <CardMedia
        className={classes.cover}
        image={exchange}
        title="Live from space album cover"
        
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">

            {kk.name}

          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {kk.description}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
            Size: {kk.size}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
            Color: {kk.color}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
            Price: {kk.price} DT
          </Typography>
        </CardContent>
       
      </div>
      
    </Card>

    </Paper>
    </Grid>


    <Grid item xs={8}>
        
          <Paper className={classes.paper}> 


          <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        
        
        ):activeStep === 0 ? (




             
        <div >

<CardMedia
        className={classes.cover1}
        image={othercl}
        title="Live from space album cover"
        
      />
          <h1> Would you like to choose another item ? <Link to={'/home/selling'} className="link"> yes! </Link></h1>
        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
        <div>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.backButton}
          >
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext} >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>



        ):activeStep === 1 ? (


          <div>

            <fieldset> 

              <legend className="legen">Informations About Sell </legend>
              <p className="dateauj">Date of the post: - {aujourdhui} - </p>

              <h2> {kk.name}</h2>


            <form className={classes.root} noValidate autoComplete="on">

                <TextField id="standard-basic" label="New Price" type="number" fullWidth={true}  helperText={"For some help we suggest: "+suggest+" DT"} inputProps={inputProps} required autoFocus onChange={ChangeHandler}/>
               <label className="MyError"> {Error} </label>
            </form>

            <p className="oldp"> Old Price: <strong> {kk.price} DT </strong> </p>
            
            </fieldset>

     
    
    
    
    <div>
    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
    <div>
      <Button
        disabled={activeStep === 0}
        onClick={handleBack}
        className={classes.backButton}
      >
        Back
      </Button>
      <Button variant="contained" color="primary" onClick={handleNext} disabled={disable}>
        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
      </Button>
    </div>
  </div>
  </div>

      )  :   (


        <div>


<Card  className="head1">
        <CardMedia
        className={classes.cover2}
        image={exchange}
        title="Live from space album cover"
        
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" align="justify">

            {kk.name}

          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
            {kk.description}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
            Size: {kk.size}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
            Color: {kk.color}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p" align="justify" className="older">
           Original Price: {kk.price} DT
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
          <strong>Selling Price: {prix} DT</strong>
          </Typography>
        </CardContent>
       
      </div>
      
    </Card>


        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
        <div>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.backButton}
          >
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
      
      )}
 
      
          
       
      
      </div>
    </div>
          
          
          </Paper>
        </Grid>



    </Grid>
  );


                

}

export default ItemSell;