import { X } from 'lucide-react';

const InfoCard = ({ structureName, setStructureName, structureDescription, setStructureDescription, tagType, tagTypeList, 
                    structureTags, addTag, removeTag, selectedTag, setSelectedTag, structureDimensions, setStructureDimensions,
                    onClose }) => {
    
    return (
        <>
            <div className="card bg-base-100 w-75 shadow-sm m-2 mt-20 z-9999">
                <div className="card-body flex gap-6">

                    {/* Edit stall name */}
                    <input
                        type="text"
                        value={structureName}
                        onChange={(e) => setStructureName(e.target.value)}
                        className="input input-bordered w-full mb-2 font-bold text-lg"
                    />

                    {/* Accessibility tags */}
                    <div className="flex flex-wrap gap-2">
                        {structureTags.map((tag) => (
                            <div key={tag} className="badge bg-amber-200 relative group">
                                {tag}
                                <X onClick={() => removeTag(tag)} className="hidden group-hover:block w-3 cursor-pointer" />
                            </div>
                        ))}
                    </div>

                    {/* Dropdown menu to add tags */}
                    <div className="flex items-center">
                        <fieldset className="fieldset w-full">
                            <select 
                                className="select"
                                value={selectedTag} 
                                onChange={(e) => setSelectedTag(e.target.value)}
                            >
                                <option disabled={true} value="">Add {tagType} details</option>
                                {tagTypeList.map((tag) => (
                                    <option key={tag} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                            </select>
                        </fieldset>
                        <button className="btn" onClick={addTag}>+</button>
                    </div>

                    {/* Change dimensions of structure */}
                    <div className='flex flex-col'>
                        <div className='flex flex-row items-center justify-between'>
                            <label className='w-70 font-bold'>Width:</label>
                            <input
                                type="text"
                                value={structureDimensions[0]}
                                onChange={(e) => setStructureDimensions([e.target.value, structureDimensions[1]])}
                                className="input input-bordered w-full mb-2"
                            />
                            <span className="px-2 text-gray-500">meters</span>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                            <label className='w-70 font-bold'>Length:</label>
                            <input
                                type="text"
                                value={structureDimensions[1]}
                                onChange={(e) => setStructureDimensions([structureDimensions[0], e.target.value])}
                                className="input input-bordered w-full mb-2"
                            />
                            <span className="px-2 text-gray-500">meters</span>
                        </div>
                    </div>

                    {/* Edit stall description */}
                    <div>
                        <label>Enter a description for this stall:</label>
                        <textarea
                            value={structureDescription}
                            onChange={(e) => setStructureDescription(e.target.value)}
                            className="textarea textarea-bordered w-full"
                            rows={3}
                            placeholder="Description here..."
                        />
                    </div>

                    {/* Close button for info card */}
                    <div className="card-actions justify-end">
                        <button className="btn btn-sm" onClick={onClose}>
                            <X size={16} />
                            Close
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default InfoCard;
