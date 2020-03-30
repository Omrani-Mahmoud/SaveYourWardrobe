import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../AdminPanel/AssociationsComponents/Title';
import Button from '@material-ui/core/Button';

// Generate Order Data


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function ItemList(props) {
  const classes = useStyles();


 
  React.useEffect(() => {

},[])
  return (
    <React.Fragment>
     <Title>Items List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Item name</TableCell>
            <TableCell >Brand</TableCell>
            <TableCell>description</TableCell>
            <TableCell>Color</TableCell>
            <TableCell align="center">Size</TableCell>
            <TableCell></TableCell>
            
            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map(row => (
            <TableRow key={row._id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.brand}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.color}</TableCell>
              <TableCell align="center">{row.size}</TableCell>
              <TableCell >
              <Button type="submit" size="small" variant="text" style={{float:"right"}} color="primary" onClick={()=>props.deleteItem(row._id)}>delete</Button>
              <Button type="submit" size="small" variant="text" style={{float:"right"}} color="primary" onClick={()=>props.updateItem(row)}>Update</Button>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          My wardrobe
        </Link>
      </div>
    </React.Fragment>
  );
}