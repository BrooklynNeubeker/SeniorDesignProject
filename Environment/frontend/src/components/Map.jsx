import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet"

const Map = () => {

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
        </MapContainer>
    );

};

export default Map;