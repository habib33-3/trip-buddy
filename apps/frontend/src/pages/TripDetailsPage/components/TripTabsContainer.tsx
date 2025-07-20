import { useState } from "react";

import useGetItineraries from "@/hooks/itinerary/useGetItineraries";

import Loader from "@/shared/Loader";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";

import ErrorPage from "@/pages/ErrorPage/ErrorPage";

import ItineraryTab from "./tabs/ItineraryTab";
import Map from "./tabs/Map";
import Overview from "./tabs/Overview";

type TripTab = "itinerary" | "maps" | "overview";

const TripTabsContainer = () => {
  const [activeTab, setActiveTab] = useState<TripTab>("overview");

  const { locations, status } = useGetItineraries();

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorPage />;
  if (!locations) return null;

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as TripTab)}
      className="w-full"
    >
      <div className="flex justify-center border-b border-gray-300 bg-white p-3 shadow-sm">
        <TabsList className="flex space-x-4 rounded-lg bg-gray-50">
          <TabsTrigger
            value="overview"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="itinerary"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md"
          >
            Itinerary
          </TabsTrigger>
          <TabsTrigger
            value="maps"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md"
          >
            Maps
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="mt-6">
        <TabsContent value="overview">
          <Overview />
        </TabsContent>
        <TabsContent value="itinerary">
          <ItineraryTab />
        </TabsContent>
        {activeTab === "maps" && (
          <TabsContent value="maps">
            <div className="h-[500px] w-full rounded-lg shadow-inner">
              <Map
                locations={locations}
                zoom={6}
              />
            </div>
          </TabsContent>
        )}
      </div>
    </Tabs>
  );
};

export default TripTabsContainer;
