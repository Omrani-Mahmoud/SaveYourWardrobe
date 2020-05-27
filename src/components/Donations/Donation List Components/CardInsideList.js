import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import img from '../../../Assets/images/outfit.jpg'
import {uri} from "../../../UrlBase";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth:270
  },
  media: {
    height: 140,
  },
});

export default function CardInsideList(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.data.size.image?props.data.size.image:img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.data.name}
          </Typography>
          <Typography color="textSecondary">
            <b>Brand : </b>{props.data.brand?props.data.brand:"-"}
          </Typography>
          <Typography color="textSecondary">
          <b>Size : </b>{props.data.size}
          </Typography>
          <Typography color="textSecondary">
            <b>Color : </b>{props.data.color?props.data.color:"-"}
          </Typography>
          <Typography color="textSecondary" >
          <b>Price : </b>{props.data.price?props.data.price:"-"}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}