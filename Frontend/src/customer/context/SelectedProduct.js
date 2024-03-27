import React,{useState} from "react"
import productContext from "./productcontext"

const SelectedProduct=(props)=>{
    const [selectedProduct,setSelectedProduct]=useState({
        id:"",
        name:"",
        description:"",
        link:"",
        price:"",
        category:""
    })

    const [totalQuantity,setTotalQuantity]=useState(0)
    return (
        <productContext.Provider value={{selectedProduct,setSelectedProduct,totalQuantity,setTotalQuantity}}>{props.children}</productContext.Provider>
    )
}

export default SelectedProduct;
