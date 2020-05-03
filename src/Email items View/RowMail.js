import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles , useTheme} from '@material-ui/core/styles';

import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    rootBtnAdd: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      color: 'white',
    },
  }));
function RowMail({row,push,fetch}) {
    const [checked,setChecked] = React.useState(false)
    const classes = useStyles();


    const handleChange = ()=>{
        setChecked(true)
        push(row)
    }
    return (
        <TableRow key={row.name}>
              <TableCell align="center">{row.from[0].name}</TableCell>
              <TableCell align="center">{row.from[0].address}</TableCell>
              <TableCell align="center">{new Date(row.date).toDateString()}</TableCell>
              <TableCell align="center">
              <IconButton size="lg" aria-label="upload picture" component="span" className={classes.rootBtnAdd} style={{float:"right"}} onClick={()=>fetch(row)} >
          <GetAppIcon /> 
        </IconButton>
              </TableCell>

            </TableRow>
    )
}

export default RowMail
