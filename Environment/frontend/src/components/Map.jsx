import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet"
import CanvasLayer from "./CanvasLayer";
import Structure from "./Structure";
import Search from "./Search";
import { useGlobal } from "./GlobalContext";
import Legend from "./Legend";
import SetCenter from "./SetCenter";
import Overlay from "./Overlay";
import { X } from 'lucide-react'; // used for vote alert

const Map = ({ structures, addStructure, removeStructure, center, saveBtnRef, saveBtnRef2, imperial, zoom, event, isEmbedded, saveEventMap }) => {

    // Set base zoom for map (level of zoom on Leaflet), map will begin at this zoom level
    const [currentlyOpen, setCurrentlyOpen] = useState(null)    // Keep track of if another InfoCard is already currently open
    const {editing, showGrid, setInfoOpen} = useGlobal();

    // used to display Vote for AccessMap! alert
    const [voteVisible, setVoteVisible] = useState(false);

    // used to display About AccessMap alert
    const [aboutVisible, setAboutVisible] = useState(true);
    const [aboutModalVisible, setAboutModalVisible] = useState(false);

    // Using Tab navigation between structures
    const tabNavigation = (direction) => {
        if (currentlyOpen === null) return;
        let nextIndex = direction === 'next' ? currentlyOpen + 1 : currentlyOpen - 1;
        if (nextIndex < 0) nextIndex = structures.length - 1;
        if (nextIndex >= structures.length) nextIndex = 0;
        setCurrentlyOpen(nextIndex);
    };

    // ScaleBar component, shows scale at bottom of map in meters
    const ScaleBar = () => {
        const map = useMap();

        // When map is scrolled, create a new scale and add that to map
        useEffect(() => {
            const scale = L.control.scale({
                position: "bottomleft",
                imperial: imperial,
                metric: !imperial,
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

    const hideVote = () => {
        setVoteVisible(false);
    };
    let voteAlert = (
        <div className="toast toast-top toast-start top-20">
            <div className="btn btn-md btn-accent rounded-xl text-black">
                <a tabIndex={1} href="https://docs.google.com/forms/d/e/1FAIpQLSe-QxjRotSg4eDOQWcEd5yfNLqkd1wPpFsM9WPHndiQzf-4dA/viewform">
                    <span className="underline text-accent-content">Vote for AccessMap!</span>
                </a>
                <button onClick={hideVote} tabIndex={1}> <X size={20}/> </button>
            </div>
        </div>
    );


    const hideAbout = () => { setAboutVisible(false); };

    let aboutAlert = (
        <div className="toast toast-top toast-start top-20">
            <div className="btn btn-md btn-accent rounded-xl text-black">
                <a tabIndex={1} onClick={showAboutModal}>
                    <span className="underline text-accent-content">About AccessMap</span>
                </a>
                <button onClick={hideAbout} tabIndex={1}> <X size={20}/> </button>
            </div>
        </div>
    );

    const showAboutModal = () => { setAboutModalVisible(true); };
    const hideAboutModal = () => { setAboutModalVisible(false); };

    let aboutModal = (
        <>
            <div className="fixed h-screen w-screen z-50 bg-black/40 flex items-center justify-center">
                <div className="card bg-base-100 w-100 shadow-sm m-2 z-[9999] h-auto max-h-[60vh] overflow-y-scroll cursor-default"
                tabIndex={0}>
                    <div className="card-body flex flex-col justify-between gap-8">

                        <div className='flex flex-col gap-6'>
                            <div className="flex flex-col w-full gap-3">
                                <div className="w-full pointer-events-none flex flex-col gap-3">
                                    <span className='font-bold text-xl'>About AccessMap</span>
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className="w-full bg-base-200 border pointer-events-none p-3 rounded"
                                    style={{resize: 'none'}}>
                                    <span>
                                        AccessMap is a senior design project created in Fall 2025 by 
                                        Ann Regala, Bao Phung, Brooklyn Neubeker, Jared Smith, Natalie Tong, and Primo StaAna (Computer Science). 
                                        Designed as an accessibility-focused event mapping tool, AccessMap allows organizers to
                                        design event layouts, highlight accommodations, support accessibility needs, and share
                                        interactive maps. While AccessMap isn't present today, please be sure to explore and support the
                                        Spring 2026 Senior Design Competition and all of the seniors who have worked hard to
                                        bring change to the world.
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Close button */}
                        <div>
                            <div className="card-actions">
                                <button className="btn btn-sm btn-soft absolute right-4 top-6" 
                                        onClick={hideAboutModal} tabIndex="1">
                                    <X size={16} />
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );


    return (
        <MapContainer 
            center={center} 
            zoom={zoom}
            style={{height: "100vh"}}
            zoomControl={false}
            doubleClickZoom={false}
            maxZoom={22}
            minZoom={18}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxNativeZoom={19}
                maxZoom={22}
                minZoom={18}
                noWrap={true}
            />

            {editing && (
            <Overlay addStructure={addStructure} saveBtnRef={saveBtnRef} saveBtnRef2={saveBtnRef2} saveEventMap={saveEventMap}/>  
            )}

            {editing && (
            <Search apiKey={"annregalab@gmail.com"} baseZoom={zoom}/>
            )}
            <ZoomControl position="bottomright" />   {/* + and - to zoom in and out */}

            {editing && (
            <SetCenter/>
            )}

            {/* Map structures prop as Structure components */}
            {/* Track which structures InfoCard is open through index and isOpen */}
            {structures.map((structure, index) => (
                <Structure
                    key={structure.id}
                    index={index}
                    totalStructures={structures.length}
                    structure={structure}
                    isOpen={currentlyOpen === index}
                    onOpen={() => {setCurrentlyOpen(index); setInfoOpen(true)}}
                    onClose={() => setCurrentlyOpen(null)}
                    onTabNext={() => tabNavigation('next')}
                    onTabPrev={() => tabNavigation('prev')}
                    addStructure={addStructure}
                    removeStructure={removeStructure}
                    imperial={imperial}
                    saveBtnRef={saveBtnRef}
                    saveBtnRef2={saveBtnRef2}
                />
            ))}
            
            <ScaleBar />
            {showGrid && editing && <MapWithGrid />}
            {!editing && !isEmbedded && aboutVisible && aboutAlert /*voteVisible && voteAlert*/}
            {!editing && !isEmbedded && aboutModalVisible && aboutModal}
            {!editing && !isEmbedded && <Legend style={{zIndex:1}} event={event} structures={structures} />}
        </MapContainer>
    );

};

export default Map;
