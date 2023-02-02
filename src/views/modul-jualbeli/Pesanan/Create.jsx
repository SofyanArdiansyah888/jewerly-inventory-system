import { TomSelect } from "@/base-components";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useCreatePesanan, usePesanan } from "../../../hooks/usePesanan";
import { useRegisterProductItem } from "../../../hooks/useProductItem";
import { useStaffs } from "../../../hooks/useStaff";
import { getUser } from "../../../services/database";
import { formatRupiah, sanitizeNumber } from "../../../utils/formatter";

const schema = yup
  .object({
    nama_pemesan: yup.string().required("Nama Pemesan is Required"),
    telepon: yup.string().required(),
    jumlah_pembayaran: yup.string().required("Jumlah Pembayaran is Required"),
    dp_pembayaran: yup.string().required("DP Pembayaran is Required"),
    metode_pembayaran: yup.string().required("Metode Pembayaran is Required"),
    dijual_oleh: yup.string().required("Staff is Required"),
  })
  .required();

function Create() {
  const [tujuan, setTujuan] = useState("talang");
  const [scan, setScan] = useState(false);
  const navigate = useNavigate();
  const { data: staffs } = useStaffs();

  const { mutate: createPesanan, isLoading } = useCreatePesanan(() => {
    reset();
    navigate("/pesanan");
  });

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  let { jumlah_pembayaran, dp_pembayaran } = watch();
  useEffect(() => {
    jumlah_pembayaran = sanitizeNumber(jumlah_pembayaran);
    dp_pembayaran = sanitizeNumber(dp_pembayaran);
    if (jumlah_pembayaran > 0 || dp_pembayaran > 0) {
      let sisa = jumlah_pembayaran - dp_pembayaran;
      setValue("sisa_pembayaran", formatRupiah(sisa, "Rp."));
    }
    return () => {
      jumlah_pembayaran, dp_pembayaran;
    };
  }, [jumlah_pembayaran, dp_pembayaran]);

  function handleCreatePesanan(data) {
    createPesanan({
      ...data,
      created_by: getUser().name,
    });
  }

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Form Data Pesanan</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <form
          className="intro-y col-span-12 lg:col-span-6"
          onSubmit={handleSubmit(handleCreatePesanan)}
        >
          {/* BEGIN: Form Layout */}
          <div className="intro-y box p-5">
            {/* NAMA */}
            <div>
              <label htmlFor="nama_pemesan" className="form-label">
                Nama Pemesan
              </label>
              <input
                id="nama_pemesan"
                type="text"
                {...register("nama_pemesan")}
                className="form-control w-full"
              />
              {errors?.nama_pemesan && (
                <small className="text-danger font-semibold capitalize">
                  {errors?.nama_pemesan?.message}
                </small>
              )}
            </div>

            {/* TELEPON */}
            <div className="mt-3">
              <label htmlFor="telepon" className="form-label">
                Telepon
              </label>
              <input
                id="telepon"
                type="text"
                {...register("telepon")}
                className="form-control w-full"
              />
              {errors?.telepon && (
                <small className="text-danger font-semibold capitalize">
                  {errors?.telepon?.message}
                </small>
              )}
            </div>

            {/* JUMLAH PEMBAYARAN */}
            <div className="mt-3">
              <label htmlFor="jumlah_pembayaran" className="form-label">
                Jumlah Pembayaran
              </label>
              <div className="input-group">
                <input
                  id="jumlah_pembayaran"
                  type="text"
                  className="form-control"
                  {...register("jumlah_pembayaran")}
                  onChange={(e) =>
                    setValue(
                      "jumlah_pembayaran",
                      formatRupiah(e.target.value, "Rp.")
                    )
                  }
                />
              </div>
              {errors?.jumlah_pembayaran && (
                <small className="text-danger font-semibold capitalize">
                  {errors?.jumlah_pembayaran?.message}
                </small>
              )}
            </div>

            <div className="flex flex-row gap-2 mt-3">
              {/* DP */}
              <div className="flex-1">
                <label htmlFor="dp_pembayaran" className="form-label">
                  Down Payment
                </label>
                <div className="input-group">
                  <input
                    id="dp_pembayaran"
                    type="text"
                    className="form-control"
                    {...register("dp_pembayaran")}
                    onChange={(e) =>
                      setValue(
                        "dp_pembayaran",
                        formatRupiah(e.target.value, "Rp.")
                      )
                    }
                  />
                </div>
                {errors?.dp_pembayaran && (
                  <small className="text-danger font-semibold capitalize">
                    {errors?.dp_pembayaran?.message}
                  </small>
                )}
              </div>

              {/* SISA PEMBAYARAN */}
              <div className="flex-1">
                <label htmlFor="sisa_pembayaran" className="form-label">
                  Sisa Pembayaran
                </label>
                <div className="input-group">
                  <input
                    id="sisa_pembayaran"
                    type="text"
                    className="form-control"
                    {...register("sisa_pembayaran")}
                    disabled
                  />
                </div>
                {errors?.sisa_pembayaran && (
                  <small className="text-danger font-semibold capitalize">
                    {errors?.sisa_pembayaran?.message}
                  </small>
                )}
              </div>
            </div>

            <div className="flex flex-row gap-2 mt-3">
              {/* METODE PEMBAYARAN */}
              <div className="flex-1">
                <label htmlFor="metode_pembayaran" className="form-label">
                  Metode Pembayaran
                </label>

                <Controller
                  control={control}
                  defaultValue="tunai"
                  name="metode_pembayaran"
                  render={({ field }) => (
                    <TomSelect
                      id="metode_pembayaran"
                      {...field}
                      className="w-full"
                    >
                      <option value="tunai">Tunai</option>
                      <option value="transfer">Transfer</option>
                    </TomSelect>
                  )}
                />
              </div>

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

            {/* CATATAN */}
            <div className="mt-3">
              <label htmlFor="catatan" className="form-label">
                Catatan
              </label>
              <div className="input-group">
                <textarea
                  id="catatan"
                  className="form-control"
                  {...register("catatan")}
                />
              </div>
              {errors?.catatan && (
                <small className="text-danger font-semibold capitalize">
                  {errors?.catatan?.message}
                </small>
              )}
            </div>

            <div className="text-right mt-5">
              <button
                type="button"
                className="btn btn-primary w-24 mr-1"
                onClick={() => {
                  navigate("/pesanan");
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
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Simpan"}
              </button>
            </div>
          </div>
          {/* END: Form Layout */}
        </form>
      </div>
    </>
  );
}

export default Create;
