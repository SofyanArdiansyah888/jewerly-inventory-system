import { TomSelect } from "@/base-components";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useDetailPesanan, useUpdatePesanan } from "../../../hooks/usePesanan";
import { useRekenings } from "../../../hooks/useRekening";
import { getUser } from "../../../services/database";
import { formatRupiah } from "../../../utils/formatter";

const schema = yup
  .object({
    nama_pemesan: yup.string().required("Nama Pemesan is Required"),
    telepon: yup.string().required(),
    jumlah_pembayaran: yup.string().required("Jumlah Pembayaran is Required"),
    dp_pembayaran: yup.string().required("DP Pembayaran is Required"),
    metode_pembayaran: yup.string().required("Metode Pembayaran is Required"),
    dijual_oleh: yup.string().required("Staff is Required"),
    metode_pembayaran_sisa: yup.string().required("Metode Pembayaran is Required"),
    nama_bank_sisa: yup.string().required("Nama Bank is Required"),

  })
  .required();

export default function Detail() {
  const navigate = useNavigate();
  const { id: idPesanan } = useParams();
  const { data } = useDetailPesanan(idPesanan);
  const { data: banks } = useRekenings();

  const { mutate: updatePesanan, isLoading } = useUpdatePesanan(
    idPesanan,
    () => {
      reset();
      navigate("/pesanan");
    }
  );

  useEffect(() => {
    if (data) {
      const {
        nama_pemesan,
        telepon,
        jumlah_pembayaran,
        dp_pembayaran,
        metode_pembayaran,
        dijual_oleh,
        sisa_pembayaran,
        catatan,
        nama_bank_sisa,
        metode_pembayaran_sisa
      } = data;
      setValue("nama_pemesan", nama_pemesan);
      setValue("telepon", telepon);
      setValue("jumlah_pembayaran", formatRupiah(jumlah_pembayaran, "Rp."));
      setValue("dp_pembayaran", formatRupiah(dp_pembayaran, "Rp."));
      setValue("sisa_pembayaran", formatRupiah(sisa_pembayaran, "Rp."));
      setValue("metode_pembayaran", metode_pembayaran);
      setValue("dijual_oleh", dijual_oleh);
      setValue("catatan", catatan);
      setValue('metode_pembayaran_sisa',metode_pembayaran_sisa);
      setValue('nama_bank_sisa',nama_bank_sisa);
    }
  }, [data]);

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

  const metodePembayaranSisa = watch("metode_pembayaran_sisa");
  
  useEffect(() => {
    if (metodePembayaranSisa === "Tunai") {
      setValue("nama_bank_sisa", "");
    }
  }, [metodePembayaranSisa]);

  function handleCreatePesanan(data) {
    updatePesanan({
      ...data,
      created_by: getUser().name,
    });
  }

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">
          Form Data Pesanan {data?.nomor_pesanan}
        </h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <form
          className="intro-y col-span-12 lg:col-span-7"
          onSubmit={handleSubmit(handleCreatePesanan)}
        >
          {/* BEGIN: Form Layout */}
          <div className="intro-y box p-5">
            <div className="flex flex-row gap-2">
              {/* NAMA */}
              <div className="flex-1">
                <label htmlFor="nama_pemesan" className="form-label">
                  Nama Pemesan
                </label>
                <input
                  id="nama_pemesan"
                  type="text"
                  {...register("nama_pemesan")}
                  className="form-control w-full"
                  disabled
                />
                {errors?.nama_pemesan && (
                  <small className="text-danger font-semibold capitalize">
                    {errors?.nama_pemesan?.message}
                  </small>
                )}
              </div>

              {/* TELEPON */}
              <div className="flex-1">
                <label htmlFor="telepon" className="form-label">
                  Telepon
                </label>
                <input
                  id="telepon"
                  type="text"
                  {...register("telepon")}
                  className="form-control w-full"
                  disabled
                />
                {errors?.telepon && (
                  <small className="text-danger font-semibold capitalize">
                    {errors?.telepon?.message}
                  </small>
                )}
              </div>
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
                  disabled
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
                    disabled
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

                <div className="input-group">
                  <input
                    id="metode_pembayaran"
                    type="text"
                    className="form-control"
                    {...register("metode_pembayaran")}
                    disabled
                  />
                </div>
              </div>

              {/* STAFF */}
              <div className="flex-1">
                <label htmlFor="dijual_oleh" className="form-label">
                  Staff
                </label>

                <div className="input-group">
                  <input
                    id="dijual_oleh"
                    type="text"
                    className="form-control"
                    {...register("dijual_oleh")}
                    disabled
                  />
                </div>

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
                  disabled
                />
              </div>
              {errors?.catatan && (
                <small className="text-danger font-semibold capitalize">
                  {errors?.catatan?.message}
                </small>
              )}
            </div>

            <div className="flex flex-row gap-2 mt-3">
              {/* METODE PEMBAYARAN SISA */}
              <div className="flex-1">
                <label htmlFor="metode_pembayaran_sisa" className="form-label">
                  Metode Pembayaran Sisa
                </label>

                <Controller
                  control={control}
                  defaultValue={data?.metode_pembayaran_sisa}
                  name="metode_pembayaran_sisa"
                  render={({ field }) => (
                    <TomSelect
                      id="metode_pembayaran_sisa"
                      {...field}
                      className="w-full"
                    >
                      <option value="Tunai">Tunai</option>
                      <option value="Transfer">Transfer</option>
                    </TomSelect>
                  )}
                />

                {errors?.metode_pembayaran_sisa && (
                  <small className="text-danger font-semibold capitalize">
                    {errors?.metode_pembayaran_sisa?.message}
                  </small>
                )}
              </div>

              {/* BANK */}
              {metodePembayaranSisa === "Transfer" && (
                <div className="flex-1">
                  <label htmlFor="nama_bank_sisa" className="form-label">
                    Di Transfer Ke Bank
                  </label>

                  <Controller
                    control={control}
                    name="nama_bank_sisa"
                    defaultValue={data?.nama_bank_sisa}
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

                  {errors?.nama_bank_sisa && (
                    <small className="text-danger font-semibold capitalize">
                      {errors?.nama_bank_sisa?.message}
                    </small>
                  )}
                </div>
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
