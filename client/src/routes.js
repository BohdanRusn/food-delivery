import React from 'react';
import {Routes , Route, Navigate } from "react-router-dom";
import {Main} from "./pages/MainPage";
import {ShopCart} from "./pages/ShopCart";

export const useRoutes = () => {
    return (
          <Routes >
            <Route path='/main' exact={true} element={<Main/>}></Route>
            <Route path='/cart' exact={true} element={<ShopCart/>}></Route>
            <Route path='*' element={ <Navigate to='/main'/>}/>
          </Routes >
    )
}
