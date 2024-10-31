import React, { useState, useEffect } from 'react'
import { Input, InputGroup, Loader, Placeholder } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import { Config } from '../../config/connection'
function CustomerPage() {
    const api = Config.urlApi;
  
    const [itemCustom, setItemCustom] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [isLoading, setIsLoading] = useState(true)
    const showCustom = async () => {
        try {
            const response = await fetch(api + 'customer/');
            const jsonData = await response.json();
            setItemCustom(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false)
        }
    };
    const Filter = (event) => {

    }

    const handleEdit = () => {

    }

    const handleDelete = (id) => {

    }
    const navigate = useNavigate();
    const handleView = (id) => {
        navigate('/view-cust?v='+btoa(id));
      };

    useEffect(() => {
        showCustom()
    })

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleLimitPage = (page) => {
        setItemsPerPage(page)
    }

    // Calculate the items to be displayed on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = itemCustom.slice(indexOfFirstItem, indexOfLastItem);
    const startEntry = indexOfFirstItem + 1;
    const endEntry = Math.min(indexOfLastItem, itemCustom.length);

    return (
        <div id="content" className="app-content p-0 bg-component">
            <div class="app-content-padding px-4 py-3">
                <ol className="breadcrumb float-end">
                    <li className="breadcrumb-item"><a href="javascript:;">ໜ້າຫຼັກ</a></li>
                    <li className="breadcrumb-item active">ລາຍການລູກຄ້າເຂົ້າມາພັກເຊົ່າ</li>
                </ol>
                <h1 className="page-header ">ຂໍ້ມູນລູກຄ້າ </h1>

                <div className="panel">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <div class="d-lg-flex align-items-center mb-n2 fs-14px">
                                <div class="d-lg-flex d-none align-items-center text-nowrap">
                                    ສະແດງ:
                                    <select onChange={(e) => handleLimitPage(e.target.value)} class="form-select form-select-sm ms-2 ps-2 pe-30px">
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                        <option value={200}>200</option>
                                        <option value={itemCustom.length}> ທັງໝົດ </option>
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
                                <Input block onChange={(e) => Filter(e)} placeholder='ຄົ້ນຫາ' style={{ width: 250 }} />
                            </InputGroup>
                        </div>

                    </div>
                    <div className="table-responsive">
                        <table class="table table-striped table-bordered align-middle text-nowrap">
                            <thead className='thead-bps'>
                                <tr>
                                    <th class="text-center" width="1%">ລ/ດ</th>
                                    <th class="text-center">ວັນທີ່ເຂົ້າ-ອອກ</th>
                                    <th class="text-center">ເບີຫ້ອງ</th>
                                    <th class="text-center">ຊື່ ແລະ ນາມສະກຸນ</th>
                                    <th class="">ເບໂທລະສັບ</th>
                                    <th class="text-center">ປະເພດລູກຄ້າ</th>
                                    <th class="">Email</th>
                                    <th class="text-center">ບັດປະຈຳຕົວ</th>
                                    <th class="text-center">ທີ່ຢູ່ປະຈຸບັນ</th>
                                    <th class="text-center">ສະຖານະ</th>
                                    <th class="text-center">ເອກະສານ</th>
                                    <th class="text-center">ຕັ້ງຄ່າ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading === true ? (
                                    <tr>
                                        <td colSpan={10} className='text-center'>
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
                                                    <td className='text-center'>{item.stauts_in_out === 1 ? (moment(item.rigist_date).format('DD/MM/YYYY')) : (moment(item.rigist_date).format('DD/MM/YYYY') - moment(item.date_in_out).format('DD/MM/YYYY'))}</td>
                                                    <td className='text-center'>{item.roomName}</td>
                                                    <td className=''><span role='button' onClick={()=>handleView(item.customer_id)}>{item.customer_name}</span> </td>
                                                    <td className=''>{item.customer_tel}</td>
                                                    <td className='text-center'>{item.type_cuts === 1 ? 'ຄົນລາວ' : 'ຄົນທາງຊາດ'}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.card_id}</td>
                                                    <td>{item.address}</td>
                                                    <td className='text-center'>{item.stauts_in_out === 1 ? (<span className=''><i class="fa-solid fa-caret-down text-green fs-4" /> ກຳລັງພັກເຊົ່າ</span>) : (<span className=''><i class="fa-solid fa-caret-up text-red fs-4" /> ຍ້າຍອອກແລ້ວ</span>)}</td>
                                                    <td className='text-center'>{item.file_doc !== '' && (<span role='button' className='text-blue'><i class="fa-solid fa-cloud-arrow-down" /></span>)}</td>
                                                    <td className='text-center'>
                                                    <a href="javascript:;" data-bs-toggle="dropdown" class="dropdown-toggle"><i class="fa-solid fa-ellipsis fs-4" /></a>
                                                        <div class="dropdown-menu dropdown-menu-end fs-15px">
                                                            <a href="javascript:;" class="dropdown-item text-green" onClick={() => handleEdit(item)}><i class="fa-solid fa-pen-to-square" /> ແກ້ໄຂຂໍ້ມູນ</a>
                                                            <a href="javascript:;" class="dropdown-item text-red" onClick={() => handleDelete(item.customer_id)}><i class="fa-solid fa-trash" /> ລົບຂໍ້ມູນ</a>
                                                            <a href="javascript:;" class="dropdown-item text-orange"><i class="fa-brands fa-telegram" /> ຍ້າຍຫ້ອງ</a>
                                                        </div>
                                                      </td>
                                                </tr>
                                            )}
                                        </>
                                    ) : (
                                        <tr>
                                            <td colSpan={12} className='text-center text-red'>ບໍ່ພົບຂໍ້ມູນທີ່ມີການບັນທຶກ</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div class="row mt-2 justify-content-between">
                        <div class="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto">
                            <div class="dt-info" role="status"> {`ກຳລັງສະແດງ ${startEntry} ຫາ ${endEntry} ຈາກທັງໝົດ ${itemCustom.length} ລາຍການ`}</div>
                        </div>
                        <div class="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto">
                            <div class="dt-paging">
                                <nav>
                                    <ul className="pagination">
                                        <li className={`dt-paging-button page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button className="page-link first" type="button" tabIndex="-1" onClick={() => handlePageChange(1)}><i class="fa-solid fa-angles-left" /></button>
                                        </li>
                                        <li className={`dt-paging-button page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button className="page-link previous" type="button" tabIndex="-1" onClick={() => handlePageChange(currentPage - 1)}><i class="fa-solid fa-angle-left" /></button>
                                        </li>
                                        {[...Array(Math.ceil(itemCustom.length / itemsPerPage)).keys()].map(number => (
                                            <li key={number + 1} className={`dt-paging-button page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                                                <button className="page-link" type="button" onClick={() => handlePageChange(number + 1)}>{number + 1}</button>
                                            </li>
                                        ))}
                                        <li className={`dt-paging-button page-item ${currentPage === Math.ceil(itemCustom.length / itemsPerPage) ? 'disabled' : ''}`}>
                                            <button className="page-link next" type="button" aria-label="Next" onClick={() => handlePageChange(currentPage + 1)}><i class="fa-solid fa-angle-right" /></button>
                                        </li>
                                        <li className={`dt-paging-button page-item ${currentPage === Math.ceil(itemCustom.length / itemsPerPage) ? 'disabled' : ''}`}>
                                            <button className="page-link last" type="button" aria-label="Last" onClick={() => handlePageChange(Math.ceil(itemCustom.length / itemsPerPage))}><i class="fa-solid fa-angles-right" /></button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerPage