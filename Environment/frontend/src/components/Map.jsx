import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import CanvasLayer from "./CanvasLayer";

const Map = () => {
    const MapWithGrid = () =>{
        const map = useMap();

        return <CanvasLayer map={map}/>
    }

    return (
        <MapContainer center={[36.107319, -115.148686]} zoom={19}
        style={{height: "100vh"}}
        zoomControl={false}
        >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxNativeZoom={19}
            maxZoom={22}
        />
        <MapWithGrid />
        </MapContainer>
    );

};

export default Map;