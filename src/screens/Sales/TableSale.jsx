import React, { useEffect, useState } from 'react'
import { Input,DatePicker,SelectPicker,InputGroup,InputPicker,Placeholder,Loader } from 'rsuite';
import axios from 'axios'
import { Config } from '../../config/connection'
import numeral from 'numeral';
import moment from 'moment/moment';
import FormAction from '../Action/formAction';
import { useFloor, useCurrency } from '../../config/select-option';
export default function TableSale() {
  const api = Config.urlApi;
  const [isearch, setIsearch] = useState({
    buildingId_fk: '',
    floorId_fk: '',
  })

  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState([]);
  const fetchRoom = async () => {
    try {
      const response = await axios.post(api + 'room/option', isearch);
      const jsonData = response.data;
      setItemData(jsonData);
      setFilter(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false)
    }
  }

  const [dataUse, setDataUse] = useState('')
  const handleUseRoom = (item) => {
    setShow(true);
    setDataUse(item);
  }

  const handlePayroom=(id)=>{
    
  }

  const [show, setShow] = useState(false);
  useEffect(() => {
    fetchRoom()
  }, [isearch])
  return (
    <div id="app" className="app app-content-full-height app-without-header app-without-sidebar" >
      <div id="content" className="app-content p-0">
        <div className="pos pos-with-header pos-with-sidebar" id="pos">
          <div className="pos-header bg-bps ">
            <div className="logo">
              <a href="home">
                <div className="logo-img">
                  <img src="./assets/img/logo/bp-shop.png" className='rounded-pill' alt="" />
                </div>
                <div className="logo-text text-white">BPS &amp; ຮ້ານອາຫາ</div>
              </a>
            </div>
            <div className="time" id="time">
              <Input />
            </div>
            <div className="nav">
              <div className="nav-item">
                <a href="pos_kitchen_order.html" className="nav-link">
                  <i className="far fa-clock nav-icon" />
                </a>
              </div>
              <div className="nav-item">
                <a href="pos_table_booking.html" className="nav-link">
                  <i className="far fa-calendar-check nav-icon" />
                </a>
              </div>
              <div className="nav-item">
                <a href="pos_menu_stock.html" className="nav-link">
                  <i className="fa fa-chart-pie nav-icon" />
                </a>
              </div>
            </div>
          </div>

          <div className="pos-content">
            <div className="pos-content-container">
              <div className="d-md-flex align-items-center mb-2">
                <div className="pos-booking-title flex-1">
                  <div className="fs-24px mb-1">ຈຳນວນຫ້ອງຫວ່າງ ({itemData.length})</div>
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
                        <div className={`pos-table ${show===true &&'in-use'} ${item.statusUse===2? 'selected':'in-use'}`}>
                          <a href="javascript:;" onClick={item.statusUse === 1 ? () => handleUseRoom(item) : () => handlePayroom(item.roomRent_id)}
                            className="pos-table-container border"
                            data-toggle="select-table" >
                            <div className={`pos-table-status ${item.statusUse===2 && 'bg-info'}`} />
                            <div className="pos-table-name ">
                              <div className="name">ເບີຫ້ອງ {item.statusUse}</div>
                              <div className="no">{item.roomName}</div>
                            </div>
                            <div className="pos-table-info-row text-dark">
                              <div className="pos-table-info-col">
                                <div className="pos-table-info-container text-end">
                                  <span className="text">ຊັ້ນ: </span>
                                </div>
                              </div>
                              <div className="pos-table-info-col">
                                <div className="pos-table-info-container">
                                  <span className="icon opacity-50">
                                    <i class="fa-solid fa-bars" />
                                  </span>
                                  <span className="text">{item.floorName}</span>
                                </div>
                              </div>
                            </div>
                            <div className="pos-table-info-row text-dark">
                              <div className="pos-table-info-col">
                                <div className="pos-table-info-container text-end">
                                  <span className="text">ລາຄາເລີ່ມຕົ້ນ: </span>
                                </div>
                              </div>
                              <div className="pos-table-info-col">
                                <div className="pos-table-info-container">
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
            item={dataUse} />

          <div className="pos-sidebar">
            <div className="pos-sidebar-header">
              <div className="back-btn">
                <button
                  type="button"
                  data-dismiss-class="pos-sidebar-mobile-toggled"
                  data-target="#pos"
                  className="btn"
                >
                  <i className="fa fa-chevron-left" />
                </button>
              </div>
              <div className="icon">
                <i className="fa fa-plate-wheat" />
              </div>
              <div className="title">Table 01</div>
              <div className="order">
                Order: <b>#0001</b>
              </div>
            </div>
            <div className="pos-sidebar-body">
              <div className="pos-table" data-id="pos-table-info">
                <div className="row pos-table-row">
                  <div className="col-8">
                    <div className="pos-product-thumb">
                      <div
                        className="img"
                        style={{
                          backgroundImage: "url(../assets/img/pos/product-2.jpg)"
                        }}
                      />
                      <div className="info">
                        <div className="title">Grill Pork Chop</div>
                        <div className="desc">- size: large</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-1 total-qty">x1</div>
                  <div className="col-3 total-price">$12.99</div>
                </div>
                <div className="row pos-table-row">
                  <div className="col-8">
                    <div className="pos-product-thumb">
                      <div
                        className="img"
                        style={{
                          backgroundImage: "url(../assets/img/pos/product-8.jpg)"
                        }}
                      />
                      <div className="info">
                        <div className="title">Orange Juice</div>
                        <div className="desc">
                          - size: large
                          <br />- less ice
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-1 total-qty">x2</div>
                  <div className="col-3 total-price">$10.00</div>
                </div>
                <div className="row pos-table-row">
                  <div className="col-8">
                    <div className="pos-product-thumb">
                      <div
                        className="img"
                        style={{
                          backgroundImage: "url(../assets/img/pos/product-13.jpg)"
                        }}
                      />
                      <div className="info">
                        <div className="title">Vanilla Ice-cream</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-1 total-qty">x1</div>
                  <div className="col-3 total-price">$3.99</div>
                </div>
                <div className="row pos-table-row">
                  <div className="col-8">
                    <div className="pos-product-thumb">
                      <div
                        className="img"
                        style={{
                          backgroundImage: "url(../assets/img/pos/product-1.jpg)"
                        }}
                      />
                      <div className="info">
                        <div className="title">Grill chicken chop</div>
                        <div className="desc">
                          - size: large
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-1 total-qty">x1</div>
                  <div className="col-3 total-price">$10.99</div>
                </div>
               
              </div>
              <div
                className="h-100 d-none align-items-center justify-content-center text-center p-20"
                data-id="pos-table-empty"
              >
                <div>
                  <div className="mb-3">
                    <svg
                      width="6em"
                      height="6em"
                      viewBox="0 0 16 16"
                      className="text-gray-300"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5zM1 4v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4H1z"
                      />
                      <path d="M8 1.5A2.5 2.5 0 0 0 5.5 4h-1a3.5 3.5 0 1 1 7 0h-1A2.5 2.5 0 0 0 8 1.5z" />
                    </svg>
                  </div>
                  <h4>No table selected</h4>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}
