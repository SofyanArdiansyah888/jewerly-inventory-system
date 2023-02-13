import {
  Tab,
  TabGroup,
  TabList, TabPanels
} from "@/base-components";
import { useEffect } from "react";
import useAlert from '../../hooks/useAlert';
import { useDashboard } from '../../hooks/useDashboard';
import BulananPanel from "./components/BulananPanel";
import HarianPanel from "./components/HarianPanel";
import TahunanPanel from "./components/TahunanPanel";


function Index() {
  const {data:dashboard} = useDashboard();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 mt-8">
        <div className="intro-y flex items-center h-10">
          <h2 className="text-lg font-medium truncate mr-5">Dashboard</h2>
        </div>
        <TabGroup className=" col-span-12 box">
          <div className=" top-0 p-3">
            <TabList className="nav-pills border border-slate-300 dark:border-darkmode-300 border-dashed rounded-md mx-auto p-2 mt-5">
              <Tab className="w-full active" tag="button">
                Harian
              </Tab>
              <Tab className="w-full" tag="button">
                Bulanan
              </Tab>
              <Tab className="w-full" tag="button">
                Tahunan
              </Tab>
            </TabList>
          </div>
          <TabPanels className="pb-5">
            <HarianPanel  dashboard={dashboard} />
            <BulananPanel dashboard={dashboard} />
            <TahunanPanel dashboard={dashboard} />
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}

export default Index;
