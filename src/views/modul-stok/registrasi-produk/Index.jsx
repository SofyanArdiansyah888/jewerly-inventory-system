import { TomSelect } from "@/base-components";

import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useBoxes } from "../../../hooks/useBox";
import { useProducts } from "../../../hooks/useProduct";
import { useRegisterProductItem } from "../../../hooks/useProductItem";
import { useTalangs } from "../../../hooks/useTalang";
import useAlert from "../../../hooks/useAlert";
const { ipcRenderer  } = window.require('electron');

function RegistrasiProduk() {
  const [tujuan, setTujuan] = useState("talang");
  const [scan, setScan] = useState(false);
  const { data: products } = useProducts();
  const { data: talangs } = useTalangs();
  const { data: boxes } = useBoxes();

  const { mutate: registerProduk, 
          isLoading: registerLoading 
        } = useRegisterProductItem(() => {
    reset();
    setTujuan("talang");
  });

  const schema = yup
    .object({
      id_talang:
        tujuan === "talang"
          ? yup.number().required("Talang Is A Required Field")
          : yup.number(),
      id_box:
        tujuan === "box"
          ? yup.number().required("Box Is A Required Field")
          : yup.number(),
      id_produk: yup.string().required("Produk Is A Required Field"),
      berat: yup.number().required().typeError("Berat Must Be a Number"),
      rfid: yup.string().required(),
    })
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


  const { setAlert } = useAlert();
  useEffect(() => {
    ipcRenderer.send('net-open');

    ipcRenderer.on('net-data',(_,data) => {
        console.log(data,'net-data')
    });

    ipcRenderer.on('net-status',(_,data) => {
      if(!data){
        setAlert('Scanner Not Detected !','error')
      }
    });

    () => ipcRenderer.on('net-close');
    
  },[])

  function handleRegisterProduk(data) {
    let { id_talang, id_box, ...temp } = data;
    if (tujuan === "talang") {
      temp = { ...temp, id_talang };
    } else temp = { ...temp, id_box };
    registerProduk(temp);
  }

  function handleScan() {
    setScan((scan) => !scan);
  }

  function handleStop() {
    setScan((scan) => !scan);
  }

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Form Registrasi Produk</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <form
          className="intro-y col-span-12 lg:col-span-6"
          onSubmit={handleSubmit(handleRegisterProduk)}
        >
          {/* BEGIN: Form Layout */}
          <div className="intro-y box p-5">
            <div>
              <label htmlFor="crud-form-1" className="form-label">
                RFID
              </label>
              <input
                id="crud-form-1"
                type="text"
                {...register("rfid")}
                className="form-control w-full"
              />
              {errors?.rfid && (
                <small className="text-danger font-semibold capitalize">
                  {errors?.rfid?.message}
                </small>
              )}
            </div>

            {/* PRODUK */}
            <div className="mt-3">
              <label className="form-label">Produk</label>

              <Controller
                control={control}
                name="id_produk"
                render={({ field }) => (
                  <TomSelect {...field} className="w-full">
                    <option value="">Pilih Produk</option>
                    {products?.map((product, index) => (
                      <option value={product.id} key={index}>{product.nama_produk}</option>
                    ))}
                  </TomSelect>
                )}
              />

              {errors?.id_produk && (
                <small className="text-danger font-semibold capitalize">
                  {errors?.id_produk?.message}
                </small>
              )}
            </div>

            {/* BERAT */}
            <div className="mt-3">
              <label htmlFor="crud-form-3" className="form-label">
                Berat
              </label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  {...register("berat")}
                />
                <div id="input-group-1" className="input-group-text">
                  Gram
                </div>
              </div>
              {errors?.berat && (
                <small className="text-danger font-semibold capitalize">
                  {errors?.berat?.message}
                </small>
              )}
            </div>

            {/* TUJUAN */}
            <div className="mt-3">
              <label htmlFor="crud-form-2" className="form-label">
                Tujuan
              </label>
              <TomSelect className="w-full" onChange={setTujuan} value={tujuan}>
                <option value="talang">Talang</option>
                <option value="box">Box</option>
              </TomSelect>
            </div>

            {/* TALANG */}
            {tujuan === "talang" && (
              <div className="mt-3">
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
            )}

            {/* BOX */}
            {tujuan === "box" && (
              <div className="mt-3">
                <label htmlFor="crud-form-2" className="form-label">
                  Box
                </label>

                <Controller
                  control={control}
                  name="id_box"
                  render={({ field }) => (
                    <TomSelect {...field} className="w-full">
                      <option value="">Pilih Box</option>
                      {boxes?.map((box) => (
                        <option value={box.id}>{box.nama_box}</option>
                      ))}
                    </TomSelect>
                  )}
                />

                {errors?.id_box && (
                  <small className="text-danger font-semibold capitalize">
                    {errors?.id_box?.message}
                  </small>
                )}
              </div>
            )}

            <div className="text-right mt-5">
              <button
                type="button"
                className="btn btn-outline-secondary w-24 mr-1"
                onClick={() => {
                  reset();
                  setTujuan("talang");
                }}
              >
                Reset
              </button>
              {/* {scan && (
                <button type="button" className="btn btn-primary w-24 mr-1" onClick={handleScan}>
                  Scan
                </button>
              )}

              {!scan && (
                <button type="button" className="btn btn-danger w-24 mr-1" onClick={handleStop}>
                  Stop
                </button>
              )} */}
              <button type="submit" className="btn btn-primary w-24" disabled={registerLoading}>
                {registerLoading ? "Loading..." : "Simpan"}
              </button>
            </div>
          </div>
          {/* END: Form Layout */}
        </form>
      </div>
    </>
  );
}

export default RegistrasiProduk;
