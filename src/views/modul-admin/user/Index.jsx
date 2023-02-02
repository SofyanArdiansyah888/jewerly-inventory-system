import { Lucide, SkeletonTable } from "@/base-components";
import { useState } from "react";
// import EmptyData from "../../components/EmptyData";
import { useUsers } from "../../../hooks/useUser";

import UpdateModal from "./Update";
import DeleteModal from "./Delete";
import CreateModal from "./Create";

function Index() {
  const [modal, setModal] = useState(false);
  const [modalEdit, setmodalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedUser, setselectedUser] = useState();
  const [search, setSearch] = useState("");
  const { data: users, isLoading: loading } = useUsers();

  const handleEdit = (user) => {
    setselectedUser(user);
    setmodalEdit(true);
  };

  const handleDelete = (user) => {
    setselectedUser(user);
    setModalDelete(true);
  };

  const filterData = () => {
    return users?.filter(
      (item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        item.role_level
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        item.email.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">User</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-between mt-2">
          <button
            className="btn btn-primary btn-sm  w-24 mr-1"
            onClick={() => setModal(true)}
          >
            <span className="flex items-center justify-center mr-2">
              <Lucide icon="Plus" />
            </span>
            User
          </button>
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
              <input
                type="text"
                className="form-control w-56 box pr-10"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div>
          </div>
        </div>

        {/* BEGIN: Data List */}
        <div className="intro-y col-span-12 overflow-scroll lg:overflow-hidden ">
          {loading ? (
            <SkeletonTable />
          ) : (
            <table className="table table-report -mt-2">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">User</th>
                  <th className="whitespace-nowrap">Role</th>
                  <th className="text-center whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ?? (
                  <div className="col-span-12 mt-12  flex flex-col justify-end items-center">
                    <LoadingIcon icon="circles" className="w-16 h-16" />
                  </div>
                )}
                {filterData()?.map((user, key) => (
                  <tr key={key} className="intro-x">
                    <td>
                      <div className="font-medium whitespace-nowrap capitalize">
                        {user.name ? user.name : "-"} <br />
                        <small className="font-light lowercase text-sm">
                          {" "}
                          {user.email}
                        </small>
                      </div>
                    </td>

                    <td>
                      <div className="font-medium whitespace-nowrap">
                        {user.role_level}
                      </div>
                    </td>

                    {/* ACTION BUTTONS */}
                    <td className="table-report__action w-56">
                      <div className="flex justify-center items-center">
                        <div
                          className="flex items-center mr-3 cursor-pointer"
                          onClick={() => handleEdit(user)}
                        >
                          <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />{" "}
                          Edit
                        </div>
                        <div
                          className="flex items-center text-danger cursor-pointer"
                          onClick={() => handleDelete(user)}
                        >
                          <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                          Delete
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {filterData()?.length === 0 && (
                  <td colSpan={99} className="text-center text-lg font-light">
                    You don't have data to display
                  </td>
                )}
              </tbody>
            </table>
          )}
        </div>
        {/* END: Data List */}
        <CreateModal modal={modal} setModal={setModal} />

        <UpdateModal
          modal={modalEdit}
          setModal={setmodalEdit}
          user={selectedUser}
        />
        <DeleteModal
          modal={modalDelete}
          setModal={setModalDelete}
          user={selectedUser}
        />
      </div>
    </>
  );
}

export default Index;
