import React from 'react';

import SingleDonation from './SingleDonation';

import Skeleton from '@material-ui/lab/Skeleton';

export default function List(props) {

  const [donationList,setDonationList] = React.useState([]);

  const  fetchIt =async ()=>{
    const datatFromDataBase = await fetch(`http://localhost:4000/userDonation/${window.localStorage.getItem("connectedUserID")}`);
    const data = await datatFromDataBase.json();
    console.log(data)
    setDonationList(data);

}


React.useEffect(() => {
    fetchIt()
},[props.reload])

  return (
    <div>
        {
            donationList.length!==0?donationList.map(element =>(

                <SingleDonation  data={element} key={element._id} />
                
            ))
            :
            <React.Fragment>
            <Skeleton />
            <Skeleton animation={false} />
            <Skeleton animation="wave" />
            </React.Fragment>
        }
      
      
    </div>
  );
}