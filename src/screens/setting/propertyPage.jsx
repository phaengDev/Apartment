import React, { useState, useEffect } from 'react'
import { Input, Button, Modal, SelectPicker, InputGroup } from 'rsuite';
import { Config } from '../../config/connection';
import { Alert, Notification } from '../../utils/Notification';
import axios from 'axios';
import Swal from 'sweetalert2'
import numeral from 'numeral';
export default function PropertyPage() {
  const api = Config.urlApi;
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const openForm = (index) => {
    setOpen(index)
    if (index) {
      setInputs({
        propertyId: '',
        propertyName: '',
        propertyPrice: '',
        type_property: 1,
        quantity: 0,
        uniteName:'',
        remark: ''
      })
    }
  }
  const [inputs, setInputs] = useState({
    propertyId: '',
    propertyName: '',
    propertyPrice: '',
    type_property: 1,
    quantity: 0,
    uniteName:'',
    remark: '',
  });

  const handleChange = (name, value) => {
    setInputs({
      ...inputs, [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(api + 'property/create', inputs);
      if (res.status === 200) {
        fetchProperty();
        Notification.success('ການບັນທຶກຂໍ້ມູນສຳເລັດ', 'ແຈ້ງເຕືອນ');
        setOpen(false);
      } else {
        Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
      }
    } catch (error) {
      console.error('Error while saving data:', error);
      Notification.error('ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ', 'ແຈ້ງເຕືອນ');
    }
  };

  const [itemData, setItemData] = useState([]);
  const fetchProperty = async () => {
    try {
      const response = await fetch(api + 'property/');
      const jsonData = await response.json();
      setItemData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const handleEdit = (item) => {
    setInputs({
      propertyId: item.property_id,
      propertyName: item.propertyName,
      propertyPrice: item.propertyPrice,
      type_property: item.type_property,
      quantity: item.quantity,
      uniteName:item.uniteName,
      remark: item.remark
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
      confirmButtonText: "ຕົກລົງ",
      cancelButtonColor: "#d33",
      cancelButtonText: "ບໍ່ລົບ",
      width: 350,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(api + `property/${id}`).then(function (resp) {
          if (resp.status === 200) {
            fetchProperty();
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
    fetchProperty()
  }, [])


  return (
    <div id="content" className="app-content">
      <ol className="breadcrumb float-xl-end">
        <li className="breadcrumb-item"><a href="javascript:;">ໜ້າຫຼັກ</a></li>
        <li className="breadcrumb-item active">ລາຍການຊັບສິນ</li>
      </ol>
      <h1 className="page-header ">ຂໍ້ມູນຊັບສິນ </h1>
      <div className="row">
        <div className={'col-sm-12 col-lg-12'}>
          <div class="panel">
            <div class="panel-heading bg-white  ui-sortable-handle">
              <h3 class="panel-title fs-18px">ລາຍການຊັບສິນນຳໃຊ້ຫ້ອງເຊົ່າ</h3>
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
                      <th class="text-center">ລະຫັດ</th>
                      <th class="">ຊື່ສິ້ນຄ້າ</th>
                      <th class="text-center">ຈຳນວນ</th>
                      <th class="text-end">ລາຄາ</th>
                      <th class="text-center">ສະຖານະ</th>
                      <th class="">ລາຍລະອຽດ</th>
                      <th class="text-center" width='10%'>ຕັ້ງຄ່າ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemData.length > 0 ? (
                      itemData.map((item, index) =>
                        <tr>
                          <td className='text-center'>{index + 1}</td>
                          <td className='text-center'>{item.property_code}</td>
                          <td className=''>{item.propertyName}</td>
                          <td className='text-center'>{item.quantity} {item.uniteName}</td>
                          <td className='text-end'>{numeral(item.propertyPrice).format('0,00')}</td>
                          <td className='text-center'>{item.type_property === 1 ? 'ຊັບສິນໃຊ້ປະຈຳວັນ' : 'ຊັບສິນຄົງທີ'}</td>
                          <td className=''>{item.remark}</td>
                          <td className='text-center'>
                            <button type='button' onClick={() => handleEdit(item)} class="btn btn-blue btn-xs me-2"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button type='button' onClick={() => handleDelete(item.property_id)} class="btn btn-red btn-xs"><i class="fa-solid fa-trash"></i></button>
                          </td>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <td colSpan={8} className='text-center text-red'>ບໍ່ພົບຂໍ້ມູນທີ່ມີການບັນທຶກ</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div class="d-md-flex align-items-center">
                <div class="me-md-auto text-md-left text-center mb-2 mb-md-0">
                  Showing 1 to 10 of 57 entries
                </div>
                <ul class="pagination mb-0 justify-content-center">
                  <li class="page-item disabled"><button class="page-link">Previous</button></li>
                  <li class="page-item"><button class="page-link" type='button'>1</button></li>
                  <li class="page-item active"><button class="page-link" type='button'>2</button></li>
                  <li class="page-item"><button class="page-link" type='button'>3</button></li>
                  <li class="page-item"><button class="page-link" type='button'>4</button></li>
                  <li class="page-item"><button class="page-link" type='button'>5</button></li>
                  <li class="page-item"><button class="page-link" type='button'>6</button></li>
                  <li class="page-item"><button class="page-link" type='button'>Next</button></li>
                </ul>
              </div>
            </div>
          </div>

        </div>



        <Modal overflow={true} open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title className='py-1'>ເພີ່ມຊັບສິນ</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="form-group  mb-2">
                <label htmlFor="" className='form-label'>ຊື່ຊັບສິນ</label>
                <Input value={inputs.propertyName} onChange={(e) => handleChange('propertyName', e)} placeholder="ຊື່ຊັບສິນ" required />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="" className='form-label'>ລາຄາ</label>
                <Input value={numeral(inputs.propertyPrice).format('0,00')} onChange={(e) => handleChange('propertyPrice', e)} />
              </div>
              <div className="form-group row mb-2">
                <div className="col-sm-6">
                  <label htmlFor="" className='form-label'>ຈຳນວນ</label>
                  <Input type='number' value={inputs.quantity} onChange={(e) => handleChange('quantity', e)} />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="" className='form-label'>ຫົວໜ່ວຍ</label>
                  <Input  value={inputs.uniteName} onChange={(e) => handleChange('uniteName', e)} placeholder='ຫົວໜ່ວຍ' />
                </div>
              </div>
              <div className="form-group mb-2">
                  <label htmlFor="" className='form-label'>ປະເພດ</label>
                  <select value={inputs.type_property} onChange={(e) => handleChange('type_property', e.target.value)} className='form-select' >
                    <option value="1">ຊັບສິນໃຊ້ປະຈຳວັນ</option>
                    <option value="2">ຊັບສິນຄົງທີ</option>
                  </select>
                </div>

              <div className="form-group mb-2">
                <label htmlFor="" className='form-label'>ໝາຍເຫດ</label>
                <Input as='textarea' value={inputs.remark} onChange={(e) => handleChange('remark', e)} placeholder='ໝາຍເຫດ....' />
              </div>

            </Modal.Body>
            <Modal.Footer>
              <Button type='submit' appearance="primary"> ບັນທຶກ </Button>
              <Button onClick={handleClose} appearance="primary" color='red'> ຍົກເລີກ</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  )
}
