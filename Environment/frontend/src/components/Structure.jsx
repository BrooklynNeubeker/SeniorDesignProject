import { useState, useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";
import { Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet";
import InfoCard from "./InfoCard";
import { useGlobal } from "../components/GlobalContext";

const Structure = ({ structure, isOpen, onOpen, onClose, removeStructure, imperial, saveBtnRef }) => {

    const [structureName, setStructureName] = useState(structure.name)  // State and setter for structure name
    const [structureDescription, setStructureDescription] = useState(structure.description || "")   // State and setter for structure description
    const [structureTags, setStructureTags] = useState(structure.tags)  // State and setter for structure tags, default is nothing
    const [structureDimensions, setStructureDimensions] = useState(structure.dimensions)    // State and setter for structure dimensions, default [20,20]
    const [structureLocation, setStructureLocation] = useState(structure.position)
    const [structureOrientation, setStructureOrientation] = useState(structure.orientation)
    const { editing } = useGlobal();

    const markerRef = useRef(); // Ref to instance of marker
    const map = useMap();   // Hook to get the map being used

    {/* 
        Function for scaling marker for structure on zoom
        Scales based on size of real-life meters
    */}
    const scaleMarkerIcon = () => {
        if (!markerRef.current) return;

        // Get currenly zoom level on map and latitude of marker
        const zoom = map.getZoom();
        const latitude = markerRef.current.getLatLng().lat;

        // Calculate feet/meters per pixel using formula by OpenStreetMap
        let metersPerPx = (40075016.686 * Math.cos((latitude * Math.PI) / 180)) / Math.pow(2, zoom + 8);
        //const feetPerPx = metersPerPx * 3.280839895;

        if (imperial) { metersPerPx = metersPerPx * 3.280839895 }

        // Get number of pixels for width and length of structure
        const widthPx = structureDimensions[0] / metersPerPx;
        const lengthPx = structureDimensions[1] / metersPerPx;

        // Make new icon for each marker
        const iconHtml = `
            <div class="flex flex-col gap-2 items-center justify-center w-full h-full
                        text-center text-xs ${structure.iconColor} ${structure.border}"
                        style="background-color: ${structure.bgColor}; width: ${widthPx}px; height: ${lengthPx}px;
                        transform: rotate(${structureOrientation}deg); transform-origin: center;">
                <span style="font-size:${Math.min(widthPx, lengthPx) * 0.01}rem;">
                    ${structureName}
                </span>
            </div>
            `;

        const icon = new L.DivIcon({
            html: iconHtml,
            className: "structure-icon",
            iconSize: [widthPx, lengthPx],
            iconAnchor: [widthPx / 2, lengthPx / 2], // center properly
        });

        // Change marker icon
        markerRef.current.setIcon(icon);
    };

    // On zoom, scale each "structure"/marker icon
    // Listen for change in structureName or structureDimensions
    useEffect(() => {
        scaleMarkerIcon();
        map.on("zoom", scaleMarkerIcon);
        return () => map.off("zoom", scaleMarkerIcon);
    }, [map, structureName, structureDimensions, structureOrientation, imperial]);

    
    if(editing) {useEffect(() => {
        const handleSave = async () => {
            structure.name = structureName;
            structure.description = structureDescription;
            structure.tags = structureTags;
            structure.dimensions = structureDimensions;
            structure.position = structureLocation;
            structure.orientation = structureOrientation;

            //alert(`Saved: ${structure.name}`);
        };

        saveBtnRef.current.addEventListener("click", handleSave);
        return () => saveBtnRef.current?.removeEventListener("click", handleSave);
    }, [saveBtnRef, structureName, structureDescription, structureTags, 
        structureDimensions, structureLocation, structureOrientation]);
    }


    // Tag lists for different types of structures
    const dietaryTags = [
        "Vegan",
        "Vegetarian",
        "Gluten-Free",
        "Nut-Free",
        "Dairy-Free",
        "Halal",
        "Kosher"
    ]

    const accessibilityTags = [
        "Wheelchair Accessible",
        "Mobility Assistance Available",
        "Sign Language Support",
        "Interpreter Available",
    ]

    const facilityTags = [
        "Wheelchair Accessible",
        "Family Restroom",
        "Gender-Neutral Restroom",
        "Seating Available",
        "Pets Allowed",
        "Wifi-Available"
    ]

    const medicalTags = [
        "First-Aid Kit Available",
        "CPR Certified Staff",
        "EpiPens Available",
        "Wheelchair Accessible",
        "Mobility Assistance Available",
        "Sign Language Support",
        "Interpreter Available",
    ]

    // Return list of tags based on structure's type
    const getTagList = (structure) => {
        switch(structure.tagType) {
            case "dietary":
                return dietaryTags
            case "accessibility":
                return accessibilityTags
            case "facility":
                return facilityTags
            case "medical":
                return medicalTags
            default:
                return []
        }
    }

    return (
        <>
            {/* Marker for "structure" on map. On double click, open or close depending on isOpen (passed from Map component) */}
            {editing && (
                <Marker ref={markerRef} key={structure.id} position={structure.position} draggable={true} 
                    eventHandlers={{
                        click: isOpen ? onClose : onOpen,
                        dragend: (e) => {
                            const updatedPos = e.target.getLatLng();
                            setStructureLocation([updatedPos.lat, updatedPos.lng]);
                        },
                    }}
            />
                )}
            
            {!editing && (
                <Marker ref={markerRef} key={structure.id} position={structure.position} draggable={false} 
                    eventHandlers={{
                        click: isOpen ? onClose : onOpen,
                        dragend: (e) => {
                            const updatedPos = e.target.getLatLng();
                            setStructureLocation([updatedPos.lat, updatedPos.lng]);
                        },
                    }}
            />
            )}
            {/* Stall info card */}
            {isOpen && editing && (

                <div className="flex h-screen items-start">
                <InfoCard 
                    structureName={structureName} 
                    setStructureName={setStructureName} 
                    structureDescription={structureDescription}
                    setStructureDescription={setStructureDescription}
                    tagType={structure.tagType}
                    tagTypeList={getTagList(structure)}
                    structureTags={structureTags}
                    setStructureTags={setStructureTags}
                    structureDimensions={structureDimensions}
                    setStructureDimensions={setStructureDimensions}
                    structureOrientation={structureOrientation}
                    setStructureOrientation={setStructureOrientation}
                    onClose={onClose}
                    structure={structure}
                    removeStructure={removeStructure}
                    imperial={imperial}
                />
                </div>

            )}
            {isOpen && !editing && (

                <div className="flex h-screen items-center">
                <InfoCard 
                    structureName={structureName} 
                    structureDescription={structureDescription}
                    tagType={structure.tagType}
                    tagTypeList={getTagList(structure)}
                    structureTags={structureTags}
                    structureDimensions={structureDimensions}
                    structureOrientation={structureOrientation}
                    onClose={onClose}
                    structure={structure}
                    imperial={imperial}
                />
                </div>
            )}
        </>
    );
};

export default Structure;


