import { X, Utensils, Toilet, BriefcaseMedical, Info, Store, Undo2, Redo2 } from 'lucide-react';
import TileMapButton from './TileMapButton';

const Overlay = ({ addStructure }) => {
    
    return (

        <div>

            {/* Undo and redo buttons */}
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

            {/* Sidebar drawer */}
            <div className="drawer drawer-end fixed pointer-events-auto">

                <input id="add-objects-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content pt-20 fixed right-4">
                    {/* Page content here */}
                    <label htmlFor="add-objects-drawer" className="drawer-button btn btn-primary">Add Objects</label>
                </div>

                <div className="drawer-side">
                    <label htmlFor="add-objects-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                    <ul className="menu bg-base-200 min-h-full w-80 p-4 pt-20 gap-2">
                        {/* Sidebar content here */}
                        <li className="pointer-events-none">
                            <h1 className="text-lg font-bold">Choose Object to Place</h1>
                        </li>

                        {/* TileMapButtons here */}
                        <li><TileMapButton 
                            name="Food and Beverage" 
                            tagType="dietary"
                            Icon={Utensils} bgColor="bg-yellow-500" 
                            iconColor="text-white" 
                            onClick={addStructure} />
                        </li>
                        <li><TileMapButton 
                            name="Merchandise" 
                            tagType="accessibility"
                            Icon={Store} bgColor="bg-green-500" 
                            iconColor="text-white" 
                            onClick={addStructure} />
                        </li>
                        <li><TileMapButton 
                            name="Restrooms" 
                            tagType="facility"
                            Icon={Toilet} 
                            bgColor="bg-blue-700" 
                            iconColor="text-white" 
                            onClick={addStructure} />
                        </li>
                        <li><TileMapButton 
                            name="Medical" 
                            tagType="medical"
                            Icon={BriefcaseMedical} 
                            bgColor="bg-red-500" 
                            iconColor="text-white" 
                            onClick={addStructure} />
                        </li>
                        <li><TileMapButton 
                            name="Information" 
                            tagType="accessibility"
                            Icon={Info} 
                            bgColor="bg-purple-600" 
                            iconColor="text-white" 
                            onClick={addStructure} />
                        </li>

                        { }

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
