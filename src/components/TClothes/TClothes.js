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
import axios from "axios";

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
  const [favorite, setFavorite] = React.useState(false);
  const [reload,setReload] = useState(false);

  const [subscribtionStoreItems, setSubscribtionStoreItems] = useState([]);
  const [cardRemoved, setCardRemoved] = React.useState(false);



  const fetchSubscribedStoreItems = async () => {
    const datatFromDataBase = await fetch(
      `http://localhost:4000/userStoreItemsToReact/`+window.localStorage.getItem("connectedUserID")
    );
    const data = await datatFromDataBase.json();
    setSubscribtionStoreItems(data);
    //console.log("Debug subscribtionStoreItems", subscribtionStoreItems);
  };
  React.useEffect(() => {
    fetchSubscribedStoreItems();
  }, [reload]);

  async function handleChildClick(favorite) {
    await axios.patch("http://localhost:4000/updateUserStoreItemsToReact/"+window.localStorage.getItem("connectedUserID")+"/"+favorite.action+"/"+favorite.item_id)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
        setReload(!reload)
      }

  console.log("fou9 return", subscribtionStoreItems);
  return (
    <div className="card-list">
      {subscribtionStoreItems.map((store,i) => (
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
      ))}
    </div>
  );
}


// return (
//   <div className="card-list">
//     {subscribtionStoreItems.map((store,i) => (
//       store.items.map((item,j) => {
//         console.log(item);
//         console.log(j);
//         let data = {
//           storeName: store.name,
//           item: item,
//           position: {
//             x: i,
//             y: j
//           }
//           }
//         return (
//           <TClothesCard key={j} data={data} onFavoriteClick={handleChildClick}></TClothesCard>
//         );
//       })
//     ))}
//   </div>
// );