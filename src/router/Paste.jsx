import React from 'react';
import HomePage from '../screens/Home/HomePage';
import LoingPage from '../screens/Login/Loing';
import BuildingPage from '../screens/setting/buildingPage';
import PropertyPage from '../screens/setting/propertyPage';
import RoomrentPage from '../screens/setting/Room-rentPage';
import FloorPage from '../screens/setting/floorPage';
import FormAddRoom from '../screens/setting/form-addRoom';
import OpenRoom from '../screens/Action/form-openRoom';
import CustomerPage from '../screens/Customer/CustomerPage';
import StaffPages from '../screens/setting/staffPages';
import SettingRete from '../screens/setting/setting-rete';
import ProfileCustomer from '../screens/Customer/ProfileCustomer';
import ConfigureService from '../screens/setting/Configure-Service';
import { Routes, Route,Navigate } from "react-router-dom";
export default function AppContent() {
  return (
    <Routes>
        <Route path='/' element={<Navigate replace to={'home'} />} />
            <Route path="/login" element={<LoingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/building" element={<BuildingPage />} />
            <Route path="/property" element={<PropertyPage />} />
            <Route path="/room" element={<RoomrentPage />} />
            <Route path="/floor" element={<FloorPage />} />
            <Route path="/addRoom" element={<FormAddRoom />} />
            <Route path='/staff' element={<StaffPages/>}/>
            <Route path="/rate" element={<SettingRete />} />
            <Route path="/open" element={<OpenRoom />} />
            <Route path="/custom" element={<CustomerPage />} />
            <Route path="/view-cust" element={<ProfileCustomer />} />
            <Route path="/service" element={<ConfigureService />} />


            </Routes>
  )
}
