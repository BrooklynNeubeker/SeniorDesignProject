import { useEffect } from 'react';

const ModalWindow = ({ open, onClose, type, action, input }) => {
    useEffect(() => {
        if (!open) return;

        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open) return null;

    let title = "";
    let text = "";
    let actionBtnText = "";
    let actionBtnTheme = ""

    switch(type) {
        case "confirmDelete": {
            title = "Delete selected stalls";

            if (input == 1)
                text = "Are you sure you want to delete " + input + " stall? This action cannot be undone."
            else
                text = "Are you sure you want to delete " + input + " stalls? This action cannot be undone."
            
            actionBtnText = "Delete";
            actionBtnTheme = "btn btn-error btn-outline flex-1";
            break;
        }
        case "exportStalls": {
            title = "Export stalls to Excel";
            text = "Would you like to export all stall data to an Excel spreadsheet (.xlsx)?"
            actionBtnText = "Export";
            actionBtnTheme = "btn btn-primary btn-outline flex-1";
            break;
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
            <div className="bg-white p-6 rounded shadow-lg z-10 w-96">
                <h2 className="text-lg font-bold mb-4 text-center">{title}</h2>
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative inline-flex items-center justify-center">
                            {text}
                        </div>
                    </div>

                <div className="flex gap-2 mt-6">
                    <button className={actionBtnTheme} onClick={action}>
                        {actionBtnText}
                    </button>
                    
                    <button className="btn btn-primary btn-outline flex-1" onClick={onClose}>Cancel</button>
                </div>
                
            </div>
        </div>
    );
};

export default ModalWindow;
