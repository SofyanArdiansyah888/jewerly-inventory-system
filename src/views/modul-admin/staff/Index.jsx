import { Lucide, SkeletonTable } from "@/base-components";
import { useState } from "react";
// import EmptyData from "../../components/EmptyData";
import { useStaffs } from "../../../hooks/useStaff";

import UpdateModal from "./Update";
import DeleteModal from "./Delete";
import CreateModal from "./Create";

function Index() {
  const [modal, setModal] = useState(false);
  const [modalEdit, setmodalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedStaff, setselectedStaff] = useState();
  const [search, setSearch] = useState("");
  const { data: staffs, isLoading: loading } = useStaffs();

  const handleEdit = (staff) => {
    setselectedStaff(staff);
    setmodalEdit(true);
  };

  const handleDelete = (staff) => {
    setselectedStaff(staff);
    setModalDelete(true);
  };

  function handleDetail(staff) {}

  const filterData = () => {
    return staffs?.filter((item) =>
      item.nama.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Staff</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-between mt-2">
          <button
            className="btn btn-primary btn-sm  w-24 mr-1"
            onClick={() => setModal(true)}
          >
            <span className="flex items-center justify-center mr-2">
              <Lucide icon="Plus" />
            </span>
            Staff
          </button>
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
              <input
                type="text"
                className="form-control w-56 staff pr-10"
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
                  <th className="whitespace-nowrap">No</th>
                  <th className="whitespace-nowrap">Nama Staff</th>
                  <th className="text-center whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filterData()?.map((staff, key) => (
                  <tr key={key} className="intro-x">
                    <td className="font-medium ">{key + 1}</td>
                    <td>
                      <div className="whitespace-nowrap capitalize">
                        {staff.nama ? staff.nama : "-"}
                      </div>
                    </td>

                    {/* ACTION BUTTONS */}
                    <td className="table-report__action w-56">
                      <div className="flex justify-center items-center">
                        <div
                          className="flex items-center mr-3 cursor-pointer"
                          onClick={() => handleEdit(staff)}
                        >
                          <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />{" "}
                          Edit
                        </div>

                        <div
                          className="flex items-center text-danger cursor-pointer"
                          onClick={() => handleDelete(staff)}
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
          staff={selectedStaff}
        />
        <DeleteModal
          modal={modalDelete}
          setModal={setModalDelete}
          staff={selectedStaff}
        />
      </div>
    </>
  );
}

export default Index;
