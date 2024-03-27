import { useState, useEffect } from 'react';
import EachProduct from '../EachProduct/EachProduct';
import getProduct from '../../useCase/getproduct';
import { deleteproduct } from '../../../auth/Action';
import AddModal from '../AddProductModal/AddModal';
import { useDispatch } from 'react-redux';

export default function Product() {
    const [products, setProducts] = useState([]);

    const dispatch=useDispatch();
    const deleteStudent = async (name, id, link, price, description) => {
        const j=await dispatch(deleteproduct(name,id,link,price,description));
        if(Array.isArray(j)){
            setProducts(j);
        }
        else{
            console.log(j);
            alert("You don't have admin rights");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const j=await dispatch(getProduct());
                if(Array.isArray(j)){
                    setProducts(j);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        // console.log(products.length)
    }, [products.length])

    // console.log(products);

    return (
        <>
            <AddModal  setProducts={setProducts}/>
            <div className='container-fluid m-3'>
                {products.length === 0 ? <>
                    <div className='col-lg-8 d-flex align-items-center justify-content-center' style={{ marginTop: "20px", marginLeft: "126px" }}>
                        <div className='row'>
                            <div className='col-lg-8 ml-4 pl-4'><img className='d-flex align-items-center justify-content-center'
                                src="https://miniwhale.in/wp-content/uploads/2023/01/1-3.png"
                                alt="Your_Image_Alt_Text"
                                style={{ width: '100%', maxWidth: '400px', height: 'auto', marginLeft: "350px" }}
                            />
                                <h1 style={{ fontFamily: "monospace", marginLeft: "380px" }}>NO PRODUCTS TO SHOW</h1>
                                {(localStorage.getItem("role")===null || localStorage.getItem("role")==="Customer")?<></>:
                                <button id='addProduct'  className='btn btn-primary' style={{ padding: "20px" }} data-bs-toggle="modal" data-bs-target="#exampleModal">ADD PRODUCT</button>}
                            </div>
                        </div>
                    </div>
                </> :
                    <div className='row mx-auto flex justify-content-center '>
                        {
                            products.map((n) => {
                                return <EachProduct key={n.id} id={n.id} name={n.name} price={n.price} link={n.link} category={n.category} description={n.description} onDelete={deleteStudent} products={setProducts}></EachProduct>
                            })
                        }
                        <div className='container mt-0 mb-4 '>
                            <div className='col-lg-12 col-sm-11 d-flex align-items-center justify-content-center'>
                                {(localStorage.getItem("role")===null || localStorage.getItem("role")==="Customer")?<></>:
                                <button id='addProduct' className='btn btn-primary'  data-bs-toggle="modal" data-bs-target="#exampleModal">ADD PRODUCT</button>
                                }
                                {/* <div id='totalProducts'>Total Products - {products.length}</div> */}
                            </div></div>
                    </div>
                }
            </div>
        </>
    )
}