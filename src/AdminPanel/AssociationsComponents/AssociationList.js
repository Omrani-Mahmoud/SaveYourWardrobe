import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from "axios";

// Generate Order Data


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function AssociationList() {
  const classes = useStyles();
  const [dataFromDB,setNewDataFromDB] = React.useState([]);

  const  fetchIt =async ()=>{
    const datatFromDataBase = await fetch("http://code-beast.herokuapp.com/association");
    const data = await datatFromDataBase.json();
    setNewDataFromDB(data);

}
  React.useEffect(() => {
    fetchIt()
},[])
  return (
    <React.Fragment>
      <Title>Associations List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Donations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataFromDB.map(row => (
            <TableRow key={row._id}>
              <TableCell>{new Date(row.joinDate).toLocaleDateString()}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell  align="right">{row.donations.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more associations
        </Link>
      </div>
    </React.Fragment>
  );
}