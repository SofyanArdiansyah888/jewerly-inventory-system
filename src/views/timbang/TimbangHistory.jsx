import { Lucide, Litepicker,SkeletonTable } from "@/base-components";
import { useState } from "react";
import { useTimbangs } from "../../hooks/useTimbang";
import { helper } from "../../utils/helper";

function TimbangHistory() {
  const [date, setDate] = useState();
  const [search, setSearch] = useState('')
  const { data, isFetching } = useTimbangs(date);
  const filterData = () => {
    return data?.filter((item) =>
      item.nama_talang.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  };
  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Riwayat Timbang</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-end items-center mt-2">
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
              <input
                type="text"
                className="form-control w-56 box pr-10"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value) }
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div>
          </div>
          <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
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
          </div>
        </div>
        {/* BEGIN: Data List */}
        {isFetching ? (
          <SkeletonTable />
        ) : (
          <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
            <table className="table table-report -mt-2">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">TALANG</th>
                  <th className="text-center whitespace-nowrap">PAGI</th>
                  <th className="text-center whitespace-nowrap">SORE</th>
                  <th className="text-center whitespace-nowrap">
                    ESTIMASI PAGI
                  </th>
                  <th className="text-center whitespace-nowrap">
                    ESTIMASI SORE
                  </th>
                  <th className="text-center whitespace-nowrap">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {
                  filterData()?.map((item, index) => (
                    <tr key={index} className="intro-x">
                      <td>{item.nama_talang}</td>
                      <td className="text-center">
                        <div className="font-medium whitespace-nowrap">
                          {item.jumlah_barang_pagi} Pcs
                        </div>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                          {item.berat_pagi} Gram
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="font-medium whitespace-nowrap">
                          {item.jumlah_barang_sore} Pcs
                        </div>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                          {item.berat_sore} Gram
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="font-medium whitespace-nowrap">
                          {item.estimasi_barang_pagi} Pcs
                        </div>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                          {item.estimasi_berat_pagi} Gram
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="font-medium whitespace-nowrap">
                          {item.estimasi_barang_sore} Pcs
                        </div>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                          {item.estimasi_berat_sore} Gram
                        </div>
                      </td>
                      <td className="text-center">
                        {helper.formatDate(item.created_at, "D MMMM YYYY")}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {/* END: Data List */}
      </div>
    </>
  );
}

export default TimbangHistory;
