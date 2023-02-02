import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useUpdateTalang } from "../../../hooks/useTalang";

// VALIDATION
const schema = yup.object({
  nama_talang: yup.string().required("Nama Talang field is required"),
});

function Update({ modal, setModal, talang }) {
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

  const talangId = talang && talang.id;
  const { mutate,isLoading } = useUpdateTalang(talangId, () => {
    reset(() => ({
      nama_talang: ""
    }));
    setModal(false);
  });

  useEffect(() => {
    if (talang) {
      setValue("nama_talang", talang.nama_talang);
    }
    return () => {};
  }, [talang]);

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
          onSubmit={handleSubmit((data) => mutate({ id: talang.id, ...data }))}
        >
          <ModalHeader>
            <h2 className="font-medium text-base mr-auto">Update Talang</h2>
          </ModalHeader>
          <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <label htmlFor="nama_talang" className="form-label">
                Nama Talang
              </label>
              <input
                {...register("nama_talang")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.nama_talang,
                })}
                name="nama_talang"
                id="nama_talang"
                type="text"
              />
              {errors.nama_talang && (
                <div className="text-danger mt-2">{errors.nama_talang.message}</div>
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

export default Update;
