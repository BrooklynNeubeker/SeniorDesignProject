import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

const Map = ({ onShapeCreated, onShapeEdited, onShapeDeleted }) => {
    const handleCreated = (e) => {
        const { layerType, layer } = e;
        const geoJson = layer.toGeoJSON();
        onShapeCreated?.({ type: layerType, geoJson, layer });
    };

    const handleEdited = (e) => {
        const { layers } = e;
        const editedLayers = [];
        layers.eachLayer((layer) => {
            editedLayers.push({
                geoJson: layer.toGeoJSON(),
                layer
            });
        });
        onShapeEdited?.(editedLayers);
    };

    const handleDeleted = (e) => {
        const { layers } = e;
        const deletedLayers = [];
        layers.eachLayer((layer) => {
            deletedLayers.push({
                geoJson: layer.toGeoJSON(),
                layer
            });
        });
        onShapeDeleted?.(deletedLayers);
    };

    return (
        <MapContainer
            center={[36.107319, -115.148686]}
            zoom={19}
            style={{ height: "100vh" }}
            zoomControl={false}
            dragging={true}
            doubleClickZoom={false}
            scrollWheelZoom={false}
            touchZoom={false}
            keyboard={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxNativeZoom={19}
                maxZoom={22}
            />
            <FeatureGroup>
                <EditControl
                    position="bottomleft"
                    onCreated={handleCreated}
                    onEdited={handleEdited}
                    onDeleted={handleDeleted}
                    draw={{
                        rectangle: true,
                        polygon: true,
                        circle: true,
                        circlemarker: false,
                        marker: true,
                        polyline: true
                    }}
                />
            </FeatureGroup>
        </MapContainer>
    );

};

export default Map;