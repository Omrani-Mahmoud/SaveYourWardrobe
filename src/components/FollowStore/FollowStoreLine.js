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

export default function FollowStoreLine({ item, userStores }) {
  const classes = useStyles();
  //const userData = React.useContext(UserData);
  
  const [reload, setReload] = React.useState(false);
  const [userData, setUserData] = React.useState({});

  const fetchUserData = async () => {
    const datatFromDataBase = await fetch(
      `http://localhost:4000/user/`+window.localStorage.getItem("connectedUserID")
    );
    const data = await datatFromDataBase.json();
    setUserData(data);
    //console.log("Debug subscribtionStoreItems", subscribtionStoreItems);
  };

  React.useEffect(() => {
    fetchUserData();
    
  }, [reload]);

  const verify = () => {
    var result = false;
    userData && userData.followedStores && userData.followedStores.map((x) => {
        console.log('Comparing: ', x,' - ', item._id)
        if(x == item._id) {
            //console.log('Exist')
            result = true;
        }
    })
    return result;
  }

  async function followStore(id_store) {
    await axios.post(`http://localhost:4000/follow/${
      window.localStorage.getItem("connectedUserID")
    }/store/${
      id_store
    }`)
        .then(res=>{
            setReload(!reload)
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
        //setReload(!reload)
        
      }

      async function unfollowStore(id_store) {
        await axios.post(`http://localhost:4000/unfollow/${
          window.localStorage.getItem("connectedUserID")
        }/store/${
          id_store
        }`)
            .then(res=>{
                setReload(!reload)
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
            //setReload(!reload)
          }

  return (
            <ListItem key={`item-${item._id}-${item}`}>
              {" "}
              <ListItemText primary={` ${item.name}`} />{" "}
                {
                    verify() ? 
                    <Button onClick={() => unfollowStore(item._id)}  variant="contained" color="primary">
                        Unfollow
                    </Button>
                    :
                    <Button onClick={() => followStore(item._id)}  variant="contained" color="primary">
                        Follow
                    </Button>
                }
              

            </ListItem>
            
            
          
  );
}
