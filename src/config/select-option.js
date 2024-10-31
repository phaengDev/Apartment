import  { useState, useEffect } from "react";
import { Config } from "./connection";
import { Rate } from "rsuite";
const api = Config.urlApi;
const buildingId=localStorage.getItem('buildingId');
export function useProvince() {
  const [itemProvince, setItemProvince] = useState([]);
  useEffect(() => {
    const showProvince = async () => {
      try {
        const response = await fetch(api + 'province');
        const jsonData = await response.json();
        setItemProvince(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    showProvince();
  }, []); 
  const data = itemProvince.map(item => ({ label: item.provinceName, value: item.province_id }));
  return data;
}
export function useBuilding() {
    const [itemBuilding, setItemBuilding] = useState([]);
    useEffect(() => {
      const showBuilding = async () => {
        try {
          const response = await fetch(api + 'building/');
          const jsonData = await response.json();
          setItemBuilding(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      showBuilding();
    }, []); 
    const data = itemBuilding.map(item => ({ label: item.buildingName, value: item.building_id }));
    return data;
  }
  


export function useFloor(builId) {
  const [itemFloor, setItemFloor] = useState([]);
  useEffect(() => {
    const showFloor = async () => {
      try {
        const response = await fetch(api + 'floor/'+builId);
        const jsonData = await response.json();
        setItemFloor(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    showFloor();
  }, [builId]); 
  const data = itemFloor.map(item => ({ label: item.floorName, value: item.floor_id }));
  return data;
}


export function useProperty() {
  const [itemProperty, setItemProperty] = useState([]);
  useEffect(() => {
    const showProperty = async () => {
      try {
        const response = await fetch(api + 'property/');
        const jsonData = await response.json();
        setItemProperty(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    showProperty();
  }, []); 
  const data = itemProperty.map(item => ({ label: item.propertyName, value: item.property_id }));
  return data;
}


export function useTypes() {
    const [itemTypes, setItemTypes] = useState([]);
    useEffect(() => {
      const showTypes = async () => {
        try {
          const response = await fetch(api + 'option/types');
          const jsonData = await response.json();
          setItemTypes(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      showTypes();
    }, []); 
    const data = itemTypes.map(item => ({ label: item.typesName, value: item.types_id }));
    return data;
  }

  export function useCurrency() {
    const [itemCurrency, setItemCurrency] = useState([]);
    useEffect(() => {
      const showCurrency = async () => {
        try {
          const response = await fetch(api + 'currency/');
          const jsonData = await response.json();
          setItemCurrency(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      showCurrency();
    }, []); 
  
    const data = itemCurrency.map(item => ({ label: item.currency_name+' / '+item.genus, value: item.currency_id,rate:item.reate_price,genus:item.genus }));
  
    return data;
  }

//============ fetch price list 
  export function usePriceList(id) {
    const [itemTypePrice, setItemTypePrice] = useState([]);
    useEffect(() => {
      const showTypePrice = async () => {
        try {
          const response = await fetch(api + 'option/price/'+id);
          const jsonData = await response.json();
          setItemTypePrice(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      showTypePrice();
    }, [id]); 
  
    // const data = itemTypePrice.map(item => ({ label: item.typesName, value: item.values,status:item.status,prices:item.typePrice }));
  
    return itemTypePrice;
  }





