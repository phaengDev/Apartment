import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Config } from '../../config/connection';
import { Notification } from '../../utils/Notification';
import { Modal, Button, Input } from 'rsuite';
import numeral from "numeral";
import axios from "axios";
export default function SettingRete() {
    const api = Config.urlApi;
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    //============= action =============
    const [inputs, setInputs] = useState({
        currencyId: '',
        genus: '',
        genus_laos: '',
        reate_price: '',
        currency_name: ''
    })
    const handleChange = (name, value) => {
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.post(api + 'currency/create', inputs)
                .then(function (respones) {
                    if (respones.status === 200) {
                        handleClose();
                        fetchCurrency();
                        Notification.success('ການບັນທຶກຂໍ້ມູນສຳເລັດ', 'ແຈ້ງເຕືອນ');
                    } else {
                        Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
                    }
                });
        } catch (error) {
            Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
        }
    };
    const [itemCurrency, setItimeCurrency] = useState([]);
    const fetchCurrency = async () => {
        try {
            const response = await fetch(api + 'currency');
            const jsonData = await response.json();
            setItimeCurrency(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    const handleEdit = (item) => {
        setInputs({
            currencyId: item.currency_id,
            genus: item.genus,
            genus_laos: item.genus_laos,
            reate_price: item.reate_price,
            currency_name: item.currency_name
        })
        setOpen(true)
    }

    const handleDelete = (id) => {

    }
    //==========
    useEffect(() => {
        fetchCurrency()
    }, []);
    return (

        <div id="content" class="app-content p-0">
            <div class="mailbox">
                <div class="mailbox-sidebar">
                    <div class="mailbox-sidebar-header d-flex justify-content-center">
                        <a href="#emailNav" data-bs-toggle="collapse" class="btn btn-dark btn-sm me-auto d-block d-lg-none">
                            <i class="fa fa-cog"></i>
                        </a>
                        <h5> ລາຍການ</h5>
                    </div>
                    <div class="mailbox-sidebar-content collapse d-lg-block" id="emailNav">
                        <div data-scrollbar="true" data-height="100%" data-skip-mobile="true">
                            <div class="nav-title"><b>FOLDERS</b></div>
                            <ul class="nav nav-inbox">
                                <li><Link to={'/system'}><i class="fa fa-hdd fa-lg fa-fw me-2"></i> ຂໍ້ມູນເລີ່ມຕົ້ນ</Link></li>
                                <li class="active"><Link to={'/rate'}><img src="assets/img/icon/ic_currency.svg" className='w-20px fa-fw me-2' alt="" />ຕັ້ງຄ່າເລດເງິນ</Link></li>
                                <li><Link to={'/rights'}><i class="fa-solid fa-screwdriver-wrench fa-fw me-2"></i> ສິດນຳໃຊ້ລະບົບ</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="mailbox-content">
                    <div class="mailbox-content-header">
                        {/* <div class="btn-toolbar">
                           <h5>ການຕັ້ງຕ່າເລດເງິນ</h5>
                        </div> */}
                        <div class="btn-toolbar align-items-center">
                            <h5>ການຕັ້ງຕ່າເລດເງິນ</h5>
                        </div>
                    </div>
                    <div class="mailbox-content-body">
                        <div data-scrollbar="true" data-height="100%" data-skip-mobile="true">
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered align-middle w-100 text-nowrap">
                                    <thead className="fs-14px bg-header">
                                        <tr>
                                            <th className="text-center" width={'5%'}>ລ/ດ</th>
                                            <th className="">ຊື່</th>
                                            <th className="text-center" width={'10%'}>ສະກຸນ</th>
                                            <th className='text-end' width={'10%'}>ເລດເງິນ</th>
                                            <th className="text-center" width={'10%'}>ການຕັ້ງຄ່າ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemCurrency.map((item, key) =>
                                            <tr>
                                                <td className="text-center">{key + 1}</td>
                                                <td>{item.currency_name}</td>
                                                <td className="text-center">{item.genus} /{item.genus_laos}</td>
                                                <td className="text-end">{numeral(item.reate_price).format('0,00.00')} ₭</td>
                                                <td className='text-center'>
                                                    <button type='button' onClick={() => handleEdit(item)} class="btn btn-blue btn-xs me-2"><i class="fa-solid fa-pen-to-square"></i></button>
                                                    <button type='button' onClick={() => handleDelete(item.currency_id)} class="btn btn-red btn-xs"><i class="fa-solid fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title className='pt-1'>ສະກຸນເງິນ</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="form-group mb-2">
                            <label htmlFor="" className="form-label">ຊື່</label>
                            <Input value={inputs.currency_name} onChange={(e) => handleChange('currency_name', e)} placeholder="ຊື່" required />
                        </div>
                        <div className="form-group mb-2 row">
                            <div className="col-sm-6">
                                <label htmlFor="" className="form-label">ສະກຸນ</label>
                                <Input value={inputs.genus} onChange={(e) => handleChange('genus', e)} placeholder="₭" />
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="" className="form-label">ຊື່ພາສາລາວ</label>
                                <Input value={inputs.genus_laos} onChange={(e) => handleChange('genus_laos', e)} placeholder="ລາວ" />
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="" className="form-label">ເລດເງິນ</label>
                            <Input value={numeral(inputs.reate_price).format('0,00.00')} onChange={(e) => handleChange('reate_price', e)} placeholder="0,00" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type='submit' appearance="primary">ບັນທຶກ </Button>
                        <Button color='red' onClick={handleClose} appearance="primary"> ຍົກເລີກ </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>


    )
}
