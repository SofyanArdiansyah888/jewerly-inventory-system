import { Lucide, SkeletonTable, Modal, ModalBody } from "@/base-components";
import { useState } from "react";
import { useRiwayatModal } from "../../hooks/useHistory";
import { helper } from "../../utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useCreateModal } from "../../hooks/useHistory";
import { formatRupiah } from "../../utils/formatter";
import { getUser } from "../../services/database";
function RiwayatModal() {
  const [date, setDate] = useState();
  const [masukModal, setMasukModal] = useState(false);
  const [keluarModal, setKeluarModal] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isFetching } = useRiwayatModal(page);
  
  const filterData = () => {
    return data?.data.filter(
      (item) =>
        item.nomor_riwayat_modal.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
    );
  };
  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Riwayat Modal</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-between items-center mt-2">
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

          <div>
            {/* BUTTON MODAL MASUK */}
            <button
              className="btn btn-success btn-sm  w-24 mr-1"
              onClick={() => setMasukModal(true)}
            >
              {/* <span className="flex items-center justify-center mr-2">
                  <Lucide icon="Indent" />
                </span> */}
              Modal Masuk
            </button>

            {/* BUTTON MODAL MASUK */}
            <button className="btn btn-danger btn-sm  w-24 mr-1" onClick={() => setKeluarModal(true)}>
              {/* <span className="flex items-center justify-center mr-2">
                  <Lucide icon="Outdent" />
                </span> */}
              Modal Keluar
            </button>
          </div>

          {/* <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
            <Lucide
              icon="Calendar"
              className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
            />
            <Litepicker
              value={date}
              formatDate
              onChange={setDate}
              options={{
                autoApply: false,
                singleMode: false,
                numberOfColumns: 2,
                numberOfMonths: 2,
                showWeekNumbers: true,
                dropdowns: {
                  minYear: 1990,
                  maxYear: null,
                  months: true,
                  years: true,
                },
              }}
              className="form-control sm:w-56 box pl-10 cursor-pointer"
            />
          </div> */}
        </div>

        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible min-h-[80vh]">
          {isFetching ? (
            <SkeletonTable />
          ) : (
            <table className="table table-report -mt-2">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">No</th>
                  <th className="whitespace-nowrap">Nomor Riwayat</th>
                  <th className="text-center whitespace-nowrap">Jumlah</th>
                  <th className="text-center whitespace-nowrap">Saldo Awal</th>
                  <th className="text-center whitespace-nowrap">Saldo Akhir</th>
                  <th className="text-center whitespace-nowrap">
                    Status Transaksi
                  </th>
                  <th className="text-center whitespace-nowrap">Keterangan</th>
                  <th className="text-center whitespace-nowrap">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {filterData()?.map((item, index) => (
                  <tr key={index} className="intro-x">
                    <td>{index + 1}</td>
                    <td>{item.nomor_riwayat_modal}</td>
                    <td>{formatRupiah(item.jumlah)}</td>
                    <td>{formatRupiah(item.modal_awal)}</td>
                    <td>{formatRupiah(item.modal_akhir)}</td>
                    <td className="capitalize">{item.status_transaksi}</td>
                    <td>{item.keterangan}</td>
                    <td className="text-center">
                      {helper.formatDate(item.created_at, "D MMMM YYYY")}
                    </td>
                  </tr>
                ))}
                {filterData().length === 0 && (
                  <td colSpan={99} className="text-center text-lg font-light">
                    You don't have data to display
                  </td>
                )}
              </tbody>
            </table>
          )}
        </div>

        {filterData()?.length > 9 && (
          <nav className="w-full sm:w-auto sm:mr-auto">
            <ul className="pagination">
              {data?.links.map((item, index) => (
                <PaginateItem
                  item={item}
                  index={index}
                  page={page}
                  setPage={setPage}
                />
              ))}
            </ul>
          </nav>
        )}
      </div>
      <ModalMasuk masukModal={masukModal} setMasukModal={setMasukModal}  />
      <ModalKeluar keluarModal={keluarModal} setKeluarModal={setKeluarModal}  />
    </>
  );
}

function PaginateItem({ item, index, setPage, page }) {
  console.log(page);
  if (item.label === "&laquo; Sebelumnya")
    return (
      <li className={`page-item ${item.active ? "active" : ""}`} key={index}>
        <div
          className="page-link"
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
        >
          <Lucide icon="ChevronLeft" className="w-4 h-4" />
        </div>
      </li>
    );
  else if (item.label === "Berikutnya &raquo;")
    return (
      <li className={`page-item ${item.active ? "active" : ""}`} key={index}>
        <div className="page-link" onClick={() => setPage(Number(page) + 1)}>
          <Lucide icon="ChevronRight" className="w-4 h-4" />
        </div>
      </li>
    );
  else
    return (
      <li className={`page-item ${item.active ? "active" : ""}`} key={index}>
        <div className="page-link" onClick={() => setPage(item.label)}>
          {item.label}
        </div>
      </li>
    );
}

const schema = yup
  .object({
    jumlah: yup.string().required(),
    keterangan: yup.string().required(),
  })
  .required();

function ModalMasuk({ setMasukModal, masukModal }) {
  const { mutate: createModal, isLoading } = useCreateModal(() => setMasukModal(false));
  const user = getUser()
  const {
    setValue,
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  return (
    <Modal
      show={masukModal}
      onHidden={() => {
        setMasukModal(false);
      }}
    >
      <ModalBody className="p-0">
        <form
          onSubmit={handleSubmit((data) => {
            createModal({ ...data, status_transaksi: "masuk", created_by: user.name });
          })}
        >
          <div className="p-5 text-center">
            <div className="text-3xl mt-5">Simpan Modal Masuk?</div>
            <div className="text-slate-500 mt-2">
              Apakah kamu yakin ingin menyimpan modal masuk ? <br />
              <div className="mt-8 text-left">
                <label htmlFor="jumlah" className="form-label">
                  Jumlah
                </label>
                <input
                  id="jumlah"
                  type="text"
                  {...register("jumlah")}
                  onChange={(e) => setValue('jumlah',formatRupiah(e.target.value,'Rp.'))}
                  className="form-control w-full"
                />
                {errors?.jumlah && (
                  <small className="text-danger font-semibold capitalize">
                    {errors?.jumlah?.message}
                  </small>
                )}
              </div>
              <div className="text-left">
                <label htmlFor="keterangan" className="form-label">
                  Keterangan
                </label>
                <textarea
                  id="keterangan"
                  type="text"
                  {...register("keterangan")}
                  className="form-control w-full"
                />
                {errors?.keterangan && (
                  <small className="text-danger font-semibold capitalize">
                    {errors?.keterangan?.message}
                  </small>
                )}
              </div>
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setMasukModal(false);
              }}
              className="btn btn-outline-secondary w-24 mr-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary w-24"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Simpan"}
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}

function ModalKeluar({ setKeluarModal, keluarModal }) {
  const { mutate: createModal, isLoading } = useCreateModal(() => setKeluarModal(false));
  const user = getUser();
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  return (
    <Modal
      show={keluarModal}
      onHidden={() => {
        setKeluarModal(false);
      }}
    >
      <ModalBody className="p-0">
        <form
          onSubmit={handleSubmit((data) => {
            createModal({ ...data, status_transaksi: "keluar", created_by: user.name });
          })}
        >
          <div className="p-5 text-center">
            <div className="text-3xl mt-5">Simpan Modal Keluar?</div>
            <div className="text-slate-500 mt-2">
              Apakah kamu yakin ingin menyimpan modal keluar ? <br />
              <div className="mt-8 text-left">
                <label htmlFor="jumlah" className="form-label">
                  Jumlah
                </label>
                <input
                  id="jumlah"
                  type="text"
                  {...register("jumlah")}
                  onChange={(e) => setValue('jumlah',formatRupiah(e.target.value,'Rp.'))}
                  className="form-control w-full"
                />
                {errors?.jumlah && (
                  <small className="text-danger font-semibold capitalize">
                    {errors?.jumlah?.message}
                  </small>
                )}
              </div>
              <div className="text-left">
                <label htmlFor="jumlah" className="form-label">
                  Keterangan
                </label>
                <textarea
                  id="keterangan"
                  type="text"
                  {...register("keterangan")}
                  className="form-control w-full"
                />
                {errors?.keterangan && (
                  <small className="text-danger font-semibold capitalize">
                    {errors?.keterangan?.message}
                  </small>
                )}
              </div>
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setKeluarModal(false);
              }}
              className="btn btn-outline-secondary w-24 mr-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary w-24"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Simpan"}
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default RiwayatModal;
