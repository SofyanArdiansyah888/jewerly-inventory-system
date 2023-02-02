import {
  Lucide,
  SkeletonTable,
  Modal,
  ModalBody,
  Litepicker,
} from "@/base-components";
import { useEffect, useState } from "react";
import { usePrintLaporan } from "../../hooks/useLaporan";
export default function Index() {
  const [tipe, setTipe] = useState("laporan-penjualan");
  const [date, setDate] = useState();
  const [modal, setModal] = useState(false);

  const { refetch, isLoading } = usePrintLaporan(
    { tipe, date },
    successCallback,
    () => setModal(false)
  );

  function successCallback(data) {
    console.log(data);
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${tipe} ${date}.xlsx`);
    document.body.appendChild(link);
    link.click();
    setModal(false);
  }

  const items = [
    {
      text: "Laporan Penjualan",
      iconName: "ShoppingBag",
    },
    {
      text: "Laporan Pembelian",
      iconName: "Tag",
    },
    {
      text: "Laporan Timbang",
      iconName: "Scale",
    },
    {
      text: "Laporan Gudang",
      iconName: "Box",
    },
    {
      text: "Laporan Keuangan",
      iconName: "Wallet",
    },
  ];

  const printModalProps = {
    setModal,
    modal,
    date,
    setDate,
    refetch,
    isLoading,
    tipe,
  };
  return (
    <div className="grid grid-cols-12 gap-6 ">
      {items.map((props, index) => (
        <CardItem
          {...props}
          setModal={setModal}
          key={index}
          setTipe={setTipe}
        />
      ))}
      <PrintModal {...printModalProps} />
    </div>
  );
}

function CardItem({ text, iconName, setModal, setTipe }) {
  return (
    <div className="report-box zoom-in col-span-4">
      <div className="box  h-auto rounded-lg">
        <div className="flex flex-col gap-4 text-center items-center py-6 ">
          <Lucide icon={iconName} className=" h-12 w-12" />
          <h3 className="font-semibold text-lg">{text}</h3>
          <button
            className="btn btn-primary w-24"
            onClick={() => {
              switch (text) {
                case "Laporan Penjualan":
                  setTipe("laporan-penjualan");
                  break;
                case "Laporan Pembelian":
                  setTipe("laporan-pembelian");
                  break;
                case "Laporan Timbang":
                  setTipe("laporan-timbang");
                  break;
                case "Laporan Gudang":
                  setTipe("laporan-gudang");
                  break;
                case "Laporan Keuangan":
                  setTipe("laporan-keuangan");
                  break;
              }
              setModal(true);
            }}
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
}

function PrintModal({
  setModal,
  modal,
  date,
  setDate,
  refetch,
  isLoading,
  tipe,
}) {
  return (
    <Modal
      show={modal}
      onHidden={() => {
        setModal(false);
      }}
    >
      <ModalBody className="p-0">
        <div className="p-5 text-center">
          <div className="text-3xl mt-5 capitalize">
            Print {tipe.replace("-", " ")}
          </div>
          <div className="text-slate-500 mt-2 capitalize">
            Apakah kamu yakin ingin print {tipe.replace("-", " ")}? <br />
            <div className="mt-8 text-center w-full">
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
                className="form-control  box text-center cursor-pointer"
              />
            </div>
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
            type="submit"
            className="btn btn-primary w-24"
            disabled={isLoading}
            onClick={() => refetch()}
          >
            {isLoading ? "Loading..." : "Export"}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}
