import {
  TabPanel
} from "@/base-components";
import { formatGram, formatRupiah } from "../../../utils/formatter";
import ReportBox from "./ReportBox";
import ReportBoxSmall from "./ReportBoxSmall";

function TahunanPanel({ dashboard }) {
  return (
    <TabPanel className="grid grid-cols-12 gap-6 px-6">
      <ReportBox
        text="Pemasukan"
        value={formatRupiah(dashboard?.pemasukan_tahunan)}
      />
      <ReportBox
        text="Pengeluaran"
        value={formatRupiah(dashboard?.pengeluaran_tahunan)}
      />
      <ReportBoxSmall
        text="Jumlah Emas Terjual"
        value={dashboard?.jumlah_terjual_tahunan}
      />
      <ReportBoxSmall
        text="Jumlah Emas Terbeli"
        value={dashboard?.jumlah_terbeli_tahunan}
      />
      <ReportBoxSmall
        text="Berat Emas Terjual"
        value={formatGram(dashboard?.berat_terjual_tahunan)}
      />
      <ReportBoxSmall
        text="Berat Emas Terbeli"
        value={formatGram(dashboard?.berat_terbeli_tahunan)}
      />
    </TabPanel>
  );
}

export default TahunanPanel;
