import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Modal, Button, Form, Grid, Row, Col, Input } from 'rsuite'
import { Config } from '../../config/connection';
import axios from 'axios';
import { Notification, Alert } from '../../utils/Notification';
import Swal from 'sweetalert2';
export default function FloorPage() {
    const api = Config.urlApi;
    const [open, setOpen] = React.useState(false);
    const handleOpen = (index) => {
        setOpen(index);
    }
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idBuil = atob(queryParams.get('id'));

    const [inputs, setInputs] = useState({
        floorId: '',
        building_id_fk: idBuil,
        floorName: '',
        floorDetail: '',
    })
    const handleChange = (name, value) => {
        setInputs({
            ...inputs, [name]: value
        })
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const res = await axios.post(api + 'floor/create', inputs);
          if (res.status === 200) {
                fetchRights();
                setOpen(false);
                Notification.success('ການບັນທຶກຂໍ້ມູນສຳເລັດ', 'ແຈ້ງເຕືອນ');
                setInputs({
                    floorId: '',
                    building_id_fk: idBuil,
                    floorName: '',
                    floorDetail: '',
                })
            } else {
                Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
            }
        } catch (error) {
            console.error('Error while saving data:', error);
            Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
        }
    };

    const [itemData, setItemData] = useState([]);
    const fetchRights = async () => {
        try {
            const response = await fetch(api + 'floor/'+idBuil);
            const jsonData = await response.json();
            setItemData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const handleEdit = (item) => {
        setInputs({
            floorId: item.floor_id,
            building_id_fk: idBuil,
            floorName: item.floorName,
            floorDetail: item.floorDetail,
        });
        setOpen(true);
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "ຢືນຢັນ?",
            text: "ທ່ານຕ້ອງການລົບຂໍ້ມູນນີ້ແທ້ບໍ່!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ລົບ",
            cancelButtonColor: "#d33",
            cancelButtonText: "ບໍ່ລົບ",
            width: 350,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(api + `floor/${id}`).then(function (resp) {
                    if (resp.status === 200) {
                        fetchRights();
                        Alert.successData(resp.data.message);
                    }
                })
                    .catch((error) => {  // Fixed the syntax error here
                        Alert.errorData('ບໍ່ສາມາດລົບຂໍ້ມູນນີ້ໄດ້', error);
                    });
            }
        });
    }
        const handleRoom=()=>{
            
        }

    useEffect(() => {
        fetchRights()
    }, [])

    return (
        <div id="content" class="app-content px-2">
        <ol className="breadcrumb float-end">
          <li className="breadcrumb-item"><a href="javascript:;">ໜ້າຫຼັກ</a></li>
          <li className="breadcrumb-item active">ລາຍການຊັ້ນຂອງອາຄານ</li>
        </ol>
        <h1 className="page-header ">ຂໍ້ມູນຊັ້ນຂອງອາຄານ </h1>
        <div class="panel">
              <div class="panel-heading bg-white  ui-sortable-handle">
                <h3 class="panel-title fs-18px">ລາຍການຊັ້ນຂອງອາຄານເຊົ່າ</h3>
                <div class="panel-heading-btn">
                  <button type='button' onClick={() => handleOpen(true)} class="btn btn-bps fs-14px" ><i class="fas fa-plus" /> ເພີ່ມຂໍ້ມູນ</button>
                </div>
              </div>
              <div class="panel-body">
                <div className="table-responsive">
                  <table class="table table-striped table-bordered align-middle text-nowrap">
                    <thead className='thead-bps'>
                      <tr>
                        <th class="text-center" width="1%">ລ/ດ</th>
                        <th class="text-center" width='15%'>ລະຫັດ</th>
                        <th class="">ຊື່ຊັ້ນ</th>
                        <th class="">ລາຍລະອຽດ</th>
                        <th class="text-center" width='10%'>ຫ້ອງ</th>
                        <th class="text-center" width='10%'>ຕັ້ງຄ່າ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        itemData.map((item, index) =>
                          <tr>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center'>{item.floorCode}</td>
                            <td>{item.floorName}</td>
                            <td>{item.floorDetail}</td>
                            <td className='text-center'>
                            <button type='button' onClick={() => handleRoom(item.floor_id)} className='btn btn-xs btn-green me-2'> <i class="fa-solid fa-sliders"></i> {item.qtyRoom} ຫ້ອງ</button></td>
                            <td className='text-center'>
                              <button type='button' onClick={() => handleEdit(item)} className='btn btn-xs btn-blue me-2'><i class="fa-solid fa-pen-to-square" /></button>
                              <button type='button' onClick={() => handleDelete(item.floor_id)} className='btn btn-xs btn-danger'><i class="fa-solid fa-trash" /></button>

                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
              
            <Modal open={open} onClose={() => handleOpen(false)}>
                <Modal.Header>
                    <Modal.Title className='py-1'>ຂໍ້ມູນຊັ້ນ</Modal.Title>
                </Modal.Header>
                <form  onSubmit={handleSubmit}>
                    <Modal.Body>
                    <Form fluid>
                        <Grid fluid>
                            <Row>
                                <Col xs={24} className='mb-2'>
                                    <Form.Group controlId="name">
                                        <Form.ControlLabel>ຊື່ຊັ້ນ</Form.ControlLabel>
                                        <Form.Control value={inputs.floorName} onChange={(e) => handleChange('floorName', e)} placeholder='ຊື່ຊັ້ນ' required />
                                    </Form.Group>
                                </Col>
                                <Col xs={24}  className='mb-2'>
                                    <Form.Group controlId="name">
                                        <Form.ControlLabel>ລາຍລະອຽດ</Form.ControlLabel>
                                        <Input as='textarea' value={inputs.floorDetail} onChange={(e) => handleChange('floorDetail', e)} placeholder='ລາຍລະອຽດ...' />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Grid>
                </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type='submit' appearance="primary"> ບັນທຶກ</Button>
                        <Button color='red' onClick={() => handleOpen(false)} appearance="primary">
                            ຍົກເລີກ
                        </Button>
                    </Modal.Footer>
                    </form>
            </Modal>
        </div>
    )
}
