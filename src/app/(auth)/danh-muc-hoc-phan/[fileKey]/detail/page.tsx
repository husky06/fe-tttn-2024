
import ModuleListPageDataFetcher from "@/src/app/(auth)/danh-muc-hoc-phan/[fileKey]/detail/data-fetcher";
import { BreadCrumb } from "primereact/breadcrumb";


export default function ListRolePage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách học phần', url: '${fileKey[index]}/${sku[index]}' }]

  return (
    <div className="grid">
      <BreadCrumb className="ml-3" home={breadcrumbHome} model={breadcrumbItems} />
      <div className="col-12">
        <ModuleListPageDataFetcher/>
      </div>
    </div>
  );
}