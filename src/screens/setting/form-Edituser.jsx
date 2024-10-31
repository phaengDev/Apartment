import React, { useState, useEffect } from 'react'
import { Modal, SelectPicker, Input, Button, InputGroup } from 'rsuite';
import { useBuilding } from '../../config/select-option';
import axios from 'axios';
import { Notification } from '../../utils/Notification';
import { Config } from '../../config/connection';
const FormEdituser = ({ item, open, handleClose,fetchStaff }) => {
    const api = Config.urlApi;
    const building = useBuilding();
    const [values, setValues] = useState({});
    const [visible, setVisible] = useState(false);
    const typeUser = [{
        label: 'Admin All', value: 1
      }, {
        label: 'Admin', value: 2
      }, {
        label: 'User', value: 3
      }]
      const statusUse = [{
        label: 'ເປິດໃຊ້ງານ', value: 1
      }, {
        label: 'ປິດໃຊ້ງານ', value: 2
      }]
    const handleChanges = (name, value) => {
        setValues({
            ...values, [name]: value
        });
    }

    const handleShow = () => {
        setVisible(!visible);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(values)
        try {
          axios.post(api + 'staff/edituse', values)
            .then(function (res) {
              if (res.status === 200) {
                fetchStaff()
                handleClose()
                Notification.success('ການບັນທຶກຂໍ້ມູນສຳເລັດ', 'ແຈ້ງເຕືອນ');
              }
            })
        } catch (error) {
          Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
        }
      }


    useEffect(() => {
        setValues({
            staffId: item?.staff_id,
            building_id_fk: item?.building_id_fk,
            typeUser: item?.typeUser,
            userPassword: '',
            userEmail: item?.userEmail,
            statusUse:item?.statusUse
        });
    }, [item]);

    return (
        <Modal open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title className='py-1'>ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit} >
            <Modal.Body className='row'>
                <div className="form-group mb-2">
                    <label htmlFor="" className='form-label'>ຊື່ຜູ້ໃຊ້ <span className='text-red'>*</span></label>
                    <InputGroup inside>
                        <InputGroup.Addon><i className="fa-solid fa-envelope" /></InputGroup.Addon>
                        <Input value={values.userEmail} onChange={(e) => handleChanges('userEmail', e)} placeholder="****@gmail.com" />
                    </InputGroup>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="" className='form-label'>ລະຫັດຜ່ານ <span className='text-red'>*</span></label>
                    <InputGroup inside>
                        <Input type={visible ? 'text' : 'password'} onChange={(e) => handleChanges('userPasswerd', e)} placeholder='*******' required />
                        <InputGroup.Button onClick={handleShow}>
                            {visible ? <i className="fa-solid fa-eye" /> : <i className="fa-solid fa-eye-slash" />}
                        </InputGroup.Button>
                    </InputGroup>
                </div>
                <div className="form-group mb-2 ">
                    <label htmlFor="" className='form-label'>ອາພາດເມັນ</label>
                    <SelectPicker data={building} value={values.building_id_fk} onChange={(e) => handleChanges('building_id_fk', e)} block />
                </div>
                <div className="form-group mb-2 col-6">
                    <label htmlFor="" className='form-label'>ສະຖານະ</label>
                    <SelectPicker data={typeUser} value={values.typeUser} onChange={(e) => handleChanges('typeUser', e)} block />
                </div>
                <div className="form-group mb-2 col-6">
                    <label htmlFor="" className='form-label'>ສະຖານະ</label>
                    <SelectPicker data={statusUse} value={values.statusUse} onChange={(e) => handleChanges('statusUse', e)} block />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button type='submit' appearance="primary"> ບັນທຶກ</Button>
                <Button onClick={handleClose} appearance="subtle">
                    Cancel
                </Button>
            </Modal.Footer>
            </form>
        </Modal>
    )
}

export default FormEdituser;
