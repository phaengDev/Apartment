import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <>
      <div id="sidebar" class="app-sidebar" >
        <div class="app-sidebar-content" data-scrollbar="true" data-height="100%">
          <div class="menu">
            <div class="menu-profile">
              <a href='javascript:;' class="menu-profile-link" data-toggle="app-sidebar-profile" data-target="#appSidebarProfileMenu">
                <div class="menu-profile-cover with-shadow"></div>
                <div class="menu-profile-image">
                  <img src="../assets/img/user/user-13.jpg" alt="" />
                </div>
                <div class="menu-profile-info">
                  <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                      Sean Ngu
                    </div>
                  </div>
                  <small>Frontend developer</small>
                </div>
              </a>
            </div>

            <div class="menu-header pt-2">ລາຍການເມນູ</div>
            <div class="menu-item active fs-14px">
              <Link to={'/home'} class="menu-link ">
                <div class="menu-icon">
                <i class="fa-solid fa-house fs-4"></i>
                </div>
                <div class="menu-text">ໜ້າຫຼັກ </div>
              </Link>
            </div>

            <div class="menu-item fs-14px">
              <Link to={'/open'} class="menu-link">
                <div class="menu-icon">
                <i class="fa-brands fa-windows fs-4"></i>
                </div>
                <div class="menu-text">ຫ້ອງເຊົ່າ </div>
              </Link>
            </div>
            <div class="menu-item has-sub fs-14px">
              <a href="javascript:;" class="menu-link">
                <div class="menu-icon">
                <i class="fa-solid fa-book fs-4"/>
                   </div>
                <div class="menu-text">ລາຍງານ</div>
                <div class="menu-caret"></div>
              </a>
              <div class="menu-submenu fs-13px">
                <div class="menu-item">
                  <Link to={'/'} class="menu-link">
                  <div class="menu-text">ລາຍງານຄົນເຂົ້າ</div>
                  </Link>
                </div>
                <div class="menu-item">
                  <Link to={'/stock'} class="menu-link">
                  <div class="menu-text">ລາຍງານຄົນອອກ</div>
                  </Link>
                </div>
                <div class="menu-item">
                  <Link to={'/'} class="menu-link">
                  <div class="menu-text">ລາຍງານຈ່າຍຄ່າເຊົ່າ</div>
                  </Link>
                </div>
                
              </div>
            </div>
            <div class="menu-item  fs-14px">
              <Link to={'/custom'} class="menu-link ">
                <div class="menu-icon">
                <i class="fa-solid fa-users fs-4"/>
                </div>
                <div class="menu-text">ຂໍ້ມູນລູກຄ້າ </div>
              </Link>
            </div>
            <div class="menu-item has-sub fs-14px">
              <a href="javascript:;" class="menu-link">
                <div class="menu-icon">
                <i class="fa-solid fa-layer-group fs-4"></i>
                   </div>
                <div class="menu-text">ຂໍ້ມູນຊັບສິນ</div>
                <div class="menu-caret"></div>
              </a>
              <div class="menu-submenu fs-13px">
              <div class="menu-item">
                  <Link to={'/property'} class="menu-link">
                    <div class="menu-text">ຕັ້ງຄ່າຊັບສິນ</div>
                  </Link>
                </div>
                <div class="menu-item">
                  <Link to={'/'} class="menu-link">
                  <div class="menu-text">ການຮັບເຂົ້າ</div>
                  </Link>
                </div>
                <div class="menu-item">
                  <Link to={'/'} class="menu-link">
                  <div class="menu-text">ລາຍການການເບີກຈ່າຍ</div>
                  </Link>
                </div>
              </div>
            </div>
            {/* <div class="menu-item has-sub fs-14px">
              <a href="javascript:;" class="menu-link">
                <div class="menu-icon">
                <i class="fa-solid fa-chart-pie fs-4"></i>
                   </div>
                <div class="menu-text">ລາຍງານສິນຄ້າ</div>
                <div class="menu-caret"></div>
              </a>
              <div class="menu-submenu fs-13px">
              <div class="menu-item">
                  <Link to={'/'} class="menu-link"><div class="menu-text">ລາຍງານລວມ</div></Link>
                </div>
                <div class="menu-item">
                  <Link to={'/'} class="menu-link"><div class="menu-text">ລາຍງານຍອດຂາຍ</div></Link>
                </div>
                <div class="menu-item">
                  <Link to={'/'} class="menu-link"><div class="menu-text">ປະຫວັດການຂາຍ</div></Link>
                </div>
                <div class="menu-item">
                  <Link to={'/'} class="menu-link"><div class="menu-text">ປະຫວັດສິນຄ້າ</div></Link>
                </div>
                <div class="menu-item">
                  <Link to={'/'} class="menu-link"><div class="menu-text">ລາຍງານໜີ້</div></Link>
                </div>
              </div>
            </div>
            <div class="menu-item has-sub fs-14px">
              <a href="javascript:;" class="menu-link">
                <div class="menu-icon">
                <i class="fa-solid fa-book fs-4"></i>
                   </div>
                <div class="menu-text">ບັນຊີລາຍຮັບ-ຈ່າຍ</div>
                <div class="menu-caret"></div>
              </a>
              <div class="menu-submenu fs-13px">
              <div class="menu-item">
                  <Link to={'/'} class="menu-link"><div class="menu-text">ບັນຊີລວມ</div></Link>
                </div>
                <div class="menu-item">
                  <Link to={'/'} class="menu-link"><div class="menu-text">ບັນຊີລາຍຮັບ</div></Link>
                </div>
                <div class="menu-item">
                  <Link to={'/'} class="menu-link"><div class="menu-text">ບັນຊີລາຍຈ່າຍ</div></Link>
                </div>
                <div class="menu-item">
                  <Link to={'/'} class="menu-link"><div class="menu-text">ຕັ້ງຄ່າປະເພດ</div></Link>
                </div>
                <div class="menu-item">
                  <Link to={'/'} class="menu-link"><div class="menu-text">ລາຍງານ</div></Link>
                </div>
              </div>
            </div> */}
           
            <div class="menu-item has-sub fs-14px">
              <a href="javascript:;" class="menu-link">
                <div class="menu-icon">
                <i class="fa-solid fa-sliders  fs-4"></i>
                </div>
                <div class="menu-text">ການຈັດການຫ້ອງ</div>
                <div class="menu-caret"></div>
              </a>
              <div class="menu-submenu fs-13px">
              <div class="menu-item">
                  <Link to={'/building'} class="menu-link">
                    <div class="menu-text">ຕັ້ງຄ່າອາຄານ</div>
                  </Link>
                </div>
              <div class="menu-item">
                  <Link to={'/room'} class="menu-link">
                    <div class="menu-text">ຕັ້ງຄ່າຫອງ</div>
                  </Link>
                </div>
                <div class="menu-item">
                  <Link to={'/service'} class="menu-link">
                    <div class="menu-text">ຕັ້ງຄ່າບໍລິການອຶ່ນ</div>
                  </Link>
                </div>
              </div>
            </div>
            
            <div class="menu-item has-sub fs-14px">
              <a href="javascript:;" class="menu-link">
                <div class="menu-icon">
                <i class="fa-solid fa-screwdriver-wrench fs-4"></i>
                </div>
                <div class="menu-text">ການຕັ້ງຄ່າ</div>
                <div class="menu-caret"></div>
              </a>
              <div class="menu-submenu fs-13px">
                <div class="menu-item">
                  <Link to={'/system'} class="menu-link">
                    <div class="menu-text">ຕັ້ງຄ່າລະບົບ</div>
                  </Link>
                </div>
                <div class="menu-item">
                  <Link to={'/staff'} class="menu-link">
                    <div class="menu-text">ຂໍ້ມູນພະນັກງານ</div>
                  </Link>
                </div>
              <div class="menu-item">
                  <Link to={'/'} class="menu-link">
                    <div class="menu-text">ຕັ້ງຄ່າການໃຊ້ສິດ</div>
                  </Link>
                </div>
              </div>
            </div>


            <div class="menu-item d-flex">
              <a href="javascript:;" class="app-sidebar-minify-btn ms-auto d-flex align-items-center text-decoration-none" data-toggle="app-sidebar-minify"><i class="fa fa-angle-double-left"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div class="app-sidebar-bg" data-bs-theme="dark"></div>
      <div class="app-sidebar-mobile-backdrop"><a href="#" data-dismiss="app-sidebar-mobile" class="stretched-link"></a></div>
    </>
  )
}
