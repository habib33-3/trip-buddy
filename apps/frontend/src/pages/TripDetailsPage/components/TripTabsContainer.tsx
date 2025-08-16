import { useState } from "react";

import useGetItineraries from "@/hooks/itinerary/useGetItineraries";

import ErrorComponent from "@/shared/ErrorComponent";
import Loader from "@/shared/Loader";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";

import ItineraryTab from "./tabs/ItineraryTab";
import MapTab from "./tabs/MapTab";
import Overview from "./tabs/Overview";

type TripTab = "itinerary" | "maps" | "overview";

const TripTabsContainer = () => {
  const [activeTab, setActiveTab] = useState<TripTab>("overview");
  const { locations, status } = useGetItineraries();

  if (status === "pending") return <Loader />;
  if (status === "error" || !locations)
    return (
      <ErrorComponent message="Something went wrong while fetching itineraries" />
    );

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as TripTab)}
      className="w-full"
    >
      <div className="overflow-x-auto border-b border-gray-300 p-2 shadow-sm">
        <TabsList className="flex w-max space-x-2 rounded-lg bg-gray-800">
          {["overview", "itinerary", "maps"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="flex-shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-gray-200 hover:bg-gray-100 hover:text-gray-700 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div className="mt-4">
        <TabsContent value="overview">
          <Overview />
        </TabsContent>
        <TabsContent value="itinerary">
          <ItineraryTab />
        </TabsContent>
        <TabsContent value="maps">
          <MapTab />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default TripTabsContainer;
