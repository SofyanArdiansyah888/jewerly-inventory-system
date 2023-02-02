import { Lucide, Modal, ModalBody } from "@/base-components";
import { useQueryClient } from "react-query";
import { useDeleteUser } from "../../../hooks/useUser";

function Delete({ modal, setModal, user }) {
  const userId = user && user.id;
  const { mutate } = useDeleteUser(userId, () => {
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
        <ModalBody className="p-0">
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 text-danger mx-auto mt-3"
            />
            <div className="text-3xl mt-5">Are you sure?</div>
            <div className="text-slate-500 mt-2">
              Do you really want to delete this user? <br />
              <strong className="capitalize">{user ? user.name : ""}</strong>
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setModal(false);
              }}
              className="btn btn-outline-secondary w-24 mr-1"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger w-24"
              onClick={() => mutate()}
            >
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Delete;
