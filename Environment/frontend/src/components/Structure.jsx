import { useState } from "react";
import { renderToString } from "react-dom/server";
import { Marker, Popup } from "react-leaflet"
import L from "leaflet";
import InfoCard from "./InfoCard";

const Structure = ({ structure, isOpen, onOpen, onClose }) => {

    const [structureName, setStructureName] = useState(structure.name)
    const [structureDescription, setStructureDescription] = useState(structure.description || "")
    const [structureTags, setStructureTags] = useState([])
    const [selectedTag, setSelectedTag] = useState("")

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
        "Mobility Assistence Available",
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

    const addTag = () => {
        if (selectedTag && !structureTags.includes(selectedTag)) {
            setStructureTags([...structureTags, selectedTag])
            setSelectedTag("")
        }
    }

    const removeTag = (tagName) => {
        setStructureTags(structureTags.filter((tag) => tag !== tagName));
    }

    const iconSvg = renderToString(<structure.Icon size={28} />);
            
    const icon = new L.DivIcon({
        className: "structure-icon",
        html: `<div class="flex flex-col items-center justify-center w-20 h-20 rounded-lg 
                ${structure.bgColor} ${structure.iconColor} text-center text-xs">
                ${iconSvg}
                <span>${structureName}</span>
            </div>`,
        iconAnchor: [0, 0],
    });


    return (
        <>
            <Marker key={structure.index} position={structure.position} icon={icon} draggable={true} 
            eventHandlers={{
                dblclick: isOpen ? onClose : onOpen
            }}>
            </Marker>

            {/* Stall info card */}
            {isOpen && (

                <InfoCard 
                structureName={structureName} 
                setStructureName={setStructureName} 
                structureDescription={structureDescription}
                setStructureDescription={setStructureDescription}
                tagType={structure.tagType}
                tagTypeList={getTagList(structure)}
                structureTags={structureTags}
                addTag={addTag}
                removeTag={removeTag}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                onClose={onClose}
                />

            )}
        </>
    );
};

export default Structure;
