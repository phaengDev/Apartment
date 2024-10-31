
import React, { useState, useEffect, useCallback } from 'react'
import { Input,InputGroup} from 'rsuite';
import { Config } from '../../config/connection';
const PropertyRoom=()=> {
    const api = Config.urlApi;

    const [valueName, setValueName] = useState("");
    const [filterDate, setFilterDate] = useState([]);
    const [itemProperty, setItePproperty] = useState([]);
    const fetchProperty = async () => {
        try {
            const response = await fetch(api + 'property/');
            const jsonData = await response.json();
            setItePproperty(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleInputChange = (value) => {
        setValueName(value);
        if (value) {
            setFilterDate(itemProperty.filter(n =>
                n.propertyName.toLowerCase().includes(value.toLowerCase()) ||
                n.property_code.toLowerCase().includes(value.toLowerCase())
            ));
        } else {
            setFilterDate([]);
        }
    };

    useEffect(() => {
        fetchProperty();
    }, [])
  return (
    <div className="panel">
    <div className="panel-body">
        <div className="form-group fs-15px">
            <label htmlFor="" className='form-label fs-16px'>ຄົ້ນຫາຊັບສິນນຳໃຊ້</label>
            <InputGroup inside >
                <InputGroup.Addon><i className='fas fa-search' /> </InputGroup.Addon>
                <Input block value={valueName} onChange={(event) => handleInputChange(event)} placeholder='ຊື່ຊັບສິນ' />
            </InputGroup>
            {filterDate.length > 0 ? (
                <ul className="dropdown-menu dropdown-menu-end widget-list p-1 show" >
                    {filterDate.map((item, index) => (
                        <span role='button' class="dropdown-item p-0 py-1 widget-list-item">
                            <div class="widget-list-media icon">
                            <i class="fa-solid fa-boxes-stacked fs-4 bg-bps text-white"></i>
                                </div>
                                <div class="text-truncate">
                                    <div className=''>{item.propertyName}</div>
                                    <div class="text-blue">{item.property_code}</div>
                                </div>
                        </span>
                    ))}
                </ul>
            ) : (
                valueName && (
                    <ul className="dropdown-menu dropdown-menu-end show" >
                        <div className="text-center">
                            <img src="./assets/img/icon/ic_no_result.svg" width={'50%'} alt="" />
                        </div>
                    </ul>
                )
            )}
        </div>
    </div>
</div>
  )
}
export default PropertyRoom
