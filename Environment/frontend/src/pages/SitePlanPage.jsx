import { useState } from 'react';
import Map from '../components/Map';
import Overlay from '../components/Overlay';

const SitePlanPage = () => {

    const [structures, setStructures] = useState([]);

    const addStructure = (name, Icon, bgColor, iconColor, description, tagType) => {
        const newStructure = {name, Icon, bgColor, iconColor, description, tagType, position: [36.107319, -115.148686]}
        setStructures(prev => [...prev, newStructure])
    }

    return (
        <div>

            <div className="fixed inset-0 -z-10">
                <Map structures={structures}/>
            </div>

            <div className='fixed inset-0 z-10 pointer-events-none'>
                <Overlay addStructure={addStructure}/>
            </div>

        </div>
    );
};

export default SitePlanPage;