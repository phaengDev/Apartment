import React, { useState, useEffect } from 'react'
import { Input, InputGroup, Button, SelectPicker, Placeholder, Loader, Modal } from 'rsuite';
import { useBuilding } from '../../config/select-option';
import axios from 'axios';
import { Notification, Alert } from '../../utils/Notification';
import { Config, Urlimage } from '../../config/connection';
import FormEdituser from './form-Edituser';
import Swal from 'sweetalert2';
export default function StaffPages() {
  const api = Config.urlApi;
  const url = Urlimage.url;
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const openForm = (index) => {
    setEdit(true)
    setOpen(index)
  }
  const typeUser = [{
    label: 'Admin All', value: 1
  }, {
    label: 'Admin', value: 2
  }, {
    label: 'User', value: 3
  }]


  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('/assets/img/icon/user.jpg');
  const building = useBuilding();

  const handleQrChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setInputs({
        ...inputs, profile: file
      })
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClearImage = () => {
    setSelectedFile(null);
    setImageUrl('/assets/img/icon/user.jpg')
    document.getElementById('fileInput').value = '';
    setInputs({
      ...inputs, profile: ''
    })
  };

  const [edit, setEdit] = useState(false);

  const [visible, setVisible] = React.useState(false);
  const handleShow = () => {
    setVisible(!visible);
  };
  const [inputs, setInputs] = useState({
    staffId: '',
    building_id_fk: '',
    userEmail: '',
    userPassword: '',
    profile: '',
    firstName: '',
    lastName: '',
    Age: '0',
    telMobile: '',
    address: '',
    typeUser: 1,
  })
  const handleChange = (name, value) => {
    setInputs({
      ...inputs, [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imputData = new FormData();
    for (const key in inputs) {
      imputData.append(key, inputs[key])
    }
    try {
      axios.post(api + 'staff/create', imputData)
        .then(function (res) {
          if (res.status === 200) {
            fetchStaff()
            setOpen(false);
            setEdit(false)
            Notification.success('ການບັນທຶກຂໍ້ມູນສຳເລັດ', 'ແຈ້ງເຕືອນ');
          } else {
            Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
          }
        })
    } catch (error) {
      Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
    }
  }
  const [isLoading, setLoading] = useState(true);
  const [itemData, setItemData] = useState([]);
  const fetchStaff = async () => {
    try {
      const response = await fetch(api + 'staff/');
      const jsonData = await response.json();
      setItemData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (item) => {
    setInputs({
      staffId: item.staff_id,
      building_id_fk: item.building_id_fk,
      profile: '',
      firstName: item.firstName,
      lastName: item.lastName,
      Age: item.Age,
      telMobile: item.telMobile,
      address: item.address,
      typeUser: item.typeUser,
      userPassword: '',
      userEmail: '',
    });
    setOpen(true);
    setEdit(false)
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "ຢືນຢັນ?",
      text: "ທ່ານຕ້ອງການລົບຂໍ້ມູນນີ້ແທ້ບໍ່!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "ຕົກລົງ",
      cancelButtonColor: "#d33",
      cancelButtonText: "ບໍ່ລົບ",
      width: 350,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(api + `staff/${id}`).then(function (resp) {
          if (resp.status === 200) {
            fetchStaff();
            Alert.successData(resp.data.message);
          }
        })
          .catch((error) => {
            Alert.errorData('ບໍ່ສາມາດລົບຂໍ້ມູນນີ້ໄດ້', error);
          });
      }
    });
  }


  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleEditPass = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  }
  const handleClosed = () => {
    setModalOpen(false);
    setSelectedItem(null);
  }

  useEffect(() => {
    fetchStaff()
  }, [])


  return (
    <div id="content" className="app-content">
      <div className="row">
        <div className='col-sm-12 col-lg-12'>
          <div class="panel">
            <div class="panel-heading bg-white  ui-sortable-handle">
              <h3 class="panel-title fs-18px">ຂໍ້ມູນພະນັກງານ</h3>
              <div class="panel-heading-btn">
                <button type='button' onClick={() => openForm(true)} class="btn btn-bps fs-14px" ><i class="fas fa-plus" /> ເພີ່ມຂໍ້ມູນ</button>
              </div>
            </div>
            <div class="panel-body">
              <div class="d-lg-flex align-items-center mb-2">
                <div class="d-lg-flex d-none align-items-center text-nowrap">
                  ສະແດງ:
                  <select class="form-select form-select-sm ms-2 ">
                    <option>100</option>
                    <option>250</option>
                    <option >000</option>
                  </select>
                </div>
                <div class="d-lg-block d-none ms-2 text-body text-opacity-50">
                  ລາຍການ
                </div>
                <div class="pagination mb-0 ms-auto justify-content-center">
                  <InputGroup inside>
                    <InputGroup.Addon><i class="fa-solid fa-search" /></InputGroup.Addon>
                    <Input placeholder='ຄົ້ນຫາ...' />
                  </InputGroup>
                </div>
              </div>
              <div className="table-responsive">
                <table class="table table-striped table-bordered align-middle text-nowrap">
                  <thead className='thead-bps'>
                    <tr>
                      <th class="text-center" width="1%">ລ/ດ</th>
                      <th class="text-center">ໂປຣໄຟລ໌</th>
                      <th class="text-center">ລະຫັດ</th>
                      <th class="">ຊື່ ແລະ ນາມສະກຸນ</th>
                      <th class="text-center">ອາຍຸ</th>
                      <th class="">ເບີໂທລະສັບ</th>
                      <th class="">ທີ່ຢູ່ປະຈຸບັນ</th>
                      <th class="">ອາພາດເມັນ</th>
                      <th class="">ຂໍ້ມູນເຂົ້າລະບົບ</th>
                      <th class="text-center">ຕັ້ງຄ່າ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading === true ? (
                      <tr>
                        <td colSpan={12} className='text-center'>
                          <Placeholder.Grid rows={5} columns={6} active />
                          <Loader size='lg' center content="loading" />
                        </td>
                      </tr>
                    ) : (
                      <>
                        {itemData.length > 0 ? (
                          itemData.map((item, key) =>
                            <tr key={key}>
                              <td className='text-center'>{key + 1}</td>
                              <td className='text-center'>
                                <img src={item.profile === '' ? 'assets/img/icon/user.png' : url + 'porfile/' + item.profile} class="rounded h-30px" />
                              </td>
                              <td className='text-center'>{item.staffCode}</td>
                              <td className=''>{item.firstName + '' + item.lastName}</td>
                              <td className='text-center'>{item.Age}</td>
                              <td className=''>{item.telMobile}</td>
                              <td className=''>{item.address}</td>
                              <td className=''>{item.buildingName}</td>
                              {/* <td className='text-center'>{item.typeUser===1 ? 'Admin All':item.typeUser===2 ?'Admin':'User'} </td> */}
                              <td className='text-blue' onClick={() => handleEditPass(item)} role='button'><i class="fa-solid fa-user-lock"></i> ຜູ້ເຂົ້າໃຊ້</td>
                              <td className='text-center'>
                                <button type='button' onClick={() => handleEdit(item)} className='btn btn-xs btn-blue me-2'><i class="fa-solid fa-pen-to-square" /></button>
                                <button type='button' onClick={() => handleDelete(item.staff_id)} className='btn btn-xs btn-danger'><i class="fa-solid fa-trash" /></button>

                              </td>
                            </tr>
                          )) : (
                          <tr>
                            <td colSpan={12} className='text-center text-red'>ບໍ່ພົບຂໍ້ມູນທີ່ມີການບັນທຶກ</td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title className='py-1'>ຂໍ້ມູນພະນັກງານ</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit} >
          <Modal.Body className='px-0'>
            <div class="panel rounded-top-3 border border-red">
              <div class="panel-heading bg-bps  ui-sortable-handle">
                <h4 class="panel-title text-white fs-16px"> <i class="fa-solid fa-user" /> ຂໍ້​ມູນ​ສ່ວນ​ຕົວ</h4>
              </div>
              <div class="panel-body row">
                <div class="text-center position-relative">
                  <label role='button'>
                    <input type="file" id="fileInput" onChange={handleQrChange} accept="image/*" className='hide' />
                    <img src={imageUrl} class="w-150px rounded-3" />
                  </label>
                  {selectedFile && (
                    <span role='button' onClick={handleClearImage} class=" d-flex align-items-center justify-content-center badge bg-danger text-white position-absolute end-40 top-0 rounded-pill mt-n2 me-n5"><i class="fa-solid fa-xmark"></i></span>
                  )}
                </div>
                <div className="form-group mb-2 ">
                  <label htmlFor="" className='form-label'>ຊື່ພະນັກງານ</label>
                  <Input value={inputs.firstName} onChange={(e) => handleChange('firstName', e)} placeholder="ຊື່ພະນັກງານ" required />
                </div>
                <div className="form-group col-sm-8 mb-2">
                  <label htmlFor="" className='form-label'>ນາມສະກຸນ</label>
                  <Input value={inputs.lastName} onChange={(e) => handleChange('lastName', e)} placeholder="ນາມສະກຸນ" required />
                </div>
                <div className="form-group col-sm-4 mb-2">
                  <label htmlFor="" className='form-label'>ອາຍຸ</label>
                  <Input type='number' value={inputs.age} onChange={(e) => handleChange('age', e)} placeholder="ອາຍຸ" />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="" className='form-label'>ເບີໂທລະສັບ</label>
                  <InputGroup inside>
                    <InputGroup.Addon><i class="fa-solid fa-phone" /></InputGroup.Addon>
                    <Input value={inputs.telMobile} onChange={(e) => handleChange('telMobile', e)} placeholder="020 9999 9999" required />
                  </InputGroup>
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="" className='form-label'>ທີ່ຢູ່ປະຈຸບັນ</label>
                  <Input as="textarea" value={inputs.address} onChange={(e) => handleChange('address', e)} required />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="" className='form-label'>ອາພາດເມັນ</label>
                  <SelectPicker data={building} onChange={(e) => handleChange('building_id_fk', e)} block />
                </div>
              </div>
            </div>
            {edit && (
              <div class="panel border border-red">
                <div class="panel-heading bg-bps  ui-sortable-handle">
                  <h4 class="panel-title text-white fs-14px"><i class="fa-solid fa-id-card-clip"></i> ສ້າງບັນຊີຜູ້ໃຊ້</h4>
                </div>
                <div class="panel-body  row">
                  <div className="form-group mb-2">
                    <label htmlFor="" className='form-label'>ຊື່ຜູ້ໃຊ້</label>
                    <InputGroup inside>
                      <InputGroup.Addon><i class="fa-solid fa-envelope" /></InputGroup.Addon>
                      <Input value={inputs.userEmail} onChange={(e) => handleChange('userEmail', e)} placeholder="****@gmail.com" />
                    </InputGroup>
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="" className='form-label'>ລະຫັດຜ່ານ</label>
                    <InputGroup inside >
                      <Input type={visible ? 'text' : 'password'} value={inputs.userPassword} onChange={(e) => handleChange('userPassword', e)} placeholder='*******' />
                      <InputGroup.Button onClick={handleShow}>
                        {visible ? <i class="fa-solid fa-eye" /> : <i class="fa-solid fa-eye-slash" />}
                      </InputGroup.Button>
                    </InputGroup>
                  </div>

                  <div className="form-group mb-2">
                    <label htmlFor="" className='form-label'>ສະຖານະ</label>
                    <SelectPicker data={typeUser} value={inputs.typeUser} onChange={(e) => handleChange('typeUser', e)} block />
                  </div>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' color="blue" appearance="primary" startIcon={<i className='fas fa-save' />} > ບັນທຶກ</Button>
            <Button color="red" onClick={() => openForm(false)} appearance="primary"><i class="fa-solid fa-xmark fs-4" /> ຍົກເລີກ</Button>
          </Modal.Footer>
        </form>
      </Modal>

      {selectedItem && (
        <FormEdituser
          item={selectedItem}
          open={modalOpen}
          handleClose={handleClosed}
          fetchStaff={fetchStaff}
        />
      )}

    </div>
  )
}
