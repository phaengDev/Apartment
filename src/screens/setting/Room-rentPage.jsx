import React, { useState, useEffect } from 'react'
import { Input, InputGroup, Placeholder, Loader, IconButton, Modal, Button, SelectPicker } from 'rsuite';
import axios from 'axios';
import { Config } from '../../config/connection';
import { Notification, Alert } from '../../utils/Notification';
import Swal from 'sweetalert2';
import { useTypes } from '../../config/select-option';
import FormAddRoom from './form-addRoom';
import numeral from 'numeral';
export default function RoomrentPage() {
    const api = Config.urlApi;
    const types = useTypes();
    const buildingId=localStorage.getItem('buildingId')
    const [open, setOpen] = React.useState(false);
    const handleOpen = (index) => {
        setOpen(index);
    }

const [isearch,setIsearch]=useState({
    buildingId_fk:buildingId,
    floorId_fk:'',
})
    const [itemData, setItemData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage,setItemsPerPage] =useState(25) ;
   

    const [item, setItem] = useState(null)
    const handleEdit = (item) => {
        setItem(item);
        setShowModal(true);
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "ຢືນຢັນ?",
            text: "ທ່ານຕ້ອງການລົບຂໍ້ມູນນີ້ແທ້ບໍ່!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ຕົກລົງ",
            cancelButtonColor: "#d33",
            cancelButtonText: "ບໍ່ລົບ",
            width: 350,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(api + `room/${id}`).then(function (resp) {
                    if (resp.status === 200) {
                        fetchRoom();
                        Alert.successData(resp.data.message);
                    }
                })
                    .catch((error) => {  // Fixed the syntax error here
                        Alert.errorData('ບໍ່ສາມາດລົບຂໍ້ມູນນີ້ໄດ້', error);
                    });
            }
        });
    }

    //================
    const [values, setValues] = useState({
        pricelist_id: '',
        room_id_fk: '',
        typeId: '',
        typePrice: '',
    })
    const [priceList, setPriceList] = useState([]);
    const viewPrice = (roomId, price) => {
        handleOpen(true);
        setPriceList(price)
        setValues({
            ...values, room_id_fk: roomId
        })
    }
    const handleEditPrice = (data) => {
        setValues({
            pricelist_id: data.pricelist_id,
            room_id_fk: data.room_id_fk,
            typeId: data.typeId,
            typePrice: data.typePrice,
        });
    }
    const handlePrice = (name, value) => {
        setValues({
            ...values, [name]: value
        })
    }

    const handleDelPrice = async (id) => {
        try {
            const res = await axios.delete(`${api}room/deletePrice/${id}`);
            if (res.status === 200) {
                Notification.success('ການລຶບຂໍ້ມູນສຳເລັດ', 'ແຈ້ງເຕືອນ');
                setPriceList(priceList.filter((price) => price.pricelist_id !== id));
            } else {
                Notification.error(res.data.message, 'ແຈ້ງເຕືອນ');
            }
        } catch (error) {
            console.error('Error while deleting data:', error);
            Notification.error('ການລຶບຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
        }
    }

    const handleAddPrice = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(api + 'room/addprice', values);
            if (res.status === 200) {
                Notification.success('ການບັນທຶກຂໍ້ມູນສຳເລັດ', 'ແຈ້ງເຕືອນ');
                console.log(res.data.room_id_fk)
                fetchPrice(res.data.room_id_fk)
                setValues({
                    ...values,
                    pricelist_id: '',
                    typeId: '',
                    typePrice: '',
                })
            } else {
                Notification.error(res.data.message, 'ແຈ້ງເຕືອນ');
            }
        } catch (error) {
            console.error('Error while saving data:', error);
            Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
        }
    }


    const fetchPrice = async (id) => {
        try {
            const response = await fetch(api + 'room/price/' + id);
            const jsonData = await response.json();
            setPriceList(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    //===============

    const [showModal, setShowModal] = useState(false);
    const handleNew = () => {
        setShowModal(true);
        setItem(null);
    };
    const handleClose = () => setShowModal(false);
    useEffect(() => {
        fetchRoom()
    }, [isearch])

    const fetchRoom = async () => {
        try {
            const response = await axios.post(api + 'room/', isearch);
            const jsonData = response.data;
            setItemData(jsonData);
            setFilter(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const Filter = (event) => {
        setItemData(filter.filter(n => n.roomName.toLowerCase().includes(event)))
    }


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleLimitPage=(page)=>{
        setItemsPerPage(page)
    }

    // Calculate the items to be displayed on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = itemData.slice(indexOfFirstItem, indexOfLastItem);
    const startEntry = indexOfFirstItem + 1;
    const endEntry = Math.min(indexOfLastItem, itemData.length);

    return (
        <div id="content" className="app-content">
            <ol className="breadcrumb float-end">
                <li className="breadcrumb-item"><a href="javascript:;">ໜ້າຫຼັກ</a></li>
                <li className="breadcrumb-item active">ລາຍການຫ້ອງເຊົ່າ</li>
            </ol>
            <h1 className="page-header flex-grow-1">ຂໍ້ມູນຫ້ອງ </h1>
            <div className="row">
                <div className={'col-sm-12 col-lg-12'}>
                    <div class="panel">
                        <div class="panel-heading bg-white  ui-sortable-handle">
                            <h3 class="panel-title fs-18px">ລາຍການຫ້ອງເຊົ່າ</h3>
                            <div class="panel-heading-btn">
                                <button type='button' onClick={() => handleNew(true)} class="btn btn-bps fs-14px" ><i class="fas fa-plus" /> ເພີ່ມຂໍ້ມູນ</button>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div className="table-responsive">
                                <div class="panel-heading">
                                    <div class="panel-title">
                                        <div class="d-lg-flex align-items-center mb-n2 fs-14px">
                                            <div class="d-lg-flex d-none align-items-center text-nowrap">
                                                ສະແດງ:
                                                <select value={itemsPerPage} onChange={(e)=>handleLimitPage(e.target.value)} class="form-select form-select-sm ms-2 ps-2 pe-30px">
                                                    <option values={10}>10</option>
                                                    <option value={25}>25</option>
                                                    <option value={50}>50</option>
                                                    <option value={100}>100</option>
                                                    <option value={itemData.length}>- ທັງໝົດ -</option>
                                                </select>
                                            </div>
                                            <div class="d-lg-block d-none ms-2 text-body text-opacity-50">
                                                ລາຍການ
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel-heading-btn">
                                        <InputGroup inside>
                                            <InputGroup.Addon><i className='fas fa-search' /></InputGroup.Addon>
                                            <Input block onChange={(e) => Filter(e)} placeholder='ຄົ້ນຫາ' />
                                        </InputGroup>
                                    </div>

                                </div>
                                <table class="table table-striped table-bordered align-middle text-nowrap">
                                    <thead className='thead-bps'>
                                        <tr>
                                            <th class="text-center" width="1%">ລ/ດ</th>
                                            <th class="text-center">ລະຫັດ</th>
                                            <th class="text-center">ເບີຫ້ອງ</th>
                                            <th class="">ຊັ້ນ</th>
                                            <th class="text-end">ລາຄາຫ້ອງ</th>
                                            <th class="">ລາຍລະອຽດ</th>
                                            <th class="text-center">ສະຖານະຫ້ອງ</th>
                                            <th class="text-center">ປະເພດລາຄາ</th>
                                            <th class="text-center">ສະຖານະ</th>
                                            <th class="text-center">ຕັ້ງຄ່າ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading === true ? (
                                            <tr>
                                                <td colSpan={9} className='text-center'>
                                                    <Placeholder.Grid rows={5} columns={6} active />
                                                    <Loader size='lg' center content="ກຳລັງໂຫລດ..." />
                                                </td>
                                            </tr>
                                        ) : (
                                            currentItems.length > 0 ? (
                                                <>
                                                    {currentItems.map((item, index) =>
                                                        <tr>
                                                            <td className='text-center'>{index + 1}</td>
                                                            <td className='text-center'>{item.roomCode}</td>
                                                            <td className='text-center'>{item.roomName}</td>
                                                            <td>{item.floorName}</td>
                                                            <td className='text-end'>{numeral(item.priceRoom).format('0,00')} kip</td>
                                                            <td>{item.roomDetail}</td>
                                                            <td className='text-center'>{item.statusUse === 1 ?'ຫ້ອງຫວ່າງ':(<span className='text-green' role='button'><i class="fa-solid fa-check"/> ເປິດເຊົ່າແລ້ວ</span>)}</td>
                                                            <td className='text-center'><span class="badge bg-primary fs-12px" onClick={() => viewPrice(item.roomRent_id, item.priceList)} role='button'><i class="fa-solid fa-tags"></i> {item.priceList.length} ລາຄາ</span> </td>
                                                            <td className={`text-center ${item.status === 1 ? 'text-blue' : 'text-red'}`}>{item.status === 1 ? 'ພ້ອມໃຊ້ງານ' : 'ປິດໃຊ້ງານ'}</td>
                                                            <td className='text-center'>
                                                                <IconButton size='xs' color="blue" onClick={() => handleEdit(item)} appearance="primary" className='me-1' icon={<i class="fa-solid fa-pen-to-square" />} />
                                                                <IconButton size='xs' color="red" onClick={() => handleDelete(item.roomRent_id)} appearance="primary" icon={<i class="fa-solid fa-trash" />} />
                                                            </td>
                                                        </tr>
                                                    )}
                                                </>
                                            ) : (
                                                <tr>
                                                    <td colSpan={10} className='text-center text-red'>ບໍ່ພົບຂໍ້ມູນທີ່ມີການບັນທຶກ</td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div class="row mt-2 justify-content-between">
                                <div class="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto">
                                    <div class="dt-info" role="status"> {`ກຳລັງສະແດງ ${startEntry} ຫາ ${endEntry} ຈາກທັງໝົດ ${itemData.length} ລາຍການ`}</div>
                                </div>
                                <div class="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto">
                                    <div class="dt-paging">
                                        <nav>
                                            <ul className="pagination">
                                                <li className={`dt-paging-button page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                    <button className="page-link first" type="button" tabIndex="-1" onClick={() => handlePageChange(1)}><i class="fa-solid fa-angles-left"/></button>
                                                </li>
                                                <li className={`dt-paging-button page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                    <button className="page-link previous" type="button" tabIndex="-1" onClick={() => handlePageChange(currentPage - 1)}><i class="fa-solid fa-angle-left"/></button>
                                                </li>
                                                {[...Array(Math.ceil(itemData.length / itemsPerPage)).keys()].map(number => (
                                                    <li key={number + 1} className={`dt-paging-button page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                                                        <button className="page-link" type="button" onClick={() => handlePageChange(number + 1)}>{number + 1}</button>
                                                    </li>
                                                ))}
                                                <li className={`dt-paging-button page-item ${currentPage === Math.ceil(itemData.length / itemsPerPage) ? 'disabled' : ''}`}>
                                                    <button className="page-link next" type="button" aria-label="Next" onClick={() => handlePageChange(currentPage + 1)}><i class="fa-solid fa-angle-right"/></button>
                                                </li>
                                                <li className={`dt-paging-button page-item ${currentPage === Math.ceil(itemData.length / itemsPerPage) ? 'disabled' : ''}`}>
                                                    <button className="page-link last" type="button" aria-label="Last" onClick={() => handlePageChange(Math.ceil(itemData.length / itemsPerPage))}><i class="fa-solid fa-angles-right"/></button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FormAddRoom
                open={showModal}
                handleClose={handleClose}
                fetchRoom={fetchRoom}
                item={item} />

            <Modal open={open} onClose={() => handleOpen(false)}>
                <Modal.Header>
                    <Modal.Title>ຕົວເລືອກລາຄາ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleAddPrice}>
                        <div className="row mb-3">
                            <div className="col-sm-5">
                                <label htmlFor="" className='form-label'>ປະເພດເຊົ່າ</label>
                                <SelectPicker data={types} value={values.typeId} onChange={(e) => handlePrice('typeId', e)} required block />
                            </div>
                            <div className="col-sm-5">
                                <label htmlFor="" className='form-label'>ລາຄາ</label>
                                <Input value={numeral(values.typePrice).format('0,00')} onChange={(e) => handlePrice('typePrice', e)} required />
                            </div>
                            <div className="col-sm-2 mt-4">
                                <Button type='submit' appearance="primary">ເພີ່ມ</Button>
                            </div>
                        </div>
                    </form>
                    <table class="table table-striped table-bordered align-middle text-nowrap">
                        <thead className='thead-bps'>
                            <tr>
                                <th class="text-center" width="1%">ລ/ດ</th>
                                <th class="">ປະເພດເຊົ່າ</th>
                                <th class="text-end">ລາຄາ</th>
                                <th class="text-center" width='5%'>ຕັ້ງຄ່າ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {priceList.map((item, key) =>
                                <tr key={item.pricelist_id}>
                                    <td className='text-center'>{key + 1}</td>
                                    <td>{item.typesName}</td>
                                    <td className='text-end'>{numeral(item.typePrice).format('0,00')}</td>
                                    <td className='text-center'>
                                        <IconButton size='xs' color="blue" onClick={() => handleEditPrice(item)} appearance="primary" className='me-1' icon={<i class="fa-solid fa-pen-to-square" />} />
                                        <IconButton size='xs' color="red" onClick={() => handleDelPrice(item.pricelist_id)} appearance="primary" icon={<i class="fa-solid fa-trash" />} />
                                    </td>
                                </tr>
                            )}
                            <tr>

                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </div>
    )
}
