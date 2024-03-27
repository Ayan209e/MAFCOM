import { PRODUCT_API_BASE_URL } from "../../config/apiConfig";

const addproduct=async (name,link,price,description,category)=>{

    const token = localStorage.getItem("jwt");

    const response=await fetch(`${PRODUCT_API_BASE_URL}/api/product/add`,{
            method:"post",
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body:JSON.stringify({name:name,link:link,price:price,description:description,category:category})
        })
        const json=await response.json();
        return json;
}

export default addproduct;
