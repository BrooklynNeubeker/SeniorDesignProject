import React from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import MenuNav from './MenuNav';
import Navbar from './Navbar';

const CheckPaths = () => {
    const location = useLocation();

    const previewMatch = matchPath('/event/:id/dashboard/preview', location.pathname);

    if(previewMatch) {
        return null;
    }
    else {
        return <Navbar/>
    }
}

export default CheckPaths;