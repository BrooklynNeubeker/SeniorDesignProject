const TileMapButton = ({ name, Icon, bgColor, iconColor, tagType, border, onClick }) => {

    return (
        <button className="flex gap-4" onClick={() => onClick(name, Icon, bgColor, iconColor, border, "", tagType)}>
            {Icon && (
                <div className={`flex justify-center items-center p-2 rounded-full ${border}`} style={{ backgroundColor: bgColor }}>
                    <Icon size={18} className={`${iconColor}`} />
                </div>
            )}
            <span className="text-md">{name}</span>
        </button>
    );
};

export default TileMapButton;