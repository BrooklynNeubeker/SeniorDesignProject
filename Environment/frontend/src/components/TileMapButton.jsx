const TileMapButton = ({ name, Icon, bgColor, iconColor, tagType, onClick }) => {

    return (
        <button className="flex gap-4" onClick={() => onClick(name, Icon, bgColor, iconColor, "", tagType)}>
            {Icon && (
                <div className="flex justify-center items-center p-2 rounded-full" style={{ backgroundColor: bgColor }}>
                    <Icon size={18} className={`${iconColor}`} />
                </div>
            )}
            <span className="text-md">{name}</span>
        </button>
    );
};

export default TileMapButton;