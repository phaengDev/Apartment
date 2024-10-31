import React, { useState, useEffect } from 'react'
import { Modal, Button, SelectPicker, DatePicker, Input, InputPicker } from 'rsuite';
import { Config } from '../../config/connection';
import { useCurrency, usePriceList } from '../../config/select-option';
import numeral from 'numeral';
import { Notification, Alert } from '../../utils/Notification';
import axios from 'axios';
import moment from 'moment';
const PayingRentApartment = ({ data, open, handleClose }) => {
    const api = Config.urlApi;
    const itemCurrency = useCurrency();

    const typePrice = usePriceList(data.useroom_id) //========= ສະແດງ ປະເພດ ລາຄາການຜັກເຊົ່າ


    const [priceDefault, setPriceDefault] = useState(0);
    const [pricePay, setPricePay] = useState(0);

    const [rate, setRate] = useState(1);
    const [currency, setCurrency] = useState('₭');
    const [pricePayTotal, setPricePayTotal] = useState(0)
    // const [depositFee, setDepositFee] = useState(0);

    const [startDate, setStartDate] = useState(new Date()); //========== ວັນທີ່ເລີມ 

    const [status, setStatus] = useState(2); //====== ສະຖານະຈ່າຍ ຫຼື ປະເພດຈ່າຍ
    const [valDate, setValDate] = useState(1); //=========== ຈຳນວນການຈ່າຍ


    const handleShowPrice = (pricelistId) => {
        const usePrice = typePrice.find(item => item.pricelist_id === pricelistId);
  
        if (usePrice) {

            setPriceDefault(usePrice.typePrice)
            setPricePay(usePrice.typePrice / rate);

            setPricePayTotal(usePrice.typePrice );

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


    const [endDate, setEndDate] = useState(() => {
        const initialDate = new Date();
        initialDate.setMonth(initialDate.getMonth() + 1);
        return initialDate;
    });



    const [values, setValues] = useState({
        // room_id_fk: '',
        rantal_id_fk: data.rantal_id_fk,
        currency_id_fk: 22001,
        date_rental_stay: startDate,
        date_pay_rental: endDate,
        // file_doc: '',
        rete_change: '1',
        balance_pays: 0,
        balance_default: priceDefault,
        type_payment: 1
    })

    const typePay = [{
        label: 'ເງິນສົດ', value: 1
    }, {
        label: 'ເງິນໂອນ', value: 2
    }
    ]


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

    const handleChange = (name, value) => {
        setValues({
            ...values, [name]: value
        })
    }

    useEffect(() => {
        // if (data && data.priceList) {
        //     setTypePrice(data.priceList);
        // }
        const newEndDate = new Date(data.date_pay_rental);
        if (data.status === 1) {
            newEndDate.setDate(newEndDate.getDate() + valDate);
        } else if (data.status === 2) {
            newEndDate.setMonth(newEndDate.getMonth() + valDate);
        } else {
            newEndDate.setFullYear(newEndDate.getFullYear() + valDate);
        }
        setEndDate(newEndDate);
        setPricePay(data.priceRoom)
        setPricePayTotal(data.priceRoom)
        setValues({
            ...values,
            rantal_id_fk:data.rantal_id_fk,
            date_pay_rental: newEndDate,
        })

        setStartDate(new Date(data.date_pay_rental));
    }, [data])

    
    const PriceList = typePrice.map(vals => ({
        label: `${vals.typesName} / ${numeral(vals.typePrice).format('0,00')}`,
        value: vals.pricelist_id
    }));

    const handleChangeRate = (name, value) => {
        const useRate = itemCurrency.find(item => item.value === value);
        if (useRate) {
            setRate(useRate.rate); // Update the rate state
            // setPricePay(data.priceRoom / useRate.rate)
            setCurrency(useRate.genus)
            setPricePayTotal(pricePay / useRate.rate )
        }

        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
            rete_change: useRate.rate,
            balance_pays: pricePay / useRate.rate
        }));
    };

    return (
        <Modal open={open} size={'lg'} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title className='my-1'>ຟອມຈ່າຍຄ່າເຫ້ອງ ເບີ: {data.roomName} {moment(data.date_pay_rental).format('DD/MM/YYYY')}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='row'>
                <div className="col-sm-6 mb-2">
                    <label htmlFor="" className='form-label'>ປະເພດເຊົ່າ {values.rantal_id_fk}</label>
                    <SelectPicker data={PriceList}  onChange={(e) => handleShowPrice(e)} block />
                </div>
                <div className="col-sm-3 mb-2">
                    <label htmlFor="" className='form-label'>ວັນທີເລີມ</label>
                    <DatePicker oneTap format='dd/MM/yyyy' onChange={(date) => handleStartDate(date)} value={startDate} block />
                </div>
                <div className="col-sm-3 mb-2">
                    <label htmlFor="" className='form-label'>ວັນທີສິນສຸດ</label>
                    <DatePicker oneTap format='dd/MM/yyyy' value={values.date_pay_rental} block readOnly />
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
                 
                </div>
                <div className="col-sm-6 mb-2">
                    <div className="form-group  bg-blue-700 p-3 mt-3 text-white rounded-4">
                        <h3>{numeral(pricePayTotal).format('0,00.00')} <span className='fs-18px'>{currency}</span> </h3>
                    </div>
                </div>
                <div className="col-sm-12 mb-2">
                    <div className="form-group mb-2">
                        <label htmlFor="" className='form-label'>ລາຍລະອຽດການຊຳລະ</label>
                        <Input as='textarea' onChange={(e) => handleChange('detail_pays', e)} placeholder='...............' />
                    </div>
                </div>
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
    )
}

export default PayingRentApartment