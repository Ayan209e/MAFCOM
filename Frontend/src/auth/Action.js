import axios from "axios"
import { API_BASE_URL, PRODUCT_API_BASE_URL } from "../../src/config/apiConfig"
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, LOGOUT } from "./ActionType";
import getProduct from "../customer/useCase/getproduct";
import { getToken } from "./getToken";

const token=localStorage.getItem("jwt");
const registerRequest=()=>({type:REGISTER_REQUEST});
const registerSuccess=()=>({type:REGISTER_SUCCESS});
const registerFailure=()=>({type:REGISTER_FAILURE});

export const register=(userData)=> async (dispatch)=>{
    dispatch(registerRequest())

    try {
        const response=await axios.post(`${API_BASE_URL}/auth/signup`,userData);
        const user=response.data;
        if(user.jwt){
            localStorage.setItem("jwt",user.jwt)
            localStorage.setItem("role",user.role)
            return user;
        }
        dispatch(registerSuccess(user.jwt))
    }catch (error) {
        dispatch(registerFailure(error.message))
        // console.log(error);
    }
}

const loginRequest=()=>({type:LOGIN_REQUEST});
const loginSuccess=()=>({type:LOGIN_SUCCESS});
const loginFailure=()=>({type:LOGIN_FAILURE});

export const login=(userData)=> async (dispatch)=>{
    dispatch(loginRequest())

    try {
        const response= await axios.post(`${API_BASE_URL}/auth/signin`,userData);
        const user=response.data;
        if(user.jwt){
            localStorage.setItem("jwt",user.jwt)
            localStorage.setItem("role",user.role)
            dispatch(loginSuccess(user.jwt))
            return user;
            // console.log(user)
            // return("Logged In");
        }
        // console.log(user);
        // return(user.error);
    }catch (error) {
        dispatch(loginFailure(error.message))
        return("Try again");
    }
}

const getUserRequest=()=>({type:GET_USER_REQUEST});
const getUserSuccess=()=>({type:GET_USER_SUCCESS});
const getUserFailure=()=>({type:GET_USER_FAILURE});

export const getUser=()=> async (dispatch)=>{
    dispatch(getUserRequest())

    try {
        const response=await axios.post(`${API_BASE_URL}/api/users/profile`,{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        });
        const data=response.data;
        dispatch(getUserSuccess)
        return data;
    }catch (error) {
        dispatch(getUserFailure(error.message))
    }
}

export const logout=()=>(dispatch)=>{
    getToken();
    localStorage.clear();
    dispatch({type:LOGOUT,payload:null})
}

export const editProduct=(id,name,link,price,category,description)=> async (dispatch)=>{

    const updatedProduct=JSON.stringify({id:id,name:name,link:link,price:price,description:description,category:category});

    try {
        // console.log(description);
        await axios.put(`${PRODUCT_API_BASE_URL}/api/product/edit`,updatedProduct,{
            headers:{
                "Authorization": `Bearer ${getToken()}`,
                "Content-Type": "application/json"
            },
        });
        const j = await dispatch(getProduct());
        return j;
    }catch (error) {
        dispatch(getUserFailure(error.message))
    }
}

export const deleteproduct=(name,id,link,price,description)=> async (dispatch)=>{

    const deletedProduct=JSON.stringify({ name: name, id: id,link: link, price: price, description: description});

    try {
        // console.log(description);
        // console.log(id);
        await axios.put(`${PRODUCT_API_BASE_URL}/api/product/delete`,deletedProduct,{
            headers:{
                "Authorization": `Bearer ${getToken()}`,
                "Content-Type": "application/json"
            },
        });
        const j = await dispatch(getProduct());
        return j;
    }catch (error) {
        dispatch(getUserFailure(error.message))
    }
}

export const getCartProducts=()=> async (dispatch)=>{
    try {
        const response=await axios.get(`${PRODUCT_API_BASE_URL}/api/cart/getAll`,{
            headers:{
                "Authorization": `Bearer ${token}`,
                "jwt": `${token}`,
                "Content-Type": "application/json"
            }
        });
        return response.data;
    }catch (error) {
        // dispatch(getUserFailure(error.message))
    }
}

export const deleteCartProduct=(id)=> async (dispatch)=>{

    try {
        // console.log(id);
        await fetch(`${PRODUCT_API_BASE_URL}/api/cart/delete/${id}`,{
            method:"put",
            headers:{
                "Authorization": `Bearer ${token}`,
                "jwt": `${token}`,
                "Content-Type": "application/json"
            }
        });
        const j = await dispatch(getCartProducts());
        // console.log(j);
        return j;
    }catch (error) {
        // dispatch(getUserFailure(error.message))
    }
}

export const addCartProduct=(id)=> async (dispatch)=>{

    try {
        // console.log(description);
        // console.log(id);
        await fetch(`${PRODUCT_API_BASE_URL}/api/cart/add/${id}`,{
            method:"post",
            headers:{
                "Authorization": `Bearer ${getToken()}`,
                "jwt": `${getToken()}`,
                "Content-Type": "application/json"
            },
        });
        const j = await dispatch(getCartProducts());
        // console.log(j);
        return j;
    }catch (error) {
        // dispatch(getUserFailure(error.message))
    }
}

export const getUserProfile=()=> async (dispatch)=>{
    try {
        const response=await axios.get(`${PRODUCT_API_BASE_URL}/api/user/profile`,{
            headers:{
                "Authorization": `Bearer ${getToken()}`,
                "jwt": `${getToken()}`,
                "Content-Type": "application/json"
            }
        });
        // console.log(response.data);
        return response.data;
    }catch (error) {
        // dispatch(getUserFailure(error.message))
    }
}