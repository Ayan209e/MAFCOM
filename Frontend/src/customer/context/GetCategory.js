import React,{useState} from "react"
import categoryContext from "./categorycontext";


const GetCategory=(props)=>{
    const [selectedCategory, setSelectedCategory] = useState({ id: "all" });
    return (
        <categoryContext.Provider value={{selectedCategory,setSelectedCategory}}>{props.children}</categoryContext.Provider>
      )
}

export default GetCategory;