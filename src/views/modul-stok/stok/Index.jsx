import { Lucide } from "@/base-components";
import { useState } from "react";
// import EmptyData from "../../components/EmptyData";
import { useStocks } from "../../../hooks/useStok";



function Index() {
  const [search, setSearch] = useState("");
  const { data: stocks, isLoading: loading } = useStocks();


  const filterData = () => {
    return stocks?.filter((item) =>
      item.nama_tempat.toLocaleLowerCase().includes(search.toLocaleLowerCase())  ||
      item.nama_produk.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
      
    );
  };

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Stok</h2>
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
          {/* {stocks?.length === 0 || !stocks ? (
            <EmptyData />
          ) : ( */}
            <table className="table table-report -mt-2">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">No</th>
                  <th className="whitespace-nowrap">Nama Produk</th>
                  <th className="whitespace-nowrap">Tempat</th>
                  <th className="whitespace-nowrap">Stok</th>
                  <th className="whitespace-nowrap">Berat Stok</th>
                </tr>
              </thead>
              <tbody>
                {loading ?? (
                  <div className="col-span-12 mt-12  flex flex-col justify-end items-center">
                    <LoadingIcon icon="circles" className="w-16 h-16" />
                  </div>
                )}
                {filterData()?.map((box, key) => (
                  <tr key={key} className="intro-x">
                    <td className="font-medium ">
                      {key+1}
                    </td>
                    <td>
                      <div className="whitespace-nowrap capitalize">
                        {box.nama_produk ? box.nama_produk : "-"} <br/>
                        <div className="font-light">{box.kode ? box.kode : "-"} </div>
                      </div>
                    </td>

                    <td>
                      <div className="whitespace-nowrap capitalize">
                        {box.nama_tempat ? box.nama_tempat : "-"} 
                      </div>
                    </td>

                    <td>
                      <div className="whitespace-nowrap capitalize">
                        {box.stok ? box.stok : "0"} Pcs
                      </div>
                    </td>

                    <td>
                      <div className="whitespace-nowrap capitalize">
                        {box.berat_stok ? box.berat_stok : "0"} Gram
                      </div>
                    </td>
                   

                    
                  </tr>
                ))}
              </tbody>
            </table>
           {/* )} */}
        </div>
        {/* END: Data List */}
      
      </div>
    </>
  );
}

export default Index;
