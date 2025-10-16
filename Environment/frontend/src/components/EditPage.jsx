import { useEffect } from 'react';

const EditPage = ({ open, onClose, title}) => {
    useEffect(() => {
        if (!open) return;

        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
            <div className="bg-white p-6 rounded shadow-lg z-10 w-80">
                <h2 className="text-lg font-bold mb-2">{title}</h2>
                <button className="btn btn-sm mt-2" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default EditPage;
