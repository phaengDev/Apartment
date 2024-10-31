import React from 'react'
import { Modal, Button } from 'rsuite'
const Building = ({ item, open, handleClose ,handleUse}) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Apartment </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    {item.map((val, key) =>
                        <div class="col-xl-4 col-sm-6 mb-2">
                            <div class="card">
                                <div className="text-center">
                                    <img class="card-img-top w-50" src="./assets/img/icon/apartment.png" alt="" />
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title ">{val.buildingName}</h5>
                                    <p class="card-text mb-2">{val.qtyFloor} ຊັ້ນ</p>
                                    <button type='button' onClick={()=>handleUse(val)} class="btn btn-sm btn-bps w-100">ເຂົ້າໃຊ້</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default Building