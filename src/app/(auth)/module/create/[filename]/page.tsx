import { BreadCrumb } from "primereact/breadcrumb";
import ModuleListPageDataFetcher from "./data-fetcher";

export default function ListRolePage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/module' },
    { label: 'danh sách học phần', url: '/module/create/[filename]' }]

  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
      <div className="col-12">
        <ModuleListPageDataFetcher />
      </div>
    </div>
  );
}