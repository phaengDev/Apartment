import React, { useState, useEffect } from 'react'
import { DatePicker, Input, SelectPicker, InputGroup, InputPicker } from 'rsuite';
import { Config } from '../../config/connection';
import numeral from 'numeral';
import axios from 'axios';
import { useFloor,useCurrency } from '../../config/select-option';
import { useSearch } from 'rsuite/esm/internals/Picker';
export default function OpenRoom() {
const api = Config.urlApi;
const itemFloor=useFloor();
const itemCurrency=useCurrency();
const [isearch,setIsearch]=useState({
    buildingId_fk:'',
    floorId_fk:'',
})

    const [itemData, setItemData] = useState([]);

    const [active, setActive] = useState('');
    const [typePrice, setTypePrice] = useState([]);

    const [filter, setFilter] = useState([]);

    const handleRoom=(value)=>{
        setIsearch({
            ...isearch,floorId_fk:value
        })
    }
    const fetchRoom = async () => {
        try {
            const response = await axios.post(api + 'room/option', isearch);
            const jsonData = response.data;
            setItemData(jsonData);
            setFilter(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

//====================================== 

const [rate, setRate] = useState(1);
const [pricePay, setPricePay] = useState(0);
const [currency, setCurrency] = useState('₭');

const [startDate,setStartDate]=useState(new Date());
const [endDate, setEndDate] = useState(() => {
    const initialDate = new Date();
    initialDate.setMonth(initialDate.getMonth()+1);
    return initialDate;
  });


    const [values,setValues]=useState({
        room_id_fk:'',
        rantal_id_fk:'',
        use_detail:'',
        days_to_Pay:'1',
        days_alert_pay:'5',
        currency_id_fk:22001,
        date_rental_stay:startDate,
        date_pay_rental:endDate,
        customer_name:'',
        customer_tel:'',
        email:'',
        card_id:'',
        address:'',
        type_cuts:'1',
        file_doc:'',
        rete_change:'1',
        balance_pays:'',
        balance_default:'0'
    })

    const [row,setRow]=useState({
        roomRent_id:'',
        roomName:'',
        floorName:'',
        priceRoom:'0',
    })

    const handleUseRoom = (item) => {
        setTypePrice(item.priceList);
        setActive(item.roomRent_id);
        setPricePay(item.priceRoom);
        setStatus(2); //====== ສະຖານະຈ່າຍ ຫຼື ປະເພດຈ່າຍ
        setValDate(1); //=========== ຈຳນວນການຈ່າຍ
        setRow({
            roomRent_id:item.roomRent_id,
            roomName:item.roomName,
            floorName:item.floorName,
            priceRoom:item.priceRoom,
        })
        setValues({
            ...values,currency_id_fk:22001,
            rete_change:1,
            balance_pays:item.priceRoom,
            balance_default:item.priceRoom,
            room_id_fk:item.roomRent_id
        })
        setCurrency('₭')
    }

    const dataPrice = typePrice.map(item => ({ label: item.typesName+'/ '+numeral(item.typePrice).format('0,00'), value: item.pricelist_id }));

    const [status,setStatus]=useState(2); //====== ສະຖານະຈ່າຍ ຫຼື ປະເພດຈ່າຍ
    const [valDate,setValDate]=useState(1); //=========== ຈຳນວນການຈ່າຍ
   const handleShowPrice = (pricelistId) => {
        const usePrice = typePrice.find(item => item.pricelist_id === pricelistId);
        if (usePrice) {
            setRow(prevRow => ({
                ...prevRow,
                priceRoom: usePrice.typePrice
            }));
            setValues({
                ...values,rantal_id_fk:usePrice.types_id
            })

            setPricePay(usePrice.typePrice)
            setPricePay(usePrice.typePrice/rate);
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
        }
    };

const handleChange=(name,value)=>{
    setValues({
        ...values,[name]:value
    })
}

  const handleChangeRate = (name, value) => {
    const useRate = itemCurrency.find(item => item.value === value);
    if (useRate) {
      setRate(useRate.rate); // Update the rate state
      setPricePay(row.priceRoom/useRate.rate)
      setCurrency(useRate.genus)
    }
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
      rete_change:useRate.rate,
      balance_pays:row.priceRoom/useRate.rate
    }));
  };

const handleStartDate=(value)=>{
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
   
}
const [selectedType, setSelectedType] = useState(1);
const checkedUse = (type) => {
  setSelectedType(type);
  setValues({
    ...values,type_cuts:type,
})
};
const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(values)
}

    useEffect(() => {
        fetchRoom()
    }, [isearch,startDate])
    return (
        <div id="content" class="app-content p-0">
            <div class="mailbox">

                <div class="mailbox-sidebar">
                    <div class="mailbox-sidebar-header d-flex justify-content-center">
                        <a href='#openRoom' data-bs-toggle="collapse" class="fs-18px me-auto d-block d-lg-none">
                            <i class="fa-solid fa-list"></i> ລາຍການ
                        </a>
                        <h5 className=''> ລາຍການຫ້ອງຫວ່າງ</h5>
                    </div>
                    <div class="mailbox-sidebar-content collapse d-lg-block " id="openRoom">
                        <div data-scrollbar="true" data-height="100%" data-skip-mobile="true">
                            <div class="nav-title p-2">
                                <SelectPicker data={itemFloor} onChange={(e)=>handleRoom(e)} placeholder='ເລືອກຊັ້ນ' block />
                                     </div>
                            <ul class="nav nav-inbox">
                                {itemData.map((item, key) =>
                                    <li key={key} class={item.roomRent_id === active ? 'active' : ''}>
                                        <a href='ajvascrip:;' onClick={() => handleUseRoom(item)}><i class="fa-solid fa-door-open fs-4" /> {item.roomName}</a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
               
                <div class="mailbox-content">
                    <div class="mailbox-content-header">
                        <div class="btn-toolbar">
                            <h5>ເບີຫ້ອງ: {row.roomName} / ຊັ້ນ: {row.floorName}</h5>
                            <div className='ms-auto'>
                                <h5>{numeral(row.priceRoom).format('0,00')} kip</h5>
                            </div>
                        </div>
                    </div>
                    <div class="mailbox-content-body">
                        <div className='p-3' data-scrollbar="true" data-height="100%" data-skip-mobile="true">
                            <div className="row">
                                <div className="col-sm-6 mb-2">
                                    <label htmlFor="" className='form-label'>ປະເພດເຊົ່າ</label>
                                    <SelectPicker data={dataPrice}  onChange={(e)=>handleShowPrice(e)}  block />
                                </div>
                                <div className="col-sm-3 mb-2">
                                    <label htmlFor="" className='form-label'>ວັນທີເຂົ້າພັກ</label>
                                    <DatePicker oneTap format='dd/MM/yyyy'  onChange={(date) => handleStartDate(date)} value={startDate} block  />
                                </div>
                                <div className="col-sm-3 mb-2">
                                    <label htmlFor="" className='form-label'>ວັນທີຕ້ອງຊຳລະ</label>
                                    <DatePicker oneTap format='dd/MM/yyyy' value={endDate} block readOnly />
                                </div>
                                <div className="col-sm-12 mb-2">
                                    <label htmlFor="" className='form-label'>ລາຍລະອຽດອື່ນໆ ກ່ຽວກກັບການເຂົ້າພັກ</label>
                                    <Input as='textarea' onChange={(e)=>handleChange('use_detail',e)} placeholder='ໃສ່ລາຍລະອຽດ...' block />
                                </div>
                            </div>
                            <hr />
                            <div className="row mb-3">
                                <label class="form-label col-form-label col-md-3 text-end ">ປະເພດລູກຄ້າ :</label>
                                <div class="col-md-9 pt-2">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="coustomType1" name="type" onChange={()=>checkedUse(1)}  checked={selectedType === 1}  />
                                        <label class="form-check-label" for="coustomType1">ລູກຄ້າຄົນລາວ</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="coustomType2" name="type" onChange={()=>checkedUse(2)}  checked={selectedType === 2}  />
                                        <label class="form-check-label" for="coustomType2">ລູກຄ້າຕ່າງປະເທດ</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label class="form-label col-form-label col-md-3 text-end">ຊື່ ແລະ ນາມສະກຸນ ລູກຄ້າ:</label>
                                <div className="col-sm-9">
                                    <Input onChange={(e)=>handleChange('customer_name',e)} placeholder='ຊື່ ແລະ ນາມສະກຸນ' block required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label class="form-label col-form-label col-md-3 text-end">ເບີໂທລະສັບ:</label>
                                <div className="col-sm-9">
                                    <Input type='tel' onChange={(e)=>handleChange('customer_tel',e)} placeholder='20 99999999' block />
                                </div>

                            </div>
                            <div className="row mb-3">
                                <label class="form-label col-form-label col-md-3 text-end">Email:</label>
                                <div className="col-sm-9">
                                    <Input onChange={(e)=>handleChange('email',e)} placeholder='*****@gmail.com' block />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label class="form-label col-form-label col-md-3 text-end">ບັດປະຈຳຕົວ, ສຳມະໂນ, ໜັງສືຜ່ານແດນ:</label>
                                <div className="col-sm-7 col-9">
                                    <Input onChange={(e)=>handleChange('card_id',e)} placeholder='*** *** ****' block />
                                </div>
                                <div className="col-sm-2 col-3">
                                    <label className='btn btn-primary fs-14px'> <i class="fa-solid fa-folder-open" /> ໄຟລ໌...</label>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label class="form-label col-form-label col-md-3 text-end">ທີ່ຢູ່ປະຈຸບັນລູກຄ້າ:</label>
                                <div className="col-sm-9">
                                    <Input  as='textarea' onChange={(e)=>handleChange('address',e)} placeholder='ຊື່ບ້ານ...,ຊື່ເມືອງ..,ຊື່ແຂວງ...' block />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-8">
                                    <div className="row mb-3">
                                        <label class="form-label col-form-label col-md-4 text-end">ກຳນົດການຊຳລະເງິນຄ່າເຊົ່າ:</label>
                                        <div className="col-sm-6">
                                            <div class="form-check mt-2 mb-2">
                                                <input class="form-check-input" type="checkbox" value='1' id="flexCheckDefault" />
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    ຕັ້ງຄ່າການຊຳລະເງິນ
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label class="form-label col-form-label col-md-4 text-end">ທຸກໆວັນທີ:</label>
                                        <div className="col-sm-6">
                                            <InputGroup inside >
                                                <Input type='number' onChange={(e)=>handleChange('days_to_Pay',e)} value={values.days_to_Pay} />
                                                <InputGroup.Addon>| ຂອງເດືອນ</InputGroup.Addon>
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label class="form-label col-form-label col-md-4 text-end">ແຈ້ງໃບເກັບໜີ້ລ່ວງໜ້າ:</label>
                                        <div className="col-sm-6">
                                            <InputGroup inside >
                                                <Input type='number' onChange={(e)=>handleChange('days_alert_pay',e)} value={values.days_alert_pay} />
                                                <InputGroup.Addon>| ວັນ ກ່ອນກຳໜົດຊຳລະ</InputGroup.Addon>
                                            </InputGroup>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group col-10">
                                        <label htmlFor="" className='form-label'>ສະກຸນເງິນ {rate}</label>
                                        <InputPicker data={itemCurrency} value={values.currency_id_fk} onChange={(e)=>handleChangeRate('currency_id_fk',e)} placement="autoVerticalStart" block />
                                    </div>
                                    <div className="form-group  bg-dark p-3 mt-3 text-white rounded-4">
                                        <h3>{numeral(pricePay).format('0,00.00')} <span className='fs-18px'>{currency}</span> </h3>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="mailbox-content-footer d-flex py-2">
                        <div class="text-dark fw-bold ">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="checkbox" />
                                <label class="form-check-label" for="checkbox">ຢືນຢັນການເປິດຫ້ອງ</label>
                            </div>
                        </div>
                        <div class="btn-group ms-auto">
                            <button type='button' onClick={handleSubmit} class="btn btn-primary rounded me-2 fs-5">
                                <i class="fa fa-fw fa-save"></i> ບັນທຶກການເປິດຫ້ອງ
                            </button>
                            <button class="btn btn-red rounded fs-5">
                                <i class="fa-solid fa-rotate"></i> ຍົກເລີກ
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
