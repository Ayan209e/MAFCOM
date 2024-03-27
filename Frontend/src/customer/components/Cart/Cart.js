import { CartItem } from './CartItems';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCartProduct, deleteCartProduct, getCartProducts } from '../../../auth/Action';
import { Link } from 'react-router-dom';

const Cart = () => {



    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();
    const deleteProduct = async (id) => {
        const j = await dispatch(deleteCartProduct(id));
        if (Array.isArray(j)) {
            setProducts(j);
        }
        else {
            // console.log(j);
            alert("You don't have admin rights");
        }
    };

    const addProduct = async (id) => {
        const j = await dispatch(addCartProduct(id));
        if (Array.isArray(j)) {
            setProducts(j);
        }
        else {
            // console.log(j);
            alert("You don't have admin rights");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const j = await dispatch(getCartProducts());
                // console.log(j);
                if (Array.isArray(j)) {
                    setProducts(j);
                }


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    // useEffect(() => {
        
    //     })
    // },[])


    useEffect(() => {
        // console.log(products.length)
    }, [products.length])

    let total_cart=0;


    return (
        <div className="h-screen pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto max-w-6xl justify-space-between px-6 md:flex md:space-x-6 xl:px-0">


                {products.length===0 ? <>
                    <div className='col-lg-8 d-flex align-items-center justify-content-center' style={{ marginTop: "-30px", margin:"auto" }}>
                        <div className='row justify-content-center'>
                            <div className=' justify-content-center align-items-center'>
                                <img
                                    src="https://assets.materialup.com/uploads/ab4605f2-e16b-487b-9684-01756d71d244/ntta_m346_05.jpg"
                                    alt="Your_Image_Alt_Text"
                                    style={{ width: '100%', maxWidth: '800px', height: 'auto' }}
                                />
                                <Link to={"/"} ><button id='addProduct' className='btn btn-primary' style={{ padding: "30px" ,  margin:"auto"}} >ADD PRODUCT</button></Link>
                                
                            </div>
                        </div>
                    </div>
                </> :
                    <>
                        <div className="rounded-lg md:w-2/3 mx-[30px]">
                            {/* <CartItem></CartItem>
                            <CartItem></CartItem> */}
                            {
                                // <CartItem></CartItem>
                                products.map((n) => {
                                    total_cart=total_cart+n.total
                                    return <CartItem id={n.id} name={n.name} price={n.price} link={n.link} category={n.category} description={n.description} quantity={n.quantity} total={n.total} onDeleteCartItem={deleteProduct} onAddCartItem={addProduct}></CartItem>
                                })
                            }
                            {/* Second item block */}
                            {/* You can repeat the above structure for additional items */}
                        </div>


                        {/* Subtotal block */}
                        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                            <div className="mb-2 flex justify-between">
                                <p className="text-gray-700">Subtotal</p>
                                <p className="text-gray-700">Rs. {total_cart}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-700">Shipping</p>
                                <p className="text-gray-700">Rs. 100</p>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">Total</p>
                                <div className="">
                                    <p className="mb-1 text-lg font-bold">Rs. {total_cart+100}</p>
                                    <p className="text-sm text-gray-700">including VAT</p>
                                </div>
                            </div>
                            <button className="mt-6 w-full rounded-md bg-yellow-500 py-1.5 font-medium text-white hover:bg-yellow-600" >Check out</button>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default Cart;