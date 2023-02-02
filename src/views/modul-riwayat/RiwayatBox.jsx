import { Lucide, Litepicker, SkeletonTable } from "@/base-components";
import { useState } from "react";
import { useRiwayatBox } from "../../hooks/useHistory";
import { helper } from "../../utils/helper";

function RiwayatBox() {
  const [date, setDate] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isFetching } = useRiwayatBox(page);
  const filterData = () => {
    return data?.data.filter(
      (item) =>
        item.user.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        item.nama_produk.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        item.nama_box.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
    );
  };
  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Riwayat Box</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-end items-center mt-2">
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
          {/* <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
            <Lucide
              icon="Calendar"
              className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
            />
            <Litepicker
              value={date}
              formatDate
              onChange={setDate}
              options={{
                autoApply: false,
                singleMode: false,
                numberOfColumns: 2,
                numberOfMonths: 2,
                showWeekNumbers: true,
                dropdowns: {
                  minYear: 1990,
                  maxYear: null,
                  months: true,
                  years: true,
                },
              }}
              className="form-control sm:w-56 box pl-10 cursor-pointer"
            />
          </div> */}
        </div>

        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible min-h-[80vh]">
          {isFetching ? (
            <SkeletonTable />
          ) : (
            <table className="table table-report -mt-2">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">No</th>
                  <th className="whitespace-nowrap">Nomor Riwayat</th>
                  <th className="text-center whitespace-nowrap">Jumlah</th>
                  <th className="text-center whitespace-nowrap">Berat Total</th>
                  <th className="text-center whitespace-nowrap">
                    Status Transaksi
                  </th>
                  <th className="text-center whitespace-nowrap">Nama Box</th>
                  <th className="text-center whitespace-nowrap">Nama Produk</th>
                  <th className="text-center whitespace-nowrap">User</th>
                  <th className="text-center whitespace-nowrap">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {filterData()?.map((item, index) => (
                  <tr key={index} className="intro-x">
                    <td>{index + 1}</td>
                    <td>{item.nomor_riwayat_gudang}</td>
                    <td>{item.jumlah}</td>
                    <td>{item.berat}</td>
                    <td>{item.status_transaksi}</td>
                    <td>{item.nama_box}</td>
                    <td className="text-center">
                      <div className="font-medium whitespace-nowrap">
                        {item.nama_produk}
                      </div>
                      <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                        {item.kode}
                      </div>
                    </td>
                    <td>{item.user}</td>
                    <td className="text-center">
                      {helper.formatDate(item.created_at, "D MMMM YYYY")}
                    </td>
                  </tr>
                ))}
                {
                  filterData().length === 0 && 
                  <td colSpan={99} className="text-center text-lg font-light">
                    You don't have data to display
                  </td>
                }
              </tbody>
            </table>
          )}
        </div>

        {filterData()?.length > 9 && (
          <nav className="w-full sm:w-auto sm:mr-auto">
            <ul className="pagination">
              {data?.links.map((item, index) => (
                <PaginateItem
                  item={item}
                  index={index}
                  page={page}
                  setPage={setPage}
                />
              ))}
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}

function PaginateItem({ item, index, setPage, page }) {
  if (item.label === "&laquo; Sebelumnya")
    return (
      <li className={`page-item ${item.active ? "active" : ""}`} key={index}>
        <div
          className="page-link"
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
        >
          <Lucide icon="ChevronLeft" className="w-4 h-4" />
        </div>
      </li>
    );
  else if (item.label === "Berikutnya &raquo;")
    return (
      <li className={`page-item ${item.active ? "active" : ""}`} key={index}>
        <div className="page-link" onClick={() => setPage(Number(page) + 1)}>
          <Lucide icon="ChevronRight" className="w-4 h-4" />
        </div>
      </li>
    );
  else
    return (
      <li className={`page-item ${item.active ? "active" : ""}`} key={index}>
        <div className="page-link" onClick={() => setPage(item.label)}>
          {item.label}
        </div>
      </li>
    );
}

export default RiwayatBox;
