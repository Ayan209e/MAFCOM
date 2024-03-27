import { useContext, useEffect,useState } from "react";
import productContext from "../../context/productcontext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Import the cart icon
import { useParams } from "react-router-dom";
import getProductById from "../../useCase/getproductbyId";
import { useDispatch } from "react-redux";
import { addCartProduct } from "../../../auth/Action";
import { Link } from "react-router-dom";
import { getToken } from "../../../auth/getToken";


export default function SelectProduct() {

    const [text,setText]=useState("Add to Cart")

    const [clss,setClss]=useState("hide")

    const {pid} = useParams();

    const dispatch=useDispatch();

    const addProduct = async () => {
        const j = await dispatch(addCartProduct(pid));
        if (Array.isArray(j)) {
            // console.log(j);
        }
        else {
            // console.log(j);
            // alert("You don't have admin rights");
        }
    };
    
    const context = useContext(productContext);
    const { selectedProduct,setSelectedProduct } = context;

    useEffect(() => {
        const fetchData=async()=>{
            const j=await getProductById(pid);
            setSelectedProduct(j)
        }
        fetchData()
        // console.log(selectedProduct);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const added = () => {
        setText("Added to Cart")
        setClss("")
        setTimeout(()=>{
            
            setText("Add to Cart")
        },1000)
    }

    return (
        <div id='pdp' className="container mt-3">
            <div className="row" id="pdpRow">

                <div className="col-lg-4" id="pdpImg">
                    <img src={`${selectedProduct.link}`}  alt="Product" />
                </div>

                <div className="col-lg-1"></div>

                <div className="col-lg-6" id="pdpDesc">

                    <h2 id="pdpName">{selectedProduct.name}</h2>
                    <p id="pdpId">Id: {selectedProduct.id}</p>
                    <p id="pdpDes">{selectedProduct.description}</p>
                    <p id="pdpPrice">Rs. {selectedProduct.price}/-</p>

                    {(getToken()==null)?
                        <Link to={"/signin"}>
                            <button className="btn btn-primary " id="pdpAdd" onClick={()=>{
                        addProduct()
                        added()
                        // added
                    }}> 
                            <span id="add">{text}</span> 
                            <FontAwesomeIcon id="pdpIcon" icon={faShoppingCart} />
                    </button>
                        </Link>
                    :
                    
                        <button className="btn btn-primary " id="pdpAdd" onClick={()=>{
                            addProduct()
                            added()
                            // added
                        }}> 
                                <span id="add">{text}</span> 
                                <FontAwesomeIcon id="pdpIcon" icon={faShoppingCart} />
                        </button>
                    }

                    

                    <Link to="/cart">
                        <button className={`btn btn-primary ${clss}`} id="pdpAdded"  >
                                <span>Go To Cart</span> 
                                <FontAwesomeIcon id="pdpIcon" icon={faShoppingCart} />
                        </button>
                    </Link>

                </div>

            </div>
        </div>
    );
}
