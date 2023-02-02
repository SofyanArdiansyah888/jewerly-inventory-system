import { Lucide, SkeletonTable } from "@/base-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePinjaman } from "../../../hooks/usePinjaman";
import { formatRupiah } from "../../../utils/formatter";
import { helper } from "../../../utils/helper";
import DeleteModal from "../Pinjaman/Delete";

export default function Index() {
  const [search, setSearch] = useState("");
  const { data: pinjamans, isLoading: loading } = usePinjaman(0);
  const navigate = useNavigate();
  const [selectedPinjaman, setSelectedPinjaman] = useState();
  const [modalDelete, setModalDelete] = useState(false);


  const filterData = () => {
    return pinjamans?.data?.filter((item) =>
      item.nomor_pinjaman
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase())
    );
  };

  const handleDelete = (pinjaman) => {
    setSelectedPinjaman(pinjaman);
    setModalDelete(true);
  };

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Data Pinjaman</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-between mt-2">
          <button
            className="btn btn-primary btn-sm  w-24 mr-1"
            onClick={() => navigate("/pinjaman/create")}
          >
            <span className="flex items-center justify-center mr-2">
              <Lucide icon="Plus" />
            </span>
            Pinjam
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
                  <th className="whitespace-nowrap">Nomor Invoice</th>
                  <th className="whitespace-nowrap">Tanggal</th>
                  <th className="whitespace-nowrap">Jumlah Item</th>
                  <th className="whitespace-nowrap">Pembayaran</th>
                  <th className="whitespace-nowrap">Pembeli</th>
                  <th className="whitespace-nowrap">Status</th>
                  <th className="whitespace-nowrap">Nama Staff</th>
                  <th className="whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filterData()?.map((box, key) => (
                  <tr key={key} className="intro-x">
                    <td className="font-medium ">{key + 1}</td>
                    {/* NOMOR INVOICE */}
                    <td>
                      <div className="whitespace-nowrap capitalize">
                        {box.nomor_pinjaman ? box.nomor_pinjaman : "-"}
                      </div>
                    </td>
                    {/* TANGGAL */}
                    <td>
                      <div className="whitespace-nowrap capitalize">
                        {box.created_at
                          ? helper.formatDate(box.created_at, "D MMMM YYYY")
                          : "-"}
                      </div>
                    </td>
                    {/* JUMLAH ITEM */}
                    <td>
                      <div className="whitespace-nowrap capitalize font-semibold">
                        {box.jumlah_item ? box.jumlah_item : "0"} Pcs <br />
                        <div className="font-light">
                          {box.jumlah_berat ? box.jumlah_berat : "0"} Gram
                        </div>
                      </div>
                    </td>
                    {/* PEMBAYARAN  */}
                    <td>
                      <div className="whitespace-nowrap capitalize font-semibold">
                        {box.metode_pembayaran ? box.metode_pembayaran : ""} <br />
                        <div className="font-light">
                          {formatRupiah(box.jumlah_pembayaran ? box.jumlah_pembayaran : 0)}
                        </div>
                      </div>
                    </td>
                    {/* PEMBELI */}
                    <td>
                      <div className="whitespace-nowrap capitalize">
                        {box.nama_pembeli ? box.nama_pembeli : ""} <br />
                        <div className="font-light">
                          {box.telepon ? box.telepon : ""} 
                        </div>
                      </div>
                    </td>
                    {/* STATUS */}
                    <td>
                      <div className="whitespace-nowrap capitalize">
                        {box.status_invoice ? box.status_invoice : "-"}
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-nowrap capitalize">
                        {box.dijual_oleh ? box.dijual_oleh : "-"}
                      </div>
                    </td>
                    <td className="table-report__action">
                      <div className="flex flex-col justify-center items-center gap-3 ">
                        <div
                          className="flex items-center text-danger cursor-pointer"
                          onClick={() => handleDelete(box)}
                        >
                          <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                          Delete
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
      <DeleteModal
        modal={modalDelete}
        setModal={setModalDelete}
        pinjaman={selectedPinjaman}
      />
    </>
  );
}
