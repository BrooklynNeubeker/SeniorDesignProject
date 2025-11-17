import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useMap } from 'react-leaflet';

const PreviewInfoCard = ({ structure, structureName, structureDimensions, structureDescription, structureTags, imperial, onClose }) => {

    const map = useMap();
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;

        const handleFocus = () => map.scrollWheelZoom.disable();
        const handleBlur = () => map.scrollWheelZoom.enable();

        if (card) {
            card.addEventListener("mouseenter", handleFocus);
            card.addEventListener("mouseleave", handleBlur);
        }

        return () => {
        if (card) {
            card.removeEventListener("mouseenter", handleFocus);
            card.removeEventListener("mouseleave", handleBlur);
        }
        };
    }, [map]);
    
    return (
        <>
            <div className="card bg-base-100 w-100 shadow-sm m-2 mt-30 z-9999 h-auto cursor-default"
            ref={cardRef}
            tabIndex={0}>
                <div className="card-body flex flex-col justify-between gap-8">

                    <div className='flex flex-col gap-6'>
                        {/* Structure name - read only */}
                        <div className="flex flex-col w-full gap-3">
                            <label className='font-bold'>Structure Name:</label>
                            <div className="input input-bordered w-full font-bold text-lg bg-gray-100 pointer-events-none">
                                {structureName}
                            </div>
                        </div>

                        {/* Tags - read only */}
                        <div className="flex flex-wrap gap-2">
                            {structureTags && structureTags.length > 0 ? (
                                structureTags.map((tag) => (
                                    <div key={tag} className="badge badge-outline">
                                        {tag}
                                    </div>
                                ))
                            ) : (
                                <span className="text-gray-500">No tags</span>
                            )}
                        </div>

                        {/* Dimensions - read only */}
                        <div className="flex flex-col flex-wrap gap-2">
                            <div className='flex flex-row items-center justify-between'>
                                <label className='w-70 font-bold'>Width: </label>
                                <span className="input input-bordered w-full bg-gray-100 pointer-events-none">{structureDimensions[0]}</span>
                                {imperial ? 
                                        <span className="px-2">feet</span> 
                                        : <span className="px-2">meters</span> }
                            </div>
                            <div className='flex flex-row items-center justify-between'>
                                <label className='w-70 font-bold'>Length: </label>
                                <span className="input input-bordered w-full bg-gray-100 pointer-events-none">{structureDimensions[1]}</span>
                                {imperial ? 
                                        <span className="px-2">feet</span> 
                                        : <span className="px-2">meters</span> }
                            </div>
                        </div>

                        {/* Description - read only */}
                        <div>
                            <label className='font-bold'>Description:</label>
                            <div className="textarea textarea-bordered w-full bg-gray-100 pointer-events-none p-3 rounded"
                                 style={{resize: 'none'}}>
                                {structureDescription ? <span>{structureDescription}</span> 
                                : 
                                <span className="text-neutral-500">No description</span>}
                            </div>
                        </div>
                    </div>

                    {/* Close button */}
                    <div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-sm btn-primary" onClick={onClose}>
                                <X size={16} />
                                Close
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default PreviewInfoCard;
