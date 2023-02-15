import {
  Lucide, Modal,
  ModalBody, SkeletonTable, TomSelect
} from "@/base-components";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useProductItems } from "../../hooks/useProductItem";
import { useTalangs } from "../../hooks/useTalang";
import { useSimpanTimbang } from "../../hooks/useTimbang";
import useScanner from "../../hooks/useScanner";

function TimbangPagi() {
  const [tags, setTags] = useState([]);

  const rfids = useScanner();
  useEffect (() => {
         if(rfids && rfids.length > 0){
          const tempTags = [...tags,{
            rfid: rfids[0],
            nama_produk:'',
            berat:0
          }]
          const newTags = [...new Set(tempTags)]
          setTags(newTags)        
        }
  },[rfids])

  const [talangModal, setTalangModal] = useState(false);

  const {
    data: syncData,
    refetch,
    isLoading: syncLoading,
  } = useProductItems(tags);

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Timbang Pagi</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 justify-between flex flex-wrap sm:flex-nowrap items-center mt-2">
          <div className="w-full flex gap-2 sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="bg-slate-300 rounded-md p-2">
              Total Item : {syncData ? syncData.length : tags.length} Pcs
            </div>
            <div className="bg-slate-300 rounded-md p-2">
              Total Berat : {0} Gram
            </div>
            {/* <div className="w-56 relative text-slate-500">
              <input
                type="text"
                className="form-control w-56 box pr-10"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div> */}
          </div>

          <div>
            {/* CLEAR BUTTON */}
            <button
              className="btn btn-danger btn-sm  w-24 mr-1"
              onClick={() => setTags([])}
            >
              <span className="flex items-center justify-center mr-2">
                <Lucide icon="Eraser" />
              </span>
              Clear
            </button>

            {/* SYNC BUTTON  */}
            <button
              className="btn btn-primary btn-sm  w-24 mr-1"
              onClick={() => refetch()}
            >
              <span className="flex items-center justify-center mr-2">
                <Lucide icon="RefreshCw" />
              </span>
              Sync
            </button>

            {/* <Link to="/timbang-history">
            <button className="btn btn-secondary btn-sm  w-24 mr-1">
              <span className="flex items-center justify-center mr-2">
                <Lucide icon="Save" />
              </span>
              History
            </button>
            </Link> */}

            {/* SIMPAN BUTTON */}
            <button
              className="btn btn-success btn-sm  w-24 mr-1"
              disabled={!syncData}
              onClick={() => setTalangModal(true)}
            >
              <span className="flex items-center justify-center mr-2">
                <Lucide icon="Save" />
              </span>
              Simpan
            </button>
          </div>
        </div>

        {/* BEGIN: Data List */}

        {syncLoading ? (
          <SkeletonTable />
        ) : (
          <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
            <table className="table table-report -mt-2">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">RFID/PRODUK</th>
                  <th className="text-center whitespace-nowrap">Berat</th>
                </tr>
              </thead>
              <tbody>
                {syncData ? (
                  <TagsTable tags={syncData} />
                ) : (
                  <TagsTable tags={tags} />
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* END: Data List */}
      </div>
      <ModalTalang
        setTalangModal={setTalangModal}
        talangModal={talangModal}
        syncData={syncData}
      />
    </>
  );
}

function TagsTable({ tags }) {
  return (
    <>
      {tags?.map((tag, index) => (
        <tr key={index} className="intro-x">
          <td>
            <a href="" className="font-medium whitespace-nowrap">
              {tag.rfid}
            </a>
            <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
              {tag.nama_produk}
            </div>
          </td>
          <td className="text-center">{tag.berat}</td>
        </tr>
      ))}
    </>
  );
}

function ModalTalang({ setTalangModal, talangModal, syncData }) {
  const { data: talangs } = useTalangs();
  const schema = yup
    .object({ id_talang: yup.number().required("Talang Is A Required Field"),})
    .required();

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const {mutate: simpanTimbang, isLoading} = useSimpanTimbang(() => {
    reset();
    setTalangModal(false)
  })
  function handleTimbang(data) {
    let beratPagi = 0;
    syncData?.map((item) =>  {
      beratPagi += parseFloat(item.berat)
    })
    let temp = {
      ...data,
      berat_pagi: beratPagi,
      jumlah_barang_pagi: syncData?.length,
    }
    simpanTimbang(temp)
  }

  return (
    <Modal
      show={talangModal}
      onHidden={() => {
        setTalangModal(false);
      }}
    >
      <ModalBody className="p-0">
        <form onSubmit={handleSubmit(handleTimbang)}>
          <div className="p-5 text-center">
            <div className="text-3xl mt-5">Simpan Hasil Timbang?</div>
            <div className="text-slate-500 mt-2">
              Apakah kamu yakin ingin menyimpan hasil timbang ? <br />
              <div className="mt-8 text-left">
                <label htmlFor="crud-form-2" className="form-label">
                  Talang
                </label>

                <Controller
                  control={control}
                  name="id_talang"
                  render={({ field }) => (
                    <TomSelect {...field} className="w-full">
                      <option value="">Pilih Talang</option>
                      {talangs?.map((talang) => (
                        <option value={talang.id}>{talang.nama_talang}</option>
                      ))}
                    </TomSelect>
                  )}
                />

                {errors?.id_talang && (
                  <small className="text-danger font-semibold capitalize">
                    {errors?.id_talang?.message}
                  </small>
                )}
              </div>
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setTalangModal(false);
              }}
              className="btn btn-outline-secondary w-24 mr-1"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary w-24" disabled={isLoading}>
              {isLoading ? "Loading..." :  "Simpan"}
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default TimbangPagi;
