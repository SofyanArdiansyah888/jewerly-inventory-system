import { Lucide, SkeletonTable } from "@/base-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBarangBeli } from "../../../hooks/useBarangBeli";
import { formatRupiah } from "../../../utils/formatter";

export default function Index() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1)
  const { data: items, isLoading: loading } = useBarangBeli(page);
  const navigate = useNavigate()
    
  const filterData = () => {
    console.log(items?.data)
    return items?.data.filter((item) =>
      item?.nomor_nota?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      item?.nama_produk?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Barang Dibeli</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-end mt-2">
          
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
                  <th className="whitespace-nowrap">Nomor Nota</th>
                  <th className="whitespace-nowrap">Nama Produk</th>
                  <th className="whitespace-nowrap">Harga</th>
                  <th className="whitespace-nowrap">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {filterData()?.map((item, key) => (
                  <tr key={key} className="intro-x">
                    <td className="font-medium ">{key + 1}</td>
                    <td>
                      <div className="whitespace-nowrap capitalize">
                        {item.nomor_nota ? item.nomor_nota : "-"}
                      </div>
                    </td>
                    <td>
                    <div className="whitespace-nowrap capitalize font-semibold">
                        {item.nama_produk ? item.nama_produk : "-"} <br />
                        <div className="font-light">
                          {item.kode ? item.kode : "-"}{" "}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-nowrap capitalize">
                        {item.harga ? formatRupiah(item.harga)  : formatRupiah(0)}
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-nowrap capitalize">
                      {item.jumlah ? item.jumlah : "0"} Pcs <br />
                        <div className="font-light">
                          {item.berat ? item.berat : "0"} Gram
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


