import { useState } from 'react';
import { editProduct } from '../../../auth/Action';
import { useDispatch } from 'react-redux';
// import WarningAlert from '../WarningAlert/WarningAlert';

export default function EditModal(props){
    const {id,name,price,link,description,category,products}=props

    const dispatch=useDispatch();

    const [modalValues, setModalValues] = useState({
        id:id,
        name: name,
        price: price,
        link: link,
        description: description,category:category
    });
    const handleInputChange = (e) => {
        setModalValues({ ...modalValues, [e.target.name]: e.target.value });
    };
    const handleModalSubmit = async () => {
        const j=await dispatch(editProduct(modalValues.id,modalValues.name,modalValues.link,modalValues.price,modalValues.category,modalValues.description))

        if(Array.isArray(j)){
            products(j);
        }
        else{
            // setMessage("You don't have admin access");
            // setOpenWarningModal(true);
            // setTimeout(()=>{
            //     setOpenWarningModal(false);
            //     setHideWarningModal(true);
            // },1000);
            alert("You don't have admin access");
        }
    };
    return(
        <>
        <div
                className="modal fade"
                id={`exampleModal${id}`}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ zIndex: "9999" }}
            >
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: "black", color: "white" }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Update Product
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        onChange={handleInputChange}
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        aria-describedby="emailHelp"
                                        value={modalValues.name}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Category</label>
                                    <input
                                        onChange={handleInputChange}
                                        type="text"
                                        className="form-control"
                                        id="category"
                                        name="category"
                                        aria-describedby="emailHelp"
                                        value={modalValues.category}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input
                                        onChange={handleInputChange}
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        name="price"
                                        value={modalValues.price}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image Link</label>
                                    <input
                                        onChange={handleInputChange}
                                        type="text"
                                        className="form-control"
                                        id="link"
                                        name="link"
                                        value={modalValues.link}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <br />
                                    <textarea
                                        onChange={handleInputChange}
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={modalValues.description}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleModalSubmit} data-bs-dismiss="modal">
                                Update Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </>
    )
}