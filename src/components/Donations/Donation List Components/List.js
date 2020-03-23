import React from 'react';

import SingleDonation from './SingleDonation';



export default function List() {

  const [donationList,setDonationList] = React.useState([]);

  const  fetchIt =async ()=>{
    const datatFromDataBase = await fetch("http://localhost:4000/donation");
    const data = await datatFromDataBase.json();
    console.log(data)
    setDonationList(data);

}


React.useEffect(() => {
    fetchIt()
},[])

  return (
    <div>
        {
            donationList.map(element =>(

                <SingleDonation  data={element} key={element._id} />
                
            ))
        }
      
      
    </div>
  );
}