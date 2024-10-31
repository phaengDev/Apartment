import React, { useState, useEffect, useRef } from 'react'
import { Input, InputPicker, InputGroup, SelectPicker } from 'rsuite';
import { Config } from '../../config/connection';
import { Link, useLocation, useNavigate } from 'react-router-dom';
export default function FormSale() {
    const api=Config.urlApi
    const inputRef = useRef(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tableId = searchParams.get('id');

const handleBack=()=>{
    window.location.href = '/sale';
}

   const itemCate=[];
   const [itemBrand,setItemBrand]=useState([]);
    const fetchCategory = async ()=>{
        try {
          const response = await fetch(api + 'brand');
          const jsonData = await response.json();
          setItemBrand(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        // finally {
        //    setIsLoading(false)
        // }
       }
    
    useEffect(() => {
        fetchCategory()
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'f') {
                event.preventDefault();
                inputRef.current.focus();
            } else if (event.ctrlKey && event.key === 'e') {
                event.preventDefault();
                inputRef.current.value = '';
                inputRef.current.focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
    }, []);
    return (
        <div id="app" className="app app-content-full-height app-without-sidebar app-without-header" >
            <div id="content" className="app-content p-0">
                <div className="pos pos-with-menu pos-with-sidebar" id="pos">
                    <div className="pos-menu">
                        <div className="logo">
                            <a href="home">
                                <div className="logo-img">
                                    <img src="./assets/img/logo/logo.png" alt="" />
                                </div>
                                <div className="logo-text">BP Shop</div>
                            </a>
                        </div>
                        <div className="nav-container">
                            <div data-scrollbar="true" data-height="100%" data-skip-mobile="true">
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <span role='button' className="nav-link active"  data-filter="all">
                                            <div className="nav-icon">
                                                <i className="fa fa-fw fa-utensils" />
                                            </div>
                                            <div className="nav-text">ປະເພດທັງໝົດ</div>
                                        </span>
                                    </li>
                                    {itemBrand.map((item,index)=>
                                    <li className="nav-item">
                                        <span role='button' className="nav-link"  data-filter={`b-${item.brand_id}`}>
                                            <div className="nav-icon">
                                            <i class="fa-solid fa-layer-group"></i>
                                            </div>
                                            <div className="nav-text">{item.brand_name}</div>
                                        </span>
                                    </li>
                                    )}
                                  
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="pos-content" >
                        <div className='sticky-top bg-white px-2 p-1 rounded-3 me-2 ms-2 nav-container mt-3' >
                            <div className="row ">
                                <div className="col-3">
                                    <InputGroup className='border-0'>
                                        <InputGroup.Button onClick={handleBack} color="red" appearance="primary" className='me-2 rounded'>
                                        <i class="fa-solid fa-circle-arrow-left fs-4"></i>
                                        </InputGroup.Button>
                                        <InputPicker data={itemCate} placeholder='ໝວດໝູ່' />
                                    </InputGroup>
                                </div>
                                <div className="col-9">
                                    <InputGroup inside>
                                        <Input ref={inputRef} placeholder='ຄົ້ນຫາ ຊື່ສິນຄ້າ/ ລະຫັດສິນຄ້າ/ ລະຫັດບາໂຄດ (Ctrl+F)' />
                                        <InputGroup.Addon>
                                            <i className='fas fa-search' />
                                        </InputGroup.Addon>
                                    </InputGroup>
                                </div>
                            </div>
                        </div>
                        <div className="pos-content-container h-100" data-scrollbar="true">
                            <div className="product-row">
                                <div className="product-container" data-type="meat">
                                    <a
                                        href="#"
                                        className="product"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalPos"
                                    >
                                        <div
                                            className="img"
                                            style={{
                                                backgroundImage: "url(../assets/img/pos/product-1.jpg)"
                                            }}
                                        />
                                        <div className="text">
                                            <div className="title">Grill Chicken Chop®</div>
                                            <div className="desc">chicken, egg, mushroom, salad</div>
                                            <div className="price">$10.99</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-container" data-type="meat">
                                    <a
                                        href="#"
                                        className="product"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalPos"
                                    >
                                        <div
                                            className="img"
                                            style={{
                                                backgroundImage: "url(../assets/img/pos/product-2.jpg)"
                                            }}
                                        />
                                        <div className="text">
                                            <div className="title">Grill Pork Chop®</div>
                                            <div className="desc">pork, egg, mushroom, salad</div>
                                            <div className="price">$12.99</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-container" data-type="meat">
                                    <a
                                        href="#"
                                        className="product"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalPos"
                                    >
                                        <div
                                            className="img"
                                            style={{
                                                backgroundImage: "url(../assets/img/pos/product-3.jpg)"
                                            }}
                                        />
                                        <div className="text">
                                            <div className="title">Capellini Tomato Sauce®</div>
                                            <div className="desc">spaghetti, tomato, mushroom </div>
                                            <div className="price">$11.99</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-container" data-type="meat">
                                    <a
                                        href="#"
                                        className="product"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalPos"
                                    >
                                        <div
                                            className="img"
                                            style={{
                                                backgroundImage: "url(../assets/img/pos/product-4.jpg)"
                                            }}
                                        />
                                        <div className="text">
                                            <div className="title">Vegan Salad Bowl®</div>
                                            <div className="desc">apple, carrot, tomato </div>
                                            <div className="price">$6.99</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-container" data-type="pizza">
                                    <div className="product not-available">
                                        <div
                                            className="img"
                                            style={{
                                                backgroundImage: "url(../assets/img/pos/product-5.jpg)"
                                            }}
                                        />
                                        <div className="text">
                                            <div className="title">Hawaiian Pizza®</div>
                                            <div className="desc">pizza, crab meat, pineapple </div>
                                            <div className="price">$20.99</div>
                                        </div>
                                        <div className="not-available-text">
                                            <div>Not Available</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-container" data-type="burger">
                                    <a
                                        href="#"
                                        className="product"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalPos"
                                    >
                                        <div
                                            className="img"
                                            style={{
                                                backgroundImage: "url(../assets/img/pos/product-17.jpg)"
                                            }}
                                        />
                                        <div className="text">
                                            <div className="title">Perfect Burger</div>
                                            <div className="desc">
                                                Dill pickle, cheddar cheese, tomato, red onion, ground chuck
                                                beef
                                            </div>
                                            <div className="price">$8.99</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-container" data-type="drinks">
                                    <a
                                        href="#"
                                        className="product"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalPos"
                                    >
                                        <div
                                            className="img"
                                            style={{
                                                backgroundImage: "url(../assets/img/pos/product-6.jpg)"
                                            }}
                                        />
                                        <div className="text">
                                            <div className="title">Avocado Shake</div>
                                            <div className="desc">avocado, milk, vanilla</div>
                                            <div className="price">$3.99</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-container" data-type="drinks">
                                    <a
                                        href="#"
                                        className="product"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalPos"
                                    >
                                        <div
                                            className="img"
                                            style={{
                                                backgroundImage: "url(../assets/img/pos/product-7.jpg)"
                                            }}
                                        />
                                        <div className="text">
                                            <div className="title">Coffee Latte</div>
                                            <div className="desc">espresso, milk</div>
                                            <div className="price">$2.99</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-container" data-type="drinks">
                                    <a
                                        href="#"
                                        className="product"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalPos"
                                    >
                                        <div
                                            className="img"
                                            style={{
                                                backgroundImage: "url(../assets/img/pos/product-8.jpg)"
                                            }}
                                        />
                                        <div className="text">
                                            <div className="title">Vita C Detox Juice</div>
                                            <div className="desc">
                                                apricot, apple, carrot and ginger juice
                                            </div>
                                            <div className="price">$2.99</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-container" data-type="snacks">
                                    <a
                                        href="#"
                                        className="product"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalPos"
                                    >
                                        <div
                                            className="img"
                                            style={{
                                                backgroundImage: "url(../assets/img/pos/product-9.jpg)"
                                            }}
                                        />
                                        <div className="text">
                                            <div className="title">Pancake</div>
                                            <div className="desc">
                                                Non dairy, egg, baking soda, sugar, all purpose flour
                                            </div>
                                            <div className="price">$5.99</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-container" data-type="snacks">
                                    <a
                                        href="#"
                                        className="product"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalPos"
                                    >
                                        <div
                                            className="img"
                                            style={{
                                                backgroundImage: "url(../assets/img/pos/product-10.jpg)"
                                            }}
                                        />
                                        <div className="text">
                                            <div className="title">Mushroom soup</div>
                                            <div className="desc">
                                                Evaporated milk, marsala wine, beef cubes, chicken broth,
                                                butter
                                            </div>
                                            <div className="price">$3.99</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-container" data-type="snacks">
                                    <a
                                        href="#"
                                        className="product"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalPos"
                                    >
                                        <div
                                            className="img"
                                            style={{
                                                backgroundImage: "url(../assets/img/pos/product-11.jpg)"
                                            }}
                                        />
                                        <div className="text">
                                            <div className="title">Baked chicken wing</div>
                                            <div className="desc">
                                                Chicken wings, a1 steak sauce, honey, cayenne pepper
                                            </div>
                                            <div className="price">$6.99</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-container" data-type="meat">
                                    <a
                                        href="#"
                                        className="product"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalPos"
                                    >
                                        <div
                                            className="img"
                                            style={{
                                                backgroundImage: "url(../assets/img/pos/product-12.jpg)"
                                            }}
                                        />
                                        <div className="text">
                                            <div className="title">Veggie Spaghetti</div>
                                            <div className="desc">
                                                Yellow squash, pasta, roasted red peppers, zucchini
                                            </div>
                                            <div className="price">$12.99</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-container" data-type="desserts">
                                    <a
                                        href="#"
                                        className="product"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalPos"
                                    >
                                        <div
                                            className="img"
                                            style={{
                                                backgroundImage: "url(../assets/img/pos/product-13.jpg)"
                                            }}
                                        />
                                        <div className="text">
                                            <div className="title">Vanilla Ice Cream</div>
                                            <div className="desc">
                                                Heavy whipping cream, white sugar, vanilla extract
                                            </div>
                                            <div className="price">$3.99</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-container" data-type="desserts">
                                    <a
                                        href="#"
                                        className="product"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalPos"
                                    >
                                        <div
                                            className="img"
                                            style={{
                                                backgroundImage: "url(../assets/img/pos/product-15.jpg)"
                                            }}
                                        />
                                        <div className="text">
                                            <div className="title">Perfect Yeast Doughnuts</div>
                                            <div className="desc">
                                                Chocolate hazelnut spread, bread flour, doughnuts, quick
                                                rise yeast, butter
                                            </div>
                                            <div className="price">$2.99</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-container" data-type="desserts">
                                    <a
                                        href="#"
                                        className="product"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalPos"
                                    >
                                        <div
                                            className="img"
                                            style={{
                                                backgroundImage: "url(../assets/img/pos/product-14.jpg)"
                                            }}
                                        />
                                        <div className="text">
                                            <div className="title">Macarons</div>
                                            <div className="desc">
                                                Almond flour, egg whites, heavy cream, food coloring,
                                                powdered sugar
                                            </div>
                                            <div className="price">$4.99</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-container" data-type="desserts">
                                    <a
                                        href="#"
                                        className="product"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalPos"
                                    >
                                        <div
                                            className="img"
                                            style={{
                                                backgroundImage: "url(../assets/img/pos/product-16.jpg)"
                                            }}
                                        />
                                        <div className="text">
                                            <div className="title">Perfect Vanilla Cupcake</div>
                                            <div className="desc">
                                                Baking powder, all purpose flour, plain kefir, vanilla
                                                extract
                                            </div>
                                            <div className="price">$2.99</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pos-sidebar ">
                        <div className="h-100 d-flex flex-column p-0 ">
                            <div className="pos-sidebar-header">
                                <div className="back-btn">
                                    <button
                                        type="button"
                                        data-dismiss-class="pos-sidebar-mobile-toggled"
                                        data-target="#pos"
                                        className="btn border-0"
                                    >
                                        <i className="fa fa-chevron-left" />
                                    </button>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-plate-wheat" />
                                </div>
                                <div className="title">Table '01'</div>
                                <div className="order">
                                    Order: <b>#0056</b>
                                </div>
                            </div>
                            <div className="pos-sidebar-nav"> </div>
                            <div  className="pos-sidebar-body tab-content"
                                data-scrollbar="true"
                                data-height="100%"
                            >
                                <div className="tab-pane fade h-100 show active" id="newOrderTab">
                                    <div className="pos-table">
                                        <div className="row pos-table-row">
                                            <div className="col-9">
                                                <div className="pos-product-thumb">
                                                    <div
                                                        className="img"
                                                        style={{
                                                            backgroundImage:
                                                                "url(../assets/img/pos/product-2.jpg)"
                                                        }}
                                                    />
                                                    <div className="info">
                                                        <div className="title">Grill Pork Chop</div>
                                                        <div className="single-price">$12.99</div>
                                                        <div className="desc">- size: large</div>
                                                        <div className="input-group qty">
                                                            <div className="input-group-append">
                                                                <a href="#" className="btn btn-default">
                                                                    <i className="fa fa-minus" />
                                                                </a>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue={'01'}
                                                            />
                                                            <div className="input-group-prepend">
                                                                <a href="#" className="btn btn-default">
                                                                    <i className="fa fa-plus" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3 total-price">$12.99</div>
                                        </div>
                                        <div className="row pos-table-row">
                                            <div className="col-9">
                                                <div className="pos-product-thumb">
                                                    <div
                                                        className="img"
                                                        style={{
                                                            backgroundImage:
                                                                "url(../assets/img/pos/product-8.jpg)"
                                                        }}
                                                    />
                                                    <div className="info">
                                                        <div className="title">Orange Juice</div>
                                                        <div className="single-price">$5.00</div>
                                                        <div className="desc">
                                                            - size: large
                                                            <br />- less ice
                                                        </div>
                                                        <div className="input-group qty">
                                                            <div className="input-group-append">
                                                                <a href="#" className="btn btn-default">
                                                                    <i className="fa fa-minus" />
                                                                </a>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue={'02'}
                                                            />
                                                            <div className="input-group-prepend">
                                                                <a href="#" className="btn btn-default">
                                                                    <i className="fa fa-plus" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3 total-price">$10.00</div>
                                        </div>
                                        <div className="row pos-table-row">
                                            <div className="col-9">
                                                <div className="pos-product-thumb">
                                                    <div
                                                        className="img"
                                                        style={{
                                                            backgroundImage:
                                                                "url(../assets/img/pos/product-1.jpg)"
                                                        }}
                                                    />
                                                    <div className="info">
                                                        <div className="title">Grill chicken chop</div>
                                                        <div className="single-price">$10.99</div>
                                                        <div className="desc">
                                                            - size: large
                                                            <br />- spicy: medium
                                                        </div>
                                                        <div className="input-group qty">
                                                            <div className="input-group-append">
                                                                <a href="#" className="btn btn-default">
                                                                    <i className="fa fa-minus" />
                                                                </a>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue={'01'}
                                                            />
                                                            <div className="input-group-prepend">
                                                                <a href="#" className="btn btn-default">
                                                                    <i className="fa fa-plus" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3 total-price">$10.99</div>
                                        </div>
                                        <div className="row pos-table-row">
                                            <div className="col-9">
                                                <div className="pos-product-thumb">
                                                    <div
                                                        className="img"
                                                        style={{
                                                            backgroundImage:
                                                                "url(../assets/img/pos/product-5.jpg)"
                                                        }}
                                                    />
                                                    <div className="info">
                                                        <div className="title">Hawaiian Pizza</div>
                                                        <div className="single-price">$15.00</div>
                                                        <div className="desc">
                                                            - size: large
                                                            <br />- more onion
                                                        </div>
                                                        <div className="input-group qty">
                                                            <div className="input-group-append">
                                                                <a href="#" className="btn btn-default">
                                                                    <i className="fa fa-minus" />
                                                                </a>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue={'01'}
                                                            />
                                                            <div className="input-group-prepend">
                                                                <a href="#" className="btn btn-default">
                                                                    <i className="fa fa-plus" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3 total-price">$15.00</div>
                                            <div className="pos-remove-confirmation">
                                                <div className="text-center mx-auto">
                                                    <div>
                                                        <i className="far fa-trash-can fa-2x text-body text-opacity-50" />
                                                    </div>
                                                    <div className="mt-1 mb-2">
                                                        Confirm to remove this item?{" "}
                                                    </div>
                                                    <div>
                                                        <a href="#" className="btn btn-default w-60px me-2">
                                                            No
                                                        </a>
                                                        <a href="#" className="btn btn-danger w-60px">
                                                            Yes
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row pos-table-row">
                                            <div className="col-9">
                                                <div className="pos-product-thumb">
                                                    <div
                                                        className="img"
                                                        style={{
                                                            backgroundImage:
                                                                "url(../assets/img/pos/product-10.jpg)"
                                                        }}
                                                    />
                                                    <div className="info">
                                                        <div className="title">Mushroom Soup</div>
                                                        <div className="single-price">$3.99</div>
                                                        <div className="desc">
                                                            - size: large
                                                            <br />- more cheese
                                                        </div>
                                                        <div className="input-group qty">
                                                            <div className="input-group-append">
                                                                <a href="#" className="btn btn-default">
                                                                    <i className="fa fa-minus" />
                                                                </a>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue={'01'}
                                                            />
                                                            <div className="input-group-prepend">
                                                                <a href="#" className="btn btn-default">
                                                                    <i className="fa fa-plus" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3 total-price">$3.99</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade h-100" id="orderHistoryTab">
                                    <div className="h-100 d-flex align-items-center justify-content-center text-center p-20">
                                        <div>
                                            <div className="mb-3 mt-n5">
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
                                            <h4>No order history found</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pos-sidebar-footer">
                                <div className="d-flex align-items-center mb-2">
                                    <div>Subtotal</div>
                                    <div className="flex-1 text-end h6 mb-0">$30.98</div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div>Taxes (6%)</div>
                                    <div className="flex-1 text-end h6 mb-0">$2.12</div>
                                </div>
                                <hr className="opacity-1 my-10px" />
                                <div className="d-flex align-items-center mb-2">
                                    <div>Total</div>
                                    <div className="flex-1 text-end h4 mb-0">$33.10</div>
                                </div>
                                <div className="d-flex align-items-center mt-3">
                                    <a
                                        href="#"
                                        className="btn btn-default rounded-3 text-center me-10px w-70px"
                                    >
                                        <i className="fa fa-bell d-block fs-18px my-1" /> Service
                                    </a>
                                    <a
                                        href="#"
                                        className="btn btn-default rounded-3 text-center me-10px w-70px"
                                    >
                                        <i className="fa fa-receipt d-block fs-18px my-1" /> Bill
                                    </a>
                                    <a
                                        href="#"
                                        className="btn btn-theme rounded-3 text-center flex-1"
                                    >
                                        <i className="fa fa-shopping-cart d-block fs-18px my-1" />{" "}
                                        Submit Order
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a
                    href="#"
                    className="pos-mobile-sidebar-toggler"
                    data-toggle-class="pos-sidebar-mobile-toggled"
                    data-target="#pos"
                >
                    <i
                        className="iconify display-6"
                        data-icon="solar:bag-smile-bold-duotone"
                    />
                    <span className="badge">5</span>
                </a>
            </div>
        </div>
    )
}
