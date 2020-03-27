import React from 'react';

import AllTrades from './ListTradesComponent/AllTrades';



export default function List() {

  const [tradeList,setTradeList] = React.useState([]);

  const  fetchIt =async ()=>{
    const datatFromDataBase = await fetch(`http://localhost:4000/trade`);
    const data = await datatFromDataBase.json();
    console.log(""+data)
    setTradeList(data);

}


React.useEffect(() => {
    fetchIt()
},[])

  return (
    <div>
        {
            tradeList.map(element =>(

                <AllTrades  data={element} key={element._id} />
                
            ))
        }
      
      
    </div>
  );
}