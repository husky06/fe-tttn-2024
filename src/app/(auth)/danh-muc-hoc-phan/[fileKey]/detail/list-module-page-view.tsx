import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { getDanhMucHocPhan, getHocPhan, getKhoaSinhVien } from '@/src/app/api/services/moduleService';

export default function ListClassModulePageView() {
    const [fileKeys, setFileKeys] = useState<string[]>([]);
    const [fileDetails, setFileDetails] = useState<{ filename: string, fileKey: string }[]>([]);
    const [classMenu, setClassMenu] = useState<any[]>([]);
    const [selectedFileKey, setSelectedFileKey] = useState<string | null>(null);

    useEffect(() => {
        async function fetchKhoaSinhViens() {
            try {
                const data = await getKhoaSinhVien();
                const details = data.data.map(item => ({
                    filename: item.Url_hoc_phan,
                    fileKey: item.fileKey
                }));
                setFileDetails(details);
                setFileKeys(details.map(detail => detail.fileKey));
                if (details.length > 0) {
                    setSelectedFileKey(details[0].fileKey); // Chọn fileKey đầu tiên làm mặc định
                }
            } catch (error) {
                console.error('Failed to fetch Khoa Sinh Vien data:', error);
            }
        }

        fetchKhoaSinhViens();
    }, []);

    useEffect(() => {
        if (selectedFileKey && classMenu.length > 0) {
            const fetchAllHocPhanDetails = async () => {
                try {
                    // Lấy danh sách các `sku` từ `classMenu`
                    const skus = classMenu.map(item => item.sku);
    
                    // Thực hiện các request song song cho từng `sku`
                    const responses = await Promise.all(
                        skus.map(sku => getHocPhan(selectedFileKey, sku))
                    );
    
                    // Kết hợp dữ liệu nếu cần và xử lý
                    console.log('All Hoc Phan Details:', responses);
                    // setClassMenu(responses); // Nếu cần cập nhật lại `classMenu` với dữ liệu mới
                } catch (error) {
                    console.error('Failed to fetch data:', error);
                }
            };
    
            fetchAllHocPhanDetails();
        }
    }, [selectedFileKey, classMenu]);
    
    

    const handleFileSelection = (fileKey: string) => {
        setSelectedFileKey(fileKey);
    };

    const renderActions = (rowData: any) => {
        return (
            <div className="flex gap-3">
                <Button
                    label="Detail"
                    severity="secondary"
                    outlined
                    onClick={() => {
                        // Xử lý khi bấm nút Detail
                    }}
                />
                <Button
                    label="Export"
                    severity="secondary"
                    outlined
                    onClick={() => {
                        // Xử lý khi bấm nút Export
                    }}
                />
            </div>
        );
    };

    return (
        <div className="col-12">
            <div className="card">
                <h5>Danh sách học phần</h5>
                <div className="mb-3 ">
                    {fileDetails.map(detail => (
                        <Button
                            key={detail.fileKey}
                            label={detail.filename}
                            onClick={() => handleFileSelection(detail.fileKey)}
                            className={`mr-2 mb-2 ${selectedFileKey === detail.fileKey ? 'p-button-secondary' : ''}`}
        
                        />
                    ))}
                </div>
                <DataTable value={classMenu} scrollable scrollHeight="700px" className="mt-3">
                    <Column field="Lớp học phần" header="Tên lớp học phần" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                    <Column
                        header="Tác vụ"
                        style={{ flexGrow: 1, flexBasis: '200px' }}
                        body={renderActions}
                    ></Column>
                </DataTable>
            </div>
        </div>
    );
}
