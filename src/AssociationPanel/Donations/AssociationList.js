import React from 'react'



import Skeleton from '@material-ui/lab/Skeleton';
import SingleDonation from './SingleDonation';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
function AssociationList(props) {
  const [loading,setLoading] = React.useState(true);
  const classes = useStyles();

  return (
    <div>
        <Card>
         
        <CardContent>
      {
      
          props.data.length!==0?props.data.map(element =>(
              element.items.length?
              <SingleDonation  data={element} key={element._id} />
              :
              null
              
          ))
          :
          <React.Fragment>
          <Skeleton />
          <Skeleton animation={false} />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
          </React.Fragment>
      }
    </CardContent>
    </Card>
  </div>
  )
}

export default AssociationList
