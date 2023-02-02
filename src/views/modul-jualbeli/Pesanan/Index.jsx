import { Lucide, SkeletonTable } from "@/base-components";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePesanan } from "../../../hooks/usePesanan";
import { formatRupiah } from "../../../utils/formatter";
import { helper } from "../../../utils/helper";
import DeleteModal from "./Delete";

export default function Index() {
  const [search, setSearch] = useState("");
  const [selectedPesanan, setSelectedPesanan] = useState();
  const [modalDelete, setModalDelete] = useState(false);
  const { data, isLoading: loading } = usePesanan();
  const navigate = useNavigate();

  const filterData = () => {
    return data?.data?.filter(
      (item) =>
        item.nomor_pesanan
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        item.dijual_oleh
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
    );
  };

  const handleDelete = (pesanan) => {
    setSelectedPesanan(pesanan);
    setModalDelete(true);
  };

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Data Pesanan</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-between mt-2">
          <div>
            {/* <button
              className="btn btn-primary btn-sm  w-24 mr-1"
              onClick={() => navigate("/daftar-box")}
            >
              <span className="flex items-center justify-center mr-2">
                <Lucide icon="ArrowLeft" />
              </span>
              Kembali
            </button> */}
            <button
              className="btn btn-primary btn-sm  w-24 mr-1"
              onClick={() => navigate("/pesanan/create")}
            >
              <span className="flex items-center justify-center mr-2">
                <Lucide icon="Plus" />
              </span>
              Pesan
            </button>
          </div>
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
        <div className="intro-y col-span-12 overflow-auto lg:overflow-hidden ">
          {loading ? (
            <SkeletonTable />
          ) : (
            <table className="table table-report -mt-2">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">No</th>
                  <th className="whitespace-nowrap">Nomor Pesanan</th>
                  <th className="whitespace-nowrap">Tanggal</th>
                  <th className="whitespace-nowrap">Pemesan</th>
                  <th className="whitespace-nowrap">Pembayaran</th>
                  <th className="whitespace-nowrap">Keterangan</th>
                  <th className="whitespace-nowrap">Staff</th>
                  <th className="whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filterData()?.map((item, key) => (
                  <tr key={key} className="intro-x">
                    <td className="font-medium ">{key + 1}</td>
                    <td>
                      <div className="whitespace-nowrap capitalize">
                        {item.nomor_pesanan ? item.nomor_pesanan : "-"}
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-nowrap capitalize">
                        {item.created_at
                          ? helper.formatDate(item.created_at, "D MMMM YYYY")
                          : "-"}
                      </div>
                    </td>

                    <td>
                      <div className="whitespace-nowrap capitalize font-semibold">
                        {item.nama_pemesan ? item.nama_pemesan : "-"} <br />
                        <div className="font-light">
                          {item.telepon ? item.telepon : "-"}{" "}
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="capitalize">
                        {item.metode_pembayaran ? item.metode_pembayaran : "-"}{" "}
                        <br />
                        <div className="font-light">
                          Jumlah{" "}
                          {formatRupiah(
                            item.jumlah_pembayaran ? item.jumlah_pembayaran : 0
                          )}{" "}
                          <br />
                          Dp{" "}
                          {formatRupiah(
                            item.dp_pembayaran ? item.dp_pembayaran : 0
                          )}{" "}
                          <br />
                          Sisa{" "}
                          {formatRupiah(
                            item.sisa_pembayaran ? item.sisa_pembayaran : 0
                          )}{" "}
                          <br />
                        </div>
                      </div>
                    </td>

                    <td>
                      {item.status ? item.status : "-"} <br />
                      <div className="font-light">
                        {item.catatan ? item.catatan : "-"}{" "}
                      </div>
                    </td>

                    <td>
                      <div className="whitespace-nowrap capitalize">
                        {item.dijual_oleh ? item.dijual_oleh : "-"}
                      </div>
                    </td>

                    <td className="table-report__action">
                      <div className="flex flex-col justify-center items-center gap-3 ">
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => navigate(`/pesanan/${item.id}`)}
                        >
                          <Lucide icon="Eye" className="w-4 h-4 mr-1" /> Detail
                        </div>
                        <div
                          className="flex items-center text-danger cursor-pointer"
                          onClick={() => handleDelete(item)}
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
        pesanan={selectedPesanan}
      />
    </>
  );
}
