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
    <div {...getRootProps({ className: "border-2 border-dashed p-4 text-center rounded-lg" })}>
        <input {...getInputProps()} />
        <p>Drag and drop your Excel or CSV file here</p>
    </div>
    );
}

export default ParseExcel;
