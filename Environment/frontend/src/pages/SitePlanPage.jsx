import { useState } from 'react';
import Map from '../components/Map';
import Overlay from '../components/Overlay';
import EditPage from '../components/EditPage';

const SitePlanPage = () => {
    const [showEditPage, setEditPage] = useState(false);

    return (
        <div>

            <div className="fixed inset-0 -z-10">
                <Map />
            </div>

            <Overlay/>

            {/*Shows the edit page after clicking a tilemap button*/}
            <EditPage open={showEditPage} onClose={() => setEditPage(false)} title={"Booth Information Initialization"} />
        </div>
    );
};

export default SitePlanPage;