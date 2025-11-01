import React, { useState } from 'react';
import { useDropzone } from "react-dropzone";
import * as XLSX from 'xlsx';

export const ParseExcel = () => {
    //
    const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet);
        console.log(rows);
    };
    reader.readAsArrayBuffer(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
   <div className="flex flex-col md:flex-row gap-4">
        {/* Upload area */}
        <div {...getRootProps({className: "flex-1 border-2 border-dashed p-4 text-center rounded-lg bg-base-200",})}>
            <input {...getInputProps()} />
            <p className="font-medium">Drag an .xlsx file here or click to browse</p>
        </div>

        {/* Preview area */}
        <div className="flex-1 border p-4 rounded-lg bg-base-100">
            <p className="font-semibold mb-2">Preview</p>
            <div className="text-sm text-base-content/60">
                <p>No file loaded </p>
            </div>
        </div>
    </div>

    );
}

export default ParseExcel;
