import React from 'react'
import ChartHome from './chartHome'
export default function HomePage() {
  return (
    <div id="content" className="app-content ">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <div class="widget widget-stats bg-bps rounded-4">
            <div class="stats-icon text-white"><i class="fa-solid fa-hotel" /></div>
            <div class="stats-info">
              <h3 className='fs-16px'>ຈຳນວນຫ້ອງທັງໝົດ</h3>
              <p>30 <span className='fs-18px'>ຫ້ອງ</span></p>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="widget widget-stats bg-bps rounded-4">
            <div class="stats-icon text-white"><i class="fa-solid fa-door-open" /></div>
            <div class="stats-info">
              <h3 className='fs-16px'>ຈຳນວນຫ້ອງຫວ່າງ</h3>
              <p>20 <span className='fs-18px'>ຫ້ອງ</span></p>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6">
          <div class="widget widget-stats bg-bps rounded-4">
            <div class="stats-icon text-white"><i class="fa-solid fa-person-booth" /></div>
            <div class="stats-info">
              <h3 className='fs-16px'>ຈຳນວນຫ້ອງເປິດ</h3>
              <p>10 <span className='fs-18px'>ຫ້ອງ</span></p>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6">
          <div class="widget widget-stats bg-bps rounded-4">
            <div class="stats-icon text-white"><i class="fa-solid fa-house-medical-circle-check" /></div>
            <div class="stats-info">
              <h3 className='fs-16px'>ຫ້ອງໃກ້ຄົບວັນຊຳລະ</h3>
              <p>5 <span className='fs-18px'>ຫ້ອງ</span> </p>
            </div>
          </div>
        </div>
      </div>
      <div className="panel">
        <div className="panel-body p-0">
          <div className="table-responsive rounded-3">
            <table class="table table-striped table-bordered align-middle text-nowrap">
              <thead>
                <tr>
                  <th width="1%">ລ/ດ</th>
                  <th className='text-center' >ລະຫັດຫ້ອງ</th>
                  <th className='text-center' >ເບີຫ້ອງ</th>
                  <th className='text-center' >ສະຖານະ</th>
                  <th className='' >ຊື່ລູກຄ້າ</th>
                  <th className='' >ເບີໂທລະສັບ</th>
                  <th className='text-center' >ວັນທີພັກເຊົ່າ</th>
                  <th className='text-center' >ປະເພດເຊົ່າ</th>
                  <th width="1%" className='text-center' >ແຈ້ງເຕື່ອນ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='text-center'>1</td>
                  <td className='text-center'>RM-0001</td>
                  <td className='text-center'>A001</td>
                  <td className='text-center'>ຫວ່າງ</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className='text-center'><i class="fa-solid fa-circle-check text-green fs-3"></i></td>
                </tr>
                <tr>
                  <td className='text-center'>2</td>
                  <td className='text-center'>RM-0002</td>
                  <td className='text-center'>A002</td>
                  <td className='text-center'>ເປິດ</td>
                  <td>phaeng</td>
                  <td>2052160011</td>
                  <td className='text-center'>01/07/2024</td>
                  <td>ລາຍເດືອນ</td>
                  <td className='text-center text-white'><span class="px-1 rounded bg-orange fs-13px"><i class="fa-solid fa-circle-exclamation" /> 5 ວັນ </span></td>
                </tr>
                <tr>
                  <td className='text-center'>3</td>
                  <td className='text-center'>RM-0003</td>
                  <td className='text-center'>A004</td>
                  <td className='text-center'>ເປິດ</td>
                  <td>phaeng</td>
                  <td>2052160011</td>
                  <td className='text-center'>01/07/2024</td>
                  <td>ລາຍເດືອນ</td>
                  <td className='text-center text-white'><span class="px-1 rounded bg-red fs-13px"><i class="fa-solid fa-user-xmark" /> -2 ວັນ </span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-md-flex align-items-center pt-1 p-3">
            <div class="me-md-auto text-md-left text-center mb-2 mb-md-0">
              Showing 1 to 10 of 57 entries
            </div>
            <ul class="pagination mb-0 justify-content-center">
              <li class="page-item disabled"><a class="page-link">Previous</a></li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item active"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">4</a></li>
              <li class="page-item"><a class="page-link" href="#">5</a></li>
              <li class="page-item"><a class="page-link" href="#">6</a></li>
              <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <div class="col-xl-8 col-lg-6 card">
          <div class="card-body">
            <ChartHome />
          </div>
        </div>
        <div class="col-xl-4 col-lg-6">
          <div class="card border-0 bg-gray-800 text-white">
            <div class="card-body">
              <div class="mb-3 text-gray-500 ">
                <b>ລວມຍອດປະຈຳເດືອນ</b>
              </div>
              <div class="row align-items-center pb-1px">
                <div class="col-4">
                  <div class="h-100px d-flex align-items-center justify-content-center">
                    <img src="./assets/img/icon/img-2.svg" class="mw-100 mh-100" />
                  </div>
                </div>
                <div class="col-8">
                  <div class="mb-2px text-truncate">ລວມຍອດທັງໝົດ</div>
                  <div class="mb-2px  text-gray-500  small">Mon 12/6 - Sun 18/6</div>
                  <div class="d-flex align-items-center mb-2px">
                    <div class="flex-grow-1">
                      <div class="progress h-5px rounded-pill bg-white bg-opacity-10">
                        <div class="progress-bar progress-bar-striped bg-indigo" data-animation="width" data-value="100%" ></div>
                      </div>
                    </div>
                    <div class="ms-2 small w-30px text-center"><span data-animation="number" data-value="80">0</span>%</div>
                  </div>
                </div>

              </div>
              <div class="row align-items-center border-1 border-top pb-1">
                <div class="col-4">
                  <div class="h-100px d-flex align-items-center justify-content-center">
                    <img src="./assets/img/icon/img-2.svg" class="mw-100 mh-100" />
                  </div>
                </div>
                <div class="col-8">
                  <div class="mb-2px text-truncate">ຍອດທີ່ຈ່າຍແລ້ວ</div>
                  <div class="mb-2px  text-gray-500  small">Sat 10/6 - Sun 18/6</div>
                  <div class="d-flex align-items-center mb-2px">
                    <div class="flex-grow-1">
                      <div class="progress h-5px rounded-pill bg-white bg-opacity-10">
                        <div class="progress-bar progress-bar-striped bg-green" data-animation="width" data-value="80%"></div>
                      </div>
                    </div>
                    <div class="ms-2 small w-30px text-center"><span data-animation="number" data-value="60">0</span>%</div>
                  </div>
                </div>

              </div>
              <div class="row border-1 border-top align-items-center">
                <div class="col-4">
                  <div class="h-100px d-flex align-items-center justify-content-center">
                    <img src="./assets/img/icon/img-2.svg" class="mw-100 mh-100" />
                  </div>
                </div>
                <div class="col-8">
                  <div class="mb-2px text-truncate">ຍອດຄ້າງຈ່າຍ</div>
                  <div class="mb-2px  text-gray-500  small">Sat 10/6 - Sun 18/6</div>
                  <div class="d-flex align-items-center mb-2px">
                    <div class="flex-grow-1">
                      <div class="progress h-5px rounded-pill bg-white bg-opacity-10">
                        <div class="progress-bar progress-bar-striped bg-warning" data-animation="width" data-value="60%"></div>
                      </div>
                    </div>
                    <div class="ms-2 small w-30px text-center"><span data-animation="number" data-value="60">0</span>%</div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
