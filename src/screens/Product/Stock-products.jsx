import React from 'react'
import { SelectPicker, InputGroup,Input,Button} from 'rsuite';
import { useNavigate } from 'react-router-dom';
export default function StockProducts() {
    const itemUnit = [];
    const itemCate = [];
    const navigate = useNavigate();
    const handleFilter=()=>{

    }
    const handleShearch=()=>{

    }
    const handleAddstock = () => {
        navigate('/add-stock');
      };
    return (

        <div id="content" class="app-content p-0 bg-component">
            <div class="app-content-padding px-4 py-3">
                <div class="d-lg-flex mb-lg-3 mb-2">
                    <h1 class="page-header mb-0 flex-1">ສະຕ໋ອກສິນຄ້າທັງໝົດ</h1>
                    <span class="d-none d-lg-flex align-items-center">
                        <a href="#" class="btn btn-secondary btn-sm d-flex me-2 pe-3 rounded-3">
                            <span class="iconify fs-18px me-2 ms-n1" data-icon="solar:printer-bold-duotone"></span>
                            Print Result
                        </a>
                        <a href="#" class="btn btn-secondary btn-sm d-flex me-2 pe-3 rounded-3">
                            <span class="iconify fs-18px me-2 ms-n1" data-icon="solar:archive-down-minimlistic-bold-duotone"></span>
                            Export Excel
                        </a>
                        <button type='button' onClick={handleAddstock} class="btn btn-theme btn-sm d-flex pe-3 rounded-3 fs-14px">
                            <span class="fas fa-plus fs-18px me-2 ms-n1"></span>
                            ເພີ່ມສິນຄ້າເຂົ້າ
                        </button>
                    </span>
                </div>
            </div>
            <div class="p-2 mb-n2">
            <div className="row mb-3">
                                <div className="col-sm-4 col-lg-3">
                                    <label htmlFor="" className='form-label'>ໝວດໝູ່ສິນຄ້າ</label>
                                    <SelectPicker data={itemCate} onChange={(e) => handleShearch('categories_id_fk', e)} block />
                                </div>
                                <div className="col-sm-4 col-lg-3 col-6">
                                    <label htmlFor="" className='form-label'>ປະເພດ / ຍີ່ຫໍ້</label>
                                    <SelectPicker onChange={(e) => handleShearch('brands_id_fk', e)} block />
                                </div>
                                <div className="col-sm-4 col-lg-2  col-6">
                                    <label htmlFor="" className='form-label'>ຫົວໜ່ວຍ</label>
                                    <SelectPicker data={itemUnit} onChange={(e) => handleShearch('units_id_fk', e)} block />
                                </div>
                                <div className="col-sm-3 col-lg-3 col-10">
                                    <label htmlFor="" className='form-label'>ຄົ້ນຫາ</label>
                                    <InputGroup inside >
                                        <InputGroup.Addon><i className="fas fa-search" /> </InputGroup.Addon>
                                        <Input block onChange={(e) => handleFilter(e)} placeholder='ຄົ້ນຫາ / ຊື່ສິ້ນຄ້າ/ລະຫັດ' />
                                    </InputGroup>
                                </div>
                                <div className="col-2 col-sm-1 mt-4">
                                    <Button appearance="primary" className='btn-add dropdown-toggle' data-bs-toggle="dropdown"><i class="fa-solid fa-grip fs-3"></i></Button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a href="javascript:;" class="dropdown-item">Action 1</a>
                                        <a href="javascript:;" class="dropdown-item">Action 2</a>
                                        <a href="javascript:;" class="dropdown-item">Action 3</a>
                                        <div class="dropdown-divider"></div>
                                        <a href="javascript:;" class="dropdown-item">Action 4</a>
                                    </div>
                                </div>
                            </div>
                <div className="table-responsive">
                    <table class="table table-striped table-bordered align-middle text-nowrap">
                        <thead className='thead-bps'>
                            <tr>
                                <th class="text-center" width="1%">ລ/ດ</th>
                                <th class="text-center" width="1%">ຮູບສິນຄ້າ</th>
                                <th class="text-center">ລະຫັດ</th>
                                <th class="">ຊື່ສິ້ນຄ້າ</th>
                                <th class="text-end">ລາຄາຂາຍ</th>
                                <th class="text-center">ສ່ວນຫຼຸດ</th>
                                <th class="text-center">ຈຳນວນ</th>
                                <th class="">ໝວດໝູ່</th>
                                <th class="">ປະເພດ/ຍີ່ຫໍ້</th>
                                <th class="">ສະຕ໋ອກ</th>
                                <th class="text-center">#</th>
                                <th class="text-center">ເປິດ/ປິດ</th>
                                <th class="text-center">ຕັ້ງຄ່າ</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
            </div>
            </div>
        </div>
    )
}
