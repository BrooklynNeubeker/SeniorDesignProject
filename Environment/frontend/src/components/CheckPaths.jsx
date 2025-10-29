import React from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import MenuNav from './MenuNav';
import Navbar from './Navbar';

const CheckPaths = () => {
    const location = useLocation();

    const match = matchPath('/event/:id/dashboard/site-plan', location.pathname);

    if(match) {
        return <MenuNav/>
    }
    else {
        return <Navbar/>
    }
}

export default CheckPaths;