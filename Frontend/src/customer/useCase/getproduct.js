import { PRODUCT_API_BASE_URL } from "../../config/apiConfig";
import axios from "axios";

const getProduct=()=> async (dispatch)=>{
    try {
        const response=await axios.get(`${PRODUCT_API_BASE_URL}/product/getAll`,{
            headers:{
                // "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return response.data;
    }catch (error) {
        // dispatch(getUserFailure(error.message))
    }
}

export default getProduct;
