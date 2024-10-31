import numeral from 'numeral';
import React, { useState, useEffect, useCallback } from 'react'
import { Input, SelectPicker, InputGroup, Button, InputPicker } from 'rsuite';
import { useTypes } from '../../config/select-option';
import { Config } from '../../config/connection';
import PropertyRoom from './add-property-room';
export default function FormAddRoom() {
    const api = Config.urlApi;
    const [ischeck, setIsCheck] = useState(false);
    const handleToggle = () => {
        setIsCheck(prev => !prev);
        if (!ischeck) {
            setRows([])
        }
    };
    const types = useTypes();

    const [rows, setRows] = useState([{ typeId: null, typePrice: '0' }]);

    const [inputs, setInputs] = useState({
        floor_id_fk: '',
        roomName: '',
        priceRoom: '',
        sizeRoom: '',
        roomDetail: '',
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
            rows: rows
        });
    };

    const handlePriceChange = (value, index) => {
        const newRows = [...rows];
        newRows[index].typePrice = value;
        setRows(newRows);
        setInputs({
            ...inputs,
            rows: rows
        });
    };



    const handleSubmit = () => {
        console.log(inputs)
    }
  
    return (
        <>
            <div id="content" class="app-content d-flex flex-column p-0">
                <div class="app-content-padding flex-grow-1 overflow-hidden" data-scrollbar="true" data-height="100%">
                    <ol className="breadcrumb float-end">
                        <li className="breadcrumb-item"><a href="javascript:;">ໜ້າຫຼັກ</a></li>
                        <li className="breadcrumb-item active">ຟອມລົງທະບຽນ</li>
                    </ol>
                    <h1 className="page-header flex-grow-1">ລົງທະບຽນຫ້ອງພັກເຊົ່າ </h1>
                    <div className="row">
                        <div className="col-sm-7">
                            <div className="panel">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-7 mb-2">
                                            <label htmlFor="selectPicker" className='form-label'>ເລືອກຊັ້ນ</label>
                                            <SelectPicker onChange={(e) => handleChange('floor_id_fk', e)} block />
                                        </div>
                                        <div className="col-sm-5 mb-2">
                                            <label htmlFor="" className='form-label'>ເບີຫ້ອງ</label>
                                            <Input onChange={(e) => handleChange('roomName', e)} block />
                                        </div>
                                        <div className="col-sm-7 mb-2">
                                            <label htmlFor="" className='form-label'>ລະຄາ</label>
                                            <InputGroup inside >
                                                <InputGroup.Addon>₭:</InputGroup.Addon>
                                                <Input block onChange={(e) => handleChange('priceRoom', e)} placeholder='0,000' />
                                            </InputGroup>
                                        </div>
                                        <div className="col-sm-5 mb-2">
                                            <label htmlFor="" className='form-label'>ຂະໜາດຫ້ອງ</label>
                                            <Input block onChange={(e) => handleChange('sizeRoom', e)} placeholder='X * Y' />
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <label htmlFor="" className='form-label'>ລາຍລະອຽດ</label>
                                            <Input as='textarea' rows={3} onChange={(e) => handleChange('roomDetail', e)} placeholder='ລາຍລະອຽດ.......' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel">
                                <div class="panel-heading">
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
                                            <thead className='bg-white text-black'>
                                                <tr>
                                                    <td width={'40%'} className='p-1'>ປະເພດ</td>
                                                    <td width={'50%'} className='p-1'>ລາຄາ</td>
                                                    <td width={'10%'} className='text-center p-1'>
                                                        <button onClick={addRow} className='btn btn-xs btn-blue'> <i className="fas fa-plus"></i> </button>
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
                                                            <button onClick={() => removeRow(index)} className="btn btn-xs btn-bps" >
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
                        </div>
                        <div className="col-sm-5">
                            <PropertyRoom />
                        </div>
                    </div>

                </div>
                <div id="footer" class="app-footer border-0 m-0 row">
                    <div className="col-6">
                        <Button appearance="primary" color='red' startIcon={<i class="fa-solid fa-rotate" />} block > ເລີ່ມໃໝ່</Button>
                    </div>
                    <div className="col-6">
                        <Button appearance="primary" onClick={handleSubmit} startIcon={<i class="fa-regular fa-floppy-disk" />} block> ບັນທຶກ</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
