import React,{useState,useEffect} from 'react'
import axios from "axios";

function AddNewTrade(){

const [newTrade,setNewTrade] = useState({location:"",status:"",datePost:"",dateTrade:"",items:[]})
const [dataFromDB,setNewDataFromDB] = useState([]);
const [refresh,setRefresh] = useState(false);
const [wantToUpdate,setWantToUpdate] = useState(false);


    const addTrade =()=>{
        axios.post("http://localhost:4000/trade",newTrade)
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })

    }


    const  fetchIt =async ()=>{
        const datatFromDataBase = await fetch("http://localhost:4000/trade");
        const data = await datatFromDataBase.json();
        setNewDataFromDB(data);

}

const updateTrade = (element) =>{
     setNewTrade(element)
    setWantToUpdate(true)
    
    
}

        useEffect(() => {
            fetchIt()
            setRefresh(false)
        },[refresh])

    const deleteTrade = (idTrade) =>{
        axios.delete(`http://localhost:4000/trade/${idTrade}`)
        .then(res=>{
            console.log(res)
            setRefresh(true)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const persistUpdate = ()=>{
        axios.patch(`http://localhost:4000/trade/${newTrade._id}`,newTrade)
            .then(res =>{
                console.log(res)
            })
        
             .catch(err=>{
            console.log(err)
        })
    }


    

    return(
        <div>
                <form onSubmit={wantToUpdate?persistUpdate:addTrade}>
                    location
                    <input type="text" name="location" onChange={(e)=>newTrade.location=e.target.value} defaultValue={newTrade.location} />
                        <br />
                    status
                    <input type="text" name="status" onChange={(e)=>newTrade.status=e.target.value} defaultValue={newTrade.status}/>
                    <br />
                    datePost
                    <input type="date" onChange={(e)=>newTrade.datePost=e.target.value} defaultValue={newTrade.datePost}/>
                    <br />
                    dateTrade
                    <input type="date" onChange={(e)=>newTrade.dateTrade=e.target.value} defaultValue={newTrade.dateTrade}/>
                    <br />
                    Items
                    <input type="text" onChange={(e)=>newTrade.items=e.target.value} defaultValue={newTrade.items} />

                    <button type="submit"> add</button>
                    
                </form>
               

                <div>
                    {dataFromDB.map(element=>
                        <div key={element._id}>
                            <li>{element.name}</li>
                            <button onClick={()=>deleteTrade(element._id)}>delete</button>
                            <button onClick={()=>updateTrade(element)}>update</button>    
                        </div>
                    )}
                </div>
        </div>
    )
}
 export default AddNewTrade
