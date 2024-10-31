import React, { useState, useEffect } from 'react'
import { Input, InputGroup, Button, SelectPicker, Modal } from 'rsuite';
import { useProvince } from '../../config/select-option';
import { Config } from '../../config/connection';
import axios from 'axios';
import { Notification, Alert } from '../../utils/Notification';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
export default function BuildingPage() {
  const api = Config.urlApi;
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleNew=()=>{
    setOpen(true);
    setInputs({
      buildingId: '',
      buildingName: '',
      district_id_fk: '',
      villageName: '',
      buildingTel: '',
      statusUse: 1,
      building_detail:'',
      province_fk: ''
    })
  }

  const itemPorvint = useProvince();
  const [itempv, setItempv] = useState([]);
  const showProvince = async (value) => {
    try {
      const response = await fetch(api + 'district/pv/' + value);
      const jsonData = await response.json();
      console.log(jsonData);
      setItempv(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const datadis = itempv.map(item => ({ label: item.districtName, value: item.district_id }));

  const [inputs, setInputs] = useState({
    buildingId: '',
    buildingName: '',
    district_id_fk: '',
    villageName: '',
    buildingTel: '',
    statusUse: 1,
    building_detail:'',
    province_fk: ''
  })
  const handleChange = (name, value) => {
    setInputs({
      ...inputs, [name]: value
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      axios.post(api + 'building/create', inputs)
        .then(function (res) {
          if (res.status === 200) {
            fetchBuilding();
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
  const fetchBuilding = async () => {
    try {
      const response = await fetch(api + 'building/');
      const jsonData = await response.json();
      setItemData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const handleEdit = (item) => {
    setInputs({
      buildingId: item.building_id,
      buildingName: item.buildingName,
      district_id_fk: item.district_id_fk,
      villageName: item.villageName,
      buildingTel: item.buildingTel,
      building_detail:item.building_detail,
      province_fk: item.province_fk
    });
    showProvince(item.province_fk);
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
        axios.delete(api + `building/${id}`).then(function (resp) {
          if (resp.status === 200) {
            fetchBuilding();
            Alert.successData(resp.data.message);
          }
        })
          .catch((error) => {  // Fixed the syntax error here
            Alert.errorData('ບໍ່ສາມາດລົບຂໍ້ມູນນີ້ໄດ້', error);
          });
      }
    });
  }
  const navigate=useNavigate()
const handleFloor=(id)=>{
  navigate(`/floor?id=${btoa(id)}`);
}

  useEffect(() => {
    fetchBuilding()
  }, [])

  return (
    <>
      <div id="content" className="app-content">
        <ol className="breadcrumb float-end">
          <li className="breadcrumb-item"><a href="javascript:;">ໜ້າຫຼັກ</a></li>
          <li className="breadcrumb-item active">ລາຍການອາຄານເຊົ່າ</li>
        </ol>
        <h1 className="page-header ">ຂໍ້ມູນອາຄານເຊົ່າ </h1>
            <div class="panel">
              <div class="panel-heading bg-white  ui-sortable-handle">
                <h3 class="panel-title fs-18px">ລາຍການອາຄານເຊົ່າ</h3>
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
                        <th class="text-center">ລະຫັດ</th>
                        <th class="">ຊື່ອາຄານ</th>
                        <th class="">ເບີໂທລະສັບ</th>
                        <th class="text-center" colSpan={3}>ທີ່ຢູ່ປະຈຸບັນ</th>
                        <th class="">ລາຍລະອຽດ</th>
                        <th class="text-center">ຊັ້ນ</th>
                        <th class="text-center">ຕັ້ງຄ່າ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        itemData.map((item, index) =>
                          <tr>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center'>{item.buildingCode}</td>
                            <td>{item.buildingName}</td>
                            <td>{item.buildingTel}</td>
                            <td>{item.villageName}</td>
                            <td>{item.districtName}</td>
                            <td>{item.provinceName}</td>
                            <td>{item.building_detail}</td>
                            <td className='text-center'>
                            <button type='button' onClick={() => handleFloor(item.building_id)} className='btn btn-xs btn-green me-2'> <i class="fa-solid fa-layer-group"></i> {item.qtyFloor} ຊັ້ນ</button></td>
                            <td className='text-center'>
                              <button type='button' onClick={() => handleEdit(item)} className='btn btn-xs btn-blue me-2'><i class="fa-solid fa-pen-to-square" /></button>
                              <button type='button' onClick={() => handleDelete(item.building_id)} className='btn btn-xs btn-danger'><i class="fa-solid fa-trash" /></button>

                            </td>
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
            <Modal.Title className='py-1'>ເພີ່ມອາຄານ</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div class="row">
              <div className="form-group  mb-2">
                <label htmlFor="" className='form-label'>ຊື່ອາຄານ</label>
                <InputGroup inside>
                <InputGroup.Addon><i class="fa-solid fa-home" /></InputGroup.Addon>
                <Input value={inputs.buildingName} onChange={(e) => handleChange('buildingName', e)} placeholder="ຊື່ອາຄານ" required />
              </InputGroup>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="" className='form-label'>ເບີໂທລະສັບ</label>
                <InputGroup inside>
                  <InputGroup.Addon><i class="fa-solid fa-phone" /></InputGroup.Addon>
                  <Input value={inputs.buildingTel} onChange={(e) => handleChange('buildingTel', e)} placeholder="020 9999 9999" required />
                </InputGroup>
              </div>
              <div className="form-group col-6 mb-2">
                <label htmlFor="province" className='form-label'>ແຂວງ</label>
                <SelectPicker data={itemPorvint} defaultValue={inputs.province_fk} onChange={(e) => showProvince(e)} block />
              </div>
              <div className="form-group col-6 mb-2">
                <label htmlFor="" className='form-label'>ເມື່ອງ</label>
                <SelectPicker block data={datadis} value={inputs.district_id_fk} onChange={(e) => handleChange('district_id_fk', e)} />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="" className='form-label'>ບ້ານ</label>
                <Input value={inputs.villageName} onChange={(e) => handleChange('villageName', e)} />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="" className='form-label'>ລາຍລະອຽດ</label>
                <Input as="textarea" value={inputs.building_detail} onChange={(e) => handleChange('building_detail', e)} />
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
