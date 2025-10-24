import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import CanvasLayer from "./CanvasLayer";
import Structure from "./Structure";


const Map = ({ structures }) => {

    const [currentlyOpen, setCurrentlyOpen] = useState(null)


    const MapWithGrid = () =>{
        const map = useMap();

        return <CanvasLayer map={map}/>
    }

    return (
        <MapContainer center={[36.107319, -115.148686]} zoom={19}
        style={{height: "100vh"}}
        zoomControl={false}
        doubleClickZoom={false}
        >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxNativeZoom={19}
            maxZoom={22}
        />
        
        {structures.map((structure, index) => (
            <Structure
                key={index} 
                index={index} 
                structure={structure}
                isOpen={currentlyOpen === index}
                onOpen={() => setCurrentlyOpen(index)}
                onClose={() => setCurrentlyOpen(null)}
            />
        ))}
            
        <MapWithGrid />
        </MapContainer>
    );

};

export default Map;