import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet"
import CanvasLayer from "./CanvasLayer";
import Structure from "./Structure";


const Map = ({ structures }) => {

    // Set base zoom for map (level of zoom on Leaflet), map will begin at this zoom level
    const baseZoom = 19
    const [currentlyOpen, setCurrentlyOpen] = useState(null)    // Keep track of if another InfoCard is already currently open

    // ScaleBar component, shows scale at bottom of map in meters
    const ScaleBar = () => {
        const map = useMap();

        // When map is scrolled, create a new scale and add that to map
        useEffect(() => {
            const scale = L.control.scale({
                position: "bottomright",
                metric: true,
                imperial: false,
                maxWidth: 200,
            });
            scale.addTo(map);

            return () => scale.remove();
        }, [map]);
    };

    // Grid lines on map
    const MapWithGrid = () =>{
        const map = useMap();

        return <CanvasLayer map={map}/>
    }

    return (
        <MapContainer 
            center={[36.107319, -115.148686]} 
            zoom={baseZoom}
            style={{height: "100vh"}}
            zoomControl={false}
            doubleClickZoom={false}
            maxZoom={20}
            minZoom={18}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxNativeZoom={baseZoom}
                maxZoom={20}
                minZoom={18}
            />

            <ZoomControl position="bottomleft" />   {/* + and - to zoom in and out */}
            
            {/* Map structures prop as Structure components */}
            {/* Track which structures InfoCard is open through index and isOpen */}
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

            <ScaleBar />
            <MapWithGrid />

        </MapContainer>
    );

};

export default Map;