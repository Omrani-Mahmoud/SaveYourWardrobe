import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red, green } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CloseIcon from "@material-ui/icons/Close";
import img from "../../Assets/images/sweat-homme.jpg";

//TClothes.Card-List.styles.css

import TClothesCard from "./TClothes.Card";
import "./TClothes.Card-List.styles.css";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function TClothes() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [subscribtionStoreItems, setSubscribtionStoreItems] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fetchSubscribedStoreItems = async () => {
    const datatFromDataBase = await fetch(
      `http://localhost:4000/subscribedStores`
    );
    const data = await datatFromDataBase.json();
    //console.log("Debug fetchSubscribedStoreItems", data[0].name)
    setSubscribtionStoreItems(data);
    console.log("Debug subscribtionStoreItems", subscribtionStoreItems);
    //console.log("subscribedStoreItems", subscribedStoreItems)
  };
  React.useEffect(() => {
    fetchSubscribedStoreItems();
  }, []);

  console.log("fou9 return", subscribtionStoreItems);
  return (
    <div className="card-list">
      {subscribtionStoreItems.map((store) => (
        store.items.map((item,j) => {
          console.log(item);
          let props = {
            storeName: store.name,
            item: item
            }
          return (
            <TClothesCard key={j} {...props}></TClothesCard>
          );
        })
      ))}
    </div>
  );
}

/*
<TClothesCard key="2"></TClothesCard>
      <TClothesCard key="3"></TClothesCard>
      <TClothesCard key="4"></TClothesCard>
      <TClothesCard key="5"></TClothesCard>
      <TClothesCard key="6"></TClothesCard>
      <TClothesCard key="7"></TClothesCard>
      <TClothesCard key="8"></TClothesCard>
      <TClothesCard key="9"></TClothesCard>*/
/*
return (
    <div className="card-list">
      {subscribtionStoreItems.map(store => {
        store.items.map(item => {
          console.log("Debug I",item)
          console.log("Debug Store", store)
          return (
            <div key="1">
              <h1>{store.name}</h1>
              <TClothesCard data={store} item={item} key="1"></TClothesCard>
            </div>
          );
        });
        
      })}
    </div>
  );
*/

/*
return (
    <div className="card-list">
      {subscribtionStoreItems.map(store => {
        return (
          <div key="1">
            <h1>{store.name}</h1>
            <TClothesCard data={store} key="1"></TClothesCard>
          </div>
        );
        
      })}
    </div>
  );

*/
