import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './InsideHome/Title';
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
// Generate Order Data


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function EventList() {
  const classes = useStyles();
  const [dataFromDB,setNewDataFromDB] = React.useState([]);
  const [reload,setReload] = React.useState(false);


  const  fetchIt =async ()=>{
    const datatFromDataBase = await fetch(`https://code-beast.herokuapp.com/event/${window.localStorage.getItem("connectedUserID")}`);
    const data = await datatFromDataBase.json();
    console.log(data)
    setNewDataFromDB(data);

}
const handleRemove = id => {
  const url = `https://code-beast.herokuapp.com/event/${id}`;

  axios
    .delete(url)
    .then(res => {
      if(res.status=200){
        setReload(!reload)
      Swal.fire({
        icon: 'success',
        title: 'Done...',
        text: 'Event deleted!',
      })
    }
    })
    .catch(err => {
      console.log(err);
    });
};
  React.useEffect(() => {
    fetchIt()
},[reload])
  return (
    <React.Fragment>
      <Title>Event List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Start date</TableCell>
            <TableCell align="center">End date</TableCell>
            <TableCell align="center">Event name</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataFromDB.map(row => (
            <TableRow key={row._id}>
              <TableCell align="center">{new Date(row.startDate).toLocaleDateString()}</TableCell>
              <TableCell align="center">{new Date(row.endDate).toLocaleDateString()}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell  align="center">{row.description}</TableCell>
              <TableCell  align="center">
              <IconButton aria-label="delete" className={classes.margin} onClick={()=>handleRemove(row._id)}>
          <DeleteIcon />
        </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </React.Fragment>
  );
}