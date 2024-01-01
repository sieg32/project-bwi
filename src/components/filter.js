import { useState } from "react"
import '../stylesheets/filter.css'


export default function Filter({data,change}){

  
    
    
    const [value, setValue] = useState({upper:0, lower:0});
    const updateChange=()=>{
        change(value)
    }
   
    return(
        <div id="filter">
            <div>

                <h4>price range </h4>
                <h3>from:</h3>
                <input type="number" value={value.lower } placeholder="lower range" onChange={(e)=>{setValue({...value, lower:e.target.value})}}></input>
                <h3>to:</h3>
                <input type="number" value={value.upper } placeholder="upper range" onChange={(e)=>{setValue({...value, upper:e.target.value})}}></input>
            </div>
            <button type="button" onClick={updateChange}>apply</ button>
        </div>
    )
}