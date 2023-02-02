import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useUpdateProduk } from "../../../hooks/useProduct";

// VALIDATION
const schema = yup
  .object({
    nama_produk: yup.string().required("Nama Bank field is required"),
    kode: yup.string().required("Kode field is required"),
    kadar: yup.string().required("Kadar field is required"),
    warning_stok_box: yup
      .number()
      .required("Warning Stok Box field is required")
      .typeError("Warning Stok Box must be a number"),
    warning_stok_talang: yup
      .number()
      .required("Warning Stok Talang field is required")
      .typeError("Warning Stok Talang must be a number"),
  })
  .required();

function Update({ modal, setModal, produk }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const produkId = produk && produk.id;
  const { mutate, isLoading } = useUpdateProduk(produkId, () => {
    reset(() => ({
      nama_produk: "",
      kode: "",
      kadar: "",
      warning_stok_box: "",
      warning_stok_talang: "",
    }));
    setModal(false);
  });

  useEffect(() => {
    if (produk) {
      setValue("nama_produk", produk.nama_produk);
      setValue("kode", produk.kode);
      setValue("kadar", produk.kadar);
      setValue("warning_stok_box", produk.warning_stok_box);
      setValue("warning_stok_talang", produk.kode);
    }
    return () => {};
  }, [produk]);

  return (
    <>
      <Modal
        show={modal}
        onHidden={() => {
          setModal(false);
        }}
      >
        <form
          className="validate-form"
          onSubmit={handleSubmit((data) => mutate({ id: produk.id, ...data }))}
        >
          <ModalHeader>
            <h2 className="font-medium text-base mr-auto">Update Produk</h2>
          </ModalHeader>
          <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <label htmlFor="nama_produk" className="form-label">
                Nama Produk
              </label>
              <input
                {...register("nama_produk")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.nama_produk,
                })}
                name="nama_produk"
                id="nama_produk"
                type="text"
              />
              {errors.nama_produk && (
                <div className="text-danger mt-2">
                  {errors.nama_produk.message}
                </div>
              )}
            </div>
            <div className="col-span-12">
              <label htmlFor="kode" className="form-label">
                Kode
              </label>
              <input
                {...register("kode")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.kode,
                })}
                name="kode"
                type="text"
              />
              {errors.kode && (
                <div className="text-danger mt-2">{errors.kode.message}</div>
              )}
            </div>
            <div className="col-span-12">
              <label htmlFor="kadar" className="form-label">
                Kadar
              </label>
              <input
                {...register("kadar")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.kadar,
                })}
                name="kadar"
                type="text"
              />
              {errors.kadar && (
                <div className="text-danger mt-2">{errors.kadar.message}</div>
              )}
            </div>
            <div className="col-span-12">
              <label htmlFor="warning_stok_box" className="form-label">
                Warning Stok Box
              </label>
              <input
                {...register("warning_stok_box")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.warning_stok_box,
                })}
                name="warning_stok_box"
                type="number"
              />
              {errors.warning_stok_box && (
                <div className="text-danger mt-2">
                  {errors.warning_stok_box.message}
                </div>
              )}
            </div>
            <div className="col-span-12">
              <label htmlFor="warning_stok_talang" className="form-label">
                Warning Stok Talang
              </label>
              <input
                {...register("warning_stok_talang")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.warning_stok_talang,
                })}
                name="warning_stok_talang"
                type="number"
              />
              {errors.warning_stok_talang && (
                <div className="text-danger mt-2">
                  {errors.warning_stok_talang.message}
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              onClick={() => {
                setModal(false);
              }}
              className="btn btn-outline-secondary w-20 mr-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary w-20"
              disabled={isLoading}
            >
              Submit
            </button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default Update;
