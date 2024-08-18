
import ModuleListPageDataFetcher from "@/src/app/(auth)/danh-muc-hoc-phan/[fileKey]/data-fetcher";
import { BreadCrumb } from "primereact/breadcrumb";


export default function ListRolePage({ params }: { params: {fileKey: string } }) {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'Khóa', url: '/' },
    { label: params.fileKey, url: '/' },
]

  return (
    <div className="grid">
      <BreadCrumb className="ml-3" home={breadcrumbHome} model={breadcrumbItems} />
      <div className="col-12">
        <ModuleListPageDataFetcher />
      </div>
    </div>
  );
}