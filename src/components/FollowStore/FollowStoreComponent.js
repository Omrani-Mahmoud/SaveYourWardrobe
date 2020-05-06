import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import {UserData} from '../../HomeAfterLogin';
import Button from '@material-ui/core/Button';
import axios from "axios";
import FollowStoreLine from './FollowStoreLine';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  listSection: { backgroundColor: "inherit" },
  ul: { backgroundColor: "inherit", padding: 0 },
}));

export default function FollowStoreComponent({ stores }) {
  const classes = useStyles();
  const userData = React.useContext(UserData);
  console.log(userData)

  async function followStore(id_store) {
    await axios.post(`http://code-beast.herokuapp.com/follow/${
      window.localStorage.getItem("connectedUserID")
    }/store/${
      id_store
    }`)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
        //setReload(!reload)
        
      }

  return (
    <div>
      <List className={classes.root} subheader={<li />}
      >
        {
          stores.map((item) => (

            <FollowStoreLine item={item} userStores = {userData.followedStores} ></FollowStoreLine>
            
          ))
        }
        
      </List>
    </div>
  );
}
