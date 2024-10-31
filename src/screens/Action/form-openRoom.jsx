import React, { useEffect, useState } from 'react'
import { Input, DatePicker, SelectPicker, InputGroup, Timeline, Placeholder, Loader } from 'rsuite';
import axios from 'axios'
import { Config } from '../../config/connection'
import numeral from 'numeral';
import moment from 'moment/moment';
import FormAction from '../Action/formAction';
import { useFloor, useCurrency } from '../../config/select-option';
import Building from '../Modal/Building';
export default function OpenRoom() {
    const api = Config.urlApi;
    // const buildingId = localStorage.getItem('buildingId');
    const buildingId = parseInt(localStorage.getItem('buildingId'), 10);
    const [buildId, setBuildId] = useState(buildingId);
    const itemFloor = useFloor(buildId);

    const [isearch, setIsearch] = useState({
        buildingId_fk: buildId,
        floorId_fk: '',
    })
    const handleShowRoom = (value) => {
        setIsearch({
            ...isearch, floorId_fk: value
        })
    }
   
    const [open, setOpen] = useState(buildId <= 0);

    const [itemBuilding, setItemBuilding] = useState([]);
    const [buildingName, setBuildingName] = useState('');
    const showBuilding = async () => {
        try {
            const response = await fetch(api + 'building/');
            const jsonData = await response.json();
            setItemBuilding(jsonData);
            const building = jsonData.find(item => item.building_id === buildingId);
            if (building) {
                setBuildingName(building.buildingName);
            } else {
                setBuildingName('ApartMent');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleShowbuil = () => {
        setOpen(true)
    }

    // const [build, setBuild] = useState({})
    const handleUse = (val) => {
        setOpen(false)
        // setBuild(val);
        setBuildId(val.building_id)
        localStorage.setItem('buildingId', val.building_id);
        setIsearch({
            ...isearch, buildingId_fk: val.building_id
        })
    };

    // =====================
    const [itemData, setItemData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState([]);
    const [useCount, setUseCount] = useState(0);
    const fetchRoom = async () => {
        try {
            const response = await axios.post(api + 'room/option', isearch);
            const jsonData = response.data;
            setItemData(jsonData);
            setFilter(jsonData);
            const qtyuse = jsonData.filter(item => item.statusUse === 2).length;
            setUseCount(qtyuse)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false)
        }
    }
    const handleFilter = (event) => {
        setItemData(filter.filter(n => n.roomName.toLowerCase().includes(event)))
    }

    const [show, setShow] = useState(false);
    const [dataUse, setDataUse] = useState('');
    const handleUseRoom = (item) => {
        setShow(true);
        setDataUse(item);
    }
    const [roomName, setRoomName] = useState('ເບີຫ້ອງ')
    const handlePayroom = (roomName, id) => {
        setRoomName(roomName)
    }

//================================
const [seachUse,setSeachUse]=useState({
    floor_id_fk:'',
    building_id:buildingId
})
const [itemUseRoom,setItemUseRoom]=useState([]);
const fetchUseRoom = async()=> {
    try {
        const response = await axios.post(api + 'useroom/option', seachUse);
        const jsonData = response.data;
        setItemUseRoom(jsonData)
    }catch{

    }
}
// ===============================

    useEffect(() => {
        fetchRoom();
        showBuilding();
        fetchUseRoom();
    }, [isearch, buildId])

    const [sidebarToggled, setSidebarToggled] = useState(false);
    const handleDismiss = () => {
        const sidebar = document.getElementById('pos');
        if (sidebar) {
            sidebar.classList.toggle('pos-sidebar-mobile-toggled');
            setShow(false)
        }
        setSidebarToggled(!sidebarToggled);
    };
    return (
        <div id="app" className="app app-content-full-height app-without-header app-without-sidebar" >
            <div id="content" className="app-content p-0">
                <div className="pos pos-with-header pos-with-sidebar" id="pos">
                    <div className="pos-header bg-bps ">
                        <div className="logo">
                            <a href="home">
                                <div className="logo-img">
                                    <img src="./assets/img/icon/apartment.png" className='rounded-pill' alt="" />
                                </div>
                                <div className="logo-text text-white"> {buildingName}</div>
                            </a>
                        </div>
                        <div className="time" id="time">
                            <SelectPicker style={{ width: 200 }} data={itemFloor} className='me-2' onChange={(e) => handleShowRoom(e)} placeholder='ເລືອກຊັ້ນ' />
                            <InputGroup inside>
                                <InputGroup.Addon>
                                    <i className='fas fa-search' />
                                </InputGroup.Addon>
                                <Input onChange={(e) => handleFilter(e)} placeholder='ເບີຫ້ອງ' />
                            </InputGroup>
                        </div>
                        <div className="nav">
                            <div className="nav-item">
                                <a href="javascript:;" onClick={handleShowbuil} className="nav-link ">
                                    <i class="fa-solid fa-building nav-icon text-white" />
                                </a>
                            </div>
                            <div className="nav-item">
                                <a href="javascript:;" className="nav-link">
                                    <i className="far fa-clock nav-icon" />
                                </a>
                            </div>
                            <div className="nav-item">
                                <a href="javascript:;" className="nav-link">
                                    <i className="far fa-calendar-check nav-icon" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="pos-content">
                        <div className="pos-content-container">
                            <div className="d-md-flex align-items-center mb-2">
                                <div className="pos-booking-title flex-1">
                                    <div className="fs-24px mb-1">ຈຳນວນຫ້ອງຫວ່າງ ({itemData.length} / {useCount})</div>
                                </div>
                            </div>
                            <div className="pos-table-row">

                                {isLoading === true ? (
                                    <>
                                        <Placeholder.Paragraph rows={8} />
                                        <Loader center size='lg' content="ກຳລັງໂຫລດ..." vertical />
                                    </>
                                ) : (
                                    itemData.length > 0 && (
                                        <>
                                            {itemData.map((item, index) =>
                                                <div className={`pos-table ${show === true && 'in-use'} ${item.statusUse === 2 ? 'in-use ' : 'in-use'}`}>
                                                    <a href="javascript:;" onClick={item.statusUse === 1 ? () => handleUseRoom(item) : () => handlePayroom(item.roomName, item.datause.useroom_id)}
                                                        className="pos-table-container border "
                                                        data-toggle="select-table" >
                                                        <div className={`pos-table-status  ${item.statusUse === 2 && 'bg-green'}`} />
                                                        <div className={`pos-table-name ${item.statusUse === 2 && 'bg-orange'}`}>
                                                            <div className="name">ເບີຫ້ອງ </div>
                                                            <div className="no">{item.roomName}</div>
                                                            <div class="order">{item.statusUse === 2 ? (<span>{moment(item.datause.create_date).format('DD/MM/YYYY')}</span>) : (<span>ຫ້ອງຫວ່າງ</span>)}</div>
                                                        </div>
                                                        <div className="pos-table-info-row text-dark">
                                                            <div className="pos-table-info-col ">
                                                                <div className="pos-table-info-container bg-teal-300 text-end">
                                                                    <span className="text">ຊັ້ນ: </span>
                                                                </div>
                                                            </div>
                                                            <div className="pos-table-info-col ">
                                                                <div className="pos-table-info-container bg-teal-200">
                                                                    <span className="text">{item.floorName}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pos-table-info-row text-dark">
                                                            <div className="pos-table-info-col">
                                                                <div className="pos-table-info-container bg-green-300 text-end">
                                                                    <span className="text">ລາຄາເລີ່ມຕົ້ນ: </span>
                                                                </div>
                                                            </div>
                                                            <div className="pos-table-info-col">
                                                                <div className="pos-table-info-container bg-green-200">
                                                                    <span className="icon opacity-50">
                                                                        <i class="fa-solid fa-kip-sign" />
                                                                    </span>
                                                                    <span className="text">{numeral(item.priceRoom).format('0,00')}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            )}
                                        </>
                                    )
                                )}
                            </div>
                        </div>

                    </div>

                    <FormAction open={show}
                        handleClose={() => setShow(false)}
                        item={dataUse}
                        fetchRoom={fetchRoom} />

                    <div className="pos-sidebar">
                        <div className="pos-sidebar-header my-0">
                            <div className="back-btn">
                                <button type="button" onClick={handleDismiss} className="btn mt-1"  >
                                    <i className="fa fa-chevron-left" />
                                </button>
                            </div>
                            <div className="icon">
                                <i class="fa-solid fa-building" />
                            </div>
                            <div className="title">{roomName}</div>
                            <div className="order">
                                Order: <b>#0001</b>
                            </div>
                        </div>
                        <div className="pos-sidebar-body">
                            <div className="pos-table" data-id="pos-table-info">
                                {itemUseRoom.map((item,index)=>(
                                <div className="row pos-table-row">
                                    <div className="col-8">
                                        <div className="pos-product-thumb">
                                            <div
                                                className="img"
                                                style={{
                                                    backgroundImage: "url(./assets/img/icon/usd.png)"
                                                }}
                                            />
                                            <div className="info">
                                                <div className="title">{moment(item.create_date).format('DD/MM/YYYY')}</div>
                                                <div className="desc">- ປະເພດ: {item.typesName}</div>
                                                <div className="desc">- ເດືອນ:{moment(item.date_pay_rental).format('DD/MM/YYYY')} </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 total-price">{item.roomName}
                                        <div>({moment(item.date_pay_rental).diff(moment(), 'days')} ມື້)</div>
                                    </div>
                                </div>
                                ))}
                               
                            </div>

                        </div>
                        <div class="pos-sidebar-footer">
                            <div class="d-flex align-items-center mb-2">
                                <div>Subtotal</div>
                                <div class="flex-1 text-end h6 mb-0">$64.94</div>
                            </div>
                            <div class="d-flex align-items-center">
                                <div>Taxes (6%)</div>
                                <div class="flex-1 text-end h6 mb-0">$3.90</div>
                            </div>
                            <hr class="opacity-1 my-10px" />
                            <div class="d-flex align-items-center mb-2">
                                <div>Total</div>
                                <div class="flex-1 text-end h4 mb-0">$68.84</div>
                            </div>
                            <div class="d-flex align-items-center mt-3">
                                <button class="btn btn-default w-80px rounded-3 text-center me-10px">
                                    <i class="fab fa-paypal d-block fs-18px my-1"></i>
                                    ຈ່າຍເງິນ
                                </button>
                                <button class="btn btn-default w-80px rounded-3 text-center me-10px">
                                    <i class="fab fa-cc-visa d-block fs-18px my-1"></i>
                                    CC
                                </button>
                                <button class="btn btn-theme rounded-3 text-center flex-1">
                                    <i class="fa fa-wallet d-block fs-18px my-1"></i>
                                    Pay by Cash
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Building
                item={itemBuilding}
                open={open}
                handleClose={() => setOpen(false)}
                handleUse={handleUse}
            />
        </div>


    )
}
