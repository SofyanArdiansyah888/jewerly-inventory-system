import { Lucide, SkeletonTable } from "@/base-components";
import { useState } from "react";
// import EmptyData from "../../components/EmptyData";
import { useDetailTalang } from "../../../hooks/useTalang";

import { useNavigate, useParams } from "react-router-dom";

function Index() {
  const [search, setSearch] = useState("");
  const { id: idTalang } = useParams();
  const { data: talangs, isLoading: loading } = useDetailTalang(idTalang);
  const navigate = useNavigate();

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Detail Talang</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-between mt-2">
          <button
            className="btn btn-primary btn-sm  w-24 mr-1"
            onClick={() => navigate("/daftar-talang")}
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
                className="form-control w-56 talang pr-10"
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
              {talangs?.map((talang, key) => (
                <tr key={key} className="intro-x">
                  <td className="font-medium ">{key + 1}</td>
                  <td>
                    <div className="whitespace-nowrap capitalize">
                      {talang.nama_talang ? talang.nama_talang : "-"}
                    </div>
                  </td>
                  <td>
                  <div className="whitespace-nowrap capitalize font-semibold">
                      {talang.nama_produk ? talang.nama_produk : "-"} <br />
                      <div className="font-light">
                        {talang.kode ? talang.kode : "-"}{" "}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="whitespace-nowrap capitalize">
                      {talang.kadar ? talang.kadar : "-"}
                    </div>
                  </td>
                  <td>
                    <div className="whitespace-nowrap capitalize">
                    {talang.stok ? talang.stok : "0"} Pcs <br />
                      <div className="font-light">
                        {talang.berat_stok ? talang.berat_stok : "0"} Gram
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {talangs?.length === 0 && (
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

export default Index;
