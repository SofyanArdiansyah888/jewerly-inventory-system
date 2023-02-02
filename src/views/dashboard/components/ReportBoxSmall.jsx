import {
  Lucide,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Tippy,
} from "@/base-components";

function ReportBoxSmall({ text, value }) {
  return (
    <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
      <div className="report-box zoom-in">
        <div className="box p-5">
          <div className="text-3xl font-medium leading-8 mt-6">{value}</div>
          <div className="text-base text-slate-500 mt-1">{text}</div>
        </div>
      </div>
    </div>
  );
}

export default ReportBoxSmall;
