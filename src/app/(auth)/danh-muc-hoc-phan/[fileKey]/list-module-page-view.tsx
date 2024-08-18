import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { getDanhMucHocPhan, getKhoaSinhVien, KhoaSinhVien } from '@/src/app/api/services/moduleService';
import { useRouter } from 'next/navigation';

type PropComponent ={
    khoasinhvien : KhoaSinhVien;
}
export default function ListModulePageView(props: PropComponent) {
    console.log(props.khoasinhvien)
    const [fileKeys, setFileKeys] = useState<string[]>([]);
    const [fileDetails, setFileDetails] = useState<{ filename: string, fileKey: string }[]>([]);
    const [classMenu, setClassMenu] = useState<any[]>([]);
    const [selectedFileKey, setSelectedFileKey] = useState<string | null>(null);
    const router = useRouter();
    useEffect(() => {
        async function fetchKhoaSinhViens() {
            try {
                const data = await getKhoaSinhVien();
                const details = data.data.map(item => ({
                    filename: item.Url_hoc_phan,
                 
                }));
                setFileDetails(details);
                setFileKeys(details.map(detail => detail.filename));
                if (details.length > 0) {
                    setSelectedFileKey(details[0].filename); // Chọn fileKey đầu tiên làm mặc định
                }
            } catch (error) {
                console.error('Failed to fetch Khoa Sinh Vien data:', error);
            }
        }

        fetchKhoaSinhViens();
    }, []);

    useEffect(() => {
        if (selectedFileKey) {
            const fetchData = async () => {
                try {
                    const response = await getDanhMucHocPhan(selectedFileKey);
                    setClassMenu(response.data);
                } catch (error) {
                    console.error('Failed to fetch data:', error);
                }
            }
            fetchData();
        }
    }, [selectedFileKey]);

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
                    // Chuyển hướng đến trang chi tiết với `fileKey` và `sku`
                    router.push(`/${selectedFileKey}/${rowData.sku}`);
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
                {/* <div className="mb-3 ">
                    {fileDetails.map(detail => (
                        <Button
                            key={detail.filename}
                            label={detail.filename}
                            onClick={() => handleFileSelection(detail.filename)}
                            className={`mr-2 mb-2 ${selectedFileKey === detail.filename ? 'p-button-secondary' : ''}`}
        
                        />
                    ))}
                </div> */}
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
