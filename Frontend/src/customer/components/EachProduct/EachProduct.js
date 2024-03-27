import { useEffect,useContext,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import categoryContext from '../../context/categorycontext';
import EditModal from '../EditProductModal/EditModal';
// import productContext from '../../context/productcontext';
// import getProductById from '../../useCase/getproductbyId';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Import the cart icon
import { useNavigate } from 'react-router-dom';
import { addCartProduct } from '../../../auth/Action';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getToken } from '../../../auth/getToken';

export default function EachProduct(props) {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const { name, id, onDelete, link, price, description, products, category} = props;
    const context=useContext(categoryContext)
    const {selectedCategory}=context
    // const contextproduct=useContext(productContext)
    // const {setSelectedProduct,selectedProduct}=contextproduct; 


    const handleDelete = () => {
        onDelete(name, id, link, price, description);
    };
    const addProduct = async () => {
        const j = await dispatch(addCartProduct(id));
        if (Array.isArray(j)) {
            // console.log(j);
        }
        else {
            // console.log(j);
            // alert("You don't have admin rights");
        }
    };


    useEffect(()=>{
        // console.log(selectedCategory)
        // console.log(category+"   "+selectedCategory)
    },[])
    const click=async ()=>{
        // console.log(id)
        // const j=await getProductById(id);
        // console.log(j);
        // setSelectedProduct(j)
        // console.log(selectedProduct)
        navigate(`/product/${id}`)
    }

    const [clss,setClss]=useState("hide")

    const [colr,setColr]=useState({ cursor: "pointer" ,color:'white',scale:"1.4"})
    const clicked=()=>{
        // console.log("hi");
        setColr({ cursor: "pointer" ,color:'black',scale:"1.4"})
        setClss("")
        setTimeout(()=>{
            setColr({ cursor: "pointer" ,color:'white',scale:"1.4"})
            setClss("hide")
        },2000)
    }

    return (
        <>
        <EditModal  name={name} id={id} link={link} price={price} description={description} products={products} category={category}/>
            <>
            {selectedCategory && selectedCategory.id !== "all" && category !== selectedCategory.id ? null : (
            <div id="productCard" className={`card mx-4 mb-[50px]  ${category}`} style={{ width: "17%", borderRadius:"5%", minWidth:"250px"}} >
                <h1 className="card-title text-center mt-2 " style={{ fontSize: "25px" }}>
                    {name}
                </h1>
                <img src={link} className={`card-img-top my-2 mx-auto `} alt="..." style={{ height: "300px",borderRadius:"6%" }} onClick={click}/>
                <div className="card-body">
                    <h5 className="card-title text-center">{description}</h5>
                    <h5 className="card-title text-center ">Rs {price}</h5>
                    <div className='card-title flex justify-content-between'> 
                    {(localStorage.getItem("role")===null || localStorage.getItem("role")==="Customer")?<></>:
                    <FontAwesomeIcon
                    icon={faTrash}
                    className="ml-3 mb-1 text-white "
                    style={{ cursor: "pointer" ,color:"black", scale:"1.3"}}
                    onClick={handleDelete}
                ></FontAwesomeIcon>
                    }
                    &nbsp;&nbsp;&nbsp;
                    {(localStorage.getItem("role")===null || localStorage.getItem("role")==="Customer")?<></>:
                    <FontAwesomeIcon
                    icon={faPenSquare}
                    className="ml-3 mb-1"
                    style={{ cursor: "pointer" ,color:"black",scale:"1.4"}}
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal${id}`}
                />
                    }
                    {(localStorage.getItem("role")===null || localStorage.getItem("role")==="Customer")?<>
                    {(getToken()==null)?
                        <Link to={"/signin"}>
                            <div id='pdpCart'>
                    <div id='added' className={`${clss}`}>Added</div>
                    <FontAwesomeIcon
                    id='pdpIcon'
                    icon={faShoppingCart}
                    className="ml-3 mb-1"
                    style={colr}
                    onClick={()=>{
                        addProduct()
                        clicked()
                        // added()
                        // added
                    }}/>
                    </div>
                        </Link>
                    :
                    <div id='pdpCart'>
                    <div id='added' className={`${clss}`}>Added</div>
                    <FontAwesomeIcon
                    id='pdpIcon'
                    icon={faShoppingCart}
                    className="ml-3 mb-1"
                    style={colr}
                    onClick={()=>{
                        addProduct()
                        clicked()
                        // added()
                        // added
                    }}/>
                    </div>
                        
                    }
                    {/* <div id='pdpCart'>
                    <div id='added' className={`${clss}`}>Added</div>
                    <FontAwesomeIcon
                    id='pdpIcon'
                    icon={faShoppingCart}
                    className="ml-3 mb-1"
                    style={colr}
                    onClick={()=>{
                        addProduct()
                        clicked()
                        // added()
                        // added
                    }}/>
                    </div> */}
                    
                    </>
                    :
                    <></>
                    }
                    
                    </div>
                </div>
            </div>)}</>
        </>
    );
}
