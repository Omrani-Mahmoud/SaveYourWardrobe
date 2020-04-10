import React from 'react'



import Skeleton from '@material-ui/lab/Skeleton';
import SingleDonation from './SingleDonation';
function AssociationList(props) {
  const [loading,setLoading] = React.useState(true);

  console.log(props)
  return (
    <div>

      {
      
          props.data.length!==0?props.data.map(element =>(
              element.items.length?
              <SingleDonation  data={element} key={element._id} />
              :
              null
              
          ))
          :
          <React.Fragment>
          <Skeleton />
          <Skeleton animation={false} />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
          </React.Fragment>
      }
    
    
  </div>
  )
}

export default AssociationList
