import { X } from 'lucide-react';

const InfoCard = ({ stallName, setStallName, stallDescription, setStallDescription, tagType, tagTypeList, 
                    stallTags, addTag, removeTag, selectedTag, setSelectedTag, onClose }) => {
    
    return (
        <>
            <div className="card bg-base-100 w-75 shadow-sm m-2 mt-20">
                <div className="card-body flex gap-6">

                    {/* Edit stall name */}
                    <input
                        type="text"
                        value={stallName}
                        onChange={(e) => setStallName(e.target.value)}
                        className="input input-bordered w-full mb-2 font-bold text-lg"
                    />

                    {/* Accessibility tags */}
                    <div className="flex flex-wrap gap-2">
                        {stallTags.map((tag) => (
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
                            value={selectedTag}
                            onChange={(e) => setSelectedTag(e.target.value)} 
                            className="select">
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

                    {/* Edit stall description */}
                    <div>
                        <label>Enter a description for this stall:</label>
                        <textarea
                            value={stallDescription}
                            onChange={(e) => setStallDescription(e.target.value)}
                            className="textarea textarea-bordered w-full"
                            rows={3}
                            placeholder="Description here..."
                        />
                    </div>

                    {/* Close button for info card */}
                    <div className="card-actions justify-end">
                        <button className="btn btn-sm" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InfoCard;
