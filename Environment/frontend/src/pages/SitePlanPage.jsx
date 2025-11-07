import { useState } from 'react';
import Map from '../components/Map';
import Overlay from '../components/Overlay';
import { useGlobal } from "../components/GlobalContext";
import DefaultMap from '../components/DefaultMap';

const SitePlanPage = () => {
    const { imperial, location } = useGlobal();

    // Keep track of structures added, these will be rendered on map
    const [structures, setStructures] = useState([]);
    
    //checking if there is a saved map
    const isThereSavedMap = useState(false);

    {/* 
        Function to add structures to 'structures' array

        name: name of the structure
        Icon: Icon used to represent structure
        bgColor: color of the strucutre object
        iconColor: color of Icon and text attached to object
        description: description of the structure
        tagType: used to determine type of tags that can belong to structure

        dimensions: width and length of structure in real-life feet/meters, default 20 x 20
        position: position of structure on map, generates at center of map by default
    */}
    const addStructure = (name, Icon, bgColor, iconColor, border, description, tagType) => {
        const newStructure = { id: crypto.randomUUID(),
            name, Icon, bgColor, iconColor, border, description, tagType, 
            dimensions: [20, 20], position: [location.lng, location.lat]}
        setStructures(prev => [...prev, newStructure])
    }

    const removeStructure = (id) => {
        setStructures(prev => prev.filter(structure => structure.id !== id));
    }


    return (
        <div>
            <div className="fixed inset-0 z-10">
                {/* Some function checking if there is a function to check */}
                <Map structures={structures} removeStructure={removeStructure} coordinates={[location.lng, location.lat]} imperial={imperial}/>   
                {/* Render structures on Map component, pass in structures prop */}
            </div>

            <div className='fixed inset-0 z-10 pointer-events-none'>
                <Overlay addStructure={addStructure}/>  
                {/* Buttons in Overlay will be clicked to add structures, pass in addStructures prop */}
            </div>
        </div>
    );
};

export default SitePlanPage;