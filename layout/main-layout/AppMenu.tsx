import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu } from 'primereact/menu';
import { FileUpload } from 'primereact/fileupload';
import * as xlsx from 'xlsx';

interface FileData {
    fileName: string;
    sheetNames: string[];
}

const AppMenu = () => {
    const [filesData, setFilesData] = useState<FileData[]>([]);
    const router = useRouter();

    useEffect(() => {
        const savedFilesData = localStorage.getItem('filesData');
        if (savedFilesData) {
            setFilesData(JSON.parse(savedFilesData));
        }
    }, []);

    const handleUpload = (event: { files: any[]; }) => {
        const file = event.files[0];


        if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            const reader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {
                const result = e.target?.result;
                if (result instanceof ArrayBuffer) {
                    const data = new Uint8Array(result);
                    const workbook = xlsx.read(data, { type: 'array' });
                    const sheetNames = workbook.SheetNames;

                    const newFileData: FileData = {
                        fileName: file.name,
                        sheetNames: sheetNames
                    };

                    const updatedFilesData = [...filesData, newFileData];
                    setFilesData(updatedFilesData);
                    localStorage.setItem('filesData', JSON.stringify(updatedFilesData));
                }
            };

            reader.readAsArrayBuffer(file);
        } else {
            console.error('Please upload a valid xlsx file.');
        }
    };

    const menuModel = filesData.map(fileData => ({
        label: fileData.fileName,
        icon: 'pi pi-fw pi-file',
        command: () => { router.push(`/module/create/${encodeURIComponent(fileData.fileName)}`); } 
    }));

    return (
        <div>
            <FileUpload name="file" customUpload uploadHandler={handleUpload} auto chooseLabel="Chọn file xlsx" />
            <Menu model={menuModel} />
        </div>
    );
};

export default AppMenu;
