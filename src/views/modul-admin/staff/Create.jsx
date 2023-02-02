import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useCreateStaff } from "../../../hooks/useStaff";
const schema = yup
  .object({
    nama: yup.string().required("Nama Staff field is required"),
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
  
  const { mutate, isLoading } = useCreateStaff((data) => {
    
    reset(() => ({
      nama: ""
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
            <h2 className="font-medium text-base mr-auto">Create Staff</h2>
          </ModalHeader>
          <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <label htmlFor="nama" className="form-label">
                Nama Staff
              </label>
              <input
                {...register("nama")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.nama,
                })}
                name="nama"
                id="nama"
                type="text"
              />
              {errors.nama && (
                <div className="text-danger mt-2">{errors.nama.message}</div>
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
