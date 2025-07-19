import { useState } from "react";

import useGetLocations from "@/hooks/itinerary/useGetItineraries";

import Loader from "@/shared/Loader";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";

import ErrorPage from "@/pages/ErrorPage/ErrorPage";

import Map from "./tabs/Map";
import Overview from "./tabs/Overview";

type TripTab = "itinerary" | "maps" | "overview";

const TripTabsContainer = () => {
  const [activeTab, setActiveTab] = useState<TripTab>("overview");

  const { locations, status } = useGetLocations();

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
      <div className="flex items-center justify-center">
        <TabsList>
          <TabsTrigger
            value="overview"
            className=""
          >
            Overview
          </TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="maps">Maps</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview">
        <Overview />
      </TabsContent>
      <TabsContent value="itinerary">Itinerary content goes here.</TabsContent>
      {activeTab === "maps" && (
        <TabsContent value="maps">
          <div className="h-[500px] w-full overflow-hidden rounded-lg">
            <Map locations={locations} />
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
};

export default TripTabsContainer;
