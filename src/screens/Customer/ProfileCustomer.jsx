import React, { useState, useEffect } from 'react'
import { Config } from '../../config/connection';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { DatePicker, InputPicker,Button } from 'rsuite';
import { useCurrency } from '../../config/select-option';
import PayingRentApartment from '../Action/PayingRentApartment';
function ProfileCustomer() {
    const api = Config.urlApi;
  
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const queryParams = new URLSearchParams(location.search);
    const idCustom = atob(queryParams.get('v'));
    const itemCurrency=useCurrency();
    const [item, setItem] = useState({});
    const [paysList, setPaysList] = useState([]);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const fetchCustomer = async () => {
        try {
            const response = await fetch(api + 'customer/single/' + idCustom);
            const jsonData = await response.json();
            setItem(jsonData);
            setPaysList(jsonData.paysList)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const [dateTopay, setDateTopay] = useState(moment().format('YYYY-MM-DD'));
    const [daysCount, setDaysCount] = useState(0);

    const [dataPrice, setDataPrice] = useState([]);

    useEffect(() => {
        fetchCustomer();
    }, [idCustom]);

    useEffect(() => {
        if (Object.keys(item).length > 0) {
            let newEndDate = moment(item.date_pay_rental);
            // if (item.status === 1) {
            //     newEndDate = newEndDate.add(item.values, 'days');
            // } else if (item.status === 2) {
            //     newEndDate = newEndDate.add(item.values, 'months');
            // } else {
            //     newEndDate = newEndDate.add(item.values, 'years');
            // }
            setDateTopay(newEndDate.format('DD/MM/YYYY'));
            const today = moment();
            const dayDiff = newEndDate.diff(today, 'days');
            setDaysCount(dayDiff);
        }
    }, [item]);


    // const typePrice = usePriceList(item.useroom_id)

    const filteredPaysList = paysList.filter(val => {
        const paysDate = moment(val.pays_date);
        const matchesDateRange = startDate && endDate ? paysDate.isBetween(startDate, endDate, 'days', '[]') : true;
        const matchesCurrency = selectedCurrency ? val.currency_id_fk === selectedCurrency : true;
        return matchesDateRange && matchesCurrency;
    });
 // ================================
 const total = filteredPaysList.reduce((acc, item) => {
    const currency = item.currency_name;
    const genus = item.genus;
    if (!acc[currency]) {
        acc[currency] = {
            balance_pays: 0,
            genus: genus,
        };
    }
    acc[currency].balance_pays += parseFloat(item.balance_pays);
    return acc;
}, {});
const formatNumber = (num) => numeral(num).format('0,00');

const handleShowform=()=>{
    setOpen(true)
}

    return (
        <div id="content" class="app-content p-0">
            <div class="profile">
                <div class="profile-header">
                    <div class="profile-header-cover"></div>
                    <div class="profile-header-content">
                        <div class="profile-header-img ">
                            <img src="./assets/img/icon/user.jpg" alt />
                        </div>
                        <div class="profile-header-info">
                        {/* {daysCount <= item.days_alert_pay && item.stauts_in_out === 1 &&( */}
                        <Button color="blue" onClick={handleShowform} appearance="primary" startIcon={<i className='fas fa-check' />} className=' float-end'>ຈ່າຍຄ່າພັກເຊົ່າ</Button>
                        {/* )} */}
                            <h4 class="mt-0 mb-1"><i class="fa-solid fa-user" /> : {item.customer_name} </h4>
                            <p class="mb-2"><i class="fa-solid fa-location-dot" /> : {item.address} </p>
                            <p class=""><i class="fa-solid fa-phone" /> :  {item.customer_tel}</p>
                        </div>
                        
                    </div>
                    <ul class="profile-header-tab nav nav-tabs ">
                        <li class="nav-item "><a href="#profile-post" class="nav-link active fs-15px" data-bs-toggle="tab">ຂໍ້ມູນການພັກເຊົ່າ</a></li>
                        <li class="nav-item"><a href="#payroom-list" class="nav-link fs-15px" data-bs-toggle="tab">ຂໍ້ມູນການຊຳລະຄ່າພັກເຊົ່າ</a></li>
                        <li class="nav-item"><a href="#profile-photos" class="nav-link fs-15px" data-bs-toggle="tab">ປະຫວັດການຍ້າຍຫ້ອງ</a></li>
                    </ul>
                </div>
            </div>
            <div class="profile-content bg-white">
                <div class="tab-content  p-0">
                    <div class="tab-pane fade show active " id="profile-post">
                        <div className="table-responsive">
                            <table class="table  text-nowrap">
                                <tbody>
                                    <tr className=''>
                                        <td width={'20%'} className='text-end'>ເບີຫ້ອງ:</td>
                                        <td className='px-3'>{item.roomName}</td>
                                    </tr>
                                    <tr className=''>
                                        <td width={'20%'} className='text-end'>ຊັ້ນ: </td>
                                        <td className='px-3'>{item.floorName}</td>
                                    </tr>
                                    <tr className=''>
                                        <td width={'20%'} className='text-end'>ອາຄານເຊົ່າ: </td>
                                        <td className='px-3'>{item.buildingName}</td>
                                    </tr>
                                    <tr className=''>
                                        <td width={'20%'} className='text-end'>ປະເພດການເຊົ່າ: </td>
                                        <td className='px-3'>{item.typesName}</td>
                                    </tr>
                                    <tr className=''>
                                        <td width={'20%'} className='text-end'>ກຳນົດວັນທີຈ່າຍ : </td>
                                        <td className='px-3'>ວັນທີ {item.days_to_Pay} ຂອງທຸກໆເດືອນ</td>
                                    </tr>
                                    <tr className=''>
                                        <td width={'20%'} className='text-end'>ລາຍລະອຽດ: </td>
                                        <td className='px-3'>{item.use_detail}</td>
                                    </tr>
                                    <tr className=''>
                                        <td width={'20%'} className='text-end'>ວັນທີ່ເຂົ້າພັກ: </td>
                                        <td className='px-3'>{moment(item.rigist_date).format('DD/MM/YYYY')}</td>
                                    </tr>
                                    <tr className=''>
                                        <td width={'20%'} className='text-end'>ສະຖານະ: </td>
                                        <td className='px-3'>{item.stauts_in_out === 1 ? (<span className='text-green'><i class="fa-solid fa-caret-up fs-3" /> ກຳລັງພັກເຊົ່າ </span>) : (<span className='text-red'> <i class="fa-solid fa-sort-down fs-4" />ຍ້າຍອອກແລ້ວ</span>)}</td>
                                    </tr>
                                    <tr className=''>
                                        <td width={'20%'} className='text-end'>ເງິນມັດຈຳຄ່າຫ້ອງ: </td>
                                        <td className='px-3'>{numeral(item.deposit_fee).format('0,00.00')} {item.genus}</td>
                                    </tr>
                                    <tr className=''>
                                        <td width={'20%'} className='text-end'>ວັນທີຍ້າຍອອກ: </td>
                                        <td className='px-3'>{item.stauts_in_out === 2 && moment(item.date_in_out).format('DD/MM/YYYY')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {item.stauts_in_out === 1 && (
                            <div class="note alert-primary mb-2 ">
                                <div class={`note-icon ${daysCount <= item.days_alert_pay ? 'text-orange' : daysCount <= 1 ? 'text-red' : 'text-green'}`}><i class="fa fa-lightbulb"></i></div>
                                <div class="note-content">
                                    <h4><b className='fs-20px'>ຄົບວັນທີ່ຈະຕ້ອງຈ່າຍ: <span className='text-red'>{daysCount}</span>  ວັນ  </b></h4>
                                    <p>
                                        ຈ່າຍແລ້ວ ເລີມແຕ່ວັນທີ {moment(item.date_rental_stay).format('DD/MM/YYYY')} ຫາ ວັນທີ. {moment(item.date_pay_rental).format('DD/MM/YYYY')}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div class="tab-pane fade" id="payroom-list">
                        <div className="row mb-2">
                            <div className="col-sm-3">
                                <label htmlFor="" className='form-label'>ວັນທີຈ່າຍ</label>
                                <DatePicker oneTap format='dd/MM/yyyy' value={startDate} onChange={(date) => setStartDate(date)} block />
                            </div>
                            <div className="col-sm-3">
                            <label htmlFor="" className='form-label'>ຫາວັນທີ</label>
                            <DatePicker oneTap format='dd/MM/yyyy' value={endDate} onChange={(date) => setEndDate(date)} block />
                            </div>
                            <div className="col-sm-3">
                            <label htmlFor="" className='form-label'>ສະກຸນເງິນ</label>
                            <InputPicker block data={itemCurrency} onChange={(value) => setSelectedCurrency(value)}  />
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table class="table table-striped table-bordered align-middle text-nowrap">
                                <thead className='thead-bps'>
                                    <tr>
                                        <th class="text-center" width="1%">ລ/ດ</th>
                                        <th class="text-center">ວັນທີຈ່າຍ</th>
                                        <th class="text-center">ປະເພດການເຊົ່າ</th>
                                        <th class="text-end">ຈຳນວນເງິນ</th>
                                        <th class="text-center">ສະກຸນເງິນ</th>
                                        <th class="text-center">ປະເພດຈ່າຍ</th>
                                        <th class="text-center">ເດືອນຈ່າຍ</th>
                                        <th class="text-center">ເອກະສານ</th>
                                        <th class="text-center">ຕັ້ງຄ່າ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPaysList.map((val, index) => (
                                        <tr>
                                            <td className='text-center'>{index + 1}</td>
                                            <td className='text-center'>{moment(val.pays_date).format('DD/MM/YYYY mm:ss')}</td>
                                            <td className='text-center'>{val.typesName}</td>
                                            <td className='text-end'>{numeral(val.balance_pays).format('0,00.00')} {val.genus}</td>
                                            <td className='text-center'>{val.type_payment === 1 ? 'ຈ່າຍເງິນສົດ' : 'ຈ່າຍເງິນໂອນ'}</td>
                                            <td className='text-center'>{val.currency_name}</td>
                                            <td className='text-center'>{moment(val.pay_start_date).format('MM/YYYY')} - {moment(val.pay_end_date).format('MM/YYYY')}</td>
                                            <td className='text-center'></td>
                                            <td className='text-center'></td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                {Object.keys(total).map((currency, key) => (
                                                <tr key={`${key}`}>
                                                    <td colSpan={3} className='text-end'>ລວມຍອດຄ້າງຈ່າຍທັງໝົດ ({currency})</td>
                                                    <td className='text-end'>{formatNumber(total[currency].balance_pays)} {total[currency].genus}</td>
                                                    <td colSpan={5}></td>
                                                </tr>
                                        ))}
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <PayingRentApartment
            open={open}
            handleClose = {() => setOpen(false)}
            data={item}
            />
        </div>
    )
}

export default ProfileCustomer