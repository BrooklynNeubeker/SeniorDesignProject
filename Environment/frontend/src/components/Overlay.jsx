import { useState } from "react";
import { X, Utensils, Toilet, BriefcaseMedical, Info, Store, Undo2, Redo2, MapPin } from 'lucide-react';
import TileMapButton from './TileMapButton';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUnit } from "./UnitContext";

const Overlay = ({ addStructure }) => {
    const { id } = useParams();
    const {imperial, setImperial} = useUnit();

    return (
        <div>
            {/* Back to dashboard */}
            <div className="fixed top-5 left-4 pointer-events-auto z-14">
                <Link to={`/event/${id}/dashboard`} className={`btn btn-primary`}>
                    <span>Back to Dashboard</span>
                </Link>
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

            {/* "Add Objects" sidebar drawer */}
            <div className="drawer drawer-end fixed pointer-events-auto">

                <input id="add-objects-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content pt-5 fixed right-4">
                    {/* "Add Objects" button */}
                    <label htmlFor="add-objects-drawer" className="drawer-button btn btn-primary">Add Objects</label>

                    {/* Imperial/metric toggle */}
                    <div className="fixed bottom-12 right-4 pointer-events-auto z-14 rounded border border-base-400 bg-base-100 p-1">
                        <label className="label text-base-content">
                            Imperial
                            <input type="checkbox" className="toggle text-base-content bg-base-100/50" checked={!imperial} onChange={() => setImperial((prev) => !prev)} />
                            Metric
                        </label>
                    </div>
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
                            Icon={Utensils} bgColor="#efb100" 
                            iconColor="text-white" 
                            border=""
                            onClick={addStructure} />
                        </li>
                        <li>
                            <TileMapButton 
                            name="Retail" 
                            tagType="accessibility"
                            Icon={Store} bgColor="#00c951" 
                            iconColor="text-white" 
                            border=""
                            onClick={addStructure} />
                        </li>
                        <li>
                            <TileMapButton 
                            name="Restrooms" 
                            tagType="facility"
                            Icon={Toilet} 
                            bgColor="#1447e6" 
                            iconColor="text-white" 
                            border=""
                            onClick={addStructure} />
                        </li>
                        <li>
                            <TileMapButton 
                            name="Medical" 
                            tagType="medical"
                            Icon={BriefcaseMedical} 
                            bgColor="#fb2c36" 
                            iconColor="text-white" 
                            border=""
                            onClick={addStructure} />
                        </li>
                        <li>
                            <TileMapButton 
                            name="Information" 
                            tagType="accessibility"
                            Icon={Info} 
                            bgColor="#9810fa" 
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
                            border="border border-neutral-400"
                            onClick={addStructure} />
                        </li>

                        {/* Close button */}
                        <li className="mb-4">
                            <label htmlFor="add-objects-drawer" className="btn btn-md fixed left-4 bottom-4">
                                <X size={18} />
                                Close
                            </label>
                        </li>
                    </ul>

                </div>
                
            </div>

        </div>
    );
};

export default Overlay;