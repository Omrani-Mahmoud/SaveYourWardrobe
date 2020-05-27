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


import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import DialogTitle from '@material-ui/core/DialogTitle'; 
import Dialog from '@material-ui/core/Dialog';

import FollowStoreComponent from "../FollowStore/FollowStoreComponent";
//TClothes.Card-List.styles.css

import TClothesCard from "./TClothes.Card";
import "./TClothes.Card-List.styles.css";
import axios from "axios";
import {uri} from "../../UrlBase";

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
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function TClothes() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [favorite, setFavorite] = React.useState(false);
  const [reload,setReload] = useState(false);
  const [showFollowStore, setShowFollowStore] = React.useState(false);

  const [subscribtionStoreItems, setSubscribtionStoreItems] = useState([]);
  const [cardRemoved, setCardRemoved] = React.useState(false);
  const [stores, setStores] = React.useState([])

  const fetchStores = async () => {
    const datatFromDataBase = await fetch(
      `https://code-beast.herokuapp.com/store`
    );
    const data = await datatFromDataBase.json();
    setStores(data);
    //console.log("Debug subscribtionStoreItems", subscribtionStoreItems);
  };

  const fetchSubscribedStoreItems = async () => {
    const datatFromDataBase = await fetch(
      `${uri.link}user/followed/stores/items/`+window.localStorage.getItem("connectedUserID")
    );
    const data = await datatFromDataBase.json();
    setSubscribtionStoreItems(data.followed_stores_items);
    console.log("Debug subscribtionStoreItems", subscribtionStoreItems);
  };
  React.useEffect(() => {
    fetchStores();
    
  }, []);

  React.useEffect(() => {
    fetchSubscribedStoreItems();
    
  }, [reload]);

  async function handleChildClick(favorite) {
    await axios.post(uri.link+"reaction", {
      user: window.localStorage.getItem("connectedUserID"),
      item: favorite.item_id,
      status: favorite.action
    })
        setReload(!reload)
      }

  console.log("fou9 return", subscribtionStoreItems);
  const handleClose = () => {     setShowFollowStore(false);   };
  return (
    <div className="card-list">
      <div>
      <Button onClick={() => {
        setShowFollowStore(true)
      }}
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
      >
        Follow List
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={showFollowStore}>       
      <DialogTitle id="simple-dialog-title">Stores</DialogTitle>
      <FollowStoreComponent stores = {stores}></FollowStoreComponent>
      </Dialog>
    </div>
      {/* {subscribtionStoreItems.map((store,i) => (
        store.userStoreItemsReaction.items.map((item,j) => {
          console.log(item);
          console.log(j);
          let data = {
            item: item
            }
          return (
            <TClothesCard key={j} data={data} onFavoriteClick={handleChildClick}></TClothesCard>
          );
        })
      ))} */
     
      subscribtionStoreItems.map((item,j) => {
          console.log(item);
          console.log(j);
          let data = {
            item: item
            }
          return (
            <TClothesCard key={j} data={data} onFavoriteClick={handleChildClick}></TClothesCard>
          );
        })
      
      }
    </div>
  );
}
