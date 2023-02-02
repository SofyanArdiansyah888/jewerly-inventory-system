import { Lucide, SkeletonTable } from "@/base-components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBoxes, useDetailBox } from "../../../hooks/useBox";

function Detail() {
  const [search, setSearch] = useState("");
  const { id: idBox } = useParams();
  const { data: boxes, isLoading: loading } = useDetailBox(idBox);
  const navigate = useNavigate()
  
  const filterData = () => {
    return boxes?.filter((item) =>
      item.nama_box.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Box</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-between mt-2">
          <button
            className="btn btn-primary btn-sm  w-24 mr-1"
            onClick={() => navigate('/daftar-box')}
          >
            <span className="flex items-center justify-center mr-2">
              <Lucide icon="ArrowLeft" />
            </span>
            Kembali
          </button>
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
              <input
                type="text"
                className="form-control w-56 box pr-10"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div>
          </div>
        </div>

        {/* BEGIN: Data List */}
        <div className="intro-y col-span-12 overflow-scroll lg:overflow-hidden ">
          {loading ? (
            <SkeletonTable />
          ) : (
            <table className="table table-report -mt-2">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">No</th>
                  <th className="whitespace-nowrap">Nama Box</th>
                  <th className="whitespace-nowrap">Nama Produk</th>
                  <th className="whitespace-nowrap">Kadar</th>
                  <th className="whitespace-nowrap">Stok</th>
                </tr>
              </thead>
              <tbody>
                {filterData()?.map((box, key) => (
                  <tr key={key} className="intro-x">
                    <td className="font-medium ">{key + 1}</td>
                    <td>
                      <div className="whitespace-nowrap capitalize">
                        {box.nama_box ? box.nama_box : "-"}
                      </div>
                    </td>
                    <td>
                    <div className="whitespace-nowrap capitalize font-semibold">
                        {box.nama_produk ? box.nama_produk : "-"} <br />
                        <div className="font-light">
                          {box.kode ? box.kode : "-"}{" "}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-nowrap capitalize">
                        {box.kadar ? box.kadar : "-"}
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-nowrap capitalize">
                      {box.stok ? box.stok : "0"} Pcs <br />
                        <div className="font-light">
                          {box.berat_stok ? box.berat_stok : "0"} Gram
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {filterData()?.length === 0 && (
                  <td colSpan={99} className="text-center text-lg font-light">
                    You don't have data to display
                  </td>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Detail;
