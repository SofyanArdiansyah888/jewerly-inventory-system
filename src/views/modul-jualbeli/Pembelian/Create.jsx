import { Lucide, TomSelect } from "@/base-components";
import { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAlert from "../../../hooks/useAlert";
import { useCreatePembelian } from "../../../hooks/usePembelian";
import { useProducts } from "../../../hooks/useProduct";
import { getUser } from "../../../services/database";
import { formatRupiah } from "../../../utils/formatter";

function Create() {
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const { data: produks } = useProducts();
  const { mutate: createPembelian } = useCreatePembelian(() => {
    navigate("/pembelian");
  });

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  function handleCreatePembelian(data) {
    let isError = false;
    let productIds = [];
    let jumlah = [];
    let berat = [];
    let harga = [];
    let status = [];
    data.items.map((item) => {
      if (
        item.status === "" ||
        item.harga === "" ||
        item.berat === "" ||
        item.id_produk === "" ||
        item.jumlah === ""
      ) {
        isError = true;
      }
      productIds.push(item.id_produk);
      jumlah.push(item.jumlah);
      berat.push(item.berat);
      harga.push(item.harga);
      status.push(item.status);
    });

    if (isError) {
      setAlert("Silahkan Lengkapi Semua Data Terlebih Dahulu !", "warning");
      return;
    }

    createPembelian({
      id_produk: productIds,
      jumlah,
      berat,
      harga,
      status,
      created_by: getUser().name
    });
  }

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">
        Tambah Data Pembelian
      </h2>
      <form
        className="intro-y col-span-12 lg:col-span-6"
        onSubmit={handleSubmit(handleCreatePembelian)}
      >
        <div className="grid grid-cols-12 gap-6 mt-5">
          {/* BUTTONS */}
          <div className="intro-y col-span-12 justify-between flex flex-wrap sm:flex-nowrap items-center mt-2">
            {/* SIMPAN BUTTON */}
            <button
              className="btn btn-primary btn-sm  w-24 mr-1"
              onClick={() => navigate("/pembelian")}
            >
              <span className="flex items-center justify-center mr-2">
                <Lucide icon="ChevronLeft" />
              </span>
              Kembali
            </button>
            <button
              className="btn btn-primary btn-sm  w-24 mr-1"
              type="submit"
              disabled={fields.length === 0}
            >
              <span className="flex items-center justify-center mr-2">
                <Lucide icon="Save" />
              </span>
              Simpan
            </button>
          </div>

          {/* TABLE */}
          <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
            <table className="table table-report -mt-2">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">Produk</th>
                  <th className="whitespace-nowrap">Jumlah</th>
                  <th className="text-center whitespace-nowrap">Berat</th>
                  <th className="text-center whitespace-nowrap">Harga</th>
                  <th className="text-center whitespace-nowrap">Status</th>
                  <th className="text-center whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {fields?.map((tag, index) => (
                  <tr key={index} className="intro-x">
                    {/* PRODUK */}
                    <td>
                      <Controller
                        control={control}
                        name={`items.${index}.id_produk`}
                        render={({ field }) => (
                          <TomSelect
                            {...field}
                            className="w-full min-w-[12rem]"
                          >
                            <option value="">Pilih Talang</option>
                            {produks?.map((produk) => (
                              <option value={produk.id}>
                                {produk.nama_produk} ({produk.kadar})
                              </option>
                            ))}
                          </TomSelect>
                        )}
                      />
                    </td>
                    {/* JUMLAH */}
                    <td className="text-center">
                      <input
                        type="text"
                        className="form-control"
                        {...register(`items.${index}.jumlah`)}
                      />
                    </td>
                    {/* BERAT */}
                    <td className="text-center">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          {...register(`items.${index}.berat`)}
                        />
                        <div id="input-group-1" className="input-group-text">
                          Gram
                        </div>
                      </div>
                    </td>
                    {/* HARGA */}
                    <td className="text-center">
                      <input
                        id="harga"
                        type="text"
                        className="form-control"
                        {...register(`items.${index}.harga`)}
                        onChange={(e) => {
                          setValue(
                            `items.${index}.harga`,
                            formatRupiah(e.target.value, "Rp.")
                          );
                        }}
                      />
                    </td>
                    {/* STATUS */}
                    <td>
                      <Controller
                        control={control}
                        name={`items.${index}.status`}
                        render={({ field }) => (
                          <TomSelect {...field} className="w-full min-w-[6rem]">
                            <option value="">Pilih Status</option>
                            <option value="Rosok">Rosok</option>
                            <option value="Reparasi">Reparasi</option>
                            <option value="Kerja Ulang">Kerja Ulang</option>
                          </TomSelect>
                        )}
                      />
                    </td>
                    {/* ACTIONS */}
                    <td className="table-report__action">
                      <div className="flex flex-col justify-center items-center gap-3 ">
                        <div
                          className="flex items-center text-danger cursor-pointer"
                          onClick={() => remove(index)}
                        >
                          <Lucide icon="Trash2" className="w-4 h-4 mr-1" />
                          Delete
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={99} className="text-center">
                    <button
                      className="btn btn-outlined-primary w-full"
                      type="button"
                      onClick={() =>
                        append({
                          status: "",
                          harga: "",
                          berat: "",
                          id_produk: "",
                          jumlah: "",
                        })
                      }
                    >
                      <Lucide icon="Plus" className="mr-2" /> Tambah
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </>
  );
}

export default Create;
