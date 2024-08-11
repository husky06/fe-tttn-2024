import { BreadCrumb } from "primereact/breadcrumb";


export default function ListModulePage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/module' },
    { label: 'danh sách quyền', url: '/module/create/${filename}' }]

  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
      <div className="col-12">
 
      </div>
    </div>
  );
}