import { Lucide, SkeletonTable, TomSelect } from "@/base-components";
import { useEffect, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreatePenjualan } from "../../../hooks/usePenjualan";

import { useProductItems } from "../../../hooks/useProductItem";
import { useRekenings } from "../../../hooks/useRekening";
import { useStaffs } from "../../../hooks/useStaff";
import { getUser } from "../../../services/database";
import { formatRupiah } from "../../../utils/formatter";

export default function Index() {
  const navigate = useNavigate()
  useEffect(() => {
    penjualanFields.append({
      rfid: "21312",
      nama_produk: "",
      berat: 5,
      talang: "",
      box: "",
      harga: "",
      id_box:'',
      id_talang:''
    });
  }, []);

  const useform = useForm({
    mode: "onChange",
    defaultValues: {
      metode_pembayaran: "Tunai",
      penjualan: [],
    },
  });

  const penjualanFields = useFieldArray({
    control: useform.control,
    name: "penjualan",
  });

  const {
    data: syncData,
    refetch,
    isLoading: syncLoading,
  } = useProductItems(penjualanFields.fields);

  useEffect(() => {
    if (syncData) {
      useform.setValue("penjualan", []);
      syncData.map((item) => {
        penjualanFields.append({
          rfid: item.rfid,
          nama_produk: item.nama_produk,
          berat: item.berat,
          id_talang: item.id_talang,
          talang: item.talang ? item.talang.nama_talang : '',
          id_box: item.id_box,
          box: item.box ? item.box.nama_box : '',
          harga: "",
          id_produk: item.id_produk
        });
      })
    }
    return () => syncData
  }, [syncData]);


  const { mutate: createPenjualan, isLoading } = useCreatePenjualan(() => {
    navigate('/penjualan')
  });


  function handleCreatePenjualan(data) {
    
    createPenjualan({
      ...data,
      created_by: getUser().name
    })
  }

  return (
    <>
      <form onSubmit={useform.handleSubmit(handleCreatePenjualan)}>
        <h2 className="intro-y text-lg font-medium mt-10">Tambah Penjualan</h2>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <MetodePembayaran {...useform} />
          <DataPelanggan {...useform}  {...penjualanFields} isLoading={isLoading} />

          {syncLoading ? (
            <SkeletonTable />
          ) : (
            <div className="intro-y col-span-12 overflow-auto lg:overflow-visible box">
              <h2 className="text-xl font-semibold m-6 mb-1">Info Produk</h2>
              {/* SYNC BUTTON */}
              <div className="intro-y col-span-12 justify-end flex flex-wrap sm:flex-nowrap items-center mr-2 mb-4">
                <div>
                  {/* CLEAR BUTTON */}
                  <button
                    className="btn btn-danger btn-sm  w-24 mr-1"
                    type="button"
                    onClick={() => useform.setValue('penjualan',[])}
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
                </div>
              </div>
              <table className="table table-report -mt-2">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap">Produk</th>
                    <th className="text-center whitespace-nowrap">Berat</th>
                    <th className="text-center whitespace-nowrap">
                      Diambil Dari
                    </th>
                    <th className="text-center whitespace-nowrap">Harga</th>
                    <th className="text-center whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {penjualanFields.fields.length > 0 && (
                    <TagsTable {...penjualanFields} {...useform} />
                  )}
                  {penjualanFields.fields.length === 0 && (
                    <td colSpan={99} className="text-center text-lg font-light">
                      You don't have data to display
                    </td>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </form>
    </>
  );
}

function TagsTable({ fields, register, setValue, remove }) {
  return (
    <>
      {fields?.map((tag, index) => (
        <tr key={index} className="intro-x">
          <td>
            <a href="" className="font-medium whitespace-nowrap">
              {tag.rfid}
            </a>
            <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
              {tag.nama_produk}
            </div>
          </td>
          <td className="text-center">{tag.berat} Gram</td>
          <td className="text-center">{tag.talang ? tag.talang : tag.box}</td>
          <td className="text-center">
            <input
              id="harga"
              type="text"
              className="form-control"
              {...register(`penjualan.${index}.harga`)}
              onChange={(e) => {
                setValue(
                  `penjualan.${index}.harga`,
                  formatRupiah(e.target.value, "Rp.")
                );
              }}
            />
          </td>
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
    </>
  );
}

function MetodePembayaran({
  register,
  formState: { errors },
  setValue,
  control,
  watch,
}) {
  const { data: banks } = useRekenings();
  const metode = watch("metode_pembayaran");
  useEffect(() => {
    switch (metode) {
      case "Tunai":
        setValue("nominal_debit", formatRupiah(0, "Rp."));
        setValue("nominal_transfer", formatRupiah(0, "Rp."));
        break;
      case "Debit":
        setValue("nominal_tunai", formatRupiah(0, "Rp."));
        setValue("nominal_transfer", formatRupiah(0, "Rp."));
        break;
      case "Transfer":
        setValue("nominal_debit", formatRupiah(0, "Rp."));
        setValue("nominal_tunai", formatRupiah(0, "Rp."));
        break;
      case "Tunai & Debit":
        setValue("nominal_transfer", formatRupiah(0, "Rp."));
        break;
      case "Transfer & Tunai":
        setValue("nominal_debit", formatRupiah(0, "Rp."));
        break;
    }
  }, [metode]);

  return (
    <div className="intro-y col-span-12 lg:col-span-6 ">
      {/* BEGIN: Form Layout */}
      <div className="intro-y box p-5 lg:min-h-[400px]">
        <h2 className="text-lg font-semibold mb-8">Metode Pembayaran</h2>

        {/* METODE PEMBAYARAN */}
        <div>
          <label htmlFor="metode_pembayaran" className="form-label">
            Metode Pembayaran
          </label>

          <Controller
            control={control}
            name="metode_pembayaran"
            render={({ field }) => (
              <TomSelect id="metode_pembayaran" {...field} className="w-full">
                <option value="Tunai">Tunai</option>
                <option value="Transfer">Transfer</option>
                <option value="Debit">Debit</option>
                <option value="Tunai & Transfer">Tunai & Transfer</option>
                <option value="Tunai & Debit">Tunai & Debit</option>
              </TomSelect>
            )}
          />
        </div>

        {/* NAMA BANK */}
        {metode?.includes("Transfer") && (
          <div className="mt-4">
            <label htmlFor="nama_bank" className="form-label">
              Di Transfer Ke Bank
            </label>

            <Controller
              control={control}
              name="nama_bank"
              defaultValue=""
              render={({ field }) => (
                <TomSelect {...field} className="w-full">
                  <option value="">Pilih Bank</option>
                  {banks?.map((item) => (
                    <option
                      value={`${item.nama_bank} (${item.norek})`}
                    >{`${item.nama_bank} (${item.norek})`}</option>
                  ))}
                </TomSelect>
              )}
            />
          </div>
        )}

        {/* NOMINAL TUNAI */}
        {metode?.includes("Tunai") && (
          <div className="mt-3">
            <label htmlFor="nominal_tunai" className="form-label">
              Nominal Tunai
            </label>
            <div className="input-group">
              <input
                id="nominal_tunai"
                type="text"
                className="form-control"
                {...register("nominal_tunai")}
                onChange={(e) =>
                  setValue("nominal_tunai", formatRupiah(e.target.value, "Rp."))
                }
              />
            </div>
            {errors?.nominal_tunai && (
              <small className="text-danger font-semibold capitalize">
                {errors?.nominal_tunai?.message}
              </small>
            )}
          </div>
        )}

        {/* NOMINAL TRANSFER */}
        {metode?.includes("Transfer") && (
          <div className="mt-3">
            <label htmlFor="nominal_transfer" className="form-label">
              Nominal Transfer
            </label>
            <div className="input-group">
              <input
                id="nominal_transfer"
                type="text"
                className="form-control"
                {...register("nominal_transfer")}
                onChange={(e) =>
                  setValue(
                    "nominal_transfer",
                    formatRupiah(e.target.value, "Rp.")
                  )
                }
              />
            </div>
            {errors?.nominal_transfer && (
              <small className="text-danger font-semibold capitalize">
                {errors?.nominal_transfer?.message}
              </small>
            )}
          </div>
        )}

        {/* NOMINAL DEBIT */}
        {metode?.includes("Debit") && (
          <div className="mt-3">
            <label htmlFor="nominal_debit" className="form-label">
              Nominal Debit
            </label>
            <div className="input-group">
              <input
                id="nominal_debit"
                type="text"
                className="form-control"
                {...register("nominal_debit")}
                onChange={(e) =>
                  setValue("nominal_debit", formatRupiah(e.target.value, "Rp."))
                }
              />
            </div>
            {errors?.nominal_debit && (
              <small className="text-danger font-semibold capitalize">
                {errors?.nominal_debit?.message}
              </small>
            )}
          </div>
        )}
      </div>
      {/* END: Form Layout */}
    </div>
  );
}

function DataPelanggan({
  register,
  formState: { errors },
  setValue,
  control,
  isLoading,
  reset,
  fields
}) {
  const navigate = useNavigate();
  const { data: staffs } = useStaffs();
  return (
    <div className="intro-y col-span-12 lg:col-span-6">
      <div className="intro-y box p-5">
        <h2 className="text-lg font-semibold mb-8">Data Pelanggan & Penjual</h2>
        {/* NAMA */}
        <div>
          <label htmlFor="nama_pembeli" className="form-label">
            Nama Pembeli
          </label>
          <input
            id="nama_pembeli"
            type="text"
            {...register("nama_pembeli")}
            className="form-control w-full"
          />
          {errors?.nama_pembeli && (
            <small className="text-danger font-semibold capitalize">
              {errors?.nama_pembeli?.message}
            </small>
          )}
        </div>

        {/* TELEPON */}
        <div className="mt-3">
          <label htmlFor="telepon_pembeli" className="form-label">
            Telepon
          </label>
          <input
            id="telepon_pembeli"
            type="text"
            {...register("telepon_pembeli")}
            className="form-control w-full"
          />
          {errors?.telepon_pembeli && (
            <small className="text-danger font-semibold capitalize">
              {errors?.telepon_pembeli?.message}
            </small>
          )}
        </div>

        <div className="flex flex-row gap-2 mt-3">
          {/* STAFF */}
          <div className="flex-1">
            <label htmlFor="dijual_oleh" className="form-label">
              Staff
            </label>

            <Controller
              control={control}
              name="dijual_oleh"
              defaultValue=""
              render={({ field }) => (
                <TomSelect {...field} className="w-full">
                  <option value="">Pilih Penjual</option>
                  {staffs?.map((staff) => (
                    <option value={staff.nama}>{staff.nama}</option>
                  ))}
                </TomSelect>
              )}
            />

            {errors?.dijual_oleh && (
              <small className="text-danger font-semibold capitalize">
                {errors?.dijual_oleh?.message}
              </small>
            )}
          </div>
        </div>

        <div className="text-right mt-10">
          <button
            type="button"
            className="btn btn-primary w-24 mr-1"
            onClick={() => {
              navigate("/penjualan");
            }}
          >
            Kembali
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary w-24 mr-1"
            onClick={() => {
              reset();
            }}
          >
            Reset
          </button>

          <button
            type="submit"
            className="btn btn-primary w-24"
            disabled={fields.length === 0 || isLoading}
          >
            {isLoading ? "Loading..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
