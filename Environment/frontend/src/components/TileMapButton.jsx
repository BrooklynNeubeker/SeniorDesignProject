const TileMapButton = ({ name, Icon, bgColor, iconColor }) => {

    return (
        <button className="flex gap-4">
            {Icon && (
                <div className={`flex justify-center items-center p-2 rounded-full ${bgColor}`}>
                <Icon size={18} className={`${iconColor}`} />
                </div>
            )}
            <span className="text-md">{name}</span>
        </button>
    );
};

export default TileMapButton;