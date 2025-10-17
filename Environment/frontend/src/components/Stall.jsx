import { useState, useRef } from "react";

const Stall = ({ stall }) => {

    const [location, setLocation] = useState({ 
        x: window.innerWidth / 2 - 40, 
        y: window.innerHeight / 2 - 40 
    })
    const stallRef = useRef(null);
    const startLocation = useRef({ x: 0, y: 0 })

    const handleMouseDown = (e) => {
        e.preventDefault();

        startLocation.current = {
            x: e.clientX,
            y: e.clientY,
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }

    const handleMouseMove = (e) => {
        const newX = startLocation.current.x - e.clientX;
        const newY = startLocation.current.y - e.clientY;

        startLocation.current = {
            x: e.clientX,
            y: e.clientY,
        }

        setLocation((prev) => ({
            x: prev.x - newX,
            y: prev.y - newY,
        }))
    }

    const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }
    
    return (
        <div
            ref={stallRef}
            onMouseDown={handleMouseDown}
            style={{
                position: "absolute",
                left: `${location.x}px`,
                top: `${location.y}px`,
                cursor: "grab",
            }}
            className={`absolute flex flex-col items-center justify-center w-20 h-20 rounded-lg ${stall.bgColor}`}
        >
            {stall.Icon && <stall.Icon size={28} className={stall.iconColor} />}
            <span className="mt-1 text-xs font-semibold text-white text-center">
                {stall.name}
            </span>
        </div>
    );
};

export default Stall;
