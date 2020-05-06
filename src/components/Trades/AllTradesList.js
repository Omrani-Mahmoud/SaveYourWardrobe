import React from 'react';

import AllTrades from './ListTradesComponent/AllTrades';
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
    const datatFromDataBase = await fetch(`http://code-beast.herokuapp.com/trade`);
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
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Trade From</TableCell>
            <TableCell align="right">Trade To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
            tradeList.map(element =>(

                <AllTrades  data={element} key={element._id} />
                
            ))
        }
        </TableBody>
      </Table>
    </TableContainer>

  );
}