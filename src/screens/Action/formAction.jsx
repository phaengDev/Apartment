import React, { useState, useEffect } from 'react'
// import { Modal } from 'react-bootstrap';
import { Modal, Input, DatePicker, SelectPicker, InputGroup, InputPicker, Button } from 'rsuite';
import { Config } from '../../config/connection';
import { useCurrency } from '../../config/select-option';
import numeral from 'numeral';
import { Notification, Alert } from '../../utils/Notification';
import axios from 'axios';
const FormAction = ({ item, open, handleClose ,fetchRoom}) => {
    const api = Config.urlApi;
    const itemCurrency = useCurrency();
    const [typePrice, setTypePrice] = useState([]);
    // const buildingId=localStorage.getItem('buildingId');
    const [priceDefault, setPriceDefault] = useState(0);
    const [pricePay, setPricePay] = useState(0);

    const [rate, setRate] = useState(1);
    const [currency, setCurrency] = useState('₭');
    const [pricePayTotal,setPricePayTotal]=useState(0)
    const [depositFee, setDepositFee] = useState(0);
    const [startDate, setStartDate] = useState(new Date());

    const [status, setStatus] = useState(2); //====== ສະຖານະຈ່າຍ ຫຼື ປະເພດຈ່າຍ
    const [valDate, setValDate] = useState(1); //=========== ຈຳນວນການຈ່າຍ
    const handleShowPrice = (pricelistId) => {
        const usePrice = typePrice.find(item => item.pricelist_id === pricelistId);
        if (usePrice) {
            setStartDate(new Date())
            setPriceDefault(usePrice.typePrice)
            setPricePay(usePrice.typePrice / rate);

            setPricePayTotal(usePrice.typePrice / rate + parseFloat(depositFee));

            setStatus(usePrice.status); //====== ສະຖານະຈ່າຍ ຫຼື ປະເພດຈ່າຍ
            setValDate(usePrice.values) //=========== ຈຳນວນການຈ່າຍ
            const newEndDate = new Date();
            if (usePrice.status === 1) {
                newEndDate.setDate(newEndDate.getDate() + usePrice.values);
            } else if (usePrice.status === 2) {
                newEndDate.setMonth(newEndDate.getMonth() + usePrice.values);
            } else {
                newEndDate.setFullYear(newEndDate.getFullYear() + usePrice.values);
            }
            setEndDate(newEndDate);

            setValues({
                ...values, 
                rantal_id_fk: usePrice.types_id,
                date_rental_stay: startDate,
                date_pay_rental: newEndDate,
            })
        }
    };

    const typePay=[{
        label:'ເງິນສົດ',value:1
    },{
        label:'ເງິນໂອນ',value:2
    }
]

    const [endDate, setEndDate] = useState(() => {
        const initialDate = new Date();
        initialDate.setMonth(initialDate.getMonth() + 1);
        return initialDate;
    });

    
    const [values, setValues] = useState({
        room_id_fk: '',
        rantal_id_fk: '',
        use_detail: '',
        days_to_Pay: '1',
        days_alert_pay: '5',
        currency_id_fk: 22001,
        date_rental_stay: startDate,
        date_pay_rental: endDate,
        customer_name: '',
        customer_tel: '',
        email: '',
        card_id: '',
        address: '',
        type_cuts: '1',
        file_doc: '',
        rete_change: '1',
        balance_pays: 0,
        deposit_fee:0,
        balance_default: priceDefault,
        type_payment:1
    })

    const handleChange = (name, value) => {
        setValues({
            ...values, [name]: value
        })
        const valueDis =value.replace(/,/g, '');
        if(name==='deposit_fee'){
            setDepositFee(valueDis)
            setPricePayTotal(parseFloat(valueDis) + parseFloat(pricePay));
        }
    }
    const [selectedType, setSelectedType] = useState(1);
    const checkedUse = (type) => {
        setSelectedType(type);
        setValues({
            ...values, type_cuts: type,
        })
    };

  
    useEffect(() => {
        if (item && item.priceList) {
            setTypePrice(item.priceList);
        }
        setValues({
            ...values, 
            room_id_fk: item.roomRent_id,
            rantal_id_fk: item.rental_id_fk,
            balance_pays: item.priceRoom,
            balance_default: item.priceRoom
        })
        setPriceDefault(item.priceRoom)
        setPricePay(item.priceRoom)

        setPricePayTotal(item.priceRoom)
    }, [item]);



    const handleStartDate = (value) => {
        setStartDate(value);
        const newEndDate = new Date(value);
        if (status === 1) {
            newEndDate.setDate(newEndDate.getDate() + valDate);
        } else if (status === 2) {
            newEndDate.setMonth(newEndDate.getMonth() + valDate);
        } else {
            newEndDate.setFullYear(newEndDate.getFullYear() + valDate);
        }
        setEndDate(newEndDate);
        setValues({
            ...values, 
            date_rental_stay: value,
            date_pay_rental: newEndDate,
        })
    }

    const handleChangeRate = (name, value) => {
        const useRate = itemCurrency.find(item => item.value === value);
        if (useRate) {
            setRate(useRate.rate); // Update the rate state
            setPricePay(item.priceRoom / useRate.rate)
            setCurrency(useRate.genus)
            setPricePayTotal(item.priceRoom / useRate.rate+parseFloat(depositFee))
        }


        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
            rete_change: useRate.rate,
            balance_pays: item.priceRoom / useRate.rate
        }));
    };

    const dataPrice = typePrice.map(vals => ({
        label: `${vals.typesName} / ${numeral(vals.typePrice).format('0,00')}`,
        value: vals.pricelist_id
    }));
//=======================================
const [selectedFile, setSelectedFile] = useState(null);
const handleDocFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setValues({
        ...values, file_doc: file
      })
      
    }
  };

  //=======================
const handleSubmit=(event)=>{
    event.preventDefault();
    const imputData = new FormData();
    for (const key in values) {
      imputData.append(key, values[key])
    }
    try {
        axios.post(api + 'useroom/create', imputData)
          .then(function (res) {
            if (res.status === 200) {
                handleClose();
                fetchRoom();
              Notification.success('ການບັນທຶກຂໍ້ມູນສຳເລັດ', 'ແຈ້ງເຕືອນ');
            } else {
              Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
            }
          })
      } catch (error) {
        Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
      }
}

    return (
        <Modal size='lg' open={open} onClose={handleClose} >
            <Modal.Header>
                <Modal.Title className='py-1'>ຟອມເປິດເຊົ່າຫ້ອງ</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
            <Modal.Body className='modal-content'>
                <div className="col-sm-12 ">
                    <div className="panel">
                        <div class="panel-heading ui-sortable-handle border-bottom py-3">
                            <h4 class="panel-title"> <h5 className='text-red'>ເບີຫ້ອງ: {item.roomName} / ຊັ້ນ: {item.floorName}</h5></h4>
                            <div class="panel-heading-btn text-blue">
                                <h5 className='fw-bold'>{numeral(priceDefault).format('0,00')} kip</h5>
                            </div>
                        </div>
                        <div className="panel-body row">
                            <div className="col-sm-6 mb-2">
                                <label htmlFor="" className='form-label'>ປະເພດເຊົ່າ </label>
                                <SelectPicker data={dataPrice}  onChange={(e) => handleShowPrice(e)} block />
                            </div>
                            <div className="col-sm-3 mb-2">
                                <label htmlFor="" className='form-label'>ວັນທີເຂົ້າພັກ</label>
                                <DatePicker oneTap format='dd/MM/yyyy' onChange={(date) => handleStartDate(date)} value={startDate} block />
                            </div>
                            <div className="col-sm-3 mb-2">
                                <label htmlFor="" className='form-label'>ວັນທີຕ້ອງຊຳລະ</label>
                                <DatePicker oneTap format='dd/MM/yyyy' value={values.date_pay_rental} block readOnly />
                            </div>
                            <div className="col-sm-12 mb-2">
                                <label htmlFor="" className='form-label'>ລາຍລະອຽດອື່ນໆ ກ່ຽວກກັບການເຂົ້າພັກ</label>
                                <Input as='textarea' onChange={(e) => handleChange('use_detail', e)} placeholder='ໃສ່ລາຍລະອຽດ...' block />
                            </div>
                        </div>
                        <hr className='mt-1' />
                        <h5 className='mb-2 text-red'>I. ຂໍ້ມູນລູກຄ້າ</h5>
                        <div className="row mb-3">
                            <label className="form-label col-form-label col-md-3 text-end ">ປະເພດລູກຄ້າ :</label>
                            <div className="col-md-9 pt-2">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" id="coustomType1" name="type" onChange={() => checkedUse(1)} checked={selectedType === 1} />
                                    <label className="form-check-label" for="coustomType1">ລູກຄ້າຄົນລາວ</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" id="coustomType2" name="type" onChange={() => checkedUse(2)} checked={selectedType === 2} />
                                    <label className="form-check-label" for="coustomType2">ລູກຄ້າຕ່າງປະເທດ</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="form-label col-form-label col-md-3 text-lg-end">ຊື່ ແລະ ນາມສະກຸນ ລູກຄ້າ:</label>
                            <div className="col-sm-9">
                                <Input onChange={(e) => handleChange('customer_name', e)} placeholder='ຊື່ ແລະ ນາມສະກຸນ' block required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="form-label col-form-label col-md-3 text-lg-end">ເບີໂທລະສັບ:</label>
                            <div className="col-sm-9">
                                <Input type='tel' onChange={(e) => handleChange('customer_tel', e)} placeholder='20 99999999' block />
                            </div>

                        </div>
                        <div className="row mb-3">
                            <label className="form-label col-form-label col-md-3 text-lg-end">Email:</label>
                            <div className="col-sm-9">
                                <Input onChange={(e) => handleChange('email', e)} placeholder='*****@gmail.com' block />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="form-label col-form-label col-md-3 text-lg-end">ບັດປະຈຳຕົວ, ສຳມະໂນ, ໜັງສືຜ່ານແດນ:</label>
                            <div className="col-sm-7 col-8">
                                <Input onChange={(e) => handleChange('card_id', e)} placeholder='*** *** ****' block />
                            </div>
                            <div className="col-sm-2 col-4">
                                <label className={`btn fs-14px ${selectedFile===null ?'btn-primary ':'btn-success'}`}> 
                                    <input type="file" className='hide' onChange={handleDocFile} accept="image/*" />
                                    {selectedFile===null ? (
                                       <><i className="fa-solid fa-folder-open" /> ໄຟລ໌...</>
                                    ):( <> <i class="fa-solid fa-copy"/> ເລືອກໃໝ່... </>)}
                                    </label>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="form-label col-form-label col-md-3 text-lg-end">ທີ່ຢູ່ປະຈຸບັນລູກຄ້າ:</label>
                            <div className="col-sm-9">
                                <Input as='textarea' onChange={(e) => handleChange('address', e)} placeholder='ຊື່ບ້ານ...,ຊື່ເມືອງ..,ຊື່ແຂວງ...' block />
                            </div>
                        </div>
                        <hr className='mb-2' />
                        <div className="row">
                            <div className="col-sm-12 mb-3">
                                <h5 className='text-red'>II. ກຳນົດການຊຳລະເງິນຄ່າເຊົ່າ</h5>
                            </div>
                            <div className="col-sm-6 mb-2">
                                <label className="form-label text-lg-end">ກຳນົດທຸກໆວັນທີຊຳລະ</label>
                                <InputGroup inside >
                                    <Input type='number' onChange={(e) => handleChange('days_to_Pay', e)} value={values.days_to_Pay} />
                                    <InputGroup.Addon>| ຂອງເດືອນ</InputGroup.Addon>
                                </InputGroup>
                            </div>
                            <div className="col-sm-6 mbb-2">
                                <label className="form-label text-lg-end">ແຈ້ງໃບເກັບໜີ້ລ່ວງໜ້າ</label>
                                <InputGroup inside >
                                    <Input type='number' onChange={(e) => handleChange('days_alert_pay', e)} value={values.days_alert_pay} />
                                    <InputGroup.Addon>| ວັນ ກ່ອນກຳໜົດຊຳລະ</InputGroup.Addon>
                                </InputGroup>
                            </div>
                            {/* </div> */}
                            <div className="col-sm-6 mb-2">
                            <div className="form-group mb-4">
                                    <label htmlFor="" className='form-label'>ເງິນມັດຈຳຄ່າຫ້ອງ </label>
                                    <Input value={numeral(values.deposit_fee).format('0,00')} onChange={(e) => handleChange('deposit_fee', e)} placeholder='00,000'/>
                                </div>
                                <div className="form-group  bg-blue-700 p-3 mt-3 text-white rounded-4">
                                    <h3>{numeral(pricePay).format('0,00.00')} <span className='fs-18px'>{currency}</span> </h3>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12 mb-2 row">
                                <div className="form-group col-6 mb-2">
                                    <label htmlFor="" className='form-label'>ສະກຸນເງິນ</label>
                                    <InputPicker data={itemCurrency} value={values.currency_id_fk} onChange={(e) => handleChangeRate('currency_id_fk', e)} placement="autoVerticalStart" block />
                                </div>
                                <div className="form-group col-6 mb-2">
                                    <label htmlFor="" className='form-label'>ປະເພດຈ່າຍ</label>
                                    <InputPicker data={typePay} value={values.type_payment} onChange={(e) => handleChange('type_payment', e)} placement="autoVerticalStart" block />
                                </div>
                                {parseFloat(values.deposit_fee) > 0 && (
                                <div className="form-group bg-red-600 p-3 mt-3 text-white rounded-4">
                                    <h3>{numeral(pricePayTotal).format('0,00.00')} <span className='fs-18px'>{currency}</span> <i class="fa-solid fa-check fs-1 float-end"/></h3>
                                </div>
                                )}
                            </div>
                            <div className="col-sm-12 mb-2">
                            <div className="form-group mb-2">
                                    <label htmlFor="" className='form-label'>ລາຍລະອຽດການຊຳລະ</label>
                                    <Input as='textarea' onChange={(e) => handleChange('detail_pays', e)} placeholder='...............'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button type='subimt' appearance="primary">
                    ບັນທຶກການເຊົ່າ
                </Button>
                <Button onClick={handleClose} color='red' appearance="primary">
                    ຍົກເລີກ
                </Button>
            </Modal.Footer>
            </form>
        </Modal>
    )
}
export default FormAction;
