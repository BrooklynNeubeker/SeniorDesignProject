import { useState } from 'react';
import { X, Trash2 } from 'lucide-react';

const InfoCard = ({ structure, structureName, setStructureName, structureDescription, setStructureDescription, tagType, tagTypeList, 
                    structureTags, setStructureTags, structureDimensions, setStructureDimensions,
                    onClose, removeStructure }) => {

    const [selectedTag, setSelectedTag] = useState("")  // State and setter for selecting which tag to add
    const [customTag, setCustomTag] = useState("")

    // Add selectedTag to array of structureTags
    const addTag = (value) => {
        if (value && !structureTags.includes(value)) {
            setStructureTags([...structureTags, value])
            setCustomTag("")
        }
    }

    // Remove tag from array of structureTags
    const removeTag = (tagName) => {
        setStructureTags(structureTags.filter((tag) => tag !== tagName));
    }
    
    return (
        <>
            <div className="card bg-base-100 w-75 shadow-sm m-2 z-9999">
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

                    {/* Dropdown menu to add tags, input for custom tags */}
                    <div className='flex flex-col gap-3'>
                        <label className='font-bold'>Tagging:</label>
                        {tagTypeList.length > 0 && (
                            <div className="flex items-center">
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
                                    <option value="custom_tag">Custom</option>
                                </select>
                                <button className="btn ml-2" onClick={() => {
                                    if(selectedTag && selectedTag !== "custom_tag") addTag(selectedTag);
                                }}>+</button>
                            </div>
                        )}

                        {(tagTypeList.length === 0 || selectedTag === "custom_tag") && (
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Enter a custom tag..."
                                    value={customTag}
                                    onChange={(e) => setCustomTag(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && addTag(customTag)}
                                />
                                <button className="btn ml-2" onClick={() => {addTag(customTag)}}>+</button>
                            </div>
                        )}
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

                    {/* Close and delete button for info card */}
                    <div className="card-actions justify-between">
                        <button className="btn btn-sm btn-error" onClick={() => (removeStructure(structure.id))}>
                            <Trash2 size={16}/>
                            Delete
                        </button>
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
