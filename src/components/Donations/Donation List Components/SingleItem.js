import React from 'react'
import Chip from '@material-ui/core/Chip';

function SingleItem(props) {
    const [disableIt, setdisableIt] = React.useState(false);


    React.useEffect(() => {
      if(props.cancled)
        setdisableIt(false)
    }, [props.cancled])

    return (
        <Chip variant="outlined" color="primary" size="small"  label={props.elem.name} style={{marginLeft:"5%"}} disabled={disableIt} onDelete={props.isEit?()=>{props.handleDelete(props.elem._id);setdisableIt(true)}:null} />

    )
}

export default SingleItem
