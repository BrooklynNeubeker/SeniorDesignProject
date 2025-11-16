import { useState, useRef } from "react";
import { X, Utensils, Toilet, BriefcaseMedical, Info, Store, Undo2, Redo2, MapPin } from 'lucide-react';
import TileMapButton from './TileMapButton';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGlobal } from "./GlobalContext";

const Overlay = ({ addStructure, saveBtnRef, saveEventMap }) => {
    const { id } = useParams();
    const {imperial, setImperial} = useGlobal();

    return (
        <div>
            {/* Back to dashboard */}
            <div className="fixed top-20 left-4 pointer-events-auto z-14 flex gap-4">
                <Link to={`/event/${id}/dashboard`} className={`btn btn-primary`}>
                    <span>Back to Dashboard</span>
                </Link>
                {/* Save EventMap*/}
                <button type="button" ref={saveBtnRef} onClick={saveEventMap} className={'btn btn-accent'}>
                    <span>Save</span>
                </button>
            </div>

            {/*
            Undo and redo buttons
            <div className="fixed top-20 left-0 right-0 flex justify-center gap-2 pointer-events-auto">
                <button class="btn shadow-lg">
                    <Undo2 />
                    <span>Undo</span>
                </button>
                <button class="btn shadow-lg">
                    <Redo2 />
                    <span>Redo</span>
                </button>
            </div>
            */}

            <div className="fixed top-20 flex right-4 z-14 gap-4 pointer-events-auto">
                {/* Imperial/metric toggle */}
                <div className="bg-base-100 p-3 pt-2 pb-2 rounded-lg shadow-lg border border-neutral-300">
                    <label className="label text-base-content">
                        Imperial
                        <input type="checkbox" className="toggle checked:toggle-success"
                        checked={!imperial} onChange={() => setImperial((prev) => !prev)}
                        onKeyDown={e => (e.key === "Enter") && e.target.click()}/>
                        Metric
                    </label>
                </div>

                {/* "Add Objects" sidebar drawer */}
                <div className="drawer drawer-end">

                    <input id="add-objects-drawer" type="checkbox" className="drawer-toggle"
                    onKeyDown={e => (e.key === "Enter") && e.target.click()} />
                    <div className="drawer-content">
                        {/* "Add Objects" button */}
                        <label htmlFor="add-objects-drawer" 
                        className="drawer-button btn btn-primary">
                            Add Objects
                        </label>
                    </div>

                    {/* Sidebar drawer */}
                    <div className="drawer-side">
                        <label htmlFor="add-objects-drawer" aria-label="close sidebar" className="drawer-overlay"></label>                   


                        {/* Sidebar content */}
                        <ul className="menu bg-base-200 min-h-full w-80 p-4 pt-20 gap-2">
                            <li className="pointer-events-none">
                                <h1 className="text-lg font-bold">Choose Object to Place</h1>
                            </li>


                            {/* 
                                TileMapButtons for different structures
                                Calls 'addStructure' on click, pass in as prop
                            */}
                            <li>
                                <TileMapButton 
                                name="Food and Beverage" 
                                tagType="dietary"
                                Icon={Utensils} bgColor="#FFCB3D" 
                                iconColor="text-black" 
                                border="border border-neutral-800"
                                onClick={addStructure} />
                            </li>
                            <li>
                                <TileMapButton 
                                name="Retail" 
                                tagType="accessibility"
                                Icon={Store} bgColor="#00D390" 
                                iconColor="text-black" 
                                border="border border-neutral-800"
                                onClick={addStructure} />
                            </li>
                            <li>
                                <TileMapButton 
                                name="Restrooms" 
                                tagType="facility"
                                Icon={Toilet} 
                                bgColor="#1346DD" 
                                iconColor="text-white" 
                                border=""
                                onClick={addStructure} />
                            </li>
                            <li>
                                <TileMapButton 
                                name="Medical" 
                                tagType="medical"
                                Icon={BriefcaseMedical} 
                                bgColor="#E02229" 
                                iconColor="text-white" 
                                border=""
                                onClick={addStructure} />
                            </li>
                            <li>
                                <TileMapButton 
                                name="Information" 
                                tagType="accessibility"
                                Icon={Info} 
                                bgColor="#8204DC" 
                                iconColor="text-white" 
                                border=""
                                onClick={addStructure} />
                            </li>
                            <li>
                                <TileMapButton 
                                name="Tent"
                                Icon={MapPin} 
                                bgColor="#ffffff" 
                                iconColor="text-black"
                                border="border border-neutral-800"
                                onClick={addStructure} />

                            </li>

                            {/* Close button */}
                            <label htmlFor="add-objects-drawer" className="btn btn-md btn-primary fixed left-4 bottom-4 z-20"
                            tabIndex={0}

                            onKeyDown={e => (e.key === "Enter") && e.target.click()}    >
                                <X size={18} />
                                Close
                            </label>
                        </ul>
                    </div>
                    
                </div>
            </div>

        </div>
    );
};

export default Overlay;