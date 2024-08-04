import { useState } from "react";
import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom"; 

export function Menu() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([
    { name: "Khóa 21", path: "/year" },
    { name: "Khóa 22", path: "/year" },
    { name: "Khóa 23", path: "/year" },
    { name: "Khóa 24", path: "/year" },
  ]);

  const handleAddItem = () => {
    if (newItem.trim()) {
   
      setItems([...items, { name: newItem, path: `/year` }]);
      setNewItem("");
    }
  };

  return (
    <div className="flex h-screen">
      <div className={`fixed top-0 left-0 h-full transition-transform duration-300 w-52 bg-[#d5d6f5]`}>
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Collapse label="Khóa">
                {items.map((item, index) => (
                  <Sidebar.Item key={index} as={Link} to={item.path} className="justify-normal items-start">
                    {item.name}
                  </Sidebar.Item>
                ))}
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <div className="p-4 bg-black">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="p-2 border rounded w-full mb-2"
            placeholder="Add new item"
          />
          <button
            onClick={handleAddItem}
            className="p-2 bg-blue-500 text-white rounded w-full"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
