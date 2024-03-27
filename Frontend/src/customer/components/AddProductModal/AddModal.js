import { useState } from 'react';
import addproduct from '../../useCase/addproduct';

export default function AddModal(props){
    const {setProducts}=props
    const [product, setProduct] = useState({
        name: "", link: "", price: "", description: "", category: ""
    })
    const change = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value })
    }
    const click = async (e) => {
        e.preventDefault();
        try {
            const j = await addproduct(product.name, product.link, product.price, product.description, product.category)
            // console.log(j);
            setProduct({ name: "", price: "", link: "", description: "" })
            if(Array.isArray(j)){
                setProducts(j);
            }
            else{
                alert("Please Login - You Don't have Admin rights to add products");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    return (
        <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ zIndex: "9999" }}
            >
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: "black", color: "white" }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                    Add Product
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        onChange={change}
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        aria-describedby="emailHelp"
                                        value={product.name}
                                    // value={note.title}
                                    // value={value.title}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Category</label>
                                    <input
                                        onChange={change}
                                        type="text"
                                        className="form-control"
                                        id="category"
                                        name="category"
                                        aria-describedby="emailHelp"
                                        value={product.category}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input
                                        onChange={change}
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        name="price"
                                        value={product.price}
                                    // value={note.category}
                                    // value={value.category}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image Link</label>
                                    <input
                                        onChange={change}
                                        type="text"
                                        className="form-control"
                                        id="link"
                                        name="link"
                                        value={product.link}
                                    // value={note.category}
                                    // value={value.category}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <br />
                                    <textarea
                                        onChange={change}
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={product.description}
                                    // value={note.description}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={click} data-bs-dismiss="modal">
                                Add Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    )
}