import React,{useState,useEffect} from 'react'
import axios from "axios";

function AddNewItem(){

const [newItem,setNewItem] = useState({name:"",description:"",size:"",color:"",price:""})
const [dataFromDB,setNewDataFromDB] = useState([]);
const [refresh,setRefresh] = useState(false);
const [wantToUpdate,setWantToUpdate] = useState(false);


    const addItem =()=>{
        axios.post("http://localhost:4000/item",newItem)
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })

    }


    const  fetchIt =async ()=>{
        const datatFromDataBase = await fetch("http://localhost:4000/item");
        const data = await datatFromDataBase.json();
        setNewDataFromDB(data);

}

const updateItem = (element) =>{
     setNewItem(element)
    setWantToUpdate(true)
    
    
}

        useEffect(() => {
            fetchIt()
            setRefresh(false)
        },[refresh])

    const deleteItem = (idItem) =>{
        axios.delete(`http://localhost:4000/item/${idItem}`)
        .then(res=>{
            console.log(res)
            setRefresh(true)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const persistUpdate = ()=>{
        axios.patch(`http://localhost:4000/item/${newItem._id}`,newItem)
            .then(res =>{
                console.log(res)
            })
        
             .catch(err=>{
            console.log(err)
        })
    }


    

    return(
        <div>
                <form onSubmit={wantToUpdate?persistUpdate:addItem}>
                    name
                    <input type="text" name="name" onChange={(e)=>newItem.name=e.target.value} defaultValue={newItem.name} />
                        <br />
                    desc
                    <input type="text" name="description" onChange={(e)=>newItem.description=e.target.value} defaultValue={newItem.description}/>
                    <br />
                    size
                    <input type="text" onChange={(e)=>newItem.size=e.target.value} defaultValue={newItem.size}/>
                    <br />
                    color
                    <input type="text" onChange={(e)=>newItem.color=e.target.value} defaultValue={newItem.color}/>
                    <br />
                    price
                    <input type="text" onChange={(e)=>newItem.price=e.target.value} defaultValue={newItem.price} />

                    <button type="submit"> add</button>
                    
                </form>
               

                <div>
                    {dataFromDB.map(element=>
                        <div key={element._id}>
                            <li>{element.name}</li>
                            <button onClick={()=>deleteItem(element._id)}>delete</button>
                            <button onClick={()=>updateItem(element)}>update</button>    
                        </div>
                    )}
                </div>
        </div>
    )
}
 export default AddNewItem
