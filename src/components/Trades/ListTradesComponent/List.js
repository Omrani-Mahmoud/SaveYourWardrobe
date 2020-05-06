import React from 'react';

import SingleTrade from './SingleTrade';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default function List() {

  const [tradeList,setTradeList] = React.useState([]);

  const  fetchIt =async ()=>{
    const datatFromDataBase = await fetch(`http://code-beast.herokuapp.com/userTrade/${window.localStorage.getItem("connectedUserID")}`);
    const data = await datatFromDataBase.json();
    console.log(""+data)
    setTradeList(data);

}


React.useEffect(() => {
    fetchIt()
},[])

  return (

    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Location</TableCell>
            <TableCell>Date Trade</TableCell>
            <TableCell>Items in trade</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Traded To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
            tradeList.map(element =>(

                <SingleTrade  data={element} key={element._id} />
                
            ))
        }
      
        </TableBody>
      </Table>
    </TableContainer>
  );
}