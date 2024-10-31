import React, { useState, useEffect } from 'react'
import { Input, InputGroup, Button, SelectPicker, Placeholder, Loader, InputPicker } from 'rsuite';
import axios from 'axios';
import { Notification, Alert } from '../../utils/Notification';
import { Config, Urlimage } from '../../config/connection';
import Swal from 'sweetalert2';
import numeral from 'numeral';
import '../../Calculator.css';
import Modal from 'react-bootstrap/Modal';
import ModalSetpos from './Modal-setpos';
export default function RegitsPorducts() {
    const api = Config.urlApi;
    const url = Urlimage.url;
    const [dataNew, setDataNew] = useState(false);
    const shopId = localStorage.getItem('shop_id_fk');
    const openForm = (index) => {
        setDataNew(index)
        if (index) {
            setInputs({
                productId: '',
                shop_id_fk: shopId,
                imgPos: '',
                product_name: '',
                barcode: '',
                brands_id_fk: '',
                units_id_fk: '',
                price_buy: '0',
                price_sale: '0',
                stt_discout: '0',
                discount_sale: '0',
                status_stock: 1,
                qty_alert: '5',
                statusUse: '1',
                categories_id_fk: '',
            })
            setImageUrl('/assets/img/icon/picture.jpg')
        }
    }

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('/assets/img/icon/picture.jpg');
    const itemUnit = [];
    const itemCate = [];

    const stock = [{
        label: 'ຕັດສະຕ໋ອກ', value: 1
    }, {
        label: 'ບໍ່ສຳກັດ', value: 2
    }]

    const handleQrChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setInputs({
                ...inputs, imgPos: file
            })
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleClearImage = () => {
        setSelectedFile(null);
        setImageUrl('/assets/img/icon/picture.jpg')
        document.getElementById('fileInput').value = '';
        setInputs({
            ...inputs, imgPos: ''
        })
    };


    const [inputs, setInputs] = useState({
        productId: '',
        shop_id_fk: shopId,
        imgPos: '',
        product_name: '',
        barcode: '',
        brands_id_fk: '',
        units_id_fk: '',
        price_buy: '0',
        price_sale: '0',
        stt_discout: '0',
        discount_sale: '0',
        status_stock: 1,
        qty_alert: '5',
        statusUse: '1',
        categories_id_fk: '',
    })
    const handleChange = (name, value) => {
        setInputs({
            ...inputs, [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const inputData = new FormData();
        for (const key in inputs) {
            inputData.append(key, inputs[key]);
        }
        // console.log(inputs)
        try {
            const res = await axios.post(api + 'product/create', inputData);
            if (res.status === 200) {
                console.log(res.data)
                if (res.status === 200) {
                    fetchProducts()
                    setDataNew(false);
                    setInputs({
                        productId: '',
                        shop_id_fk: shopId,
                        imgPos: '',
                        product_name: '',
                        barcode: '',
                        brands_id_fk: '',
                        units_id_fk: '',
                        price_buy: '0',
                        price_sale: '0',
                        stt_discout: '0',
                        discount_sale: '0',
                        status_stock: 1,
                        qty_alert: '5',
                        statusUse: '1',
                        categories_id_fk: '',
                    })
                    Notification.success('ການບັນທຶກຂໍ້ມູນສຳເລັດ', 'ແຈ້ງເຕືອນ');
                } else {
                    Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
                }
            }
        } catch (error) {
            Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
        }
    }


    const [query, setQuery] = useState({
        shopId_fk: shopId,
        categories_id_fk: '',
        brands_id_fk: '',
        units_id_fk: '',
    })
    const handleShearch = (naem, value) => {
        setQuery({
            ...query, [naem]: value
        })
    }

    const [isLoading, setLoading] = useState(true);
    const [itemData, setItemData] = useState([]);
    const [filter, setFilter] = useState([]);
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.post(api + 'porduct/', query);
            setItemData(response.data);
            setFilter(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (event) => {
        setItemData(filter.filter(n =>
            n.product_name.toLowerCase().includes(event) ||
            n.product_code.toLowerCase().includes(event)
        ));
    }



    const handleEdit = (item) => {
        setInputs({
            productId: item.product_id,
            shop_id_fk: shopId,
            imgPos: '',
            product_name: item.product_name,
            barcode: item.barcode,
            brands_id_fk: item.brands_id_fk,
            units_id_fk: item.units_id_fk,
            price_buy: item.price_buy,
            price_sale: item.price_sale,
            stt_discout: item.stt_discout,
            discount_sale: item.discount_sale,
            status_stock: item.status_stock,
            qty_alert: item.qty_alert,
            statusUse: item.statusUse,
            categories_id_fk: item.categories_id_fk
        });
        handleShowCart(item.categories_id_fk);
        setDataNew(true);
        if (item.imgPos) {
            setImageUrl(url + 'pos/' + item.imgPos)
        }

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
                axios.delete(api + `porduct/${id}`).then(function (resp) {
                    if (resp.status === 200) {
                        fetchProducts();
                        Alert.successData(resp.data.message);
                    }
                })
                    .catch((error) => {
                        Alert.errorData('ບໍ່ສາມາດລົບຂໍ້ມູນນີ້ໄດ້', error);
                    });
            }
        });
    }

    //===============
    const [isDiscountShown, setIsDiscountShown] = useState(false);
    const [isBarcodeShown, setIsBarcodeShown] = useState(false);
    const [isNotificShown, setIsNotificShown] = useState(true);

    // Handle toggle for Discount panel
    const handleOpenDiscount = () => {
        setIsDiscountShown(!isDiscountShown);
    };

    // Handle toggle for Barcode panel
    const handleOpenBarcode = () => {
        setIsBarcodeShown(!isBarcodeShown);
    };
    // Handle toggle for product panel
    const handleOpenNotific = () => {
        setIsNotificShown(!isNotificShown);
    };


    //===========================
    const [itemBrand, setItemBrand] = useState([]);
    const handleShowCart = async (value) => {
        try {
            const response = await fetch(api + 'brand/cate/' + value);
            const jsonData = await response.json();
            setItemBrand(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const dataBrand = itemBrand.map(item => ({ label: item.brand_name, value: item.brand_id }));

    //================ use Optio ===========
    const [option, setOption] = useState(false)
    const handleOpenOptpion = (val, index) => {
        setOption(index);
        showOption(val);
        setValues({
            ...values, product_id_fk: val
        })

    }
    const [values, setValues] = useState({
        optionId: '',
        option_name: '',
        option_price: 0,
        product_id_fk: '',
    })
    const handleOption = (name, value) => {
        setValues({
            ...values, [name]: value
        })
    }
    const handleSubmitOpiton = async (event) => {
        event.preventDefault();
        try {
            axios.post(api + 'porduct/addOpton', values)
                .then(function (res) {
                    if (res.status === 200) {
                        showOption(res.data.id)
                        Notification.success('ການບັນທຶກຂໍ້ມູນສຳເລັດ', 'ແຈ້ງເຕືອນ');
                        setValues({
                            optionId: '',
                            option_name: '',
                            option_price: 0,
                            product_id_fk: res.data.id,
                        })
                    }
                })
        } catch (error) {
            Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
        }
    }


    const editOption = (item) => {
        setValues({
            optionId: item.option_id,
            option_name: item.option_name,
            option_price: item.option_price,
            product_id_fk: item.product_id_fk,
        })
    }
    const handleOffOn = async (productId, currentStatus) => {
        const newStatus = currentStatus === 1 ? 2 : 1;
        try {
            const response = await axios.post(api + 'porduct/offOn/', { productId, statusUse: newStatus });
            if (response.status === 200) {
                // fetchProducts();
                setItemData(prevItemData =>
                    prevItemData.map(item =>
                        item.product_id === productId ? { ...item, statusUse: newStatus } : item
                    )
                );
                Notification.success('ການດຳເນິນງານສຳເລັດ', 'ແຈ້ງເຕືອນ');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            Notification.error('ການດຳເນິນງານບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
        }
    };

    //========= delete option ==============
    const deleteOpiton = async (id, idPs) => {
        axios.delete(api + `porduct/delop/${id}`).then(function (resp) {
            if (resp.status === 200) {
                showOption(idPs);
                Notification.success('ລົບຂໍ້ມູນສຳເລັດ', 'ແຈ້ງເຕືອນ');
            }
        }).catch((error) => {
            Notification.error('ລົບຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
        })
    }
    //========== fetch opiton===========

    const [itemOption, setItemOption] = useState([]);
    const showOption = async (id) => {
        try {
            const response = await axios.get(api + 'porduct/showpt/' + id);
            setItemOption(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };
    //=============================
    const [posId, setPosId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const handleOpenSetps = (id) => {
        setPosId(id)
        setShowModal(true);
    };
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <div id="content" className="app-content p-2 ">
            <ol className="breadcrumb float-end">
                <li className="breadcrumb-item"><a href="javascript:;">ໜ້າຫຼັກ</a></li>
                <li className="breadcrumb-item active">ລາຍການສິນຄ້າທັງໝົດ</li>
            </ol>
            <h1 className="page-header ">ຂໍ້ມູນສິນຄ້າ </h1>
            <div className="row">
                <div className={dataNew === true ? 'col-sm-8 col-lg-7' : 'col-sm-12 col-lg-12'}>
                    <div class="panel ">
                        <div class="panel-heading bg-white  ui-sortable-handle">
                            <h3 class="panel-title fs-18px">ລາຍການສິນຄ້າທັງໝົດ</h3>
                            {!dataNew && (
                                <div class="panel-heading-btn">
                                    <button type='button' onClick={() => openForm(true)} class="btn btn-bps fs-14px" ><i class="fas fa-plus" /> ເພີ່ມຂໍ້ມູນ</button>
                                </div>
                            )}
                        </div>
                        <div class="panel-body">
                            <div className="row mb-3">
                                <div className="col-sm-4 col-lg-3">
                                    <label htmlFor="" className='form-label'>ໝວດໝູ່ສິນຄ້າ</label>
                                    <SelectPicker data={itemCate} onChange={(e) => handleShearch('categories_id_fk', e)} block />
                                </div>
                                <div className="col-sm-4 col-lg-3 col-6">
                                    <label htmlFor="" className='form-label'>ປະເພດ / ຍີ່ຫໍ້</label>
                                    <SelectPicker onChange={(e) => handleShearch('brands_id_fk', e)} block />
                                </div>
                                <div className="col-sm-4 col-lg-2  col-6">
                                    <label htmlFor="" className='form-label'>ຫົວໜ່ວຍ</label>
                                    <SelectPicker data={itemUnit} onChange={(e) => handleShearch('units_id_fk', e)} block />
                                </div>
                                <div className="col-sm-3 col-lg-3 col-10">
                                    <label htmlFor="" className='form-label'>ຄົ້ນຫາ</label>
                                    <InputGroup inside >
                                        <InputGroup.Addon><i className="fas fa-search" /> </InputGroup.Addon>
                                        <Input block onChange={(e) => handleFilter(e)} placeholder='ຄົ້ນຫາ / ຊື່ສິ້ນຄ້າ/ລະຫັດ' />
                                    </InputGroup>
                                </div>
                                <div className="col-2 col-sm-1 mt-4">
                                    <Button appearance="primary" className='btn-add dropdown-toggle' data-bs-toggle="dropdown"><i class="fa-solid fa-grip fs-3"></i></Button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a href="javascript:;" class="dropdown-item">Action 1</a>
                                        <a href="javascript:;" class="dropdown-item">Action 2</a>
                                        <a href="javascript:;" class="dropdown-item">Action 3</a>
                                        <div class="dropdown-divider"></div>
                                        <a href="javascript:;" class="dropdown-item">Action 4</a>
                                    </div>
                                </div>
                            </div>

                            <div class="d-lg-flex align-items-center mb-2">
                                <div class="d-lg-flex d-none align-items-center text-nowrap">
                                    ສະແດງ:
                                    <select class="form-select form-select-sm ms-2 ">
                                        <option>100</option>
                                        <option>250</option>
                                        <option >000</option>
                                    </select>
                                </div>
                                <div class="d-lg-block d-none ms-2 text-body text-opacity-50">
                                    1,495 ລາຍການ
                                </div>
                                <ul class="pagination mb-0 ms-auto justify-content-center">
                                    <li class="page-item d-lg-block d-none2 disabled"><a class="page-link">Previous</a></li>
                                    <li class="page-item d-lg-block d-none2"><a class="page-link" href="#">1</a></li>
                                    <li class="page-item d-lg-block d-none2 active"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item d-lg-block d-none2"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item d-lg-block d-none2"><a class="page-link" href="#">4</a></li>
                                    <li class="page-item d-lg-block d-none2"><a class="page-link" href="#">5</a></li>
                                    <li class="page-item d-lg-block d-none2"><a class="page-link" href="#">6</a></li>
                                    <li class="page-item d-lg-block d-none2"><a class="page-link" href="#">Next</a></li>
                                </ul>
                            </div>
                            <div className="table-responsive">
                                <table class="table table-striped table-bordered align-middle text-nowrap">
                                    <thead className='thead-bps'>
                                        <tr>
                                            <th class="text-center" width="1%">ລ/ດ</th>
                                            <th class="text-center" width="1%">ຮູບສິນຄ້າ</th>
                                            <th class="text-center">ລະຫັດ</th>
                                            <th class="">ຊື່ສິ້ນຄ້າ</th>
                                            <th class="text-end">ລາຄາຊື້</th>
                                            <th class="text-end">ລາຄາຂາຍ</th>
                                            <th class="text-center">ສ່ວນຫຼຸດ</th>
                                            <th class="">ໝວດໝູ່</th>
                                            <th class="">ປະເພດ/ຍີ່ຫໍ້</th>
                                            <th class="">ສະຕ໋ອກ</th>
                                            <th class="text-center">#</th>
                                            <th class="text-center">ເປິດ/ປິດ</th>
                                            <th class="text-center">ຕັ້ງຄ່າ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading === true ? (
                                            <tr>
                                                <td colSpan={12} className='text-center'>
                                                    <Placeholder.Grid rows={5} columns={6} active />
                                                    <Loader size='lg' center content="loading" />
                                                </td>
                                            </tr>
                                        ) : (
                                            <>
                                                {itemData.length > 0 ? (
                                                    itemData.map((item, key) =>
                                                        <tr key={key}>
                                                            <td className='text-center'>{key + 1}</td>
                                                            <td className='text-center'>
                                                                <img src={item.imgPos === '' ? '/assets/img/icon/picture.jpg' : url + 'pos/' + item.imgPos} class="rounded h-30px" />
                                                            </td>
                                                            <td className='text-center'>{item.product_code}</td>
                                                            <td className=''>{item.product_name}</td>
                                                            <td className='text-end'>{numeral(item.price_buy).format('0,00')}</td>
                                                            <td className='text-end'>{numeral(item.price_sale).format('0,00')}</td>
                                                            <td className='text-center'>{item.discount_sale} {item.stt_discout === 1 ? ' ₭' : item.stt_discout === 2 ? ' %' : '-'}</td>
                                                            <td className=''>{item.categories_name}</td>
                                                            <td className=''>{item.brand_name}</td>
                                                            <td className=''>{item.status_stock === 1 ? 'ຕັດສະຕ໋ອກ' : 'ບໍ່ຕັດສະຕ໋ອກ'}</td>
                                                            <td className='text-center'>
                                                                <button type='button' onClick={() => handleOpenOptpion(item.product_id, true)} className='btn btn-xs btn-blue me-2' ><i class="fa-solid fa-list" /></button>
                                                                {item.dataList.length > 0 ? (
                                                                    <button type='button' onClick={() => handleOpenSetps(item.product_id, true)} className='btn btn-xs btn-green me-2'><i class="fa-solid fa-s" /></button>
                                                                ) : (
                                                                    <button type='button' onClick={() => handleOpenSetps(item.product_id, true)} className='btn btn-xs btn-orange me-2'><i class="fa-solid fa-e" /></button>
                                                                )}
                                                            </td>
                                                            <td className='text-center'>
                                                                <div class="form-switch">
                                                                    <input class="form-check-input" type="checkbox" checked={item.statusUse === 1} onChange={() => handleOffOn(item.product_id, item.statusUse)} key={key} />
                                                                </div>
                                                            </td>
                                                            <td className='text-center'>
                                                                <button type='button' onClick={() => handleEdit(item)} className='btn btn-xs btn-blue me-2'><i class="fa-solid fa-pen-to-square" /></button>
                                                                <button type='button' onClick={() => handleDelete(item.product_id)} className='btn btn-xs btn-danger'><i class="fa-solid fa-trash" /></button>

                                                            </td>
                                                        </tr>
                                                    )) : (
                                                    <tr>
                                                        <td colSpan={12} className='text-center text-red'>ບໍ່ພົບຂໍ້ມູນທີ່ມີການບັນທຶກ</td>
                                                    </tr>
                                                )}
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>

                {dataNew === true ? (
                    <div className="col-sm-4 col-lg-5 px-2" >
                        <div className=" navbar navbar-sticky  h-100">
                            <form onSubmit={handleSubmit} className='nav'>
                                <div className="panel bg-default ">
                                    <div className='sticky-top-form' >
                                        <div className="breadcrumb float-end">
                                            <Button type='submit' color="blue" appearance="primary" startIcon={<i className='fas fa-save' />} > ບັນທຶກ</Button>
                                        </div>
                                        <div className="page-header">
                                            <Button type='button' color="red" onClick={() => openForm(false)} appearance="ghost"><i class="fa-solid fa-xmark fs-4" /></Button>
                                        </div>
                                    </div>
                                    <div class="panel-form pt-0">
                                        <div class="panel ">
                                            <div class="panel-heading bg-bps  ui-sortable-handle">
                                                <h4 class="panel-title text-white fs-14px"><i class="fa-solid fa-id-card-clip"></i> ສ້າງບັນຊີຜູ້ໃຊ້</h4>
                                            </div>
                                            <div class="panel-body  row">
                                                <div className="form-group mb-2">
                                                    <label htmlFor="" className='form-label'>ຊື່ສິ້ນຄ້າ</label>
                                                    <Input value={inputs.product_name} onChange={(e) => handleChange('product_name', e)} placeholder="ຊື່ສິ້ນຄ້າ" required />
                                                </div>
                                                <div className="form-group col-lg-6 mb-2">
                                                    <label htmlFor="" className='form-label'>ລາຄາຊື້</label>
                                                    <Input value={numeral(inputs.price_buy).format('0,00')} onChange={(e) => handleChange('price_buy', e)} block />
                                                </div>
                                                <div className="form-group col-lg-6 mb-2">
                                                    <label htmlFor="" className='form-label'>ລາຄາຂາຍ</label>
                                                    <Input value={numeral(inputs.price_sale).format('0,00')} onChange={(e) => handleChange('price_sale', e)} block />
                                                </div>
                                                <hr />
                                                <div className="form-group col-sm-12 col-lg-6 mb-2">
                                                    <label htmlFor="" className='form-label'>ໝວດໝູ່</label>
                                                    <SelectPicker data={itemCate} defaultValue={inputs.categories_id_fk} onChange={(e) => handleShowCart(e)} block placeholder='ເລືອກ' required />
                                                </div>
                                                <div className="form-group col-sm-12 col-lg-6 mb-2">
                                                    <label htmlFor="" className='form-label'>ປະເພດ/ຍີ່ຫໍ້</label>
                                                    <SelectPicker data={dataBrand} value={inputs.brands_id_fk} onChange={(e) => handleChange('brands_id_fk', e)} block placeholder='ເລືອກ' required />
                                                </div>
                                                <hr />
                                                <div className="form-group col-sm-8 mb-2">
                                                    <label htmlFor="" className='form-label'>ຫົວໜ່ວຍ</label>
                                                    <SelectPicker data={itemUnit} value={inputs.units_id_fk} onChange={(e) => handleChange('units_id_fk', e)} block placeholder='ເລືອກ' />
                                                </div>
                                                <div className="form-group col-sm-4 mb-2">
                                                    <label htmlFor="" className='form-label'>ສະຕ໋ອກ</label>
                                                    <InputPicker data={stock} value={inputs.status_stock} onChange={(e) => handleChange('status_stock', e)} block placeholder='ເລືອກ' />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel rounded-top-3">
                                            <div class="panel-heading bg-defauld ">
                                                <h4 class="panel-title fs-16px"> <i class="fa-solid fa-image"></i> ຮູບສິນຄ້າ</h4>
                                            </div>
                                            <div class="panel-body row">
                                                <div class="text-center position-relative">
                                                    <label role='button'>
                                                        <input type="file" id="fileInput" onChange={handleQrChange} accept="image/*" className='hide' />
                                                        <img src={imageUrl} class="w-150px rounded-3" />
                                                    </label>
                                                    {selectedFile && (
                                                        <span role='button' onClick={handleClearImage} class=" d-flex align-items-center justify-content-center badge bg-danger text-white position-absolute end-40 top-0 rounded-pill mt-n2 me-n5"><i class="fa-solid fa-xmark"></i></span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel rounded-3 border border-2">
                                            <div class="panel-heading bg-default ">
                                                <h4 class="panel-title fs-16px"><i class="fa-solid fa-barcode"></i>  ບາໂຄດ (ກຳຫນົດເອງ)</h4>
                                                <div class="panel-heading-btn">
                                                    <div class="form-check form-switch mb-2">
                                                        <input class="form-check-input" type="checkbox" checked={isBarcodeShown} onChange={handleOpenBarcode} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class={`accordion-collapse collapse ${isBarcodeShown ? 'show' : ''}`} data-bs-parent="#accordion1">
                                                <div class="panel-body">
                                                    <div className="form-group text-dark">
                                                        <label htmlFor="" className='form-label text-dark'>ລະຫັດບາໂຄດທີ່ຕ້ອງການກຳໜົດເອງ</label>
                                                        <InputGroup inside >
                                                            <InputGroup.Addon><i className='fa-solid fa-barcode' /> </InputGroup.Addon>
                                                            <Input block value={inputs.barcode} onChange={(e) => handleChange('barcode', e)} placeholder='|||||||||||||||||||||||||' />
                                                        </InputGroup>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel rounded-3 border border-2" >
                                            <div class="panel-heading bg-default ">
                                                <h4 class="panel-title text fs-16px"><i class="fa-solid fa-tag"></i> ສ່ວນຫຼຸດ</h4>
                                                <div class="panel-heading-btn">
                                                    <div class="form-check form-switch mb-2">
                                                        <input class="form-check-input" type="checkbox" checked={isDiscountShown} onChange={handleOpenDiscount} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class={`accordion-collapse collapse ${isDiscountShown ? 'show' : ''}`} data-bs-parent="#accordion2">
                                                <div class="panel-body" >
                                                    <div class="input-group">
                                                        <span class="w-100px me-2">
                                                            <select value={inputs.stt_discout} onChange={(e) => handleChange('stt_discout', e.target.value)} className='form-select rounded w-100px'>
                                                                <option value="0">ບໍ່ມີ</option>
                                                                <option value="1">ກີບ (₭)</option>
                                                                <option value="2">ເປິເຊັນ (%)</option>
                                                            </select>
                                                        </span>
                                                        <input type="text" value={inputs.discount_sale} onChange={(e) => handleChange('discount_sale', e.target.value)} class="form-control rounded" placeholder='0' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="panel border border-2" >
                                            <div class="panel-heading bg-default">
                                                <h4 class="panel-title fs-16px"><i class="fa-solid fa-bell"></i> ແຈ້ງເຕືອນສິນຄ້າໃກ້ໝົດ</h4>
                                                <div class="panel-heading-btn">
                                                    <div class="form-check form-switch mb-2">
                                                        <input class="form-check-input" type="checkbox" checked={isNotificShown} onChange={handleOpenNotific} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class={`accordion-collapse collapse ${isNotificShown ? 'show' : ''}`} data-bs-parent="#accordion5">
                                                <div class="panel-body row">
                                                    <div className="form-group col-6">
                                                        <label htmlFor="" className='form-label'>ແຈ້ງເຕືອນ <i class="fa-solid fa-angle-left" /> ນ້ອຍກວ່າ </label>
                                                        <Input type='number' defaultValue={inputs.qty_alert} onChange={(e) => handleChange('qty_alert', e)} block />
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label htmlFor="" className='form-label'>ສະຖານະໃຊ້ງານ  </label>
                                                        <select value={inputs.statusUse} onChange={(e) => handleChange('statusUse', e)} className='form-select' >
                                                            <option value="1" selected>ພ້ອມໃຊ້ງານ</option>
                                                            <option value="2">ບໍ່ພ້ອມໃຊ້ງານ</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : ''}
            </div>


            <Modal show={option} onHide={() => handleOpenOptpion('', false)}>
                <Modal.Header closeButton>
                    <Modal.Title>ລາຍລະອຽດ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmitOpiton}>
                        <div className="row mb-2">
                            <div className="col-sm-5">
                                <label htmlFor="" className='form-label'>ຊື່ສິ້ນຄ້າ</label>
                                <Input value={values.option_name} onChange={(e) => handleOption('option_name', e)} placeholder='ຊື່ສິ້ນຄ້າ' required />
                            </div>
                            <div className="col-sm-5 col-10">
                                <label htmlFor="" className='form-label'>ລາຄາຂາຍ</label>
                                <Input value={numeral(values.option_price).format('0,00')} onChange={(e) => handleOption('option_price', e)} placeholder='0,000' required />
                            </div>
                            <div className="col-2 mt-4">
                                <Button type='submit' appearance='primary'>ເພີ່ມ</Button>
                            </div>
                        </div>
                    </form>
                    <table className='table table-sm text-nowrap'>
                        <thead>
                            <tr>
                                <th className='text-center' width={'2%'}>ລ/ດ</th>
                                <th>ຊື່</th>
                                <th className='text-end'>ລາຄາ</th>
                                <th className='text-center' width={'5%'}>ຕັ້ງຄ່າ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemOption.map((item, key) =>
                                <tr>
                                    <td className='text-center'>{key + 1}</td>
                                    <td>{item.option_name}</td>
                                    <td className='text-end'>{numeral(item.option_price).format('0,00')}</td>
                                    <td className='text-center'>
                                        <button type='button' onClick={() => editOption(item)} className='btn btn-xs btn-blue me-2'><i class="fa-solid fa-pen-to-square" /></button>
                                        <button type='button' onClick={() => deleteOpiton(item.option_id, item.product_id_fk)} className='btn btn-xs btn-danger'><i class="fa-solid fa-trash" /></button>
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>

            <ModalSetpos
             index={posId} 
                show={showModal}
                handleClose={handleCloseModal}
                itemData={itemData}
            />

        </div>
    )
}
