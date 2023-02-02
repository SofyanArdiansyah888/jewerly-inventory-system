import {
  TabPanel
} from "@/base-components";
import { formatGram, formatRupiah } from "../../../utils/formatter";
import ReportBox from "./ReportBox";
import ReportBoxSmall from "./ReportBoxSmall";

function HarianPanel({dashboard}) {
  return (
    <TabPanel className="grid grid-cols-12 gap-6 px-6">
        <ReportBox text="Pemasukan" value={formatRupiah(dashboard?.pemasukan_harian) } />
        <ReportBox text="Pengeluaran" value={formatRupiah(dashboard?.pengeluaran_harian)} />
        <ReportBoxSmall text="Jumlah Emas Terjual" value={dashboard?.jumlah_terjual_harian} />
        <ReportBoxSmall text="Jumlah Emas Terbeli" value={dashboard?.jumlah_terbeli_harian} />
        <ReportBoxSmall text="Berat Emas Terjual" value={formatGram(dashboard?.berat_terjual_harian)} />
        <ReportBoxSmall text="Berat Emas Terbeli" value={formatGram(dashboard?.berat_terbeli_harian)} />
    </TabPanel>
  );
}

export default HarianPanel;
