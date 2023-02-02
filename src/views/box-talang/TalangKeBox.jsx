import { TomSelect } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { Watch } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useBoxes } from "../../hooks/useBox";
import { useTalangKeBox } from "../../hooks/useBoxTalang";
import { useProducts } from "../../hooks/useProduct";
import { useProductItem } from "../../hooks/useProductItem";
import { useTalangs } from "../../hooks/useTalang";

const schema = yup
  .object({
    id_talang: yup.number().required("Talang Is A Required Field"),
    id_box: yup.number().required("Box Is A Required Field"),
    id_produk: yup.string().required("Produk Is A Required Field"),
    berat: yup.number().required().typeError("Berat Must Be a Number"),
    rfid: yup.string().required(),
  })
  .required();
function TalangKeBox() {
  const { data: products } = useProducts();
  const { data: talangs } = useTalangs();
  const { data: boxes } = useBoxes();
  const { mutate: doBoxKeTalang, isLoading: talangKeBoxLoading } =
    useTalangKeBox(() => {
      reset();
    });
  const {
    control,
    handleSubmit,
    reset,
    register,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const rfidField = watch("rfid");
  const {
    data: productItem,
    refetch,
    isLoading: syncLoading,
  } = useProductItem(rfidField);

  useEffect(() => {
    setValue("id_produk", productItem?.id_produk?.toString());
    setValue("berat", productItem?.berat);
    setValue("id_talang", productItem?.id_talang?.toString());
    setValue("id_box", productItem?.id_box?.toString());
  }, [productItem]);

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">
          Form Transaksi Talang Ke Box
        </h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <form
          className="intro-y col-span-12 lg:col-span-6"
          onSubmit={handleSubmit((data) => doBoxKeTalang(data))}
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
                  <TomSelect {...field} className="w-full" disabled={true}>
                    <option value="">Pilih Produk</option>
                    {products?.map((product) => (
                      <option value={product.id}>{product.nama_produk}</option>
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
                  disabled
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

            {/* TALANG */}
            <div className="mt-3">
              <label htmlFor="crud-form-2" className="form-label">
                Dari Talang
              </label>

              <Controller
                control={control}
                name="id_talang"
                render={({ field }) => (
                  <TomSelect {...field} className="w-full" disabled={true}>
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

            {/* BOX */}
            <div className="mt-3">
              <label htmlFor="crud-form-2" className="form-label">
                Ke Box
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

            <div className="text-right mt-5">
              <button
                type="button"
                className="btn btn-outline-secondary w-24 mr-1"
                onClick={() => {
                  reset();
                }}
              >
                Clear Form
              </button>
              <button
                type="button"
                className="btn btn-warning w-24 mr-1"
                onClick={() => refetch()}
                disabled={syncLoading}
              >
                {syncLoading ? "Loading..." : "Sync"}
              </button>
              <button type="submit" className="btn btn-primary w-24" disabled={talangKeBoxLoading}>
                {talangKeBoxLoading ? "Loading..." : "Simpan"}
              </button>
            </div>
          </div>
          {/* END: Form Layout */}
        </form>
      </div>
    </>
  );
}

export default TalangKeBox;
