import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Input } from 'rsuite';
import { Config, Urlimage } from '../../config/connection';

const ModalSetpos = ({id, itemData, show, handleClose }) => {
    const url = Urlimage.url;
    const [valueName, setValueName] = useState("");
    const [filterDate, setFilterDate] = useState([]);
    const [cart, setCart] = useState([]);
    const [inputs, setInputs] = useState({product_id:id, datalist: [] });
    const [showQtyModal, setShowQtyModal] = useState(false);
    const [qty, setQty] = useState(0);
    const [currentProductId, setCurrentProductId] = useState(null);

    const handleInputChange = (value) => {
        setValueName(value);
        if (value) {
            setFilterDate(itemData.filter(n =>
                n.product_name.toLowerCase().includes(value.toLowerCase()) ||
                n.product_code.toLowerCase().includes(value.toLowerCase())
            ));
        } else {
            setFilterDate([]);
        }
    };

    const addToCart = (product) => {
        setFilterDate([]);
        setValueName('');

        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.product_id === product.product_id);
            if (existingProduct) {
                alert('Warning: This product is already in the cart.');
                return prevCart;
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });

        setInputs((prevInputs) => {
            const updatedDataList = [
                ...prevInputs.datalist.filter(item => item.product_id !== product.product_id),
                { product_id: product.product_id, quantity: 1 }
            ];
            return { ...prevInputs, datalist: updatedDataList };
        });
    };

    const removeFromCart = (product) => {
        setCart((prevCart) => prevCart.filter(item => item.product_id !== product.product_id));
        setInputs((prevInputs) => {
            const updatedDataList = prevInputs.datalist.filter(item => item.product_id !== product.product_id);
            return { ...prevInputs, datalist: updatedDataList };
        });
    };

    const handleKey = (value) => {
        setQty(prevQty => (prevQty === 0) ? value : parseFloat(prevQty.toString() + value.toString()));
    };

    const handleClear = () => {
        setQty(0);
    };

    const handleDeleteText = () => {
        setQty(prevQty => {
            const newQty = prevQty.toString().slice(0, -1);
            return newQty.length > 0 ? parseFloat(newQty) : 0;
        });
    };

    const handleUseQty = () => {
        setShowQtyModal(false);
        setCart((prevCart) =>
            prevCart.map(item =>
                item.product_id === currentProductId ? { ...item, quantity: parseFloat(qty) } : item
            )
        );
        setInputs((prevInputs) => {
            const updatedDataList = [
                ...prevInputs.datalist.filter(item => item.product_id !== currentProductId),
                { product_id: currentProductId, quantity: parseFloat(qty) }
            ];
            return { ...prevInputs, datalist: updatedDataList };
        });
        setQty(0);
        setCurrentProductId(null);
    };

    const addQuantity = (id) => {
        setCurrentProductId(id);
        setShowQtyModal(true);
        const product = cart.find(item => item.product_id === id);
        setQty(product.quantity);
    };

    const handleSubmitSetps = (event) => {
        event.preventDefault();
        // Implement the form submission logic here
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ຈັນເຊັດສິນຄ້າ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmitSetps}>
                        <div className="form-group">
                            <label htmlFor="" className='form-label'>ເລືອກລາຍການສິນຄ້າ</label>
                            <Input 
                                block 
                                value={valueName} 
                                onChange={(e) => handleInputChange(e)} 
                                placeholder='ເລືອກສິນຄ້າ' 
                            />
                            {filterDate.length > 0 ? (
                                <ul className="autocomplete-suggestions">
                                    {filterDate.map((item, index) => (
                                        <li key={index} onClick={() => addToCart(item)} className="autocomplete-suggestion">
                                            {item.product_name}
                                            <div>{item.product_code}</div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                valueName && (
                                    <div className="text-center">
                                        <img src="./assets/img/icon/ic_no_result.svg" className='w-150px' alt="No results" />
                                    </div>
                                )
                            )}
                        </div>
                        <div className="table-responsive mt-3">
                            <table className='table text-nowrap'>
                                <thead>
                                    <tr>
                                        <th width='1%'>ລ/ດ</th>
                                        <th colSpan={2}>ລາຍການ</th>
                                        <th width='20%'>ອັດຕາສ່ວນ</th>
                                        <th width='5%' className='text-center'>ຈັດການ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item, index) => (
                                        <tr key={item.product_id}>
                                            <td className='text-center'>{index + 1}</td>
                                            <td width={'1%'} className='text-center'>
                                                <img src={item.imgPos === '' ? '/assets/img/icon/picture.jpg' : `${url}pos/${item.imgPos}`} className="rounded h-30px" alt="product" />
                                            </td>
                                            <td>{item.product_name}</td>
                                            <td>
                                                <Input 
                                                    type='number' 
                                                    value={item.quantity} 
                                                    onClick={() => addQuantity(item.product_id)}
                                                    size='sm' 
                                                    block 
                                                    readOnly 
                                                />
                                            </td>
                                            <td className='text-center'>
                                                <span role='button' onClick={() => removeFromCart(item)} className='text-red'>
                                                    <i className="fa-solid fa-trash"></i>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal size="sm" show={showQtyModal} onHide={() => setShowQtyModal(false)}>
                <Modal.Body className='calculator'>
                    <div className="screen">
                        <span className='float-start' onClick={handleClear} role='button'><i className="fa-solid fa-circle-xmark"></i></span> 
                        <span id="result">{qty}</span>
                    </div>
                    <div className="cal-buttons">
                        <table width={'100%'} id="buttons">
                            <tbody>
                                <tr>
                                    <td onClick={() => handleKey(7)}>7</td>
                                    <td onClick={() => handleKey(8)}>8</td>
                                    <td onClick={() => handleKey(9)}>9</td>
                                </tr>
                                <tr>
                                    <td onClick={() => handleKey(4)}>4</td>
                                    <td onClick={() => handleKey(5)}>5</td>
                                    <td onClick={() => handleKey(6)}>6</td>
                                </tr>
                                <tr>
                                    <td onClick={() => handleKey(3)}>3</td>
                                    <td onClick={() => handleKey(2)}>2</td>
                                    <td onClick={() => handleKey(1)}>1</td>
                                </tr>
                                <tr>
                                    <td onClick={() => handleKey(0)}>0</td>
                                    <td onClick={handleUseQty} className='bg-green'>ok</td>
                                    <td onClick={handleDeleteText} className='bg-red-400'><i className="fa-solid fa-delete-left"></i></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalSetpos;
