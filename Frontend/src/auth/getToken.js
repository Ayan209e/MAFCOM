// import { useState } from "react";

export const getToken = () => {

    // const [token,setToken] = useState(localStorage.getItem("jwt"));

    const token = localStorage.getItem("jwt");
    return token;
}