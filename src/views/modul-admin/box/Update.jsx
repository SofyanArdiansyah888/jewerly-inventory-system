import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useUpdateBox } from "../../../hooks/useBox";

// VALIDATION
const schema = yup.object({
  nama_box: yup.string().required("Nama Box field is required"),
});

function Update({ modal, setModal, box }) {
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

  const boxId = box && box.id;
  const { mutate,isLoading } = useUpdateBox(boxId, () => {
    reset(() => ({
      nama_box: ""
    }));
    setModal(false);
  });

  useEffect(() => {
    if (box) {
      setValue("nama_box", box.nama_box);
    }
    return () => {};
  }, [box]);

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
          onSubmit={handleSubmit((data) => mutate({ id: box.id, ...data }))}
        >
          <ModalHeader>
            <h2 className="font-medium text-base mr-auto">Update Box</h2>
          </ModalHeader>
          <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <label htmlFor="nama_box" className="form-label">
                Nama Box
              </label>
              <input
                {...register("nama_box")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.nama_box,
                })}
                name="nama_box"
                id="nama_box"
                type="text"
              />
              {errors.nama_box && (
                <div className="text-danger mt-2">{errors.nama_box.message}</div>
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
