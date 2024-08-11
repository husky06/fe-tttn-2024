import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { useSessionStorage } from 'primereact/hooks';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';

export default function ListModulePageView() {
    const router = useRouter();
    const toast = useRef<Toast>(null);
    const [resultMessage, setResultMessage] = useSessionStorage('', 'result-message');
    const [sheetNames, setSheetNames] = useState<string[]>([]);

    useEffect(() => {
        const savedSheetNames = localStorage.getItem('currentSheetNames');
        if (savedSheetNames) {
            setSheetNames(JSON.parse(savedSheetNames));
        }

        if (resultMessage) {
            toast.current?.show({
                severity: 'info',
                summary: resultMessage
            });
            setResultMessage('');
        }
    }, [resultMessage, setResultMessage]);

    return (
        <div className="col-12">
            <Toast ref={toast} position="top-center" />
            <div className="card">
                <h5>Danh sách học phần</h5>
                <DataTable scrollable scrollHeight="700px" className="mt-3">
                    <Column
                        field="sheetNames"
                        header="Tên các sheet"
                        style={{ flexGrow: 1, flexBasis: '200px' }}
                        body={() => (
                            <ul>
                                {sheetNames.map((sheetName, index) => (
                                    <li key={index}>{sheetName}</li>
                                ))}
                            </ul>
                        )}
                    ></Column>
                    <Column
                        header="Tác vụ"
                        style={{ flexGrow: 1, flexBasis: '200px' }}
                        body={() => (
                            <div className="flex gap-3">
                                <Button label="Thêm" severity="secondary" outlined onClick={() => {}} />
                                <Button label="Export" severity="secondary" outlined onClick={() => {}} />
                            </div>
                        )}
                    ></Column>
                    
                </DataTable>
                
            </div>
        </div>
    );
}
