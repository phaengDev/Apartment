import React, { useState, useEffect } from 'react'
import { Button, Input, InputGroup, InputPicker, Modal } from 'rsuite';
import { Config } from '../../config/connection';
import axios from 'axios';
export default function AddToStock() {
    const api = Config.urlApi;
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const branch_id_fk = localStorage.getItem('branch_Id');
    const shop_id_fk = localStorage.getItem('shop_id_fk');
    const type = [
        { label: 'ຄົ້ນຫາສິນຄ້າ', value: '1' },
        { label: 'ເລືອກຫຼາຍສິນຄ້າ', value: '2' },
        { label: 'ສະແກນບາໂຄດ', value: '3' },
        { label: 'ເລີ່ມໃໝ່', value: '4' },
    ]
    const [useAdd, setUseAdd] = useState('1')
    const handleCheck = (index) => {
        setUseAdd(index)
        if (index === '2') {
            setOpen(true);
        }
    }
    const [values, setValues] = useState({
        productName: '',
        branch_id_fk: branch_id_fk,
        shop_id_fk: shop_id_fk
    });

    const [itemData, setItemData] = useState([]);
    const fetchDataPos = async () => {
        try {
            const response = await axios.post(api + 'actionps/fetch', values);
            const jsonData = response.data;
            setItemData(jsonData);
            console.log(jsonData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleChengePorduct = (name, event) => {
        setValues({
            ...values, [name]: event
        })
    }
    const addToCart = () => {

    }

    useEffect(() => {
        fetchDataPos()
       if(!values.productName){
        setItemData([]);
       }
    }, [values])
    return (
        <div id="content" class="app-content p-0 bg-component">
            <div class="app-content-padding  px-4 py-3">
                <div class="d-lg-flex mb-lg-3 row mb-2">
                    <div class="col-sm-3 col-4 page-header mb-2 ">
                        <InputPicker block data={type} onChange={(e) => handleCheck(e)} defaultValue={'1'} />
                    </div>
                    <div class="col-sm-6 col-8  mb-2 ">
                        {useAdd === '3' ? (
                            <Input block placeholder='|||||||||||||||||' className='fs-16px text-center' />
                        ) : (
                            <InputGroup inside>
                                <InputGroup.Addon><i className='fas fa-search' /> </InputGroup.Addon>
                                <Input block onChange={(e) => handleChengePorduct('productName', e)} placeholder='ຊື່ສິນຄ້າ/ລະຫັດສິນຄ້າ' className='fs-16px' />

                            </InputGroup>)}
                        {itemData.length > 0 ? (
                            <div class="dropdown-menu show  w-40 dropdown-menu-end" data-scrollbar="true">
                                {itemData.map((item, index) => (
                                    <>
                                <button onClick={() => addToCart(item)} class="dropdown-item">
                                {item.product_name}
                                <div>{item.product_code}</div>
                                </button>
                                {/* <div class="dropdown-divider"></div> */}
                                </>
                             ))}
                            </div>
                        ) : (
                            values.productName && (
                                <div class="dropdown-menu show text-center w-40 dropdown-menu-end">
                                    <img src="./assets/img/icon/ic_no_result.svg" className='w-150px' alt="No results" />
                                </div>
                            )
                        )}
                       
                    </div>
                    <div class="col-sm-2 ">
                        <Button color="blue" appearance="primary" startIcon={<i className='fas fa-check' />}> ຢືນຢັນ</Button>
                    </div>
                </div>
            </div>
            <div className="p-3 pt-1">
                <div className="table-responsive">
                    <table class="table table-sm table-striped table-bordered align-middle text-nowrap">
                        <thead className='thead-bps'>
                            <tr className=' py-3'>
                                <th class="text-center" width="1%">#</th>
                                <th class="text-center" width="1%">ລ/ດ</th>
                                <th class="text-center">ລະຫັດ</th>
                                <th class="">ຊື່ສິ້ນຄ້າ</th>
                                <th class="text-end" width='20%'>ລາຄາຂາຍ</th>
                                <th class="text-center" width='15%'>ສ່ວນຫຼຸດ</th>
                                <th class="text-center" width='10%'>ຈຳນວນ</th>
                                <th class="text-center" width='5%'>ສະຖານະ</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            <tr className=''>
                                <td><button type='buttpm' className='btn btn-xs text-red'><i class="fa-solid fa-trash"></i></button></td>
                                <td><input class="form-check-input" type="checkbox" id="checkbox1" /></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <InputGroup inside size="sm" >
                                        <Input block placeholder='0' />
                                        <InputGroup.Addon>dd </InputGroup.Addon>
                                    </InputGroup>
                                </td>
                                <td>
                                    <InputGroup inside size="sm" >
                                        <Input block placeholder='0' />
                                        <InputGroup.Addon>dd </InputGroup.Addon>
                                    </InputGroup>
                                </td>
                                <td>
                                    <InputGroup inside size="sm" >
                                        <Input block placeholder='0' />
                                        <InputGroup.Addon>dd </InputGroup.Addon>
                                    </InputGroup>
                                </td>
                                <td className='text-center'>
                                    <div className="form-check form-switch text-center">
                                        <input class="form-check-input" type="checkbox" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal overflow={true} open={open} size={'lg'} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="primary">
                        Ok
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}
