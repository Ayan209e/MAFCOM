import { PRODUCT_API_BASE_URL } from "../../config/apiConfig";

const getProductById=async (id)=>{

    // const token = localStorage.getItem("jwt");

    const response = await fetch(`${PRODUCT_API_BASE_URL}/product/get/${id}`, {
                    method: "get",
                    // headers: {
                    //     "Authorization": `Bearer ${token}`
                    // }
    });
    const json=await response.json();
    // console.log(response)
    // console.log(json);
    return json;
}

export default getProductById;