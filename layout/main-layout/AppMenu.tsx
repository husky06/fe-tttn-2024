import { MenuProvider } from '@/layout/context/menucontext';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { useRouter } from 'next/navigation';
import { importDanhMucHocPhan, getDanhMucHocPhan, KhoaSinhVien, getKhoaSinhVien } from '@/src/app/api/services/moduleService';


const AppMenu = () => {
    const [fileKeys, setFileKeys] = useState<string[]>([]);
    const [fileDetails, setFileDetails] = useState<{ filename: string }[]>([]);
    const [khoaSinhViens, setKhoaSinhViens] = useState<KhoaSinhVien[]>([]);
    const router = useRouter();

    useEffect(() => {
        // Fetch danh sách khoa sinh viên
        async function fetchKhoaSinhViens() {
            try {
                const data = await getKhoaSinhVien(); 
                setKhoaSinhViens(data.data);
    
                setFileDetails(data.data.map(item => ({ filename: item.Url_hoc_phan })));
            } catch (error) {
                console.error('Failed to fetch Khoa Sinh Vien data:', error);
            }
        }

        fetchKhoaSinhViens();
    }, []);
     console.log(khoaSinhViens)
    console.log(fileDetails)
    
    const model = [
        {
            label: 'Import',
            items: [
                { label: 'Upload File', icon: 'pi pi-fw pi-upload', to: '/upload' }
            ]
        },
        {
            label: '',
            items: khoaSinhViens.map((item, index) => ({
                label: `${item.Khoa} - ${item.Hoc_ky}`, 
                icon: 'pi pi-fw pi-id-card',
                to: `/danh-muc-hoc-phan/${item.Url_hoc_phan}`
            }))
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => (
                    <div key={i}>
                        <li className="menu-separator font-semibold">{item.label}</li>
                        <div>
                            {item.items.map((it, index) => (
                                <div key={index} className="p-2">
                                    {it.label === 'Upload File' ? (
                                        <FileUpload mode="basic" name="file" customUpload auto />
                                    ) : (
                                        <a href={it.to} className="text-black">{it.label}</a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
