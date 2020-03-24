import React from 'react';

import SingleTrade from './SingleTrade';



export default function List() {

  const [tradeList,setTradeList] = React.useState([]);

  const  fetchIt =async ()=>{
    const datatFromDataBase = await fetch("http://localhost:4000/trade");
    const data = await datatFromDataBase.json();
    console.log(data)
    setTradeList(data);

}


React.useEffect(() => {
    fetchIt()
},[])

  return (
    <div>
        {
            tradeList.map(element =>(

                <SingleTrade  data={element} key={element._id} />
                
            ))
        }
      
      
    </div>
  );
}