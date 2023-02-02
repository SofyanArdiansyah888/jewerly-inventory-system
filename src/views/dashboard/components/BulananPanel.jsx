import {
  TabPanel
} from "@/base-components";
import { formatGram, formatRupiah } from "../../../utils/formatter";
import ReportBox from "./ReportBox";
import ReportBoxSmall from "./ReportBoxSmall";
  
  function BulananPanel({dashboard}) {
    return (
      <TabPanel className="grid grid-cols-12 gap-6 px-6">
        
        <ReportBox text="Pemasukan" value={formatRupiah(dashboard?.pemasukan_bulanan) } />
        <ReportBox text="Pengeluaran" value={formatRupiah(dashboard?.pengeluaran_bulanan)} />
        <ReportBoxSmall text="Jumlah Emas Terjual" value={dashboard?.jumlah_terjual_bulanan} />
        <ReportBoxSmall text="Jumlah Emas Terbeli" value={dashboard?.jumlah_terbeli_bulanan} />
        <ReportBoxSmall text="Berat Emas Terjual" value={formatGram(dashboard?.berat_terjual_bulanan)} />
        <ReportBoxSmall text="Berat Emas Terbeli" value={formatGram(dashboard?.berat_terbeli_bulanan)} />
        
      </TabPanel>
    );
  }
  
  export default BulananPanel;
  