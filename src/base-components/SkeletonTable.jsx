import { useEffect, useState } from "react";

export default function SkeletonTable() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems([]);
    for (let i = 0; i < 13; i++) {
      setItems((item) => [...item, i]);
    }
  }, []);
  return (
    <>
      <div role="status" className="col-span-12  mt-8">
        {items.map((index) => (
          <div key={index} className="h-8 bg-gray-200 rounded-md  dark:bg-gray-700 w-full mb-2"></div>
        ))}
      </div>
    </>
  );
}
