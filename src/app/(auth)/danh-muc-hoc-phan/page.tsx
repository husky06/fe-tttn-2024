import { BreadCrumb } from "primereact/breadcrumb";


export default function ListModulePage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách học phần', url: '/danh-muc-hoc-phan' }]

  return (
    <div className="grid">
      <BreadCrumb className="ml-3" home={breadcrumbHome} model={breadcrumbItems} />
      <div className="col-12">
      </div>
    </div>
  );
}