import React, { useState, useEffect } from 'react'
import { Input, InputGroup, Button, SelectPicker, Modal } from 'rsuite';
import { useBuilding } from '../../config/select-option';
import { Config } from '../../config/connection';
import axios from 'axios';
import { Notification, Alert } from '../../utils/Notification';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import numeral from 'numeral';
function ConfigureService() {
  const api = Config.urlApi;
  const itemBuilding = useBuilding();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleNew = () => {
    setOpen(true);
    setInputs({
      serviceId: '',
      service_name: '',
      service_price: '',
      service_remark: '',
      building_id_fk: ''
    })
  }


  const [inputs, setInputs] = useState({
    serviceId: '',
    service_name: '',
    service_price: '',
    service_remark: '',
    building_id_fk: ''
  })
  const handleChange = (name, value) => {
    setInputs({
      ...inputs, [name]: value
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      axios.post(api + 'service/create', inputs)
        .then(function (res) {
          if (res.status === 200) {
            fetchService();
            setOpen(false);
            Notification.success('ການບັນທຶກຂໍ້ມູນສຳເລັດ', 'ແຈ້ງເຕືອນ');
          } else {
            Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
          }
        })
    } catch (error) {
      Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
    }
  }
  const [itemData, setItemData] = useState([]);
  const fetchService = async () => {
    try {
      const response = await fetch(api + 'service/');
      const jsonData = await response.json();
      setItemData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const handleEdit = (item) => {
    setInputs({
      serviceId: item.service_id,
      service_name: item.service_name,
      service_price: item.service_price,
      service_remark: item.service_remark,
      building_id_fk: item.building_id_fk
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
        axios.delete(api + `service/${id}`).then(function (resp) {
          if (resp.status === 200) {
            fetchService();
            Alert.successData(resp.data.message);
          }
        })
          .catch((error) => {  // Fixed the syntax error here
            Alert.errorData('ບໍ່ສາມາດລົບຂໍ້ມູນນີ້ໄດ້', error);
          });
      }
    });
  }

  useEffect(() => {
    fetchService()
  }, [])

  return (
    <>
      <div id="content" className="app-content">
        <ol className="breadcrumb float-end">
          <li className="breadcrumb-item"><a href="javascript:;">ໜ້າຫຼັກ</a></li>
          <li className="breadcrumb-item active">ລາຍການບໍລິການເຊົ່າ</li>
        </ol>
        <h1 className="page-header ">ຂໍ້ມູນລາຍການບໍລິການເຊົ່າ </h1>
        <div class="panel">
          <div class="panel-heading bg-white  ui-sortable-handle">
            <h3 class="panel-title fs-18px">ລາຍການບໍລິການເຊົ່າ</h3>
            <div class="panel-heading-btn">
              <button type='button' onClick={() => handleNew(true)} class="btn btn-bps fs-14px" ><i class="fas fa-plus" /> ເພີ່ມຂໍ້ມູນ</button>
            </div>
          </div>
          <div class="panel-body">
            <div className="table-responsive">
              <table class="table table-striped table-bordered align-middle text-nowrap">
                <thead className='thead-bps'>
                  <tr>
                    <th class="text-center" width="1%">ລ/ດ</th>
                    <th class="">ອາຄານ</th>
                    <th class="">ຊື່ລາຍການ</th>
                    <th class="text-end">ລາຄາ</th>
                    <th class="text-center">ລາຍລະອຽດ</th>
                    <th class="text-center">ຕັ້ງຄ່າ</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    itemData.length >0 ?(
                    itemData.map((item, index) =>
                      <tr>
                        <td className='text-center'>{index + 1}</td>
                        <td>{item.buildingName}</td>
                        <td>{item.service_name}</td>
                        <td className='text-end'>{numeral(item.service_price).format('0,00')}</td>
                        <td>{item.service_remark}</td>
                        <td className='text-center'>
                          <button type='button' onClick={() => handleEdit(item)} className='btn btn-xs btn-blue me-2'><i class="fa-solid fa-pen-to-square" /></button>
                          <button type='button' onClick={() => handleDelete(item.service_id)} className='btn btn-xs btn-danger'><i class="fa-solid fa-trash" /></button>
                        </td>
                      </tr>
                    )
                  ):(
                    <tr>
                      <td colSpan={6} className='text-center text-red'>ບໍ່ມີການບັນທຶກຂໍ້ມູນ</td>
                    </tr>
                  )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Modal overflow={true} open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title className='py-1'>ເພີ່ມລາຍການບໍລິການ</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div class="row">
                <div className="form-group  mb-2">
                  <label htmlFor="province" className='form-label'>ອາຄານ</label>
                  <SelectPicker data={itemBuilding} value={inputs.building_id_fk} onChange={(e) => handleChange('building_id_fk', e)} block />
                </div>

                <div className="form-group mb-2">
                  <label htmlFor="" className='form-label'>ຊື່ລາຍການ</label>
                  <Input value={inputs.service_name} onChange={(e) => handleChange('service_name', e)} />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="" className='form-label'>ລາຄາ</label>
                  <Input value={numeral(inputs.service_price).format('0,00')} onChange={(e) => handleChange('service_price', e)} />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="" className='form-label'>ລາຍລະອຽດ</label>
                  <Input as="textarea" value={inputs.service_remark} onChange={(e) => handleChange('service_remark', e)} />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button type='submit' appearance="primary"> ບັນທຶກ </Button>
              <Button onClick={handleClose} appearance="primary" color='red'> ຍົກເລີກ</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </>
  )
}

export default ConfigureService;