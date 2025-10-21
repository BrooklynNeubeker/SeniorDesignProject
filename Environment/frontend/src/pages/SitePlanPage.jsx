import { useState, useCallback } from 'react';
import Map from '../components/Map';
import Overlay from '../components/Overlay';
import EditPage from '../components/EditPage';

const SitePlanPage = () => {
    const [showEditPage, setEditPage] = useState(false);
    const [shapes, setShapes] = useState([]);
    const [selectedShape, setSelectedShape] = useState(null);

    const handleShapeCreated = useCallback((shapeData) => {
        const { type, geoJson, layer } = shapeData;
        const newShape = {
            id: Date.now(),
            type,
            geoJson,
            layer,
            properties: {}  // You can add custom properties here
        };
        setShapes(prevShapes => [...prevShapes, newShape]);
        setSelectedShape(newShape);
        setEditPage(true);  // Open edit page when a shape is created
    }, []);

    const handleShapeEdited = useCallback((editedLayers) => {
        setShapes(prevShapes => {
            const updatedShapes = [...prevShapes];
            editedLayers.forEach(({ geoJson, layer }) => {
                // Find and update the edited shape
                const shapeIndex = updatedShapes.findIndex(s => s.layer === layer);
                if (shapeIndex !== -1) {
                    updatedShapes[shapeIndex] = {
                        ...updatedShapes[shapeIndex],
                        geoJson
                    };
                }
            });
            return updatedShapes;
        });
    }, []);

    const handleShapeDeleted = useCallback((deletedLayers) => {
        setShapes(prevShapes => {
            const remainingShapes = prevShapes.filter(shape =>
                !deletedLayers.some(({ layer }) => layer === shape.layer)
            );
            return remainingShapes;
        });
        if (selectedShape && deletedLayers.some(({ layer }) => layer === selectedShape.layer)) {
            setSelectedShape(null);
            setEditPage(false);
        }
    }, [selectedShape]);

    const handleEditPageClose = () => {
        setEditPage(false);
        setSelectedShape(null);
    };

    return (
        <div>
            <div className="fixed inset-0 -z-10">
                <Map
                    shapes={shapes}
                    onShapeCreated={handleShapeCreated}
                    onShapeEdited={handleShapeEdited}
                    onShapeDeleted={handleShapeDeleted}
                />
            </div>
            <Overlay />

            <EditPage
                open={showEditPage}
                onClose={handleEditPageClose}
                title={selectedShape ? `Edit ${selectedShape.type}` : "Booth Information Initialization"}
                shape={selectedShape}
            />
        </div>
    );
};

export default SitePlanPage;