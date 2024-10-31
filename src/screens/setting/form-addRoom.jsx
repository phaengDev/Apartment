import numeral from 'numeral';
import React, { useState, useEffect } from 'react'
import { Input, SelectPicker, InputGroup, Button, InputPicker, Modal } from 'rsuite';
import { useTypes,useBuilding } from '../../config/select-option';
import { Config } from '../../config/connection';
import axios from 'axios';
import { Notification } from '../../utils/Notification';
const FormAddRoom = ({ open, handleClose,fetchRoom ,item}) => {
    const api = Config.urlApi;
    const [ischeck, setIsCheck] = useState(false);
    const handleToggle = () => {
        setIsCheck(prev => !prev);
        if (!ischeck) {
            setRows([])
        }
    };
    const buildingId=localStorage.getItem('buildingId');

    const types = useTypes();
    const builbing = useBuilding();
    const [rows, setRows] = useState([{ typeId: null, typePrice: '0' }]);

    const [inputs, setInputs] = useState({
        roomRentId:'',
        building_Id:buildingId,
        floor_id_fk: '',
        roomName: '',
        priceRoom: '',
        sizeRoom: '',
        roomDetail: '',
        rental_id_fk:2,
        prices:[]
    })

    const handleChange = (name, value) => {
        setInputs({
            ...inputs, [name]: value
        })
    }

    const addRow = () => {
        setRows([...rows, { typeId: null, typePrice: '' }]);
    };

    const removeRow = (index) => {
        if (rows.length > 1) {
            setRows(rows.filter((_, i) => i !== index));
        }
    };

    const handleTypeChange = (value, index) => {
        const newRows = [...rows];
        newRows[index].typeId = value;
        setRows(newRows);
        setInputs({
            ...inputs,
            prices: rows
        });
    };

    const handlePriceChange = (value, index) => {
        const newRows = [...rows];
        newRows[index].typePrice = value;
        setRows(newRows);
        setInputs({
            ...inputs,
            prices: rows
        });
    };

    //=================
    const [building_Id,setBuilding_Id]=useState(buildingId)
    const [itemFloor, setItemFloor] = useState([]);
    const showFloor = async () => {
        try {
          const response = await fetch(api + 'floor/'+building_Id);
          const jsonData = await response.json();
          setItemFloor(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      const dataFloor = itemFloor.map(item => ({ label: item.floorName, value: item.floor_id }));

      const handleShowfloor=(name,value)=>{
        setBuilding_Id(value)
        setInputs({
            ...inputs,[name]: value
        });
      }
//===================
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const res = await axios.post(api + 'room/create', inputs);
        if (res.status === 200) {
            Notification.success('ການບັນທຶກຂໍ້ມູນສຳເລັດ', 'ແຈ້ງເຕືອນ');
            setInputs({
                roomRentId: '',
                floor_id_fk: '',
                building_Id:buildingId,
                roomName: '',
                priceRoom: '',
                roomDetail: '',
                sizeRoom: '',
                rental_id_fk:2,
            })
            setRows([])
            fetchRoom()
            handleClose();
        } else {
            Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
        }
    } catch (error) {
        console.error('Error while saving data:', error);
        Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
    }
    }
    useEffect(()=>{
        showFloor();
        if(item!== null){
            setInputs({
            roomRentId:item.roomRent_id,
            building_Id:buildingId,
            floor_id_fk: item.floor_id_fk,
            roomName: item.roomName,
            priceRoom: item.priceRoom,
            sizeRoom: item.sizeRoom,
            roomDetail: item.roomDetail,
            rental_id_fk:2,
            prices:[]
            })
        }
    },[building_Id,item])
    return (
        <>
            <Modal open={open} size={'md'} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title className='py-1'>ລົງທະບຽນຫ້ອງພັກເຊົ່າ </Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit} >
                    <Modal.Body className=''>
                        <div className="panel bg-default">
                            <div className="panel-body">
                                <div className="row">
                                <div className="col-sm-12 mb-2">
                                        <label htmlFor="selectPicker" className='form-label'>ອາຄານເຊົ່າ </label>
                                        <SelectPicker data={builbing} value={building_Id} onChange={(e) => handleShowfloor('building_Id',e)} block />
                                    </div>
                                    <div className="col-sm-7 mb-2">
                                        <label htmlFor="floor_id_fk" className='form-label'>ເລືອກຊັ້ນ</label>
                                        <SelectPicker data={dataFloor} value={inputs.floor_id_fk} onChange={(e) => handleChange('floor_id_fk', e)} block />
                                    </div>
                                    <div className="col-sm-5 mb-2">
                                        <label htmlFor="" className='form-label'>ເບີຫ້ອງ</label>
                                        <Input value={inputs.roomName} onChange={(e) => handleChange('roomName', e)} placeholder='A-0001' block />
                                    </div>
                                    <div className="col-sm-7 mb-2">
                                        <label htmlFor="" className='form-label'>ລະຄາ</label>
                                        <InputGroup inside >
                                            <InputGroup.Addon>₭:</InputGroup.Addon>
                                            <Input block value={numeral(inputs.priceRoom).format('0,00')} onChange={(e) => handleChange('priceRoom', e)} placeholder='0,000' />
                                        </InputGroup>
                                    </div>
                                    <div className="col-sm-5 mb-2">
                                        <label htmlFor="" className='form-label'>ຂະໜາດຫ້ອງ</label>
                                        <Input block value={inputs.sizeRoom} onChange={(e) => handleChange('sizeRoom', e)} placeholder='X * Y' />
                                    </div>
                                    <div className="col-sm-12 mb-2">
                                        <label htmlFor="" className='form-label'>ລາຍລະອຽດ</label>
                                        <Input as='textarea' value={inputs.roomDetail} rows={3} onChange={(e) => handleChange('roomDetail', e)} placeholder='ລາຍລະອຽດ.......' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {item===null &&(
                        <div className="panel bg-default">
                            <div class="panel-heading ">
                                <h4 class="panel-title fs-18px">ລາຍລະອຽດລາຄາ</h4>
                                <div class="panel-heading-btn">
                                    <div className="form-check form-switch mb-2">
                                        <input className="form-check-input" type="checkbox" checked={ischeck} onChange={handleToggle} />
                                    </div>

                                </div>
                            </div>
                            {ischeck && (
                                <div className="panel-body">
                                    <table width={'100%'}>
                                        <thead className='text-white'>
                                            <tr>
                                                <td width={'40%'} className='p-1'>ປະເພດ</td>
                                                <td width={'50%'} className='p-1'>ລາຄາ</td>
                                                <td width={'1%'} className='text-center p-1'>
                                                    <button type='button' onClick={addRow} className='btn btn-xs btn-white'> <i className="fas fa-plus"></i> </button>
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows.map((row, index) => (
                                                <tr key={index}>
                                                    <td className="p-1">
                                                        <InputPicker data={types} placement={'autoVerticalStart'} value={row.typeId} onChange={(value) => handleTypeChange(value, index)} />
                                                    </td>
                                                    <td className="p-1">
                                                        <Input placeholder="0,00" value={numeral(row.typePrice).format('0,00')} onChange={(value) => handlePriceChange(value, index)} />
                                                    </td>
                                                    <td className="p-1 text-center">
                                                        <button type='button' onClick={() => removeRow(index)} className="btn btn-xs btn-bps" >
                                                            <i className="fa-solid fa-trash" />
                                                        </button>

                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type='submit' appearance="primary">ບັນທຶກ</Button>
                        <Button type='button' color='red' onClick={handleClose} appearance="primary"> ຍົກເລີກ</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}
export default FormAddRoom;