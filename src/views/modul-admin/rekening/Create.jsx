import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useCreateRekening } from "../../../hooks/useRekening";
const schema = yup
  .object({
    nama_bank: yup.string().required("Nama Bank field is required"),
    norek: yup.string().required("Nomor Rekening field is required"),
  })
  .required();

function Create({ modal, setModal }) {

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  
  const { mutate, isLoading } = useCreateRekening((data) => {
    
    reset(() => ({
      nama_bank: "",
      norek: ""
    }));
    setModal(false);
  });

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
          onSubmit={handleSubmit((data) => mutate({ ...data }))}
        >
          <ModalHeader>
            <h2 className="font-medium text-base mr-auto">Create Rekening</h2>
          </ModalHeader>
          <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <label htmlFor="nama_bank" className="form-label">
                Nama Bank
              </label>
              <input
                {...register("nama_bank")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.nama_bank,
                })}
                name="nama_bank"
                type="text"
              />
              {errors.nama_bank && (
                <div className="text-danger mt-2">{errors.nama_bank.message}</div>
              )}
            </div>
            <div className="col-span-12">
              <label htmlFor="norek" className="form-label">
                Nomor Rekening
              </label>
              <input
                {...register("norek")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.norek,
                })}
                name="norek"
                type="text"
              />
              {errors.norek && (
                <div className="text-danger mt-2">{errors.norek.message}</div>
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
            <button type="submit" className="btn btn-primary w-20" disabled={isLoading}>
              Submit
            </button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default Create;
