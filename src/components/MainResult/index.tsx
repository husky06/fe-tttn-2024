import { useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom"; // Sử dụng useNavigate

type Props = {};

// Sample data for testing
const sampleData = [
  { id: 1, roleName: "Admin", roleSize: 5 },
  { id: 2, roleName: "User", roleSize: 100 },
  { id: 3, roleName: "Guest", roleSize: 50 },
  { id: 4, roleName: "Moderator", roleSize: 20 },
];

export default function MainResult({}: Props) {
  const toast = useRef(null);
  const navigate = useNavigate();

  return (
    <div>
      <div className="col-12">
        <Toast ref={toast} position="top-center" />
        <div className="card">
          <Button
            label="Thêm mới"
            severity="success"
            outlined
            onClick={() => {
              navigate("/module/create");
            }}
          />
          <h5>Danh sách lop học phần (roles)</h5>
          <DataTable
            value={sampleData}
            scrollable
            scrollHeight="700px"
            className="mt-3"
            tableStyle={{ minWidth: '50rem' }}
          >
            <Column
              field="roleName" // Đặt tên field cho cột
              header="Tên quyền"
              style={{ flexGrow: 1, flexBasis: "160px" }}
              frozen
              className="font-bold"
            />
            <Column
              field="roleSize" 
              header="Sĩ số"
              style={{ flexGrow: 1, flexBasis: "100px" }}
            />
            <Column
              field="actions" 
              header="Tác vụ"
              style={{ flexGrow: 1, flexBasis: "200px" }}
              body={(data) => (
                <div className="flex gap-3">
                  <Button
                    label="Export"
                    severity="secondary"
                    outlined
                    onClick={() => {}}
                  />
                  <Button
                    label="Detail"
                    severity="secondary"
                    outlined
                    onClick={() => {
                        navigate(`/year/resultLHP`); // Chuyển hướng đến trang chi tiết với ID
                      }}
                  />
                </div>
              )}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
}
