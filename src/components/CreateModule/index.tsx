import React from 'react';

const CreatModule = () => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Bạn có thể xử lý file ở đây hoặc chuyển nó đến một hàm khác để xử lý.
      console.log("File được chọn:", file.name);
    }
  };

  return (
    <div>
      <h3>CreatModule</h3>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ marginBottom: '20px' }}
      />
      <button
        onClick={() => {
          // Thực hiện hành động khi nhấn nút Import
          console.log("Nút Import được nhấn");
        }}
      >
        Import
      </button>
    </div>
  );
};

export default CreatModule;
