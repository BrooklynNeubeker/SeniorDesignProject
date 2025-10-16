import { useState } from 'react';
import { X, Utensils, Toilet, BriefcaseMedical, Info, Store, Undo2, Redo2, ImportIcon } from 'lucide-react';
import TileMapButton from '../components/TileMapButton';
import Map from '../components/Map';
import EditPage from '../components/EditPage';

const SitePlanPage = () => {
    const [showEditPage, setEditPage] = useState(false);

    return (
        <div>

            <div className="fixed inset-0 -z-10">
                <Map />
            </div>

            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d805.8578922607866!2d-115.14859835226156!3d36.107342274678345!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzbCsDA2JzI1LjQiTiAxMTXCsDA4JzU0LjYiVw!5e0!3m2!1sen!2sus!4v1760383343586!5m2!1sen!2sus" 
            className="h-screen w-screen fixed -z-10"
            allowFullScreen=""
            loading="lazy"
            ></iframe> */}

            <div className="fixed top-20 left-0 right-0 flex justify-center gap-2">
                <button class="btn btn-neutral btn-outline">
                    <Undo2 />
                    <span>Undo</span>
                </button>
                <button class="btn btn-neutral btn-outline">
                    <Redo2 />
                    <span>Redo</span>
                </button>
            </div>

            <div className="drawer drawer-end fixed">

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

                        {/* Objects here */}
                        <li><TileMapButton name="Food and Beverage" Icon={Utensils} bgColor="bg-yellow-500" iconColor="text-white" onClick={() => setEditPage(true)} /></li>
                        <li><TileMapButton name="Vendors" Icon={Store} bgColor="bg-green-500" iconColor="text-white" onClick={() => setEditPage(true)} /></li>
                        <li><TileMapButton name="Restrooms" Icon={Toilet} bgColor="bg-blue-700" iconColor="text-white" onClick={() => setEditPage(true)} /></li>
                        <li><TileMapButton name="Medical" Icon={BriefcaseMedical} bgColor="bg-red-500" iconColor="text-white" onClick={() => setEditPage(true)} /></li>
                        <li><TileMapButton name="Information" Icon={Info} bgColor="bg-purple-600" iconColor="text-white" onClick={() => setEditPage(true)} /></li>

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
            {/*Shows the edit page after clicking a tilemap button*/}
            <EditPage open={showEditPage} onClose={() => setEditPage(false)} title={"Booth Information Initialization"} />
        </div>
    );
};

export default SitePlanPage;